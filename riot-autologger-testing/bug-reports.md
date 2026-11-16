# Bug Reports – Riot Autologger Test Execution

Environment:
- OS: Windows 10/11
- Riot Client language: English
- Display mode: 1440x1080 (4:3 stretched fullscreen)
- Scaling: 100%

---

## BUG-RA-001 – Login Button Not Detected in 1440x1080 Stretched Fullscreen

**Severity:** High  
**Priority:** P1  
**Module:** Login Automation 

### Preconditions:
- Riot Client is open on the login screen
- At least one account is saved in the app

### Steps to Reproduce:
1. Set display resolution to 1440x1080
2. Enable stretched fullscreen mode (4:3 aspect ratio)
3. Open Riot Client (English) and keep it on the login screen
4. Open Riot Autologger
5. Select a saved account
6. Click Login (start automation)

### Actual Result:
- Riot Client window is detected successfully
- Username field is detected and filled successfully
- Password field is detected and filled successfully
- The final "Login/Sign in" button is NOT detected, so the app does not click it
- Login process does not continue, and no error message is displayed

### Expected Result:
- After filling username and password, the app should detect and click the login button
- If detection fails, the user should be informed that the automation could not complete.

---

## BUG-RA-002 – Account List Scrollbar Breaks When Many Accounts Are Added

**Severity:** Medium  
**Priority:** P2  
**Module:** Account Management UI  
**Status:** Fixed (found and fixed during development)  

### Preconditions:
- Riot Autologger is open
- Enough accounts can be added to overflow the visible account list

### Steps to Reproduce:
1. Open Riot Autologger
2. Add accounts one by one until the list is taller than the window
3. Try to scroll the account list with the scrollbar and the mouse wheel
4. Delete accounts until the list fits in the window again

### Actual Result (before fix):
- With "too many" accounts, the scrollbar stopped working correctly and the full account list could not be scrolled through reliably

### Expected Result:
- The scrollbar appears only when the list is taller than the window
- All accounts can be reached with the scrollbar and the mouse wheel
- The scrollbar disappears again when the list fits in the window

### Fix:
- `update_scroll()` in `Autologger by Gasson.py` (https://github.com/gassonexe/riot-autologger) now:
  - recalculates the scroll region from the list's current size
  - shows the scrollbar and binds the mouse wheel only when the content is taller than the view
  - hides the scrollbar and unbinds the mouse wheel when it is not needed
  - re-centres the account list horizontally
- It runs whenever the list resizes and after every add, edit and delete

### Retest:
- Covered by TC-RA-011 (regression test for account list scrolling)

**Note:** Found during development, before this test plan was written. The original symptom is described from the developer's notes; no screenshot was kept.

