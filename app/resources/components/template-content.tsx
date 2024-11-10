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
        // Import the markdown file directly
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

  if (loading) {
    return <div className="flex items-center justify-center h-32">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div className="prose max-w-none dark:prose-invert">
      <Markdown rehypePlugins={[rehypeRaw]}>
        {content}
      </Markdown>
    </div>
  );
} 