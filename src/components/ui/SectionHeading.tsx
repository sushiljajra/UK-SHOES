import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  align?: "left" | "center" | "split";
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  actionText,
  actionHref = "#",
  onActionClick,
  align = "split",
  className = "",
}) => {
  if (align === "center") {
    return (
      <div className={`text-center max-w-2xl mx-auto mb-10 sm:mb-14 ${className}`}>
        {eyebrow && (
          <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-[#615e58] uppercase block mb-2">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#111111] uppercase leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-[15px] sm:text-[17px] text-[#615e58] mt-3 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4 ${className}`}
    >
      <div>
        {eyebrow && (
          <span className="font-mono text-[11px] font-semibold tracking-[0.25em] text-[#615e58] uppercase block mb-2">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#111111] uppercase leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-[14px] sm:text-[15px] text-[#615e58] mt-1.5">
            {description}
          </p>
        )}
      </div>

      {actionText && (
        <a
          href={actionHref}
          onClick={onActionClick}
          className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-[#111111] hover:text-[#615e58] transition-colors self-start md:self-end group"
        >
          <span>{actionText}</span>
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
            arrow_forward
          </span>
        </a>
      )}
    </div>
  );
};
