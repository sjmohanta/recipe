import { useState } from "react";
import TopNav from "./TopNav";
import appConfig from "../Utility/AppConfig";
import { getAuthInfo } from "../Utility/AuthUtility";
import { Link, useNavigate } from "react-router-dom";
import getBase64 from "../Utility/FileUtility";

export default function CreateRecipe()
{
    const navigate = useNavigate();

    const [recipe, updateRecipeState] = useState({
        name: undefined,
        prepTimeMinutes: undefined,
        noOfintegrands: 4,
        integrands: [],
        noOfInstructions: 6,
        instructions: [],
        image: undefined
    });

    var authInfo = getAuthInfo();
    if (!authInfo)
    {
        return <>
        <TopNav></TopNav>
        <h4 className="text-danger">Unauthorized Request</h4>
        <p>
            You are not authorized to view this page, please login to proceed.<br/><br/>
            <Link to="/login" className="btn btn-primary">
                Login
            </Link>
        </p>
        </>;
    }    

    function validateForm()
    {
        // To-do : Validate
        const apiRootUrl = appConfig("ApiRootPath");
        const {noOfintegrands, noOfInstructions, ...dataToPost} = {...recipe, userId: authInfo.uid};

        dataToPost.integrands = dataToPost.integrands.filter(inte => inte && inte.length);
        dataToPost.instructions = dataToPost.instructions.filter(inst => inst && inst.length);

        fetch(`${apiRootUrl}/recipes`, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({...dataToPost})
        })
        .then(function (response) {      
            
            if(response.ok){
                response.json().then(function (result) {                    
                    debugger;
                    navigate(`/Recipe/${result.id}`);
                });
            }
            else
            {
                debugger;
            }
        });
    }

    function increaseNoOfIntegrands()
    {
        updateRecipeState({...recipe, noOfintegrands: ++recipe.noOfintegrands});
    }

    function decreaseNoOfIntegrands()
    {
        if (recipe.noOfintegrands == 1)
        {
            return; // can not have zero integrands
        }
        updateRecipeState({...recipe, noOfintegrands: --recipe.noOfintegrands});
    }

    function increaseNoOfSteps()
    {
        updateRecipeState({...recipe, noOfInstructions: ++recipe.noOfInstructions});
    }

    function decreaseNoOfSteps()
    {
        if (recipe.NoOfSteps == 1)
        {
            return; // can not have zero steps
        }

        updateRecipeState({...recipe, noOfInstructions: --recipe.noOfInstructions});
    }

    function recipeNameChanged(e)
    {
        updateRecipeState({...recipe, name: e.target.value});
    }

    function integrandChanged(e, position)
    {
        recipe.integrands[position] = e.target.value;
        updateRecipeState({...recipe, integrands: recipe.integrands});
    }

    function instructionChanged(e, position)
    {
        recipe.instructions[position] = e.target.value;
        updateRecipeState({...recipe, instructions: recipe.instructions});
    }    

    function recipeImageChanged(e)
    {
        if (e.target.files)
        {
            // convert image to base 64
            getBase64(e.target.files[0], function (base64Img) {
                debugger;
                updateRecipeState({...recipe, image: base64Img});
            }, 
            function (e) {
                console.warn(e);
            });
        }
        else{
            updateRecipeState({...recipe, image: undefined});
        }        
    }

    function recipePreparationTimeChanged(e)
    {
        recipe.prepTimeMinutes = e.target.value;
        updateRecipeState({...recipe});
    }

    return <>
        <TopNav></TopNav>
        <div className="container-fluid">
            <h1 className="text-primary">
                Create Recipe
            </h1>
            <form className="col-8">
                <div className="mb-3">
                    <label htmlFor="txtRecipeName" className="form-label">Name <span className="text-danger">*</span></label>
                    <input className="form-control" id="txtRecipeName" placeholder="Recipe Name" onChange={recipeNameChanged} required />
                </div>  
                <div className="mb-3">
                    <label htmlFor="txtPreparationTime" className="form-label">Preparation time (minutes) <span className="text-danger">*</span></label>
                    <input className="form-control" id="txtPreparationTime" placeholder="Preparation time (minutes)" onChange={recipePreparationTimeChanged} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="recipeImage" className="form-label">Image <span className="text-danger">*</span></label>
                    <input type="file" accept="image/*" className="form-control" id="recipeImage" onChange={recipeImageChanged} required />
                </div>          
                <div className="mb-3">
                    <label className="form-label">Integrends <span className="text-danger">*</span></label>
                    <span className="btn btn-outline-secondary btn-sm ms-3 me-1" onClick={increaseNoOfIntegrands}>+</span>
                    <span className="btn btn-outline-secondary btn-sm" onClick={decreaseNoOfIntegrands}>-</span>
                    {
                        [...Array(recipe.noOfintegrands).keys()].map(key => <input onChange={(e) => integrandChanged(e, key)} key={`txtIntegrend${key + 1}`} className="form-control mb-1" 
                            placeholder={`Integrend ${key + 1}`} required />)
                    }
                </div>
                <div className="mb-3">
                    <label className="form-label" required>Instructions <span className="text-danger">*</span></label>
                    <span className="btn btn-outline-secondary btn-sm ms-3 me-1" onClick={increaseNoOfSteps}>+</span>
                    <span className="btn btn-outline-secondary btn-sm" onClick={decreaseNoOfSteps}>-</span>
                    {
                        [...Array(recipe.noOfInstructions).keys()].map(key => <input onChange={(e) => instructionChanged(e, key)} key={`txtStep${key + 1}`} className="form-control mb-1" 
                            placeholder={`Instruction ${key + 1}`} required />)
                    }
                </div>
                <button type="button" className="btn btn-primary" onClick={validateForm}>Create</button>
            </form>
        </div>        
    </>;    
}