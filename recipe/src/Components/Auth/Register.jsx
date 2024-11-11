import { useRef, useState } from "react";
import TopNav from "../TopNav";

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

    var refEmailId = useRef();
    var refPassword = useRef();

    function validateForm()
    {
        debugger;
        var emailId = refEmailId.current.value;
        var password = refPassword.current.value;

        fetch();
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
                <button type="button" class="btn btn-primary" onClick={validateForm}>Register</button>
        </form>
    </>;
}