import {useState} from "react";
import supabase from "../utils/supabase";
import PotluckBevs from "./PotluckBeverages";
import PotluckUtensils from "./PotluckUtensils";

//rls added when table was built

export default function PotluckMeals(){
    const [meals,setMeals] = useState([]);

    //array for all meals
    const mealsDisplay = [];

    //for loop to iterate through the list
    for (let i = 0; i < meals.length ; i++){

        //adding meals to list
        mealsDisplay.push(
            <li key ={meals[i].id}>
                {meals[i].meal_name} by {meals[i].your_name} serves {meals[i].guests_served} ({meals[i].meal_type});
            </li>
        );
    }

    //retreiving list of meals to display
    async function handleFetchMeals(){
        console.log("Fetching meals...");
        //Add fetch logic in next step
        //below is storing result of fetch in a variable(const result)
        const result = await supabase.from("potluck_meals").select().order("your_name");
        
        //storing the data retrieved (extraction of data)
        const data = result.data;

        //log the fetched data into console
        console.log("Fetched data: ", data);

        //update the meals state with the data **json object in console **
        setMeals(data);
    }

    async function handleAddMeal(event){
        console.log("handle add meal submitted");
        console.log(event.target.elements.mealName.value);
        console.log(event.target.elements.yourName.value);
        console.log(event.target.elements.kindOfDish.value);
        console.log(event.target.elements.serves.value);

        //prevents page refreshing
        event.preventDefault();

        const mealName = event.target.elements.mealName.value;
        const yourName = event.target.elements.yourName.value;
        const kindOfDish = event.target.elements.kindOfDish.value;
        const serves = event.target.elements.serves.value;

        let newMeal = {
            meal_name : mealName,
            your_name : yourName,
            meal_type : kindOfDish,
            guests_served : parseInt(serves)
        }

        console.log(newMeal);

    }

    return (
        <>
            <h1>Welcome to Our Potluck Meals App!!</h1>
            <button onClick={handleFetchMeals}>Fetch Meal List</button>
            <ul>
                {/* Display list of meals */}
                {mealsDisplay}
            </ul>
            <div>
                <form onSubmit={handleAddMeal}>
                    <label>
                        Meal: <input type="text" name="mealName" />
                    </label>
                    <br/>
                    <label>
                        Your Name: <input type="text" name="yourName" />
                    </label>
                    <br/>
                    <label>
                        Serves: <input type="number" name="serves" />
                    </label>
                    <br/>
                    <label>
                        Kind of Dish: <input type="text" name="kindOfDish" />
                    </label>
                    <br/>
                    <button type="submit">Add Meal</button>
                </form>
            </div>
            {/* Utensil and Beverage components */}
            <PotluckUtensils />
            <PotluckBevs />

        </>
    );

}