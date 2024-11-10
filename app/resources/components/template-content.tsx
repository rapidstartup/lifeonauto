"use client";

import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

interface TemplateContentProps {
  template: {
    title: string;
    href: string;
  };
}

export default function TemplateContent({ template }: TemplateContentProps) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const templateModule = await import(`../templates/${template.href}.md`);
        setContent(templateModule.default);
      } catch (error) {
        console.error('Error loading template:', error);
        setContent('Error loading template content');
      } finally {
        setLoading(false);
      }
    }

    fetchTemplate();
  }, [template.href]);

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(`/api/templates/${template.href}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${template.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download as PDF
        </button>
      </div>
      <div className="prose max-w-none dark:prose-invert">
        <Markdown rehypePlugins={[rehypeRaw]}>
          {content}
        </Markdown>
      </div>
    </div>
  );
} 