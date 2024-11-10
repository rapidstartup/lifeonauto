import TemplateViewer from '../../components/template-viewer';
import { templateItems } from '../../data';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/ui/navigation';

export default function TemplatePage({ params }: { params: { template: string } }) {
  const template = templateItems.find(t => {
    const path = t.href.split('/').pop();
    return path === params.template;
  });

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto p-6 pt-24">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <TemplateViewer templatePath={template.href} title={template.title} />
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