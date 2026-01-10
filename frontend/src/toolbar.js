import DraggableNode from "./draggableNode";
import "./mainSrc.css";

export const PipelineToolbar = () => {
  return (
    <div className="pipeline-toolbar">
      <div className="pipeline-toolbar-nodes">
        <DraggableNode type="inputNode" label="Input" />
        <DraggableNode type="textNode" label="Text" />
        <DraggableNode type="llmNode" label="LLM" />
        <DraggableNode type="outputNode" label="Output" />

        <DraggableNode type="promptBuilderNode" label="Prompt Builder" />
        <DraggableNode type="contextMemoryNode" label="Context Memory" />
        <DraggableNode type="toolCallerNode" label="Tool Caller" />
        <DraggableNode type="responseScorerNode" label="Response Scorer" />
        <DraggableNode type="outputFormatterNode" label="Output Formatter" />
        <DraggableNode
          type="hallucinationCheckNode"
          label="Hallucination Check"
        />
      </div>
    </div>
  );
};
