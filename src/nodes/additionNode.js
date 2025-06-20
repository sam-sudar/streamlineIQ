import { useState, useEffect } from "react";
import BaseNode from "../baseNode";
import { useStore } from "../store";

function AdditionNode({ id, data }) {
  const [a, setA] = useState(data?.a || 0);
  const [b, setB] = useState(data?.b || 0);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, "a", a);
    updateNodeField(id, "b", b);
    updateNodeField(id, "result", Number(a) + Number(b));
  }, [a, b, id, updateNodeField]);
  return (
    <BaseNode
      title="Add"
      handles={[{ type: "source", position: "Right", id: `${id}-sum` }]}
    >
      <label>
        A:
        <input type="number" value={a} onChange={(e) => setA(e.target.value)} />
      </label>
      <label>
        B:
        <input type="number" value={b} onChange={(e) => setB(e.target.value)} />
      </label>
      <div style={{ marginTop: "5px" }}>Result: {Number(a) + Number(b)}</div>
    </BaseNode>
  );
}

export default AdditionNode;
