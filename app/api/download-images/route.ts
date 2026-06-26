import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const PUBLIC_IMAGES = path.join(process.cwd(), 'public', 'images');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { images } = body; // expect [{ url, name }]

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json({ message: 'No images provided' }, { status: 400 });
    }

    await fs.mkdir(PUBLIC_IMAGES, { recursive: true });

    const results: { file: string; saved: boolean }[] = [];

    for (const item of images) {
      const { url, name } = item;
      if (!url || !name) continue;

      const res = await fetch(url);
      if (!res.ok) {
        results.push({ file: name, saved: false });
        continue;
      }

      const buffer = Buffer.from(await res.arrayBuffer());
      const dest = path.join(PUBLIC_IMAGES, name);
      await fs.writeFile(dest, buffer);
      results.push({ file: `/images/${name}`, saved: true });
    }

    return NextResponse.json({ message: 'Download completed', results }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ message: 'Download failed', error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'POST images JSON to download' });
}
