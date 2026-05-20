export const WHATSAPP_NUMBER: string = import.meta.env.PUBLIC_WHATSAPP_NUMBER;

export function whatsappUrl(text?: string): string {
  if (!text) return `https://wa.me/${WHATSAPP_NUMBER}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
