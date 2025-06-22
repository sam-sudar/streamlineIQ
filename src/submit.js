import axios from "axios";
import { useStore } from "./store";
import { useState } from "react";
import PopUp from "./popUp";

export const SubmitButton = () => {
  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const [summary, setSummary] = useState(null);

  const handleSubmit = async () => {
    try {
      const payload = { nodes, edges };
      const response = await axios.post(
        "http://localhost:8000/pipelines/parse",
        payload
      );

      setSummary(response.data);
    } catch (error) {
      console.error("🚨 Error submitting pipeline:", error);
      alert("🚨 Failed to submit pipeline. Check backend connection.");
    }
  };

  return (
    <>
      <div className="absolute bottom-4 right-4 z-20">
        <button
          onClick={handleSubmit}
          className="bg-[#2A6CAF] text-white px-6 py-2 rounded-lg shadow-md hover:brightness-110 transition-all duration-300 font-medium tracking-wide backdrop-blur-sm"
        >
          Run Pipeline Analysis
        </button>
      </div>

      <PopUp
        isOpen={!!summary}
        onClose={() => setSummary(null)}
        data={summary || {}}
      />
    </>
  );
};
