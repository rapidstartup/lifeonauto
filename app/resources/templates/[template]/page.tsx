import { templateItems } from '../../data';
import { notFound } from 'next/navigation';
import TemplateContent from '../../components/template-content';
import { ResourceLayout } from '../../components/resource-layout';

export default function TemplatePage({ params }: { params: { template: string } }) {
  const template = templateItems.find(t => {
    const path = t.href.split('/').pop();
    return path === params.template;
  });

  if (!template) {
    notFound();
  }

  return (
    <ResourceLayout type="templates">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <TemplateContent template={template} />
      </div>
    </ResourceLayout>
  );
}

export async function generateStaticParams() {
  return templateItems.map((template) => ({
    template: template.href.split('/').pop(),
  }));
} 