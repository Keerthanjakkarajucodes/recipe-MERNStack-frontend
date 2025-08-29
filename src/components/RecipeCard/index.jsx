import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axios.get(
          "https://recipe-project-backend-2.onrender.com/api/recipes"
        );
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div className="home-container">
      <h1 className="page-title">🍽️ Delicious Recipes</h1>
      <p className="page-subtitle">
        Discover and share your favorite recipes. Create your own and see them
        appear here instantly!
      </p>

      <div className="create-btn-container">
        <Link to="/create" className="create-btn">
          + Create New Recipe
        </Link>
      </div>

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <div key={recipe._id || recipe.title} className="recipe-card">
            <img
              src={recipe.image || "https://via.placeholder.com/300"}
              alt={recipe.title}
              className="recipe-img"
            />
            <div className="recipe-content">
              <h3>{recipe.title}</h3>
              <p className="desc">{recipe.description}</p>
              <p>
                <strong>Ingredients:</strong>{" "}
                {recipe.ingredients?.join(", ")}
              </p>
              <p>
                <strong>Instructions:</strong>{" "}
                {recipe.steps?.join(" → ")}
              </p>

              {/* ✅ Time Section - handles 0 properly */}
              <div className="time-info">
                <p><strong>⏳ Prep Time:</strong> {recipe.prepTime !== undefined ? `${recipe.prepTime} mins` : "Not specified"}</p>
                <p><strong>🔥 Cook Time:</strong> {recipe.cookTime !== undefined ? `${recipe.cookTime} mins` : "Not specified"}</p>
                {(recipe.prepTime !== undefined && recipe.cookTime !== undefined) && (
                  <p><strong>🕒 Total:</strong> {recipe.prepTime + recipe.cookTime} mins</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
