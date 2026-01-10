// import { useState, useRef, useCallback } from "react";
// import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
// import { useStore } from "./store";
// import { shallow } from "zustand/shallow";
// import { SubmitButton } from "./submit";
// import { PipelineToolbar } from "./toolbar";

// import "reactflow/dist/style.css";
// import "./mainSrc.css";

// // Your Nodes
// import InputNode from "./nodes/YourCustomNodes/inputNode";
// import LLMNode from "./nodes/YourCustomNodes/llmNode";
// import OutputNode from "./nodes/YourCustomNodes/outputNode";
// import TextNode from "./nodes/YourCustomNodes/textNode";

// // New Nodes
// import PromptBuilderNode from "./nodes/newnodes/PromptBuilderNode";
// import ContextMemoryNode from "./nodes/newnodes/ContextMemoryNode";
// import ResponseScorerNode from "./nodes/newnodes/ResponseScorerNode";
// import ToolCallerNode from "./nodes/newnodes/ToolCallerNode";
// import OutputFormatterNode from "./nodes/newnodes/OutputFormatterNode";
// import HallucinationCheckNode from "./nodes/newnodes/HallucinationCheckNode";

// const gridSize = 20;
// const proOptions = { hideAttribution: true };

// const nodeTypes = {
//   inputNode: InputNode,
//   textNode: TextNode,
//   llmNode: LLMNode,
//   outputNode: OutputNode,

//   promptBuilderNode: PromptBuilderNode,
//   contextMemoryNode: ContextMemoryNode,
//   responseScorerNode: ResponseScorerNode,
//   toolCallerNode: ToolCallerNode,
//   outputFormatterNode: OutputFormatterNode,
//   hallucinationCheckNode: HallucinationCheckNode,
// };

// const selector = (state) => ({
//   nodes: state.nodes,
//   edges: state.edges,
//   getNodeID: state.getNodeID,
//   addNode: state.addNode,
//   onNodesChange: state.onNodesChange,
//   onEdgesChange: state.onEdgesChange,
//   onConnect: state.onConnect,
// });

// export const PipelineUI = () => {
//   const reactFlowWrapper = useRef(null);
//   const [reactFlowInstance, setReactFlowInstance] = useState(null);

//   const {
//     nodes,
//     edges,
//     getNodeID,
//     addNode,
//     onNodesChange,
//     onEdgesChange,
//     onConnect,
//   } = useStore(selector, shallow);

//   const getInitNodeData = (nodeID, type) => ({
//     nodeType: type,
//   });

//   const onDrop = useCallback(
//     (event) => {
//       event.preventDefault();
//       if (!reactFlowInstance) return;

//       const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

//       const data = event.dataTransfer.getData("application/reactflow");
//       if (!data) return;

//       const appData = JSON.parse(data);
//       const type = appData?.nodeType;

//       if (!type) return;

//       const position = reactFlowInstance.project({
//         x: event.clientX - reactFlowBounds.left,
//         y: event.clientY - reactFlowBounds.top,
//       });

//       const nodeID = getNodeID(type);

//       const newNode = {
//         id: nodeID,
//         type,
//         position,
//         data: getInitNodeData(nodeID, type),
//       };

//       addNode(newNode);
//     },
//     [reactFlowInstance, getNodeID, addNode]
//   );

//   const onDragOver = useCallback((event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   }, []);

//   return (
//     <div className="app-layout">
//       <PipelineToolbar />
//       <div ref={reactFlowWrapper} className="pipeline-wrapper">
//         <SubmitButton />
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           nodeTypes={nodeTypes}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onDrop={onDrop}
//           onDragOver={onDragOver}
//           onInit={setReactFlowInstance}
//           snapGrid={[gridSize, gridSize]}
//           connectionLineType="smoothstep"
//           proOptions={proOptions}
//           fitView
//         >
//           <Background />
//           <Controls />
//           <MiniMap />
//         </ReactFlow>
//       </div>
//     </div>
//   );
// };

import { useRef, useState, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import useStore from "./store";
import { shallow } from "zustand/shallow";
import { SubmitButton } from "./submit";
import { PipelineToolbar } from "./toolbar";

import "reactflow/dist/style.css";
import "./mainSrc.css";

import InputNode from "./nodes/YourCustomNodes/inputNode";
import TextNode from "./nodes/YourCustomNodes/textNode";
import LLMNode from "./nodes/YourCustomNodes/llmNode";
import OutputNode from "./nodes/YourCustomNodes/outputNode";

import PromptBuilderNode from "./nodes/newnodes/PromptBuilderNode";
import ContextMemoryNode from "./nodes/newnodes/ContextMemoryNode";
import ResponseScorerNode from "./nodes/newnodes/ResponseScorerNode";
import ToolCallerNode from "./nodes/newnodes/ToolCallerNode";
import OutputFormatterNode from "./nodes/newnodes/OutputFormatterNode";
import HallucinationCheckNode from "./nodes/newnodes/HallucinationCheckNode";

const nodeTypes = {
  inputNode: InputNode,
  textNode: TextNode,
  llmNode: LLMNode,
  outputNode: OutputNode,
  promptBuilderNode: PromptBuilderNode,
  contextMemoryNode: ContextMemoryNode,
  responseScorerNode: ResponseScorerNode,
  toolCallerNode: ToolCallerNode,
  outputFormatterNode: OutputFormatterNode,
  hallucinationCheckNode: HallucinationCheckNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const wrapperRef = useRef(null);
  const [rfInstance, setRfInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!rfInstance) return;

      const bounds = wrapperRef.current.getBoundingClientRect();
      const raw = event.dataTransfer.getData("application/reactflow");
      if (!raw) return;

      const { nodeType } = JSON.parse(raw);
      if (!nodeType) return;

      const position = rfInstance.project({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      addNode({
        id: getNodeID(nodeType),
        type: nodeType,
        position,
        data: {},
      });
    },
    [rfInstance, getNodeID, addNode]
  );

  return (
    <div className="app-layout">
      <PipelineToolbar />
      <div ref={wrapperRef} className="pipeline-wrapper">
        <SubmitButton />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onInit={setRfInstance}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};
