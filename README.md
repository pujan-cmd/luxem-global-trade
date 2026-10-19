# Luxem Global Trade — Website Package

Everything in the **`website/`** folder is your complete, ready-to-publish website.
This README is for you only — **do not upload it**.

---

## 1. What is inside `website/`

| Item | Purpose |
|---|---|
| `index.html` | Home page → `https://www.luxemglobaltrade.com/` |
| `about/` · `process/` · `contact-us/` · `privacy-policy/` | Main pages (each folder holds an `index.html`) |
| `products/` | All products page, plus **10 product-group pages** (e.g. `products/gas-parts/`) |
| `blog/` | Blog index, plus **16 articles** (e.g. `blog/thread-standards-guide/`) |
| `404.html` | Branded "page not found" page |
| `assets/css/style.css` | All styling |
| `assets/js/app.js`, `illus.js` | Menus, slider, tabs, form, blog filters, drawings |
| `assets/img/` | All photos, the logo (`luxem-logo.png`, `luxem-logo-reversed.png`) and the social sharing image |
| `favicon.ico`, `favicon.svg`, `favicon-*.png`, `apple-touch-icon.png`, `android-chrome-*.png`, `site.webmanifest` | Your hexagon favicon and phone home-screen icons |
| `sitemap.xml` · `robots.txt` | For Google and other search engines |
| `.htaccess` | Settings for Apache / cPanel hosting (compression, caching, security, redirects) |
| `_headers` · `_redirects` | Same settings for Netlify and Cloudflare Pages |
| `vercel.json` | Same settings for Vercel |

> `.htaccess` starts with a dot, so it may be hidden on your computer. Make sure it is uploaded
> (in cPanel File Manager, tick **Settings → Show Hidden Files**).

---

## 2. Go live — choose ONE option

The website is plain HTML, CSS and JavaScript. It needs **no database, no PHP and no build step**.
It must be placed at the **root of your domain** (not inside a sub-folder).

### Option A — cPanel / shared hosting (GoDaddy, Hostinger, BigRock, Bluehost …)
1. Log in to cPanel → **File Manager** → open **`public_html`**.
2. Delete any default files there (for example `index.php`, `default.html`).
3. **Upload the contents** of the `website/` folder (select everything *inside* it, including `.htaccess`) into `public_html`.
   Tip: on your computer, select everything inside `website/`, compress it into a new `.zip`, upload that zip to `public_html` and use **Extract** — `index.html` must sit directly inside `public_html`.
4. Open `https://www.luxemglobaltrade.com/` and check the pages.
5. Switch on the free **SSL certificate** (cPanel → *SSL/TLS Status → Run AutoSSL*), then open `.htaccess`
   and remove the `#` at the start of the **HTTPS** block (and, if you like, the **www** block).

### Option B — Netlify (free, easiest)
1. Go to **app.netlify.com** → **Add new site → Deploy manually**.
2. **Drag the `website` folder** onto the page. The site is live on a temporary address immediately.
3. **Domain management → Add a domain** → `luxemglobaltrade.com`, then follow Netlify's DNS instructions. HTTPS is automatic.

### Option C — Cloudflare Pages (free)
1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Upload assets**.
2. Upload the `website` folder, then **Custom domains → luxemglobaltrade.com**. HTTPS is automatic.

### Option D — Vercel (free)
1. Install the Vercel CLI, open a terminal inside `website/` and run `vercel --prod`, **or** drag the folder into a new Vercel project.
2. **Settings → Domains** → add `luxemglobaltrade.com`.

---

## 3. Do these right after launch

- [ ] Open **every page** on your phone and on a computer. Click the menu, the product pages, the blog and the contact form.
- [ ] Confirm **HTTPS** works (padlock) and `luxemglobaltrade.com` redirects to `www.luxemglobaltrade.com`.
- [ ] Open **Google Search Console** → add the site → submit **`https://www.luxemglobaltrade.com/sitemap.xml`**.
- [ ] Do the same in **Bing Webmaster Tools** (you can import from Google Search Console).
- [ ] Create or update your **Google Business Profile** with the same name, address and phone number as the website footer.
- [ ] Send yourself a test enquiry through the **Contact Us** form and click both **Open in email app** and **Send on WhatsApp**.
- [ ] Check that **info@luxemglobaltrade.com** receives email.
- [ ] Paste a page address into WhatsApp or LinkedIn to see the **link preview** (title, description and picture).
- [ ] Test speed at **pagespeed.web.dev**.

---

## 4. Your website address

The files use **`https://www.luxemglobaltrade.com`** for canonical links, the sitemap, social sharing tags and search-engine data.

If your real address is different, use **Find and Replace in all files** (VS Code: *Ctrl+Shift+H*) to change
`https://www.luxemglobaltrade.com` to your address. Also update `sitemap.xml` and `robots.txt` (same replacement).

---

## 5. How the Contact Us form works

There is no server on a plain website, so the form **prepares the enquiry** and the visitor sends it with
**one click** by email or WhatsApp (it also has a *Copy message* button). Nothing is stored on the website.

If you want enquiries to arrive automatically in your inbox, a form service such as Formspree, Web3Forms or
Netlify Forms can be connected — ask your developer, or ask me to prepare it.

---

## 6. Editing your website later

- **Text:** open the page's `index.html` in any code editor (VS Code, Notepad++) and edit the words between the tags. Do not change tags or class names.
- **Photos:** replace a file in `assets/img/` with a new one **using the same file name** (keep a similar shape and keep the file under ~200 KB).
- **New blog article:** copy a folder such as `blog/how-to-write-an-rfq/`, rename it, edit the text, title, description and the `canonical` and `og:url` lines, add a card for it in `blog/index.html`, and add its address to `sitemap.xml`.
- **Contact details:** search for `info@luxemglobaltrade.com`, `+91 85111 58598` and `Faliya Wadi` and replace them in every file.
- After changing CSS or JavaScript, change the `?v=20261015` number in the page files so visitors receive the new version.

---

## 7. Previewing on your own computer

Because pages link to each other starting with `/`, **double-clicking `index.html` will not show the site correctly.**
Instead, open a terminal inside the `website` folder and run:

```
python3 -m http.server 8000
```

then open **http://localhost:8000** in your browser. (Or use the *Live Server* extension in VS Code.)

---

## 8. Please confirm before going live

These statements on the website were written from general industry practice and need your approval:

1. **Typical tolerance ±0.02 mm**, size range **Ø2–Ø60 mm**, and "reply within one business day".
2. **Payment terms** (T/T, L/C), **Incoterms** (EXW, FOB, CFR, CIF, DAP) and **export regions**.
3. **Brass grades and standards** listed for each product group, including copper and other non-ferrous metals for **Rods & Ingots**.
4. **Inspection checkpoints and instruments** on the Process page, and the **Export markets** guidance on the Products page.
5. The **founder and managing director** descriptions on the About page.
6. The **16 blog articles** — read them once before publishing. The gas, RoHS and REACH articles mention regulations; they are general information, not legal advice.
7. The **Privacy Policy** is a general template — please have it reviewed by a legal adviser, and update it if you add analytics, advertising or a form service.
8. The product photos show a small ✦ mark (AI-generation mark) in the corner of each display board.
9. The website does **not** claim any quality certifications. Add them only when you can supply the certificates.

---

## 9. Good to know

- **Fonts** load from Google Fonts. To avoid contacting Google (for stricter privacy requirements), download the fonts *Newsreader*, *IBM Plex Sans* and *IBM Plex Mono* and host them yourself.
- **Hosting in a sub-folder** (for example `example.com/luxem/`) is not supported — place the files at the domain root.
- **Old links:** `/contact` and `/export-process` redirect to the new pages automatically.
- The site works without JavaScript for reading; the menu, slider, tabs, filters and form need JavaScript.

*Package built 15 October 2026.*
