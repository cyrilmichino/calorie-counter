/** Responsive Navigation Menu **/
function openMenu() {
    const navbar = document.getElementById('main-nav')
    const menuOverlay = document.getElementById('menu-overlay')
    menuOverlay.style.display = 'block'
    navbar.style.right = '0';
}

function closeMenu() {
    const navbar = document.getElementById('main-nav')
    const menuOverlay = document.getElementById('menu-overlay')
    menuOverlay.style.display = 'none'
    navbar.style.right = '100vh';
}