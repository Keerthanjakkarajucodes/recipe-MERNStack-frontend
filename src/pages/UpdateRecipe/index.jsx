import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

function UpdateRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  // ✅ Fetch single recipe
  useEffect(() => {
    axios
      .get(`https://recipe-project-backend-2.onrender.com/api/recipes/${id}`)
      .then((res) => {
        // convert arrays to comma/arrow string for editing
        setRecipe({
          ...res.data,
          ingredients: res.data.ingredients?.join(", ") || "",
          instructions: res.data.steps?.join(" → ") || "",
        });
      })
      .catch(() => setMessage("❌ Failed to load recipe"));
  }, [id]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  // ✅ Update recipe
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("❌ You must be logged in to update a recipe.");
        return;
      }

      const updatedRecipe = {
        ...recipe,
        ingredients: recipe.ingredients.split(",").map((i) => i.trim()),
        steps: recipe.instructions.split("→").map((s) => s.trim()),
      };

      await axios.put(
        `https://recipe-project-backend-2.onrender.com/api/recipes/${id}`,
        updatedRecipe,
        { headers: { Authorization: `Bearer ${token}` } }
      );

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