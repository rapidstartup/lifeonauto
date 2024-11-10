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
        // Construct the correct path to the markdown file
        const response = await fetch(template.href);
        if (!response.ok) throw new Error('Failed to fetch template');
        
        const text = await response.text();
        // Clean the content
        const cleanContent = text.replace(/<!DOCTYPE[^>]*>|<html[^>]*>|<\/html>|<head>[\s\S]*?<\/head>|<body[^>]*>|<\/body>/g, '');
        setContent(cleanContent);
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
    return <div>Loading template...</div>;
  }

  return (
    <div className="prose max-w-none">
      <Markdown rehypePlugins={[rehypeRaw]}>
        {content}
      </Markdown>
    </div>
  );
} 