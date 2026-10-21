# Rewindagic — 风力发电产品展示网站

使用原生 HTML、CSS 和 JavaScript，无需安装依赖或构建。

## 预览

直接用浏览器打开 `index.html`，或在终端执行：

```bash
cd /workspace/wind-turbine-website
python3 -m http.server 8000
```

本机浏览器访问 `http://localhost:8000`。若在云端运行，请使用开发工具的端口转发功能转发 8000 端口后打开其预览地址。

## 内容与功能

- 全英文界面，自适应桌面和手机；移动导航菜单。
- 500W、600W、800W 垂直轴及水平轴风力发电机，电压范围 12V–48V。
- 垂直轴及水平轴发电机系列，功率范围 100W–500kW，电压范围 12V–440V。
- 产品筛选、详情弹窗，以及可下载文本项目需求书的表单。
- 原创 SVG 产品示意图，不代表实际型号外观。各系列范围不意味着所有功率、电压组合均有现货，具体规格须确认。

## 文件

- `index.html`：内容、导航、产品容器和表单。
- `styles.css`：样式、响应式布局。
- `script.js`：产品数据、筛选、弹窗、导航和需求书下载。

修改 `script.js` 内的产品数据可更新产品。当前没有后端，不发送询盘，也不收集或上传表单信息；上线前可按实际业务接入询盘服务并补充真实联系信息。

首页风电照片来自 Unsplash，字体来自 Google Fonts，需要联网加载；无网络时仍可使用系统字体、产品示意图和本地交互功能。正式商用前请确认素材使用权限及产品实际参数。

## Product catalog and real photos

`products.js` is the shared product catalog. All eight original products and their power/voltage ranges are retained. Each product has an `image` field, initially empty. Add authorized photographs under `assets/products/`, then set the corresponding product's `image` and `imageAlt` in `products.js`. Empty image fields display an explicitly labelled placeholder; no product photograph is fabricated. Product specifications are shared by quick views and `product.html?id=vertical-500` (replace the ID for other products). Unknown specifications display `Contact Us`; generator families show a power range rather than an invented individual rated power.

## Netlify Forms deployment and notification test

The current inquiry form replaces the older project-brief download described above. It uses a static HTML form named `product-inquiry`, POST submission, a `form-name` field, a honeypot, and a `/thank-you.html` action. It collects name, email, country, product, quantity and message. No backend credentials are stored in this repository.

1. In Netlify, import this GitHub repository and select the desired branch. Leave the build command empty and publish directory as `.` (`netlify.toml` supplies it).
2. Enable Netlify form detection for the project, then deploy/redeploy. Confirm that `product-inquiry` appears under **Forms**. If detection was disabled when the deployment ran, enable it and redeploy.
3. In the site's Forms notification settings, add an **Email notification** for `product-inquiry`, using the actual recipient email. Interface labels may vary. No recipient is preconfigured by this code.
4. On the deployed HTTPS site, choose a product, click **Get a Quote**, check its model is selected, and submit one clearly labelled test inquiry with an email address you control. Confirm the success page, then verify the record under Netlify **Forms → product-inquiry** and verify the recipient's inbox/spam folder. Check the spam submissions view if needed.
5. Test an empty required field, invalid email, and quantity 0: the browser should block submission. Repeat a valid submission from a phone. Test all three product categories and a detail-page quote link.

Python's local server and GitHub Pages do not process Netlify Forms. A local preview blocks submission with an explanation; deployment on Netlify with form detection enabled is required. Netlify form limits and spam filtering apply. Notification delivery and production form acceptance remain unverified until the deployed test above succeeds. A direct visit to the thank-you page proves neither submission nor notification delivery.


## 400W horizontal axis model

The original eight catalog entries remain. The ninth product, `horizontal-400`, has a dedicated, crawlable page at `400w-horizontal-axis-wind-turbine.html`, with page-specific styles in `product-detail.css` and gallery controls in `turbine-detail.js`. Its specifications in `products.js` also feed the catalog quick view. Keep the static specification table and shared catalog values consistent.

The new page uses 400W rated / 450W maximum power throughout. No measured acoustic rating, efficiency, annual yield, certification, dimension drawing or estimated power curve is claimed. Dimensions and a verified 400W power curve remain pending supplier data. Do not reuse a 5000W / 5.5KW curve for this model.

### Product photography handoff

Original image files have not yet been made available in the checkout. Gallery controls are implemented, but the production gallery remains empty until reviewed photographs are added. Do not substitute generated product photographs.

1. Save the six supplied product photographs and two reviewed English detail images under `assets/products/horizontal-400/`, with stable lowercase filenames. Keep their original aspect ratios. Use the front-view photograph as the first gallery entry (and therefore the catalog cover).
2. Populate `horizontal-400.gallery` in `products.js` with `{src: 'assets/products/horizontal-400/front.jpg', alt: 'Front view of the five-blade 400W horizontal axis wind turbine'}` entries, using the actual filenames and descriptive English alt text. The first entry supplies the catalog image automatically.
3. Inspect embedded text before publishing detail images. Images labelled 5000W / 5.5KW must be corrected using verified 400W / 450W information or withheld. Withhold incompatible power curves without real 400W test data; do not scale or invent a curve. Add dimension drawings only when confirmed for this exact model.
4. Verify every image returns HTTP 200, switches in the gallery, enlarges on click, closes with Escape, and displays without distortion on desktop and mobile. The gallery preserves image proportions and uses native buttons/dialog focus behavior.

The new page's quote links use `index.html?product=horizontal-400#contact`; the static Netlify form includes this model as an option. The form name, POST method, Netlify attributes, honeypot, action and thank-you page remain unchanged. Local checks validate the form markup and preselection; actual submission acceptance and email delivery require a separately authorized deployed Netlify test.
