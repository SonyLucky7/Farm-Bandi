"use client";

import dynamic from "next/dynamic";

const Interactive3DBanner = dynamic(
  () => import("@/components/home/Interactive3DBanner"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[340px] sm:h-[400px] lg:h-[440px] bg-gradient-to-b from-[#071F16] via-[#0A2B1E] to-[#081B13] animate-pulse" />
    ),
  }
);

export default function Interactive3DWrapper() {
  return <Interactive3DBanner />;
}
