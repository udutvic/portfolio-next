"use client";

import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/BentoGrid";
import IconCloud from "./IconCloud";
import { Globe } from "./ui/Globe"
import { TextGenerateEffect } from "./ui/TextGenerateEffect";


const slugs = [
  "appwrite",
  "css3",
  "expo",
  "figma",
  "freecodecamp",
  "git",
  "github",
  "hostinger",
  "html5",
  "javascript",
  "netlify",
  "nextdotjs",
  "nodedotjs",
  "npm",
  "react",
  "tailwindcss",
  "typescript",
  "vercel",
  "vite",
];

export function IconCloudDemo() {
  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      <IconCloud iconSlugs={slugs} />
    </div>
  );
}

export function Grid() {
  return (
    <BentoGrid>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}

const Skeleton: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="flex flex-1 w-full h-full min-h-[10rem] rounded-xl">
    {children}
  </div>
);
const items = [
  {
    title: "The Power of Communication",
    description:
      "I prioritize client collaboration, fostering open communication ",
    header: <Skeleton />,
  },
  {
    title: "The Joy of Creation",
    description: "Tech enthusiast with a passion for development.",
    header: <Skeleton>
      <TextGenerateEffect
      words={`import React from "react";\n export function IconCloudDemo() {\n  return (\n    <div className="relative flex items-center justify-center overflow-hidden">\n      <IconCloud iconSlugs={slugs} />\n    </div>\n  );\n}\n`}
    />
    </Skeleton>,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "I constantly try to improve",
    header: (
      <Skeleton>
        <IconCloudDemo />
      </Skeleton>
    ),
  },
  {
    title: "The Spirit of Adventure",
    description: "I'm very flexible with time zone communications",
    header: (
      <Skeleton>   
        <Globe/>
      </Skeleton>
    ),
  },
  {
    title: "The Art of Design",
    description: "Currently building a JS Animation library",
    header: <Skeleton />,
  },
];
