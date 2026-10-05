// Add dates and personal examples when supplied. Empty assets render reserved
// spaces, not invented work. The introduction has the page's only portrait.
export interface JourneyStep {
  id: string;
  number: string;
  label: string;
  title: string;
  body: readonly string[];
  example?: { title: string; src: string; alt: string; note: string };
  impact?: { value: string; label: string; note: string };
  toolImpact?: { value: string; label: string; period: string };
  details?: { label: string; title: string; paragraphs: readonly string[] };
  showreel?: { title: string; src: string; poster: string };
  videos?: { title: string; items: readonly { src: string; poster: string; title: string }[] };
  gallery?: { title: string; autoPlay?: boolean; items: readonly { src: string; alt: string; caption: string; crop?: 'portrait' }[] };
  speaking?: string;
}

export const JOURNEY = {
  title: 'How I got here.',
  introduction: 'I started in motion design, specialising in 3D. Over the last two years, that work has taken me into AI content, coding and production tools.',
  exampleLabel: 'Example to follow',
  nextLabel: 'Next chapter',
  menuLabel: 'Jump to a chapter',
  cvLabel: 'CV',
  controls: {
    portfolio: 'Back to portfolio',
    chapters: 'Chapters',
    previous: 'Previous chapter',
    next: 'Next chapter',
    hint: 'Scroll or drag to explore →',
    read: 'Read as a page',
    story: 'View as a story',
    close: 'Close',
    progress: 'Story chapters',
  },
  demoAction: 'Try the pipeline',
  demoPreview: 'Inputs to approved outputs',
  videoAction: 'Watch the film',
  showreelAction: 'Watch the showreel',
  showreelPending: 'Showreel to follow',
  galleryPending: 'Images to follow',
  galleryAction: 'View the images',
  nodeAction: 'Play with the workflow',
  nodeTitle: 'Just one more connection.',
  toolAction: 'Try the production tool',
  toolTitle: 'A perfectly normal agency week.',
  exampleAction: 'View the work',
  scenes: {
    introduction: { word: 'HELLO.', color: [244, 243, 238] },
    'before-ai': { word: '3D.', color: [24, 24, 22] },
    experiments: { word: 'WHAT IF?', color: [244, 243, 238] },
    'machine-learning': { word: 'LEARN.', color: [244, 243, 238] },
    'production-tools': { word: 'BUILD.', color: [244, 243, 238] },
    'one-off-creatives': { word: 'CONNECT.', color: [244, 243, 238] },
    video: { word: 'MOTION.', color: [24, 24, 22] },
    'batch-production': { word: 'REPEAT.', color: [244, 243, 238] },
    next: { word: 'NEXT.', color: [244, 243, 238] },
    cv: { word: 'LET’S TALK.', color: [244, 243, 238] },
  },
  steps: [
    {
      id: 'before-ai', number: '01', label: 'Before AI', title: 'Motion came first.',
      body: [
        'I studied Film Production at Ravensbourne University, then spent the years before AI working across studios, agencies and freelance. My roles moved between motion design, creative design and videography, with 3D becoming a big part of the work.',
        'I spent 2.5 years at JD Sports introducing 3D into creative projects and producing assets for the site. I’ve also worked with clients including Nike, Adidas and Frasers Group.',
        'That background still shapes how I approach AI. I think about the finished piece, but also the production work around it: the assets, the decisions and how to get something usable over the line.',
      ],
      showreel: { title: '3D motion showreel', src: '/about/journey/motion-showreel.mp4', poster: '/about/journey/pre-ai.webp' },
    },
    {
      id: 'experiments', number: '02', label: 'Early exploration', title: 'Well, it made something.',
      body: [
        'I started with local generations through the terminal, alongside online tools such as Runway. Coming from motion design, I wanted to see where this might fit into making real content.',
        'Early virtual try-on had promise. It also had some fairly loose opinions on where a sleeve should go.',
        'The little recreation here gives you the idea. Pick a garment, run the experiment and keep your expectations sensible.',
      ],
      gallery: { title: 'Early exploration', items: [
        { src: '/about/journey/early-experiment.webp', alt: 'Early AI exploration, first example', caption: 'Early exploration / 01' },
        { src: '/about/journey/early-experiment-02.webp', alt: 'Early AI exploration, second example', caption: 'Early exploration / 02' },
        { src: '/about/journey/early-experiment-03.webp', alt: 'Early AI exploration, third example', caption: 'Early exploration / 03' },
      ] },
    },
    {
      id: 'machine-learning', number: '03', label: 'Machine learning', title: 'My computer deserved better.',
      body: [
        'Then I went further into the machine-learning side: trawling Hugging Face, trying early workflows and working with a corpus of 50,000 images. My machine was doing a fairly convincing impression of a space heater.',
        'A lot of time went in. Some very questionable images came out. Let’s just say the results didn’t quite reflect the electricity bill.',
        'The point was still commercial: could this become a useful way to make product content? Understanding why it went wrong was part of working out what a studio would need to trust it.',
      ],
      gallery: { title: 'Machine learning experiments', items: [
        { src: '/about/machine-learning results/Model_001.png', alt: 'Early machine learning result, experiment 1', caption: '50,000 images in. This came out.' },
        { src: '/about/machine-learning results/Model_002.png', alt: 'Early machine learning result, experiment 2', caption: 'The computer gave everything. The result gave very little.' },
        { src: '/about/machine-learning results/Model_003.png', alt: 'Early machine learning result, experiment 3', caption: 'A lot of waiting for a very qualified “interesting”.' },
        { src: '/about/machine-learning results/Model_004.png', alt: 'Early machine learning result, experiment 4', caption: 'At this point, a tea break felt like progress.' },
        { src: '/about/machine-learning results/Model_005.png', alt: 'Early machine learning result, experiment 5', caption: 'Still, there was enough here to keep me trying.' },
      ] },
    },
    {
      id: 'production-tools', number: '04', label: 'Coding tools', title: 'I could build that.',
      body: [
        'I come from a family full of software engineers and developers, so I was curious about what the early AI coding models could help me build.',
        'I started with the day-to-day problems around production: keeping work moving, tracking equipment and taking repetitive jobs off people’s plates. One of my creations went on to handle 468 jobs over 18 months.',
        'That mattered more than getting a demo to work. People were actually using something I’d built. The board here is a playful version of that world. Any resemblance to your latest client feedback is entirely unsurprising.',
      ],
    },
    {
      id: 'one-off-creatives', number: '05', label: 'Node-based workflows', title: 'Just one more node.',
      body: [
        'Node-based workflows were where I started joining the experiments together. I wanted to understand how separate steps could become a production process, rather than a result I’d struggle to recreate.',
        'I began building towards bulk generation: connecting references, instructions and outputs, then working out where the process needed more control. The goal was a workflow we could repeat and eventually put in front of a team.',
        'The exercise here lets you play with that idea. Connect the inputs, build the look, then add review before delivery. It uses saved images, so your experiment won’t run up a GPU bill.',
      ],
    },
    {
      id: 'video', number: '06', label: 'Video creative', title: 'Back to moving image.',
      body: [
        'My background is in moving image, so video was always going to pull me back in. I’ve been using new video models to make content while keeping a close eye on new releases.',
        'When something drops, I want to see what it can actually do. A promising clip is a starting point; the interesting question is how much control I have and whether the result works as part of a finished piece.',
        'Here’s where those experiments return to the thing I started with: making moving-image content.',
      ],
      videos: { title: 'AI video creative', items: [
        { title: 'Boohoo / Reel', src: '/about/journey/ai-video/boohoo-reel.mp4', poster: '/about/journey/ai-video/boohoo-reel.webp' },
        { title: 'Karen Millen / Creative', src: '/about/journey/ai-video/km-creative.mp4', poster: '/about/journey/ai-video/km-creative.webp' },
        { title: 'Karen Millen / In-store', src: '/about/journey/ai-video/km-in-store.mp4', poster: '/about/journey/ai-video/km-in-store.webp' },
        { title: 'Nasty Gal / Festival', src: '/about/journey/ai-video/ng-festival.mp4', poster: '/about/journey/ai-video/ng-festival.webp' },
        { title: 'Rab / Marketplace', src: '/about/journey/ai-video/rab-marketplace.mp4', poster: '/about/journey/ai-video/rab-marketplace.webp' },
        { title: 'Scent Stories / YSL Absolut', src: '/about/journey/ai-video/scent-stories-ysl.mp4', poster: '/about/journey/ai-video/scent-stories-ysl.webp' },
        { title: 'Scent Stories / Miu Miu', src: '/about/journey/ai-video/scent-stories-miu-miu.mp4', poster: '/about/journey/ai-video/scent-stories-miu-miu.webp' },
        { title: 'Scent Stories / Azzaro', src: '/about/journey/ai-video/scent-stories-azzaro.mp4', poster: '/about/journey/ai-video/scent-stories-azzaro.webp' },
        { title: 'Scent Stories / Drake', src: '/about/journey/ai-video/scent-stories-drake.mp4', poster: '/about/journey/ai-video/scent-stories-drake.webp' },
      ] },
    },
    {
      id: 'batch-production', number: '07', label: 'Batch production', title: 'Built for the studio.',
      body: [
        'I built an in-house AI workflow to take a garment reference through styling, batch generation, review and delivery. A whole production process, in one place.',
        'It cut production costs by around 92% per product and opened the door to paid work for external vendors, helping the studio move from cost centre to profit-making.',
        'The pipeline here is indicative. It uses existing PRTFLO ecommerce imagery, with labels describing what each look is styled with.',
      ],
      impact: { value: '≈92%', label: 'lower production cost per product', note: 'Approximate before-and-after costs from the in-house workflow, separate from this illustrative demo.' },
      speaking: 'I presented the work in America to industry leaders from companies including Ralph Lauren, Walmart, The Home Depot and Calvin Klein.',
      gallery: { title: 'Existing ecommerce looks / indicative styling', items: [
        { src: '/products/men/heavyweight-boxy-tee/02.webp', alt: 'Navy boxy tee layered over an ecru top with cropped black trousers and black loafers', caption: 'Navy tee / black trousers / loafers' },
        { src: '/products/men/garment-dyed-slogan-tee/01.webp', alt: 'Green slogan tee with washed black jeans and tan lace-up shoes', caption: 'Green tee / black jeans / tan shoes' },
        { src: '/products/men/heavyweight-crew-tee/02.webp', alt: 'Oxblood crew tee with wide-leg ecru trousers and brown sandals', caption: 'Oxblood tee / ecru trousers / sandals' },
      ] },
    },
    {
      id: 'next', number: '08', label: 'What comes next', title: 'A close team. A high bar.',
      toolImpact: { value: '1,400+', label: 'assets created', period: 'in two months' },
      body: [
        'The work I want to do more of is ambitious creative, made by a small team working closely together. A shared direction, quick decisions and a short turnaround from the first conversation to the finished assets.',
        'I’ve built an in-house tool that lets creatives across the business create AI content themselves. It gives the team a way to try ideas and make work, with the creative decisions in their hands.',
        'That’s the part I want to keep bringing together: my background in film, motion and 3D, the tools I can build, and good people making good work. Moving quickly, while keeping a high bar for the finish.',
      ],
      gallery: { title: 'AI creative', autoPlay: true, items: [
        { src: '/about/journey/ai-creative/tailoring.webp', alt: 'Woman in a cream outfit seated beside glass-block windows in a bright modern interior', caption: 'Tailoring / Light & space' },
        { src: '/about/journey/ai-creative/floral-fashion.webp', alt: 'Woman in a flowing floral dress beneath the skylight of a pale geometric interior', caption: 'Fashion / Shape & movement' },
        { src: '/about/journey/ai-creative/green-coat.webp', alt: 'Woman in a green coat and dark boots leaning against a concrete wall beside a garden', caption: 'Outerwear / Concrete & green' },
        { src: '/about/journey/ai-creative/eveningwear.webp', alt: 'Woman in a long magenta dress leaning back in an urban courtyard', caption: 'Eveningwear / Colour & form' },
        { src: '/about/journey/ai-creative/city-styling.webp', alt: 'Woman in a black top and ochre skirt beside ornate stone architecture', caption: 'Styling / In the city' },
        { src: '/about/journey/ai-creative/poolside.webp', alt: 'Woman in a patterned bikini reclining on a striped sunlounger beside a swimming pool', caption: 'Swimwear / Poolside' },
        { src: '/about/journey/ai-creative/summer-knit.webp', alt: 'Woman wearing a striped knit top and shorts against a blue sea and sky', caption: 'Summer / Knitwear' },
        { src: '/about/journey/ai-creative/old-town.webp', alt: 'Woman in a pale summer outfit sitting on a stone step in a sunlit square', caption: 'Summer / Old town' },
        { src: '/about/journey/ai-creative/casual-fashion.webp', alt: 'Woman in a white vest and striped trousers crouching in a tiled waiting area', caption: 'Everyday / Relaxed styling' },
        { src: '/about/journey/ai-creative/cabin-styling.webp', alt: 'Woman in a brown top, patterned skirt and boots standing in a timber-lined cabin', caption: 'Styling / Warm textures' },
        { src: '/about/journey/ai-creative/football-portrait.webp', alt: 'Portrait of a man in an England shirt, with his face and the shirt badge visible', caption: 'Sport / Portrait', crop: 'portrait' },
        { src: '/about/journey/ai-creative/beach-swimwear.webp', alt: 'Woman in a floral bikini seated on the sand beside a rocky shoreline', caption: 'Swimwear / By the sea' },
        { src: '/about/journey/ai-creative/resort-swimwear.webp', alt: 'Woman in a floral swimsuit and pale trousers seated beneath palm trees', caption: 'Swimwear / Resort' },
      ] },
    },
  ] satisfies JourneyStep[],
  existingWorkLabel: 'A current example / PRTFLO',
  existingWorkNote: 'Current portfolio work, shown here while earlier examples are added.',
  videoLabel: 'PRTFLO campaign film / current example',
  videoSrc: '/about/journey/video.mp4',
  videoPoster: '/about/journey/video-poster.webp',
  sourceLabel: 'References',
  outputLabel: 'Output',
} as const;
