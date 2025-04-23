import React from "react";

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" role="status">
        <span className="sr-only">Chargement...</span>
      </div>
      <span className="ml-2">Chargement...</span>
    </div>
  );
}
