"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const ImagePreviewClient = () => {
  const searchParams = useSearchParams();
  const imageUrl = searchParams.get("src");

  if (!imageUrl) {
    return <div style={styles.message}>Imagem não encontrada.</div>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={imageUrl} alt="preview" style={styles.image} />
  );
};

export default ImagePreviewClient;

const styles = {
  message: {
    marginTop: "24px",
    color: "white",
  },

  image: {
    maxWidth: "100%",
    maxHeight: "90vh",
    objectFit: "contain",
    borderRadius: "12px",
    marginTop: "24px",
  },
};