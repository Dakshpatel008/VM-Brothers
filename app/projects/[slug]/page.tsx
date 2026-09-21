import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CreativeButton from "@/components/ui/CreativeButton";
import { publishedProjects, siteContent } from "@/data/siteContent";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = publishedProjects.find((item) => item.slug === slug);

  if (!project) return { title: "Project Not Found" };

  return {
    title: project.name,
    description: `${project.summary} Explore current details for ${project.name} in ${project.location} with VM Brothers.`,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = publishedProjects.find((item) => item.slug === slug);

  if (!project) notFound();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F5F5F5]">
        <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden px-6 pb-16 pt-36 text-white md:px-12 md:pb-24">
          <Image
            src={project.heroImage}
            alt=""
            fill
            priority
            className="-z-20 object-cover object-bottom"
            sizes="100vw"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-5 flex flex-wrap gap-3 text-[10px] uppercase tracking-[0.22em] text-white/75 sm:text-xs">
              <span>{project.propertyType}</span>
              <span aria-hidden="true">•</span>
              <span>{project.location}</span>
            </div>
            <h1 className="max-w-5xl font-gallient text-5xl leading-[0.95] text-white sm:text-7xl lg:text-8xl">
              {project.name}
            </h1>
            {project.imageIsRepresentative && (
              <span className="mt-7 inline-block rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-white/65 backdrop-blur-sm">
                Representative imagery
              </span>
            )}
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-12 md:py-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B6AB99]">Project Overview</span>
            <h2 className="mt-5 font-gallient text-4xl leading-tight md:text-6xl">
              A property opportunity in Surat.
            </h2>
            <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-[#313131]/75">
              {project.summary}
            </p>
            {project.relationship.publish && project.relationship.value && (
              <p className="mt-6 text-sm text-[#313131]/60">
                VM Brothers relationship: {project.relationship.value}.
              </p>
            )}
          </div>

          <aside className="rounded-2xl bg-[#EAE6DF] p-8 lg:col-span-5 lg:p-10">
            <h2 className="font-gallient text-3xl">Project details</h2>
            <dl className="mt-7 divide-y divide-[#313131]/10 border-y border-[#313131]/10">
              <div className="py-5">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-[#313131]/50">Location</dt>
                <dd className="mt-2 text-sm">{project.location}</dd>
              </div>
              <div className="py-5">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-[#313131]/50">Property type</dt>
                <dd className="mt-2 text-sm">{project.propertyType}</dd>
              </div>
              <div className="py-5">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-[#313131]/50">Price & availability</dt>
                <dd className="mt-2 text-sm">Contact for current pricing and availability</dd>
              </div>
            </dl>
            <div className="mt-8">
              <CreativeButton href="/contact#enquiry" variant="accent" showIcon>
                Enquire or Book a Visit
              </CreativeButton>
            </div>
          </aside>
        </section>

        <section className="bg-[#1A1A1A] px-6 py-20 text-white md:px-12">
          <nav aria-labelledby="explore-projects-heading" className="mx-auto max-w-7xl">
            <h2 id="explore-projects-heading" className="font-gallient text-3xl md:text-5xl">Explore Our Projects</h2>
            <ul className="mt-10 divide-y divide-white/20 border-y border-white/20">
              {publishedProjects.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/projects/${item.slug}`}
                    aria-current={item.slug === slug ? "page" : undefined}
                    className="flex items-center justify-between gap-6 py-6 transition-colors hover:text-[#B6AB99] aria-[current=page]:text-[#B6AB99]"
                  >
                    <span className="min-w-0 font-gallient text-2xl leading-tight md:text-3xl">{item.name}</span>
                    <span className="shrink-0 text-[10px] uppercase tracking-[0.16em]">
                      {item.slug === slug ? "Viewing" : "View project"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <p className="mx-auto max-w-5xl px-6 py-8 text-center text-xs leading-relaxed text-[#313131]/55 md:px-12">
          {siteContent.projectDisclaimer} Images currently shown are representative and are not project-specific.
        </p>
      </main>
      <Footer />
    </>
  );
}
