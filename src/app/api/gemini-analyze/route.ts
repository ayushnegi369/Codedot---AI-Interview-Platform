import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { base64, mimeType, jobDescription } = await req.json();
    if (!base64 || !mimeType) {
      return NextResponse.json({ error: "Missing base64 or mimeType" }, { status: 400 });
    }
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });
    }
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    // Step 1: Extract resume details
    const extractPrompt = `Extract the following sections from this resume image: Profile (Name, Email, Phone, Location, Link, Summary), Skills, Social Media, Projects, Work Experience, Education. Return the result as a JSON object with keys: profile, skills, socials, projects, experiences, education.`;
    const extractBody = {
      contents: [
        { parts: [
          { text: extractPrompt },
          { inlineData: { mimeType, data: base64.split(",")[1] } }
        ] }
      ]
    };
    const geminiRes = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(extractBody),
    });
    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      console.error("Gemini API error:", errorText);
      return NextResponse.json({ error: "Gemini API error", details: errorText }, { status: 500 });
    }
    const data = await geminiRes.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    let parsed;
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error("No JSON found in Gemini response.");
      }
    } catch {
      return NextResponse.json({ error: "Could not parse structured data from Gemini response." }, { status: 500 });
    }
    // Step 2: If jobDescription is provided, get ATS score and tips
    let atsScore = null;
    let tips = null;
    if (jobDescription && typeof jobDescription === "string" && jobDescription.trim().length > 0) {
      // ATS Score
      const comparePrompt = `Given the following resume data (in JSON) and job description, act as an ATS (Applicant Tracking System) and score the resume's match to the job description from 0 to 100. Only return a JSON object: {\"atsScore\": number}.\nResume Data: ${JSON.stringify(parsed)}\nJob Description: ${jobDescription}`;
      const compareBody = {
        contents: [
          { parts: [ { text: comparePrompt } ] }
        ]
      };
      const atsRes = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(compareBody),
      });
      if (atsRes.ok) {
        const atsData = await atsRes.json();
        const atsText = atsData.candidates?.[0]?.content?.parts?.[0]?.text || "";
        try {
          const match = atsText.match(/\{[\s\S]*\}/);
          if (match) {
            const atsObj = JSON.parse(match[0]);
            if (typeof atsObj.atsScore === "number") {
              atsScore = atsObj.atsScore;
            }
          }
        } catch {}
      }
      // Resume Improvement Tips
      const tipsPrompt = `Given the following resume data (in JSON) and job description, act as a career coach and provide actionable, concise tips (in bullet points) to improve the resume for this job. Only return the tips as plain text, no explanations.\nResume Data: ${JSON.stringify(parsed)}\nJob Description: ${jobDescription}`;
      const tipsBody = {
        contents: [
          { parts: [ { text: tipsPrompt } ] }
        ]
      };
      const tipsRes = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tipsBody),
      });
      if (tipsRes.ok) {
        const tipsData = await tipsRes.json();
        tips = tipsData.candidates?.[0]?.content?.parts?.[0]?.text || null;
      }
    }
    // Return both parsed data, atsScore, and tips in a single response
    return NextResponse.json({
      candidates: [
        {
          content: {
            parts: [
              { text: JSON.stringify({ ...parsed, atsScore, tips }) }
            ]
          }
        }
      ]
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
} 