"use client";
import React from "react";
import UsersList from "./UsersList";
import { useEffect, useState } from "react";
// import io from "socket.io-client";
import { useAuth } from "@/Providers/AuthContext";
import { pusherClient } from "@/lib/pusher";
import { getChannelKey } from "@/utils";

// let socket;

export default function Chat({ slug }) {
  // const { slug } = params;
  // console.log("chat Params ", slug);
  const { token, user } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({ name: "", _id: "" });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  //   useEffect(() => {
  //     socket = io();

  //     socket.on("message", (msg) => {
  //       if (msg.from === selectedUser?._id || msg.to === selectedUser?._id) {
  //         setMessages((prevMessages) => [...prevMessages, msg]);
  //       }
  //     });

  //     return () => {
  //       socket.off("message");
  //     };
  //   }, [selectedUser]);
  useEffect(() => {
    // socket = io();

    // socket.on("get-message", (msg) => {
    //   setMessages((prevMessages) => [...prevMessages, msg]);
    // });
    // if (selectedUser?._id) {
    const fetchMessages = async () => {
      await fetch(`/api/messages/get?userId=${slug[0]}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Barear ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setMessages(data?.data));
    };

    let channelId;
    const subscribeToChannel = async () => {
      channelId = await getChannelKey(user?._id, slug[0]);
      console.log("channel Id ", channelId);
      pusherClient.subscribe("channelId");
      // pusherClient.subscribe("chat");

      // 3
      pusherClient.bind("send-message", (data) => {
        console.log("Data from Pusher ", data);
        setMessages((prev) => [...prev, data]);
        setMessage("");
      });
    };
    if (slug) {
      fetchMessages();
      subscribeToChannel();
    }
    return () => channelId && pusherClient.unsubscribe("channelId");
    // return () => socket.disconnect();
  }, [slug]);

  console.log("Messages from screen ", messages);
  const sendMessage = async () => {
    if (message && slug) {
      const msg = { to: slug[0], message };

      const res = await fetch("/api/messages/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Barear ${token}`,
        },
        body: JSON.stringify(msg),
      });
      const data = await res.json();
      console.log("send Res ", data);
      //   socket.emit('message', data);
      //   setMessage('');

      // socket.emit("send-message", msg);
      // setMessages((prevMessages) => [...prevMessages, msg]);
      setMessage("");
    } else {
      console.log("no user Selected");
    }
  };
  return (
    <div className="flex max-w-xl  mx-auto h-[634px] max-h-[80vh] my-5">
      <UsersList
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <div className="w-full">
        <div className="flex flex-col h-full">
          <div
            // style="box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);"
            class="fixed- h-full flex-1 mx-auto bottom-[calc(4rem+1.5rem)] right-0 bg-white p-6 rounded-lg border border-[#e5e7eb] w-full "
          >
            {/* <!-- Heading --> */}
            <div className="h-full">
              <div class="flex flex-col space-y-1.5 pb-6">
                <h2 class="font-semibold text-lg tracking-tight">Chatbot</h2>
                <hr />
              </div>

              {/* <!-- Chat Container --> */}
              <div
                class="pr-4  overflow-y-auto pb-4 h-full"
                //  style="min-width: 100%; display: table;"
              >
                {/* <!-- Chat Message AI --> */}

                {messages?.map((d, i) => {
                  return (
                    <div
                      key={i}
                      class="flex gap-3 my-4 text-gray-600 text-sm flex-1"
                    >
                      <span class="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                        <div class="rounded-full bg-gray-100 border p-1">
                          <svg
                            stroke="none"
                            fill="black"
                            stroke-width="1.5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            height="20"
                            width="20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                            ></path>
                          </svg>
                        </div>
                      </span>
                      <p class="leading-relaxed">
                        <span class="block font-bold text-gray-700 capitalize">
                          {d?.from?.fName || d?.fromName}
                        </span>
                        {d?.message}
                      </p>
                    </div>
                  );
                })}
                {/* <!--  User Chat Message --> */}
              </div>
              {/* <!-- Input box  --> */}
            </div>
          </div>
          <div class="flex items-center pt-0">
            <form
              class="flex items-center justify-center w-full space-x-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                class=" h-10 flex-1 rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => console.log("keyDown ", e)}
                onKeyDownCapture={(e) => console.log("keydown capture ", e)}
              />
              <button
                type="button"
                onClick={sendMessage}
                class="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
