import { readFileSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { template: string } }
) {
  try {
    const filePath = join(process.cwd(), 'app/resources/templates', `${params.template}.md`);
    const content = readFileSync(filePath, 'utf8');
    return new NextResponse(content);
  } catch (error) {
    console.error('Error reading template:', error);
    return new NextResponse('Error loading template', { status: 500 });
  }
} 