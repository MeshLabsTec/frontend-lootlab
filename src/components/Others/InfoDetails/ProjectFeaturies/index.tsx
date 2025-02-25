"use client";
import Link from "next/link";
import CardInfo from "../CardInfo";
import FeatureItem from "../FeatureItem";
import usePostStore from "@/stores/post.store";
import { useEffect, useState } from "react";
import type { IProjectFeature } from "@/interfaces/interfaces";

function ProjectFeaturies() {
  const { post } = usePostStore();
  const [features, setFeatures] = useState<IProjectFeature[] | []>([]);

  useEffect(() => {
    if (post?.projectFeatures) {
      setFeatures(post?.projectFeatures);
    }
  }, [post?.projectFeatures]);

  const midIdx = Math.ceil((features || [""]).length / 2);
  const firstColumnFeatures = features.slice(0, midIdx);
  const secondColumnFeatures = features.slice(midIdx);

  return (
    <div className="space-y-6">
      <CardInfo title="PROJECT FEATURES">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            {firstColumnFeatures?.map((feature, idx) => (
              <FeatureItem
                check={feature.isFeature}
                key={feature.title + idx}
                info={feature.title}
              />
            ))}
          </div>
          <div className="space-y-4">
            {secondColumnFeatures?.map((feature, idx) => (
              <FeatureItem
                check={feature.isFeature}
                key={feature.title + idx}
                info={feature.title}
              />
            ))}
          </div>
        </div>
      </CardInfo>

      <CardInfo title="PARTNERSHIPS">
        <div className="flex flex-col gap-2">
          {post?.partnerships.map((partner, idx) => (
            <Link
              key={partner.type || "!#$" + idx}
              href={partner.link_url}
              className="text-[#94a7c6] hover:text-[#ffffff]"
            >
              {partner.link_url}
            </Link>
          ))}
        </div>
      </CardInfo>
    </div>
  );
}

export default ProjectFeaturies;
