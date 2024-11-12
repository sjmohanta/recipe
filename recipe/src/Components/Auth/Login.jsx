import { useRef, useState } from "react";
import TopNav from "../TopNav";
import { Link } from "react-router-dom";
import appConfig from "../../Utility/AppConfig";

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

        var authApiUrl = AppConfig('AuthApiUrl')

        fetch(`${authApiUrl}/login`, {
            method: 'POST',
            mode: "cors",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(authData)
        })
        .then(res => res.json())
        .then(data => console.log(data.user))
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