import {useState} from "react";
import supabase from "../utils/supabase";

export default function PotluckBevs(){
    const [drinks, setDrinks] = useState([]);

    //array for all drinks
    const drinksDisplay = [];

    //iterate through the list
    for (let i = 0; i <drinks.length; i++){


        drinksDisplay.push(
        //adding drinks to list
        <li key={drinks[i].id}>
            {drinks[i].drink_name} by {drinks[i].your_name} serves {drinks[i].guests_served} ({drinks[i].drink_type});
        </li>
        );
    }
    

    //retrieve list of beverages that will be brought
    async function handleFetchBevs(){
        console.log("Fetching beverages...");

         //below is storing result of fetch in a variable(const result)
        const result = await supabase.from("potluck_beverages").select();

        //storing the data retrieved (extraction of data)
        const data = result.data;

        //log the fetched data into console
        console.log("Fetched data: ", data);
        
         //update the drinks state with the data **json object in console **
        setDrinks(data);
    }


    return(
        <>
            <h1>What Are You Bringing To Drink?? </h1>
            <button onClick={handleFetchBevs}>Fetch Drink List</button>
            <ul>
                {/* Display list of drinks */}
                {drinksDisplay}
            </ul>
        </>
    );

}