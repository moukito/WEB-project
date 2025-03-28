import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";

function CreateButton({nom, path}){
    const navigate = useNavigate();
    function handleClick(){
        navigate(path);
    }
    return <button onClick={handleClick}>{nom}</button>
}


function Header(){
    return (
        <>
            <div className="flex items-center justify-between p-4 bg-white shadow-md">
                <div className="flex space-x-4">
                    <CreateButton nom = {"Lifestyle"} path = "/lifestyle"/>
                    <CreateButton nom = {"Football"} path = "/football"/>
                    <CreateButton nom = {"Basketball"}/>
                    <CreateButton nom = {"Running"}/>
                </div>
                <div className="flex space-x-4">
                    <CreateButton nom = {"Recherche"}/>
                    <CreateButton nom = {"Favoris"}/>
                    <CreateButton nom = {"Acheter"}/>
                    <CartIcon />
                </div>
            </div>
        </>
    )
}


export default Header;