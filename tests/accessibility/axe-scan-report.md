# ♿ Automated Axe Accessibility Audit

**URL Scanned:** http://localhost:3000  
**Date:** 08/07/2025, 12:44:37
**Violations Found:** 3

---

## 🔍 Issues by Impact

| Impact Level | Count |
|--------------|-------|
| serious | 1 |
| moderate | 2 |

---

## 📌 Top Violations


### 1. Elements must meet minimum color contrast ratio thresholds  
**Impact:** serious  
**WCAG Tags:** cat.color, wcag2aa, wcag143, TTv5, TT13.c, EN-301-549, EN-9.1.4.3, ACT

> Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds

**Affected Elements:**
- `.secondary`
- `.testimonial:nth-child(1) > span`
- `.testimonial:nth-child(2) > span`
- `.testimonial:nth-child(3) > span`


### 2. Document should have one main landmark  
**Impact:** moderate  
**WCAG Tags:** cat.semantics, best-practice

> Ensure the document has a main landmark

**Affected Elements:**
- `html`


### 3. All page content should be contained by landmarks  
**Impact:** moderate  
**WCAG Tags:** cat.keyboard, best-practice

> Ensure all page content is contained by landmarks

**Affected Elements:**
- `.landing-features`
- `.landing-testimonials`