"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  company,
  serviceCatalog,
  allProducts,
  featuredProducts,
  brandList,
  blogPosts,
  socialPlatforms,
  academyCourses,
  whatsappLeadLink,
  type ProductItem,
  type ServiceItem,
} from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

// ─── Color Constants ────────────────────────────────────────────────
const C = {
  navy: "#0A1128",
  navyMid: "#0D1B3E",
  navyLight: "#111D4A",
  turquoise: "#00B4D8",
  turquoiseHover: "#0CB5E6",
  white: "#FFFFFF",
  offWhite: "#F8FAFC",
} as const;

// ─── CSS Keyframes Injected Once ────────────────────────────────────
const styleId = "kalinitech-animations";
if (typeof document !== "undefined" && !document.getElementById(styleId)) {
  const s = document.createElement("style");
  s.id = styleId;
  s.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    .anim-hidden { opacity: 0; }
    .anim-fadeInUp { animation: fadeInUp 0.7s ease-out forwards; }
    .anim-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
    .anim-slideInLeft { animation: slideInLeft 0.7s ease-out forwards; }
    .anim-slideInRight { animation: slideInRight 0.7s ease-out forwards; }
    .anim-scaleIn { animation: scaleIn 0.5s ease-out forwards; }
    .delay-100 { animation-delay: 0.1s; }
    .delay-200 { animation-delay: 0.2s; }
    .delay-300 { animation-delay: 0.3s; }
    .delay-400 { animation-delay: 0.4s; }
    .delay-500 { animation-delay: 0.5s; }
    .delay-600 { animation-delay: 0.6s; }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: ${C.turquoise}40; border-radius: 3px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${C.turquoise}80; }
  `;
  document.head.appendChild(s);
}

// ─── IntersectionObserver Hook ──────────────────────────────────────
function useScrollAnim() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("anim-hidden");
            const anim = (entry.target as HTMLElement).dataset.anim || "anim-fadeInUp";
            entry.target.classList.add(anim);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    el.querySelectorAll("[data-anim]").forEach((child) => {
      child.classList.add("anim-hidden");
      obs.observe(child);
    });
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Inline SVG Icons ───────────────────────────────────────────────
const Icons = {
  Code: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  ),
  Shield: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
  ),
  Laptop: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/></svg>
  ),
  Zap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
  ),
  Briefcase: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
  ),
  GraduationCap: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5"/></svg>
  ),
  Heart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  ),
  TrendingUp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
  ),
  Wifi: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>
  ),
  Newspaper: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8z"/></svg>
  ),
  MessageCircle: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  ChevronRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
  Trash: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
  ),
  Edit: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
  ),
  Sparkles: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z"/></svg>
  ),
  Clock: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Package: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
  ),
  Mail: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  MapPin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
};

type PageView =
  | "home"
  | "services"
  | "products"
  | "blog"
  | "about"
  | "academy"
  | "charity"
  | "contact"
  | "portal"
  | "automation";

const iconMap: Record<string, React.FC> = {
  Code: Icons.Code,
  Shield: Icons.Shield,
  Laptop: Icons.Laptop,
  Zap: Icons.Zap,
  Briefcase: Icons.Briefcase,
  GraduationCap: Icons.GraduationCap,
  Heart: Icons.Heart,
  TrendingUp: Icons.TrendingUp,
  Wifi: Icons.Wifi,
  Newspaper: Icons.Newspaper,
};

const serviceColors = [
  "from-[#0A1128] to-[#111D4A]",
  "from-[#00B4D8] to-[#0CB5E6]",
  "from-[#0D1B3E] to-[#111D4A]",
  "from-[#00B4D8] to-[#0A1128]",
  "from-[#111D4A] to-[#00B4D8]",
  "from-[#0A1128] to-[#0D1B3E]",
  "from-[#00B4D8] to-[#111D4A]",
  "from-[#0D1B3E] to-[#00B4D8]",
  "from-[#0A1128] to-[#00B4D8]",
  "from-[#111D4A] to-[#0D1B3E]",
];

// ─── Navigation ─────────────────────────────────────────────────────
function Navigation({
  current,
  onNavigate,
}: {
  current: PageView;
  onNavigate: (page: PageView) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { label: string; page: PageView }[] = [
    { label: "Home", page: "home" },
    { label: "Services", page: "services" },
    { label: "Products", page: "products" },
    { label: "Blog", page: "blog" },
    { label: "Academy", page: "academy" },
    { label: "Charity", page: "charity" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
    { label: "Automation", page: "automation" },
    { label: "Portal", page: "portal" },
  ];

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl border-b"
      style={{ backgroundColor: `${C.navy}ee`, borderColor: `${C.turquoise}20` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 font-bold text-lg tracking-tight"
          >
            <span style={{ color: C.turquoise }}>KALINITECH</span>
            <span className="text-white">SYSTEMS</span>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                style={{
                  color: current === item.page ? C.turquoise : "#94A3B8",
                  backgroundColor: current === item.page ? `${C.turquoise}15` : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (current !== item.page) {
                    e.currentTarget.style.color = C.white;
                    e.currentTarget.style.backgroundColor = `${C.turquoise}10`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (current !== item.page) {
                    e.currentTarget.style.color = "#94A3B8";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsappLeadLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: C.turquoise }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.turquoiseHover; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = C.turquoise; }}
            >
              <Icons.MessageCircle />
              WhatsApp
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-white transition-colors"
              style={{ color: C.white }}
            >
              {mobileOpen ? <Icons.X /> : <Icons.Menu />}
            </button>
          </div>
        </div>

        <div
          className="lg:hidden overflow-hidden transition-all duration-300"
          style={{ maxHeight: mobileOpen ? "600px" : "0px", opacity: mobileOpen ? 1 : 0 }}
        >
          <div className="pb-4 pt-2" style={{ borderTop: `1px solid ${C.turquoise}20` }}>
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => { onNavigate(item.page); setMobileOpen(false); }}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-left transition-all duration-300"
                  style={{
                    color: current === item.page ? C.turquoise : "#94A3B8",
                    backgroundColor: current === item.page ? `${C.turquoise}15` : "transparent",
                  }}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={whatsappLeadLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white px-3 py-2 rounded-lg text-sm font-semibold mt-2 justify-center transition-all duration-300"
                style={{ backgroundColor: C.turquoise }}
              >
                <Icons.MessageCircle /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Section Header ─────────────────────────────────────────────────
function SectionHeader({ badge, title, subtitle, light = false }: { badge: string; title: string; subtitle?: string; light?: boolean }) {
  const ref = useScrollAnim();
  return (
    <div ref={ref} className="text-center mb-12">
      <div data-anim="anim-fadeInUp">
        <Badge
          className="mb-4 text-xs font-semibold tracking-wider uppercase"
          style={{ backgroundColor: `${C.turquoise}15`, color: C.turquoise, borderColor: `${C.turquoise}30` }}
        >
          {badge}
        </Badge>
      </div>
      <h2
        data-anim="anim-fadeInUp"
        className="text-3xl sm:text-4xl font-bold mb-4"
        style={{ color: light ? C.white : C.navy }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          data-anim="anim-fadeInUp"
          className="text-lg max-w-2xl mx-auto"
          style={{ color: light ? "#94A3B8" : "#64748B" }}
        >
          {subtitle}
        </p>
      )}
      <div data-anim="anim-scaleIn" className="mx-auto mt-4 w-16 h-1 rounded-full" style={{ backgroundColor: C.turquoise }} />
    </div>
  );
}

// ─── Hero Section ───────────────────────────────────────────────────
function HeroSection({ onNavigate }: { onNavigate: (page: PageView) => void }) {
  const ref = useScrollAnim();
  return (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 50%, ${C.navyLight} 100%)` }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at top right, ${C.turquoise}15, transparent 60%)` }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at bottom left, ${C.turquoise}08, transparent 50%)` }} />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div data-anim="anim-fadeInUp">
              <Badge
                className="text-xs font-semibold tracking-wider uppercase"
                style={{ backgroundColor: `${C.turquoise}20`, color: C.turquoise, borderColor: `${C.turquoise}40` }}
              >
                Trusted Technology Partner in Kenya
              </Badge>
            </div>
            <h1 data-anim="anim-fadeInUp" className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
              <span style={{ color: C.turquoise }}>{company.name.split(" ")[0]}</span>
              <br />
              <span>{company.name.split(" ").slice(1).join(" ")}</span>
            </h1>
            <p data-anim="anim-slideInLeft" className="text-xl sm:text-2xl font-medium" style={{ color: C.turquoise }}>
              {company.tagline}
            </p>
            <p data-anim="anim-fadeInUp" className="text-lg leading-relaxed max-w-xl" style={{ color: "#94A3B8" }}>
              Your complete technology partner — from premium laptops and enterprise software to
              cybersecurity, digital marketing, and professional training. Serving Kenya and East Africa with excellence.
            </p>
            <div data-anim="anim-fadeInUp" className="flex flex-wrap gap-4">
              <a
                href={whatsappLeadLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
                style={{ backgroundColor: C.turquoise, boxShadow: `0 8px 32px ${C.turquoise}30` }}
              >
                <Icons.MessageCircle />
                Order on WhatsApp
              </a>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate("products")}
                className="px-6 py-3 rounded-xl text-lg border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                <Icons.Laptop />
                Browse Laptops
              </Button>
            </div>
            <div data-anim="anim-fadeInUp" className="flex items-center gap-6 text-sm" style={{ color: "#94A3B8" }}>
              <div className="flex items-center gap-2">
                <Icons.Check />
                <span>150+ Laptops</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.Check />
                <span>8 Brands</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.Check />
                <span>Nationwide Delivery</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.slice(0, 4).map((product, i) => (
              <Card
                key={product.name}
                className={`bg-white border-transparent overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                  i === 0 ? "col-span-2" : ""
                }`}
                data-anim={i === 0 ? "anim-scaleIn" : i === 1 ? "anim-slideInRight delay-100" : i === 2 ? "anim-slideInRight delay-200" : "anim-slideInRight delay-300"}
                onClick={() => window.open(whatsappLeadLink(product.name), "_blank")}
              >
                <div className="flex flex-col">
                  <div className="relative w-full bg-white" style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge
                      className="mb-2 text-xs font-medium"
                      style={{ backgroundColor: `${C.turquoise}15`, color: C.turquoise, borderColor: `${C.turquoise}30` }}
                    >
                      {product.brand}
                    </Badge>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2" style={{ color: C.navy }}>{product.name}</h3>
                    <p className="font-bold text-lg" style={{ color: C.turquoise }}>
                      KES {product.price.toLocaleString()}
                    </p>
                    <p className="text-xs" style={{ color: "#64748B" }}>{product.offer}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Services Section ───────────────────────────────────────────────
function ServicesSection() {
  const ref = useScrollAnim();
  return (
    <section className="py-20" style={{ backgroundColor: C.white }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Our Expertise"
          title="Comprehensive Technology Services"
          subtitle="From software development to cybersecurity, laptop sales to digital marketing — KALINITECH SYSTEMS delivers end-to-end technology solutions."
        />
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {serviceCatalog.map((service, idx) => {
            const IconComponent = iconMap[service.icon] || Icons.Code;
            return (
              <Card
                key={service.slug}
                className="group bg-white border-transparent hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                data-anim={`anim-fadeInUp delay-${Math.min(idx, 5) * 100}`}
                onClick={() => window.open(whatsappLeadLink(`${service.title} service`), "_blank")}
              >
                <CardContent className="p-5">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${serviceColors[idx % serviceColors.length]} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent />
                  </div>
                  <h3 className="font-semibold mb-2 text-sm" style={{ color: C.navy }}>{service.title}</h3>
                  <p className="text-xs line-clamp-3" style={{ color: "#64748B" }}>{service.description.slice(0, 100)}...</p>
                  <div className="mt-3 flex items-center text-xs font-medium gap-1" style={{ color: C.turquoise }}>
                    Learn More <Icons.ChevronRight />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Products Section ───────────────────────────────────────────────
function ProductsSection() {
  const [brandFilter, setBrandFilter] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [search, setSearch] = useState("");
  const ref = useScrollAnim();

  const filtered = allProducts.filter((p) => {
    const brandMatch = brandFilter === "All" || p.brand === brandFilter;
    const searchMatch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.processor.toLowerCase().includes(search.toLowerCase());
    let priceMatch = true;
    if (priceRange === "under30") priceMatch = p.price < 30000;
    else if (priceRange === "30to50") priceMatch = p.price >= 30000 && p.price < 50000;
    else if (priceRange === "50to80") priceMatch = p.price >= 50000 && p.price < 80000;
    else if (priceRange === "over80") priceMatch = p.price >= 80000;
    return brandMatch && searchMatch && priceMatch;
  });

  return (
    <section className="py-20" style={{ backgroundColor: C.offWhite }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Premium Laptops"
          title="Laptop Catalog — 150+ Models, 8 Brands"
          subtitle="Professional-grade refurbished and brand-new laptops at competitive KES pricing. Every device quality-assured with warranty support."
        />

        <div className="flex flex-wrap gap-3 mb-8 items-center">
          <Input
            placeholder="Search laptops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
            style={{ borderColor: `${C.turquoise}30` }}
          />
          <div className="flex flex-wrap gap-2">
            {brandList.map((brand) => (
              <Button
                key={brand}
                size="sm"
                variant={brandFilter === brand ? "default" : "outline"}
                onClick={() => setBrandFilter(brand)}
                style={
                  brandFilter === brand
                    ? { backgroundColor: C.turquoise, color: C.white, borderColor: C.turquoise }
                    : { borderColor: `${C.turquoise}30`, color: C.navy }
                }
              >
                {brand}
              </Button>
            ))}
          </div>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-44" style={{ borderColor: `${C.turquoise}30` }}>
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="under30">Under KES 30,000</SelectItem>
              <SelectItem value="30to50">KES 30K - 50K</SelectItem>
              <SelectItem value="50to80">KES 50K - 80K</SelectItem>
              <SelectItem value="over80">Over KES 80,000</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm mb-4" style={{ color: "#64748B" }}>
          Showing {filtered.length} of {allProducts.length} products
        </p>

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product, idx) => (
            <Card
              key={product.name}
              className="group bg-white border-transparent overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
              data-anim={`anim-fadeInUp delay-${(idx % 4) * 100}`}
            >
              <div className="relative w-full bg-white" style={{ aspectRatio: "4/3" }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                />
                <Badge
                  className="absolute top-2 left-2 text-xs font-medium"
                  style={{ backgroundColor: C.turquoise, color: C.white }}
                >
                  {product.brand}
                </Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{
                      backgroundColor: product.condition === "Brand New" ? "#10B98115" : `${C.turquoise}10`,
                      color: product.condition === "Brand New" ? "#10B981" : C.turquoise,
                      borderColor: product.condition === "Brand New" ? "#10B98130" : `${C.turquoise}30`,
                    }}
                  >
                    {product.condition}
                  </Badge>
                </div>
                <h3 className="font-semibold text-sm mb-2 line-clamp-2" style={{ color: C.navy }}>{product.name}</h3>
                <div className="space-y-1 text-xs mb-3" style={{ color: "#64748B" }}>
                  <p>{product.processor}</p>
                  <p>{product.ram} RAM | {product.storage}</p>
                  <p>{product.display} Display</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-lg" style={{ color: C.turquoise }}>
                    KES {product.price.toLocaleString()}
                  </p>
                  <a
                    href={whatsappLeadLink(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                    style={{ backgroundColor: C.turquoise }}
                  >
                    <Icons.MessageCircle /> Inquire
                  </a>
                </div>
                {product.offer && (
                  <p className="text-xs mt-2 font-medium" style={{ color: C.turquoise }}>{product.offer}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: "#64748B" }}>
            <Icons.Laptop />
            <p className="mt-4 text-lg">No laptops match your filters.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => { setBrandFilter("All"); setPriceRange("all"); setSearch(""); }}
              style={{ borderColor: C.turquoise, color: C.turquoise }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Blog Section ───────────────────────────────────────────────────
function BlogSection() {
  const ref = useScrollAnim();
  return (
    <section className="py-20" style={{ backgroundColor: C.white }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Tech Insights"
          title="Blog & Tech News"
          subtitle="Expert analysis, buying guides, cybersecurity tips, and the latest updates from KALINITECH SYSTEMS."
        />
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, idx) => (
            <Card
              key={post.id}
              className="group bg-white border-transparent hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              data-anim={`anim-fadeInUp delay-${idx * 100}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    className="text-xs"
                    style={{ backgroundColor: `${C.turquoise}15`, color: C.turquoise, borderColor: `${C.turquoise}30` }}
                  >
                    {post.category}
                  </Badge>
                  <span className="text-xs flex items-center gap-1" style={{ color: "#64748B" }}>
                    <Icons.Clock /> {post.date}
                  </span>
                </div>
                <h3
                  className="font-bold text-lg mb-2 line-clamp-2 transition-colors duration-300"
                  style={{ color: C.navy }}
                >
                  {post.title}
                </h3>
                <p className="text-sm line-clamp-3" style={{ color: "#64748B" }}>{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs" style={{ color: "#64748B" }}>By {post.author}</span>
                  <span className="text-sm font-medium flex items-center gap-1 cursor-pointer transition-colors duration-300" style={{ color: C.turquoise }}>
                    Read More <Icons.ChevronRight />
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Academy Section ────────────────────────────────────────────────
function AcademySection() {
  const ref = useScrollAnim();
  return (
    <section className="py-20" style={{ backgroundColor: C.offWhite }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Learn & Grow"
          title="KALINITECH Academy"
          subtitle="Professional technology training designed by industry experts. Gain real-world skills in software development, cybersecurity, cloud computing, and more."
        />
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {academyCourses.map((course, idx) => (
            <Card
              key={course.title}
              className="group bg-white border-transparent hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              data-anim={`anim-fadeInUp delay-${idx * 100}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    style={{ borderColor: `${C.turquoise}40`, color: C.navy }}
                  >
                    {course.level}
                  </Badge>
                  <Badge
                    className="text-xs"
                    style={{ backgroundColor: `${C.turquoise}15`, color: C.turquoise, borderColor: `${C.turquoise}30` }}
                  >
                    {course.duration}
                  </Badge>
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: C.navy }}>{course.title}</h3>
                <p className="text-sm mb-4" style={{ color: "#64748B" }}>{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg" style={{ color: C.turquoise }}>{course.price}</span>
                  <a
                    href={whatsappLeadLink(`${course.title} training`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                    style={{ backgroundColor: C.turquoise }}
                  >
                    <Icons.MessageCircle /> Enroll
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Charity Section ────────────────────────────────────────────────
function CharitySection() {
  const ref = useScrollAnim();
  const charityItems = [
    { title: "Digital Literacy Programs", desc: "Free basic computing and internet skills training for youth and women in underserved communities.", icon: Icons.Code },
    { title: "Tech Donations", desc: "Donating refurbished laptops and networking equipment to schools, community centers, and NGOs.", icon: Icons.Package },
    { title: "STEM Education Support", desc: "Sponsoring STEM programs in schools, providing mentorship, resources, and hands-on workshops.", icon: Icons.GraduationCap },
    { title: "Youth Empowerment", desc: "Creating pathways for young people through apprenticeships, internship opportunities, and career guidance.", icon: Icons.Users },
    { title: "Community Tech Workshops", desc: "Free weekend workshops covering web development, cybersecurity basics, and digital marketing.", icon: Icons.Zap },
    { title: "Bridging the Digital Divide", desc: "Partnering with organizations to expand internet connectivity and technology access in rural areas.", icon: Icons.Wifi },
  ];
  return (
    <section className="py-20" style={{ backgroundColor: C.white }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Giving Back"
          title="Charity & Foundation"
          subtitle="KALINITECH SYSTEMS is committed to bridging the digital divide. Through our foundation, we bring technology education to underserved communities across East Africa."
        />
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {charityItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.title}
                className="group bg-white border-transparent hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                data-anim={`anim-fadeInUp delay-${idx * 100}`}
              >
                <CardContent className="p-6">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})` }}
                  >
                    <Icon />
                  </div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: C.navy }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: "#64748B" }}>{item.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <a
            href={whatsappLeadLink("Charity & Foundation partnership")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
            style={{ backgroundColor: C.navy }}
          >
            <Icons.Heart /> Partner With Us
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── About Section ──────────────────────────────────────────────────
function AboutSection() {
  const ref = useScrollAnim();
  return (
    <section className="py-20" style={{ backgroundColor: C.offWhite }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div data-anim="anim-slideInLeft">
              <Badge style={{ backgroundColor: `${C.turquoise}15`, color: C.turquoise, borderColor: `${C.turquoise}30` }}>About Us</Badge>
            </div>
            <h2 data-anim="anim-slideInLeft" className="text-3xl sm:text-4xl font-bold" style={{ color: C.navy }}>
              Built to Hack the Future
            </h2>
            <p data-anim="anim-fadeInUp" className="text-lg leading-relaxed" style={{ color: "#64748B" }}>
              {company.description}
            </p>
            <div data-anim="anim-fadeInUp" className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-1" style={{ color: C.navy }}>Our Mission</h3>
                <p style={{ color: "#64748B" }}>{company.mission}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1" style={{ color: C.navy }}>Our Vision</h3>
                <p style={{ color: "#64748B" }}>{company.vision}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Card
              data-anim="anim-slideInRight"
              className="border-transparent"
              style={{ background: `linear-gradient(135deg, ${C.turquoise}08, ${C.navy}08)`, borderColor: `${C.turquoise}20` }}
            >
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-4" style={{ color: C.navy }}>Leadership</h3>
                <div className="flex items-start gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0"
                    style={{ background: `linear-gradient(135deg, ${C.turquoise}, ${C.navy})` }}
                  >
                    JA
                  </div>
                  <div>
                    <p className="font-bold text-lg" style={{ color: C.navy }}>{company.founder}</p>
                    <p className="text-sm" style={{ color: C.turquoise }}>{company.role}</p>
                    <p className="text-sm mt-2" style={{ color: "#64748B" }}>
                      A visionary technologist and entrepreneur leading KALINITECH SYSTEMS with expertise in software engineering, cybersecurity, and business strategy. Passionate about democratizing technology access across East Africa.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div data-anim="anim-fadeInUp" className="grid grid-cols-2 gap-4">
              {[
                { label: "Laptop Models", value: "150+" },
                { label: "Brands", value: "8+" },
                { label: "Service Areas", value: "10" },
                { label: "Team Experts", value: "20+" },
              ].map((stat) => (
                <Card key={stat.label} className="bg-white border-transparent">
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold" style={{ color: C.turquoise }}>{stat.value}</p>
                    <p className="text-xs" style={{ color: "#64748B" }}>{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-center mb-6" style={{ color: C.navy }}>Our Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {company.values.map((value) => (
              <Card key={value} className="bg-white border-transparent transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-4 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${C.turquoise}15`, color: C.turquoise }}
                  >
                    <Icons.Check />
                  </div>
                  <span className="font-medium" style={{ color: C.navy }}>{value}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Section ────────────────────────────────────────────────
function ContactSection() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const ref = useScrollAnim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "website", status: "new" }),
      });
      if (res.ok) {
        toast({ title: "Message Sent!", description: "We will get back to you shortly." });
        setForm({ name: "", email: "", phone: "", message: "" });
      }
    } catch {
      toast({ title: "Error", description: "Failed to send message. Try WhatsApp instead.", variant: "destructive" });
    }
    setSubmitting(false);
  };

  return (
    <section className="py-20" style={{ backgroundColor: C.white }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Get In Touch"
          title="Contact Us"
          subtitle="Reach out for inquiries, orders, or partnership opportunities."
        />
        <div ref={ref} className="grid lg:grid-cols-2 gap-10">
          <Card data-anim="anim-slideInLeft" className="bg-white border-transparent">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4" style={{ color: C.navy }}>Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder="Your Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={{ borderColor: `${C.turquoise}30` }} />
                <Input placeholder="Email Address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ borderColor: `${C.turquoise}30` }} />
                <Input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={{ borderColor: `${C.turquoise}30` }} />
                <Textarea placeholder="Your Message" required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ borderColor: `${C.turquoise}30` }} />
                <Button
                  type="submit"
                  className="w-full text-white font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  style={{ backgroundColor: C.turquoise }}
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
          <div data-anim="anim-slideInRight" className="space-y-6">
            <Card className="bg-white border-transparent">
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4" style={{ color: C.navy }}>Quick Contact</h3>
                <div className="space-y-4">
                  <a
                    href={whatsappLeadLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl transition-colors duration-300"
                    style={{ backgroundColor: `${C.turquoise}08` }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${C.turquoise}15`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${C.turquoise}08`; }}
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: C.turquoise }}>
                      <Icons.MessageCircle />
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: C.navy }}>WhatsApp</p>
                      <p className="text-sm" style={{ color: "#64748B" }}>+254 790 493 120</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: `${C.navy}08` }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: C.navy }}>
                      <Icons.Mail />
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: C.navy }}>Email</p>
                      <p className="text-sm" style={{ color: "#64748B" }}>{company.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: `${C.navyLight}08` }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: C.navyLight }}>
                      <Icons.MapPin />
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: C.navy }}>Location</p>
                      <p className="text-sm" style={{ color: "#64748B" }}>{company.location}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card
              className="border-transparent text-white"
              style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})` }}
            >
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2">Fastest Response</h3>
                <p className="text-sm mb-4" style={{ color: "#94A3B8" }}>
                  For the quickest response, reach us directly on WhatsApp. We typically reply within minutes during business hours.
                </p>
                <a
                  href={whatsappLeadLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
                  style={{ backgroundColor: C.turquoise }}
                >
                  <Icons.MessageCircle /> Chat Now
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Social Media Automation Section ────────────────────────────────
function AutomationSection() {
  const { toast } = useToast();
  const [campaigns, setCampaigns] = useState<Array<{ id: string; name: string; platform: string; caption: string; hashtags: string; status: string; ctaText: string; createdAt: string }>>([]);
  const [logs, setLogs] = useState<Array<{ id: string; action: string; platform: string; status: string; details: string; createdAt: string }>>([]);
  const [newCampaign, setNewCampaign] = useState({
    name: "", platform: "Facebook", productId: "", caption: "", hashtags: "", ctaText: "", status: "draft",
  });
  const [generating, setGenerating] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const fetchCampaigns = async () => {
    try { const res = await fetch("/api/campaigns"); if (res.ok) setCampaigns(await res.json()); } catch { /* empty */ }
  };
  const fetchLogs = async () => {
    try { const res = await fetch("/api/automation"); if (res.ok) setLogs(await res.json()); } catch { /* empty */ }
  };

  const [autoLoaded, setAutoLoaded] = useState(false);
  if (!autoLoaded) { setAutoLoaded(true); fetchCampaigns(); fetchLogs(); }

  const generateContent = async () => {
    if (!selectedProduct) { toast({ title: "Select a product first", variant: "destructive" }); return; }
    setGenerating(true);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: selectedProduct, platform: newCampaign.platform, companyName: company.name, whatsappNumber: company.whatsappNumber }),
      });
      if (res.ok) {
        const data = await res.json();
        setNewCampaign({ ...newCampaign, caption: data.caption || "", hashtags: data.hashtags || "", ctaText: data.cta || "", name: data.name || `${selectedProduct} Campaign` });
        toast({ title: "Content Generated!", description: "Review and customize before publishing." });
      } else {
        const product = allProducts.find((p) => p.name === selectedProduct);
        if (product) {
          setNewCampaign({
            ...newCampaign,
            caption: `${product.name} — ${product.processor}, ${product.ram} RAM, ${product.storage}. Only KES ${product.price.toLocaleString()}! Quality guaranteed by KALINITECH SYSTEMS. DM or WhatsApp to order.`,
            hashtags: `#KalinitechSystems #LaptopsKenya #${product.brand.replace(/\s/g, "")}Laptop #TechDealsKenya`,
            ctaText: `WhatsApp us at +254790493120 to order the ${product.name}!`,
            name: `${product.name} — ${product.offer}`,
          });
          toast({ title: "Content Generated!", description: "AI-generated content ready for review." });
        }
      }
    } catch {
      const product = allProducts.find((p) => p.name === selectedProduct);
      if (product) {
        setNewCampaign({
          ...newCampaign,
          caption: `${product.name} — ${product.processor}, ${product.ram} RAM, ${product.storage}. Only KES ${product.price.toLocaleString()}! WhatsApp to order.`,
          hashtags: `#KalinitechSystems #LaptopsKenya #${product.brand.replace(/\s/g, "")} #TechDeals`,
          ctaText: `WhatsApp +254790493120 for ${product.name}`,
          name: `${product.name} Campaign`,
        });
        toast({ title: "Content Generated (Offline)", description: "Local fallback used." });
      }
    }
    setGenerating(false);
  };

  const saveCampaign = async () => {
    try {
      const res = await fetch("/api/campaigns", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newCampaign) });
      if (res.ok) { toast({ title: "Campaign Saved!" }); fetchCampaigns(); setNewCampaign({ name: "", platform: "Facebook", productId: "", caption: "", hashtags: "", ctaText: "", status: "draft" }); setSelectedProduct(""); }
    } catch { toast({ title: "Error saving campaign", variant: "destructive" }); }
  };

  const publishCampaign = async (id: string) => {
    try {
      await fetch("/api/campaigns", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status: "published", publishedAt: new Date().toISOString() }) });
      await fetch("/api/automation", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ campaignId: id, action: "publish", platform: newCampaign.platform, status: "completed", details: `Published campaign to ${newCampaign.platform}` }) });
      toast({ title: "Campaign Published!", description: "Post marked as published." });
      fetchCampaigns(); fetchLogs();
    } catch { toast({ title: "Error publishing", variant: "destructive" }); }
  };

  const deleteCampaign = async (id: string) => {
    try { await fetch(`/api/campaigns?id=${id}`, { method: "DELETE" }); toast({ title: "Campaign Deleted" }); fetchCampaigns(); } catch { toast({ title: "Error deleting", variant: "destructive" }); }
  };

  return (
    <section className="py-20" style={{ backgroundColor: C.offWhite }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Social Automation"
          title="Policy-Safe Social Media Automation"
          subtitle="Generate unique AI-powered content for each product and platform. Schedule campaigns, track engagement, and route leads to WhatsApp."
        />
        <Tabs defaultValue="create" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-lg" style={{ backgroundColor: `${C.navy}10` }}>
            {["create", "campaigns", "platforms", "logs"].map((tab) => (
              <TabsTrigger key={tab} value={tab} className="capitalize transition-all duration-300 data-[state=active]:text-white" style={{ color: C.navy }} data-state-styles>
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="create">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white border-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: C.navy }}>
                    <Icons.Sparkles /> Generate Campaign Content
                  </CardTitle>
                  <CardDescription>Select a product and platform, then let AI generate unique ad content.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block" style={{ color: C.navy }}>Product</label>
                    <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                      <SelectTrigger style={{ borderColor: `${C.turquoise}30` }}><SelectValue placeholder="Select a laptop" /></SelectTrigger>
                      <SelectContent className="max-h-64">
                        {allProducts.map((p) => (<SelectItem key={p.name} value={p.name}>{p.name} — KES {p.price.toLocaleString()}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block" style={{ color: C.navy }}>Platform</label>
                    <Select value={newCampaign.platform} onValueChange={(v) => setNewCampaign({ ...newCampaign, platform: v })}>
                      <SelectTrigger style={{ borderColor: `${C.turquoise}30` }}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["Facebook", "Instagram", "TikTok", "X (Twitter)", "Telegram", "WhatsApp Status"].map((p) => (
                          <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={generateContent} disabled={generating || !selectedProduct} className="w-full text-white font-semibold transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: C.turquoise }}>
                    {generating ? "Generating..." : <><Icons.Sparkles /> Generate AI Content</>}
                  </Button>
                  {newCampaign.caption && (
                    <div className="space-y-3 mt-4 p-4 rounded-lg" style={{ backgroundColor: `${C.offWhite}` }}>
                      <div>
                        <label className="text-xs font-medium" style={{ color: "#64748B" }}>Caption</label>
                        <Textarea value={newCampaign.caption} onChange={(e) => setNewCampaign({ ...newCampaign, caption: e.target.value })} rows={4} style={{ borderColor: `${C.turquoise}30` }} />
                      </div>
                      <div>
                        <label className="text-xs font-medium" style={{ color: "#64748B" }}>Hashtags</label>
                        <Input value={newCampaign.hashtags} onChange={(e) => setNewCampaign({ ...newCampaign, hashtags: e.target.value })} style={{ borderColor: `${C.turquoise}30` }} />
                      </div>
                      <div>
                        <label className="text-xs font-medium" style={{ color: "#64748B" }}>CTA</label>
                        <Input value={newCampaign.ctaText} onChange={(e) => setNewCampaign({ ...newCampaign, ctaText: e.target.value })} style={{ borderColor: `${C.turquoise}30` }} />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={saveCampaign} className="flex-1 text-white font-semibold" style={{ backgroundColor: C.navy }}>Save as Draft</Button>
                        <a href={whatsappLeadLink(selectedProduct)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: C.turquoise }}>
                          <Icons.MessageCircle /> Preview
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card className="border-transparent" style={{ borderColor: `${C.turquoise}30` }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: C.navy }}>
                    <Icons.Shield /> Compliance Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {[
                    "Each post must promote a unique product with different messaging",
                    "Maximum 3 posts per platform per day with randomized timing",
                    "No mass DM automation or fake engagement",
                    "Content must be truthful with accurate pricing and specifications",
                    "Always include clear WhatsApp CTA for lead conversion",
                    "Human review required before publishing any campaign",
                    "Respect platform-specific content policies and guidelines",
                    "Rotate taglines, offers, and visual styles between posts",
                    "No misleading claims about product condition or warranty",
                    "All campaigns must maintain KALINITECH SYSTEMS brand identity",
                  ].map((rule, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Icons.Check />
                      <span style={{ color: "#64748B" }}>{rule}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="campaigns">
            <Card className="bg-white border-transparent">
              <CardHeader>
                <CardTitle style={{ color: C.navy }}>Active Campaigns ({campaigns.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {campaigns.length === 0 ? (
                  <p className="text-center py-8" style={{ color: "#64748B" }}>No campaigns yet. Create your first campaign above.</p>
                ) : (
                  <ScrollArea className="max-h-96 custom-scrollbar">
                    <div className="space-y-3">
                      {campaigns.map((c) => (
                        <div key={c.id} className="flex items-start justify-between p-4 rounded-lg border" style={{ borderColor: `${C.turquoise}20` }}>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold" style={{ color: C.navy }}>{c.name}</span>
                              <Badge style={{ backgroundColor: c.status === "published" ? C.turquoise : `${C.navy}15`, color: c.status === "published" ? C.white : C.navy }}>{c.status}</Badge>
                              <Badge variant="outline" style={{ borderColor: `${C.turquoise}30`, color: C.turquoise }}>{c.platform}</Badge>
                            </div>
                            <p className="text-sm line-clamp-2" style={{ color: "#64748B" }}>{c.caption}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 ml-4">
                            {c.status === "draft" && (
                              <Button size="sm" onClick={() => publishCampaign(c.id)} className="text-white" style={{ backgroundColor: C.turquoise }}>Publish</Button>
                            )}
                            <Button size="sm" variant="destructive" onClick={() => deleteCampaign(c.id)}><Icons.Trash /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {socialPlatforms.map((platform) => (
                <Card key={platform.name} className="bg-white border-transparent transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: C.navy }}>
                        {platform.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: C.navy }}>{platform.name}</p>
                        <p className="text-xs" style={{ color: "#64748B" }}>Priority: {platform.priority}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-xs" style={{ color: "#64748B" }}>
                      <div className="flex items-center gap-2"><Icons.Check /> Approved for KALINITECH marketing</div>
                      <div className="flex items-center gap-2"><Icons.Check /> WhatsApp CTA integration ready</div>
                      <div className="flex items-center gap-2"><Icons.Check /> Policy-compliant posting workflow</div>
                    </div>
                    {platform.name === "WhatsApp" && (
                      <a href={whatsappLeadLink()} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-white px-3 py-1.5 rounded-lg text-xs font-semibold w-full justify-center transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: C.turquoise }}>
                        <Icons.MessageCircle /> Open WhatsApp
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logs">
            <Card className="bg-white border-transparent">
              <CardHeader><CardTitle style={{ color: C.navy }}>Automation Logs</CardTitle></CardHeader>
              <CardContent>
                {logs.length === 0 ? (
                  <p className="text-center py-8" style={{ color: "#64748B" }}>No automation logs yet.</p>
                ) : (
                  <ScrollArea className="max-h-96 custom-scrollbar">
                    <div className="space-y-2">
                      {logs.map((log) => (
                        <div key={log.id} className="flex items-center justify-between p-3 rounded-lg border text-sm" style={{ borderColor: `${C.turquoise}20` }}>
                          <div>
                            <span className="font-medium" style={{ color: C.navy }}>{log.action}</span>
                            <span className="ml-2" style={{ color: "#64748B" }}>on {log.platform}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge style={{ backgroundColor: log.status === "completed" ? C.turquoise : `${C.navy}15`, color: log.status === "completed" ? C.white : C.navy }}>{log.status}</Badge>
                            <span className="text-xs" style={{ color: "#64748B" }}>{new Date(log.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

// ─── Portal Dashboard (formerly Admin) ──────────────────────────────
function PortalSection() {
  type ProductForm = {
    id?: string;
    name: string;
    brand: string;
    category: string;
    processor: string;
    ram: string;
    storage: string;
    display: string;
    price: string;
    condition: string;
    features: string;
    offer: string;
  };
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("products");
  const [dbProducts, setDbProducts] = useState<Array<{
    id: string; name: string; brand: string; category: string; processor: string;
    ram: string; storage: string; display: string; price: number; condition: string;
    features: string; offer: string; inStock: boolean; featured: boolean;
  }>>([]);
  const [dbPosts, setDbPosts] = useState<Array<{
    id: string; title: string; slug: string; excerpt: string; category: string;
    author: string; published: boolean; createdAt: string;
  }>>([]);
  const [dbContacts, setDbContacts] = useState<Array<{
    id: string; name: string; email: string; phone: string; message: string;
    source: string; status: string; createdAt: string;
  }>>([]);
  const [editProduct, setEditProduct] = useState<ProductForm | null>(null);
  const [editPost, setEditPost] = useState<Record<string, string> | null>(null);

  const loadData = async () => {
    try {
      const [prodRes, postRes, contactRes] = await Promise.all([fetch("/api/products"), fetch("/api/blog"), fetch("/api/contacts")]);
      if (prodRes.ok) setDbProducts(await prodRes.json());
      if (postRes.ok) setDbPosts(await postRes.json());
      if (contactRes.ok) setDbContacts(await contactRes.json());
    } catch { /* empty */ }
  };

  const [adminLoaded, setAdminLoaded] = useState(false);
  if (!adminLoaded) { setAdminLoaded(true); loadData(); }

  const seedDatabase = async () => {
    try { const res = await fetch("/api/seed", { method: "POST" }); if (res.ok) { toast({ title: "Database Seeded!", description: "All products, services, and blog posts loaded." }); loadData(); } } catch { toast({ title: "Seed failed", variant: "destructive" }); }
  };

  const saveProduct = async (data: Record<string, string>) => {
    try {
      const payload = { ...data, price: parseInt(data.price) || 0, inStock: true, featured: false };
      if (data.id) { await fetch("/api/products", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); }
      else { await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); }
      toast({ title: "Product saved!" }); setEditProduct(null); loadData();
    } catch { toast({ title: "Error saving product", variant: "destructive" }); }
  };

  const deleteProduct = async (id: string) => {
    try { await fetch(`/api/products?id=${id}`, { method: "DELETE" }); toast({ title: "Product deleted" }); loadData(); } catch { toast({ title: "Error deleting", variant: "destructive" }); }
  };

  const savePost = async (data: Record<string, string>) => {
    try {
      const payload = { ...data, published: data.published === "true" };
      if (data.id) { await fetch("/api/blog", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); }
      else { await fetch("/api/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }); }
      toast({ title: "Blog post saved!" }); setEditPost(null); loadData();
    } catch { toast({ title: "Error saving post", variant: "destructive" }); }
  };

  const deletePost = async (id: string) => {
    try { await fetch(`/api/blog?id=${id}`, { method: "DELETE" }); toast({ title: "Post deleted" }); loadData(); } catch { toast({ title: "Error deleting", variant: "destructive" }); }
  };

  return (
    <section className="py-20" style={{ backgroundColor: C.offWhite }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold" style={{ color: C.navy }}>Portal Dashboard</h2>
            <p style={{ color: "#64748B" }}>Manage products, blog posts, contacts, and system settings.</p>
          </div>
          <Button onClick={seedDatabase} variant="outline" style={{ borderColor: C.turquoise, color: C.turquoise }} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
            <Icons.Zap /> Seed Database
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Products", value: dbProducts.length, icon: Icons.Laptop },
            { label: "Blog Posts", value: dbPosts.length, icon: Icons.Newspaper },
            { label: "Contacts", value: dbContacts.length, icon: Icons.MessageCircle },
            { label: "Published", value: dbPosts.filter((p) => p.published).length, icon: Icons.Check },
          ].map((stat) => (
            <Card key={stat.label} className="bg-white border-transparent transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${C.turquoise}15`, color: C.turquoise }}>
                  <stat.icon />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: C.turquoise }}>{stat.value}</p>
                  <p className="text-xs" style={{ color: "#64748B" }}>{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 max-w-lg mb-6" style={{ backgroundColor: `${C.navy}10` }}>
            {["products", "blog", "contacts", "settings"].map((tab) => (
              <TabsTrigger key={tab} value={tab} className="capitalize" style={{ color: C.navy }}>{tab}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="products">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg" style={{ color: C.navy }}>Products ({dbProducts.length})</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditProduct({ name: "", brand: "", category: "", processor: "", ram: "", storage: "", display: "", price: "", condition: "Refurbished", features: "", offer: "" })} className="text-white" style={{ backgroundColor: C.turquoise }}>
                      <Icons.Plus /> Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle style={{ color: C.navy }}>{editProduct?.id ? "Edit" : "Add"} Product</DialogTitle></DialogHeader>
                    {editProduct && (
                      <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {["name", "brand", "category", "processor", "ram", "storage", "display", "price", "condition", "features", "offer"].map((field) => (
                          <div key={field}>
                            <label className="text-sm font-medium capitalize" style={{ color: C.navy }}>{field}</label>
                            <Input value={editProduct[field] || ""} onChange={(e) => setEditProduct({ ...editProduct, [field]: e.target.value })} style={{ borderColor: `${C.turquoise}30` }} />
                          </div>
                        ))}
                        <Button onClick={() => saveProduct(editProduct)} className="w-full text-white font-semibold" style={{ backgroundColor: C.turquoise }}>Save Product</Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
              <ScrollArea className="max-h-[500px] custom-scrollbar">
                <div className="space-y-2">
                  {dbProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: `${C.turquoise}20` }}>
                      <div>
                        <span className="font-medium text-sm" style={{ color: C.navy }}>{product.name}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs" style={{ borderColor: `${C.turquoise}30`, color: C.turquoise }}>{product.brand}</Badge>
                          <span className="text-sm font-semibold" style={{ color: C.turquoise }}>KES {product.price.toLocaleString()}</span>
                          <Badge className="text-xs" style={{ backgroundColor: product.condition === "Brand New" ? "#10B98115" : `${C.turquoise}10`, color: product.condition === "Brand New" ? "#10B981" : C.turquoise }}>{product.condition}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditProduct({
                            id: product.id,
                            name: product.name,
                            brand: product.brand,
                            category: product.category,
                            processor: product.processor,
                            ram: product.ram,
                            storage: product.storage,
                            display: product.display,
                            price: String(product.price),
                            condition: product.condition,
                            features: product.features,
                            offer: product.offer,
                          })}
                        ><Icons.Edit /></Button>
                        <Button size="sm" variant="ghost" className="text-red-500" onClick={() => deleteProduct(product.id)}><Icons.Trash /></Button>
                      </div>
                    </div>
                  ))}
                  {dbProducts.length === 0 && <p className="text-center py-8" style={{ color: "#64748B" }}>No products. Click &quot;Seed Database&quot; or &quot;Add Product&quot;.</p>}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="blog">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg" style={{ color: C.navy }}>Blog Posts ({dbPosts.length})</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button onClick={() => setEditPost({ title: "", slug: "", excerpt: "", category: "Tech News", author: "JARED ANDIKA", published: "true", content: "" })} className="text-white" style={{ backgroundColor: C.turquoise }}>
                      <Icons.Plus /> Add Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader><DialogTitle style={{ color: C.navy }}>{editPost?.id ? "Edit" : "Add"} Blog Post</DialogTitle></DialogHeader>
                    {editPost && (
                      <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {["title", "slug", "excerpt", "category", "author", "content"].map((field) => (
                          <div key={field}>
                            <label className="text-sm font-medium capitalize" style={{ color: C.navy }}>{field}</label>
                            {field === "content" || field === "excerpt" ? (
                              <Textarea value={editPost[field] || ""} onChange={(e) => setEditPost({ ...editPost, [field]: e.target.value })} rows={4} style={{ borderColor: `${C.turquoise}30` }} />
                            ) : (
                              <Input value={editPost[field] || ""} onChange={(e) => setEditPost({ ...editPost, [field]: e.target.value })} style={{ borderColor: `${C.turquoise}30` }} />
                            )}
                          </div>
                        ))}
                        <div>
                          <label className="text-sm font-medium" style={{ color: C.navy }}>Published</label>
                          <Select value={editPost.published || "true"} onValueChange={(v) => setEditPost({ ...editPost, published: v })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Yes</SelectItem>
                              <SelectItem value="false">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={() => savePost(editPost)} className="w-full text-white font-semibold" style={{ backgroundColor: C.turquoise }}>Save Post</Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
              <ScrollArea className="max-h-[500px] custom-scrollbar">
                <div className="space-y-2">
                  {dbPosts.map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-3 rounded-lg border" style={{ borderColor: `${C.turquoise}20` }}>
                      <div>
                        <span className="font-medium text-sm" style={{ color: C.navy }}>{post.title}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs" style={{ borderColor: `${C.turquoise}30`, color: C.turquoise }}>{post.category}</Badge>
                          <Badge className="text-xs" style={{ backgroundColor: post.published ? C.turquoise : `${C.navy}15`, color: post.published ? C.white : C.navy }}>{post.published ? "Published" : "Draft"}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => setEditPost({ ...post, published: String(post.published) })}><Icons.Edit /></Button>
                        <Button size="sm" variant="ghost" className="text-red-500" onClick={() => deletePost(post.id)}><Icons.Trash /></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="contacts">
            <Card className="bg-white border-transparent">
              <CardHeader><CardTitle style={{ color: C.navy }}>Contact Submissions ({dbContacts.length})</CardTitle></CardHeader>
              <CardContent>
                {dbContacts.length === 0 ? (
                  <p className="text-center py-8" style={{ color: "#64748B" }}>No contact submissions yet.</p>
                ) : (
                  <ScrollArea className="max-h-96 custom-scrollbar">
                    <div className="space-y-3">
                      {dbContacts.map((contact) => (
                        <div key={contact.id} className="p-4 rounded-lg border" style={{ borderColor: `${C.turquoise}20` }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold" style={{ color: C.navy }}>{contact.name}</span>
                            <Badge style={{ backgroundColor: contact.status === "new" ? C.turquoise : `${C.navy}15`, color: contact.status === "new" ? C.white : C.navy }}>{contact.status}</Badge>
                          </div>
                          <p className="text-sm" style={{ color: "#64748B" }}>{contact.message}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: "#64748B" }}>
                            {contact.email && <span>{contact.email}</span>}
                            {contact.phone && <span>{contact.phone}</span>}
                            <span>via {contact.source}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-white border-transparent">
              <CardHeader><CardTitle style={{ color: C.navy }}>System Settings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div><label className="text-sm font-medium" style={{ color: C.navy }}>Company Name</label><Input value={company.name} disabled /></div>
                <div><label className="text-sm font-medium" style={{ color: C.navy }}>WhatsApp Number</label><Input value={company.whatsappNumber} disabled /></div>
                <div><label className="text-sm font-medium" style={{ color: C.navy }}>CEO & Founder</label><Input value={company.founder} disabled /></div>
                <Separator />
                <div className="p-4 rounded-lg" style={{ backgroundColor: `${C.offWhite}` }}>
                  <h4 className="font-semibold mb-2" style={{ color: C.navy }}>Zero-Cost Deployment Stack</h4>
                  <div className="grid sm:grid-cols-2 gap-2 text-sm" style={{ color: "#64748B" }}>
                    {[["Frontend", "Next.js + TypeScript"], ["Styling", "Tailwind CSS + shadcn/ui"], ["Database", "Prisma + SQLite"], ["Hosting", "Vercel Free Tier"], ["Backend", "Next.js API Routes"], ["WhatsApp", "Click-to-Chat Links"], ["Automation", "n8n Self-Hosted"], ["AI Content", "z-ai-web-dev-sdk"]].map(([label, value]) => (
                      <div key={label} className="flex items-center gap-2">
                        <Icons.Check /><span><strong>{label}:</strong> {value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────
function Footer({ onNavigate }: { onNavigate: (page: PageView) => void }) {
  return (
    <footer className="mt-auto" style={{ backgroundColor: C.navy }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">
              <span style={{ color: C.turquoise }}>KALINITECH</span> SYSTEMS
            </h3>
            <p className="text-sm" style={{ color: "#94A3B8" }}>{company.tagline}</p>
            <p className="text-sm mt-2" style={{ color: "#94A3B8" }}>{company.location}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Quick Links</h4>
            <div className="space-y-2">
              {(["home", "services", "products", "blog"] as PageView[]).map((page) => (
                <button
                  key={page}
                  onClick={() => onNavigate(page)}
                  className="block text-sm capitalize transition-colors duration-300 hover:text-white"
                  style={{ color: C.turquoise }}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">More</h4>
            <div className="space-y-2">
              {(["academy", "charity", "about", "contact"] as PageView[]).map((page) => (
                <button
                  key={page}
                  onClick={() => onNavigate(page)}
                  className="block text-sm capitalize transition-colors duration-300 hover:text-white"
                  style={{ color: C.turquoise }}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-white">Contact</h4>
            <div className="space-y-2 text-sm" style={{ color: "#94A3B8" }}>
              <a
                href={whatsappLeadLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors duration-300"
                style={{ color: C.turquoise }}
              >
                <Icons.MessageCircle /> WhatsApp
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-2 transition-colors duration-300" style={{ color: C.turquoise }}>
                <Icons.Mail /> {company.email}
              </a>
            </div>
          </div>
        </div>
        <Separator className="my-8" style={{ backgroundColor: `${C.turquoise}20` }} />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: "#94A3B8" }}>
            &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="text-sm" style={{ color: "#94A3B8" }}>
            Founded by {company.founder}
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main App ───────────────────────────────────────────────────────
export default function Home() {
  const [page, setPage] = useState<PageView>("home");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: C.white }}>
      <Navigation current={page} onNavigate={setPage} />
      <main className="flex-1">
        {page === "home" && (
          <>
            <HeroSection onNavigate={setPage} />
            <ServicesSection />
            <ProductsSection />
            <BlogSection />
            <section className="py-20" style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})` }}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <Badge className="mb-4 text-xs font-semibold tracking-wider uppercase" style={{ backgroundColor: `${C.turquoise}20`, color: C.turquoise, borderColor: `${C.turquoise}40` }}>
                  Get Started
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Ready to Upgrade Your Tech?</h2>
                <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: "#94A3B8" }}>
                  Whether you need a laptop, custom software, cybersecurity services, or professional training, KALINITECH SYSTEMS has you covered.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href={whatsappLeadLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
                    style={{ backgroundColor: C.turquoise, boxShadow: `0 8px 32px ${C.turquoise}30` }}
                  >
                    <Icons.MessageCircle /> Chat on WhatsApp
                  </a>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setPage("products")}
                    className="px-8 py-4 rounded-xl text-lg border-white/30 text-white hover:bg-white/10 hover:text-white transition-all duration-300"
                  >
                    <Icons.Laptop /> Browse All Laptops
                  </Button>
                </div>
              </div>
            </section>
          </>
        )}
        {page === "services" && <ServicesSection />}
        {page === "products" && <ProductsSection />}
        {page === "blog" && <BlogSection />}
        {page === "academy" && <AcademySection />}
        {page === "charity" && <CharitySection />}
        {page === "about" && <AboutSection />}
        {page === "contact" && <ContactSection />}
        {page === "automation" && <AutomationSection />}
        {page === "portal" && <PortalSection />}
      </main>
      <Footer onNavigate={setPage} />
    </div>
  );
}
