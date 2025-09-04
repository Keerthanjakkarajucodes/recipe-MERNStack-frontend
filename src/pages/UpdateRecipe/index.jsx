import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // ✅ Import useLocation
import API from "../../services/api.js"; // ✅ Import custom API instance
import "./index.css";

function UpdateRecipe() {
   const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get the location state

  const [recipe, setRecipe] = useState({
   title: "",
   description: "",
   ingredients: "",
   instructions: "",
   prepTime: "",
   cookTime: "",
   servings: "",
   image: "",
  });
  const [message, setMessage] = useState("");

  // ✅ Use the passed state instead of fetching
  useEffect(() => {
   if (location.state?.recipe) { // Check if a recipe was passed
   const { ingredients, steps, ...rest } = location.state.recipe;
   setRecipe({
     ...rest,
     ingredients: ingredients?.join(", ") || "",
     instructions: steps?.join(" → ") || "",
   });  
   } else {
  // Fallback: If no state, fetch the recipe
   const fetchRecipe = async () => {
     try {
     const { data } = await API.get(`/recipes/${id}`);
       setRecipe({
         ...data,
       ingredients: data.ingredients?.join(", ") || "",
       instructions: data.steps?.join(" → ") || "",
     });
     } catch (error) {
       setMessage("❌ Failed to load recipe. Please log in again.");
     }
   };
   fetchRecipe();
   }
  }, [id, location.state]);

  const handleChange = (e) => {
   setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

// ✅ Update recipe using API.put
 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const updatedRecipe = {
     ...recipe,
   ingredients: recipe.ingredients.split(",").map((i) => i.trim()),
   steps: recipe.instructions.split("→").map((s) => s.trim()),
   };

   await API.put(`/recipes/${id}`, updatedRecipe); // ✅ Use API.put and remove headers

   setMessage("✅ Recipe updated successfully!");
   setTimeout(() => navigate("/", { state: { updated: true } }), 1200);
   } catch (error) {
   console.error(error);
   setMessage("❌ Failed to update recipe");
   }
  };

  return (
   <div className="form-container">
   <h2>Update Recipe</h2>
   {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}
   <form onSubmit={handleSubmit}>
   <input name="title" value={recipe.title} onChange={handleChange} placeholder="Title" />
     <textarea name="description" value={recipe.description} onChange={handleChange} placeholder="Description" />
     <textarea name="ingredients" value={recipe.ingredients} onChange={handleChange} placeholder="Ingredients" />
     <textarea name="instructions" value={recipe.instructions} onChange={handleChange} placeholder="Instructions" />
     <input name="prepTime" value={recipe.prepTime} onChange={handleChange} placeholder="Prep Time" />
     <input name="cookTime" value={recipe.cookTime} onChange={handleChange} placeholder="Cook Time" />
     <input name="servings" value={recipe.servings} onChange={handleChange} placeholder="Servings" />
     <input name="image" value={recipe.image} onChange={handleChange} placeholder="Image URL" />
     <button type="submit">Update</button>
     </form>
  </div>
);
}

export default UpdateRecipe;