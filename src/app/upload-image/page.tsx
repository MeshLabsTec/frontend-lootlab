import { Suspense } from "react";
import { LayoutPage } from "@/components/Layout";
import UploadImageComponent from "@/components/Others/UploadImage";
import ListImagens from "@/components/Others/UploadImage/ListImagens";

export default function UploadImage() {
  return (
    <LayoutPage className="pt-10">
      <Suspense>
        <UploadImageComponent />
        <ListImagens />
      </Suspense>
    </LayoutPage>
  );
}
