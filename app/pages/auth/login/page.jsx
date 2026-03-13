"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { handleLogin } from "../../../functions/auth";

import { useUser } from "../../../context/userContext";

import Header from "../../../components/Header";

const Page = () => {
  const router = useRouter();
  const { user, setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log("user:", user);
    if (user) {
      router.push("/");
    }
  });

  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await handleLogin(email, password);

      console.log("data no login:", data);

      setUser(data.user);
      router.push("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="screen">
      <Header />
      <div style={styles.container}>
        <h1 style={styles.title}>Login</h1>

        <form onSubmit={submitLogin} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} type="submit">
            Entrar
          </button>

          <p>Nao tem uma conta ainda? <span style={{color: "#0099ff"}} onClick={() => router.push("/pages/auth/signup")}>Criar conta</span> </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "300px",
  },

  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "white",
    cursor: "pointer",
  },
};

export default Page;
