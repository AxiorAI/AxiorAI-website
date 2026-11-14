// Lets any section (e.g. the Domains stripe) ask the Work section to filter
// by a domain and scroll to the results.
export const DOMAIN_FILTER_EVENT = "axior:filter-domain";

export function selectDomain(domain: string) {
  window.dispatchEvent(new CustomEvent(DOMAIN_FILTER_EVENT, { detail: domain }));
  document.getElementById("work-filter")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
