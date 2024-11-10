"use client";

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { jsPDF } from 'jspdf';

export default function TemplateViewer({ templatePath, title }: { templatePath: string, title: string }) {
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTemplate() {
      try {
        const response = await fetch(templatePath);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error loading template:', error);
      } finally {
        setLoading(false);
      }
    }

    loadTemplate();
  }, [templatePath]);

  const downloadAsPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text(title, 20, 20);
    
    // Add content
    doc.setFontSize(12);
    const splitText = doc.splitTextToSize(content.replace(/[#*_]/g, ''), 170); // Remove markdown syntax
    doc.text(splitText, 20, 40);
    
    // Save the PDF
    doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div className="relative">
      <div className="sticky top-0 z-10 bg-white border-b pb-4 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <Button
            onClick={downloadAsPDF}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
        </div>
      </div>
      
      <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-4 mb-2" {...props} />,
            p: ({node, ...props}) => <p className="my-2" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal ml-4 my-2" {...props} />,
            li: ({node, ...props}) => <li className="my-1" {...props} />,
            table: ({node, ...props}) => (
              <div className="overflow-x-auto my-4">
                <table className="min-w-full divide-y divide-gray-200" {...props} />
              </div>
            ),
            tr: ({node, ...props}) => <tr className="border-b" {...props} />,
            td: ({node, ...props}) => <td className="px-4 py-2" {...props} />,
            th: ({node, ...props}) => <th className="px-4 py-2 font-bold" {...props} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
} 