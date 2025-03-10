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

function estimateProtein(potassium_mg) {
    // We don't have protein data from API, therefore we estimate it from available data
    // Protein grams seem to be approximately 0.1 of potassium miligrams numerous times
    return 0.1 * potassium_mg
}
function estimateCalories(protein_g, carbohydrates_total_g, fat_total_g, sugar_g) {
    // We don't have calorie data from API, therefore, we estimate it from available data
    // As per nutritional info, 1 gram of protein,  carbohydrates, and sugar each contain 4 calories, while 1 gram of fat contains 9 calories
    return 4 * (protein_g + carbohydrates_total_g + sugar_g) + 9 * fat_total_g
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
                protein_g: estimateProtein(data[i].potassium_mg),
                sodium_mg: data[i].sodium_mg,
                sugar_g: data[i].sugar_g,
                calories: estimateCalories(data[i].protein_g, data[i].carbohydrates_total_g, data[i].fat_total_g, data[i].sugar_g)
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

function displayMealTable(arr) {
    const mealTable = document.getElementById('daily-meals');
    let mealData = `<tr class="full-width">
                            <th scope="col"></th>
                            <th scope="col">Meal Description</th>
                            <th scope="col">Total Calories</th>
                            <th scope="col">Action</th>
                        </tr>`
    for (i=0; i < arr.length; i++) {
        mealData += `<tr>
            <td>${i+1}</td>
            <td>$${arr[i]}</td>
            <td>3000</td>
            <td><button class="btn-danger">Delete</button></td>
        </tr>`
    }

    mealTable.innerHTML = mealData
}

function displayNutrientsTable() {
    const nutritionTable = document.getElementById('daily-nutrition');
    data = JSON.parse(localStorage.getItem('calorie-app-meals'))  //change to nutrients table

    let nutritionData = `<tr class="full-width">
                            <th scope="col">Item</th>
                            <th scope="col">Calories</th>
                            <th scope="col">Carbs</th>
                            <th scope="col">Protein</th>
                            <th scope="col">Fat</th>
                            <th scope="col">Cholestrol</th>
                            <th scope="col">Sugar</th>
                            <th scope="col">Fibre</th>
                            <th scope="col">Potassium</th>
                            <th scope="col">Sodium</th>
                        </tr>`
    
    for (i=0; i < data.length; i++) {
        nutritionData += `<tr>
            <td>${data[i].name}</td>
            <td>${data[i].calories}</td>
            <td>${data[i].carbohydrates_total_g}</td>
            <td>${data[i].protein_g}</td>
            <td>${data[i].fat_total_g}</td>
            <td>${data[i].cholesterol_mg}</td>
            <td>${data[i].sugar_g}</td>
            <td>${data[i].fiber_g}</td>
            <td>${data[i].potassium_mg}</td>
            <td>${data[i].sodium_mg}</td>
        </tr>`
    }

    nutritionTable.innerHTML = nutritionData
}


console.log(JSON.parse(localStorage.getItem('calorie-app-meals')))
displayMealTable(["1/2 kg beef", "3 queencakes"])
displayNutrientsTable()