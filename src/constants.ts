export const WHATSAPP_NUMBER = import.meta.env.PUBLIC_WHATSAPP_NUMBER || "50767890123";

export function whatsappUrl(text?: string): string {
  if (!text) return `https://wa.me/${WHATSAPP_NUMBER}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
