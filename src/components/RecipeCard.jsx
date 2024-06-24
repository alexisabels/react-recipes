import { Heart, HeartPulse, Soup } from "lucide-react";
import React, { useState } from "react";

function RecipeCard({ recipe, bg, badge }) {
  const getTwoValuesFromArray = (arr) => {
    return [arr[0], arr[1]];
  };
  const healthLabels = getTwoValuesFromArray(recipe.healthLabels);
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem("favorites")?.includes(recipe.label)
  );
  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeInFavorites = favorites.some(
      (fav) => fav.label == recipe.label
    );
    if (isRecipeInFavorites) {
      favorites.filter((fav) => fav.label !== recipe.label);
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  return (
    <>
      <div
        className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}
      >
        <a
          href={`https://youtube.com/results?search_query=${recipe.label} receta`}
          target="_blank"
          className="relative h-32"
        >
          <img
            src={recipe.image}
            alt="recipe img"
            className="rounded-md w-full h-full  object-cover cursor-pointer"
          />
          <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
            <Soup size={24} /> {recipe.yield} Servings
          </div>
          <div
            className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              addRecipeToFavorites();
            }}
          >
            {!isFavorite && (
              <Heart
                className="hover:fill-red-500 hover:text-red-500"
                size={20}
              />
            )}

            {isFavorite && (
              <Heart className="fill-red-500 text-red-500" size={20} />
            )}
          </div>
        </a>
        <div className="flex mt-1">
          <p className="font-bold tracking-wide">{recipe.label}</p>
        </div>
        <p className="my-2 capitalize">{recipe.cuisineType}</p>
        <div className="flex gap-2 mt-auto">
          {healthLabels.map((label, index) => (
            <div
              key={index}
              className={`flex gap-1 ${badge} items-center p-1 rounded-md`}
            >
              <HeartPulse size={16} />{" "}
              <span className="text-sm tracking-tighter font-semibold">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RecipeCard;
