export default function PopUp({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-[#1B0C42] text-white rounded-xl w-[500px] shadow-2xl relative border border-purple-700">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#430B8A] to-[#31156B] px-6 py-4 rounded-t-xl flex justify-between items-center">
          <h2 className="text-xl font-bold tracking-wide text-purple-200">
            ✅ Pipeline Summary
          </h2>
          <button
            onClick={onClose}
            className="text-white text-xl font-bold hover:text-red-400"
          >
            ✖
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-sm font-casual leading-relaxed text-purple-100">
          <p>
            <span className="font-black text-purple-300">🧩 Nodes:</span>{" "}
            <span className="text-white font-black text-base">
              {data.num_nodes}
            </span>{" "}
            <br />
            Nodes are individual blocks in your pipeline — each one represents
            an operation like input, text processing, or output.
          </p>

          <p>
            <span className="font-black text-purple-300">🔗 Edges:</span>{" "}
            <span className="text-white font-black text-base">
              {data.num_edges}
            </span>{" "}
            <br />
            Edges connect nodes and define the flow of data between them — a
            link from one node's output to another's input.
          </p>

          <p>
            <span className="font-black text-purple-300">
              📐 DAG (Directed Acyclic Graph):
            </span>{" "}
            <span
              className={`text-base font-bold ${
                data.is_dag ? "text-green-400" : "text-red-400"
              }`}
            >
              {data.is_dag ? "✅ Yes" : "❌ No"}
            </span>{" "}
            <br />A DAG means there are no circular loops in the flow — every
            node flows forward without cycles. This ensures your pipeline can be
            executed step by step without infinite loops.
          </p>
        </div>
      </div>
    </div>
  );
}
