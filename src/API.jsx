import { useState } from "react";

function API() {
    const [busca, setBusca] = useState("");
    const [imagemURL, setImagemURL] = useState("");

    return (<>
        <input type="text" value={busca} onChange={(e) => setBusca(e.target.value)} />
        <button type="button" onClick={() => {
            fetch(`https://foodish-api.herokuapp.com/api/images/${busca}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => response.json()).then(data => {
                console.log(data)
                setImagemURL(data.image)
            })
        }}>Buscar</button>
        <img src={imagemURL} alt="Imagem" />
    </>)
}
export default API;