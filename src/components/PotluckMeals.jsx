import {useState} from "react";
import supabase from "../utils/supabase";

async function handleFetchMeals(){
    console.log("Fetching meals...");
    //Add fetch logic in next step

}

export default function PotluckMeals(){
    const [meals,setMeals] = useState([]);

    return (
        <>
            <h1>Welcome to Our Potluck Meals App!!</h1>
            <button onClick={handleFetchMeals}>Fetch Meal List</button>
            <ul>
                {/* Place Meals Here */}
            </ul>

        </>
    );

}