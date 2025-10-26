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

        // const {data, error} = await supabase.from("potluck_meals").insert(newMeal);
        // if (error){
        //     console.error('Insert failed: ', error);
        //     //gives a user friendly error message if one occurs
        // } else {
        //     console.log('Meal added successfully: ', data);
        //     //update UI to show success, new line (row) will be added
        // }
         //insert working properly
         await supabase.from("potluck_meals").insert(newMeal);

         //update list
         const response = await supabase.from("potluck_meals").select();
         const data = response.data;
         setMeals(data);

         //clear forms after submitting
        event.target.elements.mealName.value = "";
        event.target.elements.yourName.value = "";
        event.target.elements.kindOfDish.value = "";
        event.target.elements.serves.value = "";

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
                        Serves: 
                        <select name="serves" defaultValue="">
                            <option value="" disabled>Select Number of Guests</option>
                            <option value="20">20</option>
                            <option value="40">40</option>
                            <option value="60">60</option>
                            <option value="80">80</option>
                            <option value="100">100</option>
                            {/* <option value="other">Other (Please Specify)</option> */}
                        </select>
                        {/* If someone wants to type in a specfic number other than listed in dropdown
                        <input type="text" id="otherInput" style={{display: none}}placeholder="Specify other..."></input> */}
                    </label>
                    <br/>
                    <label>
                        Kind of Dish: 
                        <select name="kindOfDish" defaultValue="">
                            <option value="" disabled>Select a kind</option>
                            <option value="appetizer">Appetizer</option>
                            <option value="entree">Entree</option>
                            <option value="side">Side</option>
                            <option value="snack">Snack</option>
                            <option value="dessert">Dessert</option>
                            <option value="drink">Drink</option>
                        </select>
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