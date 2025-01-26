"use client";
import usePostStore from "@/stores/post.store";

function Commentary() {
  const { post } = usePostStore();
  return (
    <div className="max-h-[23rem] min-h-[23rem] rounded-lg border-[#1c2f4a] bg-[#132238] md:col-span-2">
      <div className="h-full w-full overflow-y-auto scrollbar-thin scrollbar-track-[#1c2f4a] scrollbar-thumb-[#2d4a75] hover:scrollbar-thumb-[#3d5a85]">
        <div className="p-6">
          <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-white/70">
            COMENTÁRIO
          </h2>
          <p className="w-full whitespace-pre-wrap break-words text-lg italic leading-relaxed">
            {post?.commentAuthor || "Sem comentários"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Commentary;
