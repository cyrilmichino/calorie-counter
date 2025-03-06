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
    const url = "https://api.api-ninjas.com/v1/nutrition?query=" + query;
    try {
        const response = await fetch(url, {headers: {'X-Api-Key': '+hD6HZuQLtjhEQIit+pGdg==AFFCjQr3XavEwrfQ'}});
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        let arr = []
        for (i=0; i<data.length; i++) {
            arr.push({ meal: query,
                name: data[i].name,
                carbohydrates_total_g: data[i].carbohydrates_total_g,
                cholesterol_mg: data[i].cholesterol_mg,
                fat_total_g: data[i].fat_total_g,
                fiber_g: data[i].fiber_g,
                potassium_mg: data[i].potassium_mg,
                protein_g: 0,
                sodium_mg: data[i].sodium_mg,
                sugar_g: data[i].sugar_g,
                calories: 0
            })
        }
        return arr
    } catch (error) {
        console.error(error.message);
    }
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