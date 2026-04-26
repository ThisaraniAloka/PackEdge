import { useState, useMemo } from "react";

/**
 * PackEdge – Categories Page
 * ----------------------------
 * Drop-in replacement for your existing Categories.jsx.
 *
 * Props (all optional – defaults are shown in the CATEGORIES array):
 *   categories  – array of category objects from your useCategories() hook
 *   loading     – boolean
 *   error       – string | null
 *
 * Category object shape expected from Strapi / your hook:
 * {
 *   id: number,
 *   name: string,
 *   description: string,
 *   productCount: number,       // optional – falls back to 0
 *   badge?: string,             // optional marketing label
 *   icon?: string,              // emoji fallback if no image
 *   image?: string,             // URL to category image (optional)
 *   accentColor?: string,       // hex bg for visual tile
 *   patternColor?: string,      // hex for dot pattern overlay
 * }
 *
 * If you pass raw Strapi categories they will still render using
 * the fallback palette defined in PALETTE below.
 */

// ─── Fallback demo data (replace with real API data) ─────────────────────────
const DEMO_CATEGORIES = [
  {
    id: 1,
    name: "Corrugated Boxes",
    description: "Heavy-duty shipping & storage solutions",
    icon: "📦",
    productCount: 32,
    badge: "Best Seller",
    accentColor: "#EAF3DE",
    patternColor: "#639922",
  },
  {
    id: 2,
    name: "Eco-Friendly Wraps",
    description: "Sustainable kraft & recycled materials",
    icon: "🌿",
    productCount: 24,
    badge: "Eco Pick",
    accentColor: "#E1F5EE",
    patternColor: "#1D9E75",
  },
  {
    id: 3,
    name: "Gift Packaging",
    description: "Elegant boxes, ribbons & decorative bags",
    icon: "🎁",
    productCount: 41,
    badge: "Popular",
    accentColor: "#FAEEDA",
    patternColor: "#EF9F27",
  },
  {
    id: 4,
    name: "Food Containers",
    description: "Safe, food-grade containers & trays",
    icon: "🥡",
    productCount: 28,
    badge: null,
    accentColor: "#FAECE7",
    patternColor: "#D85A30",
  },
  {
    id: 5,
    name: "Industrial Packaging",
    description: "Pallets, bulk bags & heavy load packs",
    icon: "🏭",
    productCount: 19,
    badge: null,
    accentColor: "#F1EFE8",
    patternColor: "#888780",
  },
  {
    id: 6,
    name: "Custom Branded",
    description: "Fully customisable design & print",
    icon: "🎨",
    productCount: 36,
    badge: "New",
    accentColor: "#E6F1FB",
    patternColor: "#378ADD",
  },
];

// Fallback palette cycles when categories have no accentColor set
const PALETTE = [
  { accentColor: "#EAF3DE", patternColor: "#639922" },
  { accentColor: "#E1F5EE", patternColor: "#1D9E75" },
  { accentColor: "#FAEEDA", patternColor: "#EF9F27" },
  { accentColor: "#FAECE7", patternColor: "#D85A30" },
  { accentColor: "#F1EFE8", patternColor: "#888780" },
  { accentColor: "#E6F1FB", patternColor: "#378ADD" },
];

// ─── Dot-pattern SVG background ───────────────────────────────────────────────
function DotPattern({ color, id }) {
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.15,
        pointerEvents: "none",
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2.5" cy="2.5" r="1.5" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

// ─── Category Card ────────────────────────────────────────────────────────────
function CategoryCard({ category, index, onClick }) {
  const palette = PALETTE[index % PALETTE.length];
  const accent = category.accentColor || palette.accentColor;
  const pattern = category.patternColor || palette.patternColor;
  const patternId = `dot-${category.id}-${index}`;

  return (
    <div
      onClick={() => onClick(category)}
      style={{
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "pointer",
        border: "0.5px solid #e2e2e2",
        background: "#fff",
        animation: `peCardIn 0.4s ease ${index * 0.07}s both`,
        transition: "transform 0.25s ease, border-color 0.25s ease",
        fontFamily: "'DM Sans', sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.borderColor = "#aaa";
        const arrow = e.currentTarget.querySelector(".pe-arrow");
        if (arrow) {
          arrow.style.background = "#639922";
          arrow.style.color = "#fff";
        }
        const icon = e.currentTarget.querySelector(".pe-icon");
        if (icon) icon.style.transform = "scale(1.12) rotate(-3deg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#e2e2e2";
        const arrow = e.currentTarget.querySelector(".pe-arrow");
        if (arrow) {
          arrow.style.background = "#f3f3f0";
          arrow.style.color = "#666";
        }
        const icon = e.currentTarget.querySelector(".pe-icon");
        if (icon) icon.style.transform = "scale(1) rotate(0deg)";
      }}
    >
      {/* Badge */}
      {category.badge && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontSize: "9px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            padding: "3px 9px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.88)",
            color: "#3B6D11",
            zIndex: 2,
          }}
        >
          {category.badge}
        </div>
      )}

      {/* Visual tile */}
      <div
        style={{
          height: 140,
          background: accent,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <DotPattern color={pattern} id={patternId} />

        {/* Image or emoji icon */}
        {category.image ? (
          <img
            src={category.image}
            alt={category.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              inset: 0,
            }}
          />
        ) : (
          <span
            className="pe-icon"
            style={{
              fontSize: 44,
              position: "relative",
              zIndex: 1,
              transition: "transform 0.3s ease",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
              display: "inline-block",
            }}
          >
            {category.icon || "📦"}
          </span>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: "14px 16px 16px" }}>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 15,
            fontWeight: 700,
            color: "#1a1a1a",
            marginBottom: 4,
            lineHeight: 1.2,
          }}
        >
          {category.name}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#888",
            fontWeight: 300,
            lineHeight: 1.5,
            marginBottom: 12,
          }}
        >
          {category.description}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              padding: "3px 10px",
              borderRadius: 20,
              background: "#f3f3f0",
              color: "#666",
            }}
          >
            {category.productCount ?? 0} products
          </span>
          <span
            className="pe-arrow"
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f3f3f0",
              color: "#666",
              fontSize: 13,
              transition: "background 0.2s, color 0.2s",
              userSelect: "none",
            }}
          >
            →
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "0.5px solid #e2e2e2",
        overflow: "hidden",
        animation: "pePulse 1.4s ease infinite",
      }}
    >
      <div style={{ height: 140, background: "#f0f0ee" }} />
      <div style={{ padding: "14px 16px 16px" }}>
        <div
          style={{
            height: 16,
            borderRadius: 8,
            background: "#ececea",
            marginBottom: 8,
            width: "70%",
          }}
        />
        <div
          style={{
            height: 12,
            borderRadius: 6,
            background: "#ececea",
            marginBottom: 14,
            width: "90%",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              height: 22,
              borderRadius: 20,
              background: "#ececea",
              width: 80,
            }}
          />
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "#ececea",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Categories({
  categories: propCategories,
  loading = false,
  error = null,
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");

  // Use prop data if provided, else fall back to demo data
  const source =
    propCategories && propCategories.length > 0
      ? propCategories
      : DEMO_CATEGORIES;

  const filtered = useMemo(() => {
    let list = source.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        (c.description || "").toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "alpha") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "count") list = [...list].sort((a, b) => (b.productCount ?? 0) - (a.productCount ?? 0));
    return list;
  }, [source, search, sort]);

  const totalProducts = source.reduce((s, c) => s + (c.productCount ?? 0), 0);

  // Navigate to products filtered by category – adapt to your router setup
  const handleCardClick = (category) => {
    // Example: window.location.href = `/products?category=${category.id}`;
    console.log("Navigate to category:", category.id, category.name);
  };

  return (
    <>
      {/* ── Keyframe styles ───────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes peCardIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pePulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.55; }
        }

        .pe-search::placeholder { color: #aaa; }
        .pe-search:focus { outline: none; border-color: #639922; }
        .pe-sort:focus   { outline: none; }
      `}</style>

      {/* ── Page wrapper ──────────────────────────────────────────────────── */}
      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: "#fff",
          minHeight: "100vh",
          color: "#1a1a1a",
        }}
      >
        {/* ── Hero header ───────────────────────────────────────────────── */}
        <div style={{ padding: "3.5rem 2.5rem 2rem" }}>
          {/* Company tag */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#888",
              border: "0.5px solid #ccc",
              borderRadius: 20,
              padding: "4px 14px",
              marginBottom: "1.2rem",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#639922",
                display: "inline-block",
              }}
            />
            Creative Packaging Co.
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.1,
              margin: "0 0 0.5rem",
              maxWidth: 500,
            }}
          >
            Browse Our{" "}
            <em style={{ fontStyle: "italic", color: "#639922" }}>Packaging</em>{" "}
            Collections
          </h1>

          <p
            style={{
              fontSize: 15,
              color: "#888",
              fontWeight: 300,
              margin: "0 0 2.5rem",
              lineHeight: 1.6,
              maxWidth: 420,
            }}
          >
            Discover our range of innovative, eco-friendly packaging solutions
            crafted for every industry and occasion.
          </p>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {[
              { val: source.length, lbl: "Categories" },
              null, // divider
              { val: `${totalProducts}+`, lbl: "Products" },
              null,
              { val: "100%", lbl: "Eco Certified" },
            ].map((item, i) =>
              item === null ? (
                <div
                  key={i}
                  style={{
                    width: 1,
                    height: 36,
                    background: "#ddd",
                  }}
                />
              ) : (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.6rem",
                      fontWeight: 700,
                      color: "#1a1a1a",
                      lineHeight: 1,
                    }}
                  >
                    {item.val}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "#999",
                      marginTop: 3,
                    }}
                  >
                    {item.lbl}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* ── Search & sort bar ─────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "0 2.5rem 2rem",
            flexWrap: "wrap",
          }}
        >
          {/* Search */}
          <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
            <span
              style={{
                position: "absolute",
                left: 13,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#aaa",
                fontSize: 15,
                pointerEvents: "none",
                lineHeight: 1,
              }}
            >
              ⌕
            </span>
            <input
              className="pe-search"
              type="text"
              placeholder="Search categories…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 14px 9px 36px",
                border: "0.5px solid #ccc",
                borderRadius: 30,
                background: "#f8f8f6",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                color: "#1a1a1a",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
            />
          </div>

          {/* Sort */}
          <select
            className="pe-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              color: "#666",
              border: "0.5px solid #ccc",
              borderRadius: 30,
              padding: "9px 16px",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            <option value="default">Default order</option>
            <option value="alpha">A → Z</option>
            <option value="count">Most products</option>
          </select>
        </div>

        {/* ── Error state ───────────────────────────────────────────────── */}
        {error && (
          <div
            style={{
              padding: "2rem 2.5rem",
              color: "#a32d2d",
              fontSize: 14,
              background: "#fcebeb",
              margin: "0 2.5rem",
              borderRadius: 12,
              marginBottom: "1.5rem",
            }}
          >
            {error}
          </div>
        )}

        {/* ── Category grid ─────────────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
            gap: 14,
            padding: "0 2.5rem 3rem",
          }}
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : filtered.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "3rem 1rem",
                color: "#aaa",
                fontSize: 14,
              }}
            >
              No categories match your search.
            </div>
          ) : (
            filtered.map((cat, i) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                index={i}
                onClick={handleCardClick}
              />
            ))
          )}
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────── */}
        <div
          style={{
            padding: "1.5rem 2.5rem",
            borderTop: "0.5px solid #e8e8e6",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 12, color: "#aaa" }}>
            Showing {filtered.length} of {source.length} categories
          </span>

          {/* Optional CTA – link to contact or custom order form */}
          <a
            href="/contact"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              padding: "8px 20px",
              borderRadius: 30,
              border: "0.5px solid #639922",
              background: "transparent",
              color: "#3B6D11",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#639922";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#3B6D11";
            }}
          >
            Request custom packaging →
          </a>
        </div>
      </div>
    </>
  );
}