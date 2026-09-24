import { CaseStudies } from "./case-studies";
import {
  Awards,
  Insights,
  Media,
  ProjectCta,
  Registration,
  VerifiedProfiles,
} from "./credibility-sections";
import { Hero } from "./hero";
import { NidalJsonLd } from "./json-ld";
import {
  About,
  FounderQuote,
  Leadership,
  Philosophy,
} from "./profile-sections";
import { FadeUp } from "./fade-up";

export function NidalAmmachePage() {
  return (
    <main className="bg-white text-black">
      <NidalJsonLd />

      <FadeUp>
        <Hero />
      </FadeUp>

      <FadeUp>
        <FounderQuote />
      </FadeUp>

      <FadeUp>
        <About />
      </FadeUp>

      <FadeUp>
        <Philosophy />
      </FadeUp>

      <FadeUp>
        <Leadership />
      </FadeUp>

      <FadeUp>
        <CaseStudies />
      </FadeUp>

      <FadeUp>
        <Awards />
      </FadeUp>

      <FadeUp>
        <Media />
      </FadeUp>

      <FadeUp>
        <Registration />
      </FadeUp>

      <FadeUp>
        <Insights />
      </FadeUp>

      <FadeUp>
        <VerifiedProfiles />
      </FadeUp>

      <FadeUp>
        <ProjectCta />
      </FadeUp>
    </main>
  );
}