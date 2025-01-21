"use client";

import useUpdatePost from "@/hooks/useUpdatePost";
import TabsPost from "../TabsPost";
import type { FormDataToUpdate } from "./Schema";

function TabsUpdatePost() {
  const { status, methods, onSubmit } = useUpdatePost();

  console.log(methods.formState.errors);

  return (
    <TabsPost<FormDataToUpdate>
      action="Salvar"
      methods={methods}
      onSubmit={onSubmit}
      status={status}
    />
  );
}

export default TabsUpdatePost;
