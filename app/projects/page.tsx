import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import ProjectCard from "@/components/projects/ProjectCard";
import { publishedProjects, siteContent } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore residential and commercial property opportunities associated with VM Brothers in Surat.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <Header theme="solid" />
      <main className="min-h-screen">
        <PageHero
          eyebrow="Surat Property Portfolio"
          title="Projects"
          description="Explore selected property opportunities and connect with VM Brothers for current details, availability, and guided site visits."
          image={siteContent.assets.representative.pageHeroes.projects}
        />
        <section className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
          <div className="grid gap-8 lg:grid-cols-2">
            {publishedProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
          <p className="mx-auto mt-12 max-w-4xl text-center text-xs leading-relaxed text-[#313131]/55">
            {siteContent.projectDisclaimer}
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
