export function openContactPopup(service?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("veliq:open-popup", { detail: { service: service ?? "" } }));
}
