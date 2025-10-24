import {useState} from "react";
import supabase from "../utils/supabase";
import PotluckBevs from "./PotluckBeverages";
import PotluckUtensils from "./PotluckUtensils";

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
        )
    }

    //retreiving list of meals to display
    async function handleFetchMeals(){
    console.log("Fetching meals...");
    //Add fetch logic in next step
    //below is storing result of fetch in a variable(const result)
    const result = await supabase.from("potluck_meals").select();
    
    //storing the data retrieved (extraction of data)
    const data = result.data;

    //log the fetched data into console
    console.log("Fetched data: ", data);

    //update the meals state with the data **json object in console **
    setMeals(data);
}

    return (
        <>
            <h1>Welcome to Our Potluck Meals App!!</h1>
            <button onClick={handleFetchMeals}>Fetch Meal List</button>
            <ul>
                {mealsDisplay}
            </ul>
            <PotluckUtensils />
            <PotluckBevs />

        </>
    );

}