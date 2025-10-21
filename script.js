// ===== LOGIN =====
const loginForm = document.getElementById('loginForm');
const loginPage = document.getElementById('login-page');
const homePage = document.getElementById('home-page');

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if (user === 'user' && pass === 'pass') {
        loginPage.classList.add('hidden');
        homePage.classList.remove('hidden');
    } else {
        alert('Invalid credentials (try user/pass)');
    }
});

// ===== SECTION NAV =====
function openSection(id) {
    document.querySelectorAll('.app-section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
}

// ===== UPLOAD =====
const uploadForm = document.getElementById('uploadForm');
uploadForm.addEventListener('submit', e => {
    e.preventDefault();
    const location = document.getElementById('houseLocation').value.trim();
    const desc = document.getElementById('houseDesc').value.trim();
    if (!location || !desc) return;

    let houses = JSON.parse(localStorage.getItem('houses') || '[]');
    houses.push({
        location,
        desc
    });
    localStorage.setItem('houses', JSON.stringify(houses));

    document.getElementById('uploadMsg').textContent = 'House uploaded successfully!';
    uploadForm.reset();
});

// ===== SEARCH =====
function searchHouses() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsEl = document.getElementById('results');
    resultsEl.innerHTML = '';

    let houses = JSON.parse(localStorage.getItem('houses') || '[]');
    const filtered = houses.filter(h => h.location.toLowerCase().includes(query));

    if (filtered.length === 0) {
        resultsEl.innerHTML = '<li>No matching houses found.</li>';
    } else {
        filtered.forEach(h => {
            const li = document.createElement('li');
            // ✅ FIXED: use template literal with backticks
            li.textContent = ${h.location} - ${h.desc};
            resultsEl.appendChild(li);
        });
    }
}
