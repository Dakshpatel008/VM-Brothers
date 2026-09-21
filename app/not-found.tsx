import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CreativeButton from "@/components/ui/CreativeButton";

export default function NotFound() {
  return (
    <>
      <Header theme="solid" />
      <main className="min-h-[70vh] px-6 pt-48 pb-28 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[#B6AB99]">
          404 — Page not found
        </p>
        <h1 className="text-5xl text-[#313131] sm:text-7xl">This page has moved.</h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-[#313131]/70">
          The address may be outdated, or the property page may no longer be available.
        </p>
        <div className="mt-10">
          <CreativeButton href="/" variant="accent" showIcon>
            Return home
          </CreativeButton>
        </div>
      </main>
      <Footer />
    </>
  );
}
