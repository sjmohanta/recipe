import { Link, NavLink } from "react-router-dom";
import { AuthContext } from '../../Store/AuthContext';
import { useContext } from "react";

function activeNavLinkClass({isActive})
{
    return `nav-link ${isActive ? 'active': ''}`;
}

export default function TopNav()
{
    const { auth } = useContext(AuthContext);

    function AuthNav()
    {
        return <ul className="nav justify-content-end">
                    {auth && <li className="nav-item">
                        <NavLink to="/Profile" className={activeNavLinkClass}>Hello, {auth.name}</NavLink>
                    </li>}
                    {auth && <li className="nav-item">
                        <NavLink className={activeNavLinkClass} to="/Logout">Logout</NavLink>
                    </li>}
                    {!auth && <li className="nav-item">
                        <NavLink className={activeNavLinkClass} to="/Login">Login</NavLink>
                    </li>}
                </ul>;
    }

    return <nav id="topNav" className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <NavLink className={({isActive}) => {return isActive ? 'navbar-brand active' : 'navbar-brand'}} to="/" end>Recipe Book</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="recipeNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="recipeNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={activeNavLinkClass} aria-current="page" to="/Recipes">Recipes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={activeNavLinkClass} to="/Recipe/Create">Add</NavLink>
                            </li>                
                        </ul>
                        <AuthNav></AuthNav>
                    </div>
                </div>
            </nav>;
}