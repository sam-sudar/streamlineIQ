// llmNode.js

import BaseNode from "../baseNode";

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      title="LLM"
      handles={[
        {
          type: "target",
          position: "Left",
          id: `${id}-system`,
          style: { top: "33%" },
        },
        {
          type: "target",
          position: "Left",
          id: `${id}-prompt`,
          style: { top: "66%" },
        },
        { type: "source", position: "Right", id: `${id}-response` },
      ]}
    >
      <div>This is a LLM node.</div>
    </BaseNode>
  );
};
