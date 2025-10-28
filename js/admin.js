import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const adminLoginBtn = document.getElementById('adminLoginBtn');
const adminEmail = document.getElementById('adminEmail');
const adminPassword = document.getElementById('adminPassword');
const adminError = document.getElementById('adminError');

adminLoginBtn.addEventListener('click', () => {
    const email = adminEmail.value.trim();
    const password = adminPassword.value.trim();

    if(!email || !password){
        adminError.textContent = "Please fill all fields";
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            window.location.href = "dashboard.html";
        })
        .catch(err => adminError.textContent = err.message);
});