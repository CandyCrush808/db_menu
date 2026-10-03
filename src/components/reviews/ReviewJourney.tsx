import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";
import { reviews, cardTilt } from "@/data/reviews";
import { ReviewPath, PATH_VIEWBOX } from "./ReviewPath";
import { ReviewAuto, AUTO_ASPECT } from "./ReviewAuto";
import { ReviewCard } from "./ReviewCard";
import { ReviewControls } from "./ReviewControls";
import { ReviewAccents } from "./ReviewAccents";
const PATH_ID = "deli-belly-journey-path",
  PROGRESS_ID = "deli-belly-journey-progress",
  STOPS_GROUP_ID = "deli-belly-journey-stops";
const TRAVEL = 0.38,
  PARKED_AT = 0.55;
const STOP_FRACTION = (n: number) => (n + 1) / (reviews.length + 1);
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
export function ReviewJourney() {
  const isMobile = useIsMobile(),
    variant = isMobile ? "mobile" : "desktop";
  const sectionRef = useRef<HTMLDivElement>(null),
    sceneRef = useRef<HTMLDivElement>(null),
    frameRef = useRef<HTMLDivElement>(null),
    autoRef = useRef<HTMLDivElement>(null),
    cardRefs = useRef<Array<HTMLDivElement | null>>([]),
    slotRefs = useRef<Array<HTMLDivElement | null>>([]),
    triggerRef = useRef<ScrollTrigger | null>(null);
  const [activeIndex, setActiveIndex] = useState(0),
    [reduced, setReduced] = useState(false);
  const total = reviews.length,
    autoWidth = isMobile ? 132 : 224;
  useEffect(() => setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);
  useLayoutEffect(() => {
    if (reduced || !sectionRef.current || !sceneRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const scene = sceneRef.current,
      frame = frameRef.current,
      path = scene.querySelector<SVGPathElement>(`#${PATH_ID}`),
      auto = autoRef.current;
    if (!path || !auto || !frame) return;
    const ctx = gsap.context(() => {
      const length = path.getTotalLength(),
        vb = PATH_VIEWBOX[variant],
        autoHeight = autoWidth / AUTO_ASPECT,
        xTo = gsap.quickTo(auto, "x", { duration: 0.35, ease: "power2.out" }),
        yTo = gsap.quickTo(auto, "y", { duration: 0.35, ease: "power2.out" }),
        rTo = gsap.quickTo(auto, "rotation", { duration: 0.6, ease: "power2.out" }),
        bounce = gsap.to(auto, {
          yPercent: -0.8,
          duration: 0.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          paused: true,
        }),
        stopsGroup = scene.querySelector<SVGGElement>(`#${STOPS_GROUP_ID}`),
        progressPath = scene.querySelector<SVGPathElement>(`#${PROGRESS_ID}`);
      if (stopsGroup) {
        reviews.forEach((_, i) => {
          const pt = path.getPointAtLength(STOP_FRACTION(i) * length),
            c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          c.setAttribute("cx", pt.x.toFixed(1));
          c.setAttribute("cy", pt.y.toFixed(1));
          c.setAttribute("r", isMobile ? "5" : "7");
          c.setAttribute("data-stop", String(i));
          stopsGroup.appendChild(c);
        });
      }
      if (progressPath) progressPath.style.strokeDasharray = `${length} ${length}`;
      const positionCards = () => {
        const rect = frame.getBoundingClientRect(),
          sx = rect.width / vb.w,
          sy = rect.height / vb.h,
          gap = autoHeight * (isMobile ? 0.55 : 0.62) + (isMobile ? 26 : 30),
          TOP_SAFE = isMobile ? 56 : 104,
          BOTTOM_SAFE = 88;
        slotRefs.current.forEach((slot, i) => {
          if (!slot) return;
          const pt = path.getPointAtLength(STOP_FRACTION(i) * length),
            px = pt.x * sx,
            py = pt.y * sy,
            w = slot.offsetWidth,
            h = slot.offsetHeight,
            aboveTop = py - h - gap,
            belowTop = py + gap,
            fitsAbove = aboveTop >= TOP_SAFE,
            fitsBelow = belowTop + h <= rect.height - BOTTOM_SAFE,
            preferAbove = py > rect.height * 0.5;
          let left = 0,
            top;
          if (preferAbove && fitsAbove) top = aboveTop;
          else if (!preferAbove && fitsBelow) top = belowTop;
          else if (fitsAbove) top = aboveTop;
          else if (fitsBelow) top = belowTop;
          else top = preferAbove ? aboveTop : belowTop;
          top = Math.max(8, Math.min(top, rect.height - h - BOTTOM_SAFE));
          const nudge = isMobile ? 0 : (i % 2 === 0 ? -1 : 1) * w * 0.16;
          left = Math.max(12, Math.min(px - w / 2 + nudge, rect.width - w - 12));
          slot.style.left = `${left.toFixed(1)}px`;
          slot.style.top = `${top.toFixed(1)}px`;
        });
      };
      let lastS = -1,
        lastAngle = 0;
      const pathProgress = (p: number) => {
        const unit = 1 / total,
          i = clamp(Math.floor(p / unit), 0, total - 1),
          t = clamp((p - i * unit) / unit),
          from = i === 0 ? 0 : STOP_FRACTION(i - 1),
          to = STOP_FRACTION(i);
        let s = from + (to - from) * easeInOut(clamp(t / TRAVEL));
        if (i === total - 1 && t > 0.85) s = to + (1 - to) * easeInOut(clamp((t - 0.85) / 0.15));
        return { s, i, t };
      };
      const render = (p: number) => {
        const rect = frame.getBoundingClientRect(),
          sx = rect.width / vb.w,
          sy = rect.height / vb.h,
          { s, i, t } = pathProgress(p),
          pt = path.getPointAtLength(s * length),
          ahead = path.getPointAtLength(Math.min(s * length + 8, length)),
          dx = (ahead.x - pt.x) * sx,
          dy = (ahead.y - pt.y) * sy,
          raw = Math.hypot(dx, dy) < 0.01 ? lastAngle : (Math.atan2(dy, dx) * 180) / Math.PI;
        lastAngle = raw;
        xTo(pt.x * sx - autoWidth / 2);
        yTo(pt.y * sy - autoHeight / 2);
        rTo(
          variant === "mobile"
            ? gsap.utils.clamp(-14, 14, raw - 90)
            : gsap.utils.clamp(-32, 32, raw),
        );
        const moving = Math.abs(s - lastS) > 0.0004;
        if (moving && bounce.paused()) bounce.play();
        if (!moving && !bounce.paused()) bounce.pause().progress(0);
        lastS = s;
        if (progressPath)
          progressPath.style.strokeDashoffset = `${(length * (1 - s)).toFixed(1)}px`;
        stopsGroup?.querySelectorAll("circle").forEach((c) => {
          const stop = Number(c.getAttribute("data-stop"));
          c.classList.toggle("stop-reached", stop <= i);
          c.classList.toggle("stop-active", stop === i);
        });
        cardRefs.current.forEach((card, idx) => {
          if (!card) return;
          let v = 0;
          if (idx === i) {
            const enter = clamp((t - TRAVEL * 0.55) / 0.2),
              exit = 1 - clamp((t - 0.86) / 0.12);
            v = Math.min(enter, exit);
          }
          const e = easeInOut(v);
          gsap.set(card, {
            opacity: e,
            scale: 0.9 + 0.1 * e,
            y: 34 - 34 * e,
            rotation: cardTilt(idx) * (1 - e) - 6 * (1 - e),
            pointerEvents: v > 0.6 ? "auto" : "none",
          });
        });
        setActiveIndex((prev) => (prev === i ? prev : i));
      };
      triggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => {
          positionCards();
          render(self.progress);
        },
      });
      positionCards();
      render(0);
    }, sceneRef);
    return () => {
      triggerRef.current = null;
      ctx.revert();
    };
  }, [reduced, variant, isMobile, total, autoWidth]);
  const goTo = (i: number) => {
    const st = triggerRef.current;
    if (!st) return;
    const target = clamp(i, 0, total - 1),
      p = (target + PARKED_AT) / total;
    window.scrollTo({ top: st.start + (st.end - st.start) * p, behavior: "smooth" });
  };
  if (reduced)
    return (
      <section className="review-reduced">
        <h2 className="review-display-lg">THE REVIEW JOURNEY</h2>
        <p>A calm, static reading list — motion is turned off in your system settings.</p>
        <div>
          {reviews.map((r, i) => (
            <div key={r.id}>
              <ReviewCard review={r} index={i} total={total} />
            </div>
          ))}
        </div>
      </section>
    );
  return (
    <div ref={sectionRef} style={{ height: `${(total + 1) * 100}vh` }} className="relative">
      <div
        ref={sceneRef}
        className="review-journey-scene sticky top-0 h-screen w-full overflow-hidden"
      >
        <div ref={frameRef} className="review-journey-frame">
          <ReviewPath
            variant={variant}
            pathId={PATH_ID}
            progressId={PROGRESS_ID}
            stopsGroupId={STOPS_GROUP_ID}
          />
          <ReviewAccents />
          <p className="review-journey-title">
            EVERY BITE <span className="text-accent">HAS A STORY</span>
          </p>
          <ReviewAuto ref={autoRef} width={autoWidth} />
          {reviews.map((r, i) => (
            <div
              key={r.id}
              ref={(el) => {
                slotRefs.current[i] = el;
              }}
              className="absolute"
              style={{ width: isMobile ? "min(19.5rem,84vw)" : "min(26rem,28vw)" }}
            >
              <ReviewCard
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                review={r}
                index={i}
                total={total}
              />
            </div>
          ))}
        </div>
        <ReviewControls
          index={activeIndex}
          total={total}
          goTo={goTo}
          onPrev={() => goTo(activeIndex - 1)}
          onNext={() => goTo(activeIndex + 1)}
        />
      </div>
    </div>
  );
}
