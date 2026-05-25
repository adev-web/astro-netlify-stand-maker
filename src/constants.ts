export const WHATSAPP_NUMBER: string = import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? "50767890123";

export const R2_PUBLIC_URL: string = import.meta.env.PUBLIC_R2_PUBLIC_URL ?? "";

export function r2(path: string): string {
  const base = R2_PUBLIC_URL.replace(/\/+$/, "");
  const p = path.replace(/^\/+/, "");
  return base ? `${base}/${p}` : `/uploads/${p}`;
}

export function whatsappUrl(text?: string): string {
  if (!text) return `https://wa.me/${WHATSAPP_NUMBER}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
