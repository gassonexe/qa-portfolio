# Test Cases – Riot Autologger Desktop Application

---

## A) Application Launch

### TC-RA-001 – Application Launches Successfully

**Priority:** High  

**Steps:**
1. Run the Riot Autologger application

**Expected Result:**
- Application window opens successfully
- Account list is displayed
- Buttons are visible and clickable

---

## B) Account Management

### TC-RA-002 – Add New Account

**Priority:** High  

**Steps:**
1. Click "Add Account"
2. Enter valid username
3. Enter valid password
4. Save account

**Expected Result:**
- Account appears in account list
- Account is saved in local storage (accounts.json)

---

### TC-RA-003 – Password Masking in UI

**Priority:** Medium  

**Steps:**
1. Add or edit account
2. Observe password input field

**Expected Result:**
- Password is masked 
- Password is not visible in plain text in UI

---

### TC-RA-004 – Add Duplicate Account

**Priority:** Medium  

**Steps:**
1. Add an account with username "TestUser"
2. Add another account with the same username

**Expected Result:**
- Application allows duplicate account entry
- Both entries appear in account list

---

### TC-RA-005 – Edit Existing Account

**Priority:** High  

**Steps:**
1. Select existing account
2. Click "Edit"
3. Modify password
4. Save changes

**Expected Result:**
- Updated account information is saved
- Changes persist after restarting application

---

### TC-RA-006 – Delete Account

**Priority:** High  

**Steps:**
1. Select an account
2. Click "Delete"

**Expected Result:**
- Account is removed from list
- Account is removed from local storage

---

## C) Login Automation

### TC-RA-007 – Successful Login Automation

**Priority:** High  
**Precondition:** Riot Client running (English language)

**Steps:**
1. Open Riot Client
2. Open Riot Autologger
3. Select saved account
4. Click Login

**Expected Result:**
- Riot Client window is detected
- Username and password are entered automatically
- Login process starts

---

### TC-RA-008 – Riot Client Not Running

**Priority:** High  

**Steps:**
1. Ensure Riot Client is completely closed
2. Open Riot Autologger
3. Attempt login

**Expected Result:**
- No login occurs
- Application does not crash
- No visible error message appears

---

### TC-RA-009 – Riot Client in Non-English Language

**Priority:** Medium  

**Steps:**
1. Set Riot Client language to non-English
2. Attempt login using Autologger

**Expected Result:**
- Riot Client window is not detected
- Login automation fails
- Application does not crash

---

### TC-RA-010 – Invalid Credentials

**Priority:** Medium  

**Steps:**
1. Save account with incorrect password
2. Attempt login

**Expected Result:**
- Riot Client attempts login
- Riot Client shows authentication failure
- Autologger does not crash