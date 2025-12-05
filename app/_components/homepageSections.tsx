"use client";

import { TypeIcon as type, type LucideIcon, Globe, Smartphone, Code2, Palette, HardDrive } from 'lucide-react';
import { motion } from "motion/react";

interface ServiceCardProps {
  iconType: "web" | "mobile" | "backend" | "palette" | "cms";
  title: string;
  description: string;
}

const iconMap: Record<ServiceCardProps["iconType"], LucideIcon> = {
  web: Globe,
  mobile: Smartphone,
  backend: Code2,
  palette: Palette,
  cms: HardDrive,
};

export function ServiceCard({
  iconType,
  title,
  description,
}: ServiceCardProps) {
  const Icon = iconMap[iconType];

  return (
    <motion.div
      className="group relative p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/40"
      whileHover={{ 
        y: -4,
        transition: { 
          duration: 0.3,
          ease: [0.2, 0, 0, 1]
        }
      }}
    >
      <div className="flex flex-col items-start space-y-4">
        <div className="p-3 rounded-xl bg-white/80 shadow-sm">
          <Icon className="w-5 h-5 text-gray-900" strokeWidth={1.5} />
        </div>
        <h3 className="text-base font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        <p className="text-sm text-muted-foreground mt-1">{getEvidence(title)}</p>
      </div>
    </motion.div>
  );
}

function getEvidence(title: string) {
  switch (title) {
    case "Web Development":
      return "Next.js 14 App Router, ISR, image optimization; Lighthouse 95+.";
    case "iOS Development":
      return "Swift 5+, SwiftUI, App Store releases and TestFlight distribution.";
    case "Backend Solutions":
      return "Golang microservices, REST/GraphQL APIs, containerized with Docker.";
    case "UI/UX Design":
      return "Figma-driven workflows, high-fidelity prototypes and accessibility reviews.";
    case "CMS Development":
      return "Sanity and static generation integrations for fast content editing.";
    default:
      return "Proven experience shipping production apps and websites.";
  }
}

