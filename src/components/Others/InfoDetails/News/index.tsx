"use client";
import usePostStore from "@/stores/post.store";
import TwitterFeed from "../../Twitter";
import getPlataformByUrl from "@/tools/getPlataformByUrl";

function News() {
  const { post } = usePostStore();
  const twitterLink = post?.links.filter(
    ({ url }) => getPlataformByUrl(url) === "twitter",
  )[0]?.url;
  return (
    <div className="row-span-2 flex h-full flex-col items-center justify-center gap-3 text-pretty rounded-lg border-[#1c2f4a] bg-[#132238] p-4 font-russo-one text-3xl italic md:col-span-2 md:text-5xl">
      <TwitterFeed twitterUrl={twitterLink || ""} />
    </div>
  );
}

export default News;
