export default function AppConfig(key)
{
    const configuration = {
        ApiRootPath: 'http://localhost:3000/'
    };
    
    return configuration[key];
};