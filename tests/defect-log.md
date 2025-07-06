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
