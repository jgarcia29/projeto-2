import { useEffect, useState } from "react";

function API() {
    const placeholder = "/placeholder.png";
    const [busca, setBusca] = useState("");
    const [imagemURL, setImagemURL] = useState("");
    const [erro, setErro] = useState("");
    const [sugestoes, setSugestoes] = useState([]);
    const [next, setNext] = useState(null);
    const [searchBarFocus, setSearchBarFocus] = useState(false);
    const [sugestoesFocus, setSugestoesFocus] = useState(false);
    useEffect(() => {
        if (sugestoes.length > 0) {
            const temp = [...new Set(sugestoes)]
            setSugestoes(temp)
        }
    }, [next]);
    useEffect(() => {
        if (next !== undefined && next !== null) {
            fetch(next, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(response => response.json()).then(data => {
                if (data.error) {
                    return
                }
                var temp = []
                if (data.results.length > 0) {
                    data.results.forEach(result => {
                        temp.push(result.name)
                    });
                    setSugestoes([...sugestoes, ...temp])
                }
                setNext(data.info.next)
            })
        }
    }, [next]);
    useEffect(() => {
        setNext(`https://rickandmortyapi.com/api/character/`)
    }, []);
    function buttonHandler() {
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
    }
    function sugestaoHandler(prop) {
        fetch(`https://rickandmortyapi.com/api/character/?name=${prop}`, {
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
    }
    return (<div className="busca">
        <div className="opcoes"><p>Busque por um personagem usando o nome em inglês... Ex.: Cool Rick ou Evil Morty</p> </div>
        <br></br>
        <div className="campos-busca">
            <input placeholder="Buscar imagem de um personagem de Rick and Morty" type="text" value={busca}
                onFocus={() => { setSearchBarFocus(true) }} onBlur={() => { setSearchBarFocus(false) }} onChange={(e) => setBusca(e.target.value)} />
            <button type="button" onClick={() => buttonHandler()}>Buscar</button>
            <div className={(busca !== "" && (searchBarFocus || sugestoesFocus)) ? "sugestoes" : ""} onMouseOver={() => { setSugestoesFocus(true) }}>
                {(busca !== "" && (searchBarFocus || sugestoesFocus)) && sugestoes.map((sugestao, index) => {
                    if (sugestao.toLowerCase().startsWith(busca.toLowerCase())) {
                        return <div key={index} className="sugestao" onClick={() => {
                            setBusca(sugestao)
                            setSugestoesFocus(false)
                            setSearchBarFocus(false)
                            sugestaoHandler(sugestao)
                        }}
                        >{sugestao}</div>
                    }
                })}
            </div>
        </div>
        {erro !== "" && <p className="erro-busca">{erro}</p>}
        <div className="imagem-container">
            <img className="imagem-busca" src={imagemURL || placeholder} alt="Imagem" />
        </div>
    </div >)
}
export default API;