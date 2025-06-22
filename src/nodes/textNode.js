import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReactFlow, useUpdateNodeInternals } from "reactflow";
import BaseNode from "../baseNode";
import { useStore } from "../store";

export default function TextNode({ id, data }) {
  const [text, setText] = useState(data?.text || "");
  const [matchedVars, setMatchedVars] = useState(data?.variables || []);

  const textareaRef = useRef(null);
  const lastVarsRef = useRef([]);

  const updateNodeField = useStore((s) => s.updateNodeField);
  const updateNodeInternals = useUpdateNodeInternals();
  const { getNodes, addEdges, getEdges } = useReactFlow();

  // Resize textarea to fit content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);

  // Track {{variable}} usage and sync with store
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

  // Adjust node size for new handles
  useLayoutEffect(() => {
    updateNodeInternals(id);
  }, [matchedVars, updateNodeInternals, id]);

  // Automatically connect to input nodes
  useEffect(() => {
    const allNodes = getNodes();
    const allEdges = getEdges();

    matchedVars.forEach((varName) => {
      const inputNode = allNodes.find(
        (n) => n.type === "customInput" && n.data?.inputName === varName
      );
      if (!inputNode) return;

      const edgeId = `${inputNode.id}-${id}-${varName}`;
      const alreadyExists = allEdges.some((e) => e.id === edgeId);

      if (!alreadyExists) {
        addEdges([
          {
            id: edgeId,
            source: inputNode.id,
            sourceHandle: `${inputNode.id}-value`,
            target: id,
            targetHandle: `${id}-${varName}`,
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
      <div className="p-1">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-[#31156B] text-white text-xs resize-none w-full px-2 py-1 rounded-md border border-purple-600/40 placeholder:text-purple-300 focus:ring-2 focus:ring-purple-500 outline-none overflow-hidden transition"
          rows={1}
          placeholder="Type text here ({{variable}})"
        />
      </div>
    </BaseNode>
  );
}
