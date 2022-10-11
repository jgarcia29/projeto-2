import { useState } from "react";

function LoginScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    return (
        <div className="container">
            <div className="login-screen">
                <div>
                    <h1>Login</h1>
                    <button onClick={() => props.setLoginScreenOn(false)}>X</button>
                </div>
                <div className="form">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {error !== "" && <p>{error}</p>}
                    <button type="button" onClick={() => {
                        if (email.length < 3) {
                            setError("Email deve ter no mínimo 3 caracteres");
                            return;
                        }
                        if (password.length < 3) {
                            setError("Senha deve ter no mínimo 3 caracteres");
                            return;
                        }
                        fetch("https://reqres.in/api/login", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email, password })
                        }).then(response => response.json()).then(data => {
                            if (data.error) {
                                setError(data.error)
                                return
                            }
                            if (data.token) {
                                localStorage.setItem("token", data.token)
                                props.setLoginScreenOn(false)
                                props.setIsLogged(true)
                            } else {
                                setError("Token não encontrado")
                            }
                        })
                    }}>Entrar</button>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
