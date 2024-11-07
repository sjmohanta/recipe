import AppConfig from "../AppConfig";
import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

export default function TopRecipies({ message }) {
  const [latestRecepieData, setLatestRecepis] = useState(undefined);

  useEffect(() => {
    const apiRootUrl = AppConfig("ApiRootPath");
    fetch(`${apiRootUrl}recipes`).then(async (response) => {
      if (response.ok) {
        const result = await response.json();
        setLatestRecepis(result);
      } else {
        setLatestRecepis([]);
      }
    });
  }, []);

  return (
    <div>
      {!latestRecepieData ? (
        <div className="d-flex justify-content-center">
          <p className="text-info">Loading ...</p>
        </div>
      ) : latestRecepieData.length === 0 ? (
        <div className="d-flex justify-content-center">
          <p className="text-warning">
            No recipes were found. Be the first to add a recipe.
          </p>
        </div>
      ) : (
        latestRecepieData.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))
      )}
    </div>
  );

  // var recipeCards = latestRecepieData.map(function (recipe) {
  //     return <RecipeCard {...recipe}></RecipeCard>;
  // });

  // return <div>
  //     <h2 className="text-info">Latest Recepies</h2>
  //     <hr></hr>
  //     <div className="row">
  //         {latestRecepieData.status == 0 && <p>{latestRecepieData.message}</p>}
  //         {latestRecepieData.status == 200 && !latestRecepieData.recepies.length && <p className="text-warning">
  //         No receipies were found. Be the first to add a recipe</p>}
  //         {latestRecepieData.status == 200 && latestRecepieData.recepies.length && recipeCards}
  //         {latestRecepieData.status == 500 && <p className="text-danger">Something went wrong while getting recipies. Please check again later.</p>}
  //     </div>
  // </div>
}