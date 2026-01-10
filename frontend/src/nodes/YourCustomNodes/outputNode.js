import { useState } from "react";
import BaseNode from "../baseNode";
import Select from "../../components/Select/Select";

const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );

  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  return (
    <BaseNode title="Output" inputs={[{ id: `${id}-value` }]}>
      <div className="node-field">
        <label className="node-label">Name</label>
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </div>

      <div className="node-field">
        <label className="node-label">Type</label>
        <Select
          value={outputType}
          options={["Text", "Image"]}
          onChange={setOutputType}
        />
      </div>
    </BaseNode>
  );
};

export default OutputNode;
