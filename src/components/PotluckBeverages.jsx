import {useState} from "react";
import supabase from "../utils/supabase";
//rls added when table was built

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
        const result = await supabase.from("potluck_beverages").select().order("guests_served",{ascending:false});

        //storing the data retrieved (extraction of data)
        const data = result.data;

        //log the fetched data into console
        console.log("Fetched data: ", data);
        
         //update the drinks state with the data **json object in console **
        setDrinks(data);
    }

    async function handleAddDrink(event){
        event.preventDefault();
        console.log("handle add drink submitted");
        console.log( event.target.elements.serves.value)

        const drinkName = event.target.elements.drinkName.value;
        const yourName = event.target.elements.yourName.value;
        const drinkType = event.target.elements.drinkType.value;
        const serves = event.target.elements.serves.value;

       let newDrink = {
            drink_name : drinkName,
            your_name : yourName,
            guests_served : parseInt(serves),
            drink_type : drinkType
        }
        
        console.log(newDrink);
        
        //add new drink
        await supabase.from("potluck_beverages").insert(newDrink);
      
        //insert working properly
        //update list automatically
        const response = await supabase.from("potluck_beverages").select();
        const data = response.data;
        setDrinks(data);

        //clear form after submitting
        event.target.elements.yourName.value = "";
        event.target.elements.drinkName.value = "";
        event.target.elements.drinkType.value = "";
        event.target.elements.serves.value = "";

    }

    return(
        <>
            <h1>What Are You Bringing To Drink?? </h1>
            <button onClick={handleFetchBevs}>Fetch Drink List</button>
            <ul>
                {/* Display list of drinks */}
                {drinksDisplay}
            </ul>
            <div>
                <form onSubmit={handleAddDrink}>
                    <label>
                        Drink: <input type="text" name="drinkName"></input>
                    </label>
                    <br/>
                    <label>
                        Your Name: <input type="text" name="yourName"></input>
                    </label>
                    <br/>
                    <label>
                        Serves: <input type="text" name="serves"></input>
                    </label>
                    <br/>
                    <label>
                        Type of Drink: <input type="text" name="drinkType"></input>
                    </label>
                    <br/>
                    <button type="submit">Add Drink</button>
                </form>
            </div>
        </>
    );

}