# 600W Horizontal Axis Wind Turbine — Image Upload Checklist

This draft branch adds the 600W product detail page, gallery script, SEO metadata, and verified-only specifications. The nine actual image files are **not yet committed**. Upload them to this same branch before reviewing the Netlify Deploy Preview. The image files are in the ZIP delivered in ChatGPT.

## Image files to upload to `assets/products/`
1. `600w-horizontal-01-main.webp` — complete installed turbine / homepage cover
2. `600w-horizontal-02-installed-front.webp` — installed front angle
3. `600w-horizontal-03-installed-rear.webp` — installed rear angle
4. `600w-horizontal-04-generator-side.webp` — generator side
5. `600w-horizontal-05-hub-front.webp` — hub and blades
6. `600w-horizontal-06-factory-assembly.webp` — assembly
7. `600w-horizontal-07-tail-assembly.webp` — tail assembly
8. `600w-horizontal-08-components.webp` — components
9. `600w-horizontal-09-exploded-diagram.webp` — exploded diagram

## Content verification
- Existing catalog ID: `horizontal-600`; do not create a duplicate.
- Confirmed: rated power 600W; horizontal-axis rotor; three blades.
- Pending: true SKU, voltage, rated wind speed, maximum power, rotor diameter, blade material, generator type, controller, certification, packaging, etc.
- The marketing infographic containing model `M6-6000` must **not** be uploaded as a verified 600W spec sheet. It may refer to a different 6000W model.
- A claimed power curve is not verified and should not be published as measured performance.
- The original 400W PR #6 is open; avoid merging it without approval. This branch was created from `main` and does not depend on PR #6.

## Testing before approval
- Confirm all 9 files exist and load with no 404s.
- Check gallery thumbnail navigation, previous/next buttons, mobile swipe, keyboard controls, click-to-enlarge, and close.
- Confirm home card shows complete 600W turbine and 400W remains unchanged.
- Confirm 600W inquiries preselect `horizontal-600`, and Netlify Forms continue to work.
- Test at desktop and 320px / 390px mobile sizes; check SEO title, description and schema.
- **Do not merge the PR or publish the production site until the owner approves the preview.**
