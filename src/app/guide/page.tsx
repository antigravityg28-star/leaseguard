// =============================================================================
// LEASEGUARD B2B - Guide Legali & Risorse per Conduttori Commerciali
// =============================================================================
import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { SEO_GUIDES } from "@/lib/guides-data";
import { BookOpen, ArrowRight, Clock, ShieldCheck, Scale } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide e Modelli Legali per Locazioni Commerciali 6+6 | LeaseGuard",
  description: "Raccolta completa di guide legali, modelli PEC e vademecum normativi per la tutela dei conduttori commerciali in Italia (L. 392/78).",
};

export default function GuidesIndexPage() {
  const guidesList = Object.values(SEO_GUIDES);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            <BookOpen className="h-4 w-4" /> Centro Risorse & Vademecum Giuridico
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Guide Pratiche per la Tutela delle Locazioni Commerciali
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Tutto ciò che imprenditori, ristoratori e direttori retail devono sapere su disdette, ISTAT, fideiussioni e diritti dei conduttori.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {guidesList.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guide/${guide.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 shadow-xs hover:border-primary/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-bold text-primary">
                    {guide.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {guide.readTime}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                  {guide.title}
                </h2>

                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
                  {guide.heroExcerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-primary">
                <span>Leggi la Guida & Modelli</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
