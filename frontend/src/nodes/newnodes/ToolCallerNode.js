import { useState } from "react";
import BaseNode from "../baseNode";

const ToolCallerNode = ({ id }) => {
  const [toolName, setToolName] = useState("search");

  return (
    <BaseNode
      title="Tool Caller"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-result` }]}
    >
      <label className="node-label">
        Tool
        <input value={toolName} onChange={(e) => setToolName(e.target.value)} />
      </label>
    </BaseNode>
  );
};

export default ToolCallerNode;
