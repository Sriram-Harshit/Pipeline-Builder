import { useState } from "react";
import BaseNode from "../baseNode";
import Select from "../../components/Select/Select";

const ResponseScorerNode = ({ id }) => {
  const [metric, setMetric] = useState("Relevance");

  return (
    <BaseNode
      title="Response Scorer"
      inputs={[{ id: `${id}-response` }]}
      outputs={[{ id: `${id}-score` }]}
    >
      <div className="node-field">
        <label className="node-label">Metric</label>
        <Select
          value={metric}
          options={["Relevance", "Clarity", "Correctness"]}
          onChange={setMetric}
        />
      </div>
    </BaseNode>
  );
};

export default ResponseScorerNode;
