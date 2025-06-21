import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  // Handle,
  // Position,
  useReactFlow,
  useUpdateNodeInternals,
} from "reactflow";
import { useStore } from "../store";
import BaseNode from "../baseNode";

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || "");
  const [matchedVars, setMatchedVars] = useState(data?.variables || []);

  const updateNodeInternals = useUpdateNodeInternals();
  const updateNodeField = useStore((s) => s.updateNodeField);
  const { getNodes, addEdges, getEdges } = useReactFlow();

  const lastVarsRef = useRef([]);

  useEffect(() => {
    if (data?.text !== text) {
      updateNodeField(id, "text", text);
    }

    const variableMatches = Array.from(
      text.matchAll(/\{\{\s*(\w+)\s*\}\}/g)
    ).map((m) => m[1]);

    const inputNodeNames = getNodes()
      .filter((n) => n.type === "customInput")
      .map((n) => n.data?.inputName || "");

    const matched = variableMatches.filter((v) => inputNodeNames.includes(v));

    if (JSON.stringify(lastVarsRef.current) !== JSON.stringify(matched)) {
      setMatchedVars(matched);
      updateNodeField(id, "variables", matched);
      lastVarsRef.current = matched;
    }
  }, [text, data?.text, id, updateNodeField, getNodes]);

  useLayoutEffect(() => {
    updateNodeInternals(id);
  }, [matchedVars, updateNodeInternals, id]);

  useEffect(() => {
    const allNodes = getNodes();
    const allEdges = getEdges();

    matchedVars.forEach((varName) => {
      const inputNode = allNodes.find(
        (n) => n.type === "customInput" && n.data?.inputName === varName
      );

      if (!inputNode) return;

      const edgeId = `${inputNode.id}-${id}-${varName}`;
      const sourceHandle = `${inputNode.id}-value`;
      const targetHandle = `${id}-${varName}`;

      const alreadyExists = allEdges.some((e) => e.id === edgeId);

      if (!alreadyExists) {
        addEdges([
          {
            id: edgeId,
            source: inputNode.id,
            sourceHandle,
            target: id,
            targetHandle,
            type: "smoothstep",
            animated: true,
          },
        ]);
      }
    });
  }, [matchedVars, id, addEdges, getNodes, getEdges]);

  return (
    <BaseNode
      title="Text Node"
      outputHandleId={`${id}-output`}
      inputHandles={matchedVars.map((v, i) => ({
        id: `${id}-${v}`,
        position: "Left",
        style: { top: `${(i + 1) * 25}px` },
      }))}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Try {{inputName}}"
        style={{ width: "100%", marginTop: 8 }}
      />
    </BaseNode>
  );
};
