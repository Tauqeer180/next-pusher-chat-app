import React from "react";

export default function Loader() {
  return (
    <div className="fixed bg-black bg-opacity-60 z-[999] top-0 bottom-0 left-0 w-full">
      <div className="w-full h-full flex items-center justify-center">
        <div class="loader">
          <span></span>
        </div>
      </div>
    </div>
  );
}
