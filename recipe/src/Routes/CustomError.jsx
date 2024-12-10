import { useRouteError } from "react-router-dom";
import TopNav from "../Components/Layout/TopNav";

export default function CustomError()
{
    const error = useRouteError();

    let title = 'Oops! Something went wrong';
    let message = <>
        There is an error. <br/> Please let us know if error persists.
    </>; 

    if (error.status === 404)
    {
        title = 'Requested resource not found';
        message = error.data.message ?? 'We could not find the requested resource. Please check if the requested URL is valid.';
    }
    else if (error.status === 500)
    {
        title = 'Unknown internal server error';
        message = error.data.message ?? 'Something went wrong while processing your request. Please check after some time, let us know if issue persissts.';
    }

    return <>
        <TopNav/>
        <div className="container-fluid text-danger">
            <h2>
                {title}
            </h2>
            <p>
                {message}
            </p>
        </div>
    </>;
}