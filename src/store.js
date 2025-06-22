import { create } from "zustand";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const updatedIDs = { ...get().nodeIDs };
    updatedIDs[type] = (updatedIDs[type] || 0) + 1;
    set({ nodeIDs: updatedIDs });
    return `${type}-${updatedIDs[type]}`;
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
    const newEdge = {
      ...connection,
      type: "smoothstep",
      animated: true,
      markerEnd: {
        type: MarkerType.Arrow,
        width: 20,
        height: 20,
      },
    };

    set({ edges: addEdge(newEdge, get().edges) });
  },

  updateNodeField: (nodeId, fieldName, value) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, [fieldName]: value } }
          : node
      ),
    });
  },

  addEdgeManually: (source, sourceHandle, target, targetHandle) => {
    const edgeId = `${source}-${target}-${targetHandle}`;
    const edges = get().edges;

    if (!edges.some((e) => e.id === edgeId)) {
      set({
        edges: [
          ...edges,
          {
            id: edgeId,
            source,
            sourceHandle,
            target,
            targetHandle,
            type: "smoothstep",
            animated: true,
          },
        ],
      });
    }
  },
}));
