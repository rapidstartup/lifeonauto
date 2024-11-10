"use client";

import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';

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
      .then(text => setContent(text))
      .catch(error => console.error('Error loading template:', error));
  }, [template]);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-2xl font-bold mb-4">{template.title}</h1>
      <div className="prose max-w-none">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
} 