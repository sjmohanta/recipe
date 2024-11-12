export default function appConfig(key)
{
    const configuration = {
        ApiRootPath: 'http://localhost:3000',
        AuthApiUrl: 'http://localhost:3002'
    };
    
    return configuration[key];
};