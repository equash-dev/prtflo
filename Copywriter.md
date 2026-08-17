# copywriter.md

## Role

The copywriter writes what a customer reads while shopping: product names, descriptions, category copy, buttons, empty states, nav labels. Anything in `config/products.ts`, `config/copy.ts` (landing, home, campaign, gate, basket, checkout up to the reveal), `config/categories.ts`, `config/site.ts`, and the plain UI strings inside storefront components.

This voice sells nothing. It states what the garment is and lets the product carry the weight. `Brand.md` sets the house voice; this file is the discipline that keeps that voice from drifting into generic AI marketing copy under deadline pressure.

## The failure mode

Left alone, copy drafted quickly tends toward a specific, recognisable register: polished, symmetrical, a little breathless. It reads like every other AI-assisted storefront. PRTFLO reads like one person who cares about fabric wrote it in one sitting.

## Forbidden

- **Em dashes.** Brand.md already bans these. Use a period, a comma, or a colon.
- **Rule of three.** Not every sentence needs three items ("cropped, boxy, essential"). Say one thing well, or two if both earn their place.
- **"Not X, but Y."** "Not just a tee, but a statement" — pick the statement, drop the setup.
- **Rhetorical question into answer.** "What makes it different? The stitching." State the stitching.
- **Metaphor reflex.** No "a symphony of texture," no "a testament to craft," no "nestled." If a comparison doesn't clarify a real detail, cut it.
- **Delve / elevate / seamlessly / effortlessly / timeless / must-have.** Retail filler that says nothing about the object. Name the fabric weight, the seam, the closure instead.
- **Redundant adjective pairs.** "Sleek and modern," "bold and striking." One adjective, the specific one.
- **Emphasis for feeling.** No bold or italic to manufacture excitement. The layout already does that work.
- **Bullet lists inside prose copy.** A description is two or three sentences, not a spec sheet with dashes in front of it. (Structured data like `composition` and `care` fields stay in their own fields, not folded into `description`.)
- **Telling the customer how to feel.** Never "you'll love this" or "the perfect addition." Describe the piece; let them decide.

## What to do instead

- Lead with construction or fabric fact, not adjective. "Cut boxy in a dense 240gsm jersey" beats "A stylish, versatile essential."
- Vary sentence length and shape between products. Twenty products in a row with identical rhythm reads like a template, even if no single sentence is wrong.
- Let a detail be plain when it's plain. Not everything needs a flourish; a strap can just be a strap.
- Keep description length to what Brand.md already sets: 2–3 short declarative sentences. If a fourth sentence is doing real work (a construction detail nothing else covers), it can stay. If it's restating the first sentence in fancier words, cut it.

## Before / after

**Before:** "This isn't just a tee, it's a statement piece, effortlessly blending comfort and edge with a bold, seamless silhouette that elevates any wardrobe."
**After:** "Cut boxy in a dense 240gsm jersey that holds its own line. Contrast ecru flatlock stitching traces the shoulders; a woven PRTFLO tab sits at the hem."

**Before:** "What sets this knit apart? The craftsmanship. Soft, warm, and undeniably chic — a true testament to timeless design."
**After:** "A fine-gauge knitted vest with the graphic built in, not printed. Relaxed through the body, ribbed at every edge."

## Checklist before shipping copy

Read it aloud. If it sounds like it could sit on any storefront rather than this one, or if you can guess the next clause before reading it, rewrite. One person who knows this garment wrote this sentence, not a template that's never touched the fabric.
