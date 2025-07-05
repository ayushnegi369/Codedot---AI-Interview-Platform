import React from "react";
import Image from "next/image";

type InterviewCardProps = {
  logo: string;
  tag: string;
  title: string;
  date: string;
  rating: string;
  description: string;
  techRequired: string[];
};

export default function InterviewCard({
  logo = "/logo.png",
  tag = "Technical",
  title = "Frontend Dev Interview",
  date = "Feb 28, 2025",
  rating = "12/100",
  description = "This interview does not reflect serious interest or engagement from the candidate. Their responses are dismissive, vague, or outright negative…",
  techRequired = [
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
  ],
}: InterviewCardProps) {
  return (
    <div className="bg-[#101014] rounded-2xl shadow-lg p-6 w-full max-w-xs relative flex flex-col gap-4 border border-[#23232a]">
      {/* Tag */}
      <div className="absolute top-0 right-0 m-4">
        <span className="bg-[#23232a] text-[#b7aaff] text-xs font-semibold px-3 py-1 rounded-lg">{tag}</span>
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#7c3aed] mx-auto mt-2 mb-2">
        <Image src={logo} alt="Company Logo" width={36} height={36} />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-white text-center">{title}</h2>

      {/* Date & Rating */}
      <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.75l-6.172 3.245 1.179-6.873L2 9.505l6.908-1.004L12 2.75l3.092 5.751L22 9.505l-5.007 4.617 1.179 6.873z" />
          </svg>
          <span>{rating}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm line-clamp-2">
        {description}
      </p>

      {/* Tech Icons and Button Row */}
      <div className="flex items-center justify-between mt-2 gap-2">
        <div className="flex items-center">
          {techRequired.map((tech, idx) => (
            <Image
              key={idx}
              src={tech}
              alt={`Tech ${idx + 1}`}
              width={24}
              height={24}
              className={idx !== 0 ? "ml-2 z-20" : "z-10"}
            />
          ))}
        </div>
        <button className="py-2 px-4 rounded-full bg-[#b7aaff] text-[#18181b] font-semibold hover:bg-[#a99be6] transition whitespace-nowrap">
          View interview
        </button>
      </div>
    </div>
  );
}
