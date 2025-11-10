"use client";

import React from 'react';

interface SacredGeometryProps {
  size?: number;
  className?: string;
}

export function SacredGeometry({ size = 200, className = "" }: SacredGeometryProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full animate-spin-slow"
        style={{ animationDuration: '20s' }}
      >
        {/* Outer Circle */}
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="url(#purpleGradient)"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Flower of Life Pattern - Central Circle */}
        <circle
          cx="100"
          cy="100"
          r="30"
          fill="none"
          stroke="url(#purpleGradient)"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* Flower of Life - Six Surrounding Circles */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const x = 100 + 30 * Math.cos((angle * Math.PI) / 180);
          const y = 100 + 30 * Math.sin((angle * Math.PI) / 180);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="30"
              fill="none"
              stroke="url(#purpleGradient)"
              strokeWidth="1"
              opacity="0.7"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          );
        })}

        {/* Sacred Triangle */}
        <polygon
          points="100,40 160,140 40,140"
          fill="none"
          stroke="url(#pinkGradient)"
          strokeWidth="1"
          opacity="0.5"
          className="animate-pulse"
        />

        {/* Inner Hexagon */}
        <polygon
          points="100,70 130,85 130,115 100,130 70,115 70,85"
          fill="none"
          stroke="url(#cyanGradient)"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.8">
              <animate attributeName="stop-opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="rgb(168, 85, 247)" stopOpacity="0.8">
              <animate attributeName="stop-opacity" values="0.8;0.6;0.8" dur="3s" repeatCount="indefinite" />
            </stop>
          </linearGradient>

          <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(236, 72, 153)" stopOpacity="0.7">
              <animate attributeName="stop-opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="rgb(244, 114, 182)" stopOpacity="0.7">
              <animate attributeName="stop-opacity" values="0.7;0.5;0.7" dur="4s" repeatCount="indefinite" />
            </stop>
          </linearGradient>

          <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(6, 182, 212)" stopOpacity="0.6">
              <animate attributeName="stop-opacity" values="0.6;0.9;0.6" dur="5s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0.6">
              <animate attributeName="stop-opacity" values="0.6;0.4;0.6" dur="5s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
      </svg>

      {/* Central Star Point */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50" />
      </div>
    </div>
  );
}

// Metatron's Cube variant
export function MetatronsCube({ size = 200, className = "" }: SacredGeometryProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full animate-spin-slow"
        style={{ animationDuration: '30s' }}
      >
        {/* All 13 circles of Metatron's Cube */}
        <g opacity="0.7">
          {/* Center circle */}
          <circle cx="100" cy="100" r="20" fill="none" stroke="url(#metatronGradient)" strokeWidth="1" />

          {/* Inner ring - 6 circles */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const x = 100 + 40 * Math.cos((angle * Math.PI) / 180);
            const y = 100 + 40 * Math.sin((angle * Math.PI) / 180);
            return (
              <circle
                key={`inner-${i}`}
                cx={x}
                cy={y}
                r="20"
                fill="none"
                stroke="url(#metatronGradient)"
                strokeWidth="1"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            );
          })}

          {/* Outer ring - 6 circles */}
          {[30, 90, 150, 210, 270, 330].map((angle, i) => {
            const x = 100 + 70 * Math.cos((angle * Math.PI) / 180);
            const y = 100 + 70 * Math.sin((angle * Math.PI) / 180);
            return (
              <circle
                key={`outer-${i}`}
                cx={x}
                cy={y}
                r="20"
                fill="none"
                stroke="url(#metatronGradient)"
                strokeWidth="1"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.2 + 0.5}s` }}
              />
            );
          })}
        </g>

        {/* Connecting lines */}
        <g opacity="0.3">
          {/* Star pattern connections */}
          {[0, 60, 120, 180, 240, 300].map((angle1, i) => {
            const x1 = 100 + 40 * Math.cos((angle1 * Math.PI) / 180);
            const y1 = 100 + 40 * Math.sin((angle1 * Math.PI) / 180);

            return [120, 240].map(offset => {
              const angle2 = angle1 + offset;
              const x2 = 100 + 40 * Math.cos((angle2 * Math.PI) / 180);
              const y2 = 100 + 40 * Math.sin((angle2 * Math.PI) / 180);

              return (
                <line
                  key={`line-${angle1}-${offset}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="url(#metatronGradient)"
                  strokeWidth="0.5"
                />
              );
            });
          })}
        </g>

        <defs>
          <linearGradient id="metatronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.9" />
            <stop offset="50%" stopColor="rgb(236, 72, 153)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="rgb(34, 211, 238)" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}