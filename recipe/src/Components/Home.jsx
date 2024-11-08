import LatestRecepies from "./LatestRecepies";
import TopNav from "./TopNav";

export default function Home()
{
    return <>
        <TopNav></TopNav>
        <LatestRecepies message="Please wait a while recipeies are being loaded."></LatestRecepies>
    </>;
}