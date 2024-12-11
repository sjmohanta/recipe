import appConfig from "../../../Utility/AppConfig";

const apiRootUrl = appConfig("ApiRootPath");

export async function latestRecipiesLoader()
{
    var response = await fetch(`${apiRootUrl}/recipes`);
    if (response.ok)
    {
        return await response.json();
    }
    else
    {
        return new Response('Error while getting latest recipes', {
            status: 500
        });
    }
}

export async function recipieDetailsLoader({request, params})
{
    const recipeId = params.id;

    return {
        recipeDetails: await fetchRecipeDetails(recipeId),
        recipeReviews: fetchRecipeReviews(recipeId),
    };
}

async function fetchRecipeReviews(recipeId) {
    var response = await fetch(`${apiRootUrl}/reviews?recipeId=${recipeId}`);

    if (response.ok)
    {
        return await response.json();
    }
    else
    {
        return new Response('Error while getting recipe reviews', {
            status: 500
        });
    }
}

async function fetchRecipeDetails(recipeId) {
    var response = await fetch(`${apiRootUrl}/recipes/${recipeId}`);
    if (response.ok)
    {
        return await response.json();
    }
    else
    {
        return new Response('Error while getting recipe details', {
            status: 500
        });
    }
}