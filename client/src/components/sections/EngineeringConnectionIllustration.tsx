import React from "react";
import { motion } from "motion/react";

export function EngineeringConnectionIllustration() {
  return (
    <div className="relative w-full max-w-[640px] mx-auto aspect-[16/7] flex items-center justify-center select-none pointer-events-none">
      <svg
        viewBox="0 0 640 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle Glow Filters */}
          <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Radial Gradient for Connection Node */}
          <radialGradient id="centralGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>

          {/* Flowing Line Gradient */}
          <linearGradient id="lineGradLeft" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#2563EB" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="lineGradRight" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.2" />
            <stop offset="70%" stopColor="#2563EB" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Atmospheric Cloud / Illumination Backing */}
        <ellipse cx="320" cy="140" rx="220" ry="85" fill="url(#centralGlow)" opacity="0.35" />

        {/* LEFT SYSTEM: Architecture Tree & Bus */}
        <g className="left-system" stroke="#1E293B" strokeWidth="1.5">
          {/* Main Left Endpoint Hub */}
          <rect x="40" y="115" width="50" height="50" rx="14" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
          <circle cx="65" cy="140" r="12" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
          <circle cx="65" cy="140" r="4" fill="#1D4ED8" />

          {/* Left Bus Lines */}
          <path d="M90 140 H160" stroke="url(#lineGradLeft)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M160 140 C200 140, 230 110, 275 132" stroke="url(#lineGradLeft)" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M160 140 C200 140, 230 170, 275 148" stroke="url(#lineGradLeft)" strokeWidth="2" strokeDasharray="4 4" />

          {/* Satellite Left Sub-nodes */}
          <circle cx="160" cy="140" r="4" fill="#3B82F6" />
          <circle cx="210" cy="120" r="3" fill="#60A5FA" />
          <circle cx="210" cy="160" r="3" fill="#60A5FA" />
        </g>

        {/* RIGHT SYSTEM: Architecture Tree & Bus */}
        <g className="right-system" stroke="#1E293B" strokeWidth="1.5">
          {/* Main Right Endpoint Hub */}
          <rect x="550" y="115" width="50" height="50" rx="14" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
          <circle cx="575" cy="140" r="12" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" />
          <circle cx="575" cy="140" r="4" fill="#1D4ED8" />

          {/* Right Bus Lines */}
          <path d="M550 140 H480" stroke="url(#lineGradRight)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M480 140 C440 140, 410 110, 365 132" stroke="url(#lineGradRight)" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M480 140 C440 140, 410 170, 365 148" stroke="url(#lineGradRight)" strokeWidth="2" strokeDasharray="4 4" />

          {/* Satellite Right Sub-nodes */}
          <circle cx="480" cy="140" r="4" fill="#3B82F6" />
          <circle cx="430" cy="120" r="3" fill="#60A5FA" />
          <circle cx="430" cy="160" r="3" fill="#60A5FA" />
        </g>

        {/* CENTRAL SYNCHRONIZATION POINT: The Joint Node (Collaboration point) */}
        <g className="central-nexus">
          {/* Converging Curved Bridge Lines */}
          <path
            d="M275 140 Q300 140 320 140"
            stroke="#2563EB"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M365 140 Q340 140 320 140"
            stroke="#2563EB"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Pulsing Concentric Radar Rings */}
          <motion.circle
            cx="320"
            cy="140"
            r="38"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="1.2"
            opacity="0.25"
            animate={{ r: [30, 46, 30], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.circle
            cx="320"
            cy="140"
            r="24"
            fill="none"
            stroke="#2563EB"
            strokeWidth="1.5"
            opacity="0.5"
            animate={{ r: [20, 28, 20], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Core Collaboration Focal Point */}
          <circle
            cx="320"
            cy="140"
            r="11"
            fill="#2563EB"
            filter="url(#nodeGlow)"
          />
          <circle cx="320" cy="140" r="5" fill="#FFFFFF" />
        </g>

        {/* Flowing Subtle Data Packets along Lines */}
        <motion.circle
          r="2.5"
          fill="#60A5FA"
          animate={{
            cx: [90, 320],
            cy: [140, 140],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          r="2.5"
          fill="#60A5FA"
          animate={{
            cx: [550, 320],
            cy: [140, 140],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.25 }}
        />
      </svg>
    </div>
  );
}
