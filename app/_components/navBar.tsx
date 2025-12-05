"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { Rubik_Mono_One } from "next/font/google";
import { useCursor } from "../_components/cursorContext";

export const rubik = Rubik_Mono_One({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: "400",
});

interface AnimatedLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  autoAnimate?: boolean;
  animateDuration?: number;
}

export function AnimatedLogo({
  size = "md",
}: AnimatedLogoProps) {
  // Simplified single-word logotype to reduce visual noise.
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
    xl: "text-6xl",
  };

  return (
    <div className={`${rubik.className} ${sizeClasses[size]} tracking-tight font-semibold`}>UNEDITED</div>
  );
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsHovering } = useCursor();

  const menuItems = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "https://blog.unedited.site/", label: "Blog" },
    { href: "mailto:charlie@unedited.site", label: "Contact" },
  ];

  useEffect(() => {
    const closeMenuOnResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", closeMenuOnResize);
    return () => window.removeEventListener("resize", closeMenuOnResize);
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 py-3 bg-background/60 backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-4">
            <Link href="/" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <AnimatedLogo size="md" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3 py-2 transition-colors duration-200 font-medium text-sm"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle menu"
              className="text-foreground"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[240px] bg-background/80 backdrop-blur-md sm:w-[300px]"
          >
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col space-y-4 mt-6">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  passHref
                  legacyBehavior
                  className="group p-5 mr-8"
                >
                  <a
                    className={`${rubik.className} w-full justify-start text-lg text-foreground hover:text-primary`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
