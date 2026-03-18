// app/components/Managing.tsx
"use client";
import React, { useState } from "react";
import "@/app/style/styles.css";
import ManagingModal from "../modals/managing";

const Managing = () => {
  const options = ["Chamada", "Histórico de presença", "Pontuações", "Eventos"];
  const [selected, setSelected] = useState<string>("");

  return (
    <div className="component">
      <div className="optionsWrapper">
        <div className="optionsContainer">
          {options.map((option, i) => {
            return (
              <button
                key={i}
                className="optionButton"
                onClick={() => setSelected(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {selected && (
        <ManagingModal
          option={selected}
          onClose={() => setSelected("")}
        />
      )}
    </div>
  );
};

export default Managing;