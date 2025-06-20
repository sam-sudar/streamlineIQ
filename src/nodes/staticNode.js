import BaseNode from "../baseNode";

function StaticNode() {
  return (
    <BaseNode title="Static" handles={[]}>
      <div style={{ fontStyle: "italic", color: "#666" }}>
        Still Figuring out
      </div>
    </BaseNode>
  );
}

export default StaticNode;
