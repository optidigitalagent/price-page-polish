import { useState } from "react";
import { X } from "lucide-react";
import { SectionHeading } from "./SectionLabel";

const CLD = "https://res.cloudinary.com/qofhq8xa/image/upload/f_auto,q_auto,c_limit,w_1600/cases";

type CaseImage = { src: string; label: string; tone: "muted" | "pink" | "green" };

type CaseData = {
  id: number;
  // Thumbnail representation on the marquee card.
  thumb:
    | { kind: "split"; before: string; after: string }
    | { kind: "single"; src: string; caption?: string };
  // Images shown inside the fullscreen modal, in order.
  images: CaseImage[];
};

const before = (src: string): CaseImage => ({ src, label: "До", tone: "muted" });
const stage = (src: string): CaseImage => ({ src, label: "Проміжний етап", tone: "pink" });
const after = (src: string): CaseImage => ({ src, label: "Після", tone: "green" });

const CASES: CaseData[] = [
  {
    id: 1,
    thumb: { kind: "split", before: `${CLD}/case-01/before-01.png`, after: `${CLD}/case-01/after-01.png` },
    images: [before(`${CLD}/case-01/before-01.png`), after(`${CLD}/case-01/after-01.png`)],
  },
  {
    id: 2,
    thumb: { kind: "split", before: `${CLD}/case-02/before-01.png`, after: `${CLD}/case-02/after-01.png` },
    images: [before(`${CLD}/case-02/before-01.png`), after(`${CLD}/case-02/after-01.png`)],
  },
  {
    id: 3,
    thumb: { kind: "single", src: `${CLD}/case-03/combined-before-stage-after.png`, caption: "До / Етап / Після" },
    images: [
      { src: `${CLD}/case-03/combined-before-stage-after.png`, label: "До / Проміжний етап / Після", tone: "muted" },
    ],
  },
  {
    id: 4,
    thumb: { kind: "single", src: `${CLD}/case-04/combined-before-after.png`, caption: "До / Після" },
    images: [{ src: `${CLD}/case-04/combined-before-after.png`, label: "До / Після", tone: "muted" }],
  },
  {
    id: 5,
    thumb: { kind: "single", src: `${CLD}/case-05/combined-before-after.png`, caption: "До / Після" },
    images: [{ src: `${CLD}/case-05/combined-before-after.png`, label: "До / Після", tone: "muted" }],
  },
  {
    id: 6,
    thumb: { kind: "split", before: `${CLD}/case-06/before-01.png`, after: `${CLD}/case-06/after-01.png` },
    images: [before(`${CLD}/case-06/before-01.png`), after(`${CLD}/case-06/after-01.png`)],
  },
  {
    id: 7,
    thumb: { kind: "split", before: `${CLD}/case-07/before-01.png`, after: `${CLD}/case-07/after-01.png` },
    images: [
      before(`${CLD}/case-07/before-01.png`),
      stage(`${CLD}/case-07/stage-01.png`),
      after(`${CLD}/case-07/after-01.png`),
    ],
  },
  {
    id: 8,
    thumb: { kind: "split", before: `${CLD}/case-08/before-01.png`, after: `${CLD}/case-08/after-01.png` },
    images: [before(`${CLD}/case-08/before-01.png`), after(`${CLD}/case-08/after-01.png`)],
  },
  {
    id: 9,
    thumb: { kind: "split", before: `${CLD}/case-09/before-01.png`, after: `${CLD}/case-09/after-01.png` },
    images: [
      { src: `${CLD}/case-09/before-01.png`, label: "До — ракурс 1", tone: "muted" },
      { src: `${CLD}/case-09/before-02.png`, label: "До — ракурс 2", tone: "muted" },
      after(`${CLD}/case-09/after-01.png`),
    ],
  },
  {
    id: 10,
    thumb: { kind: "split", before: `${CLD}/case-10/before-01.png`, after: `${CLD}/case-10/after-01.png` },
    images: [before(`${CLD}/case-10/before-01.png`), after(`${CLD}/case-10/after-01.png`)],
  },
  {
    id: 11,
    thumb: { kind: "split", before: `${CLD}/case-11/before-01.png`, after: `${CLD}/case-11/after-01.png` },
    images: [before(`${CLD}/case-11/before-01.png`), after(`${CLD}/case-11/after-01.png`)],
  },
  {
    id: 12,
    thumb: { kind: "split", before: `${CLD}/case-12/before-01.png`, after: `${CLD}/case-12/after-01.png` },
    images: [
      before(`${CLD}/case-12/before-01.png`),
      stage(`${CLD}/case-12/stage-01.png`),
      after(`${CLD}/case-12/after-01.png`),
    ],
  },
  {
    id: 13,
    thumb: { kind: "split", before: `${CLD}/case-13/before-01.png`, after: `${CLD}/case-13/after-01.png` },
    images: [before(`${CLD}/case-13/before-01.png`), after(`${CLD}/case-13/after-01.png`)],
  },
];

const row1 = CASES.slice(0, 7);
const row2 = CASES.slice(7);

function CaseCard({
  c,
  onOpen,
}: {
  c: CaseData;
  onOpen: (c: CaseData) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(c)}
      className="shrink-0 w-[280px] sm:w-[340px] rounded-2xl overflow-hidden border border-border/70 bg-card hover:shadow-lg transition-shadow"
    >
      {c.thumb.kind === "split" ? (
        <div className="grid grid-cols-2 divide-x divide-border">
          <figure className="relative">
            <img src={c.thumb.before} alt="До" className="aspect-square w-full object-cover" loading="lazy" />
            <figcaption className="absolute left-2 top-2 rounded-full bg-background/85 px-2 py-0.5 text-[10px] uppercase tracking-wider">
              До
            </figcaption>
          </figure>
          <figure className="relative">
            <img src={c.thumb.after} alt="Після" className="aspect-square w-full object-cover" loading="lazy" />
            <figcaption
              className="absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider text-white"
              style={{ background: "var(--brand-green-strong)" }}
            >
              Після
            </figcaption>
          </figure>
        </div>
      ) : (
        <figure className="relative bg-muted">
          <img
            src={c.thumb.src}
            alt={c.thumb.caption ?? "Кейс"}
            className="aspect-[2/1] w-full object-cover"
            loading="lazy"
          />
          {c.thumb.caption && (
            <figcaption className="absolute left-2 top-2 rounded-full bg-background/85 px-2 py-0.5 text-[10px] uppercase tracking-wider">
              {c.thumb.caption}
            </figcaption>
          )}
        </figure>
      )}
    </button>
  );
}

function toneStyle(tone: CaseImage["tone"]): React.CSSProperties {
  if (tone === "green") return { color: "var(--brand-green-deep)" };
  if (tone === "pink") return { color: "var(--brand-pink-strong)" };
  return {};
}

export function Cases() {
  const [open, setOpen] = useState<CaseData | null>(null);

  return (
    <section id="cases" className="relative py-20 md:py-28 bg-brand-aurora-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Кейси"
          title={<>Реальні результати <br /><em style={{ color: "var(--brand-pink-strong)" }}>наших пацієнтів</em></>}
          subtitle="Фото до і після — коротко, чесно, без ретуші. Натисніть на кейс, щоб роздивитися."
        />
      </div>

      <div className="mt-12 space-y-5">
        <div className="overflow-hidden">
          <div className="marquee-track gap-4" style={{ animationDuration: "60s" }}>
            {[...row1, ...row1].map((c, idx) => (
              <CaseCard key={`r1-${idx}`} c={c} onOpen={setOpen} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track-reverse gap-4" style={{ animationDuration: "60s" }}>
            {[...row2, ...row2].map((c, idx) => (
              <CaseCard key={`r2-${idx}`} c={c} onOpen={setOpen} />
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative w-full max-w-md sm:max-w-lg my-auto rounded-2xl sm:rounded-3xl bg-background p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Закрити"
              className="absolute -right-2 -top-2 sm:right-3 sm:top-3 z-10 h-11 w-11 rounded-full bg-background border border-border shadow-lg inline-flex items-center justify-center hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex flex-col gap-4 sm:gap-5 mt-2">
              {open.images.map((img, i) => (
                <figure key={i}>
                  <div className="text-xs uppercase tracking-wider mb-2 text-muted-foreground" style={toneStyle(img.tone)}>
                    {img.label}
                  </div>
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full max-h-[70vh] rounded-xl sm:rounded-2xl object-contain bg-muted border border-border/60"
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
