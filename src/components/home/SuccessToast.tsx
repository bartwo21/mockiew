"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function SuccessToast({
  success,
  title,
}: {
  success: boolean;
  title: string;
}) {
  useEffect(() => {
    if (success) {
      toast.success(title, {
        position: "top-right",
      });
    }
  }, [success, title]);

  return null;
}
