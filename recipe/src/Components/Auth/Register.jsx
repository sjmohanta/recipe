import { useRef, useState } from "react";
import TopNav from "../TopNav";
import appConfig from "../../Utility/AppConfig";
import { Link, redirect } from "react-router-dom";
import { saveAuthToken } from "../../Utility/AuthUtility";

export default function Register()
{
    const [formState, updateFormState] = useState({
        isFormSubmitted: false,
        message: undefined,
        isEmailIdValid: undefined,
        invalidEmailIdMessage: undefined,
        isPasswordValid: undefined,
        invalidPasswordMessage: undefined,
    });

    var refName = useRef();
    var refEmailId = useRef();
    var refPassword = useRef();

    function validateForm()
    {
        debugger;
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
            saveAuthToken(result);

            return redirect('/');
        }

        createUser();
    }

    return <>
            <TopNav></TopNav>
            <form>
            <div className="mb-3">
                    <label for="txtName" className="form-label">Name</label>
                    <input ref={refName} className="form-control" id="txtName" required />
                </div>
                <div class="mb-3">
                    <label for="txtEmailId" className="form-label">Email</label>
                    <input ref={refEmailId} type="email" className="form-control" id="txtEmailId" required />
                </div>
                <div class="mb-3">
                    <label for="txtPassword" className="form-label" required>Password</label>
                    <input ref={refPassword} type="password" className="form-control" id="txtPassword" />
                </div>
                <button type="button" className="btn btn-primary" onClick={validateForm}>Register</button>
        </form>
        <p>
            Already have an account.<br />
            <Link className="btn btn-secondary" to="/Register">Login</Link>
        </p>
    </>;
}