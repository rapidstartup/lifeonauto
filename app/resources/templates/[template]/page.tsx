import { templateItems } from '../../data';
import { notFound } from 'next/navigation';
import TemplateContent from '../../components/template-content';
import { ResourceLayout } from '../../components/resource-layout';

export default function TemplatePage({ params }: { params: { template: string } }) {
  const template = templateItems.find(t => t.href === params.template);

  if (!template) {
    notFound();
  }

  return (
    <ResourceLayout type="templates">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">{template.title}</h1>
        <TemplateContent template={template} />
      </div>
    </ResourceLayout>
  );
}

export async function generateStaticParams() {
  return templateItems.map((template) => ({
    template: template.href,
  }));
} 