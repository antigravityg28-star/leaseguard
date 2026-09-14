// =============================================================================
// LEASEGUARD B2B - Programmatic SEO Guide Page (Next.js Dynamic Route)
// Schema.org Article & FAQPage JSON-LD + High Conversion B2B Banner
// =============================================================================
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { SEO_GUIDES } from "@/lib/guides-data";
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Sparkles,
  Scale,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SEO_GUIDES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = SEO_GUIDES[slug];

  if (!guide) return { title: "Guida non trovata" };

  return {
    title: `${guide.metaTitle} | LeaseGuard B2B`,
    description: guide.metaDescription,
    openGraph: {
      title: guide.title,
      description: guide.metaDescription,
      type: "article",
      url: `https://leaseguard-nu.vercel.app/guide/${guide.slug}`,
    },
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  const guide = SEO_GUIDES[slug];

  if (!guide) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.publishedDate,
    author: {
      "@type": "Organization",
      name: "LeaseGuard B2B Team",
      url: "https://leaseguard-nu.vercel.app",
    },
    publisher: {
      "@type": "Organization",
      name: "LeaseGuard B2B",
      logo: {
        "@type": "ImageObject",
        url: "https://leaseguard-nu.vercel.app/favicon.ico",
      },
    },
    mainEntityOfPage: `https://leaseguard-nu.vercel.app/guide/${guide.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-8 max-w-5xl mx-auto space-y-12">
        {/* Breadcrumb & Meta */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <Link href="/guide" className="hover:text-foreground">Guide Legali</Link>
            <span>/</span>
            <span className="text-foreground font-semibold truncate max-w-xs">{guide.category}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-bold text-primary">
              {guide.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> Aggiornato Settembre 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {guide.readTime} di lettura
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight leading-tight">
            {guide.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground font-normal leading-relaxed">
            {guide.heroExcerpt}
          </p>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 flex items-center gap-3 text-xs font-semibold text-foreground">
            <Scale className="h-5 w-5 text-primary shrink-0" />
            <span>Riferimento normativo: <strong>{guide.normativa}</strong></span>
          </div>
        </div>

        {/* Key Points Summary Box */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xs space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-600" /> Punti Chiave da Ricordare
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {guide.keyPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Guide Body Content */}
        <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: guide.contentHtml }} />
        </article>

        {/* Interactive In-Article CTA Banner */}
        <div className="rounded-3xl border border-primary/40 bg-gradient-to-r from-primary/10 via-primary/5 to-card p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Strumento Gratuito per Conduttori
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-foreground">
              Vuoi verificare i tuoi contratti o generare la PEC di disdetta?
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Usa LeaseGuard: monitora automaticamente le scadenze dei tuoi locali e genera lettere legali a norma di legge in 30 secondi.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/calcolatore-istat"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-input bg-card px-5 text-xs font-bold text-foreground shadow-xs hover:bg-accent"
            >
              Calcola ISTAT Gratis
            </Link>
            <Link
              href="/dashboard/auth/signup"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90"
            >
              Inizia Prova 14gg <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        {guide.faq.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-border">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> Domande Frequenti su questo Argomento
            </h3>
            <div className="space-y-4">
              {guide.faq.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-5 space-y-1.5">
                  <h4 className="text-sm font-bold text-foreground">{item.q}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
