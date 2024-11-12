import { useRef, useState } from "react";
import TopNav from "../TopNav";
import AppConfig from "../../AppConfig";
import { Link } from "react-router-dom";

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

        var authApiUrl = AppConfig('AuthApiUrl');

        fetch(`${authApiUrl}/SignUp`, {
            method: 'POST',
            mode: "cors",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(authData)
        })
        .then(res => res.json())
        .then(data => console.log(data))
    }

    return <>
            <TopNav></TopNav>
            <form>
            <div class="mb-3">
                    <label for="txtName" class="form-label">Name</label>
                    <input ref={refName} class="form-control" id="txtName" required />
                </div>
                <div class="mb-3">
                    <label for="txtEmailId" class="form-label">Email</label>
                    <input ref={refEmailId} type="email" class="form-control" id="txtEmailId" required />
                </div>
                <div class="mb-3">
                    <label for="txtPassword" class="form-label" required>Password</label>
                    <input ref={refPassword} type="password" class="form-control" id="txtPassword" />
                </div>
                <button type="button" class="btn btn-primary" onClick={validateForm}>Register</button>
        </form>
        <p>
            Already have an account.<br />
            <Link className="btn btn-secondary" to="/Register">Login</Link>
        </p>
    </>;
}