"use client";
import React from "react";
import VideoPlayer from "@/components/VideoPlayer";
import ItemLayout from "./ItemLayout";
import { useT } from "@/components/LanguageContext";
import {
  Zap,
  Bot,
  Compass,
  Globe,
  Paintbrush,
  Link2,
  Brain,
  Rocket,
  MessageSquare,
} from "lucide-react";

const AboutDetails = () => {
  const t = useT().about;
  const currentlyIcons = [
    <Zap key="zap" className="w-4 h-4 shrink-0 text-accent mt-0.5" strokeWidth={1.5} />,
    <Bot key="bot" className="w-4 h-4 shrink-0 text-accent mt-0.5" strokeWidth={1.5} />,
    <Compass key="compass" className="w-4 h-4 shrink-0 text-accent mt-0.5" strokeWidth={1.5} />,
    <Globe key="globe" className="w-4 h-4 shrink-0 text-accent mt-0.5" strokeWidth={1.5} />,
  ];
  const teamIcons = [
    <Paintbrush key="paintbrush" className="w-4 h-4 shrink-0 text-accent mt-0.5" strokeWidth={1.5} />,
    <Link2 key="link2" className="w-4 h-4 shrink-0 text-accent mt-0.5" strokeWidth={1.5} />,
    <Brain key="brain" className="w-4 h-4 shrink-0 text-accent mt-0.5" strokeWidth={1.5} />,
    <Rocket key="rocket" className="w-4 h-4 shrink-0 text-accent mt-0.5" strokeWidth={1.5} />,
    <MessageSquare key="msg" className="w-4 h-4 shrink-0 text-accent mt-0.5" strokeWidth={1.5} />,
  ];
  return (
    <section className="py-20 w-full relative z-[10]">
      <div className="grid grid-cols-12 gap-4 xs:gap-6  md:gap-8 w-full">
        <ItemLayout
          className={
            " col-span-full lg:col-span-8 row-span-2 flex-col items-start"
          }
        >
          <h2 id="about-section-title" className="  text-xl md:text-2xl text-left w-full capitalize">
            {t.architectTitle}
          </h2>
          <p className="font-light  text-xs sm:text-sm md:text-base   ">
            <span className="sm:hidden">{t.architectBodyShort}</span>
            <span className="hidden sm:inline">{t.architectBody}</span>
          </p>
        </ItemLayout>

        <ItemLayout
          className={" col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            25+ <sub className="font-semibold text-base">clients</sub>
          </p>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full xs:col-span-6 lg:col-span-4 text-accent"}
        >
          <p className="font-semibold w-full text-left text-2xl sm:text-5xl">
            4+{" "}
            <sub className="font-semibold text-base">{t.yearsExp}</sub>
          </p>
        </ItemLayout>

        <ItemLayout
          className={"col-span-full sm:col-span-6 md:col-span-4 flex-col items-start"}
        >
          <h2 className="text-xl md:text-2xl text-left w-full capitalize">
            {t.mostUsedLangs}
          </h2>
          <ul className="w-full space-y-2 mt-2">
            {[
              { lang: "JavaScript", pct: 35 },
              { lang: "TypeScript", pct: 25 },
              { lang: "Python",     pct: 20 },
              { lang: "Rust",       pct: 15 },
              { lang: "SQL",        pct: 5  },
            ].map(({ lang, pct }) => (
              <li key={lang} className="w-full">
                <div className="flex justify-between text-xs sm:text-sm mb-1">
                  <span>{lang}</span>
                  <span className="text-accent">{pct}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-8 flex-col items-start"}>
          <h2 className="text-xl md:text-2xl text-left w-full capitalize mb-4">
            {t.whatIBuild}
          </h2>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
            {t.buildAreas.map(({ area, tags, desc, descShort }) => (
              <div key={area} className="flex flex-col gap-2">
                <h3 className="font-semibold text-accent text-sm sm:text-base">{area}</h3>
                <p className="font-light text-xs sm:text-sm leading-relaxed">
                  <span className="sm:hidden">{descShort ?? desc}</span>
                  <span className="hidden sm:inline">{desc}</span>
                </p>
                <div className="flex flex-wrap gap-1 mt-auto pt-2">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full border border-accent/40 text-accent/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ItemLayout>

        <ItemLayout className={"col-span-full flex-col items-start"}>
          <h2 className="text-xl md:text-2xl text-left w-full capitalize mb-4">
            {t.techStack}
          </h2>
          <img
            className="w-full h-auto"
            src={`https://skillicons.dev/icons?i=js,ts,react,nextjs,threejs,p5js,nodejs,py,rust,electron,pytorch,tensorflow,sklearn,mongodb,postgres,supabase,docker,git,github,graphql,tailwind,css,html,figma,vercel,netlify,vite,vscode`}
            alt="Tech stack icons"
            loading="lazy"
            decoding="async"
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {["Tauri v2", "Ollama", "LangChain", "LangGraph", "p5.js", "Puter"].map((label) => (
              <span key={label} className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border border-accent/30 text-accent/80 bg-accent/5">
                <span className="w-2 h-2 rounded-full bg-accent/60 inline-block" />
                {label}
              </span>
            ))}
          </div>
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-6 flex-col items-start"}>
          <h2 className="text-xl md:text-2xl text-left w-full capitalize mb-4">
            {t.currently}
          </h2>
          <ul className="w-full space-y-3 font-light text-xs sm:text-sm">
            {t.currentlyItems.map(({ label, value }, i) => (
              <li key={label} className="flex items-start gap-3">
                {currentlyIcons[i]}
                <span>
                  <span className="text-accent font-medium">{label}: </span>
                  {value}
                </span>
              </li>
            ))}
          </ul>
        </ItemLayout>

        <ItemLayout className={"col-span-full md:col-span-6 flex-col items-start"}>
          <h2 className="text-xl md:text-2xl text-left w-full capitalize mb-4">
            {t.teamTitle}
          </h2>
          <ul className="w-full space-y-3 font-light text-xs sm:text-sm">
            {t.teamItems.map((value, i) => (
              <li key={i} className="flex items-start gap-3">
                {teamIcons[i]}
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </ItemLayout>

        <ItemLayout className={"col-span-full flex-col items-start"}>
          <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8 md:items-center">
            <div className="flex flex-col gap-3 md:w-2/5 shrink-0">
              <h2 className="text-xl md:text-2xl text-left w-full capitalize">
                {t.creativeTitle}
              </h2>
              <p className="font-light text-xs sm:text-sm md:text-base leading-relaxed">
                <span className="sm:hidden">{t.creativeBodyShort}</span>
                <span className="hidden sm:inline">{t.creativeBody}</span>
              </p>
              <p className="text-accent font-medium text-xs sm:text-sm md:text-base">
                {t.creativeTagline}
              </p>
            </div>
            <div className="w-full md:flex-1 rounded-lg overflow-hidden border border-white/10">
              <VideoPlayer
                src="/video/video.mp4"
                className="w-full h-auto block pointer-events-none"
              />
            </div>
          </div>
        </ItemLayout>
      </div>
    </section>
  );
};

export default AboutDetails;
