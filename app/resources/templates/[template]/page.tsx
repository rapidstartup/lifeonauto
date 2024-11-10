import { TemplateViewer } from '../../components/template-viewer';
import { templateItems } from '../../data';
import { notFound } from 'next/navigation';

export default function TemplatePage({ params }: { params: { template: string } }) {
  const template = templateItems.find(t => {
    const path = t.href.split('/').pop();
    return path === params.template;
  });

  if (!template) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{template.title}</h1>
      <TemplateViewer templatePath={template.href} />
    </div>
  );
}

export async function generateStaticParams() {
  return templateItems.map((template) => ({
    template: template.href.split('/').pop(),
  }));
} 