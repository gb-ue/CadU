"use client";

import Image from "next/image";
import { useState, useEffect, useRef, SetStateAction } from "react";
import "./style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    const [isAluno, setIsAluno] = useState(false);

    const [modalidadeLabel, setModalidadeLabel] = useState("Modalidade");
    const [cursoLabel, setCursoLabel] = useState("Curso");

    const [openModalidade, setOpenModalidade] = useState(false);
    const [openCurso, setOpenCurso] = useState(false);

    const modalidadeRef = useRef<HTMLDivElement>(null);
    const cursoRef = useRef<HTMLDivElement>(null);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        setIsAluno(value.endsWith("@aluno.uece.br"));
    };

    const emailValido =
        email.endsWith("@uece.br") || email.endsWith("@aluno.uece.br");

    const senhaValida = senha.length >= 8;
    const modalidadeValida = !isAluno || modalidadeLabel !== "Modalidade";
    const cursoValido = !isAluno || cursoLabel !== "Curso";

    const podeCadastrar =
        nome.trim() !== "" &&
        emailValido &&
        senhaValida &&
        modalidadeValida &&
        cursoValido;

    const selectModalidade = (value: SetStateAction<string>) => {
        setModalidadeLabel(value);
        setOpenModalidade(false);
    };

    const selectCurso = (value: SetStateAction<string>) => {
        setCursoLabel(value);
        setOpenCurso(false);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalidadeRef.current && !modalidadeRef.current.contains(event.target as Node)) {
                setOpenModalidade(false);
            }
            if (cursoRef.current && !cursoRef.current.contains(event.target as Node)) {
                setOpenCurso(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside as EventListener);
        return () => document.removeEventListener("mousedown", handleClickOutside as EventListener);
    }, []);
    
    async function handleCadastro() {
        const role = isAluno ? "Aluno" : "Professor";

        const body = {
            email,
            senha,
            nome,
            role,
            modalidade: isAluno ? modalidadeLabel : "",
            curso: isAluno ? cursoLabel : "",
        };

        try {
            const res = await fetch("http://localhost:8080/cadastro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            let data;
            try {
                data = await res.json();
            } catch {
                alert("Erro inesperado no servidor");
                return;
            }

            if (data.error) {
                alert(data.error);
                return;
            }

            if (!res.ok) {
                alert("Erro ao cadastrar");
                return;
            }

            alert("Cadastro realizado com sucesso!");
            router.push("/login");

        } catch (err) {
            console.error(err);
            alert("Erro ao conectar ao servidor");
        }
    }

    return (
        <div className="cadastro-container">
            <div className="image-cadastro-side">
                <Image src="/cadastro.svg" alt="cadastro" fill className="image-cadastro" />
            </div>

            <div className="cadastro-side">
                <h1 className="title-cadastro">Cadastro</h1>

                <div className="input-wrapper-cadastro">
                    <Image src="/icon.svg" alt="user-icon" width={20} height={20} className="icon-cadastro" />
                    <input
                        type="text"
                        placeholder="Nome Completo"
                        className="input-cadastro"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>

                <div className="input-wrapper-cadastro">
                    <Image src="/email.svg" alt="email-icon" width={20} height={20} className="icon-cadastro" />
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="input-cadastro"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>

                <p className="validation-message">
                    {!emailValido && email !== "" ? "Use um e-mail @uece.br ou @aluno.uece.br" : ""}
                </p>

                <div className="input-wrapper-cadastro">
                    <Image src="/password.svg" alt="password-icon" width={20} height={20} className="icon-cadastro" />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="input-cadastro"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </div>

                <p className="validation-message">
                    {!senhaValida && senha !== "" ? "A senha deve ter pelo menos 8 caracteres" : ""}
                </p>

                {isAluno && (
                    <div className="aluno">
                        <div className="custom-select" ref={modalidadeRef}>
                            <button className="select-button" onClick={() => setOpenModalidade(!openModalidade)}>
                                <span className="label-text">{modalidadeLabel}</span>
                                <span className="select-icon">
                                    <Image src="/seta.svg" alt="open" width={20} height={20} />
                                </span>
                            </button>

                            {openModalidade && (
                                <ul className="select-options">
                                    {["Modalidade", "Graduação", "Pós-Graduação", "Mestrado"].map((item) => (
                                        <li
                                            key={item}
                                            className={modalidadeLabel === item ? "selected" : ""}
                                            onClick={() => selectModalidade(item)}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="custom-select" ref={cursoRef}>
                            <button className="select-button" onClick={() => setOpenCurso(!openCurso)}>
                                <span className="label-text">{cursoLabel}</span>
                                <span className="select-icon">
                                    <Image src="/seta.svg" alt="open" width={20} height={20} />
                                </span>
                            </button>

                            {openCurso && (
                                <ul className="select-options">
                                    {[
                                        "Curso",
                                        "Ciência da Computação",
                                        "Sistemas de Informação",
                                        "Matemática",
                                        "Administração",
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className={cursoLabel === item ? "selected" : ""}
                                            onClick={() => selectCurso(item)}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}

                <button
                    className="btn-login"
                    disabled={!podeCadastrar}
                    style={{
                        opacity: podeCadastrar ? 1 : 0.5,
                        cursor: podeCadastrar ? "pointer" : "not-allowed",
                    }}
                    onClick={handleCadastro}
                >
                    Cadastrar
                </button>

                <p className="enter">
                    Já possui uma conta? <Link href="/login" className="login">Login</Link>
                </p>
            </div>
        </div>
    );
}
