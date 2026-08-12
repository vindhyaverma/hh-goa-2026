import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata({ searchParams }: { searchParams: { url?: string } }): Promise<Metadata> {
  const imageUrl = searchParams.url;

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

export default function SharePage({ searchParams }: { searchParams: { url?: string } }) {
  const imageUrl = searchParams.url;
  
  if (!imageUrl) {
    return (
      <div className="min-h-screen bg-[var(--goa-ink)] flex flex-col items-center justify-center p-8 text-[var(--goa-yellow)] font-mono text-center">
        <h1 className="text-4xl mb-4">Ticket Not Found</h1>
        <p className="mb-8">This builder ID may have expired or does not exist.</p>
        <Link href="/" className="bg-[var(--goa-pink)] text-[var(--goa-ink)] px-8 py-4 font-bold uppercase tracking-widest">
          Generate Yours
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--goa-ink)] flex flex-col items-center justify-center p-4 md:p-8">
      <div className="max-w-2xl w-full bg-[var(--goa-green-dark)] p-4 md:p-8 rounded-xl shadow-2xl border-4 border-[var(--goa-green)]">
         <img src={imageUrl} alt="Shared Hacker House ID" className="w-full h-auto shadow-[16px_16px_0px_var(--goa-ink)]" />
         
         <div className="mt-12 text-center">
           <h2 className="text-[var(--goa-yellow)] font-serif text-3xl md:text-5xl uppercase mb-6">Want one too?</h2>
           <Link 
             href="/generator" 
             className="inline-block bg-[var(--goa-pink)] text-[var(--goa-ink)] px-8 py-4 font-bold uppercase tracking-widest text-xl transition-transform hover:scale-105 shadow-[4px_4px_0px_var(--goa-yellow)]"
           >
             Generate Your ID 🌴
           </Link>
         </div>
      </div>
    </div>
  );
}
