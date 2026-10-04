"use client";

import React, { useEffect } from "react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeChart = [
    { uk: "6", eu: "39.5", us: "7", cm: "24.5" },
    { uk: "7", eu: "40.5", us: "8", cm: "25.5" },
    { uk: "8", eu: "42", us: "9", cm: "26.5" },
    { uk: "9", eu: "43", us: "10", cm: "27.5" },
    { uk: "10", eu: "44.5", us: "11", cm: "28.5" },
    { uk: "11", eu: "46", us: "12", cm: "29.5" },
    { uk: "12", eu: "47.5", us: "13", cm: "30.5" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-[#faf9f5] border border-[#000000] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-4 mb-6">
          <div>
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#615e58] uppercase block mb-1">
              FITTING SPECIFICATION
            </span>
            <h3
              id="size-guide-title"
              className="text-xl sm:text-2xl font-normal tracking-tight text-[#000000] uppercase font-mono"
            >
              UK Footwear Size Matrix
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            className="p-1 text-[#615e58] hover:text-[#000000] transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Content & Table */}
        <p className="text-[14px] text-[#615e58] leading-relaxed mb-6">
          Our footwear is engineered to true UK sizing standards. If you normally
          wear half sizes or have a broader forefoot, we recommend sizing up to
          the nearest full size for optimal stride comfort.
        </p>

        <div className="overflow-x-auto border border-[#e5e2e1] mb-6">
          <table className="w-full text-left font-mono text-[12px]">
            <thead className="bg-[#f5f4f0] border-b border-[#e5e2e1] text-[#000000]">
              <tr>
                <th className="py-2.5 px-4 font-semibold">UK (Standard)</th>
                <th className="py-2.5 px-4 font-semibold">EU</th>
                <th className="py-2.5 px-4 font-semibold">US Men</th>
                <th className="py-2.5 px-4 font-semibold">Foot Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e2e1] bg-[#ffffff]">
              {sizeChart.map((row) => (
                <tr key={row.uk} className="hover:bg-[#faf9f5] transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-[#000000]">
                    UK {row.uk}
                  </td>
                  <td className="py-2.5 px-4 text-[#615e58]">{row.eu}</td>
                  <td className="py-2.5 px-4 text-[#615e58]">{row.us}</td>
                  <td className="py-2.5 px-4 text-[#615e58]">{row.cm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#f5f4f0] p-4 border border-[#e5e2e1] space-y-1">
          <span className="font-mono text-[11px] font-semibold text-[#000000] uppercase block">
            Measurement Tip
          </span>
          <p className="text-[13px] text-[#615e58]">
            Measure from heel to the tip of your longest toe while standing upright
            on a flat sheet of paper.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#000000] text-[#ffffff] font-mono text-[11px] uppercase tracking-widest hover:bg-[#2a2a2a] transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
