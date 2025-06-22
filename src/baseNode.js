import { Handle, Position } from "reactflow";

const positionMap = {
  Top: Position.Top,
  Bottom: Position.Bottom,
  Left: Position.Left,
  Right: Position.Right,
};

export default function BaseNode({
  title,
  children,
  outputHandleId = "output",
  inputHandles = [],
  style = {},
}) {
  return (
    <div
      className="rounded-xl shadow-lg w-[220px] font-sans text-white border border-purple-600 relative z-20"
      style={{ backgroundColor: "#1B0C42", ...style }}
    >
      <div className="text-sm font-bold tracking-wide text-purple-200 bg-gradient-to-br from-deepMid to-deepStart px-3 py-2">
        {title}
      </div>

      <div className="text-xs px-4 py-4">{children}</div>

      {inputHandles.map((handle, i) => (
        <Handle
          key={handle.id || i}
          type="target"
          id={handle.id}
          position={positionMap[handle.position || "Left"]}
          style={{
            top: handle.top || `${(i + 1) * 25}px`,
            background: "#7042C2",
            border: "2px solid white",
            width: 10,
            height: 10,
            borderRadius: "50%",
            transform: "translateY(-50%)",
            ...handle.style,
          }}
        />
      ))}

      {outputHandleId && (
        <Handle
          type="source"
          position={Position.Right}
          id={outputHandleId}
          style={{
            top: "50%",
            background: "#7042C2",
            border: "2px solid white",
            width: 10,
            height: 10,
            borderRadius: "50%",
            transform: "translateY(-50%)",
          }}
        />
      )}
    </div>
  );
}
