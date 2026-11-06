"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";

type Props = {
  before: StaticImageData;
  after: StaticImageData;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
  /** 0-100, where the divider starts. Defaults to roughly the middle. */
  initialPosition?: number;
  /**
   * false renders a fixed, non-draggable preview (used for gallery grid
   * cards, which are themselves a link to the full case study - a
   * draggable control inside a link creates a click/drag conflict).
   */
  interactive?: boolean;
  className?: string;
  sizes?: string;
};

// Single accessible comparison slider: one frame, two images, a draggable
// divider - not two photos side by side. Built on a native <input
// type="range"> rather than custom pointer/touch handlers, because the
// range input already gives correct mouse, touch and keyboard behaviour
// (arrow keys, Home/End, click-to-jump, drag) for free, in every browser,
// with no extra dependency. Its native track/thumb are made transparent
// via CSS and a hand-drawn divider + handle are layered on top purely for
// visuals; the input itself still receives focus so :focus-visible and
// screen readers work normally.
//
// The before/after images share one fixed-aspect-ratio frame and both use
// object-fit: cover, so mismatched source dimensions don't distort or
// misalign the comparison - but cover can only correct for frame-filling,
// not for a badly mismatched photo pair. Original photos should already be
// shot from close to the same angle and distance; this component does not
// attempt to auto-align them.
export default function BeforeAfterSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
  initialPosition = 50,
  interactive = true,
  className,
  sizes = "(max-width: 640px) 100vw, 50vw",
}: Props) {
  const [position, setPosition] = useState(initialPosition);

  return (
    <div className={`ba-slider${interactive ? "" : " ba-slider--static"}${className ? ` ${className}` : ""}`}>
      <div className="ba-layer">
        <Image src={after} alt={afterAlt} fill sizes={sizes} style={{ objectFit: "cover" }} />
      </div>

      <div className="ba-before-wrap" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <div className="ba-layer">
          <Image src={before} alt={beforeAlt} fill sizes={sizes} style={{ objectFit: "cover" }} />
        </div>
      </div>

      <span className="ba-label ba-label--before">{beforeLabel}</span>
      <span className="ba-label ba-label--after">{afterLabel}</span>

      <div className="ba-divider" style={{ left: `${position}%` }} />
      <div className="ba-handle" style={{ left: `${position}%` }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="8 7 3 12 8 17" />
          <polyline points="16 7 21 12 16 17" />
        </svg>
      </div>

      {interactive && (
        <input
          type="range"
          className="ba-range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`${beforeLabel} / ${afterLabel}`}
          aria-valuetext={`${position}%`}
        />
      )}
    </div>
  );
}
