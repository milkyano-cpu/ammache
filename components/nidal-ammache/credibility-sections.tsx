import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  AWARDS,
  CONTACT_HREF,
  INSIGHTS,
  MEDIA,
  MEDIA_INTRO,
  PROFILES,
  REGISTRATION,
  type Insight,
  type LinkRow,
} from "./data";
import { ArrowUpRight, Eyebrow, SectionTitle, container } from "./primitives";


function LinkRows({ rows }: { rows: LinkRow[] }) {
  return (
    <ul>
      {rows.map((row) => {
        const title = (
          <>
            {row.title}
            <ArrowUpRight className="ml-1.5 inline-block size-2.5 align-[-1px]" />
          </>
        );
        return (
          <li key={row.title} className="border-b border-gray-200 py-6 lg:flex lg:items-start lg:justify-between lg:gap-10">
            <div className="lg:max-w-[760px]">
              <p className="typo-h5 font-normal text-black underline decoration-1 underline-offset-4">
                {row.href ? (
                  <a href={row.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                    {title}
                  </a>
                ) : (
                  title
                )}
              </p>
              <p className="typo-caption mt-1.5 text-gray-800">{row.source}</p>
            </div>
            <p className="typo-body-sm mt-3 text-gray-500 lg:mt-1 lg:shrink-0">{row.meta}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function Awards() {
  return (
    <section id="awards" aria-labelledby="awards-title" className="pb-10 pt-16 lg:pb-[50px] lg:pt-[120px]">
      <div className={container}>
        <Eyebrow>Awards &amp; Recognition</Eyebrow>
        <SectionTitle id="awards-title">Recognised Work.</SectionTitle>
        <div className="mt-6 lg:mt-10">
          <LinkRows rows={AWARDS} />
        </div>
      </div>
    </section>
  );
}

export function Media() {
  return (
    <section id="media" aria-labelledby="media-title" className="py-14 lg:py-[50px]">
      <div className={container}>
        <Eyebrow>Media &amp; Interviews</Eyebrow>
        <SectionTitle id="media-title">In the press</SectionTitle>
        <p className="typo-body-sm mt-3 max-w-[420px] capitalize text-gray-800">{MEDIA_INTRO}</p>
        <div className="mt-4 lg:mt-10">
          <LinkRows rows={MEDIA} />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

function BracketBox({ children }: { children: React.ReactNode }) {
  const corner = "absolute size-3 border-white";
  return (
    <div className="typo-body relative inline-flex items-center justify-center px-7 py-4 lg:min-w-[262px] lg:px-8 lg:py-5">
      <span aria-hidden className={cn(corner, "left-0 top-0 rounded-tl-[4px] border-l border-t")} />
      <span aria-hidden className={cn(corner, "right-0 top-0 rounded-tr-[4px] border-r border-t")} />
      <span aria-hidden className={cn(corner, "bottom-0 left-0 rounded-bl-[4px] border-b border-l")} />
      <span aria-hidden className={cn(corner, "bottom-0 right-0 rounded-br-[4px] border-b border-r")} />
      {children}
    </div>
  );
}

export function Registration() {
  return (
    <section aria-labelledby="registration-title" className="py-8 lg:py-[50px]">
      <div className="lg:mx-auto lg:w-full lg:max-w-[1196px] lg:px-5">
        <div className="bg-black px-8 py-12 text-center text-white lg:flex lg:items-center lg:justify-between lg:gap-8 lg:rounded-3xl lg:px-[45px] lg:py-9 lg:text-left">
          <div>
            <h2 id="registration-title" className="typo-h2 text-white">
              {REGISTRATION.title}
            </h2>
            <p className="typo-body mt-6 text-white lg:mt-1">
              {REGISTRATION.board}
              <span aria-hidden className="mx-2">
                ·
              </span>
              {REGISTRATION.registeredName}
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            <BracketBox>Registration No. {REGISTRATION.number}</BracketBox>
          </div>
        </div>
      </div>
    </section>
  );
}

function InsightCard({ item, index }: { item: Insight; index: number }) {
  const title = <span className="typo-h5 block text-black">{item.title}</span>;
  return (
    <li
      className={cn(
        // Mobile: kartu terpisah dalam carousel horizontal
        "w-[283px] shrink-0 snap-start rounded-[20px] border border-gray-200 p-7",
        // Desktop: sel dalam grid 2x2 dengan garis pembagi
        "lg:flex lg:w-auto lg:flex-col lg:justify-center lg:rounded-none lg:border-0 lg:p-10",
        index % 2 === 1 && "lg:border-l",
        index >= 2 && "lg:border-t",
      )}
    >
      <p className="typo-caption font-semibold text-gray-500">{item.category}</p>
      <h3 className="mt-2">
        {item.href ? (
          <Link href={item.href} className="hover:underline">
            {title}
          </Link>
        ) : (
          title
        )}
      </h3>
      <p className="typo-body-sm mt-2 text-gray-800 lg:max-w-[430px]">{item.excerpt}</p>
    </li>
  );
}

export function Insights() {
  return (
    <section id="insights" aria-labelledby="insights-title" className="py-14 lg:py-[50px]">
      <div className={container}>
        <Eyebrow>Insights by Nidal Ammache</Eyebrow>
        <SectionTitle id="insights-title">How Nidal Thinks.</SectionTitle>

        <ul
          className={cn(
            "-mx-6 mt-10 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-0 lg:overflow-hidden lg:rounded-3xl lg:border lg:border-gray-200 lg:px-0 lg:pb-0",
          )}
        >
          {INSIGHTS.map((item, i) => (
            <InsightCard key={item.title} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

export function VerifiedProfiles() {
  return (
    <section id="profiles" aria-labelledby="profiles-title" className="py-14 text-center lg:pb-[50px] lg:pt-[70px]">
      <div className={container}>
        <Eyebrow line={false} className="justify-center">
          Professional Links
        </Eyebrow>
        <SectionTitle id="profiles-title" className="mt-2">
          Verified Profiles.
        </SectionTitle>

        <ul className="mt-9 flex flex-col items-center gap-3 lg:mt-10 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-2">
          {PROFILES.map((p) => {
            const inner = (
              <>
                <Image src={p.icon} alt="" width={20} height={20} className="size-[18px] object-contain" />
                {p.label}
              </>
            );
            const cls =
              "typo-button inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-3 text-black transition";
            return (
              <li key={p.label}>
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer me" className={cn(cls, "hover:border-black")}>
                    {inner}
                  </a>
                ) : (
                  <span className={cls}>{inner}</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function ProjectCta() {
  return (
    <section aria-labelledby="cta-title" className="px-6 pb-20 pt-10 text-center lg:pb-[80px] lg:pt-[50px]">
      <h2 id="cta-title" className="typo-h2 text-black">
        Have a Site or <br className="lg:hidden" />
        Project in Mind?
      </h2>
      <p className="typo-body mx-auto mt-4 max-w-[360px] text-gray-800">
        Let&apos;s talk about how it can become a place people genuinely want to be in.
      </p>
      <Link
        href={CONTACT_HREF}
        className="typo-button mt-8 inline-block cursor-pointer rounded-full bg-black px-8 py-3 text-white transition hover:opacity-80 lg:mt-10"
      >
        Book a Concept Review
      </Link>
    </section>
  );
}
