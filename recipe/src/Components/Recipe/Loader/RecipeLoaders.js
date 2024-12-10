import appConfig from "../../../Utility/AppConfig";

export async function latestRecipiesLoader()
{
    const apiRootUrl = appConfig("ApiRootPath");
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
    const apiRootUrl = appConfig("ApiRootPath");
    var response = await fetch(`${apiRootUrl}/recipes/${params.id}`);
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