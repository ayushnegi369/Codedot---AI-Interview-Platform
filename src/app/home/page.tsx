"use client"

import { useState } from "react";
import Banner from "../../../components/Banner";
import InterviewCard from "../../../components/InterviewCard";
import interviewData from "../../../constants/InterviewDataList";

const DUMMY_PREV_INTERVIEWS = Array(8).fill({
  logo: "/logo.png",
  tag: "Technical",
  title: "Frontend Dev Interview",
  date: "Feb 28, 2025",
  rating: "12/100",
  description: "This interview does not reflect serious interest or engagement from the candidate. Their responses are dismissive, vague, or outright negative…",
  techRequired: [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
  ],
});

export default function Home() {
  const [prevVisible, setPrevVisible] = useState(6);
  const [pickVisible, setPickVisible] = useState(6);

  return (
    <div className="flex flex-col items-center min-h-screen w-full px-4 sm:px-8 md:px-16 py-8 gap-12 bg-transparent">
      <Banner />

      {/* Section 1: Your Previous Interviews */}
      <section className="w-full max-w-7xl">
        <h2 className="text-2xl font-bold text-white mb-6">Your Previous Interviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {DUMMY_PREV_INTERVIEWS.slice(0, prevVisible).map((item, idx) => (
            <InterviewCard key={idx} {...item} />
          ))}
        </div>
        {DUMMY_PREV_INTERVIEWS.length > prevVisible && (
          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-2 rounded-full bg-[#b7aaff] text-[#18181b] font-semibold hover:bg-[#a99be6] transition"
              onClick={() => setPrevVisible((v) => v + 6)}
            >
              Load more
            </button>
          </div>
        )}
      </section>

      {/* Section 2: Pick your interview */}
      <section className="w-full max-w-7xl mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Pick your interview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {interviewData.slice(0, pickVisible).map((item, idx) => (
            <InterviewCard key={idx} {...item} />
          ))}
        </div>
        {interviewData.length > pickVisible && (
          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-2 rounded-full bg-[#b7aaff] text-[#18181b] font-semibold hover:bg-[#a99be6] transition"
              onClick={() => setPickVisible((v) => v + 6)}
            >
              Load more
            </button>
          </div>
        )}
      </section>
    </div>
  );
}