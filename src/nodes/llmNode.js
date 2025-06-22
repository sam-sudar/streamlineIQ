import BaseNode from "../baseNode";

export default function LLMNode({ id }) {
  return (
    <BaseNode
      title="LLM"
      inputHandles={[
        {
          id: `${id}-system`,
          position: "Left",
          style: { top: "33%" },
        },
        {
          id: `${id}-prompt`,
          position: "Left",
          style: { top: "66%" },
        },
      ]}
      outputHandleId={`${id}-response`}
    >
      <div className="text-xs text-white bg-[#31156B] px-2 py-1 rounded-md">
        This node represents a Large Language Model (LLM) interaction.
      </div>
    </BaseNode>
  );
}
