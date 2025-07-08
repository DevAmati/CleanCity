const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Load axe-core source code
const axeSource = require('axe-core').source;

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Target the running app
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });

  // Inject axe-core into the page
  await page.evaluate(axeSource);

  // Run the audit
  const results = await page.evaluate(async () => {
    return await axe.run();
  });

  // Save results to markdown and JSON
  const markdownPath = path.join(__dirname, 'axe-scan-report.md');
  const jsonPath = path.join(__dirname, 'axe-scan-report.json');

  const mdSummary = `
# ♿ Automated Axe Accessibility Audit

**URL Scanned:** http://localhost:3000  
**Date:** ${new Date().toLocaleString()}
**Violations Found:** ${results.violations.length}

---

## 🔍 Issues by Impact

| Impact Level | Count |
|--------------|-------|
${Object.entries(
  results.violations.reduce((acc, issue) => {
    acc[issue.impact] = (acc[issue.impact] || 0) + 1;
    return acc;
  }, {})
)
  .map(([impact, count]) => `| ${impact} | ${count} |`)
  .join('\n')}

---

## 📌 Top Violations

${results.violations
  .map(
    (v, i) => `
### ${i + 1}. ${v.help}  
**Impact:** ${v.impact}  
**WCAG Tags:** ${v.tags.join(', ')}

> ${v.description}

**Affected Elements:**
${v.nodes.map(n => `- \`${n.target.join(', ')}\``).join('\n')}
`
  )
  .join('\n')}
`;

  fs.writeFileSync(markdownPath, mdSummary.trim());
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2));

  console.log('✅ Accessibility report saved:');
  console.log(`- Markdown: ${markdownPath}`);
  console.log(`- JSON: ${jsonPath}`);

  await browser.close();
})();
