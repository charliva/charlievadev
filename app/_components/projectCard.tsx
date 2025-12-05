"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from 'lucide-react';
import { useCursor } from "./cursorContext";

interface ProjectCardProps {
  title: string;
  description: string;
  imagePath: string;
  projectUrl: string;
  sizes?: string;
}

export function ProjectCard({
  title,
  description,
  imagePath,
  projectUrl,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
}: ProjectCardProps) {
  const { setIsHovering } = useCursor();

  return (
    <Link href={projectUrl} className="group">
      <motion.article
        className="relative rounded-2xl overflow-hidden bg-white/60 backdrop-blur-sm border border-white/40 cursor-pointer"
        whileHover={{
          y: -4,
          transition: {
            duration: 0.28,
            ease: [0.2, 0, 0, 1],
          },
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative h-44 sm:h-56">
          <Image
            src={imagePath}
            alt={title}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            <div className="flex items-center gap-2">
              {/* Tech badges - placeholder badges until project data includes tech */}
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">Next.js</span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">Tailwind</span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">Golang</span>
            </div>
          </div>

          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{description}</p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-primary font-medium">View case study</span>
            <ArrowUpRight className="w-4 h-4 text-gray-400 transition-colors group-hover:text-gray-900" strokeWidth={1.5} />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

