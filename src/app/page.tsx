import { Suspense } from "react";
import { CrestReveal } from "@/components/CrestReveal";
import { DressCode } from "@/components/DressCode";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { RsvpForm } from "@/components/RsvpForm";
import { SectionHeading } from "@/components/Reveal";
import { Schedule } from "@/components/Schedule";
import { BeadDivider } from "@/components/art/Dividers";
import { resolveGuest } from "@/data/guests";
import { weddingConfig as c } from "@/data/wedding-config";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

/** Reads ?guest= / ?code= and hands a resolved guest to the client form. */
async function GuestRsvp({ searchParams }: { searchParams: SearchParams }) {
  const guest = resolveGuest(await searchParams);
  return <RsvpForm guest={guest} />;
}

function RsvpSkeleton() {
  return (
    <div className="mx-auto h-[520px] w-full max-w-[380px] animate-pulse rounded-[1.75rem] border border-caramel/30 bg-white/40" />
  );
}

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  return (
    <>
      <CrestReveal />
      <main className="mx-auto w-full max-w-[480px] overflow-hidden bg-ivory md:my-10 md:rounded-[2rem] md:border md:border-gold/40 md:shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]">
        <Hero />
        <Schedule />
        <DressCode />

        <section id="rsvp" className="scroll-mt-4 bg-ivory px-6 py-20">
          <SectionHeading
            eyebrow="R.S.V.P."
            title={c.rsvp.title}
            subtitle={`Kindly reply before ${c.rsvp.deadlineDisplay} so we can prepare a seat for you.`}
          />
          <div className="mb-10 mt-4">
            <BeadDivider />
          </div>
          <Suspense fallback={<RsvpSkeleton />}>
            <GuestRsvp searchParams={searchParams} />
          </Suspense>
        </section>

        <Footer />
      </main>
    </>
  );
}
