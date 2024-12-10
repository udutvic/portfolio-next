import React from "react";

const MagicButton = ({
  title,
  icon,
  position,
  // handleClick,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
}) => {
  return (
    <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md bg-[linear-gradient(110deg,#020e2a,45%,#1e2631,55%,#020e2a)] bg-[length:200%_100%] px-7 font-medium md:w-60 md:mt-10text-slate-400 transition-colors focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 gap-2 z-10">
      {position === "left" && icon}
      {title}
      {position === "right" && icon}
    </button>
  );
};

export default MagicButton;
