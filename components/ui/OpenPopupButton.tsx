"use client";

import { openContactPopup } from "@/lib/popup";

interface Props {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  service?: string;
}

export default function OpenPopupButton({ children, className, style, service }: Props) {
  return (
    <button
      type="button"
      onClick={() => openContactPopup(service)}
      className={className}
      style={style}
    >
      {children}
    </button>
  );
}
