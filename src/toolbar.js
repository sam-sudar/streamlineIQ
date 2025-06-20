// toolbar.js

import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="counter" label="Counter" />
        <DraggableNode type="addition" label="Add" />
        <DraggableNode type="merge" label="Merge" />
        <DraggableNode type="static" label="Static" />
        <DraggableNode type="congrats" label="Congrats" />
      </div>
    </div>
  );
};
