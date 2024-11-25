import LatestRecipes from "./LatestRecipes";
import TopNav from "./TopNav";

export default function Home()
{
    return <>
        <TopNav />
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <LatestRecipes message="Please wait a while recipeies are being loaded." />
                </div>
            </div>
        </div>        
    </>;
}