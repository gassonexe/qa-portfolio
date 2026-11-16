# Bug Reports – ParaBank Test Execution

Environment:
- Browser: Google Chrome (latest)
- OS: Windows 10
- URL: https://parabank.parasoft.com/parabank/index.htm
- Date: 2026-11-16
- Test accounts: 74394 (checking), 77502 (savings)

| ID | Title | Severity |
|---|---|---|
| BUG-PB-003 | Negative transfer amount is accepted and moves money in reverse | Critical |
| BUG-PB-004 | Transfer above the available balance is accepted (no overdraft check) | Critical |
| BUG-PB-002 | Empty or non-numeric transfer amount causes an internal server error | Medium |
| BUG-PB-001 | Account pages return HTTP 500 instead of the login page when logged out | Medium |
| BUG-PB-008 | Site is not responsive on mobile and tablet screen sizes | Medium |
| BUG-PB-005 | Transfer of $0.00 is accepted | Low |
| BUG-PB-006 | Transfer to the same account is accepted | Low |
| BUG-PB-007 | Invalid date in Find Transactions shows no validation message | Low |

---

## BUG-PB-001 – Account Pages Return HTTP 500 Instead of the Login Page When Logged Out

**Severity:** Medium  
**Priority:** P2  
**Module:** Session / Navigation  
**Found by:** TC-LOGIN-005  

### Steps to Reproduce:
1. Log in and open **Accounts Overview**
2. Click **Log Out**
3. Press the browser **Back** button, or open https://parabank.parasoft.com/parabank/overview.htm directly
4. Click **Accounts Overview**

### Actual Result:
- The server responds with HTTP 500
- The page shows "Error! An internal error has occurred and has been logged."
- No account data is shown

### Expected Result:
- The user is redirected to the login page, or told that the session has ended and asked to log in again

---

## BUG-PB-002 – Empty or Non-Numeric Transfer Amount Causes an Internal Server Error

**Severity:** Medium  
**Priority:** P2  
**Module:** Transfer Funds  
**Found by:** TC-TRF-002, TC-TRF-003  

### Steps to Reproduce:
1. Log in and open **Transfer Funds**
2. Leave **Amount** empty (or enter `abc`)
3. Select two different accounts
4. Click **Transfer**

### Actual Result:
- "Error! An internal error has occurred and has been logged." is displayed
- No field-level validation message

### Expected Result:
- Transfer is not sent
- A validation message next to the field, e.g. "Please enter a valid amount"

---

## BUG-PB-003 – Negative Transfer Amount Is Accepted and Moves Money in Reverse

**Severity:** Critical  
**Priority:** P1  
**Module:** Transfer Funds  
**Found by:** TC-TRF-003  

### Steps to Reproduce:
1. Log in and note the balances of two accounts in **Accounts Overview** (here: 74394 = $315.50, 77502 = $200.00)
2. Open **Transfer Funds**
3. Enter amount `-50`
4. Select **From account** 74394 and **to account** 77502
5. Click **Transfer**
6. Open **Accounts Overview**

### Actual Result:
- "Transfer Complete! -$50.00 has been transferred from account #74394 to account #77502."
- 74394 went **up** by $50.00 and 77502 went **down** by $50.00
- Account Activity lists the transaction as a debit of -$50.00
- A user can pull money out of the destination account by sending a negative amount

### Expected Result:
- Negative amounts are rejected with a validation message
- No balance changes

---

## BUG-PB-004 – Transfer Above the Available Balance Is Accepted (No Overdraft Check)

**Severity:** Critical  
**Priority:** P1  
**Module:** Transfer Funds  
**Found by:** TC-TRF-004  

### Steps to Reproduce:
1. Log in; account 74394 has a balance of $365.50
2. Open **Transfer Funds**
3. Enter amount `999999`
4. Select **From account** 74394 and **to account** 77502
5. Click **Transfer**
6. Open **Accounts Overview**

### Actual Result:
- "Transfer Complete! $999999.00 has been transferred from account #74394 to account #77502."
- Account 74394 balance is **-$999,633.50**
- Account 77502 balance is **$1,000,149.00**

### Expected Result:
- Transfer is rejected with an "insufficient funds" message
- Balances do not change

---

## BUG-PB-005 – Transfer of $0.00 Is Accepted

**Severity:** Low  
**Priority:** P3  
**Module:** Transfer Funds  
**Found by:** TC-TRF-003  

### Steps to Reproduce:
1. Log in and open **Transfer Funds**
2. Enter amount `0`
3. Select two different accounts
4. Click **Transfer**

### Actual Result:
- "Transfer Complete! $0.00 has been transferred..."
- An empty $0.00 transaction is added to Account Activity

### Expected Result:
- A validation message says the amount must be greater than zero
- No transaction is created

---

## BUG-PB-006 – Transfer to the Same Account Is Accepted

**Severity:** Low  
**Priority:** P3  
**Module:** Transfer Funds  
**Found by:** TC-TRF-005  

### Steps to Reproduce:
1. Log in and open **Transfer Funds**
2. Enter amount `100`
3. Select account 74394 in both **From account** and **to account**
4. Click **Transfer**

### Actual Result:
- "Transfer Complete! $100.00 has been transferred from account #74394 to account #74394."
- Two transactions (sent and received) are added to Account Activity

### Expected Result:
- Transfer is rejected, or the user is warned that both accounts are the same
- Note: both dropdowns default to the same account when the page opens, which makes this easy to do by mistake

---

## BUG-PB-007 – Invalid Date in Find Transactions Shows No Validation Message

**Severity:** Low  
**Priority:** P3  
**Module:** Find Transactions  
**Found by:** TC-TRX-004  

### Steps to Reproduce:
1. Log in and open **Find Transactions**
2. Enter `99-99-9999` in **Find by Date**
3. Click the matching **Find Transactions** button

### Actual Result:
- An empty "Transaction Results" table is shown
- No message about the invalid date

### Expected Result:
- A validation message about the date format (MM-DD-YYYY)
- No search is run

---

## BUG-PB-008 – Site Is Not Responsive on Mobile and Tablet Screen Sizes

**Severity:** Medium  
**Priority:** P2  
**Module:** UI / Layout (all pages)  
**Found by:** TC-UI-001 to TC-UI-005  

### Steps to Reproduce:
1. Open Chrome DevTools (F12) and turn on the device toolbar (Ctrl+Shift+M)
2. Set the size to 375 x 812
3. Open the home page, **Register**, then log in and open **Accounts Overview** and **Transfer Funds**
4. Repeat at 768 x 1024

### Actual Result:
- The pages have no `viewport` meta tag and a fixed desktop layout about 980px wide
- At 375px:
  - most content is cut off on the right
  - the registration form is completely off-screen
  - the transfer amount field and "to account" dropdown are off-screen
- At 768px the page is 876px wide, so the whole page scrolls sideways
- Menu links are 13px text and about 19px apart, below the commonly recommended 44px tap target

### Expected Result:
- Layout adapts to the screen width with no horizontal scrolling
- Forms and tables are fully visible and usable on phones and tablets
