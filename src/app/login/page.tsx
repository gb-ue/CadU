"use client";

import Image from "next/image";
import "./style.css";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Habilita o botão somente quando os dois campos tiverem valor
  const podeEntrar = email.trim() !== "" && senha.trim() !== "";

  return (
    <div className="login-container">
      
      <div className="image-side">
        <Image 
          src="/login.svg"
          alt="login"
          fill
          className="image"
        />
      </div>

      <div className="login-side">
        <h1 className="title">Login</h1>

        <div className="input-wrapper">
          <Image src="/email.svg" alt="email-icon" width={20} height={20} className="icon"/>
          <input
            type="email"
            placeholder="E-mail"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <Image src="/password.svg" alt="password-icon" width={20} height={20} className="icon"/>
          <input
            type="password"
            placeholder="Senha"
            className="input"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        {/* Botão só ativa quando podeEntrar === true */}
        <button
          className="btn-login"
          disabled={!podeEntrar}
          style={{
            opacity: podeEntrar ? 1 : 0.5,
            cursor: podeEntrar ? "pointer" : "not-allowed"
          }}
        >
          Entrar
        </button>

        <p className="register">
          Não possui uma conta?{" "}
          <Link href="/cadastro" className="cadastro">Cadastrar-se</Link>
        </p>
      </div>

    </div>
  );
}

