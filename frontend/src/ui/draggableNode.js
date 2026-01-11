import "../css/draggableNode.css";

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
