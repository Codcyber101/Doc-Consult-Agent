// Implements: /specs/001-govassist-ethiopia/spec.md#requirements
// Generated-by: Codex prompt-id: civic-editorial-ui-20260218
// Generated-at: 2026-02-18T00:00:00Z

import React from "react";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: "online" | "inPerson" | "instant";
  estimate: string;
  color?: "primary" | "emerald" | "gold" | "ink";
  href?: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  badge = "online",
  estimate,
  color = "primary",
  href = "#",
}: ServiceCardProps) {
  const { t } = useTranslation();

  const colorStyles = {
    primary: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-surface",
    emerald: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-surface",
    gold: "bg-accent/20 text-accent group-hover:bg-accent group-hover:text-foreground",
    ink: "bg-foreground/5 text-foreground group-hover:bg-foreground group-hover:text-surface",
  };

  const badgeStyles = {
    online: "bg-primary/10 text-primary border-primary/20",
    inPerson: "bg-accent/15 text-foreground border-border",
    instant: "bg-foreground/5 text-foreground border-border",
  };

  return (
    <a
      href={href}
      className="group relative flex flex-col justify-between p-6 rounded-3xl bg-surface border border-border shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-primary/40 to-transparent" />

      <div>
        <div className="flex justify-between items-start mb-4">
          <div className={cn("p-3 rounded-2xl transition-all duration-300 shadow-sm group-hover:shadow-md", colorStyles[color])}>
            {React.cloneElement(icon as any, { className: "w-6 h-6" })}
          </div>
          <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.25em] border", badgeStyles[badge])}>
            {t(`services.badges.${badge}`)}
          </span>
        </div>

        <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted font-body leading-relaxed line-clamp-2">{description}</p>
      </div>

      <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-bold text-muted">
          <Clock className="w-3.5 h-3.5" />
          <span>{estimate}</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-black uppercase tracking-[0.25em] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary">
          {t("services.start")} <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </a>
  );
}
