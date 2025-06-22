import { useState, useEffect } from "react";
import BaseNode from "../baseNode";
import { useStore } from "../store";

export default function InputNode({ id, data }) {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );
  const [inputType, setInputType] = useState(data.inputType || "Text");
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, "inputName", currName);
    updateNodeField(id, "inputType", inputType);
  }, [currName, inputType, updateNodeField, id]);

  return (
    <BaseNode title="Input" inputHandles={[]} outputHandleId={`${id}-value`}>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          className="bg-[#31156B] placeholder:text-purple-300 border border-purple-600/40 text-white text-xs px-2 py-1 rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="Enter input name"
        />

        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          className="bg-[#31156B] text-white text-xs border border-purple-600/40 px-2 py-1 rounded-md focus:ring-2 focus:ring-purple-500 transition"
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
}
