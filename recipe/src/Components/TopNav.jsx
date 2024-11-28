import { Link } from "react-router-dom";
import { getAuthInfo } from "../Utility/AuthUtility"; 

export default function TopNav()
{
    function AuthNav()
    {
        const authInfo = getAuthInfo();
        return <ul className="nav justify-content-end">
                    {authInfo && <li className="nav-item">
                        <Link className="nav-link">Hello, {authInfo.name}</Link>
                    </li>}
                    {authInfo && <li className="nav-item">
                        <Link className="nav-link" to="/Logout">Logout</Link>
                    </li>}
                    {!authInfo && <li className="nav-item">
                        <Link className="nav-link" to="/Login">Login</Link>
                    </li>}
                </ul>;
    }

    return <nav id="topNav" className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Recipe Book</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="recipeNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="recipeNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/Recipes">Recipes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Recipe/Create">Add</Link>
                            </li>                
                        </ul>
                        <AuthNav></AuthNav>
                    </div>
                </div>
            </nav>;
}