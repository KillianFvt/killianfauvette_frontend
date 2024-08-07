import React from "react";
import "./LoginBlock.scss"

export const LoginBlock = () => {

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login");
    };

    return (
        <div className={"login-block"}>
            <h1>Connexion</h1>
            <form action="" onSubmit={handleLogin}>
                <label>
                    <span>Email</span>
                    <input type="text" placeholder={"Email"}/>
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" placeholder={"Password"}/>
                </label>
                <button type={"submit"}>Se connecter</button>
            </form>
        </div>
    );
};