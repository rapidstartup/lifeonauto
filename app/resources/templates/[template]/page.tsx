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
      <TemplateContent template={template} />
    </ResourceLayout>
  );
}

export async function generateStaticParams() {
  return templateItems.map((template) => ({
    template: template.href.split('/').pop(),
  }));
} 