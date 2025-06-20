// inputNode.js

import { useState, useEffect } from "react";
import BaseNode from "../baseNode";
import { useStore } from "../store";

export const InputNode = ({ id, data }) => {
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
    <BaseNode
      title="Input-Base"
      handles={[
        {
          type: "source",
          position: "Right",
          id: `${id}-value`,
        },
      ]}
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
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
