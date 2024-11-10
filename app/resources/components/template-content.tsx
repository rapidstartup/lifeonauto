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

  useEffect(() => {
    fetch(template.href)
      .then(res => res.text())
      .then(text => {
        // Remove any DOCTYPE or HTML wrapper if present
        const cleanContent = text.replace(/<!DOCTYPE[^>]*>|<html[^>]*>|<\/html>|<head>[\s\S]*?<\/head>|<body[^>]*>|<\/body>/g, '');
        setContent(cleanContent);
      })
      .catch(error => console.error('Error loading template:', error));
  }, [template]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-4">{template.title}</h1>
      <div className="prose max-w-none">
        <Markdown rehypePlugins={[rehypeRaw]}>{content}</Markdown>
      </div>
    </div>
  );
} 