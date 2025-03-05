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

function addMeal() {
    const meal = document.getElementById('description')
    let meals = JSON.parse(localStorage.getItem('calorie-app-meals'))

    if (meals == null || meals.length == 0)  {
        localStorage.setItem('calorie-app-meals', JSON.stringify([meal]))
    } else {
        meals.push(meal.value)
        localStorage.setItem('calorie-app-meals', JSON.stringify(meals))
    }

    meal.value = ""
    console.log(JSON.parse(localStorage.getItem('calorie-app-meals')))
}

// meals = ["1/2kg goat meat and cornmeal", "4 slices of bread and tea with milk"]
// localStorage.setItem('calorie-app-meals', JSON.stringify(meals))

// console.log(JSON.parse(localStorage.getItem('calorie-app-meals')))