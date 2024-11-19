import { useRef, useState } from "react";
import TopNav from "./TopNav";

export default function CreateRecipe()
{
    const [recipe, updateRecipeState] = useState({
        name: undefined,
        noOfintegrands: 4,
        integrends: [],
        noOfInstructions: 6,
        instructions: []
    });

    function validateForm()
    {

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
        recipe.integrends[position] = e.target.value;
        updateRecipeState({...recipe, integrends: recipe.integrends});
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