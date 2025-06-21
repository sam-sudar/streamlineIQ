// submit.js
import axios from "axios";
import { useStore } from "./store";

export const SubmitButton = () => {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const handleSubmit = async () => {
    console.log("✅ NODES:", nodes);
    console.log("✅ EDGES:", edges);

    try {
      const payload = { nodes, edges };

      const response = await axios.post(
        "http://localhost:8000/pipelines/parse",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { num_nodes, num_edges, is_dag } = response.data;

      alert(
        `✅ Pipeline Summary:\n\n🧩 Nodes: ${num_nodes}\n🔗 Edges: ${num_edges}\n📐 DAG: ${
          is_dag ? "✅ Yes" : "❌ No"
        }`
      );
    } catch (error) {
      console.error("🚨 Error submitting pipeline:", error);
      alert("🚨 Failed to submit pipeline. Check backend connection.");
    }
  };

  return (
    <div style={{ position: "absolute", bottom: 10, right: 10 }}>
      <button
        onClick={handleSubmit}
        style={{
          padding: "8px 16px",
          fontSize: "14px",
          background: "#333",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        🚀 Submit Pipeline
      </button>
    </div>
  );
};
