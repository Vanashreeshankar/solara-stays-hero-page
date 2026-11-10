import { ArrowRight, Play } from "lucide-react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        {/* Eyebrow label */}
        <p className="hero-eyebrow">
          Curated Escapes
        </p>

        {/* Main heading */}
        <h1 className="hero-title">
          <span>Stay Closer</span>

          <span>
            to <em>Nature</em>
          </span>
        </h1>

        {/* Description (the {" "} keeps a space where the line break is hidden on mobile) */}
        <p className="hero-description">
          Boutique stays in breathtaking locations{" "}
          <br />
          for those who seek more than just a stay.
        </p>

        {/* Hero actions */}
        <div className="hero-actions">

          <a href="#stays" className="explore-button">
            Explore Stays
            <ArrowRight size={17} strokeWidth={1.8} />
          </a>

          <a href="#story" className="story-button">

            <span className="play-circle">
              <Play
                size={17}
                fill="currentColor"
                strokeWidth={1}
              />
            </span>

            <span>Watch the Story</span>

          </a>

        </div>

      </div>

    </section>
  );
}

export default Hero;