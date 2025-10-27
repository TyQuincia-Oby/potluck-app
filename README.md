# Potluck Management Application

## Features
- Select dropdowns
- CRUD 
    - Create new rows
    - Read list
    - Update List
    - Delete (coming soon)
- Drink condition when "drink" is selected in meal type select dropdown
- Utensil condition when meal is submitted

## Technologies
- React 19
- Vite
- CSS
- JavaScript ES6+
- Supabase
- Netlify

## Installation
bash 
run command: npm install

## Running the Application
run command: npm run dev

## Utilizing the Application
User will initially see the potluck meal insertion page with the form. After insertion, the list of other meals will appear and the utensils page will prompt user to bring a utensil.

If user decides to bring a drink, the drink page (component) will pop up.

## What I learned
- Creating and updating lists with Supabase (list in Supabase also updated with selected after insert)
- Ordering list items in javascript with order()
- Clearing targeted forms after submitting to ensure user can keep adding rows into database



https://potluckapp.netlify.app/