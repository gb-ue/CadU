"use client";

import Image from "next/image";
import "./style.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const podeEntrar = email.trim() !== "" && senha.trim() !== "";

  async function handleLogin() {
    if (!podeEntrar) return;

    setLoading(true);

    try {
      const resposta = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
      });

      const data = await resposta.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      if (!resposta.ok) {
        alert("Erro ao fazer login.");
        return;
      }

      localStorage.setItem("token", data.accesstoken);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("role", data.role);

      switch (data.role) {
        case "Aluno":
          router.push("/home");
          break;
        case "Professor":
          router.push("/home");
          break;
        case "Coordenador":
          router.push("/home");
          break;
        case "Administrador":
          router.push("/home");
          break;
        default:
          router.push("/home");
      }

    } catch (err) {
      console.error(err);
      alert("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="image-side">
        <Image src="/login.svg" alt="login" fill className="image" />
      </div>

      <div className="login-side">
        <h1 className="title">Login</h1>

        <div className="input-wrapper">
          <Image src="/email.svg" alt="email-icon" width={20} height={20} className="icon" />
          <input
            type="email"
            placeholder="E-mail"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <Image src="/password.svg" alt="password-icon" width={20} height={20} className="icon" />
          <input
            type="password"
            placeholder="Senha"
            className="input"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button
          className="btn-login"
          disabled={!podeEntrar || loading}
          onClick={handleLogin}
          style={{
            opacity: podeEntrar ? 1 : 0.5,
            cursor: podeEntrar ? "pointer" : "not-allowed"
          }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <p className="register">
          Não possui uma conta?{" "}
          <Link href="/cadastro" className="cadastro">Cadastrar-se</Link>
        </p>
      </div>
    </div>
  );
}
