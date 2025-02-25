"use client";

import LinkGame from "../LinkGame";
import getPlataformByUrl from "@/tools/getPlataformByUrl";
import usePostStore from "@/stores/post.store";

function LinksAndResources() {
  const { post } = usePostStore();
  return (
    <div className="rounded-lg border border-[#1c2f4a] bg-[#132238] p-6">
      <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-white/70">
        DOCUMENTATION AND LINKS
      </h2>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        {post?.links.map((link, index) => (
          <LinkGame
            key={`${link.url}-${index}`}
            link={link.url}
            plataform={getPlataformByUrl(link.url)}
          />
        ))}
      </div>
    </div>
  );
}

export default LinksAndResources;
