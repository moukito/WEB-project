import { useNavigate } from "react-router-dom";

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