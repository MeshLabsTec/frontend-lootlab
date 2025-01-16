"use client";

import BasicInfo from "../BasicInfo";
import usePostStore from "@/stores/post.store";

export default function BasicInfoGrid() {
  const { post } = usePostStore();
  return (
    <div className="row-span-2 flex h-full flex-col justify-center gap-6 md:col-span-1">
      <BasicInfo info={post?.title || ""} title="TÍTULO" />
      <BasicInfo info={post?.author.name || ""} title="ANALISTA" />
      <div className="grid grid-cols-2 gap-6">
        <BasicInfo title="NOTA" info={String(post?.score) || "0"} />
        <BasicInfo title="REDE" info={post?.network || "SI"} />
        <BasicInfo title="INVESTIMENTO" info={post?.investment || "SI"} />
        {post?.category === "NFT Jogos" && (
          <BasicInfo title="TOKEN" info={post?.token || "SI"} />
        )}
      </div>
    </div>
  );
}
