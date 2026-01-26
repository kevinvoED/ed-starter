"use client";

import { useEffect, useState } from "react";
import { formatDate, formatDateLong } from "@/lib/utils/date";

export default function PostDate({
  date,
  type = "short",
}: {
  date: string;
  type?: "short" | "long";
}) {
  const [postDate, setPostDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (date) {
      const formattedDate =
        type === "long" ? formatDateLong(date) : formatDate(date);
      setPostDate(formattedDate);
      setIsLoading(false);
    }
  }, [date, type]);

  if (isLoading) {
    return (
      <span className="inline-block animate-pulse">
        <span className="inline-block h-4 w-24 bg-gray-200" />
      </span>
    );
  }

  return <span>{postDate}</span>;
}
