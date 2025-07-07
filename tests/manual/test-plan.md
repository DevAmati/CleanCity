## 📋 Test Plan: Phase 1 – CleanCity QA Strategy

---

### 1️⃣ Testing Scope & Objectives

**Scope:**
This QA plan applies to the following core modules of the CleanCity Web Application:

1. 🏠 Home – Waste pickup request form
2. 📊 Dashboard – User analytics and trends
3. 📣 Feedback – Missed pickup reporting
4. 🌱 Awareness – Eco tips, quizzes, educational content
5. ⚙️ Admin – Admin panel for user and content management

**Objectives:**

* ✅ Identify **functional** and **non-functional** defects
* ✅ Validate **usability** and **accessibility** across devices
* ✅ Confirm **data persistence** using browser `localStorage`
* ✅ Assess **responsive design** under various breakpoints
* ✅ Ensure good **performance** under network constraints

---

### 2️⃣ Test Environments & Tools

| Category                | Setup Details                                           |
| ----------------------- | ------------------------------------------------------- |
| **Browsers**            | Chrome, Firefox, Safari, Edge (latest stable versions)  |
| **Devices**             | Windows 10 PC, Android smartphone, iPad simulator       |
| **Network Conditions**  | 3G, 4G, Wi-Fi (throttled via DevTools)                  |
| **Accessibility Tools** | axe DevTools, Lighthouse, NVDA screen reader            |
| **QA Tools**            | GitHub Kanban, Git, GitLens, Markdown docs              |
| **Execution Tools**     | React Testing Library, Jest, Pytest, Selenium, Unittest |

---

### 3️⃣ Test Data Requirements

#### 👥 User Roles:

* Regular user
* Admin user

#### 📦 Data Sets:

**Valid Samples:**

* Names: “Test User”, “Josephat Musyoka”
* Locations: “Nairobi”, “Kirinyaga”
* Dates: “July 5, 2025”, “2025-07-06”

**Invalid Samples:**

* Empty strings (`""`)
* Nonsense input: `!!@@`, `1234567890@#`
* Extremely long strings (255+ chars)
* Emojis or unsupported Unicode: 😎💥

#### ⚠️ Edge Cases:

* 0-character input
* 255+ character strings
* Special characters, numbers in name fields
* Unexpected formats in date pickers

---

### 4️⃣ Defect Reporting Standards

#### 🔺 Severity Levels:

| Level        | Description                                                 |
| ------------ | ----------------------------------------------------------- |
| **Critical** | Breaks major functionality (e.g., form won’t submit)        |
| **Major**    | Affects usability/data flow (e.g., incorrect filter result) |
| **Minor**    | Doesn’t break flow but noticeable (e.g., missing label)     |
| **Cosmetic** | Purely visual (e.g., alignment issue)                       |

---

#### 🐞 Bug Report Format (Markdown Sample)

```markdown
## Bug Summary

- **Page**: Dashboard  
- **Issue**: Filter returns wrong region results  
- **Steps to Reproduce**:  
  1. Go to Dashboard  
  2. Select “Kilimani” from filter  
  3. Observe the results  

- **Expected**: Only Kilimani-related requests  
- **Actual**: Mixed results from other regions  
- **Severity**: Major  
- **Attachments**: Screenshot.png
```

> Use **GitHub Issues**, **Jira**, or `defect-log.md` to record all bugs. Organize by module or test date.

---

### 5️⃣ 📊 Jira & GitHub Kanban Setup

#### 🧑‍🤝‍🧑 Team Members

| Name               | Email Address                                                       | Role        |
| ------------------ | ------------------------------------------------------------------- | ----------- |
| Morgan Amati       | [morganamati122@gmail.com](mailto:morganamati122@gmail.com)         | Team Leader |
| Josephat Musyoka   | [josephatmusyoka138@gmail.com](mailto:josephatmusyoka138@gmail.com) | QA Tester   |
| Elizabeth Magaduka | [elizahbeth33@gmail.com](mailto:elizahbeth33@gmail.com)             | QA Tester   |

---

#### 🛠️ Tool Strategy

The **Bug Hunters** team will use:

* 🐞 **Jira** for issue tracking, bug reporting, and test coverage
* ✅ **GitHub Kanban Projects** for task assignment and progress visibility

---

#### 📋 GitHub Kanban Setup

| Element          | Details                                                                                            |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| **Project Name** | CleanCity QA Kanban – Bug Hunters                                                                  |
| **Columns**      | `To Do` → `In Progress` → `Review` → `Done`                                                        |
| **Cards**        | Each card = 1 test case, bug, automation task, or issue                                            |
| **Labels**       | `ui`, `form-validation`, `security`, `dashboard`, `mobile`, `accessibility`, `manual`, `automated` |
| **Status**       | Cards updated daily, linked to Jira issues where needed                                            |

---

#### 🐛 Jira Setup

| Feature         | Setup Description                                                                    |
| --------------- | ------------------------------------------------------------------------------------ |
| **Issue Types** | Epic, Story, Task, Bug                                                               |
| **Workflow**    | `To Do` → `In Progress` → `In Review` → `Done`                                       |
| **Labeling**    | `authentication`, `dashboard`, `usability`, `performance`, `critical`, `minor`, etc. |
| **Bug Format**  | Standard Markdown format + screenshot & metadata                                     |
| **Integration** | Optionally link GitHub commits/branches to Jira issues                               |

---

#### ✏️ Sample Jira Bug Template

```markdown
**Title:** Incorrect pickup filter on Dashboard

**Environment:**  
- Browser: Chrome 125  
- OS: Windows 10  
- Device: Desktop  

**Steps to Reproduce:**  
1. Log in as a user  
2. Navigate to Dashboard  
3. Select filter “Kilimani”  
4. Observe displayed results  

**Expected Result:**  
Only requests from Kilimani should be shown

**Actual Result:**  
Results from other locations appear

**Severity:** Major  
**Attachments:** dashboard-bug-kilimani.png
```

---

### 6️⃣ Test Environment Setup

| Aspect                       | Details                                                                |
| ---------------------------- | ---------------------------------------------------------------------- |
| **Browser Matrix**           | Chrome 124, Firefox 123, Safari 16.4, Edge 122                         |
| **Devices**                  | Windows 10 laptop, Android phone, iPad simulator/emulator              |
| **Network Simulation**       | Chrome DevTools → Network → Throttling (3G, 4G)                        |
| **Accessibility Validation** | axe DevTools, NVDA screen reader, Tab-key navigation, contrast checker |

---