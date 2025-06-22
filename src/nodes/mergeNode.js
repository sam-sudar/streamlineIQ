import BaseNode from "../baseNode";

export default function MergeNode({ id }) {
  return (
    <BaseNode
      title="Merge"
      inputHandles={[
        {
          id: `${id}-in1`,
          position: "Left",
          style: { top: "30%" },
        },
        {
          id: `${id}-in2`,
          position: "Left",
          style: { top: "70%" },
        },
      ]}
      outputHandleId={`${id}-out`}
    >
      <div className="text-xs text-white bg-[#31156B] px-2 py-1 rounded-md">
        Combines multiple values into one unified stream.
      </div>
    </BaseNode>
  );
}
