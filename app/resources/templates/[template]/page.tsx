import TemplateViewer from '../../components/template-viewer';
import { templateItems } from '../../data';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/ui/navigation';
import Markdown from 'react-markdown';
import { useEffect, useState } from 'react';

export default function TemplatePage({ params }: { params: { template: string } }) {
  const [content, setContent] = useState('');
  const template = templateItems.find(t => {
    const path = t.href.split('/').pop();
    return path === params.template;
  });

  useEffect(() => {
    if (template) {
      fetch(template.href)
        .then(res => res.text())
        .then(text => setContent(text));
    }
  }, [template]);

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-6 pt-24">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-4">{template.title}</h1>
          <div className="prose max-w-none">
            <Markdown>{content}</Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return templateItems.map((template) => ({
    template: template.href.split('/').pop(),
  }));
} 