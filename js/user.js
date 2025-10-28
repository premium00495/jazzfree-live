import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const authError = document.getElementById('authError');
const premiumSection = document.querySelector('.premium-section');
const activateBtn = document.getElementById('activateBtn');
const premiumMsg = document.getElementById('premiumMsg');
const watchSection = document.querySelector('.watch-section');

function isValidEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

registerBtn.addEventListener('click', () => {
    const email = document.getElementById('userEmail').value.trim();
    const password = document.getElementById('userPassword').value.trim();

    if(!isValidEmail(email)){
        authError.textContent = "Invalid email format!";
        return;
    }
    if(password.length < 6){
        authError.textContent = "Password must be at least 6 characters!";
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const uid = userCredential.user.uid;
            set(ref(db, 'users/' + uid), { email, premium: false });
            showPremiumSection();
        })
        .catch(err => authError.textContent = err.message);
});

loginBtn.addEventListener('click', () => {
    const email = document.getElementById('userEmail').value.trim();
    const password = document.getElementById('userPassword').value.trim();

    if(!isValidEmail(email)){
        authError.textContent = "Invalid email format!";
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const uid = userCredential.user.uid;
            get(ref(db, 'users/' + uid)).then(snapshot => {
                if(snapshot.exists() && snapshot.val().premium) {
                    showWatchSection();
                } else {
                    showPremiumSection();
                }
            });
        })
        .catch(err => authError.textContent = err.message);
});

activateBtn.addEventListener('click', () => {
    const codeInput = document.getElementById('premiumCode').value.trim();
    if(!codeInput) return;
    get(ref(db, 'premiumCodes')).then(snapshot => {
        let valid = false;
        snapshot.forEach(child => { if(child.val().code === codeInput) valid = true; });
        if(valid) {
            const uid = auth.currentUser.uid;
            set(ref(db, 'users/' + uid + '/premium'), true);
            premiumMsg.textContent = "Premium Activated ✅";
            showWatchSection();
        } else { premiumMsg.textContent = "Invalid Code ❌"; }
    });
});

logoutBtn.addEventListener('click', () => signOut(auth).then(() => window.location.reload()));

function showPremiumSection() {
    premiumSection.style.display = 'block';
    logoutBtn.style.display = 'block';
    watchSection.style.display = 'none';
}

function showWatchSection() {
    premiumSection.style.display = 'none';
    watchSection.style.display = 'block';
    logoutBtn.style.display = 'block';
    const contentList = document.getElementById('contentList');
    contentList.innerHTML = `
        <li>Free Movie 1</li>
        <li>Premium Movie 1 (Unlocked)</li>
    `;
}