"use client";

import BasicInfo from "../BasicInfo";
import usePostStore from "@/stores/post.store";

export default function BasicInfoGrid() {
  const { post } = usePostStore();
  return (
    <div className="row-span-2 flex h-full flex-col justify-center gap-6 md:col-span-1">
      <BasicInfo info={post?.title || ""} title="TITLE" />
      <BasicInfo info={post?.author.name || ""} title="ANALYST" />
      <div className="grid grid-cols-2 gap-6">
        <BasicInfo title="SCORE" info={String(post?.score || "") || "0"} />
        <BasicInfo title="NETWORK" info={post?.network || "N/I"} />
        <BasicInfo title="INVESTMENT" info={post?.investment || "N/I"} />
        {post?.category === "NFT Jogos" && (
          <BasicInfo title="TOKEN" info={post?.token || "N/I"} />
        )}
      </div>
    </div>
  );
}
