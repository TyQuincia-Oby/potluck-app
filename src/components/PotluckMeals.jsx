import {useState} from "react";
import supabase from "../utils/supabase";
import PotluckBevs from "./PotluckBeverages";
import PotluckUtensils from "./PotluckUtensils";

export default function PotluckMeals(){
    const [meals,setMeals] = useState([]);

    async function handleFetchMeals(){
    console.log("Fetching meals...");
    //Add fetch logic in next step
    const result = await supabase.from("potluck_meals").select();
    const data = result.data;
    console.log("Fetched data: ", data);
    setMeals(data);


}

    return (
        <>
            <h1>Welcome to Our Potluck Meals App!!</h1>
            <button onClick={handleFetchMeals}>Fetch Meal List</button>
            <ul>
                {/* <li>{show meal list here</li> */}
            </ul>
            <PotluckUtensils />
            <PotluckBevs />

        </>
    );

}