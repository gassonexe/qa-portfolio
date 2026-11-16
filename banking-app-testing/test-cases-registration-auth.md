# Test Cases – Registration, Login & Password Recovery (ParaBank)

---

## A) Registration

### TC-REG-001 – Successful Registration

**Priority:** High  
**Preconditions:** Username has not been used before  

**Test Data:** Registration data from the test plan, with a new unique username  

**Steps:**
1. Open https://parabank.parasoft.com/parabank/index.htm
2. Click **Register**
3. Fill in all fields with valid test data
4. Enter the same password in **Password** and **Confirm**
5. Click **Register**

**Expected Result:**
- Account is created
- A welcome message with the username is displayed
- User is logged in and the account services menu is visible

---

### TC-REG-002 – Required Fields Validation (All Empty)

**Priority:** High  

**Steps:**
1. Open the Register page
2. Leave all fields empty
3. Click **Register**

**Expected Result:**
- Account is not created
- A "required" error message is shown next to each required field
- User stays on the Register page

---

### TC-REG-003 – Password and Confirm Do Not Match

**Priority:** High  

**Steps:**
1. Open the Register page
2. Fill in all fields with valid data
3. Enter `Test1234!` in **Password** and `Test9999!` in **Confirm**
4. Click **Register**

**Expected Result:**
- Account is not created
- An error message says the passwords do not match

---

### TC-REG-004 – Duplicate Username

**Priority:** High  
**Preconditions:** TC-REG-001 passed (username already exists)  

**Steps:**
1. Log out
2. Open the Register page
3. Fill in all fields, using the same username as in TC-REG-001
4. Click **Register**

**Expected Result:**
- Account is not created
- An error message says the username already exists

---

### TC-REG-005 – Invalid Input Formats

**Priority:** Medium  

**Steps:**
1. Open the Register page
2. Fill in all fields with valid data, then change:
   - **Phone #** to `abcdef`
   - **Zip Code** to `!!!`
   - **SSN** to `12`
3. Click **Register**

**Expected Result:**
- Account is not created
- An error message is shown for each field with an invalid format

**Note:** Record exactly which invalid values are accepted. Accepting them is a validation defect.

---

## B) Login & Logout

### TC-LOGIN-001 – Valid Login

**Priority:** High  
**Preconditions:** Registered test user  

**Steps:**
1. Open the home page
2. Enter the registered username and password
3. Click **Log In**

**Expected Result:**
- User is logged in
- **Accounts Overview** page is displayed
- Account services menu is visible

---

### TC-LOGIN-002 – Invalid Password

**Priority:** High  

**Steps:**
1. Open the home page
2. Enter the registered username and an incorrect password
3. Click **Log In**

**Expected Result:**
- User is not logged in
- An error message is displayed
- The message does not reveal whether the username or the password was wrong

---

### TC-LOGIN-003 – Empty Fields Validation

**Priority:** Medium  

**Steps:**
1. Open the home page
2. Leave username and password empty
3. Click **Log In**

**Expected Result:**
- User is not logged in
- An error message asks for username and password

---

### TC-LOGIN-004 – Logout

**Priority:** High  
**Preconditions:** User is logged in  

**Steps:**
1. Click **Log Out** in the account services menu

**Expected Result:**
- User is logged out
- Home page with the login form is displayed

---

### TC-LOGIN-005 – Back Button After Logout

**Priority:** High  
**Preconditions:** User was logged in and has just logged out (TC-LOGIN-004)  

**Steps:**
1. After logging out, press the browser **Back** button
2. Try to click any account link on the page that appears (e.g. **Accounts Overview**)

**Expected Result:**
- Account data is not shown, or the user is asked to log in again
- No account action can be performed without logging in

---

### TC-LOGIN-006 – Session Timeout (Exploratory)

**Priority:** Low  
**Preconditions:** User is logged in  

**Steps:**
1. Log in and open **Accounts Overview**
2. Leave the tab inactive for 30 minutes
3. Click **Accounts Overview** again

**Expected Result:**
- After inactivity, the user is asked to log in again

**Note:** ParaBank does not document a session timeout. Record the observed behaviour (timeout yes/no, and after roughly how long). For a banking app, no timeout at all is worth a bug report.

---

## C) Password Recovery ("Forgot login info?")

### TC-REC-001 – Recover Login Info With Valid Details

**Priority:** High  
**Preconditions:** Registered test user  

**Steps:**
1. Log out
2. Click **Forgot login info?**
3. Fill in the same first name, last name, address, city, state, zip code and SSN used at registration
4. Click **Find My Login Info**

**Expected Result:**
- The customer is found
- Login information is shown, or the user is logged in

**Note:** Also record how the login information is shown. Displaying the password on screen would be a security concern in a real bank.

---

### TC-REC-002 – Recover Login Info With Wrong SSN

**Priority:** High  

**Steps:**
1. Open **Forgot login info?**
2. Fill in correct details but SSN `999-99-9999`
3. Click **Find My Login Info**

**Expected Result:**
- No login information is shown
- An error message says the customer could not be found

---

### TC-REC-003 – Recover Login Info With Empty Fields

**Priority:** Medium  

**Steps:**
1. Open **Forgot login info?**
2. Leave all fields empty
3. Click **Find My Login Info**

**Expected Result:**
- A "required" error message is shown for each field
- No lookup is performed
