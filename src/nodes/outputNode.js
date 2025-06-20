// outputNode.js

import { useEffect, useState } from "react";
import { useStore } from "../store";
import BaseNode from "../baseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_")
  );
  const [outputType, setOutputType] = useState(data.outputType || "Text");
  const updateNodeField = useStore((state) => state.updateNodeField);

  useEffect(() => {
    updateNodeField(id, "outputName", currName);
    updateNodeField(id, "outputType", outputType);
  }, [currName, outputType, id, updateNodeField]);

  return (
    <BaseNode
      title="Output"
      handles={[{ type: "target", position: "Left", id: `${id}-value` }]}
    >
      <label>
        Name:
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </label>
      <label>
        Type:
        <select
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
