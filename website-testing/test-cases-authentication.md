# Test Cases – Authentication (SauceDemo)

---

## TC-LOGIN-001 – Valid Login

**Priority:** High  
**Preconditions:** Valid user credentials available  

**Test Data:**  
Username: standard_user  
Password: secret_sauce  

**Steps:**
1. Open https://www.saucedemo.com
2. Enter username `standard_user`
3. Enter password `secret_sauce`
4. Click **Login**

**Expected Result:**
- User is logged in successfully
- User is redirected to the Inventory page (inventory.html)
- Product list is visible
- Cart icon is visible

---

## TC-LOGIN-002 – Invalid Password

**Priority:** High  

**Steps:**
1. Open login page
2. Enter valid username `standard_user`
3. Enter incorrect password
4. Click **Login**

**Expected Result:**
- User remains on login page
- Error message is displayed
- User is not logged in

---

## TC-LOGIN-003 – Empty Fields Validation

**Priority:** Medium  

**Steps:**
1. Open login page
2. Leave username empty
3. Leave password empty
4. Click **Login**

**Expected Result:**
- Error message is displayed
- User is not logged in
- User remains on login page

---

## TC-LOGIN-004 – Locked Out User

**Priority:** High  

**Test Data:**  
Username: locked_out_user  
Password: secret_sauce  

**Steps:**
1. Open login page
2. Enter username `locked_out_user`
3. Enter password `secret_sauce`
4. Click **Login**

**Expected Result:**
- Login attempt fails
- Error message indicates the user is locked out
- User remains on login page

---

## TC-LOGIN-005 – Password Masking

**Priority:** Low  

**Steps:**
1. Open login page
2. Enter any text into the password field

**Expected Result:**
- Password characters are masked (hidden with dots or asterisks)

---

## TC-LOGIN-006 – Logout

**Priority:** High  
**Preconditions:** User is logged in  

**Steps:**
1. Click the menu button (☰) in the top left
2. Click **Logout**
3. Attempt to access the Inventory page directly (if possible)

**Expected Result:**
- User is redirected to login page
- Inventory page is not accessible without logging in again
- Session is terminated