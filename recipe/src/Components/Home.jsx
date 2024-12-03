import LatestRecipes from './Recipe/LatestRecipes';

export default function Home()
{
    return <>
        <div className="container-fluid">
            <div className="row bg-secondary">
                <div className="col-12">
                    <LatestRecipes message="Please wait a while recipeies are being loaded." />
                </div>
            </div>
        </div>        
    </>;
}