import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';

function RootLayout() {
  return (
    <>
      <TopNav />
      <Outlet />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.0/css/all.min.css" 
          integrity="sha512-9xKTRVabjVeZmc+GUW8GgSmcREDunMM+Dt/GrzchfN8tkwHizc5RP4Ok/MXFFy5rIjJjzhndFScTceq5e6GvVQ==" 
          crossOrigin="anonymous" referrerPolicy="no-referrer" />
    </>
  );
}

export default RootLayout;