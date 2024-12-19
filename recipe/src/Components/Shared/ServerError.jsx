export function ServerError({message})
{
    const defaultErrorMessage = `There was an Unknown server error. <br/>
            Please let us know if error persists.`;

    return <div className="text-danger">
        <h2>Server Error!</h2>
        <p>
            {message ?? defaultErrorMessage}
        </p>
    </div>;
}