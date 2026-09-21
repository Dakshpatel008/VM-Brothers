import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1A1A1A",
          color: "#EEEBE4",
          fontFamily: "serif",
          fontSize: 25,
          letterSpacing: "-2px",
          border: "2px solid #B6AB99",
          borderRadius: "14px",
        }}
      >
        VM
      </div>
    ),
    size
  );
}

