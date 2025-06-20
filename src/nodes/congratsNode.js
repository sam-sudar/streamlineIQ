import BaseNode from "../baseNode";

function CongratsNode() {
  return (
    <BaseNode title="Comment" handles={[]}>
      <div style={{ fontStyle: "italic", color: "#666" }}>
        IDK why, but Congrats
      </div>
    </BaseNode>
  );
}

export default CongratsNode;
