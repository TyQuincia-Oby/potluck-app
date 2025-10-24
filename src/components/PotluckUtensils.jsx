import {useState} from "react";
import supabase from "../utils/supabase";

export default function PotluckUtensils(){
    const [utensils, setUtensils] = useState([]);

    //array for all utensils
    const utensilsDisplay = [];

    //for loop to iterate through the list
    for (let i = 0; i <utensils.length; i++){

        //adding utensils to list
        utensilsDisplay.push(
            <li key={utensils[i].id}>
                {utensils[i].utensil_name} by {utensils[i].your_name} is for {utensils[i].utensil_type}
            </li>
        )


    }

    //retrieve list of utensils that will be brought
    async function handleFetchUtensils(){
        console.log("Fetching Utensils...");

         //below is storing result of fetch in a variable(const result)
        const result = await supabase.from("potluck_utensils").select();

        //storing the data retrieved (extraction of data)
        const data = result.data;

        //log the fetched data into console
        console.log("Fetched data: ", data);

         //update the utensils state with the data **json object in console **
        setUtensils(data);
    }


    return(
        <>
            <h1>What Utensils Will You Bring?</h1>
            <button onClick={handleFetchUtensils}>Fetch All Utensils</button>
            <ul>
                {utensilsDisplay}
            </ul>
        </>
    );

}