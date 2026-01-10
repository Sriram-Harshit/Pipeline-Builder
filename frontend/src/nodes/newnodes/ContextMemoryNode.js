import BaseNode from "../baseNode";

const ContextMemoryNode = ({ id }) => {
  return (
    <BaseNode
      title="Context Memory"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-context` }]}
    >
      <div>Stores previous context</div>
    </BaseNode>
  );
};

export default ContextMemoryNode;
