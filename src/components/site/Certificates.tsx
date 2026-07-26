import { useState } from "react";
import { X } from "lucide-react";
import { SectionHeading } from "./SectionLabel";
import certificateNew62 from "../../assets/certificate-new-62.png.asset.json";
import certificateGushcha1 from "../../assets/certificate-gushcha-oa-1.png.asset.json";
import certificateGushcha2 from "../../assets/certificate-gushcha-oa-2.png.asset.json";

const CLD_THUMB = "https://res.cloudinary.com/qofhq8xa/image/upload/f_auto,q_auto,c_limit,w_800/certificates";
const CLD_FULL = "https://res.cloudinary.com/qofhq8xa/image/upload/f_auto,q_auto,c_limit,w_2000/certificates";

type Cert = {
  n: string;
  thumb: string;
  full: string;
  orientation: "landscape" | "portrait";
};

// Only clean digital/scan certificates. Phone-photos of paper are excluded.
const CERTS: Cert[] = [
  ...["04", "05", "06", "08", "10", "12", "18", "22", "24", "26", "27", "29"].map((n) => ({
    n,
    thumb: `${CLD_THUMB}/certificate-${n}.png`,
    full: `${CLD_FULL}/certificate-${n}.png`,
    orientation: ["04", "18", "26", "27", "29"].includes(n) ? "landscape" as const : "portrait" as const,
  })),
  {
    n: "62",
    thumb: certificateNew62.url,
    full: certificateNew62.url,
    orientation: "landscape",
  },
  {
    n: "Гуща О.А. 2025",
    thumb: certificateGushcha1.url,
    full: certificateGushcha1.url,
    orientation: "landscape",
  },
  {
    n: "Гуща О.А. 2026",
    thumb: certificateGushcha2.url,
    full: certificateGushcha2.url,
    orientation: "landscape",
  },
];

const landscapeCerts = CERTS.filter((c) => c.orientation === "landscape");
const portraitCerts = CERTS.filter((c) => c.orientation === "portrait");

function CertCard({ c, onOpen }: { c: Cert; onOpen: (c: Cert) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(c)}
      className="shrink-0 h-[270px] sm:h-[350px] md:h-[380px] overflow-visible bg-transparent transition-transform duration-300 hover:scale-[1.02] flex items-center justify-center p-0"
    >
      <img
        src={c.thumb}
        alt={`Сертифікат Ami Dental ${c.n}`}
        loading="eager"
        decoding="async"
        className="h-full w-auto max-w-none rounded-xl object-contain shadow-[var(--shadow-soft)]"
      />
    </button>
  );
}

export function Certificates() {
  const [open, setOpen] = useState<Cert | null>(null);

  return (
    <section id="certificates" className="py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Кваліфікація"
          title={<>Сертифікати <br /><em style={{ color: "var(--brand-pink-strong)" }}>та професійний розвиток</em></>}
          subtitle="Фото сертифікатів і документів, наданих клінікою. Натисніть на будь-який документ, щоб роздивитися."
        />
      </div>

      <div className="mt-12 space-y-4 marquee-pause">
        <div className="overflow-hidden">
          <div className="marquee-track gap-4" style={{ animationDuration: "80s" }}>
            {[...landscapeCerts, ...landscapeCerts].map((c, idx) => (
              <CertCard key={`c1-${idx}`} c={c} onOpen={setOpen} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div className="marquee-track-reverse gap-4" style={{ animationDuration: "80s" }}>
            {[...portraitCerts, ...portraitCerts].map((c, idx) => (
              <CertCard key={`c2-${idx}`} c={c} onOpen={setOpen} />
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(null)}
              aria-label="Закрити"
              className="absolute -top-4 -right-4 h-10 w-10 rounded-full bg-background inline-flex items-center justify-center shadow"
            >
              <X className="h-4 w-4" />
            </button>
            <img src={open.full} alt={`Сертифікат ${open.n}`} className="w-full max-h-[85vh] object-contain rounded-2xl bg-background" />
          </div>
        </div>
      )}
    </section>
  );
}
