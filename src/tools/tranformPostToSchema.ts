import type { FormDataToUpdate } from "@/components/Others/TabsUpdatePost/Schema";
import type { IPost } from "@/interfaces/interfaces";

export function transformPostToSchema(post: IPost): FormDataToUpdate {
  return {
    category: post.category,
    oldImageUrl: post.images[0] || "",
    postId: post.id,
    title: post.title || "",
    market_link: post.market_link || "",
    score: post.score ?? null,
    investment: String(post.investment || ""),
    network: post.network || "",
    token: post.token || "",
    comment_author: post.comment_author || "",
    imagens: [post.images[0]],
    links: post.links.map((link) => ({
      url: link.url,
    })),
    projectFeatures: post.projectFeatures.map((feature) => ({
      title: feature.title,
      isFeature: !!feature.isFeature,
    })),
    launchInfo: {
      launchDate: new Date(post.launchInfo.launchDate),
      marketCap: post.launchInfo.marketCap,
      currentSupply: post.launchInfo.currentSupply,
      totalSupply: +post.launchInfo.totalSupply,
      privateSale: post.launchInfo.privateSale,
      publicSale: post.launchInfo.publicSale,
    },
    genres: post.genres.map((genre) => genre),
    partnerships: post.partnerships.map((partner) => ({
      type: partner.type,
      link_url: partner.link_url,
    })),
  };
}
