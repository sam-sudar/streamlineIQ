// store.js
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
    const newIDs = { ...get().nodeIDs };
    if (!newIDs[type]) newIDs[type] = 0;
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
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
            height: 20,
            width: 20,
          },
        },
        get().edges
      ),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, [fieldName]: fieldValue },
          };
        }
        return node;
      }),
    });
  },

  addEdgeManually: (source, sourceHandle, target, targetHandle) => {
    const edges = get().edges;
    const edgeId = `${source}-${target}-${targetHandle}`;

    const exists = edges.some((e) => e.id === edgeId);
    if (!exists) {
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
