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