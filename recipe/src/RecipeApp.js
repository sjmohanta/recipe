import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';
import LatestRecepies from "./Components/LatestRecepies";

export default function RecipeApp() {
  return (
    <div className="App">          
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Recipe Book</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Recipies</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Add</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        <a className="nav-link" href="#">Login</a>
                    </span>
                </div>
            </div>
        </nav>
        <LatestRecepies message="Please wait a while recipeies are being loaded."></LatestRecepies>
    </div>
  );
}