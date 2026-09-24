import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CASE_STUDIES, CASE_STUDIES_INTRO, type CaseStudy } from "./data";
import { getCaseStudyProjects, type CaseStudyProject, type ProjectSpec } from "./get-case-study-projects";
import { Eyebrow, SectionTitle, container } from "./primitives";

const SPEC_LABELS: Record<string, string> = {
  project: "Sector",
  progress: "Status",
};

type Stat = { label: string; value: string };

function buildStats(specs: ProjectSpec[]): Stat[] {
  const find = (key: string) => specs.find((s) => s.key.toLowerCase() === key);
  const sector = find("project");
  const status = find("progress");
  const others = specs.filter((s) => s !== sector && s !== status);
  const room = 4 - (sector ? 1 : 0) - (status ? 1 : 0);

  return [sector, ...others.slice(0, room), status]
    .filter((s): s is ProjectSpec => Boolean(s))
    .map((s) => ({ label: SPEC_LABELS[s.key.toLowerCase()] ?? s.key, value: s.value }));
}

function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <dl
      className="overflow-hidden rounded-2xl border border-gray-200 lg:grid"
      style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}
    >
      {stats.map((s, i) => (
        <div
          key={`${s.label}-${i}`}
          className={cn(
            "flex flex-col-reverse border-gray-200 px-6 py-5 lg:min-h-[100px] lg:justify-end lg:px-5",
            i > 0 && "border-t lg:border-l lg:border-t-0",
          )}
        >
          <dd className="typo-h5 mt-1.5 uppercase text-black">{s.value}</dd>
          <dt className="typo-fine uppercase tracking-wider text-gray-500">{s.label}</dt>
        </div>
      ))}
    </dl>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="typo-h5 uppercase text-black">{title}</h4>
      <div className="typo-body-sm mt-2 text-gray-800">{children}</div>
    </div>
  );
}

function CaseStudyArticle({
  study,
  project,
  index,
}: {
  study: CaseStudy;
  project?: CaseStudyProject;
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  const id = study.dbSlug;
  const titleId = `${id}-title`;

  const name = project?.name ?? study.fallbackName;
  const image = project?.images[0];
  const stats = buildStats(project?.specifications ?? []);

  return (
    <article id={id} aria-labelledby={titleId} className="mx-auto w-full max-w-[790px]">
      <p className="typo-caption text-gray-800">Case Study {num}</p>
      <h3 id={titleId} className="typo-h2 mt-1 text-black">
        {name}
      </h3>
      <p className="typo-body-sm mt-3 uppercase text-gray-800">
        {study.type} <span aria-hidden>·</span> {study.location}
      </p>

      {image && (
        <div className="relative mt-8 aspect-4/5 overflow-hidden rounded-2xl bg-gray-100 sm:aspect-video lg:mt-9 lg:rounded-[22px]">
          <Image
            src={image}
            alt={`${name} by Ammache Architects`}
            fill
            sizes="(min-width: 1024px) 790px, 100vw"
            className="object-cover"
          />
        </div>
      )}

      {stats.length > 0 && (
        <div className="mt-6 lg:mt-5">
          <StatsBar stats={stats} />
        </div>
      )}

      {/* 7 poin case study — hardcode di data.ts */}
      <div className="mt-8 space-y-7 font-bold">
        <Block title="The Opportunity">
          <p>{study.opportunity}</p>
        </Block>
        <Block title="Development Challenge">
          <p>{study.challenge}</p>
        </Block>
        <Block title="Nidal’s Thinking">
          <p>{study.thinking}</p>
        </Block>

        <blockquote className="typo-body-lg border-l border-gray-300 pl-4 text-gray-500 lg:max-w-[420px]">
          <p>“{study.quote}”</p>
        </blockquote>

        <Block title="Design & Development Response">
          <p>{study.response}</p>
        </Block>
        <Block title="Human Outcome">
          <p>{study.humanOutcome}</p>
        </Block>
        <Block title="Commercial / Planning Outcome">
          <p>{study.commercialOutcome}</p>
        </Block>

        <div className="pt-2">
          <Block title="Project Facts">
            <ul className="lg:max-w-[560px]">
              {study.facts.map((fact) => (
                <li key={fact} className="lg:inline lg:after:content-['_·_'] lg:last:after:content-['.']">
                  {fact}
                </li>
              ))}
            </ul>
          </Block>
        </div>
      </div>
    </article>
  );
}

export async function CaseStudies() {
  const projects = await getCaseStudyProjects(CASE_STUDIES.map((s) => s.dbSlug));

  return (
    <section id="case-studies" aria-labelledby="case-studies-title" className="py-14 lg:py-[50px]">
      <div className={container}>
        <Eyebrow>Development Case Studies</Eyebrow>
        <SectionTitle id="case-studies-title">Large-scale developments, designed around people</SectionTitle>
        <p className="typo-body-sm mt-4 max-w-[900px] capitalize text-gray-800">
          {CASE_STUDIES_INTRO.before}{" "}
          <Link href="#about-nidal" className="underline underline-offset-2 lg:no-underline">
            {CASE_STUDIES_INTRO.name}
          </Link>{" "}
          {CASE_STUDIES_INTRO.after}
        </p>

        <div className="mt-16 space-y-24 lg:mt-[60px] lg:space-y-[90px]">
          {CASE_STUDIES.map((study, i) => (
            <CaseStudyArticle key={study.dbSlug} study={study} project={projects.get(study.dbSlug)} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
