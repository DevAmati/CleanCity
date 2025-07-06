# 🐞 Defect Log – CleanCity QA Testing  
**Project:** CleanCity – Waste Pickup Scheduler  
**Log Maintainer:** Josephat Musyoka  
**Date Started:** July 6, 2025  

---

## 🔐 Authentication Module Defects

### 🐛 DEF-001: No Confirmation Message After Successful Registration
- **Page**: `/register`
- **Issue**: After completing valid registration, there is no success message shown.
- **Steps to Reproduce**:
  1. Go to registration page
  2. Enter:
     - Name: Test User
     - Email: testuser1@gmail.com
     - Password: validpassword123
  3. Click "Register"
- **Expected Result**:
  - User sees a confirmation message: *"Account created successfully"*
  - Then redirected to login
- **Actual Result**:
  - No confirmation shown; redirected to login directly
- **Severity**: Minor (Affects UX, but functionally works)
- **Notes**: Can confuse user if the account was actually created.

---

### 🐛 DEF-002: Missing Confirm Password Field in Registration
- **Page**: `/register`
- **Issue**: No "Confirm Password" field; mismatched or mistyped passwords go unchecked
- **Steps to Reproduce**:
  1. Go to registration page
  2. Enter any email and password
  3. Click "Register"
- **Expected Result**:
  - A second field to confirm password
  - Validation that both passwords match
- **Actual Result**:
  - Only one password field
  - No check for mismatch
- **Severity**: Major (Security & usability issue)
- **Notes**: Violates FR-002. Could result in account access problems.

---
### 🐛 DEF-003: Weak Passwords Accepted (Less Than 8 Characters)

* **Page**: `/register`
* **Issue**: Password field accepts passwords shorter than 8 characters, including just 1 character
* **Steps to Reproduce**:

  1. Enter a valid name and email
  2. Enter a 1-character password (e.g., `a`)
  3. Click "Register"
* **Expected Result**: Password should be rejected if under 8 characters
* **Actual Result**: Registration succeeds even with very short passwords
* **Severity**: Major (Security concern)
* **Notes**: Violates standard password policies

---

### 🐛 DEF-004: Any Random Email/Password Can Log In (No Account Validation)

* **Page**: `/login`
* **Issue**: Login succeeds with random email and password not tied to any registered account
* **Steps to Reproduce**:

  1. Enter:

     * Email: `notreal@example.com`
     * Password: `fakepassword`
  2. Click "Login"
* **Expected Result**: Error message — "Invalid email or password"
* **Actual Result**: Logged in and redirected to `/profile`
* **Severity**: Critical (Authentication completely bypassed)
* **Notes**: Violates FR-004; system should only accept valid credentials

---

### 🐛 DEF-005: Emoji-Only Passwords Are Accepted

* **Page**: `/register`, `/login`
* **Issue**: Users can register and log in with emojis as passwords
* **Steps to Reproduce**:

  1. Enter:

     * Name: Emoji User
     * Email: `emoji@example.com`
     * Password: `🔥🔥🔥`
  2. Register and then log in
* **Expected Result**: Input should be sanitized or rejected
* **Actual Result**: Registration and login succeed with emoji-only password
* **Severity**: Major (Security & encoding issue)
* **Notes**: Might cause backend processing issues in real-world systems

---
### 🐛 DEF-006: Regular Users Can Access Admin Panel

* **Page**: `/admin`
* **Issue**: Regular users (non-admins) can directly access the admin panel via URL
* **Steps to Reproduce**:

  1. Log in as a regular user (e.g., `testuser1@gmail.com`)
  2. Manually navigate to `/admin`
* **Expected Result**:

  * User should be blocked
  * Redirected to an error page or dashboard with an *“Unauthorized”* message
* **Actual Result**:

  * Regular users access the admin panel with full privileges
* **Severity**: **Critical** (Severe security issue)
* **Notes**: Violates access control best practices and poses high risk to system integrity

---
## 🗑️ Waste Pickup Scheduling Defects

### 🐛 DEF-007: No Scheduled Pickups Table or Visual Confirmation After Submission

* **Page**: `/dashboard` or pickup confirmation area
* **Issue**: After scheduling a pickup, there's no table, list, or section showing pending/scheduled pickups
* **Steps to Reproduce**:

  1. Log in as a user
  2. Go to the pickup scheduling section
  3. Enter valid future date, waste type, quantity, and instructions
  4. Click “Schedule”
* **Expected Result**:

  * Confirmation message: *"Your pickup has been scheduled"*
  * Scheduled pickup appears in a **pickup history table** or **dashboard list**
* **Actual Result**:

  * Message appears: *"Your waste pickup request has been submitted!"*
  * But there's **no table, log, or page** to view pickups
* **Severity**: **Medium**
* **Notes**: Affects visibility of scheduled pickups. May confuse users or prevent them from managing upcoming pickups.

---
### 🐛 DEF-008: Allows Scheduling Pickup for Today or Past Dates

* **Page**: `/schedule-pickup`
* **Issue**: System accepts invalid pickup dates (today or past), violating scheduling policy
* **Steps to Reproduce**:

  1. Log in as any user
  2. Go to the scheduling page
  3. Select **today’s date** (or any date in the past)
  4. Choose waste type, quantity, add instructions
  5. Click “Schedule”
* **Expected Result**:

  * Error message: *"Pickup must be scheduled at least 24 hours in advance"*
  * Request should be rejected
* **Actual Result**:

  * Request goes through
  * Message shown: *"Your waste pickup request has been submitted!"*
* **Severity**: **Major** (violates core scheduling logic)
* **Reference**: FR-013
* **Notes**: This could lead to operational errors in pickup planning

---
### 🐛 **DEF-009: Pickup Requests Not Reflected on Dashboard**

* **Page**: `/dashboard`
* **Issue**: After successfully submitting a pickup request, it is **not displayed or counted** under "Total Requests"

#### 🔁 **Steps to Reproduce**:

1. Register and log in as a user (e.g., `testuser1@gmail.com`)
2. Go to the **Waste Pickup** section
3. Submit a valid pickup request
4. Navigate to **Dashboard**

#### ✅ **Expected Result**:

* "Total Requests" count increases (e.g., from 0 → 1)
* Request appears in any recent or history list (if available)

#### ❌ **Actual Result**:

* "Total Requests" remains at **0**
* No record of submitted pickups is visible

#### 📊 **Severity**: Major (User actions are not being acknowledged in analytics)

#### 📝 **Notes**:

* This undermines user trust in the system and affects transparency.
* May also affect gamification logic (e.g., leaderboard, badges).

---
