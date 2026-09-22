import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CreativeButton from "@/components/ui/CreativeButton";
import LayoutImages from "@/components/projects/LayoutImages";
import { publishedProjects } from "@/data/projectLayouts";

type LayoutPageProps = { params: Promise<{ slug: string; layout: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedProjects.flatMap((project) => project.layouts.map((layout) => ({
    slug: project.slug, layout: layout.slug,
  })));
}

function findLayout(slug: string, layoutSlug: string) {
  const project = publishedProjects.find((item) => item.slug === slug);
  const layout = project?.layouts.find((item) => item.slug === layoutSlug);
  if (!project || !layout) notFound();
  return { project, layout };
}

export async function generateMetadata({ params }: LayoutPageProps): Promise<Metadata> {
  const { slug, layout: layoutSlug } = await params;
  const { project, layout } = findLayout(slug, layoutSlug);
  const title = `${layout.title} Layout — ${project.name}`;
  const url = `/projects/${slug}/layouts/${layoutSlug}`;
  return {
    title, description: layout.description,
    alternates: { canonical: url },
    openGraph: { title, description: layout.description, url },
    twitter: { card: "summary", title, description: layout.description },
  };
}

export default async function LayoutPage({ params }: LayoutPageProps) {
  const { slug, layout: layoutSlug } = await params;
  const { project, layout } = findLayout(slug, layoutSlug);
  const otherLayouts = project.layouts.filter((item) => item.slug !== layout.slug);

  return (
    <>
      <Header theme="solid" />
      <main className="min-h-screen bg-[#F5F5F5] px-6 pb-20 pt-32 md:px-12 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <Link href={`/projects/${slug}`} className="inline-block py-3 text-sm underline underline-offset-4 hover:text-[#766954]">
            <span aria-hidden="true">← </span>Back to {project.name}
          </Link>
          <header className="pb-10 pt-8 md:pb-14">
            <p className="text-xs uppercase tracking-[0.22em] text-[#766954]">{project.name}</p>
            <h1 className="mt-5 font-gallient text-6xl leading-none md:text-8xl">{layout.title} Layout</h1>
          </header>

          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-16">
            <section aria-label="Floor plan">
              {layout.floorPlans?.some((image) => image.isTemporaryPreview) && (
                <p className="mb-5 rounded-xl bg-[#EAE6DF] px-5 py-4 text-sm leading-relaxed">
                  Temporary sample plans. These drawings do not represent this home’s configuration or dimensions. Original project plans will replace them when available.
                </p>
              )}
              {layout.floorPlans?.length ? (
                <LayoutImages images={layout.floorPlans} plans />
              ) : (
                <div className="rounded-2xl border border-[#313131]/15 bg-[#EAE6DF] p-8 md:p-12">
                  <p className="text-xs uppercase tracking-[0.22em] text-[#766954]">Floor plan</p>
                  <h2 className="mt-5 font-gallient text-3xl md:text-4xl">Floor plan available on request</h2>
                  <p className="mb-8 mt-5 max-w-md leading-relaxed text-[#313131]/75">Contact our team to request the floor plan for this {layout.title} home at {project.name}.</p>
                  <CreativeButton href="/contact#enquiry" showIcon>Request floor plan</CreativeButton>
                </div>
              )}
            </section>
            <section aria-labelledby="home-details-heading">
              <h2 id="home-details-heading" className="font-gallient text-3xl md:text-4xl">Your home, in detail.</h2>
              <p className="mt-6 font-light leading-relaxed text-[#313131]/80">{layout.description}</p>
              <dl className="my-8 divide-y divide-[#313131]/15 border-y border-[#313131]/15">
                <div className="py-5"><dt className="text-xs uppercase tracking-widest text-[#313131]/65">Configuration</dt><dd className="mt-2">{layout.title}</dd></div>
                <div className="py-5"><dt className="text-xs uppercase tracking-widest text-[#313131]/65">Location</dt><dd className="mt-2">{project.location}</dd></div>
              </dl>
              <CreativeButton href="/contact#enquiry" showIcon>Enquire about this home</CreativeButton>
              {layout.pdf && (
                <a href={layout.pdf.src} download className="mt-6 block py-2 text-sm underline underline-offset-4">Download {layout.pdf.label} (PDF)</a>
              )}
            </section>
          </div>

          {!!layout.photos?.length && (
            <section aria-labelledby="layout-gallery-heading" className="pt-20 md:pt-28">
              <h2 id="layout-gallery-heading" className="mb-10 font-gallient text-4xl md:text-5xl">A closer look</h2>
              <LayoutImages images={layout.photos} />
            </section>
          )}

          {otherLayouts.length > 0 && (
            <nav aria-labelledby="other-layouts-heading" className="pt-20 md:pt-28">
              <h2 id="other-layouts-heading" className="font-gallient text-3xl md:text-4xl">Other homes at {project.name}</h2>
              <ul className="mt-8 flex flex-wrap gap-4">
                {otherLayouts.map((item) => (
                  <li key={item.slug}><Link href={`/projects/${slug}/layouts/${item.slug}`} className="inline-block rounded-full border border-[#313131]/30 px-6 py-4 text-sm hover:bg-[#EAE6DF]">Explore {item.title} <span aria-hidden="true">↗</span></Link></li>
                ))}
              </ul>
            </nav>
          )}
          <nav aria-label="Project navigation" className="mt-16 border-t border-[#313131]/15 pt-8">
            <Link href="/projects" className="text-sm underline underline-offset-4">View all projects</Link>
          </nav>
        </div>
      </main>
      <Footer />
    </>
  );
}
