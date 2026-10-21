# Product photography audit

The catalog retains all nine entries. The eight original entries show the local `assets/products/placeholder.svg` because they have no model-matched photographs in this repository. This is intentional, rather than a broken image path.

## Missing photographs

| Product ID | Product | Confirmed photo needed |
| --- | --- | --- |
| `vertical-500` | 500W Vertical Axis Wind Turbine | Front view of this exact model |
| `horizontal-500` | 500W Horizontal Axis Wind Turbine | Front view of this exact model |
| `vertical-600` | 600W Vertical Axis Wind Turbine | Front view of this exact model |
| `horizontal-600` | 600W Horizontal Axis Wind Turbine | Front view of this exact model |
| `vertical-800` | 800W Vertical Axis Wind Turbine | Front view of this exact model |
| `horizontal-800` | 800W Horizontal Axis Wind Turbine | Front view of this exact model |
| `vertical-generator` | Vertical Axis Permanent Magnet Generator | Representative photograph with the specific model identified |
| `horizontal-generator` | Horizontal Axis Permanent Magnet Generator | Representative photograph with the specific model identified |

The generator entries describe families (100W–500kW, 12V–440V), not a single rated model. A family photograph must not imply that every power/voltage combination is shown or available.

## Reviewed 400W photographs

These five source images are associated only with `horizontal-400`. The first image supplies the catalog cover. Original files and the completed detail page are preserved.

- `assets/products/1E4D8CEE2B4509E01195569A66EA7854.jpg` — front view.
- `assets/products/27D9CF43B08F8E93203602631620E935.jpg` — rear three-quarter view.
- `assets/products/4EF25E9E2B77A6304FF091F382AEFE4D.jpg` — side view.
- `assets/products/00A2B646E9E57D888DF3E0B5E8A6B993 - 副本.jpg` — close three-quarter view.
- `assets/products/9F2B9992D2DE4117F17AE0C5D5C60EEE - 副本.jpg` — installed three-quarter view.

`111111.png` remains excluded from the catalog and gallery: its dimensions, power curve and test-standard claims have not been confirmed. No external product photographs have been introduced.

## Adding a confirmed photo

Place an authorized photograph under `assets/products/`, identify its exact product, and assign that entry's `image` and `imageAlt` in `products.js` (or use its first reviewed gallery entry). Initialization now preserves an explicitly supplied `image` instead of resetting it to an empty string. Describe the actual view and model in English. Check paths with spaces/non-ASCII characters, aspect ratio, full-image visibility and mobile loading before publishing.

## Company information

The owner confirmed these public details during this update:

- Company: 无锡贯之新能源 (displayed in English as Wuxi Guanzhi New Energy, with the Chinese name retained).
- Email: `1683750532@qq.com` (the corrected address supplied by the owner).
- WhatsApp: `+86 19825532553`.
- Phone: `+86 18605299865`.

The existing official website and inquiry form remain. No address, certification, delivery commitment or warranty is claimed. Netlify email notification settings are managed outside this repository and are unchanged; displaying this email address does not change the form notification recipient.
