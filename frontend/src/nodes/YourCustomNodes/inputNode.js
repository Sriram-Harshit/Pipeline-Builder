import { useState } from "react";
import BaseNode from "../baseNode";
import Select from "../../components/Select/Select";

const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );

  const [inputType, setInputType] = useState(data?.inputType || "Text");

  return (
    <BaseNode title="Input" outputs={[{ id: `${id}-value` }]}>
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
          value={inputType}
          options={["Text", "File"]}
          onChange={setInputType}
        />
      </div>
    </BaseNode>
  );
};

export default InputNode;
