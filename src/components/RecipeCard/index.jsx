import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../../services/api.js";
import "./index.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await API.get("/recipes"); 
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [location.state?.updated]); 

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("❌ You must be logged in to delete a recipe.");
        return;
      }

    
        await API.delete(`/recipes/${id}`);
      

      setRecipes(recipes.filter((recipe) => recipe._id !== id));
      setSuccessMsg("🗑️ Recipe deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (error) {
      console.error("Error deleting recipe:", error.response?.data || error);
      alert("❌ Failed to delete recipe. Try again.");
    }
  };

  return (
    <div className="home-container">
      <h1 className="page-title">🍽️ Delicious Recipes</h1>
      <p className="page-subtitle">
        Discover and share your favorite recipes. Create your own and see them
        appear here instantly!
      </p>

      {location.state?.created && (
        <div className="success-banner">🎉 Recipe Created Successfully!</div>
      )}
      {successMsg && <div className="success-banner">{successMsg}</div>}

      <div className="create-btn-container">
        <Link to="/create" className="create-btn">
          + Create New Recipe
        </Link>
      </div>

      {loading ? (
        <p>⏳ Loading recipes...</p>
      ) : recipes.length === 0 ? (
        <p>No recipes yet. Be the first to create one!</p>
      ) : (
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

                <div className="time-info">
                  <p>
                    <strong>⏳ Prep Time:</strong>{" "}
                    {recipe.prepTime !== undefined
                      ? `${recipe.prepTime} mins`
                      : "Not specified"}
                  </p>
                  <p>
                    <strong>🔥 Cook Time:</strong>{" "}
                    {recipe.cookTime !== undefined
                      ? `${recipe.cookTime} mins`
                      : "Not specified"}
                  </p>
                  {recipe.prepTime !== undefined &&
                    recipe.cookTime !== undefined && (
                      <p>
                        <strong>🕒 Total:</strong>{" "}
                        {recipe.prepTime + recipe.cookTime} mins
                      </p>
                    )}
                </div>

                <div className="card-actions">
                  <button
                    className="update-btn"
                    onClick={() =>
                      navigate(`/update/${recipe._id}`, { state: { recipe } })
                    }
                  >
                    ✏️ Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(recipe._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
