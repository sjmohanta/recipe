import { useRef, useState } from "react";
import TopNav from "./TopNav";
import appConfig from "../Utility/AppConfig";
import { getAuthInfo } from "../Utility/AuthUtility";
import { Link } from "react-router-dom";

export default function CreateRecipe()
{
    const [recipe, updateRecipeState] = useState({
        name: undefined,
        noOfintegrands: 4,
        integrands: [],
        noOfInstructions: 6,
        instructions: []
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
        debugger;
        const apiRootUrl = appConfig("ApiRootPath");
        const {noOfintegrands, noOfInstructions, ...dataToPost} = {...recipe, userId: authInfo.id};

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

    return <>
        <TopNav></TopNav>
        <h1 className="text-primary">
            Create Recipe
        </h1>
        <form className="col-8">
            <div class="mb-3">
                <label for="txtRecipeName" class="form-label">Name</label>
                <input class="form-control" id="txtRecipeName" placeholder="Recipe Name" onChange={recipeNameChanged} required />
            </div>            
            <div class="mb-3">
                <label class="form-label">Integrends</label>
                <span class="btn btn-outline-secondary btn-sm ms-3 me-1" onClick={increaseNoOfIntegrands}>+</span>
                <span class="btn btn-outline-secondary btn-sm" onClick={decreaseNoOfIntegrands}>-</span>
                {
                    [...Array(recipe.noOfintegrands).keys()].map(key => <input onChange={(e) => integrandChanged(e, key)} id={`txtIntegrend${key + 1}`} className="form-control mb-1" 
                        placeholder={`Integrend ${key + 1}`} required />)
                }
            </div>
            <div class="mb-3">
                <label class="form-label" required>Instructions</label>
                <span class="btn btn-outline-secondary btn-sm ms-3 me-1" onClick={increaseNoOfSteps}>+</span>
                <span class="btn btn-outline-secondary btn-sm" onClick={decreaseNoOfSteps}>-</span>
                {
                    [...Array(recipe.noOfInstructions).keys()].map(key => <input onChange={(e) => instructionChanged(e, key)} id={`txtStep${key + 1}`} className="form-control mb-1" 
                        placeholder={`Instruction ${key + 1}`} required />)
                }
            </div>
            <button type="button" class="btn btn-primary" onClick={validateForm}>Create</button>
        </form>
    </>;

    
}