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

async function getCalorieData(query) {
    let myMeals = await fetch('https://api.api-ninjas.com/v1/nutrition?query=' + query,{headers: {'X-Api-Key': '+hD6HZuQLtjhEQIit+pGdg==AFFCjQr3XavEwrfQ'}})
                            .then(response => response.json())
                            .then(data => console.log(data))
                            .catch(error => console.error('Error:', error));

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

getCalorieData("cornmeal and 1/2kg beef")