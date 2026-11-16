# Test Cases – Accounts, Transfers & Transaction History (ParaBank)

**Preconditions for all cases:** Registered test user is logged in.

---

## A) Accounts

### TC-ACC-001 – Accounts Overview Shows Account and Balance

**Priority:** High  

**Steps:**
1. Click **Accounts Overview**

**Expected Result:**
- At least one account is listed with account number, balance and available amount
- The **Total** matches the sum of the listed balances

---

### TC-ACC-002 – Open a New Savings Account

**Priority:** High  

**Steps:**
1. Click **Open New Account**
2. Select account type **SAVINGS**
3. Select an existing account to fund it from
4. Click **Open New Account**

**Expected Result:**
- A confirmation message with the new account number is displayed
- The new account appears in **Accounts Overview**
- The funding account balance is reduced by the opening deposit amount shown on the page

---

## B) Transfer Funds

### TC-TRF-001 – Transfer a Valid Amount Between Own Accounts

**Priority:** High  
**Preconditions:** User has at least two accounts (TC-ACC-002)  

**Steps:**
1. Note both account balances in **Accounts Overview**
2. Click **Transfer Funds**
3. Enter amount `100`
4. Select the first account in **From account** and the second in **to account**
5. Click **Transfer**

**Expected Result:**
- "Transfer Complete!" confirmation shows the amount and both accounts
- In **Accounts Overview**, the source balance is 100 lower and the target balance is 100 higher

---

### TC-TRF-002 – Transfer With Empty Amount

**Priority:** High  

**Steps:**
1. Open **Transfer Funds**
2. Leave **Amount** empty
3. Click **Transfer**

**Expected Result:**
- Transfer is not performed
- An error message asks for an amount

---

### TC-TRF-003 – Transfer With Invalid Amounts

**Priority:** High  

**Steps:**
Repeat for each amount: `0`, `-50`, `abc`
1. Open **Transfer Funds**
2. Enter the amount
3. Select two different accounts
4. Click **Transfer**

**Expected Result:**
- Transfer is not performed for any of the values
- A clear error message is shown
- Balances in **Accounts Overview** do not change

**Note:** Record the result for each value separately.

---

### TC-TRF-004 – Transfer More Than the Available Balance

**Priority:** High  

**Steps:**
1. Open **Transfer Funds**
2. Enter amount `999999`
3. Select two different accounts
4. Click **Transfer**

**Expected Result:**
- Transfer is rejected with an "insufficient funds" type message
- Balances do not change

---

### TC-TRF-005 – Transfer to the Same Account

**Priority:** Medium  

**Steps:**
1. Open **Transfer Funds**
2. Enter amount `100`
3. Select the same account in **From account** and **to account**
4. Click **Transfer**

**Expected Result:**
- Transfer is rejected, or the user is warned that both accounts are the same

---

## C) Bill Pay

### TC-BILL-001 – Bill Pay Required Fields Validation

**Priority:** Medium  

**Steps:**
1. Click **Bill Pay**
2. Leave all fields empty
3. Click **Send Payment**

**Expected Result:**
- Payment is not sent
- An error message is shown for each required field

---

### TC-BILL-002 – Bill Pay Account Numbers Do Not Match

**Priority:** Medium  

**Steps:**
1. Open **Bill Pay**
2. Fill in all payee fields with test data
3. Enter `12345` in **Account #** and `54321` in **Verify Account #**
4. Enter amount `50`
5. Click **Send Payment**

**Expected Result:**
- Payment is not sent
- An error message says the account numbers do not match

---

## D) Transaction History

### TC-TRX-001 – Account Activity Lists the Transfer

**Priority:** High  
**Preconditions:** TC-TRF-001 passed  

**Steps:**
1. Open **Accounts Overview**
2. Click the source account number from TC-TRF-001

**Expected Result:**
- **Account Activity** shows the transfer with today's date, a description and amount 100 as a debit

---

### TC-TRX-002 – Filter Account Activity by Type

**Priority:** Medium  

**Steps:**
1. Open **Account Activity** for an account with transactions
2. Set **Type** to **Credit** and click **Go**
3. Set **Type** to **Debit** and click **Go**

**Expected Result:**
- Only credit transactions are shown for Credit
- Only debit transactions are shown for Debit

---

### TC-TRX-003 – Find Transaction by Amount

**Priority:** High  
**Preconditions:** TC-TRF-001 passed  

**Steps:**
1. Click **Find Transactions**
2. Select the source account
3. Enter `100` in **Find by Amount**
4. Click the matching **Find Transactions** button

**Expected Result:**
- The transfer from TC-TRF-001 is listed in the results

---

### TC-TRX-004 – Find Transactions With Invalid Date

**Priority:** Medium  

**Steps:**
1. Open **Find Transactions**
2. Enter `99-99-9999` in **Find by Date**
3. Click the matching **Find Transactions** button

**Expected Result:**
- A clear validation message about the date format is shown
- No error page or technical error is displayed
