// ui.js
import { useState, useRef, useCallback } from "react";
import ReactFlow, { Controls, Background, MiniMap } from "reactflow";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";

import InputNode from "./nodes/inputNode";
import LLMNode from "./nodes/llmNode";
import OutputNode from "./nodes/outputNode";
import TextNode from "./nodes/textNode";
import CounterNode from "./nodes/counterNode";
import AdditionNode from "./nodes/additionNode";
import StaticNode from "./nodes/staticNode";
import MergeNode from "./nodes/mergeNode";
import CongratsNode from "./nodes/congratsNode";

import { SubmitButton } from "./submit";

import "reactflow/dist/style.css";

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  counter: CounterNode,
  addition: AdditionNode,
  static: StaticNode,
  merge: MergeNode,
  congrats: CongratsNode,
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
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: type });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const appData = event.dataTransfer.getData("application/reactflow");

      if (!appData) return;

      const { nodeType: type } = JSON.parse(appData);
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      const newNode = {
        id: nodeID,
        type,
        position,
        data: getInitNodeData(nodeID, type),
      };

      addNode(newNode);
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <>
      <div ref={reactFlowWrapper} style={{ width: "100vw", height: "70vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType="smoothstep"
        >
          <Background color="#aaa" gap={gridSize} />
          <Controls />
          <MiniMap
            nodeStrokeColor={(n) => "#7042C2"}
            nodeColor={(n) => "#31156B"}
            nodeBorderRadius={4}
            maskColor="rgba(27, 12, 66, 0.6)"
            className="rounded-md border border-purple-800"
          />

          {/* ✅ Pass nodes and edges to the button */}
        </ReactFlow>
      </div>
      <SubmitButton nodes={nodes} edges={edges} />
    </>
  );
};
