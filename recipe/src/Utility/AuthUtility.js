const authName = 'AuthInfo';

export function saveAuthToken(auth)
{
    localStorage.setItem(authName, JSON.stringify(auth));
}

export function getAuthInfo()
{
    var result = localStorage.getItem(authName);

    return result ? JSON.parse(result) : undefined;
}

export function clearAuthToken()
{
    localStorage.removeItem(authName);
}