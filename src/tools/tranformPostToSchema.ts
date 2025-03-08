import type { FormDataToUpdate } from "@/components/Others/TabsUpdatePost/Schema";
import type { IPost } from "@/interfaces/interfaces";

export function transformPostToSchema(post: IPost): FormDataToUpdate {
  return {
    category: post.category,
    oldImageUrl: post.images[0] || "",
    postId: post.id,
    title: post.title || "",
    marketLink: post.marketLink || "",
    score: post.score ?? null,
    investment: String(post.investment || ""),
    network: post.network || "",
    network_secondary: post.network_secondary || [],
    token: post.token || "",
    commentAuthor: post.commentAuthor || "",
    images: [post.images[0]],
    links: post.links.map((link) => ({
      url: link.url,
    })),
    projectFeatures: post.projectFeatures.map((feature) => ({
      title: feature.title,
      isFeature: !!feature.isFeature,
    })),
    launchInfo: {
      launchDate: new Date(post.launchInfo.launchDate),
      currentSupply: post.launchInfo.currentSupply || "",
      marketCap: post.launchInfo.marketCap || 0,
      totalSupply: +post.launchInfo.totalSupply || 0,
      privateSale: post.launchInfo.privateSale || 0,
      publicSale: post.launchInfo.publicSale || 0,
    },
    genres: post.genres.map((genre) => ({ name: genre })),
    status: post.status || "",
    platform: post.platform || [],
    partnerships: post.partnerships.map((partner) => ({
      type: partner.type || "",
      link_url: partner.link_url || "",
    })),
  };
}
