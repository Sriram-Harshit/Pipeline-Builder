import { useEffect, useMemo, useRef, useState } from "react";
import { useReactFlow } from "reactflow";
import BaseNode from "../baseNode";

// Finds things like {{input}} inside the text
const VARIABLE_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

// Prevents the textarea from becoming too small
const MIN_HEIGHT = 60;

const TextNode = ({ id, data }) => {
  // Actual text content of this node
  const [text, setText] = useState(data?.text || "{{EnterYourVarName}}");

  // Used only to resize the textarea dynamically
  const textareaRef = useRef(null);

  // Keeps track of old input handles so we can clean up edges
  const prevInputsRef = useRef([]);

  const { setEdges } = useReactFlow();

  // Parse the text and turn {{variables}} into input handles
  const inputs = useMemo(() => {
    const vars = new Set();
    VARIABLE_REGEX.lastIndex = 0;
    let match;

    while ((match = VARIABLE_REGEX.exec(text)) !== null) {
      vars.add(`${id}-${match[1]}`);
    }

    return Array.from(vars);
  }, [text, id]);

  // If a variable is removed from the text,
  // drop any edges connected to that handle
  useEffect(() => {
    const prev = prevInputsRef.current;
    const removed = prev.filter((h) => !inputs.includes(h));

    if (removed.length) {
      setEdges((edges) =>
        edges.filter(
          (e) => !(e.target === id && removed.includes(e.targetHandle))
        )
      );
    }

    prevInputsRef.current = inputs;
  }, [inputs, id, setEdges]);

  // Auto-grow textarea as the user types
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = `${Math.max(MIN_HEIGHT, el.scrollHeight)}px`;
  }, [text]);

  return (
    <BaseNode
      title="Text"
      inputs={inputs.map((id) => ({ id }))}
      outputs={[{ id: `${id}-output` }]}
    >
      {/* Main text input for this node */}
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type text here. Use {{variableName}} to reference inputs."
        className="text-node-textarea"
      />
    </BaseNode>
  );
};

export default TextNode;
