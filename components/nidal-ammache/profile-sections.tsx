import Image from "next/image";
import { cn } from "@/lib/utils";
import { ABOUT, FOUNDER_QUOTE, LEADERSHIP, LEADERSHIP_INTRO, PHILOSOPHY } from "./data";
import { Eyebrow, LeadParagraph, QuoteMark, SectionTitle, container } from "./primitives";


export function FounderQuote() {
  return (
    <section aria-label="Quote from Nidal Ammache" className="bg-black px-12 py-16 text-center text-white lg:px-6 lg:py-12">
      <figure className="mx-auto max-w-[900px]">
        <QuoteMark className="mx-auto h-4 w-5 text-gray-400 lg:h-5 lg:w-[26px]" />
        <blockquote className="typo-body-lg mt-6 text-white lg:mt-4">
          <p>
            {FOUNDER_QUOTE.lines[0]} <br className="hidden lg:inline" />
            {FOUNDER_QUOTE.lines[1]}
          </p>
        </blockquote>
        <figcaption className="typo-fine mt-6 text-gray-400 lg:mt-4">{FOUNDER_QUOTE.cite}</figcaption>
      </figure>
    </section>
  );
}

export function About() {
  return (
    <section id="architecture-development-strategy" aria-labelledby="about-title" className="pb-14 pt-16 lg:pb-[50px] lg:pt-[100px]">
      <div className={cn(container, "lg:grid lg:grid-cols-2")}>
        <div>
          <Eyebrow>About Nidal</Eyebrow>
          <SectionTitle id="about-title">Architecture &amp; Development Strategy.</SectionTitle>
        </div>
        <div className="typo-body mt-10 space-y-6 text-black lg:mt-0 lg:max-w-[540px]">
          {ABOUT.map((p, i) => (
            <LeadParagraph key={i} lead={p.lead} text={p.text} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Philosophy() {
  return (
    <section id="development-philosophy" aria-labelledby="philosophy-title" className="py-14 lg:py-[50px]">
      <div className={container}>
        <Eyebrow>Development Philosophy</Eyebrow>
        <SectionTitle id="philosophy-title">
          Human-Centred.
          <br />
          Future-Driven.
        </SectionTitle>

        <ul className="mt-8 overflow-hidden rounded-[28px] border border-gray-200 lg:mt-9 lg:grid lg:grid-cols-2 lg:rounded-3xl">
          {PHILOSOPHY.map((item, i) => (
            <li
              key={item.title}
              className={cn(
                "border-gray-200 px-8 py-9 lg:px-[45px]",
                i > 0 && (i >= 2 ? "border-t" : "border-t lg:border-t-0"),
                i % 2 === 1 && "lg:border-l",
              )}
            >
              <div className="flex size-[52px] items-center justify-center rounded-md border border-gray-200 bg-white">
                <Image src={item.icon} alt="" width={26} height={26} className="size-[26px] object-contain" />
              </div>
              <h3 className="typo-h5 mt-7 text-black">{item.title}</h3>
              <p className="typo-body-sm mt-2 text-gray-800 lg:max-w-[430px]">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}


export function Leadership() {
  return (
    <section id="business-leadership" aria-labelledby="leadership-title" className="py-14 lg:pb-[50px] lg:pt-[90px]">
      <div className={container}>
        <Eyebrow>Business Leadership</Eyebrow>
        <SectionTitle id="leadership-title">Beyond Architecture.</SectionTitle>
        <p className="typo-body mt-4 max-w-[640px] capitalize text-black">{LEADERSHIP_INTRO}</p>

        <dl className="mt-10 lg:mt-12">
          {LEADERSHIP.map((role) => (
            <div
              key={role.name}
              className="border-b border-gray-200 py-7 lg:grid lg:min-h-[96px] lg:grid-cols-[322px_1fr] lg:items-center lg:py-5"
            >
              <dt className="typo-h5 font-normal text-black lg:max-w-[260px]">{role.name}</dt>
              <dd className="typo-body-sm mt-3 text-gray-500 lg:mt-0 lg:max-w-[770px]">{role.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
