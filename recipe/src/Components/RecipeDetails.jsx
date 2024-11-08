import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import AppConfig from "../AppConfig";

export default function RecipeDetails()
{
    debugger;

    const { id } = useParams();

    const [recepieDetails, setRecepieDetails] = useState({
        status: 0,
        recepeDetails: undefined
    });

    useEffect(() => {
        const apiRootUrl = AppConfig("ApiRootPath");
        fetch(`${apiRootUrl}recipes/${id}`)
        .then(function (response) {        
            if(response.ok){
                response.json().then(function (result) {                    
                    setRecepieDetails({
                        ...recepieDetails,
                        status: 200,
                        recepeDetails: result
                    });
                });    
            }
            else 
            {                
                setRecepieDetails({
                    ...recepieDetails,
                    status: 500
                });
            }
        });
    }, []);

    return <p>
        Recipe Details for {JSON.stringify(recepieDetails)}
    </p>
}