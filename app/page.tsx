"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { PlexusBackground } from "@/components/plexus-background";
import { Footer } from "@/components/footer";

const testimonials = [
  {
    quote: "This book completely changed how I approach my daily tasks. The AI tools Nathan recommends have saved me hours every week.",
    name: "Sarah Johnson",
    title: "Marketing Director",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop"
  },
  {
    quote: "Finally, someone explains AI automation in a way that makes sense! No technical jargon, just practical solutions.",
    name: "Michael Chen",
    title: "Small Business Owner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop"
  },
  {
    quote: "The step-by-step approach made it easy to implement these tools in my workflow. I'm now doing the work of three people!",
    name: "Emily Rodriguez",
    title: "Freelance Designer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=96&h=96&fit=crop"
  }
];

const features = [
  {
    title: "AI Tool Directory",
    description: "Access our curated list of recommended AI tools for various tasks, complete with implementation guides."
  },
  {
    title: "Automation Templates",
    description: "Ready-to-use templates and workflows for common business processes, designed to get you started immediately."
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides showing you exactly how to implement the strategies from the book."
  }
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        <PlexusBackground />
        <div className="container px-4 mx-auto z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 transform transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Your Simple Guide to Multiplying Yourself with AI Tools
              </h1>
              <p className="text-lg text-muted-foreground">
                No tech experience required - learn how to automate your daily tasks and multiply your productivity with AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="animate-pulse bg-[#FF9900] hover:bg-[#FF9900]/90 text-black">
                  <a href="#" className="flex items-center">
                    Get it on Amazon
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#resources">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Resources
                  </Link>
                </Button>
              </div>
            </div>
            <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
              <Image
                src="/images/LifeOnAuto-cover.jpg"
                alt="Life On Auto Book Cover"
                width={400}
                height={600}
                className="mx-auto drop-shadow-xl hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Professionals Worldwide</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Author */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <Image
                src="/images/Nathan-profile.png"
                alt="Nathan Shearer"
                width={500}
                height={500}
                className="relative rounded-lg shadow-lg w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">About Nathan</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founder and Head &quot;Business-Speak-To-Technical-Talk&quot; Translator at RapidAgent.ai, Nathan has spent over 15 years translating complex technical concepts into simple, actionable steps for businesses and individuals.
                </p>
                <p>
                  From unpaid intern to successful software company founder, Nathan&apos;s journey through hospitality, banking, mining, and marketing gives him a unique perspective on making technology accessible to everyone.
                </p>
              </div>
              <Button asChild size="lg" className="mt-6">
                <a href="https://calendly.com/rapidexecutive" target="_blank" rel="noopener noreferrer">
                  Book a Consultation
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Preview */}
      <section id="resources" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Book Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}