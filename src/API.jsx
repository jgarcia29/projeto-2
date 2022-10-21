import { useState } from "react";

function API() {
    const placeholder = "/placeholder.png";
    const [busca, setBusca] = useState("");
    const [imagemURL, setImagemURL] = useState("");
    const [erro, setErro] = useState("");
    return (<div className="busca">
        <div className="opcoes"><p>Busque por um personagem usando o nome em inglês... Ex.: Cool Rick ou Evil Morty</p> </div>
        <div className="campos-busca">
            <input placeholder="Buscar imagem de um personagem de Rick and Morty" type="text" value={busca} onChange={(e) => setBusca(e.target.value)} />

            <button type="button" onClick={() => {
                if (busca.length < 3) {
                    setErro("Digite pelo menos 3 caracteres");
                    return
                }
                fetch(`https://rickandmortyapi.com/api/character/?name=${busca}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(response => response.json()).then(data => {
                    if (data.error) {
                        setErro(data.error);
                        return
                    }
                    if (data.results[0].image) {
                        setImagemURL(data.results[0].image)
                        setErro("")
                        return
                    }
                    setErro("Erro desconhecido");
                })
            }}>Buscar</button>
        </div>
        {erro !== "" && <p className="erro-busca">{erro}</p>}
        <div className="imagem-container">
            <img className="imagem-busca" src={imagemURL || placeholder} alt="Imagem" />
        </div>
    </div >)
}
export default API;