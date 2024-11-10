"use client";

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function TemplateViewer({ templatePath }: { templatePath: string }) {
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

  if (loading) {
    return <div>Loading template...</div>;
  }

  return (
    <div className="prose max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
} 