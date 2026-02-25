# Test Cases – Cart & Checkout (SauceDemo)

---

## A) Cart Functionality

### TC-CART-001 – Add Single Product to Cart

**Priority:** High  
**Preconditions:** User is logged in  

**Steps:**
1. On Inventory page, click **Add to cart** for any product
2. Observe cart badge (top right corner)

**Expected Result:**
- Cart badge increases to 1
- Button changes from "Add to cart" to "Remove"

---

### TC-CART-002 – Add Multiple Products to Cart

**Priority:** High  
**Preconditions:** User is logged in  

**Steps:**
1. Add two different products to cart
2. Observe cart badge

**Expected Result:**
- Cart badge shows correct number (2)
- Both products appear in cart

---

### TC-CART-003 – Remove Product from Inventory Page

**Priority:** High  
**Preconditions:** At least one item added to cart  

**Steps:**
1. Click **Remove** on a product (from Inventory page)

**Expected Result:**
- Product is removed from cart
- Cart badge updates correctly

---

### TC-CART-004 – Remove Product from Cart Page

**Priority:** High  
**Preconditions:** At least one item in cart  

**Steps:**
1. Click cart icon
2. Click **Remove** for a product

**Expected Result:**
- Product is removed from cart
- Cart badge updates correctly

---

### TC-CART-005 – Continue Shopping Button

**Priority:** Medium  

**Steps:**
1. Open cart page
2. Click **Continue Shopping**

**Expected Result:**
- User is redirected to Inventory page

---

---

## B) Checkout Process

### TC-CO-001 – Open Checkout Page

**Priority:** High  
**Preconditions:** At least one item in cart  

**Steps:**
1. Open cart
2. Click **Checkout**

**Expected Result:**
- Checkout Step One page is displayed
- Fields: First Name, Last Name, Postal Code are visible

---

### TC-CO-002 – Checkout Required Fields Validation (All Empty)

**Priority:** High  

**Steps:**
1. Leave all fields empty
2. Click **Continue**

**Expected Result:**
- Error message is displayed
- User remains on Checkout Step One page

---

### TC-CO-003 – Missing Last Name Validation

**Priority:** Medium  

**Steps:**
1. Enter First Name
2. Leave Last Name empty
3. Enter Postal Code
4. Click **Continue**

**Expected Result:**
- Error message indicates Last Name is required
- User remains on Step One page

---

### TC-CO-004 – Successful Checkout Flow

**Priority:** High  

**Test Data:**
- First Name: Test
- Last Name: User
- Postal Code: 11000

**Steps:**
1. Fill all required fields
2. Click **Continue**
3. Verify Overview page shows selected items
4. Click **Finish**

**Expected Result:**
- Checkout completes successfully
- Confirmation page is displayed
- Message confirms order completion

---

### TC-CO-005 – Cancel Checkout from Step One

**Priority:** Medium  

**Steps:**
1. Start checkout process
2. Click **Cancel**

**Expected Result:**
- User is redirected back to Cart page

---

### TC-CO-006 – Cancel Checkout from Overview Page

**Priority:** Low  

**Steps:**
1. Proceed to Checkout Overview page
2. Click **Cancel**

**Expected Result:**
- User is redirected to Inventory page
- Cart items remain unchanged