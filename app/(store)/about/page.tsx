import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import { ABOUT } from '@/config/about';
import { JOURNEY, type JourneyStep } from '@/config/journey';
import { DEMO_LOOKS, STYLING_OUTPUTS } from '@/config/batch-demo';
import CV from '@/config/cv.json';
import { SITE } from '@/config/site';
import { imageExists } from '@/lib/images';
import { WORKFLOW_CHALLENGES } from '@/lib/node-workflow';
import { AboutTimeline } from '@/components/about/AboutTimeline';
import { BatchPipelineDemo } from '@/components/about/BatchPipelineDemo';
import { JourneyScene, JourneyOpen, JourneySurface } from '@/components/about/JourneyScene';
import { JourneyGallery } from '@/components/about/JourneyGallery';
import { JourneyVideoGallery } from '@/components/about/JourneyVideoGallery';
import { NodeWorkflowDemo } from '@/components/about/NodeWorkflowDemo';
import { TerminalExperiment } from '@/components/about/TerminalExperiment';
import { ExperimentResults } from '@/components/about/ExperimentResults';
import { KanbanDemo } from '@/components/about/KanbanDemo';
import { InlineShowreel } from '@/components/about/InlineShowreel';
import '@/components/about/about.css';
import '@/components/about/styling.css';
import '@/components/about/chapter-media.css';
import '@/components/about/interactive-demos.css';
import '@/components/about/embedded-surfaces.css';
import '@/components/about/canals.css';
import '@/components/about/chapter-experiences.css';

export const metadata: Metadata = { title: ABOUT.title, description: ABOUT.description };
const chapters = [
  { id: 'introduction', number: '00', label: ABOUT.title },
  ...JOURNEY.steps.map(({ id, number, label }) => ({ id, number, label })),
  { id: 'cv', number: '09', label: 'CV & contact' },
].map((chapter) => ({ ...chapter, color: JOURNEY.scenes[chapter.id as keyof typeof JOURNEY.scenes].color }));

export default function AboutPage() {
  return (
    <AboutTimeline chapters={chapters} label={JOURNEY.title}>
      <Chapter id="introduction">
        <div className="story-copy">
          <p className="timeline-eyebrow">{ABOUT.eyebrow}</p>
          <h1 id="introduction-title" tabIndex={-1} className="timeline-title">{ABOUT.heading}</h1>
          <div className="story-role-group"><p className="story-role">{ABOUT.role}</p><p className="story-employer">{ABOUT.employer}</p></div>
          <div className="evidence-biography">{ABOUT.biography.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <a href="#before-ai" className="story-action">{JOURNEY.title}<span aria-hidden>→</span></a>
        </div>
        <div className="story-visual story-intro-visual">
          <div className="evidence-about-portrait" data-placeholder={!imageExists(ABOUT.portrait.src)}>
            {imageExists(ABOUT.portrait.src) ? <Image src={ABOUT.portrait.src} alt={ABOUT.portrait.alt} fill unoptimized sizes="(max-width: 1000px) 90vw, 48vw" className="object-cover" style={{ objectPosition: ABOUT.portrait.position, transform: `scale(${ABOUT.portrait.scale})`, transformOrigin: '50% 40%' }} /> : <><span className="portrait-kicker">Portrait / 01</span><svg className="portrait-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden><circle cx="12" cy="8" r="3.5" /><path d="M5 21v-3a7 7 0 0 1 14 0v3" /></svg><span>{ABOUT.portrait.placeholder}</span></>}
          </div>
        </div>
      </Chapter>

      {JOURNEY.steps.map((step) => <JourneyChapter key={step.id} step={step} />)}

      <Chapter id="cv">
        <div className="story-copy">
          <p className="timeline-eyebrow">09 / CV & contact</p><h2 id="cv-title" tabIndex={-1} className="timeline-title">{ABOUT.cv.title}</h2>
          <p className="timeline-copy">{ABOUT.cv.note}</p>
          <a href={`/about/${CV.labels.filename}`} download={CV.labels.filename} className="story-action story-download">{CV.labels.download}<span aria-hidden>↓</span></a>
          <div className="story-contact"><a href={`mailto:${SITE.contactEmail}`}>{ABOUT.contactLabel}<span aria-hidden>↗</span></a><span>{CV.labels.format}</span></div>
        </div>
        <div className="story-visual story-cv-visual">
          <JourneySurface panels={[{ id: 'cv-preview', title: ABOUT.cv.previewLabel, content: <div className="timeline-cv-paper">
              <p className="timeline-eyebrow">{CV.status}</p><h3>{CV.name}</h3><p>{CV.title}</p><p>{CV.currentRole}<br /><span>{CV.employer}</span></p>
              <p className="timeline-cv-note">{CV.location}<br /><a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a><br /><a href={`tel:${CV.phone.replaceAll(' ', '')}`}>{CV.phone}</a></p>
              <h4>{CV.labels.profile}</h4><p>{CV.profile}</p>
              <h4>{CV.labels.employment}</h4>{CV.employment.map((job) => <section className="timeline-cv-job" key={job.employer} aria-label={`${job.role} at ${job.employer}`}><p><strong>{job.employer === 'Freelance' ? job.employer : `${job.employer} / ${job.role}`}</strong><br />{job.period}</p><p>{job.summary}</p>{job.points.map((point) => <p key={point}>{point}</p>)}</section>)}
              <h4>{CV.labels.project}</h4><p><strong>{CV.project.name}</strong> / {CV.project.period}<br />{CV.project.type}</p>
              {CV.project.points.map((point) => <p key={point}>{point}</p>)}<h4>{CV.labels.skills}</h4><p>{CV.skills.join(' / ')}</p>
              <h4>{CV.labels.education}</h4>{CV.education.map((item) => <p key={item.institution}>{item.institution} / {item.course}</p>)}
            </div> }]}><div className="story-cv-cover"><p className="timeline-eyebrow">{CV.status}</p><span className="story-cv-mark" aria-hidden>CV</span><p>{ABOUT.role}<span>{ABOUT.employer}</span></p><JourneyOpen panel="cv-preview">{ABOUT.cv.previewLabel}</JourneyOpen></div></JourneySurface>
        </div>
      </Chapter>
    </AboutTimeline>
  );
}

function JourneyChapter({ step }: { step: JourneyStep }) {
  const gallery = step.gallery?.items.filter((item) => imageExists(item.src)) ?? [];
  const videos = step.videos?.items.filter((item) => imageExists(item.src)).map((item) => ({ ...item, poster: imageExists(item.poster) ? item.poster : undefined })) ?? [];
  const reel = step.showreel;
  const hasReel = reel && imageExists(reel.src);
  const poster = reel && imageExists(reel.poster) ? reel.poster : undefined;
  const isTool = step.id === 'production-tools';
  const isTerminal = step.id === 'experiments';
  const isLearning = step.id === 'machine-learning';
  const isNode = step.id === 'one-off-creatives';
  const isBatch = step.id === 'batch-production';
  const hasInlineGallery = isBatch || step.id === 'next';
  const looks = isBatch ? DEMO_LOOKS.filter((look) => [look.model, look.garment, look.stylingReference, look.primary, look.back, ...look.derivatives].every(imageExists)) : [];
  const outputs = isBatch ? STYLING_OUTPUTS.filter((output) => [output.primary, output.back, ...output.derivatives].every(imageExists)) : [];
  const challenges = isNode ? WORKFLOW_CHALLENGES.map((challenge) => ({ ...challenge, images: challenge.images.filter((image) => imageExists(image.src)) })) : [];
  const panels: { id: string; title: string; content: ReactNode; fit?: boolean }[] = [];
  if (gallery.length && !isTerminal && !isLearning && !hasInlineGallery) panels.push({ id: 'gallery', title: step.gallery!.title, content: <JourneyGallery items={gallery} title={step.gallery!.title} expanded /> });
  if (isBatch) panels.push({ id: 'pipeline', title: '07 / An illustrative pipeline', fit: true, content: <BatchPipelineDemo looks={looks} outputs={outputs} /> });
  if (step.details) panels.push({ id: 'details', title: step.details.title, content: <div className="journey-detail-copy">{step.details.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div> });

  return <Chapter id={step.id}>
    <div className="story-copy">
      <p className="timeline-eyebrow"><span>{step.number}</span>{step.label}</p>
      <h2 id={`${step.id}-title`} tabIndex={-1} className="timeline-title">{step.title}</h2>
      <div className="journey-prose">{step.body.map((paragraph) => <p className="timeline-copy" key={paragraph}>{paragraph}</p>)}</div>
      <div className="journey-actions">
        {gallery.length > 0 && !isTerminal && !isLearning && !hasInlineGallery && <JourneyOpen panel="gallery">{JOURNEY.galleryAction}</JourneyOpen>}
        {isBatch && <JourneyOpen panel="pipeline">{JOURNEY.demoAction}</JourneyOpen>}
        {step.details && <JourneyOpen panel="details">{step.details.label}</JourneyOpen>}
      </div>
      {step.toolImpact && <div className="journey-tool-impact"><strong>{step.toolImpact.value}</strong><p>{step.toolImpact.label}<span>{step.toolImpact.period}</span></p></div>}
    </div>
    <div className={`story-visual story-evidence-visual${isBatch ? ' story-results-visual' : ''}`}>
      <JourneySurface panels={panels}>
      {step.impact && <div className="journey-impact"><p><strong>{step.impact.value}</strong><span>{step.impact.label}</span></p><p>{step.impact.note}</p></div>}
      {step.videos && (videos.length ? <JourneyVideoGallery title={step.videos.title} items={videos} /> : <MediaPlaceholder number={step.number} title={step.videos.title} label={JOURNEY.showreelPending} mark="▶" />)}
      {reel && (hasReel ? <InlineShowreel src={reel.src} poster={poster} title={reel.title} /> : poster ? <figure className="journey-reel-preview"><div><Image src={poster} alt={`${reel.title} poster`} fill unoptimized sizes="(max-width: 767px) 85vw, 45vw" className="object-contain" /></div><figcaption><span aria-hidden>▶</span>{reel.title}<small>{JOURNEY.showreelPending}</small></figcaption></figure> : <MediaPlaceholder number={step.number} title={reel.title} label={JOURNEY.showreelPending} mark="▶" />)}
      {step.gallery && !isTerminal && !isLearning && (gallery.length ? <JourneyGallery title={step.gallery.title} items={gallery} autoPlay={step.gallery.autoPlay} /> : <MediaPlaceholder number={step.number} title={step.gallery.title} label={JOURNEY.galleryPending} />)}
      {isTerminal && <TerminalExperiment />}
      {isLearning && <ExperimentResults items={step.gallery!.items.map((item) => ({ ...item, src: imageExists(item.src) ? item.src : null }))} />}
      {isTool && <KanbanDemo />}
      {isNode && <NodeWorkflowDemo challenges={challenges} />}
      {step.speaking && <p className="journey-speaking">{step.speaking}</p>}
      </JourneySurface>
    </div>
  </Chapter>;
}

function MediaPlaceholder({ title, label, number, mark }: { title: string; label: string; number: string; mark?: string }) {
  return <div className="journey-media-placeholder"><span className="timeline-eyebrow">{number} / {label}</span><span className="journey-media-mark" aria-hidden>{mark ?? '＋'}</span><h3>{title}</h3></div>;
}

function Chapter({ id, children }: { id: string; children: ReactNode }) {
  const index = chapters.findIndex((chapter) => chapter.id === id);
  const next = chapters[index + 1];
  const scene = JOURNEY.scenes[id as keyof typeof JOURNEY.scenes];
  return <section id={id} aria-labelledby={`${id}-title`} className="timeline-chapter" style={{ '--chapter-ground': `rgb(${scene.color.join(',')})`, '--chapter-ink': scene.color[0] < 100 ? '#fffdf4' : '#171717' } as CSSProperties}><span className="story-landmark" aria-hidden>{scene.word}</span><JourneyScene>{children}</JourneyScene><a className="timeline-skip" href={`#${next?.id ?? 'introduction'}`}>{next ? `${JOURNEY.nextLabel}: ${next.label}` : ABOUT.timeline.backLabel}<span aria-hidden>→</span></a></section>;
}
