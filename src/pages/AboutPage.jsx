import styles from "../css/About.module.css";
import { Link } from "react-router-dom";

const stats = [
  { value: "2019", label: "Founded" },
  { value: "50K+", label: "Happy Customers" },
  { value: "1,200+", label: "Products" },
  { value: "30+", label: "Countries Served" },
];

const values = [
  {
    title: "Quality First",
    text: "Every product is checked against strict standards before it ever reaches your cart, so what you see is exactly what you get.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 3l2.6 5.27 5.82.85-4.21 4.1.99 5.8L12 16.6l-5.2 2.42.99-5.8-4.21-4.1 5.82-.85L12 3z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Built For Tomorrow",
    text: "We invest in smarter search, faster checkout, and an experience that keeps getting better the more you shop with us.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Customers, Not Carts",
    text: "Real people answer your questions, real reviews guide your choices, and real support has your back after you buy.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 21s-7.5-4.7-10-9.3C.5 8.1 2.4 4.5 6 4c2-.3 3.7.6 6 3 2.3-2.4 4-3.3 6-3 3.6.5 5.5 4.1 4 7.7C19.5 16.3 12 21 12 21z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <span className={styles.eyebrow}>Our Story</span>
        <h1 className={styles.heading}>
          We Design For <span className={styles.highlight}>The Future</span>
        </h1>
        <p className={styles.heroText}>
          We started with a simple idea: shopping online should feel as easy and
          personal as walking into your favorite store. Every feature we build,
          from search to checkout, exists to get you to the things you love a
          little faster.
        </p>

        <div className={styles.statsRow}>
          {stats.map((stat) => (
            <div className={styles.statCard} key={stat.label}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className={styles.story}>
        <div className={styles.storyImage} aria-hidden="true">
          <div className={styles.imageGlow} />
          <svg
            className={styles.storyArt}
            viewBox="0 0 420 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="dotGrid"
                width="22"
                height="22"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="1.4"
                  cy="1.4"
                  r="1.4"
                  fill="rgba(244,243,251,0.14)"
                />
              </pattern>
              <linearGradient id="pathLine" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(167,139,250,0.15)" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
              <linearGradient id="nodeFill" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#7c5cff" />
              </linearGradient>
            </defs>

            <rect width="420" height="320" fill="url(#dotGrid)" />

            <path
              d="M56 250 C 140 250, 150 170, 210 165 S 300 90, 360 70"
              stroke="url(#pathLine)"
              strokeWidth="2.5"
              strokeDasharray="1 10"
              strokeLinecap="round"
            />

            {/* small starting node */}
            <rect
              x="40"
              y="236"
              width="30"
              height="30"
              rx="8"
              fill="rgba(167,139,250,0.14)"
              stroke="#a78bfa"
              strokeWidth="1.4"
            />

            {/* mid node */}
            <rect
              x="192"
              y="140"
              width="44"
              height="44"
              rx="10"
              fill="rgba(167,139,250,0.18)"
              stroke="#a78bfa"
              strokeWidth="1.4"
            />

            {/* large arrival node */}
            <g>
              <circle
                cx="382"
                cy="70"
                r="42"
                stroke="rgba(167,139,250,0.35)"
                strokeWidth="1"
              />
              <rect
                x="352"
                y="42"
                width="58"
                height="58"
                rx="14"
                fill="url(#nodeFill)"
              />
              <path
                d="M368 71l9 9 17-19"
                stroke="#0a0a1a"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
        <div className={styles.storyContent}>
          <h2 className={styles.sectionHeading}>How It Started</h2>
          <p className={styles.storyText}>
            What began as a small catalog of curated products has grown into a
            platform trusted by shoppers around the world. We&apos;re still the
            same team obsessing over the little details — clean navigation,
            honest product info, and a checkout that never gets in your way.
          </p>
          <p className={styles.storyText}>
            Behind every order is a group of people who care about getting it
            right, from the first click to the moment it arrives at your door.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className={styles.values}>
        <h2 className={styles.sectionHeadingCenter}>What We Stand For</h2>
        <div className={styles.valuesGrid}>
          {values.map((value) => (
            <div className={styles.valueCard} key={value.title}>
              <div className={styles.valueIcon}>{value.icon}</div>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueText}>{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <h2 className={styles.ctaHeading}>Ready To Find Something You Love?</h2>
        <p className={styles.ctaText}>
          Explore the full collection and see what everyone&apos;s talking
          about.
        </p>
        <Link to={"/products"}>
          <button className={styles.ctaButton} type="button">
            Explore Our Collection
          </button>
        </Link>
      </section>
    </div>
  );
}
