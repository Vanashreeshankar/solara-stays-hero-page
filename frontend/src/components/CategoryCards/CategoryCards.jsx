import { Waves, TreePine } from "lucide-react";

import "./CategoryCards.css";

/*
  Mountain Retreats icon: three-leaf sprout, drawn to match the design.
  It takes the same props as a lucide-react icon (size, strokeWidth,
  className), so it can be used in the list below like any other icon.
*/
function SproutLeavesIcon({ size = 24, strokeWidth = 2, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {/* stem */}
      <path d="M11.4 21.6V15.5" />

      {/* centre leaf */}
      <path d="M11.8 15.6C8 12.6 7.8 6.6 11.9 1.8c3.8 4.4 3.6 10.2-.1 13.8Z" />

      {/* left leaf */}
      <path d="M11.4 17.4C5.2 19.4 1.2 14.8 1 9c5.3-.2 9.6 2.7 10.4 8.4Z" />

      {/* right leaf */}
      <path d="M11.8 17.4c6.3 1.6 10.6-2.2 11.4-8.4-5.6-.4-10 2.2-11 8.2" />

      {/* inner vein where the right leaf overlaps the centre leaf */}
      <path d="M12.6 15.2c.8-2.4 2.6-4 4.6-4.8" />
    </svg>
  );
}

const categories = [
  {
    id: 1,
    title: "Mountain",
    subtitle: "Retreats",
    icon: SproutLeavesIcon,
  },
  {
    id: 2,
    title: "Ocean",
    subtitle: "Escapes",
    icon: Waves,
  },
  {
    id: 3,
    title: "Forest",
    subtitle: "Hideaways",
    icon: TreePine,
  },
];

function CategoryCards() {
  return (
    <section className="category-cards">

      {categories.map((category) => {
        const Icon = category.icon;

        return (
          <a
            href={`#${category.title.toLowerCase()}`}
            className="category-card"
            key={category.id}
          >
            <Icon
              className="category-icon"
              size={29}
              strokeWidth={1.3}
            />

            <div className="category-text">
              <span>{category.title}</span>
              <span>{category.subtitle}</span>
            </div>

          </a>
        );
      })}

    </section>
  );
}

export default CategoryCards;