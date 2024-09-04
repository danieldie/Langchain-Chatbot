"use client";

import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/message";
import { Send } from "react-feather";
import LoadingDots from "@/components/LoadingDots";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Dropdown from "@/components/Dropdown";
import AdSense from "@/components/AdSense";

export default function Home() {

  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    router.push("/auth/signin");
  }

  const dropdownOptions = [
    {
      label: "Profile",
      itemClick: ()=> {
        router.push("/auth/profile");
      }
    },
    {
      label: "SignOut",
      itemClick: ()=>{
        signOut({ redirect: false }).then(() => {
          router.push("/auth/signin");
        });
      }
    }
  ]

  const [message, setMessage] = useState<string>("");
  const [history, setHistory] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! Ask me any question you have regarding the Bible.",
    },
  ]);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    if (message === "") return;
    const newMessage = { role: "user", content: message };
    setHistory((oldHistory:any) => [...oldHistory, newMessage]);
    setMessage("");
    setLoading(true);

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: message, history: [...history, newMessage] }),
    })
      .then(async (res) => {
        const r = await res.json();
        setHistory((oldHistory) => [...oldHistory, r]);
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
        setLoading(false);
      });
  };

  const formatPageName = (url: string) => {
    const pageName = url.split("/").pop();
    if (pageName) {
      const formattedName = pageName.split("-").join(" ");
      return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
    }
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  return (
    <main className="h-screen bg-white p-6 flex flex-col">
      <div className="flex flex-col gap-8 w-full items-center flex-grow max-h-full">
        <div className="flex lg:w-3/4">
          <h1 className="flex w-full justify-center text-4xl text-transparent font-extralight bg-clip-text bg-gradient-to-r from-violet-800 to-fuchsia-500">
            Bible Chat
          </h1>
          <Dropdown label={session?.user?.name ?? "Not Signed"} options={dropdownOptions}/>
        </div>
        <form
          className="rounded-2xl border-purple-700 border-opacity-5 border lg:w-3/4 flex-grow flex flex-col bg-[url('/images/bg.png')] bg-cover max-h-full overflow-clip"
          onSubmit={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          <div className="overflow-y-scroll flex flex-col gap-5 p-10 h-full">
            {history.map((message: Message, idx) => {
              const isLastMessage = idx === history.length - 1;
              switch (message.role) {
                case "assistant":
                  return (
                    <div
                      ref={isLastMessage ? lastMessageRef : null}
                      key={idx}
                      className="flex gap-2"
                    >
                      <img
                        src="/images/bible.jpg"
                        className="h-12 w-12 rounded-full"
                        alt="Bible"
                      />
                      <div className="w-auto max-w-xl break-words bg-white rounded-b-xl rounded-tr-xl text-black p-6 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]">
                        <p className="text-sm font-medium text-violet-500 mb-2">
                          Bible AI
                        </p>
                        {message.content}
                        {
                          message.links && message.links.length > 0 && (
                            <div className="mt-4 flex flex-col gap-2">
                              <p className="text-sm font-medium text-slate-500">
                                Sources:
                              </p>
                              {message.links.map((link) => (
                                <a
                                  href={link}
                                  key={link}
                                  className="block w-fit px-2 py-1 text-sm text-violet-700 bg-violet-100 rounded"
                                >
                                  {formatPageName(link)}
                                </a>
                              ))}
                            </div>
                          )
                        }
                        {
                          message.verseContents && message.verseContents.length > 0 && (
                            <div className="mt-4 flex flex-col gap-2">
                              <p className="text-sm font-medium text-slate-500">
                                Verse:
                              </p>
                                {message.verseContents.map((verseContent) =>
                                  <p>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: verseContent.replace(/\n/g, '<br />'),
                                      }}
                                    /><br/>
                                  </p>
                                )}
                            </div>
                          )
                        }
                      </div>
                    </div>
                  );
                case "user":
                  return (
                    <div
                      className="w-auto max-w-xl break-words bg-white rounded-b-xl rounded-tl-xl text-black p-6 self-end shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
                      key={idx}
                      ref={isLastMessage ? lastMessageRef : null}
                    >
                      <p className="text-sm font-medium text-violet-500 mb-2">
                        You
                      </p>
                      {message.content}
                    </div>
                  );
                default:
                  return null;
              }
            })}
            {loading && (
              <div ref={lastMessageRef} className="flex gap-2">
                <img
                  src="/images/bible.png"
                  className="h-12 w-12 rounded-full"
                  alt="Bible"
                />
                <div className="w-auto max-w-xl break-words bg-white rounded-b-xl rounded-tr-xl text-black p-6 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]">
                  <p className="text-sm font-medium text-violet-500 mb-4">
                    Bible AI
                  </p>
                  <LoadingDots />
                </div>
              </div>
            )}
          </div>

          {/* input area */}
          <div className="flex sticky bottom-0 w-full px-6 pb-6 h-24">
            <div className="w-full relative">
              <textarea
                aria-label="chat input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="w-full h-full resize-none rounded-full border border-slate-900/10 bg-white pl-6 pr-24 py-[25px] text-base placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleClick();
                  }
                }}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleClick();
                }}
                className="flex w-14 h-14 items-center justify-center rounded-full px-3 text-sm bg-violet-600 font-semibold text-white hover:bg-violet-700 active:bg-violet-800 absolute right-2 bottom-2 disabled:bg-violet-100 disabled:text-violet-400"
                type="submit"
                aria-label="Send"
                disabled={!message || loading}
              >
                <Send />
              </button>
            </div>
          </div>
        </form>
      </div>
      <AdSense
        data-ad-slot={process.env.GOOGLE_ADS_SLOT ?? ""}
        data-full-width-responsive="true"
        data-ad-format="fluid"
      />
    </main>
  );
}
