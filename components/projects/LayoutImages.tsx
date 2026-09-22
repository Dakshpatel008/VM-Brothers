"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { LayoutImage } from "@/data/siteContent";

const LayoutLightbox = dynamic(() => import("./LayoutLightbox"), {
  ssr: false,
  loading: () => <p role="status" className="mt-3 text-sm">Opening image…</p>,
});

export default function LayoutImages({ images, plans = false }: {
  images: readonly LayoutImage[];
  plans?: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const [index, setIndex] = useState(-1);
  const [hasOpened, setHasOpened] = useState(false);
  if (!images.length) return null;

  return (
    <div>
      <div className={plans ? "" : "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"}>
        {(plans ? [images[selected]] : images).map((asset, imageIndex) => (
          <figure key={asset.src}>
            <button
              type="button"
              aria-label={`Enlarge ${asset.label}`}
              onClick={() => { setHasOpened(true); setIndex(plans ? selected : imageIndex); }}
              className={`block w-full cursor-zoom-in overflow-hidden rounded-xl bg-white focus-visible:outline-2 focus-visible:outline-offset-4 ${plans ? "p-4 md:p-8" : ""}`}
            >
              <Image src={asset.src} alt={asset.alt} width={asset.width} height={asset.height}
                loading={plans ? "eager" : "lazy"}
                sizes={plans ? "(min-width: 1280px) 672px, (min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
                className={plans ? "h-[40vh] min-h-64 w-full object-contain lg:h-[60vh]" : "h-auto w-full"}
              />
            </button>
            <figcaption className="mt-3 text-sm text-[#313131]/75">{asset.label} <span className="text-xs">— Select to enlarge</span></figcaption>
          </figure>
        ))}
      </div>
      {plans && images.length > 1 && (
        <div aria-label="Floor drawings" className="mt-6 flex flex-wrap gap-3">
          {images.map((asset, imageIndex) => (
            <button key={asset.src} type="button" aria-pressed={selected === imageIndex}
              onClick={() => setSelected(imageIndex)}
              className="min-h-11 rounded-full border border-[#313131]/30 px-5 py-3 text-sm hover:bg-[#EAE6DF] aria-pressed:bg-[#313131] aria-pressed:text-white">
              {asset.label}
            </button>
          ))}
        </div>
      )}
      {hasOpened && <LayoutLightbox images={images} index={index} close={() => setIndex(-1)} />}
    </div>
  );
}
