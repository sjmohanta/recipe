import { useRef, useState } from "react";
import TopNav from "../TopNav";
import appConfig from "../../Utility/AppConfig";
import { Link, useNavigate } from "react-router-dom";
import {saveAuthToken} from "../../Utility/AuthUtility";

export default function Login()
{
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

    function validateForm()
    {
        debugger;
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
            saveAuthToken(result);

            return navigate('/');
        }

        submitAuth();
    }

    return <>
            <TopNav></TopNav>
            <form>
                <div className="mb-3">
                    <label htmlFor="txtEmailId" className="form-label">Email</label>
                    <input ref={refEmailId} type="email" className="form-control" id="txtEmailId" required />
                </div>
                <div class="mb-3">
                    <label htmlFor="txtPassword" className="form-label" required>Password</label>
                    <input ref={refPassword} type="password" className="form-control" id="txtPassword" />
                </div>
                <button type="button" className="btn btn-primary" onClick={validateForm}>Login</button>
        </form>
        <p>
            Don't have an account. Sign up Today.<br />
            <Link className="btn btn-secondary" to="/Register">Sign Up</Link>
        </p>
    </>;
}