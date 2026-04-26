import { useState } from "react";

/**
 * PackEdge – Contact Page
 * -------------------------
 * Self-contained replacement for your existing Contact.jsx.
 * Includes ContactForm and MapEmbed inline — no child components needed.
 *
 * Form submissions go to your Strapi /api/customers endpoint.
 * Update STRAPI_API_URL below to match your deployment.
 *
 * To keep using your existing <ContactForm /> and <MapEmbed /> components,
 * simply swap the inline sections with your imports.
 */

const STRAPI_API_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

// ─── Dot-pattern SVG (reused from Categories page) ────────────────────────────
function DotPattern({ color = "#639922", opacity = 0.12 }) {
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity,
        pointerEvents: "none",
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="contact-dots"
          x="0"
          y="0"
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2.5" cy="2.5" r="1.5" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#contact-dots)" />
    </svg>
  );
}

// ─── Info card widget ─────────────────────────────────────────────────────────
function InfoCard({ icon, label, value, sub }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        padding: "16px 18px",
        borderRadius: 14,
        border: "0.5px solid #e4e4e0",
        background: "#fff",
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: "#EAF3DE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.09em",
            color: "#aaa",
            fontWeight: 500,
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>
          {value}
        </div>
        {sub && (
          <div style={{ fontSize: 12, color: "#999", marginTop: 1 }}>{sub}</div>
        )}
      </div>
    </div>
  );
}

// ─── Inline form field ────────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: "#555",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <span style={{ fontSize: 11, color: "#a32d2d" }}>{error}</span>
      )}
    </div>
  );
}

const inputStyle = (hasError) => ({
  width: "100%",
  padding: "10px 14px",
  border: `0.5px solid ${hasError ? "#e24b4a" : "#ccc"}`,
  borderRadius: 10,
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 13,
  color: "#1a1a1a",
  background: "#fafaf8",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  outline: "none",
});

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Message cannot be empty.";
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name])
      setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(`${STRAPI_API_URL}/api/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form }),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "3rem 2rem",
          gap: 16,
          border: "0.5px solid #c0dd97",
          borderRadius: 20,
          background: "#EAF3DE",
          minHeight: 300,
        }}
      >
        <div style={{ fontSize: 40 }}>✅</div>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "#27500A",
          }}
        >
          Message Sent!
        </div>
        <p style={{ fontSize: 13, color: "#3B6D11", maxWidth: 280 }}>
          Thanks for reaching out. Our team will get back to you within 1–2
          business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            padding: "8px 20px",
            borderRadius: 30,
            border: "0.5px solid #639922",
            background: "transparent",
            color: "#3B6D11",
            cursor: "pointer",
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        border: "0.5px solid #e4e4e0",
        borderRadius: 20,
        background: "#fff",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#1a1a1a",
            marginBottom: 4,
          }}
        >
          Send us a message
        </div>
        <p style={{ fontSize: 12, color: "#aaa", margin: 0 }}>
          Fill in the form below and we'll get back to you shortly.
        </p>
      </div>

      <Field label="Full name *" error={errors.name}>
        <input
          name="name"
          type="text"
          placeholder="e.g. Kasun Perera"
          value={form.name}
          onChange={handleChange}
          style={inputStyle(!!errors.name)}
          onFocus={(e) =>
            !errors.name && (e.target.style.borderColor = "#639922")
          }
          onBlur={(e) => (e.target.style.borderColor = errors.name ? "#e24b4a" : "#ccc")}
        />
      </Field>

      <Field label="Email address *" error={errors.email}>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          style={inputStyle(!!errors.email)}
          onFocus={(e) =>
            !errors.email && (e.target.style.borderColor = "#639922")
          }
          onBlur={(e) => (e.target.style.borderColor = errors.email ? "#e24b4a" : "#ccc")}
        />
      </Field>

      <Field label="Message *" error={errors.message}>
        <textarea
          name="message"
          placeholder="Tell us about your packaging needs…"
          value={form.message}
          onChange={handleChange}
          rows={5}
          style={{
            ...inputStyle(!!errors.message),
            resize: "vertical",
            lineHeight: 1.6,
          }}
          onFocus={(e) =>
            !errors.message && (e.target.style.borderColor = "#639922")
          }
          onBlur={(e) =>
            (e.target.style.borderColor = errors.message ? "#e24b4a" : "#ccc")
          }
        />
      </Field>

      {status === "error" && (
        <div
          style={{
            fontSize: 12,
            color: "#a32d2d",
            background: "#fcebeb",
            padding: "10px 14px",
            borderRadius: 10,
          }}
        >
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={status === "loading"}
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          fontWeight: 500,
          padding: "12px 24px",
          borderRadius: 30,
          border: "none",
          background: status === "loading" ? "#97C459" : "#639922",
          color: "#fff",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          transition: "background 0.2s",
          alignSelf: "flex-start",
        }}
        onMouseEnter={(e) => {
          if (status !== "loading") e.currentTarget.style.background = "#3B6D11";
        }}
        onMouseLeave={(e) => {
          if (status !== "loading") e.currentTarget.style.background = "#639922";
        }}
      >
        {status === "loading" ? "Sending…" : "Send message →"}
      </button>
    </div>
  );
}

// ─── Map Embed ────────────────────────────────────────────────────────────────
function MapEmbed() {
  // Creative Packaging (Pvt) Ltd – Piliyandala, Sri Lanka
  // Replace the src with your actual Google Maps embed URL if needed
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.4!2d79.9!3d6.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDgnMDAuMCJOIDc5wrA1NCcwMC4wIkU!5e0!3m2!1sen!2slk!4v1700000000000";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Info cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <InfoCard
          icon="📍"
          label="Address"
          value="No.300/C, Swarnapaya Wattha Road"
          sub="Madapatha Road, Piliyandala, Sri Lanka"
        />
        <InfoCard
          icon="📞"
          label="Phone"
          value="0112-829166 / 0714-286760"
          sub="Mon – Fri, 8:30 AM – 5:30 PM"
        />
        <InfoCard
          icon="✉️"
          label="Email"
          value="create-pack@sltnet.lk"
          sub="geetha_923@yahoo.com"
        />
        <InfoCard
          icon="🕐"
          label="Business Hours"
          value="Monday – Friday: 8:30 AM – 5:30 PM"
          sub="Saturday: 8:30 AM – 1:00 PM"
        />
      </div>

      {/* Map */}
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "0.5px solid #e4e4e0",
          position: "relative",
          height: 220,
        }}
      >
        <iframe
          title="Creative Packaging Company location"
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

// ─── Main Contact Page ────────────────────────────────────────────────────────
export default function Contact() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes peCardIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: "#fff",
          minHeight: "100vh",
          color: "#1a1a1a",
        }}
      >
        {/* ── Hero header ─────────────────────────────────────────────── */}
        <div
          style={{
            padding: "3.5rem 2.5rem 2.5rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <DotPattern color="#639922" opacity={0.07} />

          {/* Tag */}
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
              position: "relative",
              zIndex: 1,
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
              margin: "0 0 0.6rem",
              maxWidth: 520,
              position: "relative",
              zIndex: 1,
            }}
          >
            Get in{" "}
            <em style={{ fontStyle: "italic", color: "#639922" }}>Touch</em>{" "}
            with Us
          </h1>

          <p
            style={{
              fontSize: 15,
              color: "#888",
              fontWeight: 300,
              margin: 0,
              lineHeight: 1.6,
              maxWidth: 440,
              position: "relative",
              zIndex: 1,
            }}
          >
            Have a packaging need or a question? We'd love to hear from you.
            Reach out and our team will respond within 1–2 business days.
          </p>
        </div>

        {/* ── Divider ─────────────────────────────────────────────────── */}
        <div
          style={{
            height: "0.5px",
            background: "#e8e8e4",
            margin: "0 2.5rem",
          }}
        />

        {/* ── Two-column content ───────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 28,
            padding: "2.5rem 2.5rem 3rem",
            alignItems: "start",
            animation: "peCardIn 0.4s ease both",
          }}
        >
          <ContactForm />
          <MapEmbed />
        </div>
      </div>
    </>
  );
}