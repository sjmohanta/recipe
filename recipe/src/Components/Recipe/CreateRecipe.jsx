import { useState } from "react";
import appConfig from "../../Utility/AppConfig";
import { getAuthInfo } from "../../Utility/AuthUtility";
import { Link, useNavigate } from "react-router-dom";
import getBase64 from "../../Utility/FileUtility";

export default function CreateRecipe()
{
    document.title = "Create Recipe";
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

    const [recipeValidation, updateRecipeValidationState] = useState({
        isNameEmpty: undefined,
        isPrepTimeValid: undefined,
        isAnyIntegrandsInputed: undefined,
        isAnyInstructionsInputed: undefined,
        isImageSelected: undefined,
        isServerError: undefined
    });

    var authInfo = getAuthInfo();
    if (!authInfo)
    {
        return <>
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
        if (!(recipeValidation.isNameEmpty === false && recipeValidation.isPrepTimeValid && recipeValidation.isAnyIntegrandsInputed 
            && recipeValidation.isAnyInstructionsInputed && recipeValidation.isImageSelected))
        {
            return;
        }

        const apiRootUrl = appConfig("ApiRootPath");
        const {noOfintegrands, noOfInstructions, ...dataToPost} = {...recipe, userId: authInfo.uid};

        dataToPost.integrands = dataToPost.integrands.filter(inte => inte && inte.length);
        dataToPost.instructions = dataToPost.instructions.filter(inst => inst && inst.length);
        dataToPost.rating = 0;
        dataToPost.reviewCount = 0;

        const postCreateRecipeData = async () => {
            try
            {
                const response = await fetch(`${apiRootUrl}/recipes`, {
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({...dataToPost})
                });
    
                if (response.ok)
                {
                    var result = await response.json();
                    navigate(`/Recipes/${result.id}`);
                }
                else{
                    updateRecipeValidationState({...recipeValidation, isServerError: true});
                }
            }
            catch(exc)
            {
                console.warn(exc);
                updateRecipeValidationState({...recipeValidation, isServerError: true});
            }
        };

        postCreateRecipeData();
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
        var recipeName = e.target.value;
        recipeValidation.isNameEmpty = recipeName.length === 0;
        updateRecipeValidationState({...recipeValidation});
        updateRecipeState({...recipe, name: recipeName});
    }

    function integrandChanged(e, position)
    {
        recipe.integrands[position] = e.target.value;
        updateRecipeState({...recipe, integrands: recipe.integrands});
        
        recipeValidation.isAnyIntegrandsInputed = recipe.integrands.findIndex(function (integrand) {
            return integrand.length > 0;
        }) !== -1;
        updateRecipeValidationState({...recipeValidation});
    }

    function instructionChanged(e, position)
    {
        recipe.instructions[position] = e.target.value;
        updateRecipeState({...recipe, instructions: recipe.instructions});

        recipeValidation.isAnyInstructionsInputed = recipe.instructions.findIndex(function (instruction) {
            return instruction.length > 0;
        }) !== -1;
        updateRecipeValidationState({...recipeValidation});
    }    

    function recipeImageChanged(e)
    {
        if (e.target.files.length)
        {
            // convert image to base 64
            getBase64(e.target.files[0], function (base64Img) {                
                updateRecipeState({...recipe, image: base64Img});
            }, 
            function (e) {
                console.warn(e);
            });

            recipeValidation.isImageSelected = true;
        }
        else{
            updateRecipeState({...recipe, image: undefined});
            recipeValidation.isImageSelected = false;
        }     
        
        updateRecipeValidationState({...recipeValidation});
    }

    function recipePreparationTimeChanged(e)
    {
        recipe.prepTimeMinutes = e.target.value;
        updateRecipeState({...recipe});

        recipeValidation.isPrepTimeValid = recipe.prepTimeMinutes.length > 0;
        updateRecipeValidationState({...recipeValidation});
    }

    return <>
        <div className="container-fluid">
            <h1 className="text-primary">
                Create Recipe
            </h1>
            <form className="col-8">
                <div className="mb-3">
                    <label htmlFor="txtRecipeName" className="form-label">Name <span className="text-danger">*</span></label>
                    <input className="form-control" id="txtRecipeName" placeholder="Recipe Name" onChange={recipeNameChanged} required />
                    {recipeValidation.isNameEmpty && <div className="invalid-feedback">
                            Please provide recipe name.
                        </div>}
                </div>  
                <div className="mb-3">
                    <label htmlFor="txtPreparationTime" className="form-label">Preparation time (minutes) <span className="text-danger">*</span></label>
                    <input className="form-control" type="number" id="txtPreparationTime" placeholder="Preparation time (minutes)" onChange={recipePreparationTimeChanged} required />
                    {(recipeValidation.isPrepTimeValid === false) && <div className="invalid-feedback">
                            Please provide recipe preparation time.
                        </div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="recipeImage" className="form-label">Image <span className="text-danger">*</span></label>
                    <input type="file" accept="image/*" className="form-control" id="recipeImage" onChange={recipeImageChanged} required />
                    {(recipeValidation.isImageSelected === false) && <div className="invalid-feedback">
                            Please select image for recipe.
                        </div>}
                </div>          
                <div className="mb-3">
                    <label className="form-label">Integrends <span className="text-danger">*</span></label>
                    <span className="btn btn-outline-secondary btn-sm ms-3 me-1" onClick={increaseNoOfIntegrands}>+</span>
                    <span className="btn btn-outline-secondary btn-sm" onClick={decreaseNoOfIntegrands}>-</span>
                    {
                        [...Array(recipe.noOfintegrands).keys()].map(key => <input onChange={(e) => integrandChanged(e, key)} key={`txtIntegrend${key + 1}`} className="form-control mb-1" 
                            placeholder={`Integrend ${key + 1}`} required />)
                    }
                    {(recipeValidation.isAnyIntegrandsInputed === false) && <div className="invalid-feedback">
                            Please add some integrands.
                        </div>}
                </div>
                <div className="mb-3">
                    <label className="form-label" required>Instructions <span className="text-danger">*</span></label>
                    <span className="btn btn-outline-secondary btn-sm ms-3 me-1" onClick={increaseNoOfSteps}>+</span>
                    <span className="btn btn-outline-secondary btn-sm" onClick={decreaseNoOfSteps}>-</span>
                    {
                        [...Array(recipe.noOfInstructions).keys()].map(key => <input onChange={(e) => instructionChanged(e, key)} key={`txtStep${key + 1}`} className="form-control mb-1" 
                            placeholder={`Instruction ${key + 1}`} required />)
                    }
                    {(recipeValidation.isAnyInstructionsInputed === false) && <div className="invalid-feedback">
                            Please add some instructions to prepare the recipe.
                        </div>}
                </div>
                <button type="button" className="btn btn-primary" onClick={validateForm}>Create</button>
                {recipeValidation.isServerError && <p className="text-danger">
                    Something went wrong while creating new recipe.<br></br>
                    Please try again after sometime.
                    </p>}
            </form>
        </div>        
    </>;    
}