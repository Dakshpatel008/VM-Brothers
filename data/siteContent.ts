export type VerificationStatus =
  | "verified"
  | "provisional"
  | "client-confirmation-required";

export interface PublishableField<T> {
  value: T | null;
  status: VerificationStatus;
  publish: boolean;
  note?: string;
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface VmProject {
  slug: string;
  name: string;
  location: string;
  propertyType: string;
  summary: string;
  relationship: PublishableField<string>;
  price: PublishableField<string>;
  heroImage: string;
  imageIsRepresentative: boolean;
  publish: boolean;
}

export const siteContent = {
  company: {
    name: "VM Brothers",
    shortName: "VM",
    market: "Surat, Gujarat",
    positioning:
      "A Surat real-estate company focused on transparent property guidance and project sales across residential and commercial opportunities.",
    tagline: "Surat Real Estate, Guided with Clarity",
    footerStatement:
      "Helping families and property clients move forward with local insight, transparent communication, and dependable support.",
    founder: {
      name: "Varshil Patel",
      title: "Founder & CEO",
      status: "verified" as VerificationStatus,
      bio: "Varshil Patel leads VM Brothers with a focus on transparent property guidance, customer trust, and disciplined sales execution across Surat's evolving property market.",
    },
  },
  navigation: [
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about-us" },
    { label: "How We Work", href: "/how-we-work" },
  ] satisfies NavigationItem[],
  contact: {
    phone: {
      value: {
        display: "+91 74338 61000",
        href: "tel:+917433861000",
      },
      status: "provisional",
      publish: true,
      note: "Repeated in current public VM Brothers campaign material; confirm with the client.",
    } satisfies PublishableField<{ display: string; href: string }>,
    whatsapp: {
      value: {
        display: "+91 74338 61000",
        href: "https://wa.me/917433861000",
      },
      status: "provisional",
      publish: true,
      note: "Uses the current public campaign number; confirm with the client.",
    } satisfies PublishableField<{ display: string; href: string }>,
    address: {
      value:
        "Survey No. 96,98, Vinayak Villa, Masma-Orma Road, Surat, Gujarat 394540",
      status: "provisional",
      publish: true,
      note: "Treat as a contact location, not a registered or head office. Call before visiting.",
    } satisfies PublishableField<string>,
    email: {
      value: null,
      status: "client-confirmation-required",
      publish: false,
      note: "Official company email has not been supplied.",
    } satisfies PublishableField<string>,
    businessHours: {
      value: null,
      status: "client-confirmation-required",
      publish: false,
    } satisfies PublishableField<string>,
    mapUrl: {
      value: null,
      status: "client-confirmation-required",
      publish: false,
    } satisfies PublishableField<string>,
  },
  social: {
    instagram: {
      label: "Instagram",
      href: "https://www.instagram.com/vm_brothers_33/",
      status: "verified" as VerificationStatus,
      publish: true,
    },
    facebook: {
      label: "Facebook",
      href: "https://www.facebook.com/vmbrothersurat/",
      status: "verified" as VerificationStatus,
      publish: true,
    },
    linkedin: {
      label: "LinkedIn",
      href: null,
      status: "client-confirmation-required" as VerificationStatus,
      publish: false,
    },
  },
  services: [
    {
      id: "residential",
      title: "Residential Properties",
      description:
        "Guidance for villas, row houses, apartments, and family homes suited to your location, budget, and lifestyle.",
    },
    {
      id: "commercial",
      title: "Commercial Opportunities",
      description:
        "Explore shops and commercial property opportunities with location and investment context explained clearly.",
    },
    {
      id: "buy-sell-rent",
      title: "Buy, Sell & Rent",
      description:
        "Practical support for residential and commercial property transactions across Surat.",
    },
    {
      id: "site-visits",
      title: "Project Discovery & Site Visits",
      description:
        "Shortlist relevant options, understand project features, and arrange guided site visits.",
    },
    {
      id: "market-guidance",
      title: "Market & Pricing Guidance",
      description:
        "Make informed decisions with current local-market context and property-specific guidance.",
    },
    {
      id: "booking",
      title: "Booking & Documentation",
      description:
        "Receive support through booking steps and documentation coordination for a smoother property journey.",
    },
    {
      id: "land-plots",
      title: "Land & Plot Enquiries",
      description:
        "Explore land and plot opportunities in Surat with practical guidance on location and suitability.",
    },
  ] satisfies ServiceItem[],
  workflow: [
    {
      id: "01",
      title: "Discover Your Direction",
      description:
        "We begin with a conversation about whether you want to buy, sell, rent, invest, or arrange a site visit.",
    },
    {
      id: "02",
      title: "Understand Your Requirements",
      description:
        "We begin with your preferred location, property type, budget, timeline, and purpose.",
    },
    {
      id: "03",
      title: "Shortlist Suitable Options",
      description:
        "Relevant residential or commercial opportunities are selected for focused consideration.",
    },
    {
      id: "04",
      title: "Visit & Evaluate",
      description:
        "We coordinate site visits and explain the available project and pricing information clearly.",
    },
    {
      id: "05",
      title: "Booking & Documentation",
      description:
        "Receive applicable booking and documentation coordination support when you choose to proceed.",
    },
    {
      id: "06",
      title: "Applicable After-sales Support",
      description:
        "Where it forms part of our role, we remain available for practical post-booking coordination.",
    },
  ] satisfies WorkflowStep[],
  values: [
    "Transparency",
    "Client-first guidance",
    "Local market knowledge",
    "Professional execution",
    "Integrity & trust",
    "End-to-end support",
  ],
  serviceAreas: ["Surat", "Masma-Orma", "Olpad Road", "Jahangirpura"],
  faqs: [
    {
      question: "What does VM Brothers do?",
      answer:
        "VM Brothers helps clients explore, buy, sell, and rent residential and commercial properties in Surat, with support that can include project discovery, site visits, pricing guidance, booking, and documentation coordination.",
    },
    {
      question: "Which areas does VM Brothers work in?",
      answer:
        "Public project activity is visible across Surat and growth corridors such as Masma-Orma, Olpad Road, and Jahangirpura. Contact the team for current location-specific options.",
    },
    {
      question: "Can I book a site visit?",
      answer:
        "Yes. Share your requirements through the enquiry form, phone, or WhatsApp and the team can coordinate a suitable site visit.",
    },
    {
      question: "Are the prices shown on the website final?",
      answer:
        "Project prices, offers, and availability can change. Contact VM Brothers for the latest project information before making a decision.",
    },
  ] satisfies FaqItem[],
  projects: [
    {
      slug: "sahjanand-bunglows-row-house",
      name: "Sahjanand Bunglows & Row House",
      location: "Orma-Masma Road, Surat",
      propertyType: "2 & 3 BHK G+1 homes",
      summary:
        "Multiple home formats designed for different family needs along the growing Orma-Masma Road corridor.",
      relationship: {
        value: null,
        status: "client-confirmation-required",
        publish: false,
        note: "Confirm whether VM Brothers is developer, exclusive marketer, or sales partner.",
      },
      price: {
        value: null,
        status: "client-confirmation-required",
        publish: false,
      },
      heroImage:
        "/wp-content/uploads/2026/02/Olivia-Harper-homes-Projects4-768x594.jpg",
      imageIsRepresentative: true,
      publish: true,
    },
    {
      slug: "shubh-aangan",
      name: "Shubh Aangan",
      location: "Masma-Orma / Olpad Road, Surat",
      propertyType: "2 & 3 BHK row houses",
      summary:
        "Community-focused homes with family-oriented living and access to the Masma-Orma growth corridor.",
      relationship: {
        value: "Project sales and marketing association",
        status: "verified",
        publish: true,
      },
      price: {
        value: null,
        status: "client-confirmation-required",
        publish: false,
      },
      heroImage:
        "/wp-content/uploads/2026/02/Florida-Luxury-Real-Estate-Olvia-Harper5-scaled.jpg",
      imageIsRepresentative: true,
      publish: true,
    },
    {
      slug: "vinayak-villa",
      name: "Vinayak Villa",
      location: "Masma, Surat",
      propertyType: "Villa community",
      summary:
        "A family-oriented villa opportunity in the Masma corridor. Contact the team for current configurations and inventory.",
      relationship: {
        value: "Project sales and marketing association",
        status: "verified",
        publish: true,
      },
      price: {
        value: null,
        status: "client-confirmation-required",
        publish: false,
      },
      heroImage:
        "/wp-content/uploads/2026/02/Design-Material-Curation--768x1152.jpg",
      imageIsRepresentative: true,
      publish: true,
    },
    {
      slug: "aarna-heights",
      name: "Aarna Heights",
      location: "Canal Road, Jahangirpura, Surat",
      propertyType: "1 BHK flats & shops",
      summary:
        "A spacious 1 BHK proposition with residential and commercial opportunities in Jahangirpura.",
      relationship: {
        value: "Project sales and marketing association",
        status: "verified",
        publish: true,
      },
      price: {
        value: null,
        status: "client-confirmation-required",
        publish: false,
      },
      heroImage:
        "/wp-content/uploads/2026/02/Florida-Luxury-Real-Estate3-scaled.jpg",
      imageIsRepresentative: true,
      publish: true,
    },
    {
      slug: "two-balcony-luxury-villa",
      name: "Formal project name required",
      location: "Near Masma, Surat",
      propertyType: "Villa project",
      summary: "Awaiting client-approved project identity and documentation.",
      relationship: {
        value: null,
        status: "client-confirmation-required",
        publish: false,
      },
      price: {
        value: null,
        status: "client-confirmation-required",
        publish: false,
      },
      heroImage:
        "/wp-content/uploads/2026/02/Florida-Luxury-Real-Estate2-768x384.jpg",
      imageIsRepresentative: true,
      publish: false,
    },
  ] satisfies VmProject[],
  projectDisclaimer:
    "Prices, availability, offers, and specifications are subject to change. Please contact VM Brothers for the latest project information.",
  assets: {
    heroVideo: {
      path: "/wp-content/uploads/2026/02/Home-2-1.mp4",
      isRepresentative: true,
    },
    logo: {
      path: null,
      status: "client-confirmation-required" as VerificationStatus,
    },
    founderPortrait: {
      path: null,
      status: "client-confirmation-required" as VerificationStatus,
    },
    representative: {
      founder:
        "/wp-content/uploads/2026/02/Florida-Luxury-Real-Estate-Olvia-Harper1-scaled.jpg",
      pageHeroes: {
        about: "/wp-content/uploads/2026/02/About-Team-Olivia-Harper-FL-1.jpg",
        services:
          "/wp-content/uploads/2026/02/Florida-Luxury-Real-Estate-Olvia-Harper4-scaled.jpg",
        workflow: "/wp-content/uploads/2026/02/Miami.jpg",
        projects: "/wp-content/uploads/2026/02/Florida-Luxury-Real-Estate3-scaled.jpg",
        contact: "/wp-content/uploads/2026/02/Realtors-Expert-in-Florida.jpg",
      },
      approach: [
        "/wp-content/uploads/2026/02/Miami.jpg",
        "/wp-content/uploads/2026/02/Olivia-Harper-Homes1.jpg",
        "/wp-content/uploads/2026/02/Florida-Luxury-Real-Estate-Olvia-Harper4-scaled.jpg",
      ],
    },
  },
} as const;

export const publishedProjects = siteContent.projects.filter(
  (project) => project.publish
);
