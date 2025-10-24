import {useState} from "react"
import supabase from "../utils/supabase"

export default function PotluckUtensils(){
    const [utensils, setUtensils] = useState([]);

    async function handleFetchUtensils(){
        console.log("Fetching Utensils...");
        const result = await supabase.from("potluck_utensils").select();
        const data = result.data;
        console.log("Fetched data: ", data);
        setUtensils(data);
    }


    return(
        <>
            <h1>What Utensils Will You Bring?</h1>
            <button onClick={handleFetchUtensils}>Fetch All Utensils</button>
        </>
    );

}