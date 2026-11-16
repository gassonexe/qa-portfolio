# Test Cases – Responsive Layout (ParaBank)

Screen sizes are emulated in Chrome DevTools (F12 → Toggle device toolbar, Ctrl+Shift+M).

| Size | Viewport |
|---|---|
| Mobile | 375 x 812 |
| Tablet | 768 x 1024 |
| Desktop | 1920 x 1080 |

---

### TC-UI-001 – Home Page and Login Form on All Sizes

**Priority:** High  

**Steps:**
1. Open the home page
2. Check the page at mobile, tablet and desktop size

**Expected Result:**
- Login form is fully visible and usable without zooming
- No horizontal scrolling is needed
- Text and buttons do not overlap or get cut off

---

### TC-UI-002 – Registration Form on Mobile

**Priority:** High  

**Steps:**
1. Open the Register page at mobile size (375 x 812)
2. Scroll through the whole form
3. Submit the empty form to show the validation messages

**Expected Result:**
- All fields and labels are readable and aligned
- Validation messages are visible next to their fields
- The **Register** button can be reached and tapped

---

### TC-UI-003 – Accounts Overview Table on Mobile and Tablet

**Priority:** High  
**Preconditions:** User is logged in  

**Steps:**
1. Open **Accounts Overview** at mobile and tablet size

**Expected Result:**
- All table columns (Account, Balance, Available Amount) are readable
- Amounts are not cut off
- No horizontal scrolling of the whole page is needed

---

### TC-UI-004 – Navigation Menu on Mobile

**Priority:** Medium  
**Preconditions:** User is logged in  

**Steps:**
1. At mobile size, use the account services menu to open **Transfer Funds**, **Find Transactions** and **Log Out**

**Expected Result:**
- Every menu link is visible and can be tapped
- Links are not too close together to tap accurately

---

### TC-UI-005 – Transfer Funds Form on Mobile

**Priority:** Medium  
**Preconditions:** User is logged in  

**Steps:**
1. At mobile size, open **Transfer Funds**
2. Complete a valid transfer of `10`

**Expected Result:**
- Amount field and both account dropdowns are usable
- Confirmation message is fully visible
