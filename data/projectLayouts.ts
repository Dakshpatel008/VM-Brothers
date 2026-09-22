import "server-only";
import samplePlans from "./temporaryFloorPlans.json";
import { publishedProjects as projects, type HomeLayout, type LayoutImage } from "./siteContent";

// Replace each layout's reference with its verified project drawings when supplied.
function temporaryFloorPlans(bedrooms: number): readonly LayoutImage[] {
  return samplePlans.filter((plan) => plan.bedrooms === bedrooms).map((plan) => ({
    src: plan.src, width: plan.width, height: plan.height,
    label: `${bedrooms} BHK — sample ${plan.unit}`,
    alt: `Temporary ${bedrooms}-bedroom reference plan ${plan.unit}; not an original project drawing`,
    isTemporaryPreview: true,
  }));
}

const projectLayouts: Record<string, readonly HomeLayout[]> = {
  "sahjanand-bunglows-row-house": [
        { slug: "2-bhk", title: "2 BHK", floorPlans: temporaryFloorPlans(2), description: "A 2 BHK G+1 home at Sahjanand Bunglows & Row House on Orma-Masma Road, Surat. Speak with VM Brothers to explore the home configuration and request its floor plan." },
        { slug: "3-bhk", title: "3 BHK", floorPlans: temporaryFloorPlans(3), description: "A 3 BHK G+1 home at Sahjanand Bunglows & Row House on Orma-Masma Road, Surat. Request the floor plan from VM Brothers to understand the arrangement of the home." },
      ],
  "shubh-aangan": [
        { slug: "2-bhk", title: "2 BHK", floorPlans: temporaryFloorPlans(2), description: "A 2 BHK row house at Shubh Aangan in the Masma-Orma / Olpad Road area of Surat. Connect with VM Brothers for the floor plan and guidance on this home configuration." },
        { slug: "3-bhk", title: "3 BHK", floorPlans: temporaryFloorPlans(3), description: "A 3 BHK row house at Shubh Aangan in the Masma-Orma / Olpad Road area of Surat. Request its floor plan and discuss your requirements with VM Brothers." },
      ],
  "vinayak-villa": [
        { slug: "2-bhk", title: "2 BHK", floorPlans: temporaryFloorPlans(2), description: "A 2 BHK villa configuration listed for Vinayak Villa in Masma, Surat. Contact VM Brothers for the floor plan and further details about the home." },
        { slug: "3-bhk", title: "3 BHK", floorPlans: temporaryFloorPlans(3), description: "A 3 BHK villa configuration listed for Vinayak Villa in Masma, Surat. Explore this home format with VM Brothers and request the floor plan." },
        { slug: "4-bhk", title: "4 BHK", floorPlans: temporaryFloorPlans(4), description: "A 4 BHK villa configuration listed for Vinayak Villa in Masma, Surat. Request the floor plan from VM Brothers to explore the arrangement of this home." },
      ],
  "aarna-heights": [
        { slug: "1-bhk", title: "1 BHK", floorPlans: temporaryFloorPlans(1), description: "A 1 BHK flat at Aarna Heights on Canal Road, Jahangirpura, Surat. Speak with VM Brothers for the floor plan and guidance on this residential configuration." },
      ],
  "two-balcony-luxury-villa": [],
};

export const publishedProjects = projects.map((project) => ({
  ...project,
  layouts: projectLayouts[project.slug] ?? [],
}));
