import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../Store/AuthContext';

export default function Logout()
{
    document.title = "Log out";

    const { auth, clearAuth } = useContext(AuthContext);

    if (auth)
    {
        clearAuth();
    }    

    return <>
        <div className="container-fluid">
            <p className="bg-success p-4">
                You have logged out succesfully.
            </p>
            <p className="bg-info p-4">
                Click <Link to="/">Here</Link> to return to home paage.
            </p>
        </div>
    </>;
}