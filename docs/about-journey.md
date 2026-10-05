# How I Got Here: content and demo guide

The About page follows the supplied career notes: Film Production at Ravensbourne,
studio/agency/freelance work, 2.5 years implementing 3D at JD Sports, then AI
content, workflows and production tools at Debenhams Group. Chapter copy lives in
`config/journey.ts`; the personal introduction is in `config/about.ts`.
The Looks result is approximately 92% lower production cost per product, calculated
from the supplied approximate £25 and £2 figures. The longer business impact and
industry conversations also open from the batch chapter. America and the named
organisations now appear directly in the chapter copy. Named organisations in that
account are conversation participants, not implied clients or endorsements.
“Seers” in the notes has been interpreted as “Sears”; no exact dates are inferred.

## Presentation

The default view uses one pinned, full-screen stage. Native vertical scrolling
moves a continuous horizontal strip of upright imagery, large type and distinct
chapter panels. The direction follows the
[Canals reference](https://www.awwwards.com/inspiration/smooth-horizontal-navigation-canals):
an editorial strip with a narrow navigation rail. The palette uses paper,
ink and PRTFLO's cobalt accent. Visitors can also drag the strip, swipe sideways,
or use a horizontal trackpad gesture. Vertical touch scrolling remains native.
Chapters use solid colour backgrounds. Images appear only in the introductory
portrait, chapter galleries, showreels and interactive demos. Media masks stay
rectangular, with insets limited to 1.25% and editorial edge movement to 1.5
percentage points. There is no animated zoom or corner rounding.
Chapter jumps use only a short fade and a 4–8px offset. Shared site reveals,
background drift and image blur have also been softened.
Media extends to the slide edges beneath a continuous editorial sheet. The copy
sits directly on that sheet; separate card backgrounds, picture mounts and label
plates have been removed. `embedded-surfaces.css` owns this layer arrangement.
The reference media is not part of the site; all content remains the user's
introductory portrait and project examples, with clearly marked spaces until supplied.

Scene colours and large words live in `JOURNEY.scenes` in
`config/journey.ts`. Story presentation is in `components/about/canals.css`;
shared reading-view and demo styles remain in `about.css`.
`lib/journey-frames.ts` controls the subtle media framing and editorial edge.
There is no decorative background image layer.
The persistent chapter menu, progress markers and previous/next controls skip
directly to a chapter. Arrow keys, Page Up/Down, Home and End also navigate when
focus is outside an interactive control. Direct chapter URLs work, such as
`/about#batch-production`.

The equipment demo, node game, pipeline demo, business impact, showreels and CV
preview open inside the slide's media area. The editorial sheet becomes narrower
to make room for the work. On mobile, a compact chapter heading remains above it.
Supplied chapter images also have an in-slide viewing button.
`JourneyScene.tsx` controls the active view and its focus. Back to the story or
Escape restores the chapter view and focuses its opener. Video pauses when its
view closes or its chapter is left. Interactive views scroll independently;
chapter shortcuts stay available. The CV download remains in the final chapter.

The chapter menu includes a reading view. Short viewports automatically use the
unconstrained page layout, and reduced-motion preferences disable the camera
movement and animated jumps. Without JavaScript, the
chapters remain a readable page.

## Introductory portrait

The introductory portrait uses `public/about/journey/america-01.webp`, derived
from `public/about/America/20260513_174423270_iOS.jpg`. A fixed 3:4 frame and the
position/scale in `config/about.ts` crop around Elliott, the middle participant.
This is a display crop; the original group photograph is unchanged. The frame
follows the cropped image boundary. The separate image in `public/about/Me/` is
not used. America photos are not shown in Chapter 07; its media area is reserved
for the pipeline preview.

## Chapter evidence

Put these in `public/about/journey/`, or change their paths in `config/journey.ts`:

| Chapter | Asset | Notes to supply |
| --- | --- | --- |
| 01 / Before AI | `motion-showreel.mp4`, optional `pre-ai.webp` poster | 3D motion showreel |
| 02 / Early exploration | `early-experiment.webp`, `early-experiment-02.webp`, `early-experiment-03.webp` | Example images and individual captions |
| 03 / Machine learning | `machine-learning.webp`, `machine-learning-02.webp`, `machine-learning-03.webp` | VTON / machine learning examples |
| 04 / Production tools | No media needed | Interactive equipment tracker |
| 05 / Node workflows | No media needed | Interactive connection game |
| 06 / Video | `ai-video/*.mp4` and matching `.webp` posters | Nine supplied AI creative films in an inline video gallery |
| 07 / Batch production | Existing ecommerce images from `config/batch-demo.ts` | Pipeline preview and interactive demo |
| 08 / What comes next | `ai-creative/*.webp` | Thirteen supplied creative images; originals in `public/about/ai creative/` |

Galleries show only files that exist; add or reorder items in `config/journey.ts`
and give each image a useful caption and alt text. One image works on its own;
two or more enable previous/next buttons. Images and reel posters stay within
their chapter media areas. Rebuild the site after adding files.
Missing media shows labelled spaces. Showreels do not substitute the campaign
film. Videos play directly in their content spot, muted and looping. Playback
pauses when the chapter leaves view; reduced-motion visitors use the native play
control instead of autoplay.

Chapter 06 uses the original uploads in `public/about/ai video/` as its source
material. Web copies and one-second poster frames live in
`public/about/journey/ai-video/`. The copies use H.264, the original audio track
and fast-start MP4 metadata, with the originals preserved. Playback starts muted;
visitors can enable audio using the native video controls. The festival film is
converted to square pixels while preserving its display aspect ratio. Only the
selected clip is mounted; previous/next buttons switch films without opening
another panel. The list, order and display titles live in the `video` step's
`videos.items` in `config/journey.ts`.

## Interactive chapters

Chapter 04 has a fictional agency Kanban board. Drag a brief, or select a card
and choose its destination column. A forward move triggers a delayed client
amend and sends the brief back one column, with the joke announced in the status
line. Moving the same card again cancels its previous pending amend; Reset
cancels all pending amends and restores the board. These are fictional briefs,
not a connection to an internal system.

The real 468-job result covers 18 months. The large counter advances in twos to
468 while visible and replays on re-entry. It pauses in hidden browser tabs;
reduced-motion visitors see the total immediately.

Chapter 05 has three node challenges: create a look, add pose direction, and
route the result through human review before delivery. Select an output then
an input to wire nodes. Select a connected input without an output to disconnect.
Drag titles to move nodes, or focus a title and use arrow keys. Hints select the
next useful output. Incorrect or missing connections block completion; correct
wiring unlocks saved PRTFLO imagery, never an AI service. Challenges and validation
live in `lib/node-workflow.ts`. Touch and keyboard work without drag gestures.

Both demos open inside the slide and keep changes in memory only. The illustrative batch
pipeline remains reachable from chapter 07.

## Batch pipeline demo

The flow was informed by read-only inspection of the supplied Looks codebase:

- `src/types/generationQueue.ts`: grouped model/product inputs and batch jobs.
- `functions/src/index.ts`: primary, back and derivative phases; derivatives
  depend on a primary image.
- `src/lib/approvalQueue.ts` and `src/types/index.ts`: review and delivery gates.

The portfolio is an independent, indicative frontend demonstration using only
existing PRTFLO ecommerce images. It does not generate, restyle or deliver assets.

Chapter 07's overview and pipeline use the same three tee sets. Styling labels
in `config/batch-demo.ts` describe the full-look `stylingReference` image:

- Navy tee: cropped black trousers, black loafers and an ecru high-neck underlayer.
  The underlayer appears only in the editorial and detail images; the front and
  back catalogue views show the tee alone. This difference is labelled in the demo.
- Green tee: washed black jeans and tan lace-up shoes.
- Oxblood tee: wide-leg ecru trousers and brown sandals.

These are descriptive classifications, not separate products or a wardrobe that
can be mixed. The demo uses the complete existing looks, so there are no unsupported
combinations or requests for newly generated images. Visitors choose a catalogue
or alternate primary view, then step through back, additional views, review and
an illustrative delivery manifest. Both primary choices resolve to saved imagery.

The source paths, classifications and any styling differences live in `DEMO_LOOKS`.
`STYLING_OUTPUTS` maps each available primary choice to its existing shot set.
Only use inspected ecommerce images when adding more examples; include the full-look
reference in the asset checks and describe any differences across the set.

All looks need an approve/hold decision before delivery; at least one must be
approved. Held looks are excluded from the example manifest. A primary-view change
clears approvals and restarts the batch. Reset returns to the original examples.
The exported brief and manifest include `demo: true`, `illustrative: true`, source
references and styling classifications. No assets are sent to a production service.

Run `npm run test:demo` for the state and approval-gate checks.

## Future chapter

Chapter 08 focuses on ambitious creative made by a small team working closely
together, with quick turnarounds and a high standard for the finished assets.
Film, motion, 3D and AI tools support shared creative direction and iteration.
The copy also states the supplied achievement: an in-house tool built by Elliott
that lets creatives across the business create AI content themselves. A prominent
metric beside that story states the supplied result: 1,400+ assets created with
the tool in two months. Further
ambitions are framed as future direction, without inventing team sizes, delivery
times, tool features or campaign credits.

The slideshow is visible directly in the chapter and uses the thirteen supplied
images in `public/about/ai creative/`. Optimised WebP copies, with a maximum edge
of 1800px, live in `public/about/journey/ai-creative/`; originals remain unchanged.
Update the `next` step's `gallery.items` in `config/journey.ts` to change the order,
captions or alt text. Captions describe the images without inventing campaign
credits. Images fit within the frame by default. The sports image uses a centred
3:4 portrait crop via its `crop: 'portrait'` setting, keeping the face and England
badge visible. This affects presentation only; its image file remains intact.

Chapter 08 has `gallery.autoPlay` enabled. The slideshow advances every five
seconds while visible, with a gentle fade and pause/play and previous/next
controls. Hover, keyboard focus, a hidden browser tab or leaving the chapter
pauses automatic movement. Manual navigation pauses the slideshow until Play is
selected again. Reduced-motion preferences disable automatic movement and the
fade, leaving the manual image controls available. Other galleries stay manual.
