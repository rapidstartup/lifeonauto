import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { templateItems } from '@/app/resources/data';

export async function GET(
  request: Request,
  { params }: { params: { template: string } }
) {
  try {
    const template = templateItems.find(t => t.href === params.template);
    
    if (!template) {
      return new NextResponse('Template not found', { status: 404 });
    }

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Navigate to the template page
    await page.goto(`${process.env.NEXT_PUBLIC_BASE_URL}/resources/templates/${params.template}`, {
      waitUntil: 'networkidle0',
    });

    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
      printBackground: true,
    });

    await browser.close();

    // Return the PDF
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${template.title}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return new NextResponse('Error generating PDF', { status: 500 });
  }
}

export function generateStaticParams() {
  return templateItems.map((template) => ({
    template: template.href,
  }));
} 