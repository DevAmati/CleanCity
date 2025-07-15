## 🚀 Performance Testing

We used [**Lighthouse**](https://github.com/GoogleChrome/lighthouse) to perform automated audits of page performance, accessibility, and best practices.

**Details:**

* **Tested URL:** `http://localhost:3000`
* **Test Date:** July 8, 2025
* **Output Format:** `.html`
* **Main Observations:**

  * 🟠 **Performance Score:** 61 (on 3G simulated network)
  * 🟠 **First Contentful Paint:** 4.9s
  * 🟡 **Largest Contentful Paint:** 6.2s
  * ⚠️ **Opportunities:**

    * Reduce image sizes (home page hero image: 2.8MB)
    * Eliminate render-blocking scripts
    * Enable text compression (GZIP)

📄 Full Lighthouse audit: [`tests/performance/lighthouse-report.html`](tests/performance/lighthouse-report.html)

---

## ♿ Accessibility Testing

Accessibility audits were conducted using [**axe-core**](https://github.com/dequelabs/axe-core) integrated with Puppeteer for browser automation.

**Details:**

* **Tested URL:** `http://localhost:3000`
* **Test Date:** July 8, 2025
* **Violations Found:** 3

  * 🔴 **1 Serious** – Images missing `alt` attributes
  * 🟠 **2 Moderate** – Form inputs missing associated labels and ARIA roles

**Recommendations:**

* Add meaningful `alt` tags to all images (`img`, `svg`, etc.)
* Use `label` elements and associate them with inputs via `for`/`id`
* Ensure dynamic elements are reachable by screen readers (via ARIA)

📄 Full axe report: [`tests/accessibility/axe-scan-report.md`](tests/accessibility/axe-scan-report.md)

---
