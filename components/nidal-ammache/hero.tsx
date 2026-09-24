import { getImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { CountUp } from "./count-up";
import { HERO, PORTRAIT } from "./data";
import { Eyebrow, LeadParagraph, container } from "./primitives";

function Portrait() {
  const common = { alt: PORTRAIT.alt, fill: true } as const;
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: PORTRAIT.desktop, sizes: "(min-width: 1024px) 521px, 100vw" });
  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({ ...common, src: PORTRAIT.mobile, sizes: "100vw" });

  return (
    <div className="relative aspect-5/6 w-full overflow-hidden rounded-2xl bg-gray-100 lg:aspect-521/634 lg:max-w-[521px] lg:rounded-[22px]">
      <picture>
        <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
        <img {...rest} srcSet={mobileSrcSet} fetchPriority="high" className="object-cover" />
      </picture>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="about-nidal"
      aria-labelledby="nidal-title"
      className="pb-16 pt-[140px] md:pt-[180px] lg:pb-20 lg:pt-[220px]"
    >
      <div className={cn(container, "grid gap-8 lg:grid-cols-2 lg:gap-0")}>
        <div className="lg:max-w-[500px]">
          <Eyebrow>Founder</Eyebrow>

          <h1 id="nidal-title" className="typo-h1 mt-3 text-black">
            Nidal Ammache<span aria-hidden>.</span>
          </h1>

          <p className="typo-caption mt-4 hidden uppercase text-gray-800 lg:block">
            {HERO.roles.map((role, i) => (
              <span key={role}>
                {i > 0 && (
                  <span aria-hidden className="mx-1.5">
                    ·
                  </span>
                )}
                {role}
              </span>
            ))}
          </p>

        <dl className="mt-6 grid grid-cols-[1fr_1.45fr_1fr] gap-x-3 border-y border-gray-200 py-5 text-center">
          {HERO.stats.map((s) => (
            <div key={s.label.join(" ")} className="flex flex-col-reverse">
              <dt className="mt-2 text-[11px] leading-tight text-gray-500 lg:text-xs">
                {s.label[0]}
                <br />
                {s.label[1]}
              </dt>

              <dd className="whitespace-nowrap text-[30px] font-semibold leading-none text-black lg:text-[35px]">
                <CountUp
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              </dd>
            </div>
          ))}
        </dl>

          <div className="mt-8 space-y-6 text-black text-[15px] leading-relaxed lg:text-[14px]">
            {HERO.bio.map((p, i) => (
              <LeadParagraph key={i} lead={p.lead} text={p.text} />
            ))}
          </div>
        </div>

        <div className="order-first lg:order-none">
          <Portrait />
        </div>
      </div>
    </section>
  );
}
