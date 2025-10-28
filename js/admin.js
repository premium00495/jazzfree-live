import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
if(loginBtn) loginBtn.addEventListener('click', () => {
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    signInWithEmailAndPassword(auth, email, password)
        .then(() => window.location.href = 'dashboard.html')
        .catch(err => loginError.textContent = err.message);
});

const addCodeBtn = document.getElementById('addCodeBtn');
const newCode = document.getElementById('newCode');
const premiumCodesList = document.getElementById('premiumCodesList');
const usersList = document.getElementById('usersList');
const logoutBtn = document.getElementById('logoutBtn');

if(addCodeBtn) {
    addCodeBtn.addEventListener('click', () => {
        const code = newCode.value.trim();
        if(code) { push(ref(db, 'premiumCodes'), { code }); newCode.value = ''; }
    });
    onValue(ref(db, 'premiumCodes'), snapshot => {
        premiumCodesList.innerHTML = '';
        snapshot.forEach(child => {
            const li = document.createElement('li');
            li.textContent = child.val().code;
            premiumCodesList.appendChild(li);
        });
    });
}

if(usersList) {
    onValue(ref(db, 'users'), snapshot => {
        usersList.innerHTML = '';
        snapshot.forEach(child => {
            const li = document.createElement('li');
            li.textContent = `${child.val().email} - Premium: ${child.val().premium ? 'Yes' : 'No'}`;
            usersList.appendChild(li);
        });
    });
}

if(logoutBtn) logoutBtn.addEventListener('click', () => signOut(auth).then(() => window.location.href = 'index.html'));
