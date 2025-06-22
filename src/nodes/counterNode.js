import { useState, useEffect } from "react";
import { useStore } from "../store";
import BaseNode from "../baseNode";

export default function CounterNode({ id, data }) {
  const [count, setCount] = useState(data?.count || 0);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, "count", count);
  }, [count, id, updateNodeField]);

  return (
    <BaseNode title="Counter" outputHandleId={`${id}-count`}>
      <div className="flex justify-between items-center px-2 py-1 bg-[#31156B] text-white rounded-md">
        <button
          onClick={() => setCount(count - 1)}
          className="text-sm bg-purple-700 hover:bg-purple-800 px-2 py-1 rounded-md"
        >
          -
        </button>
        <span className="text-sm font-semibold">{count}</span>
        <button
          onClick={() => setCount(count + 1)}
          className="text-sm bg-purple-700 hover:bg-purple-800 px-2 py-1 rounded-md"
        >
          +
        </button>
      </div>
    </BaseNode>
  );
}
