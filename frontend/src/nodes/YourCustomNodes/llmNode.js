import BaseNode from "../baseNode";

const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      title="LLM"
      inputs={[{ id: `${id}-system` }, { id: `${id}-prompt` }]}
      outputs={[{ id: `${id}-response` }]}
    >
      <div>This is a LLM.</div>
    </BaseNode>
  );
};

export default LLMNode;
