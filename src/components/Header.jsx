import { useNavigate } from "react-router-dom";
import logo from "../assets/yatis_shoes.svg"

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
            <div>
            <img src={logo} style={{ height: "50px" }} />
                <CreateButton nom = {"Lifestyle"} path = "/lifestyle"/>
                <CreateButton nom = {"Football"} path = "/football"/>
                <CreateButton nom = {"Basketball"}/>
                <CreateButton nom = {"Running"}/>
                <CreateButton nom = {"Recherche"}/>
                <CreateButton nom = {"Favoris"}/>
                <CreateButton nom = {"Acheter"}/>
            </div>
        </>
    )
}


export default Header;