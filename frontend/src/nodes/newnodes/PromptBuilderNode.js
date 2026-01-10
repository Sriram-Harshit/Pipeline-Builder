import { useState } from "react";
import BaseNode from "../baseNode";

const PromptBuilderNode = ({ id }) => {
  const [role, setRole] = useState("You are an assistant");
  const [task, setTask] = useState("Summarize the text");
  const [constraints, setConstraints] = useState("Keep it concise");

  return (
    <BaseNode
      title="Prompt Builder"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-prompt` }]}
    >
      <label className="node-label">
        Role
        <input value={role} onChange={(e) => setRole(e.target.value)} />
      </label>

      <label className="node-label">
        Task
        <input value={task} onChange={(e) => setTask(e.target.value)} />
      </label>

      <label className="node-label">
        Constraints
        <input
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};

export default PromptBuilderNode;
