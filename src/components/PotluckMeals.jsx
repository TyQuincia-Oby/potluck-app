import {useState} from "react";
import supabase from "../utils/supabase";



export default function PotluckMeals(){
    const [meals,setMeals] = useState([]);

    return (
        <>
            <h1>Welcome to Our Potluck Meals App!!</h1>
            <button>Fetch Meal List</button>
            <ul>
                {/* Place Meals Here */}
            </ul>

        </>
    );

}