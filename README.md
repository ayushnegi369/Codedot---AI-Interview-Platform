# Resume Analyzer

AI-powered resume analysis and ATS optimization tool. Upload your resume and get instant feedback to improve your job applications.

## Features

- **Resume Analysis**: Upload resume images and get detailed analysis
- **ATS Optimization**: Get ATS scores and improvement tips
- **Job Description Matching**: Compare your resume against specific job descriptions
- **Structured Data Extraction**: Extract profile, skills, experience, education, and more
- **Modern UI**: Beautiful, responsive interface with dark mode support

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The application will automatically redirect you to the resume analyzer page.

## Technology Stack

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Markdown** - Markdown rendering for tips
- **Google Gemini AI** - Resume analysis backend

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── gemini-analyze/     # AI analysis endpoint
│   ├── resume-analyzer/        # Main application
│   └── layout.tsx              # Root layout
├── components/
│   ├── Navbar.tsx              # Navigation
│   └── Footer.tsx              # Footer
└── globals.css                 # Global styles
```

## API Integration

The application uses Google Gemini AI for resume analysis. Make sure to configure your Gemini API key in the environment variables.

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Google Gemini AI](https://ai.google.dev/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
