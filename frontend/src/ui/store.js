import { createWithEqualityFn } from "zustand/traditional";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

const useStore = createWithEqualityFn((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const nodeIDs = { ...get().nodeIDs };
    nodeIDs[type] = (nodeIDs[type] || 0) + 1;
    set({ nodeIDs });
    return `${type}-${nodeIDs[type]}`;
  },

  addNode: (node) => {
    set({ nodes: [...get().nodes, node] });
  },

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: {
            type: MarkerType.Arrow,
            width: 20,
            height: 20,
          },
        },
        get().edges
      ),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, [fieldName]: fieldValue } }
          : node
      ),
    });
  },
}));

export default useStore;
