import * as React from "react";

import { assertDefined } from "$app/utils/assert";
import { classNames } from "$app/utils/classNames";

import { Icon } from "$app/components/Icons";
import { WithTooltip } from "$app/components/WithTooltip";

export const StatsItem = ({
  title,
  description,
  value,
  className,
}: {
  title: React.ReactNode;
  description?: string;
  value?: string;
  className?: string;
}) => {
  const [adjustedFontSize, setAdjustedFontSize] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const calculateFontSize = () => {
      if (!containerRef.current) return;
      const style = window.getComputedStyle(containerRef.current);
      const containerWidth = containerRef.current.getBoundingClientRect().width;
      document.fonts.ready
        .then(() => {
          const canvas = document.createElement("canvas");
          const context = assertDefined(canvas.getContext("2d"), "Canvas 2d context missing");
          context.font = `${style.fontSize} ${style.fontFamily}`;
          const valueWidth = context.measureText(value ?? "").width;
          const fontSize = parseFloat(style.fontSize);
          setAdjustedFontSize(valueWidth > containerWidth ? (containerWidth * fontSize) / valueWidth : fontSize);
        })
        .catch(() => setAdjustedFontSize(parseFloat(style.fontSize)));
    };
    calculateFontSize();
    window.addEventListener("resize", calculateFontSize);
    return () => window.removeEventListener("resize", calculateFontSize);
  }, [value]);

  return (
    <section
      className={classNames(
        "inline-grid content-between gap-2 rounded border border-solid border-border bg-background p-5 text-[2.5rem] text-foreground",
        className,
      )}
    >
      <h2 className="flex gap-3 text-base leading-snug">
        {title}
        {description ? (
          <WithTooltip tip={description} position="top">
            <Icon name="info-circle" />
          </WithTooltip>
        ) : null}
      </h2>
      <div ref={containerRef} className="overflow-hidden" style={{ overflowWrap: "initial" }}>
        <span style={adjustedFontSize ? { fontSize: adjustedFontSize } : undefined}>{value ?? "-"}</span>
      </div>
    </section>
  );
};

export const Stats = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={classNames("grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4", className)} aria-label="Stats">
    {children}
  </div>
);
