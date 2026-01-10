import { Handle, Position } from "reactflow";
import "../css/baseNode.css";

/*
  BaseNode is the shared wrapper for all node types.
  It handles layout, styling, and rendering of input/output handles.
  Any node-specific logic or state should stay in the child components.
*/
const BaseNode = ({ title, inputs = [], outputs = [], children }) => {
  return (
    <div className="base-node">
      {/* Node title shown at the top */}
      <div className="base-node-header">{title}</div>

      <div className="base-node-body">
        {/* Input handles (left side) */}
        <div className="base-node-handles base-node-handles-left">
          {inputs.map((input) => (
            <Handle
              key={input.id}
              id={input.id}
              type="target"
              position={Position.Left}
              className="base-node-handle"
              isConnectable={true}
            />
          ))}
        </div>

        {/* Node-specific UI goes here */}
        <div className="base-node-content">{children}</div>

        {/* Output handles (right side) */}
        <div className="base-node-handles base-node-handles-right">
          {outputs.map((output) => (
            <Handle
              key={output.id}
              id={output.id}
              type="source"
              position={Position.Right}
              className="base-node-handle"
              isConnectable={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BaseNode;
