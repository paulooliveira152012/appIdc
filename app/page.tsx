
import TreeNode from "./components/TreeNode";
import { bibleTree } from "./data/bibleTree";
import Header from "./components/Header";

export default function Home() {
  return (
    <main style={{ padding: 40 }}>
      <Header />
      <TreeNode node={bibleTree} />
    </main>
  );
}