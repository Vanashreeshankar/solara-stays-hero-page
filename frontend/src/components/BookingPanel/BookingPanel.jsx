import CategoryCards from "../CategoryCards/CategoryCards";
import BookingBar from "../BookingBar/BookingBar";
import "./BookingPanel.css";

/*
  Wavy panel outline, in 0..1 coordinates so it stretches to any panel size.
  It is used twice: as the clip-path of the glass panel, and as the thin
  gold outline drawn on top of it.
*/
const PANEL_PATH =
  "M0.071,0.247 " +
  "C0.071,0.158 0.138,0.114 0.243,0.111 " +
  "C0.381,0.108 0.455,0.119 0.550,0.078 " +
  "C0.646,0.037 0.720,0.001 0.815,0.001 " +
  "C0.932,0.001 1,0.089 1,0.267 " +
  "L1,0.719 " +
  "C1,0.911 0.910,1 0.783,1 " +
  "C0.635,1 0.550,0.908 0.402,0.908 " +
  "C0.233,0.905 0,0.952 0,0.719 " +
  "C0,0.5 0.071,0.404 0.071,0.247 Z";

/*
  Wraps the category cards and the booking bar.

  - Above 760px the wrapper is invisible (display: contents), so both
    children keep their own absolute positions exactly as before.
  - At 760px and below it becomes one wavy glass panel that holds the three
    categories on top and the booking form below, like the mobile design.
*/
function BookingPanel() {
  return (
    <div className="booking-panel">
      {/* clip-path + gradient definitions (zero size, no layout impact) */}
      <svg
        className="panel-defs"
        width="0"
        height="0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id="panel-clip" clipPathUnits="objectBoundingBox">
            <path d={PANEL_PATH} />
          </clipPath>

          {/* main outline: bright cream top, dim middle, warm orange glow at the bottom */}
          <linearGradient id="panel-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff3dc" stopOpacity="0.95" />
            <stop offset="0.2" stopColor="#f8e0b8" stopOpacity="0.6" />
            <stop offset="0.45" stopColor="#c9a063" stopOpacity="0.28" />
            <stop offset="0.72" stopColor="#e9a060" stopOpacity="0.65" />
            <stop offset="1" stopColor="#ffb36b" stopOpacity="1" />
          </linearGradient>

          {/* thin white highlight that catches the light along the top edge */}
          <linearGradient id="panel-sheen" x1="0" y1="0" x2="1" y2="0.35">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.3" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="0.62" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.82" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* soft blur for the glow under the outline */}
          <filter
            id="panel-blur"
            x="-10%"
            y="-10%"
            width="120%"
            height="120%"
          >
            <feGaussianBlur stdDeviation="0.012" />
          </filter>
        </defs>
      </svg>

      {/* gold outline that follows the wavy edge */}
      <svg
        className="panel-outline"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* 1. soft glow */}
        <path
          className="panel-outline-glow"
          d={PANEL_PATH}
          vectorEffect="non-scaling-stroke"
        />

        {/* 2. main gradient outline */}
        <path
          className="panel-outline-main"
          d={PANEL_PATH}
          vectorEffect="non-scaling-stroke"
        />

        {/* 3. glossy white sheen on top */}
        <path
          className="panel-outline-sheen"
          d={PANEL_PATH}
          vectorEffect="non-scaling-stroke"
        />

        {/* 4. faint inner offset line */}
        <path
          className="panel-outline-inner"
          d={PANEL_PATH}
          transform="translate(0.03 0.04) scale(0.94 0.93)"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <CategoryCards />
      <BookingBar />
    </div>
  );
}

export default BookingPanel;