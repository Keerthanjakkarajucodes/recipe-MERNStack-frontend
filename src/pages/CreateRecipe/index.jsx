  import React, { useState } from "react";
  import API from "../../services/api.js";
  import { useNavigate } from "react-router-dom";
  import "./index.css";

  const CreateRecipe = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [steps, setSteps] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [cookTime, setCookTime] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          alert("You must be logged in to create a recipe.");
          return;
        }

        const recipeData = {
          title,
          description,
          ingredients: ingredients.split(",").map((i) => i.trim()),
          steps: steps.split(",").map((s) => s.trim()),
          prepTime: Number(prepTime) || 0,
          cookTime: Number(cookTime) || 0,
          image,
        };

        await API.post("/recipes", recipeData)

        alert("✅ Recipe created successfully!");
        navigate("/", { state: { created: true } }); 
      } catch (error) {
        console.error("Error creating recipe:", error.response?.data || error.message);
        alert(error.response?.data?.message || "❌ Failed to create recipe. Please try again.");
      }
    };

    return (
      <div className="form-container">
        <h2 className="form-title">Create a Recipe</h2>
        <form onSubmit={handleSubmit} className="recipe-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <textarea
            placeholder="Ingredients (comma separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
          <textarea
            placeholder="Steps (comma separated)"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Prep Time (mins)"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
          />
          <input
            type="number"
            placeholder="Cook Time (mins)"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <button type="submit" className="save-btn">
            Save Recipe
          </button> 
        </form>
      </div>
    );
  };

  export default CreateRecipe;
