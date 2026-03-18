"use client";
import React, { useState } from "react";
import TreeNode from "./components/TreeNode";
import { bibleTree } from "./data/bibleTree";
import Header from "./components/Header";
import UsersCarousel from "./components/Users";
import Notes from "./components/Notes";
import NewNote from "./components/main/NewNote";
import Managing from "./components/Managing";
import { ListingProvider } from "./context/listingContext";
import { useUser } from "./context/userContext";
import { useRouter } from "next/navigation";
// comonentes
import Highlights from "./components/main/HighLights";

const HomeContent = () => {
  const router = useRouter();
  const [active, setActive] = useState("feed");
  const { user } = useUser();
  const isLeader = user?.role == "leader";
  const tabs = !isLeader
    ? ["feed", "bible", "post", "destaques"]
    : ["feed", "bible", "post", "destaques", "Gestão"];
  console.log("user no profile:", user);

  // const largura = 20/100 * (tabs.length)

  // window.alert(largura)

  return (
    <main style={styles.main}>
      <Header />

      <div style={styles.optionsContainer}>
        {tabs.map((tab) => {
  const isActive = active === tab;

  return (
    <span
      key={tab}
      style={{
        ...styles.option,
        ...(tab === "destaques" ? styles.destaquesBorder : {}),
        ...(isActive ? styles.activeOption : {}),
      }}
      onClick={() => {
        if (tab === "Gestão") {
          router.push("/pages/adm");
        } else {
          setActive(tab);
        }
      }}
    >
      {tab}
    </span>
  );
})}
      </div>

      {active === "feed" && (
        <div>
          <UsersCarousel />
          <Notes />
        </div>
      )}

      {active === "bible" && (
        <div style={styles.content}>
          <TreeNode node={bibleTree} />
        </div>
      )}

      {active === "post" && <NewNote setActive={setActive} />}

      {active === "destaques" && <Highlights />}

      {active === "Gestão" && (
        <>
          <Managing />
        </>
      )}
    </main>
  );
};

export default function Home() {
  return (
    <ListingProvider>
      <HomeContent />
    </ListingProvider>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    backgroundColor: "#111",
    color: "white",
  },

  content: {
    flex: 1,
    overflow: "auto" as const,
  },

  optionsContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: "14px",
    padding: 20,
    flexWrap: "wrap" as const,
  },

  option: {
    backgroundColor: "#1f2937",
    padding: "10px 20px",
    borderRadius: 999,
    minWidth: "120px",
    textAlign: "center" as const,
    cursor: "pointer",
    border: "1px solid rgba(255,255,255,0.08)",
    textTransform: "capitalize" as const,
  },

  activeOption: {
    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
    fontWeight: 700,
  },

  destaquesBorder: {
  border: "1.5px solid #f59e0b", // laranja
},
};
