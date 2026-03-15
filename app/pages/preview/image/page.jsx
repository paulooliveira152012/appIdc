"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../../components/Header";

const ImagePreview = () => {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("src");

  if (!imageUrl) {
    return <div style={styles.page}>Imagem não encontrada.</div>;
  }

  return (
    <div style={styles.page}>
      <Header />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt="preview" style={styles.image} />
    </div>
  );
};

export default ImagePreview;

const styles = {
  page: {
    height: "100vh",

    backgroundColor: "#111",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    color: "white",
  },

  image: {
    maxWidth: "100%",
    maxHeight: "90vh",
    objectFit: "contain",
    borderRadius: "12px",
  },
};