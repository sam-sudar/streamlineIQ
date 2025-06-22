import BaseNode from "../baseNode";

export default function StaticNode() {
  return (
    <BaseNode title="Static" inputHandles={[]} outputHandleId={null}>
      <div className="text-xs italic text-purple-300 bg-[#31156B] px-2 py-1 rounded-md">
        Still figuring out...
      </div>
    </BaseNode>
  );
}
