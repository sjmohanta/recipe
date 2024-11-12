import { useRef, useState } from "react";
import TopNav from "../TopNav";
import appConfig from "../../Utility/AppConfig";
import { Link, redirect } from "react-router-dom";
import {saveAuthToken} from "../../Utility/AuthUtility";

export default function Login()
{
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

            return redirect('/');
        }

        submitAuth();
    }

    return <>
            <TopNav></TopNav>
            <form>
                <div class="mb-3">
                    <label for="txtEmailId" class="form-label">Email</label>
                    <input ref={refEmailId} type="email" class="form-control" id="txtEmailId" required />
                </div>
                <div class="mb-3">
                    <label for="txtPassword" class="form-label" required>Password</label>
                    <input ref={refPassword} type="password" class="form-control" id="txtPassword" />
                </div>
                <button type="button" class="btn btn-primary" onClick={validateForm}>Login</button>
        </form>
        <p>
            Don't have an account. Sign up Today.<br />
            <Link className="btn btn-secondary" to="/Register">Sign Up</Link>
        </p>
    </>;
}