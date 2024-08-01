"use client";
import Chat from "@/components/Chat";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { replace } = useRouter();
  useEffect(() => {
    replace("/chat");
  }, []);

  return (
    <div>
      {/* <Loader /> */}
      <Link href="/chat">Chat</Link>

      {/* <Chat /> */}
    </div>
  );
}
