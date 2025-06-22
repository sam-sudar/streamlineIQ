import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div className="p-4">
      <div className="bg-gradient-to-r from-toolbarGradientFrom to-toolbarGradientTo border border-borderGlow/30 rounded-xl p-4 flex flex-wrap gap-4 shadow-lg">
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
