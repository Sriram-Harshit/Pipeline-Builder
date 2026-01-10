// import "./mainSrc.css";

// export const DraggableNode = ({ type, label }) => {
//   const onDragStart = (event) => {
//     const appData = { nodeType: type };
//     event.dataTransfer.setData(
//       "application/reactflow",
//       JSON.stringify(appData)
//     );
//     event.dataTransfer.effectAllowed = "move";
//   };

//   const isCustomNode = ![
//     "inputNode",
//     "textNode",
//     "llmNode",
//     "outputNode",
//   ].includes(type);

//   const className = `draggable-node ${
//     isCustomNode ? "custom-node" : "default-node"
//   }`;

//   return (
//     <div
//       className={className}
//       draggable
//       onDragStart={onDragStart}
//       onDragEnd={(e) => (e.currentTarget.style.cursor = "grab")}
//     >
//       <span className="draggable-node-label">{label}</span>
//     </div>
//   );
// };

import "./mainSrc.css";

const DraggableNode = ({ type, label }) => {
  const onDragStart = (event) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ nodeType: type })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const isCustomNode = ![
    "inputNode",
    "textNode",
    "llmNode",
    "outputNode",
  ].includes(type);

  return (
    <div
      className={`draggable-node ${
        isCustomNode ? "custom-node" : "default-node"
      }`}
      draggable
      onDragStart={onDragStart}
    >
      <span className="draggable-node-label">{label}</span>
    </div>
  );
};

export default DraggableNode;
