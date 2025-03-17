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

/** Fetching nutrients data from Calorie Ninja API **/
function estimateProtein(potassium_mg) {
    // No protein data available from API, therefore we estimate it from available data
    // Protein grams seem to be approximately 0.1 of potassium miligrams numerous times
    // This is a poor estimate, should get protein data from premium version of the API
    return 0.1 * potassium_mg
}

function estimateCalories(protein_g, carbohydrates_total_g, fat_total_g, sugar_g) {
    // No calorie data from API, therefore, we estimate it from available data
    // As per nutritional info, 1 gram of protein,  carbohydrates, and sugar each contain 4 calories, while 1 gram of fat contains 9 calories
    // This is a good estimate, but most accurate data can be gotten from premium version of the API
    return 4 * (protein_g + carbohydrates_total_g + sugar_g) + 9 * fat_total_g
}

async function getNutritionData(queryText, timestamp) {
    // Query API Ninjas API to get individual food items from query text
    // Returns an array with nutrients data for every food item on query text
    const url = "https://api.api-ninjas.com/v1/nutrition?query=" + queryText; // API Call
    try {
        const response = await fetch(url, {headers: {'X-Api-Key': '+hD6HZuQLtjhEQIit+pGdg==AFFCjQr3XavEwrfQ'}});
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        var foodItems = []; // Array of all individual foof items consumed (from query text) and their nutrients
        for (i=0; i<data.length; i++) {
            foodItems.push({ meal: timestamp.toLocaleTimeString("en-US"),
                name: data[i].name,
                carbohydrates_total_g: data[i].carbohydrates_total_g,
                cholesterol_mg: data[i].cholesterol_mg,
                fat_total_g: data[i].fat_total_g,
                fiber_g: data[i].fiber_g,
                potassium_mg: data[i].potassium_mg,
                sodium_mg: data[i].sodium_mg,
                sugar_g: data[i].sugar_g,
                protein_g: estimateProtein(data[i].potassium_mg),
                calories: estimateCalories(Number(data[i].protein_g), Number(data[i].carbohydrates_total_g), Number(data[i].fat_total_g), Number(data[i].sugar_g))
            });
        }
        addFoodItems(foodItems);
        displayNutritionTable()
        console.log('Success');
    } catch (error) {
        console.error(error.message);
    }
}

function addFoodItems(foodItems) {
    // Adds array of food items with their nutrient data to local storage
    let consumption = JSON.parse(localStorage.getItem('calorie-app-consumption'));

    // Add all food items into local storage
    if (consumption == null || consumption.length == 0 || consumption.length == undefined)  {
        localStorage.setItem('calorie-app-consumption', JSON.stringify([foodItems]));
    } else {
        for (i=0; i < foodItems.length; i++) {
            consumption.push(foodItems[i]);
        }
        localStorage.setItem('calorie-app-consumption', JSON.stringify(consumption));
    }
}

async function addMeal() {
    // Get meal from form entry and add data to local storage
    const meal = document.getElementById('description')
    if (meal.value != null) {
        let meals = JSON.parse(localStorage.getItem('calorie-app-meals'))
        timestamp = Date.now()
        
        // Get nutrition data and add to local storage
        await getNutritionData(meal.value, timestamp)

        // Add meal entered into local storage
        if (meals == null || meals.length == 0 || meals.length == undefined)  {
            localStorage.setItem('calorie-app-meals', JSON.stringify([{id: timestamp, description: meal.value, calories: 500}]))
        } else {
            meals.push({id: timestamp, description: meal.value, calories: 500}) // use timestamp instead of id
            localStorage.setItem('calorie-app-meals', JSON.stringify(meals))
        }

        meal.value = ""
        displayMealTable()
    }
}

function displayMealTable() {
    const mealTable = document.getElementById('daily-meals');
    data = JSON.parse(localStorage.getItem('calorie-app-meals'))

    let mealData = `<tr class="full-width">
                            <th scope="col"></th>
                            <th scope="col">Meal Description</th>
                            <th scope="col">Total Calories</th>
                            <th scope="col">Action</th>
                        </tr>`
    for (i=0; i < data.length; i++) {
        mealData += `<tr>
            <td>${data[i].id.toLocaleTimeString()}</td>
            <td>${data[i].description}</td>
            <td>${data[i].calories}</td>
            <td><button class="btn-danger" onclick="deleteItem(data[i].id)">Delete</button></td>
        </tr>`
    }

    mealTable.innerHTML = mealData
}

function displayNutritionTable() {
    const nutritionTable = document.getElementById('daily-nutrition');
    data = JSON.parse(localStorage.getItem('calorie-app-consumption'))  //change to nutrients table

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
                            <th scope="col">Meal ID</th>
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
            <td>${data[i].meal.toLocaleTimeString()}</td>
        </tr>`
    }

    nutritionTable.innerHTML = nutritionData
}

// localStorage.clear()
displayMealTable()
displayNutritionTable()
// console.log(JSON.parse(localStorage.getItem('calorie-app-meals')))