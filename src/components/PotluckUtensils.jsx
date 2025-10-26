import {useState} from "react";
import supabase from "../utils/supabase";

//rls added when table was built

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
        const result = await supabase.from("potluck_utensils").select().order("utensil_name");

        //storing the data retrieved (extraction of data)
        const data = result.data;

        //log the fetched data into console
        console.log("Fetched data: ", data);

         //update the utensils state with the data **json object in console **
        setUtensils(data);
    }

    async function handleAddUtensil(event){
        event.preventDefault();
        console.log("handle add utensil submitted");
        console.log(event.target.elements)

        const utensilName = event.target.elements.utensilName.value;
        const yourName = event.target.elements.yourName.value;
        const utensilType = event.target.elements.utensilType.value;

        let newUtensil = {
            utensil_name : utensilName,
            your_name : yourName,
            utensil_type : utensilType
        }

        console.log(newUtensil);

    //    const {data, error} = await supabase.from("potluck_utensils").insert(newUtensil);
    //    if (error){
    //         console.log('Insertion failed: ', error);
    //    } else {
    //         console.log('Utensil added successfully: ', data);
    //    }
        //insert working properly
        await supabase.from("potluck_utensils").insert(newUtensil);

        //list update without refreshing screen
        const response = await supabase.from("potluck_utensils").select();
        const data = response.data;
        setUtensils(data);

        //clear forms after submitting
        event.target.elements.yourName.value = "";
        event.target.elements.utensilName.value = "";
        event.target.elements.utensilType.value = "";
        
    }


    return(
        <>
            <h1>What Utensils Will You Bring?</h1>
            <button onClick={handleFetchUtensils}>Fetch All Utensils</button>
            <ul>
                {/* Display list of utensils */}
                {utensilsDisplay}
            </ul>
            <div>
                <form onSubmit={handleAddUtensil}>
                    <label>
                        Utensil: <input type="text" name="utensilName" />
                    </label>
                    <br/>
                    <label>
                        Your Name: <input type="text" name="yourName" />
                    </label>
                    <br/>
                        Used For: <input type="text" name="utensilType" />
                    <br/>
                    <button type="submit">Add Utensil</button>
                </form>
            </div>
        </>
    );

}