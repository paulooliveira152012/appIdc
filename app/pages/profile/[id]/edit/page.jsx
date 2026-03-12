"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useUser } from "@/app/context/userContext";
import Header from "@/app/components/Header";
import { useRouter, useParams } from "next/navigation";
import { handleImageUpload } from "@/app/functions/auth";
import { usePlatform } from "@/app/context/platformContext";

const EditProfilePage = () => {
  const { user, setUser } = useUser();
  const { updateUserInUsers } = usePlatform();
  const router = useRouter();
  const params = useParams();
  const fileInputRef = useRef(null);

  const profileId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [mounted, setMounted] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newProfilePhoto, setNewProfilePhoto] = useState("");
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!user) {
      router.push("/");
      return;
    }

    if (user.userId !== profileId) {
      router.push(`/pages/profile/${user.userId}`);
      return;
    }

    setNewUsername(user.username || "");
    setNewProfilePhoto(user.profileImage || "");
  }, [mounted, user, profileId, router]);

  useEffect(() => {
    if (!selectedImageFile) {
      setPreviewUrl("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImageFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedImageFile]);

  const openImagePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Selecione um arquivo de imagem válido.");
      return;
    }

    setError("");
    setSelectedImageFile(file);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (!newUsername.trim()) {
        setError("O username não pode ficar vazio.");
        return;
      }

      let finalProfileImage = newProfilePhoto || "";

      if (selectedImageFile) {
        const uploadResponse = await handleImageUpload(selectedImageFile);
        finalProfileImage = uploadResponse?.link || "";

        if (!finalProfileImage) {
          throw new Error("Erro ao fazer upload da nova foto de perfil.");
        }
      }

      if (!profileId || !newUsername || !finalProfileImage) {
        window.alert("Falta algo:");
      }

      // `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Users/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: profileId,
            username: newUsername.trim(),
            profileImage: finalProfileImage,
          }),
        },
      );

      const data = await response.json();

      // window.alert(data)

      if (!response.ok) {
        throw new Error(data?.message || "Erro ao atualizar perfil.");
      }

      console.log("setUser:", setUser);

      console.log("data para setar no localstorage:", data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      const updatedUser = {
        userId: profileId,
        username: data?.user?.username ?? newUsername.trim(),
        profileImage: data?.user?.profileImage ?? finalProfileImage,
      };

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          ...updatedUser,
        }),
      );

      if (setUser) {
        setUser((prev) => ({
          ...prev,
          ...updatedUser,
        }));
      }

      updateUserInUsers(updatedUser);

      console.log("ATUALIZAÇAO:");

      setSuccess("Perfil atualizado com sucesso.");
      router.push(`/pages/profile/${profileId}`);
    } catch (err) {
      setError(err?.message || "Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted || !user) return null;

  const imageSrc =
    previewUrl ||
    newProfilePhoto ||
    user.profileImage ||
    "/images/defaultProfile.png";

  return (
    <div style={styles.screen}>
      <Header />

      <div style={styles.card}>
        <h1 style={styles.title}>Editar perfil</h1>

        <div style={styles.imageSection}>
          <button
            type="button"
            onClick={openImagePicker}
            style={styles.previewButton}
            aria-label="Selecionar nova foto de perfil"
          >
            <Image
              src={imageSrc}
              alt="Prévia da foto de perfil"
              width={140}
              height={140}
              style={styles.previewImage}
              unoptimized
            />
            <div style={styles.imageOverlay}>Trocar foto</div>
          </button>

          <input
            ref={fileInputRef}
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.hiddenInput}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Digite seu username"
            style={styles.input}
          />
        </div>

        {error ? <p style={styles.error}>{error}</p> : null}
        {success ? <p style={styles.success}>{success}</p> : null}

        <div style={styles.actions}>
          <button
            type="button"
            onClick={() => router.push(`/pages/profile/${profileId}`)}
            style={styles.secondaryButton}
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading}
            style={styles.primaryButton}
          >
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;

const styles = {
  screen: {
    minHeight: "100vh",
    backgroundColor: "#111",
    color: "white",
    paddingBottom: "40px",
  },

  card: {
    maxWidth: "520px",
    margin: "40px auto",
    padding: "40px",
    backgroundColor: "#1c1c1c",
    borderRadius: "12px",
  },

  title: {
    marginTop: 0,
    marginBottom: "24px",
    fontSize: "28px",
    textAlign: "center",
  },

  imageSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },

  previewButton: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "3px solid #3b82f6",
    backgroundColor: "#222",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    cursor: "pointer",
    padding: 0,
    outline: "none",
  },

  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  imageOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.28)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: 600,
    pointerEvents: "none",
  },

  hiddenInput: {
    display: "none",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "18px",
  },

  label: {
    fontSize: "14px",
    marginBottom: "8px",
    opacity: 0.9,
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #333",
    backgroundColor: "#111",
    color: "#fff",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginTop: "24px",
  },

  primaryButton: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  secondaryButton: {
    flex: 1,
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #444",
    backgroundColor: "transparent",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },

  error: {
    color: "#f87171",
    marginTop: "12px",
    marginBottom: 0,
    fontSize: "14px",
  },

  success: {
    color: "#4ade80",
    marginTop: "12px",
    marginBottom: 0,
    fontSize: "14px",
  },
};
