import { useState } from "react";
import BaseNode from "../baseNode";
import Select from "../../components/Select/Select";

const OutputFormatterNode = ({ id }) => {
  const [format, setFormat] = useState("Markdown");

  return (
    <BaseNode
      title="Output Formatter"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-formatted` }]}
    >
      <div className="node-field">
        <label className="node-label">Format</label>
        <Select
          value={format}
          options={["Markdown", "JSON", "Plain Text"]}
          onChange={setFormat}
        />
      </div>
    </BaseNode>
  );
};

export default OutputFormatterNode;
