import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}recipes`
        );
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

   const fetchSavedRecipes = async () => {
     try {
       const response = await axios.get(
         `${process.env.REACT_APP_BASE_URL}recipes/saved-recipes/ids/${userID}`
       );
       const savedRecipeIDs = response.data.savedRecipes.map(
         (recipe) => recipe._id
       );
       setSavedRecipes(savedRecipeIDs);
     } catch (err) {
       console.log(err);
     }
   };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}recipes`, {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className="recipess">
      <h1 style={{color:"white"}}>Recipes</h1>
      <ul style={{ display: "flex",flexWrap:"wrap",margin:"30px",padding:"20px",width:"450px"}} className="recipe">
        {recipes.map((recipe) => (
          <li key={recipe._id} style={{ width: "100%", margin: "10px" }}>
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <h2>{recipe.name}</h2>
                <p>{recipe.description}</p>
                <button
                  onClick={() => saveRecipe(recipe._id)}
                  disabled={isRecipeSaved(recipe._id)}
                >
                  {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                </button>
              </div>
              <div style={{ flex: 1 }}>
                <img src={recipe.imageUrl} alt={recipe.name} />
              </div>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
