import React, {useRef, useState} from "react";
import "./LoginBlock.scss"
import {loginUser} from "../../../methods/loginUser";
import {useNavigate} from "react-router-dom";

export const LoginBlock = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const redirect = useRef(
        new URLSearchParams(window.location.search).get("redirect")
    );

    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        loginUser(email, password).then((response) => {
            if (response.success) {
                console.log('User logged in:', response.data);

                if (redirect.current) navigate(redirect.current);
                else navigate('/');

            } else {
                console.error('Login error:', response.data);

                let errorMsg : string = "";

                if (response.data.username) {
                    errorMsg += " Vous devez entrer un email.";
                }

                if (response.data.password) {
                    errorMsg += " Vous devez entrer un mot de passe.";
                }

                if (response.data.detail === "No active account found with the given credentials") {
                    errorMsg = "Email ou mot de passe incorrect";
                }

                setLoginError(errorMsg);
            }
        });
    };

    return (
        <div className={"login-block"}>
            <h1>Connexion</h1>
            <form action="" onSubmit={handleLogin}>
                <label>
                    <span>Email</span>
                    <input
                        type="text" placeholder={"Email"} required={true}
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <span>Password</span>
                    <input
                        type="password" placeholder={"Password"} required={true}
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button
                    type={"submit"}
                    disabled={email === "" || password === ""}
                    className={email === "" || password === "" ? "disabled" : ""}
                >Se connecter</button>
            </form>
            <span id="login-error">{loginError}</span>
        </div>
    );
};