import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const PUBLIC_IMAGES = path.join(process.cwd(), 'public', 'images');

const DEFAULT_URLS = [
  'https://picsum.photos/seed/tech1/1200/800',
  'https://picsum.photos/seed/tech2/1200/800',
  'https://picsum.photos/seed/tech3/1200/800',
];

export async function POST(req: NextRequest) {
  try {
    // Download three curated images to public/images
    const urls = DEFAULT_URLS;

    await fs.mkdir(PUBLIC_IMAGES, { recursive: true });

    const results: { file: string; saved: boolean }[] = [];

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);

      const buffer = Buffer.from(await res.arrayBuffer());
      const fileName = `surf-${i + 1}.jpg`;
      const dest = path.join(PUBLIC_IMAGES, fileName);

      await fs.writeFile(dest, buffer);
      results.push({ file: `/images/${fileName}`, saved: true });
    }

    return NextResponse.json({ message: 'Images downloaded', images: results }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: 'Download failed', error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Use POST to download default images' });
}
