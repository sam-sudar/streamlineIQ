import { useState, useEffect } from "react";
import BaseNode from "../baseNode";
import { useStore } from "../store";

export default function AdditionNode({ id, data }) {
  const [a, setA] = useState(data?.a || 0);
  const [b, setB] = useState(data?.b || 0);
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, "a", a);
    updateNodeField(id, "b", b);
    updateNodeField(id, "result", Number(a) + Number(b));
  }, [a, b, id, updateNodeField]);

  return (
    <BaseNode title="Add" outputHandleId={`${id}-sum`}>
      <div className="flex flex-col gap-2 text-xs text-white">
        <input
          type="number"
          value={a}
          onChange={(e) => setA(e.target.value)}
          className="bg-[#31156B] border border-purple-600/40 text-white px-2 py-1 rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="A"
        />
        <input
          type="number"
          value={b}
          onChange={(e) => setB(e.target.value)}
          className="bg-[#31156B] border border-purple-600/40 text-white px-2 py-1 rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="B"
        />
        <div className="text-purple-300 pt-1">
          Result: {Number(a) + Number(b)}
        </div>
      </div>
    </BaseNode>
  );
}
