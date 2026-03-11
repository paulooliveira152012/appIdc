import TreeNode from "./components/TreeNode";
import { bibleTree } from "./data/bibleTree";
import Header from "./components/Header";
import UsersCarousel from "./components/Users";

export default function Home() {
  return (
    <main style={styles.main}>
      <Header />
      

      <UsersCarousel />

      <div style={styles.content}>
        <TreeNode node={bibleTree} />
      </div>

    </main>
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
    flex: 1, // empurra o carousel para baixo
    overflow: "auto" as const,
  },
};