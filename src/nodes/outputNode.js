import { useEffect, useState } from "react";
import BaseNode from "../baseNode";
import { useStore } from "../store";

export default function OutputNode({ id, data }) {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, "outputName", currName);
    updateNodeField(id, "outputType", outputType);
  }, [currName, outputType, updateNodeField, id]);

  return (
    <BaseNode
      title="Output"
      inputHandles={[{ id: `${id}-value`, position: "Left" }]}
      outputHandleId={null}
    >
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          className="bg-[#31156B] placeholder:text-purple-300 border border-purple-600/40 text-white text-xs px-2 py-1 rounded-md outline-none focus:ring-2 focus:ring-purple-500 transition"
          placeholder="Enter output name"
        />

        <select
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
          className="bg-[#31156B] text-white text-xs border border-purple-600/40 px-2 py-1 rounded-md focus:ring-2 focus:ring-purple-500 transition"
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </div>
    </BaseNode>
  );
}
