# 🛠️ setup-notes.md

**Location:** `tests/manual/setup-notes.md`
**Project:** CleanCity – Waste Pickup Scheduler
**Maintainer:** Josephat Musyoka
**Last Updated:** July 2025

---

## ✅ 1. System Requirements

| Tool          | Minimum Version | Status        |
| ------------- | --------------- | ------------- |
| Node.js       | v20.x           | ✅ Installed   |
| npm           | v10.x           | ✅ Installed   |
| Python        | v3.12.x         | ✅ Installed   |
| Google Chrome | Latest Stable   | ✅ Installed   |
| Git           | v2.x            | ✅ Installed   |
| VS Code       | Latest          | ✅ Recommended |

---

## 🧩 2. Project Setup Instructions

### 🧪 A. Frontend (React App)

```bash
# Step 1: Clone the repo
git clone https://github.com/<your-team>/cleancity.git
cd CleanCity

# Step 2: Install frontend dependencies
npm install

# Step 3: Start development server
npm start

# App runs on: http://localhost:3000
```

> If React fails to compile, ensure you're inside the **root directory** and dependencies are clean.

---

## 🐍 B. Backend Testing (Python + Selenium)

### Setup for Acceptance Tests:

```bash
cd tests/acceptance/selenium

# Optional: Create virtual environment
python -m venv venv
source venv/Scripts/activate  # On Windows

# Install dependencies
pip install selenium unittest
```

### Required:

* ✅ Ensure **ChromeDriver** is compatible with your installed Chrome version.
* ✅ Place `chromedriver.exe` in your system PATH or set via Python.

---

## 🧪 3. Testing Stack Summary

| Test Type          | Tool                  | Folder                       |
| ------------------ | --------------------- | ---------------------------- |
| **Unit Testing**   | Jest                  | `tests/unit/jest/`           |
| **Integration**    | React Testing Library | `tests/integration/jest/`    |
| **Acceptance**     | Selenium + Unittest   | `tests/acceptance/selenium/` |
| **Accessibility**  | axe DevTools          | `tests/accessibility/`       |
| **Performance**    | Lighthouse            | `tests/performance/`         |
| **System Testing** | Selenium (Py)         | `tests/system/selenium/`     |
| **Manual QA**      | Markdown Docs         | `tests/manual/`              |

---

## 🧪 4. How to Run Tests

### ➕ Unit & Integration (Jest)

```bash
npm run test
```

### 🌐 Acceptance Testing (Selenium + Python)

```bash
# Run from root or test folder
python tests/acceptance/selenium/acceptance_test.py
```

### ⚙️ Accessibility Scan (axe-core)

```bash
# Run axe scan (uses Puppeteer)
node tests/accessibility/axe-scan-runner.js
```

### ⚡ Performance Testing (Lighthouse)

Open `lighthouse-report.html` in a browser:

```
tests/performance/lighthouse-report.html
```

---

## 📁 5. Folder Overview (Essentials)

| Folder                   | Description                         |
| ------------------------ | ----------------------------------- |
| `src/components/`        | Core React components               |
| `tests/manual/`          | Test plan, cases, logs, and reports |
| `tests/unit/jest/`       | JS unit tests                       |
| `tests/acceptance/`      | Automated browser tests             |
| `tests/system/selenium/` | System-level selenium tests         |
| `docs/`                  | Supporting documentation            |

---

## 🪲 6. Troubleshooting Tips

| Issue                     | Solution                                                                                           |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| Selenium TimeoutException | Element may not be visible — increase `WebDriverWait`                                              |
| ChromeDriver mismatch     | Ensure correct version from [https://chromedriver.chromium.org](https://chromedriver.chromium.org) |
| React app not starting    | Run `npm install` again or clear cache with `npm cache clean --force`                              |
| Lighthouse slow score     | Optimize large images and reduce unused JS                                                         |

---

## ✅ Test Tracker Summary

* Automated tests: [✔️ acceptance\_test.py](../acceptance/selenium/acceptance_test.py)
* Reports:

  * Functional → `test-cases.md`
  * Manual → `final-report.md`
  * Bugs → `defect-log.md`
  * Perf → `lighthouse-summary.md`

---