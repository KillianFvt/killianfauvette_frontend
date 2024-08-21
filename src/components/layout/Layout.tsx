import {Header} from "./Header";
import {Footer} from "./Footer";
import {Outlet, useLocation} from "react-router-dom";

interface PageNames {
    [key: string]: string;
}

const pageNames : PageNames = {
    "/": "Accueil",
    "/login": "Connexion",
    "/logout": "Déconnexion",
    "/images": "Images",
    "/albums": "Albums",
    "/albums/upload": "Nouvel Album",
};

const getPageName = (pathname: string): string => {
    return pageNames[pathname] || "";
};

export const Layout = () => {
    const location = useLocation();
    const pageName = getPageName(location.pathname);

    return (
        <>
            <Header pageName={pageName}/>
            <Outlet/>
            <Footer/>
        </>
    );
};