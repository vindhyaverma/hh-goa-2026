import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image || !image.startsWith('data:image/jpeg;base64,')) {
      return NextResponse.json(
        { error: 'Invalid image format. Expected JPEG Data URL.' },
        { status: 400 }
      );
    }

    // Convert Base64 Data URL to Buffer
    const base64Data = image.replace(/^data:image\/jpeg;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // Generate a unique, unguessable filename
    const uniqueId = crypto.randomBytes(16).toString('hex');
    const filename = `goa-id-${uniqueId}.jpg`;

    // Upload to Vercel Blob
    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: 'image/jpeg',
    });

    // Return the blob URL and the unique ID for the share route
    return NextResponse.json({ 
      id: uniqueId,
      url: blob.url 
    });
    
  } catch (error) {
    console.error('Blob upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
