import BaseNode from "../baseNode";

export default function CongratsNode() {
  return (
    <BaseNode title="Comment" inputHandles={[]} outputHandleId={null}>
      <div className="text-xs italic text-purple-300 bg-[#31156B] px-2 py-1 rounded-md">
        Not sure why, but congrats anyway 🎉
      </div>
    </BaseNode>
  );
}
