"use client";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import type { LayoutImage } from "@/data/siteContent";

export default function LayoutLightbox({ images, index, close }: {
  images: readonly LayoutImage[];
  index: number;
  close: () => void;
}) {
  return (
    <Lightbox open={index >= 0} close={close} index={Math.max(0, index)}
      slides={images.map(({ src, alt, width, height }) => ({ src, alt, width, height }))}
      plugins={[Zoom]} carousel={{ finite: images.length === 1 }} controller={{ aria: true }}
      render={images.length === 1 ? { buttonPrev: () => null, buttonNext: () => null } : undefined}
    />
  );
}
