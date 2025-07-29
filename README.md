<a href="https://registry-starter.vercel.app/">
  <h1 align="center">Registry Starter</h1>
</a>

<p align="center">
    Registry Starter is a free, open-source template built with Next.js and Shadcn/ui Registry to accelerate your AI-Native Design System.
</p>

<p align="center">
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#open-in-v0"><strong>Open in v0</strong></a> ·
  <a href="#theming"><strong>Theming</strong></a> ·
  <a href="#running-locally"><strong>Running Locally</strong></a> ·
  <a href="#file-structure"><strong>File Structure</strong></a> ·
  <a href="https://ui.shadcn.com/docs/registry"><strong>Read Docs</strong></a>
</p>
<br/>

## Deploy Your Own

You can deploy your own version of the Next.js Registry Starter to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fregistry-starter&project-name=my-registry&repository-name=my-registry&demo-title=Registry%20Starter&demo-description=Registry%20Starter%20is%20a%20free%2C%20open-source%20template%20built%20with%20Next.js%20and%20Shadcn%2Fui%20Registry%20to%20accelerate%20your%20AI-Native%20Design%20System.&demo-url=https%3A%2F%2Fregistry-starter.vercel.app&demo-image=%2F%2Fregistry-starter.vercel.app%2Fpreview.png)

## Open in v0

[![Open in v0](https://registry-starter.vercel.app/open-in-v0.svg)](https://v0.dev/chat/api/open?title=Dashboard+Kit&prompt=These+are+existing+design+system+styles+and+files.+Please+utilize+them+alongside+base+components+to+build.&url=https%3A%2F%2Fregistry-starter.vercel.app%2Fr%2Fdashboard.json)

This registry application also exposes `Open in v0` buttons for each component. Once this application is deployed, the
`Open in v0` button redirects to [`v0.dev`](https://v0.dev) with a prepopulated prompt and a URL pointing back to this
registry's `/r/${component_name}.json` endpoint. This endpoint will provide v0 the necessary file information, content,
and metadata to start your v0 chat with your component, theme, and other related code.

These `/r/${component_name}.json` files are generated using `shadcn/ui` during the `build` and `dev` based on the
repository's [`registry.json`](./registry.json). For more information, refer to the
[documentation](https://ui.shadcn.com/docs/registry/registry-json).

## Theming

To use a custom theme for all the components, all you need to do is modify the CSS tokens in
[`tokens.css`](./src/app/tokens.css). More information on these practices can be found
on [ui.shadcn.com/docs](https://ui.shadcn.com/docs).

#### MCP

To use this registry with MCP, you must also edit [`registry.json`](./registry.json)'s first
`registry-item` named `registry`. This `registry:style` item also contains your design tokens that can be used with MCP.

For example, it looks like this:

```json
    {
      "name": "registry",
      "type": "registry:style",
      "cssVars": {
        "light": {
          "primary": "oklch(0.52 0.13 144.17)",
          "primary-foreground": "oklch(1.0 0 0)",
          "radius": "0.5rem",
          ...
        },
        "dark": {
          "primary": "oklch(0.52 0.13 144.17)",
          "primary-foreground": "oklch(1.0 0 0)",
          ...
        }
      },
      "files": []
    }
```

#### Fonts

To use custom fonts, you can either use [
`next/font/google`](https://nextjs.org/docs/pages/getting-started/fonts#google-fonts) or the [
`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) CSS rule. For example, `fonts.css` might look
like:

```css
@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: url('https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm45xW5rygbi49c.woff2') format('woff2'),
    url('https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm45xW5rygbj49c.woff') format('woff');
}

@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    src: url('https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_dJE3gnD-w.woff2') format('woff2'),
    url('https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_dJE3g3D_w.woff') format('woff');
}
```

If you use `@font-face`, you will also need to modify [`tailwind.css`](src/app/tailwind.css) AND
[`tailwind.config.ts`](src/v0/tailwind.config.ts) to map your custom fonts to Tailwind. Refer to this
[Tailwind documentation](https://tailwindcss.com/docs/font-family#customizing-your-theme)

## Running locally

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000).

## File Structure

`app/(registry)` routes contains the registry pages.

`app/demo` routes contains various UI primitives, Components, or Blocks (based on `registry.json`)

`@/components` contains all components used in the registry

`@/components/ui` contains all `shadcn/ui` UI Primitives used in the registry

`@/components/registry` contains all components for this Registry Starter application

`@/hooks` contains all React hooks

`@/lib` contains all business logic & utils

`@/v0` contains all v0 collateral used in `registry.json`


عالی محسن! این اطلاعات دقیق و ساختارمند، نقطه‌ی پایان محکمی برای انتشار نسخه‌ی اول آیکونوگرافی «کوشک»ه. حالا بیاین همه رو بریزیم داخل یه ساختار رسمی که هم برای فایل README.md پروژه GitHub قابل استفاده باشه، هم برای SEO و سند رسمی انتشار.

⸻

📦 KU6K Iconography v1.0.0 – Essential UI Set

👁️ Overview

نسخه‌ی اول آیکونوگرافی رسمی برند کوشک، شامل ۶ آیکون پایه برای کاربردهای اصلی در طراحی UI، به همراه ۱۶ واریاسیون گرافیکی در سبک‌های متنوع (Mono, Duotone, Color, Brutal, Line, Silhouette) عرضه می‌شود.
این مجموعه در ساختار ماژولار و با استانداردهای برند «KU6K» ساخته شده و قابل استفاده در اپلیکیشن، وب‌سایت، موشن‌گرافی و مستندات دیجیتال است.

⸻

🧩 Essential UI Icons

No.	Icon Name	Description
1	Home	آیکون خانه (صفحه اصلی)
2	Arrow-Right	پیکان به سمت راست (ناوبری)
3	Search	جستجو
4	User	کاربر یا حساب کاربری
5	Outlog	خروج یا خروج از حساب
6	Setting	تنظیمات یا پیکربندی


⸻

🎨 Variations for ku6k-home

تمامی آیکون‌ها در همین سبک‌ها طراحی شده‌اند و تنها به‌عنوان نمونه، اینجا واریاسیون آیکون Home آورده شده است.

No.	Variation Name	Style
1	ku6k-home--mono-b-v1.0.0	Mono - Black
2	ku6k-home--mono-w-v1.0.0	Mono - White
3	ku6k-home--duotone-p+s-v1.0.0	Duotone - Primary + Secondary
4	ku6k-home--duotone-p+s-dark-v1.0.0	Duotone - Dark Mode
5	ku6k-home--color-p+s+a-v1.0.0	Full Color
6	ku6k-home--color-p+s+a-dark-v1.0.0	Full Color - Dark
7	ku6k-home--brutal-p+s+a-v1.0.0	Brutalist
8	ku6k-home--brutal-p+s+a-v1.0.0	Brutalist (Alt)
9	ku6k-home--line-v1.0.0	Line Art
10	ku6k-home--line-dark-v1.0.0	Line - Dark
11	ku6k-home--silhouette-w-on-bg-p-v1.0.0	White on Primary
12	ku6k-home--silhouette-b-on-bg-p-v1.0.0	Black on Primary
13	ku6k-home--silhouette-w-on-bg-s-v1.0.0	White on Secondary
14	ku6k-home--silhouette-b-on-bg-s-v1.0.0	Black on Secondary
15	ku6k-home--silhouette-w-on-bg-a-v1.0.0	White on Accent
16	ku6k-home--silhouette-b-on-bg-a-v1.0.0	Black on Accent


⸻

🧱 Color System Abbreviations

Abbr	Meaning
W	White
B	Black
P	Primary Color
S	Secondary Color
A	Accent Color
BG	Background


⸻

📨 Publishing Notes
	•	Publisher Email: iconography@kou6k.com (Must be linked to official KU6K domain for SEO + credibility)
	•	Publisher Name: KU6K (Koushk Brand)
	•	Organization: https://kou6k.com
	•	Version: v1.0.0
	•	Release Date: [تاریخ انتشار میل‌استون]
	•	License: [Your license info - MIT? Custom?]

⸻

🔍 SEO & Metadata (For Google Indexing)
	•	Use schema.org/CreativeWork or Product structured data
	•	Include:

{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "KU6K Iconography - Essential UI v1.0.0",
  "creator": {
    "@type": "Organization",
    "name": "KU6K",
    "url": "https://kou6k.com",
    "email": "iconography@kou6k.com"
  },
  "datePublished": "2025-07-xx",
  "keywords": "iconography, ku6k, brutalism ui, essential icons, duotone icons",
  "description": "A modular and branded set of icons from KU6K visual identity system."
}



⸻

اگر بخوای، می‌تونم کل این محتوا رو به‌صورت یه فایل README.md آماده کنم تا مستقیم بندازی توی ریپازیتوری ku6k_iconography.

بفرما بگو بریم اونم آماده کنیم؟ 🎯