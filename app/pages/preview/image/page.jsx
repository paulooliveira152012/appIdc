import React, { Suspense } from "react";
import Header from "../../../components/Header";
import ImagePreviewClient from "./ImagePreviewClient";

export default function ImagePreviewPage() {
  return (
    <div style={styles.page}>
      <Header />

      <Suspense fallback={<div style={styles.message}>Carregando imagem...</div>}>
        <ImagePreviewClient />
      </Suspense>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#111",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px",
    color: "white",
  },

  message: {
    marginTop: "24px",
    color: "white",
  },
};