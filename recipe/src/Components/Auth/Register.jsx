import { useRef, useContext, useState } from "react";
import appConfig from "../../Utility/AppConfig";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../Store/Auth-Context';

export default function Register()
{
    document.title = "Register";

    const navigate = useNavigate();
    const [formState, updateFormState] = useState({
        isFormSubmitted: false,
        message: undefined,
        isEmailIdValid: undefined,
        invalidEmailIdMessage: undefined,
        isPasswordValid: undefined,
        invalidPasswordMessage: undefined,
        isNameValid: undefined
    });

    var refName = useRef();
    var refEmailId = useRef();
    var refPassword = useRef();

    const { saveAuth } = useContext(AuthContext);

    function isFormValid()
    {
        formState.isEmailIdValid = refEmailId.current.value.length === 0 ? false : true;
        formState.isPasswordValid = refPassword.current.value.length === 0 ? false : true;
        formState.isNameValid = refName.current.value.length === 0 ? false : true;

        updateFormState({...formState});

        return formState.isEmailIdValid && formState.isPasswordValid && formState.isNameValid;
    }

    function validateForm()
    {
        if (!isFormValid())
        {
            return;
        }

        var authData = {
            name: refName.current.value,
            email: refEmailId.current.value, 
            password: refPassword.current.value
        };

        var authApiUrl = appConfig('AuthApiUrl');

        async function createUser()
        {
            const response = await fetch(`${authApiUrl}/SignUp`, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(authData)
            });

            if (!response.ok)
            {
                // handle error
                return;
            }

            var result = await response.json();
            saveAuth(result);

            return navigate('/');
        }

        createUser();
    }

    return <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h2 className="text-primary">Register</h2>
                        <hr/>
                        <form>
                            <div className="mb-3">
                                    <label for="txtName" className="form-label">Name <span className="text-danger">*</span></label>
                                    <input ref={refName} className="form-control" id="txtName" required />
                                    {formState.isNameValid === false && <div className="invalid-feedback">
                                        Please provide your name
                                    </div>}
                                </div>
                                <div className="mb-3">
                                    <label for="txtEmailId" className="form-label">Email <span className="text-danger">*</span></label>
                                    <input ref={refEmailId} type="email" className="form-control" id="txtEmailId" required />
                                    {formState.isEmailIdValid === false && <div className="invalid-feedback">
                                        Please provide your email id
                                    </div>}
                                </div>
                                <div className="mb-3">
                                    <label for="txtPassword" className="form-label" required>Password <span className="text-danger">*</span></label>
                                    <input ref={refPassword} type="password" className="form-control" id="txtPassword" />
                                    {formState.isPasswordValid === false && <div className="invalid-feedback">
                                        Please provide a password
                                    </div>}
                                </div>
                                <button type="button" className="btn btn-primary" onClick={validateForm}>Register</button>
                        </form>
                        <p className="mt-3">
                            Already have an account.<br />
                            <Link className="btn btn-secondary" to="/Login">Login</Link>
                        </p>
                    </div>
                </div>
            </div>            
    </>;
}