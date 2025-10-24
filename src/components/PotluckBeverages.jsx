import {useState} from "react";
import supabase from "../utils/supabase"

export default function PotluckBevs(){
    const [drinks, setDrinks] = useState([]);

    async function handleFetchBevs(){
        console.log("Fetching beverages...")
         const result = await supabase.from("potluck_beverages").select();
        const data = result.data;
        console.log("Fetched data: ", data);
        setDrinks(data);
    }


    return(
        <>
            <h1>What Are You Bringing To Drink?? </h1>
            <button onClick={handleFetchBevs}>Fetch Drink List</button>
        </>
    );

}