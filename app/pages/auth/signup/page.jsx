"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { handleSignup, handleImageUpload } from "@/app/functions/auth";
import { useUser } from "../../../context/userContext";

const Page = () => {
  const router = useRouter();
  const { setUser } = useUser();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!profileImage) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(profileImage);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [profileImage]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Selecione um arquivo de imagem válido.");
      return;
    }

    setError("");
    setProfileImage(file);
  };

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      let profileImageLink = "";

      if (profileImage) {
        const profileLink = await handleImageUpload(profileImage);
        profileImageLink = profileLink?.link || "";
      }

      const signupRequest = await handleSignup(
        username,
        email,
        password,
        profileImageLink
      );

      if (signupRequest?.user) {
        setUser(signupRequest.user);
      }

      router.push("/");
    } catch (err) {
      setError(err?.message || "Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <form style={styles.form} onSubmit={submit}>
          <h1 style={styles.title}>Criar Conta</h1>

          <div style={styles.imageSection}>
            <div style={styles.previewWrapper}>
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Prévia da imagem de perfil"
                  width={110}
                  height={110}
                  style={styles.previewImage}
                  unoptimized
                />
              ) : (
                <div style={styles.previewPlaceholder}>Foto</div>
              )}
            </div>

            <label htmlFor="profileImage" style={styles.uploadLabel}>
              Escolher foto de perfil
            </label>

            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.hiddenInput}
            />
          </div>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />

          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          {error ? <p style={styles.error}>{error}</p> : null}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Criando..." : "Criar conta"}
          </button>

          <p style={styles.loginText}>
            Já tem conta?{" "}
            <span
              style={styles.loginLink}
              onClick={() => router.push("/auth/login")}
            >
              Entrar
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#111",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#1b1b1b",
    border: "1px solid #2f2f2f",
    borderRadius: "16px",
    padding: "28px",
    boxSizing: "border-box",
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  title: {
    color: "#fff",
    margin: 0,
    marginBottom: "8px",
    textAlign: "center",
  },

  imageSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
  },

  previewWrapper: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "2px solid #3a3a3a",
    backgroundColor: "#222",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  previewPlaceholder: {
    color: "#aaa",
    fontSize: "14px",
  },

  uploadLabel: {
    backgroundColor: "#2b2b2b",
    color: "#fff",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "1px solid #444",
    fontSize: "14px",
  },

  hiddenInput: {
    display: "none",
  },

  input: {
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #3f3f3f",
    backgroundColor: "#222",
    color: "#fff",
    outline: "none",
  },

  button: {
    padding: "12px 14px",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
    marginTop: "6px",
  },

  error: {
    color: "#ff6b6b",
    margin: 0,
    fontSize: "14px",
  },

  loginText: {
    color: "#ccc",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "8px",
  },

  loginLink: {
    color: "#60a5fa",
    cursor: "pointer",
    fontWeight: 600,
  },
};