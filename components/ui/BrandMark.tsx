interface BrandMarkProps {
  color?: "light" | "dark";
  size?: "header" | "footer" | "monogram";
  className?: string;
}

export default function BrandMark({
  color = "light",
  size = "header",
  className = "",
}: BrandMarkProps) {
  const textColor = color === "light" ? "text-white" : "text-[#313131]";

  if (size === "monogram") {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex h-20 w-20 items-center justify-center rounded-full border font-gallient text-3xl tracking-[-0.08em] ${
          color === "light" ? "border-white/40" : "border-[#313131]/30"
        } ${textColor} ${className}`}
      >
        VM
      </span>
    );
  }

  return (
    <span
      className={`inline-flex flex-col items-center justify-center ${textColor} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`font-gallient leading-none tracking-[-0.08em] ${
          size === "footer" ? "text-4xl md:text-5xl" : "text-2xl md:text-3xl"
        }`}
      >
        VM
      </span>
      <span
        className={`font-bolton uppercase leading-none ${
          size === "footer"
            ? "mt-2 text-[11px] tracking-[0.42em] md:text-xs"
            : "mt-1 text-[8px] tracking-[0.34em] md:text-[9px]"
        }`}
      >
        Brothers
      </span>
    </span>
  );
}

