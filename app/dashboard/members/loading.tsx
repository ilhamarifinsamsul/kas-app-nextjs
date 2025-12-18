import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <span className="ml-3 text-sm text-muted-foreground">Loading...</span>
    </div>
  );
}
