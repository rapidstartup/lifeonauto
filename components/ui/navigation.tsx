"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function Navigation() {
  return (
    <nav className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Life On Auto
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/resources" className="text-sm font-medium hover:text-primary transition-colors">
            Resources
          </Link>
          <Button asChild size="sm">
            <a href="https://calendly.com/rapidexecutive" target="_blank" rel="noopener noreferrer">
              <Calendar className="mr-2 h-4 w-4" />
              Book a Call
            </a>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}