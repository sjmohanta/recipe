import { clearAuthToken } from "../../Utility/AuthUtility";
import { Link } from "react-router-dom";

export default function Logout()
{
    clearAuthToken();

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