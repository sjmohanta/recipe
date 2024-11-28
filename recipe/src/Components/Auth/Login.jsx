import { useRef, useState, useContext } from "react";
import appConfig from "../../Utility/AppConfig";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../Store/Auth-Context';

export default function Login()
{
    document.title = "Login";

    const navigate = useNavigate();
    const [formState, updateFormState] = useState({
        isFormSubmitted: false,
        message: undefined,
        isEmailIdValid: undefined,
        invalidEmailIdMessage: undefined,
        isPasswordValid: undefined,
        invalidPasswordMessage: undefined,
    });

    var refEmailId = useRef();
    var refPassword = useRef();

    const { saveAuth } = useContext(AuthContext);

    function isFormValid()
    {
        formState.isEmailIdValid = refEmailId.current.value.length === 0 ? false : true;
        formState.isPasswordValid = refPassword.current.value.length === 0 ? false : true;
        updateFormState({...formState});

        return formState.isEmailIdValid && formState.isPasswordValid;
    }

    function validateForm()
    {
        if (!isFormValid())
        {
            return;
        }

        var authData = {email: refEmailId.current.value, password: refPassword.current.value};

        var authApiUrl = appConfig('AuthApiUrl');

        async function submitAuth()
        {
            const response = await fetch(`${authApiUrl}/login`, {
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

        submitAuth();
    }

    return <>            
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h2 className="text-primary">Log In</h2>
                        <hr/>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="txtEmailId" className="form-label">Email</label>
                                <input ref={refEmailId} type="email" className="form-control" id="txtEmailId" required />
                                {formState.isEmailIdValid === false && <div class="invalid-feedback">
                                        Please provide your registered email id
                                    </div>}
                            </div>
                            <div class="mb-3">
                                <label htmlFor="txtPassword" className="form-label" required>Password</label>
                                <input ref={refPassword} type="password" className="form-control" id="txtPassword" />
                                {formState.isPasswordValid === false && <div class="invalid-feedback">
                                        Please provide your password for login
                                    </div>}
                            </div>
                            <button type="button" className="btn btn-primary" onClick={validateForm}>Login</button>
                        </form>
                        <p className="mt-3">
                            Don't have an account. Sign up Today.<br />
                            <Link className="btn btn-secondary" to="/Register">Sign Up</Link>
                        </p>
                    </div>
                </div>                
        </div>            
    </>;
}