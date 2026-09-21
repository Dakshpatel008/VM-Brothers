"use client";

import { FormEvent, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/ui/PageHero";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { siteContent } from "@/data/siteContent";

type FormStatus = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "mt-2 w-full rounded-xl border border-[#313131]/15 bg-white px-4 py-3.5 text-sm text-[#313131] outline-none transition focus:border-[#9B8D78] focus:ring-2 focus:ring-[#B6AB99]/25";
const selectTriggerClass = `${fieldClass} !h-auto`;

export default function ContactPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFeedback("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.consent = new FormData(form).has("consent") ? "true" : "false";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "Unable to send your enquiry.");

      form.reset();
      setStatus("success");
      setFeedback(result.message || "Thank you. The VM Brothers team will contact you soon.");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Unable to send your enquiry.");
    }
  }

  return (
    <>
      <Header theme="solid" />
      <main className="min-h-screen">
        <PageHero
          eyebrow="Let’s Talk Property"
          title="Contact VM Brothers"
          description="Tell us what you are looking for and our team will help you explore suitable property options and arrange the next step."
          image={siteContent.assets.representative.pageHeroes.contact}
        />

        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:px-12 md:py-32 lg:grid-cols-12">
          <aside className="min-w-0 lg:col-span-4">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B6AB99]">Speak with the Team</span>
            <h2 className="mt-5 text-balance font-gallient text-4xl leading-tight md:text-5xl">Your property search starts with a conversation.</h2>
            <p className="mt-6 font-light leading-relaxed text-[#313131]/70">
              Call, message on WhatsApp, or share your requirements through the enquiry form.
            </p>
            <div className="mt-9 space-y-7 border-t border-[#313131]/15 pt-8 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#313131]/45">Phone</p>
                <a className="mt-2 inline-block text-lg hover:text-[#9B8D78]" href={siteContent.contact.phone.value.href}>
                  {siteContent.contact.phone.value.display}
                </a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#313131]/45">WhatsApp</p>
                <a className="mt-2 inline-block text-lg hover:text-[#9B8D78]" href={siteContent.contact.whatsapp.value.href} target="_blank" rel="noreferrer">
                  Message VM Brothers
                </a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#313131]/45">Contact location</p>
                <p className="mt-2 leading-relaxed">{siteContent.contact.address.value}</p>
                <p className="mt-2 text-xs text-[#313131]/55">Please call before visiting.</p>
              </div>
            </div>
          </aside>

          <div id="enquiry" className="min-w-0 scroll-mt-24 rounded-2xl bg-[#EAE6DF]/70 p-6 sm:p-9 lg:col-span-8 lg:p-12">
            <h2 className="font-gallient text-3xl md:text-4xl">Property Enquiry</h2>
            <p className="mt-3 text-sm font-light text-[#313131]/65">Fields marked with * are required.</p>
            <form className="mt-9 grid gap-6 sm:grid-cols-2" onSubmit={handleSubmit}>
              <label className="text-sm">
                Full name *
                <input className={fieldClass} name="fullName" type="text" autoComplete="name" maxLength={100} required />
              </label>
              <label className="text-sm">
                Phone number *
                <input className={fieldClass} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10-digit Indian mobile number" maxLength={18} required />
              </label>
              <label className="text-sm">
                Email address
                <input className={fieldClass} name="email" type="email" autoComplete="email" maxLength={160} />
              </label>
              <div className="text-sm">
                <label htmlFor="inquiryType">I want to</label>
                <Select name="inquiryType" defaultValue="Buy">
                  <SelectTrigger id="inquiryType" className={selectTriggerClass}>
                    <SelectValue placeholder="Choose an enquiry type" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Buy",
                      "Sell",
                      "Rent",
                      "Site Visit",
                      "Commercial",
                      "Land/Plot",
                      "General",
                    ].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm">
                <label htmlFor="propertyType">Property type</label>
                <Select name="propertyType" defaultValue="Villa/Row House">
                  <SelectTrigger id="propertyType" className={selectTriggerClass}>
                    <SelectValue placeholder="Choose a property type" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Villa/Row House",
                      "Apartment/Flat",
                      "Shop/Commercial",
                      "Land/Plot",
                      "Other",
                    ].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <label className="text-sm">
                Preferred location
                <input className={fieldClass} name="preferredLocation" type="text" maxLength={120} placeholder="Area or project in Surat" />
              </label>
              <div className="text-sm sm:col-span-2">
                <label htmlFor="budget">Approximate budget</label>
                <Select name="budget">
                  <SelectTrigger id="budget" className={selectTriggerClass}>
                    <SelectValue placeholder="Select a budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Under ₹25 lakh",
                      "₹25–40 lakh",
                      "₹40–75 lakh",
                      "₹75 lakh–₹1 crore",
                      "₹1 crore+",
                      "Not decided",
                    ].map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <label className="text-sm sm:col-span-2">
                How can we help?
                <textarea className={`${fieldClass} min-h-32 resize-y`} name="message" maxLength={1500} placeholder="Share any property, location, timeline, or site-visit details." />
              </label>
              <label className="absolute left-[-9999px]" aria-hidden="true">
                Website
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
              <label className="flex items-start gap-3 text-xs leading-relaxed text-[#313131]/65 sm:col-span-2">
                <input className="mt-0.5 h-4 w-4 accent-[#313131]" name="consent" type="checkbox" required />
                <span>I agree that VM Brothers may contact me about this enquiry by phone, WhatsApp, or email (if provided). *</span>
              </label>
              <div className="sm:col-span-2">
                <button
                  className="rounded-full bg-[#313131] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#9B8D78] disabled:cursor-wait disabled:opacity-60"
                  type="submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending…" : "Send Enquiry"}
                </button>
                {feedback && (
                  <p className={`mt-5 text-sm ${status === "success" ? "text-emerald-700" : "text-red-700"}`} role="status">
                    {feedback}
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
