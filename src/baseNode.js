import { Handle, Position } from "reactflow";

// Map string positions to Position constants
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
  inputHandles = [], //params => [{ id, position, style }]
  style = {},
}) {
  return (
    <div
      style={{
        width: 220,
        border: "1px solid #333",
        borderRadius: 8,
        padding: 10,
        background: "white",
        fontFamily: "sans-serif",
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
        position: "relative",
        ...style,
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: 6 }}>{title}</div>

      <div>{children}</div>

      {/* Input Handles */}
      {inputHandles.map((handle, i) => (
        <Handle
          key={handle.id || i}
          type="target"
          id={handle.id}
          position={positionMap[handle.position || "Left"]}
          style={{
            top: handle.top || `${(i + 1) * 25}px`,
            background: "#555",
            ...handle.style,
          }}
        />
      ))}

      {/* Output Handle (optional) */}
      {outputHandleId && (
        <Handle
          type="source"
          position={Position.Right}
          id={outputHandleId}
          style={{ top: "50%", background: "#555" }}
        />
      )}
    </div>
  );
}
