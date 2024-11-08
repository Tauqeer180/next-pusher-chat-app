"use client";
import Chat from "@/components/Chat";
// import { useParams, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React from "react";

export default function page({ params }) {
  const { slug } = params;
  // console.log("Params ", slug);
  return (
    <div>
      <Chat slug={slug} />
    </div>
  );
}
