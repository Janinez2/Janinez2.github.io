import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronRight,
  Briefcase,
  Heart,
  User,
  Mail,
  Github,
  Linkedin,
  FileText,
  Home,
  ExternalLink,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

type TimelineEntry = {
  id: string;
  year: string;
  title: string;
  org: string;
  location: string;
  duration: string;
  description: string;
  tags: string[];
  type: "professional" | "personal";
  color: string;
};

const professionalEntries: TimelineEntry[] = [
  {
    id: "p1",
    year: "2018",
    title: "Software Engineering Intern",
    org: "Brightwave Systems",
    location: "Boston, MA",
    duration: "Jun 2018 – Aug 2018",
    description:
      "Built internal tooling for real-time log aggregation across distributed services. Reduced mean time to debug by 40% through a custom alerting dashboard built with React and Python Flask.",
    tags: ["React", "Python", "Flask", "Redis"],
    type: "professional",
    color: "#38bdf8",
  },
  {
    id: "p2",
    year: "2019",
    title: "Junior Software Engineer",
    org: "Meridian Analytics",
    location: "Cambridge, MA",
    duration: "Jun 2019 – Dec 2020",
    description:
      "Developed data pipeline infrastructure processing 2M+ events/day for financial clients. Led migration from monolith to microservices architecture, improving deployment frequency 3×.",
    tags: ["Go", "Kafka", "PostgreSQL", "Docker"],
    type: "professional",
    color: "#38bdf8",
  },
  {
    id: "p3",
    year: "2021",
    title: "Software Engineer II",
    org: "Nexus Cloud",
    location: "San Francisco, CA",
    duration: "Jan 2021 – Mar 2023",
    description:
      "Core team member on the cloud orchestration platform. Owned the scheduler service used by 500+ enterprise clients. Filed two patents related to job-queue priority algorithms.",
    tags: ["Kubernetes", "Rust", "gRPC", "Terraform"],
    type: "professional",
    color: "#38bdf8",
  },
  {
    id: "p4",
    year: "2023",
    title: "Senior Software Engineer",
    org: "Orion Labs",
    location: "Remote",
    duration: "Apr 2023 – Present",
    description:
      "Technical lead on the ML inference platform serving 10M+ predictions daily. Reduced p99 latency from 420ms to 85ms. Mentoring a team of four engineers across two time zones.",
    tags: ["Python", "CUDA", "Ray", "AWS"],
    type: "professional",
    color: "#38bdf8",
  },
];

const personalEntries: TimelineEntry[] = [
  {
    id: "l1",
    year: "2017",
    title: "Summited Mt. Rainier",
    org: "Pacific Northwest Mountaineering Club",
    location: "Mount Rainier, WA",
    duration: "August 2017",
    description:
      "Completed the Liberty Ridge route — a 10-day expedition through some of the most challenging alpine terrain in the contiguous US. The experience reshaped how I think about preparation, trust, and incremental progress.",
    tags: ["Mountaineering", "Alpinism", "Team"],
    type: "personal",
    color: "#a78bfa",
  },
  {
    id: "l2",
    year: "2019",
    title: "Solo Motorcycle Journey",
    org: "Coast to Coast",
    location: "Portland, OR → Portland, ME",
    duration: "Jul – Aug 2019",
    description:
      "45-day solo ride across 14 states, covering 6,200 miles on a 2015 BMW R1200GS. Kept a daily journal — now a 90-page manuscript I keep meaning to edit. The silence on long highway stretches is its own kind of thinking.",
    tags: ["Motorcycles", "Writing", "Solo Travel"],
    type: "personal",
    color: "#a78bfa",
  },
  {
    id: "l3",
    year: "2021",
    title: "Open Source: Fennel DB",
    org: "Independent",
    location: "GitHub",
    duration: "Mar 2021 – Ongoing",
    description:
      "Authored and maintain Fennel DB, a lightweight embedded time-series store with 1.4k GitHub stars. Written in Zig. The constraints of open-source maintenance taught me more about API design than any job.",
    tags: ["Zig", "Open Source", "Systems"],
    type: "personal",
    color: "#a78bfa",
  },
  {
    id: "l4",
    year: "2024",
    title: "Completed First Ultramarathon",
    org: "Cascade 50K",
    location: "North Cascades, WA",
    duration: "June 2024",
    description:
      "Finished the Cascade 50K — 31 miles with 8,400ft of elevation gain — in 7h 42m. Trained for 14 months while working full-time. Placed 23rd overall in a field of 180.",
    tags: ["Trail Running", "Endurance", "Mountains"],
    type: "personal",
    color: "#a78bfa",
  },
];

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "professional", label: "Professional", icon: Briefcase },
  { id: "personal", label: "Personal", icon: Heart },
  { id: "about", label: "About", icon: User },
  { id: "contact", label: "Contact", icon: Mail },
];

// ─── Components ───────────────────────────────────────────────────────────────

function Modal({
  entry,
  onClose,
}: {
  entry: TimelineEntry | null;
  onClose: () => void;
}) {
  const isPro = entry?.type === "professional";
  const accentColor = isPro ? "#38bdf8" : "#a78bfa";

  useEffect(() => {
    if (!entry) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [entry, onClose]);

  if (!entry) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(4, 8, 18, 0.85)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-xl border overflow-hidden"
        style={{
          background: "#0e1628",
          borderColor: accentColor + "33",
          boxShadow: `0 0 60px ${accentColor}18, 0 24px 48px rgba(0,0,0,0.5)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p
                className="font-mono text-xs tracking-widest uppercase mb-1"
                style={{ color: accentColor }}
              >
                {entry.duration}
              </p>
              <h2
                className="text-2xl font-bold leading-tight mb-1"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.01em" }}
              >
                {entry.title}
              </h2>
              <p className="text-sm" style={{ color: "#6888aa" }}>
                {entry.org} · {entry.location}
              </p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 p-2 rounded-lg transition-colors"
              style={{ color: "#6888aa" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#e2e8f4";
                (e.currentTarget as HTMLButtonElement).style.background = "#162040";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#6888aa";
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <p className="text-sm leading-relaxed mb-6" style={{ color: "#a8c0e0" }}>
            {entry.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono"
                style={{
                  background: accentColor + "18",
                  color: accentColor,
                  border: `1px solid ${accentColor}30`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineNode({
  entry,
  onClick,
  isFirst,
  isLast,
}: {
  entry: TimelineEntry;
  onClick: () => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const isPro = entry.type === "professional";
  const accent = isPro ? "#38bdf8" : "#a78bfa";

  return (
    <div className="relative flex flex-col items-center" style={{ minWidth: 180 }}>
      {/* Connector line left */}
      {!isFirst && (
        <div
          className="absolute top-5 right-1/2 h-px"
          style={{
            width: "50%",
            background: `linear-gradient(90deg, transparent, ${accent}40)`,
          }}
        />
      )}
      {/* Connector line right */}
      {!isLast && (
        <div
          className="absolute top-5 left-1/2 h-px"
          style={{
            width: "50%",
            background: `linear-gradient(90deg, ${accent}40, transparent)`,
          }}
        />
      )}

      {/* Node button */}
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative z-10 flex flex-col items-center gap-3 group cursor-pointer"
        style={{ outline: "none" }}
      >
        {/* Circle */}
        <div
          className="relative flex items-center justify-center rounded-full transition-all duration-300"
          style={{
            width: 40,
            height: 40,
            background: hovered ? accent : "#162040",
            border: `2px solid ${hovered ? accent : accent + "60"}`,
            boxShadow: hovered ? `0 0 24px ${accent}50, 0 0 8px ${accent}30` : "none",
            transform: hovered ? "scale(1.15)" : "scale(1)",
            transition: "all 0.25s ease",
          }}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: hovered ? "#080d1a" : accent }}
          />
        </div>

        {/* Year badge */}
        <span
          className="font-mono text-xs font-medium tracking-widest"
          style={{ color: hovered ? accent : "#6888aa", transition: "color 0.2s" }}
        >
          {entry.year}
        </span>

        {/* Label */}
        <div
          className="text-center px-2 max-w-[160px]"
          style={{ maxWidth: 160 }}
        >
          <p
            className="text-xs font-semibold leading-tight mb-0.5"
            style={{
              color: hovered ? "#e2e8f4" : "#a8c0e0",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.02em",
              transition: "color 0.2s",
            }}
          >
            {entry.title}
          </p>
          <p
            className="text-xs leading-tight"
            style={{ color: "#4a6080", fontSize: "0.7rem", transition: "color 0.2s" }}
          >
            {entry.org}
          </p>
        </div>
      </button>
    </div>
  );
}

function TimelineTrack({
  entries,
  label,
  icon: Icon,
  accent,
  onSelect,
}: {
  entries: TimelineEntry[];
  label: string;
  icon: React.ElementType;
  accent: string;
  onSelect: (e: TimelineEntry) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="mb-16">
      {/* Track header */}
      <div className="flex items-center gap-3 mb-8 px-1">
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{ background: accent + "20", border: `1px solid ${accent}40` }}
        >
          <Icon size={15} style={{ color: accent }} />
        </div>
        <h2
          className="text-lg font-bold tracking-widest uppercase"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            color: accent,
            letterSpacing: "0.14em",
          }}
        >
          {label}
        </h2>
        <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${accent}40, transparent)` }} />
      </div>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex items-start gap-0 relative" style={{ minWidth: "max-content", paddingInline: 40 }}>
          {/* Base line */}
          <div
            className="absolute top-5 h-px"
            style={{
              left: 40,
              right: 40,
              background: `linear-gradient(90deg, transparent, ${accent}25, ${accent}25, transparent)`,
            }}
          />

          {entries.map((entry, i) => (
            <TimelineNode
              key={entry.id}
              entry={entry}
              onClick={() => onSelect(entry)}
              isFirst={i === 0}
              isLast={i === entries.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Sidebar({
  collapsed,
  onToggle,
  activeSection,
  onNav,
}: {
  collapsed: boolean;
  onToggle: () => void;
  activeSection: string;
  onNav: (id: string) => void;
}) {
  return (
    <aside
      className="fixed left-0 top-0 h-full z-30 flex flex-col transition-all duration-300 ease-in-out"
      style={{
        width: collapsed ? 60 : 220,
        background: "#0b1222",
        borderRight: "1px solid rgba(79, 195, 247, 0.1)",
        boxShadow: "4px 0 32px rgba(0,0,0,0.4)",
      }}
    >
      {/* Logo / toggle */}
      <div
        className="flex items-center px-3 py-5 shrink-0"
        style={{ minHeight: 72, borderBottom: "1px solid rgba(79,195,247,0.08)" }}
      >
        {!collapsed && (
          <div className="flex-1 overflow-hidden">
            <p
              className="text-sm font-bold tracking-widest uppercase whitespace-nowrap"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#4fc3f7" }}
            >
              Alex Morgan
            </p>
            <p className="text-xs whitespace-nowrap" style={{ color: "#4a6080" }}>
              Engineer & Explorer
            </p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg transition-colors shrink-0"
          style={{ color: "#6888aa" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4fc3f7")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6888aa")}
        >
          {collapsed ? <ChevronRight size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-4 overflow-hidden">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => onNav(id)}
              className="w-full flex items-center gap-3 px-3 py-3 transition-all duration-150 relative"
              style={{
                color: active ? "#4fc3f7" : "#6888aa",
                background: active ? "rgba(79,195,247,0.08)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.color = "#a8c0e0";
                  (e.currentTarget as HTMLElement).style.background = "rgba(79,195,247,0.04)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.color = "#6888aa";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }
              }}
            >
              {active && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5"
                  style={{ background: "#4fc3f7" }}
                />
              )}
              <Icon size={16} className="shrink-0" />
              {!collapsed && (
                <span
                  className="text-sm whitespace-nowrap overflow-hidden"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Social links */}
      <div
        className="py-4 px-3 flex flex-col gap-1 shrink-0"
        style={{ borderTop: "1px solid rgba(79,195,247,0.08)" }}
      >
        {[
          { icon: Github, label: "GitHub", href: "#" },
          { icon: Linkedin, label: "LinkedIn", href: "#" },
          { icon: FileText, label: "Resume", href: "#" },
        ].map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            className="flex items-center gap-3 px-1 py-2 rounded-lg transition-colors text-xs"
            style={{ color: "#4a6080" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#4fc3f7")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#4a6080")}
          >
            <Icon size={14} className="shrink-0" />
            {!collapsed && <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</span>}
          </a>
        ))}
      </div>
    </aside>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selected, setSelected] = useState<TimelineEntry | null>(null);

  const sidebarWidth = collapsed ? 60 : 220;

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#080d1a",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        activeSection={activeSection}
        onNav={setActiveSection}
      />

      {/* Main content */}
      <main
        className="min-h-screen transition-all duration-300 ease-in-out"
        style={{ paddingLeft: sidebarWidth }}
      >
        <div className="max-w-5xl mx-auto px-8 pt-16 pb-24">

          {/* Hero */}
          <header className="mb-20">
            <p
              className="font-mono text-xs tracking-widest uppercase mb-4"
              style={{ color: "#38bdf8" }}
            >
              Personal Website · 2024
            </p>
            <h1
              className="mb-4"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                fontWeight: 700,
                lineHeight: 1.0,
                color: "#e2e8f4",
                letterSpacing: "0.01em",
              }}
            >
              Alex Morgan
            </h1>
            <p
              className="text-base max-w-xl leading-relaxed"
              style={{ color: "#6888aa" }}
            >
              Senior engineer by day, mountaineer and open-source author by inclination.
              These timelines trace what I have built and where I have been.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 mt-8">
              <div className="h-px flex-1" style={{ background: "rgba(79,195,247,0.12)" }} />
              <span
                className="font-mono text-xs tracking-widest"
                style={{ color: "#4a6080" }}
              >
                SCROLL TIMELINES · CLICK NODES
              </span>
              <div className="h-px flex-1" style={{ background: "rgba(79,195,247,0.12)" }} />
            </div>
          </header>

          {/* Timelines */}
          <TimelineTrack
            entries={professionalEntries}
            label="Professional"
            icon={Briefcase}
            accent="#38bdf8"
            onSelect={setSelected}
          />
          <TimelineTrack
            entries={personalEntries}
            label="Personal"
            icon={Heart}
            accent="#a78bfa"
            onSelect={setSelected}
          />

          {/* About stub */}
          <section
            className="rounded-xl p-8 mt-4"
            style={{
              background: "#0e1628",
              border: "1px solid rgba(79,195,247,0.1)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ background: "#38bdf820", border: "1px solid #38bdf840" }}
              >
                <User size={15} style={{ color: "#38bdf8" }} />
              </div>
              <h2
                className="text-lg font-bold tracking-widest uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#38bdf8", letterSpacing: "0.14em" }}
              >
                About
              </h2>
            </div>
            <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "#a8c0e0" }}>
              I am a software engineer with six years of experience across distributed systems,
              cloud infrastructure, and ML platform work. Outside of work I climb mountains,
              run trails, ride motorcycles across continents, and maintain open-source projects
              that solve problems I actually have. I believe the best engineers are curious well
              beyond their domain, and I try to live that out.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 mt-5 text-xs font-mono tracking-widest uppercase transition-colors"
              style={{ color: "#38bdf8" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
            >
              Full Résumé <ExternalLink size={11} />
            </a>
          </section>
        </div>
      </main>

      {/* Modal */}
      <Modal entry={selected} onClose={() => setSelected(null)} />

      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
      `}</style>
    </div>
  );
}
