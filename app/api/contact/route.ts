import { NextResponse } from "next/server";
import { siteContent } from "@/data/siteContent";

const allowedInquiryTypes = new Set([
  "Buy",
  "Sell",
  "Rent",
  "Site Visit",
  "Commercial",
  "Land/Plot",
  "General",
]);
const allowedPropertyTypes = new Set([
  "Villa/Row House",
  "Apartment/Flat",
  "Shop/Commercial",
  "Land/Plot",
  "Other",
]);

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as Record<string, unknown>;
    const website = clean(input.website, 200);
    if (website) return NextResponse.json({ message: "Thank you. Your enquiry has been received." });

    const fullName = clean(input.fullName, 100);
    const phone = clean(input.phone, 18);
    const email = clean(input.email, 160);
    const inquiryType = clean(input.inquiryType, 50);
    const propertyType = clean(input.propertyType, 50);
    const preferredLocation = clean(input.preferredLocation, 120);
    const budget = clean(input.budget, 60);
    const message = clean(input.message, 1500);
    const consent = input.consent === true || input.consent === "true" || input.consent === "on";
    const phoneDigits = phone.replace(/\D/g, "");

    if (fullName.length < 2) {
      return NextResponse.json({ message: "Please enter your full name." }, { status: 400 });
    }
    if (!/^(?:91)?[6-9]\d{9}$/.test(phoneDigits)) {
      return NextResponse.json({ message: "Please enter a valid Indian mobile number." }, { status: 400 });
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Please enter a valid email address or leave it blank." }, { status: 400 });
    }
    if (!consent) {
      return NextResponse.json({ message: "Please provide consent so the team can contact you." }, { status: 400 });
    }

    const enquiry = {
      fullName,
      phone,
      email: email || null,
      inquiryType: allowedInquiryTypes.has(inquiryType) ? inquiryType : "General",
      propertyType: allowedPropertyTypes.has(propertyType) ? propertyType : "Other",
      preferredLocation: preferredLocation || null,
      budget: budget || null,
      message: message || null,
      consent: true,
      submittedAt: new Date().toISOString(),
    };

    const webhookUrl = process.env.CONTACT_FORM_WEBHOOK_URL;
    if (!webhookUrl) {
      return NextResponse.json(
        {
          message: `Online enquiries are not connected yet. Please call or WhatsApp ${siteContent.contact.phone.value.display}.`,
        },
        { status: 503 }
      );
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
      signal: AbortSignal.timeout(8000),
    });
    if (!webhookResponse.ok) throw new Error("Contact webhook rejected the enquiry.");

    return NextResponse.json({
      message: "Thank you. The VM Brothers team will contact you soon.",
    });
  } catch (error) {
    console.error("VM Brothers contact form error", error);
    return NextResponse.json(
      {
        message: `We could not send your enquiry. Please call or WhatsApp ${siteContent.contact.phone.value.display}.`,
      },
      { status: 500 }
    );
  }
}
