"use client";
import { useAuth } from "@/Providers/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

export default function UsersList({ selectedUser, setSelectedUser }) {
  let { token } = useAuth();
  const fetchData = async () => {
    const res = await fetch(`/api/auth/getlist`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Barear ${token}`,
      },
    });
    const data = await res.json();
    return data;
  };
  // useQuery()
  const { isLoading, error, data } = useQuery({
    queryKey: ["chatUsers"],
    queryFn: fetchData,
  });
  //   console.log("Data ", data);
  return (
    <div className="max-w-60 flex flex-col divide-y  bg-slate-700">
      <p className="px-1 text-white font-medium">All Users</p>
      {isLoading ? "Loading . . . " :data?.data?.map((d, i) => {
        return (
          <Link
            key={i}
            href={`/chat/${d?._id}`}
            className="text-white px-4 py-2 capitalize text-xs cursor-pointer"
           
          >
            <p>{d?.fName + " " + d?.lName}</p>
          </Link>
        );
      })}
    </div>
  );
}
