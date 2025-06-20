import BaseNode from "../baseNode";
function MergeNode({ id }) {
  return (
    <BaseNode
      title="Merge"
      handles={[
        {
          type: "target",
          position: "Left",
          id: `${id}-in1`,
          style: { top: "30%" },
        },
        {
          type: "target",
          position: "Left",
          id: `${id}-in2`,
          style: { top: "70%" },
        },
        { type: "source", position: "Right", id: `${id}-out` },
      ]}
    >
      <div>Merge multiple inputs into one</div>
    </BaseNode>
  );
}

export default MergeNode;
