"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Markdown from "react-markdown";
import html2pdf from 'html2pdf.js';

interface TemplateViewerProps {
  template: {
    title: string;
    category: string;
    chapter: string;
    path: string;
  };
}

export function TemplateViewer({ template }: TemplateViewerProps) {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    // Fetch the markdown content from the correct path
    fetch(template.path)
      .then((res) => res.text())
      .then(setContent)
      .catch((error) => {
        console.error('Error loading template:', error);
        setContent('Error loading template content.');
      });
  }, [template.path]);

  const handleDownload = async () => {
    const element = document.getElementById('template-content');
    if (!element) return;

    const opt = {
      margin: 1,
      filename: `${template.title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">{template.title}</h2>
          <p className="text-muted-foreground">
            {template.category} • {template.chapter}
          </p>
        </div>
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
      
      <div id="template-content" className="prose prose-slate dark:prose-invert max-w-none">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
} 