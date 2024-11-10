"use client";

import { Navigation } from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <img
                src="/images/Nathan-profile.png"
                alt="Nathan Shearer"
                className="relative rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-bold">About Nathan</h1>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  As the founder of RapidAgent.ai, Nathan Shearer has dedicated his career to making complex technology accessible to everyone. With over 15 years of experience bridging the gap between technical solutions and business needs, Nathan has become a trusted voice in the AI automation space.
                </p>
                <p>
                  His journey from an unpaid intern to a successful software company founder spans multiple industries including hospitality, banking, mining, and marketing. This diverse background gives him a unique perspective on implementing technology solutions across different sectors.
                </p>
                <p>
                  Today, Nathan helps businesses and individuals harness the power of AI tools to multiply their productivity and achieve more with less effort. His practical, no-nonsense approach has helped thousands of people transform their work lives through intelligent automation.
                </p>
              </div>
              <Button asChild size="lg">
                <a href="https://calendly.com/rapidexecutive" target="_blank" rel="noopener noreferrer">
                  Schedule a Consultation
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}