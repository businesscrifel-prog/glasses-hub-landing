import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

export function StorefrontMotion() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false;
    let teardown = () => {};

    const setup = async () => {
      teardown();
      if (preference.matches || disposed) return;

      const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-reveal]"));
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.remove("scroll-reveal-pending");
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

      for (const target of targets) {
        // Keep the first viewport visible; only reveal content below the fold.
        if (target.getBoundingClientRect().top < window.innerHeight - 24) continue;
        target.classList.add("scroll-reveal-pending");
        observer.observe(target);
      }

      let destroyScroll = () => {};
      teardown = () => {
        observer.disconnect();
        targets.forEach((target) => target.classList.remove("scroll-reveal-pending"));
        destroyScroll();
      };

      try {
        const { default: Lenis } = await import("lenis");
        if (disposed || preference.matches) return;
        const scroll = new Lenis({
          autoRaf: true,
          duration: 1.35,
          wheelMultiplier: 0.8,
          smoothWheel: true,
          syncTouch: false,
          anchors: { offset: -110 },
          prevent: (node) => node.matches("textarea, [data-lenis-prevent], [role='dialog']"),
        });
        destroyScroll = () => scroll.destroy();
      } catch {
        // Native scrolling remains available if the enhancement cannot load.
      }
    };

    void setup();
    const onPreferenceChange = () => { void setup(); };
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      disposed = true;
      preference.removeEventListener("change", onPreferenceChange);
      teardown();
    };
  }, [pathname]);

  return null;
}