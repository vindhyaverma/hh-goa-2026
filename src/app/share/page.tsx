import { Metadata } from 'next';
import { Suspense } from 'react';
import ShareView from './ShareView';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ url?: string }> }): Promise<Metadata> {
  const { url: imageUrl } = await searchParams;

  if (!imageUrl) return {};

  return {
    title: 'My Hacker House Goa 2026 ID',
    description: 'I just generated my official Builder ID for Hacker House Goa 2026. Get yours now!',
    openGraph: {
      title: 'Hacker House Goa 2026 Builder ID',
      description: 'Join me at Hacker House Goa! Generate your official builder graphic.',
      images: [
        {
          url: imageUrl,
          width: 1080,
          height: 1080,
          alt: 'Hacker House Goa Generated Graphic',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Hacker House Goa 2026 Builder ID',
      description: 'Join me at Hacker House Goa! Generate your official builder graphic.',
      images: [imageUrl],
    },
  };
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--goa-ink)]" />}>
      <ShareView />
    </Suspense>
  );
}
