"use client";

import { useState } from "react";
import { BibleNode } from "../data/bibleTree";

type Props = {
  node: BibleNode;
};

export default function TreeNode({ node }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginLeft: 20 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          padding: "10px",
          margin: "5px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {node.label}
      </button>

      {open &&
        node.children?.map((child) => (
          <TreeNode key={child.id} node={child} />
        ))}
    </div>
  );
}