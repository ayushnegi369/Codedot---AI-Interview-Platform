/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";



export default function ResumeAnalyzerPage() {
  const [resumeImage, setResumeImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [tips, setTips] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jobDescription, setJobDescription] = useState<string>("");

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeImage(file);
      setImageUrl(URL.createObjectURL(file));
      setParsedData(null);
      setError(null);
    }
  };

  // Handle analyze button
  const handleAnalyze = async () => {
    if (!resumeImage) return;
    setLoading(true);
    setError(null);
    setParsedData(null);
    setAtsScore(null);
    setTips(null);
    try {
      // 1. Convert image to base64
      const base64 = await fileToBase64(resumeImage);
      // 2. Call Next.js API route for Gemini analysis
      const res = await fetch("/api/gemini-analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ base64, mimeType: resumeImage.type, jobDescription }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to analyze resume.");
      }
      const data = await res.json();
      // Parse Gemini response (extract JSON from text)
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      let parsed;
      let ats = null;
      let tipsVal = null;
      try {
        // Try to extract JSON from the response, even if wrapped in markdown or extra text
        const match = text.match(/\{[\s\S]*\}/);
        if (match) {
          parsed = JSON.parse(match[0]);
          if (parsed.atsScore !== undefined) {
            ats = parsed.atsScore;
            delete parsed.atsScore;
          }
          if (parsed.tips !== undefined) {
            tipsVal = parsed.tips;
            delete parsed.tips;
          }
        } else {
          throw new Error("No JSON found in Gemini response.");
        }
      } catch {
        throw new Error("Could not parse structured data from Gemini response.");
      }
      setParsedData(parsed);
      setAtsScore(ats);
      setTips(tipsVal);
    } catch (err: any) {
      setError(err.message || "An error occurred while analyzing the resume.");
    } finally {
      setLoading(false);
    }
  };

  // Helper: Convert file to base64
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Section renderers (unchanged)
  function renderProfile(profile: any) {
    if (!profile) return null;
    return (
      <div className="mb-2">
        <h2 className="font-semibold text-lg mb-2">Profile</h2>
        {typeof profile === "object" && !Array.isArray(profile) ? (
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">
            {Object.entries(profile).map(([k, v], idx) => (
              <div key={idx} className="mb-1"><span className="font-medium capitalize">{k.replace(/_/g, ' ')}:</span> {String(v)}</div>
            ))}
          </div>
        ) : Array.isArray(profile) ? (
          <div className="flex flex-wrap gap-2">
            {profile.map((v, i) => (
              <span key={i} className="bg-neutral-200 dark:bg-neutral-800 px-3 py-1 rounded-full text-xs">{v}</span>
            ))}
          </div>
        ) : (
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">{String(profile)}</div>
        )}
      </div>
    );
  }

  function renderSkills(skills: any) {
    if (!skills) return null;
    if (Array.isArray(skills)) {
      return (
        <div className="mb-2">
          <h2 className="font-semibold text-lg mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="bg-neutral-200 dark:bg-neutral-800 px-3 py-1 rounded-full text-xs">{s}</span>
            ))}
          </div>
        </div>
      );
    }
    if (typeof skills === "object") {
      return (
        <div className="mb-2">
          <h2 className="font-semibold text-lg mb-2">Skills</h2>
          <div className="flex flex-col gap-2">
            {Object.entries(skills).map(([category, values], idx) => (
              <div key={idx} className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">
                <div className="font-medium capitalize mb-1">{category.replace(/_/g, ' ')}:</div>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(values)
                    ? values.map((v, i) => (
                        <span key={i} className="bg-neutral-200 dark:bg-neutral-700 px-3 py-1 rounded-full text-xs">{v}</span>
                      ))
                    : <span className="bg-neutral-200 dark:bg-neutral-700 px-3 py-1 rounded-full text-xs">{String(values)}</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="mb-2">
        <h2 className="font-semibold text-lg mb-2">Skills</h2>
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">{String(skills)}</div>
      </div>
    );
  }

  function renderSocials(socials: any) {
    if (!socials) return null;
    if (Array.isArray(socials)) {
      return (
        <div className="mb-2">
          <h2 className="font-semibold text-lg mb-2">Social Media</h2>
          <div className="flex flex-wrap gap-2">
            {socials.map((s, i) => (
              <span key={i} className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded text-xs">{s}</span>
            ))}
          </div>
        </div>
      );
    }
    if (typeof socials === "object") {
      return (
        <div className="mb-2">
          <h2 className="font-semibold text-lg mb-2">Social Media</h2>
          <div className="flex flex-col gap-2">
            {Object.entries(socials).map(([category, values], idx) => (
              <div key={idx} className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">
                <div className="font-medium capitalize mb-1">{category.replace(/_/g, ' ')}:</div>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(values)
                    ? values.map((v, i) => (
                        <span key={i} className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded text-xs">{v}</span>
                      ))
                    : <span className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded text-xs">{String(values)}</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return (
      <div className="mb-2">
        <h2 className="font-semibold text-lg mb-2">Social Media</h2>
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">{String(socials)}</div>
      </div>
    );
  }

  function renderProjects(projects: any) {
    if (!projects) return null;
    return (
      <div className="mb-2">
        <h2 className="font-semibold text-lg mb-2">Projects</h2>
        {Array.isArray(projects) ? (
          <div className="flex flex-col gap-3">
            {projects.map((p, i) => (
              typeof p === "string" ? (
                <div key={i} className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">{p}</div>
              ) : (
                <div key={i} className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">
                  {Object.entries(p).map(([k, v], idx) => (
                    <div key={idx} className="mb-1"><span className="font-medium capitalize">{k.replace(/_/g, ' ')}:</span> {String(v)}</div>
                  ))}
                </div>
              )
            ))}
          </div>
        ) : typeof projects === "object" ? (
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">
            {Object.entries(projects).map(([k, v], idx) => (
              <div key={idx} className="mb-1"><span className="font-medium capitalize">{k.replace(/_/g, ' ')}:</span> {String(v)}</div>
            ))}
          </div>
        ) : (
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">{String(projects)}</div>
        )}
      </div>
    );
  }

  function renderExperiences(experiences: any) {
    if (!experiences) return null;
    return (
      <div className="mb-2">
        <h2 className="font-semibold text-lg mb-2">Work Experience</h2>
        {Array.isArray(experiences) ? (
          <div className="flex flex-col gap-3">
            {experiences.map((e, i) => (
              typeof e === "string" ? (
                <div key={i} className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">{e}</div>
              ) : (
                <div key={i} className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">
                  {Object.entries(e).map(([k, v], idx) => (
                    <div key={idx} className="mb-1"><span className="font-medium capitalize">{k.replace(/_/g, ' ')}:</span> {String(v)}</div>
                  ))}
                </div>
              )
            ))}
          </div>
        ) : typeof experiences === "object" ? (
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">
            {Object.entries(experiences).map(([k, v], idx) => (
              <div key={idx} className="mb-1"><span className="font-medium capitalize">{k.replace(/_/g, ' ')}:</span> {String(v)}</div>
            ))}
          </div>
        ) : (
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">{String(experiences)}</div>
        )}
      </div>
    );
  }

  function renderEducation(education: any) {
    if (!education) return null;
    return (
      <div className="mb-2">
        <h2 className="font-semibold text-lg mb-2">Education</h2>
        {Array.isArray(education) ? (
          <div className="flex flex-col gap-3">
            {education.map((e, i) => (
              typeof e === "string" ? (
                <div key={i} className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">{e}</div>
              ) : (
                <div key={i} className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">
                  {Object.entries(e).map(([k, v], idx) => (
                    <div key={idx} className="mb-1"><span className="font-medium capitalize">{k.replace(/_/g, ' ')}:</span> {String(v)}</div>
                  ))}
                </div>
              )
            ))}
          </div>
        ) : typeof education === "object" ? (
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">
            {Object.entries(education).map(([k, v], idx) => (
              <div key={idx} className="mb-1"><span className="font-medium capitalize">{k.replace(/_/g, ' ')}:</span> {String(v)}</div>
            ))}
          </div>
        ) : (
          <div className="bg-neutral-100 dark:bg-neutral-800 rounded p-3 text-sm">{String(education)}</div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start max-w-none px-2 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center tracking-tight">Resume Analyzer</h1>
      {/* Upload & Job Description Card */}
      <div className="w-full max-w-2xl bg-white/80 dark:bg-neutral-900/80 rounded-2xl shadow-xl p-8 flex flex-col items-center gap-6 mb-10 border border-neutral-200 dark:border-neutral-800 backdrop-blur-md">
        {/* Upload Section */}
        <div className="w-full flex flex-col items-center gap-2">
          <span className="text-lg font-semibold mb-2 text-neutral-800 dark:text-neutral-100">1. Upload Resume Image</span>
          <label className="w-full max-w-xs flex flex-col items-center cursor-pointer">
            <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFileChange} />
            <div className="w-40 h-56 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-blue-400 dark:border-blue-700 mb-2 transition-all duration-200">
              {imageUrl ? (
                <Image src={imageUrl} alt="Resume Preview" width={160} height={224} className="object-contain" />
              ) : (
                <span className="text-neutral-400">No image selected</span>
              )}
            </div>
            <span className="text-xs text-neutral-500 mt-1">PNG, JPG, or PDF</span>
          </label>
        </div>
        {/* Job Description Input */}
        <div className="w-full flex flex-col items-center gap-2">
          <span className="text-lg font-semibold mb-2 text-neutral-800 dark:text-neutral-100">2. Paste Job Description</span>
          <textarea
            className="w-full min-h-[100px] max-w-2xl rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical transition-all duration-200"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
          />
        </div>
        {/* Analyze Button */}
        <div className="w-full flex justify-center mt-2">
          <button
            className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition-all duration-200 disabled:opacity-50"
            onClick={handleAnalyze}
            disabled={!resumeImage || loading}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>
        {error && <div className="mt-2 text-red-500 text-sm w-full text-center">{error}</div>}
      </div>
      {/* Divider */}
      <div className="w-full max-w-2xl flex items-center mb-10">
        <div className="flex-1 h-px bg-neutral-300 dark:bg-neutral-800" />
        <span className="mx-4 text-neutral-400 text-sm">Results</span>
        <div className="flex-1 h-px bg-neutral-300 dark:bg-neutral-800" />
      </div>
      {/* ATS Score Display */}
      {atsScore !== null && (
        <div className="w-full max-w-2xl flex justify-center mb-6">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-2xl font-bold rounded-xl shadow-lg px-8 py-6 text-center border-4 border-white/30 dark:border-neutral-900/30 animate-fade-in">
            ATS Score: {atsScore} / 100
          </div>
        </div>
      )}
      {/* Resume Improvement Tips */}
      {tips && (
        <div className="w-full max-w-2xl flex justify-center mb-8">
          <div className="bg-yellow-50 dark:bg-yellow-900/40 border border-yellow-300 dark:border-yellow-700 rounded-xl shadow px-6 py-5 text-yellow-900 dark:text-yellow-100 animate-fade-in">
            <div className="font-bold text-lg mb-2 text-yellow-800 dark:text-yellow-100">Tips to Improve Your Resume for This Job</div>
            <div className="prose prose-sm dark:prose-invert">
              <ReactMarkdown>{tips}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
      {/* No data message if nothing parsed */}
      {!parsedData && (
        <div className="w-full flex justify-center items-center py-12">
          <div className="text-neutral-400 text-center text-lg">No data to display. Upload and analyze a resume image.</div>
        </div>
      )}
      {/* Masonry Grid for Results */}
      {parsedData && (
        <div className="w-full max-w-5xl columns-1 md:columns-2 gap-6 space-y-6 [column-fill:_balance]">
          {/* Resume Image Block (if available) */}
          {imageUrl && (
            <div className="break-inside-avoid bg-white dark:bg-neutral-900 rounded-xl shadow p-6 mb-6 flex flex-col items-center">
              <h2 className="font-semibold text-lg mb-4">Resume Image</h2>
              <Image src={imageUrl} alt="Resume Preview" width={240} height={336} className="object-contain rounded-lg" />
            </div>
          )}
          {/* Profile Block */}
          {parsedData?.profile && (
            <div className="break-inside-avoid bg-white dark:bg-neutral-900 rounded-xl shadow p-6 mb-6">
              {renderProfile(parsedData.profile)}
            </div>
          )}
          {/* Skills Block */}
          {parsedData?.skills && (
            <div className="break-inside-avoid bg-white dark:bg-neutral-900 rounded-xl shadow p-6 mb-6">
              {renderSkills(parsedData.skills)}
            </div>
          )}
          {/* Social Media Block */}
          {parsedData?.socials && (
            <div className="break-inside-avoid bg-white dark:bg-neutral-900 rounded-xl shadow p-6 mb-6">
              {renderSocials(parsedData.socials)}
            </div>
          )}
          {/* Projects Block */}
          {parsedData?.projects && (
            <div className="break-inside-avoid bg-white dark:bg-neutral-900 rounded-xl shadow p-6 mb-6">
              {renderProjects(parsedData.projects)}
            </div>
          )}
          {/* Work Experience Block */}
          {parsedData?.experiences && (
            <div className="break-inside-avoid bg-white dark:bg-neutral-900 rounded-xl shadow p-6 mb-6">
              {renderExperiences(parsedData.experiences)}
            </div>
          )}
          {/* Education Block */}
          {parsedData?.education && (
            <div className="break-inside-avoid bg-white dark:bg-neutral-900 rounded-xl shadow p-6 mb-6">
              {renderEducation(parsedData.education)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
