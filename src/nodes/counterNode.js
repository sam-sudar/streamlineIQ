import { useState, useEffect } from "react";
import { useStore } from "../store";
import BaseNode from "../baseNode";

function CounterNode({ id, data }) {
  const [count, setCount] = useState(data?.count || 0);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, "count", count);
  }, [count, id, updateNodeField]);
  return (
    <BaseNode
      title="Counter"
      handles={[{ type: "source", position: "Right", id: `${id}-count` }]}
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button onClick={() => setCount(count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </BaseNode>
  );
}

export default CounterNode;
