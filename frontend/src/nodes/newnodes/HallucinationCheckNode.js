import BaseNode from "../baseNode";

const HallucinationCheckNode = ({ id }) => {
  return (
    <BaseNode
      title="Hallucination Check"
      inputs={[{ id: `${id}-response` }]}
      outputs={[{ id: `${id}-safe` }, { id: `${id}-risky` }]}
    >
      <div>Checks confidence & sources</div>
    </BaseNode>
  );
};

export default HallucinationCheckNode;
