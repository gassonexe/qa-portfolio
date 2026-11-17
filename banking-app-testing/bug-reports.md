# Bug Reports – ParaBank Test Execution

Environment:
- Browser: Google Chrome (latest)
- OS: Windows 10
- URL: https://parabank.parasoft.com/parabank/index.htm
- Dates: 2026-11-16, 2026-11-17
- Test accounts: 74394 (checking), 77502 (savings)

| ID | Title | Severity |
|---|---|---|
| BUG-PB-003 | Negative transfer amount is accepted and moves money in reverse | Critical |
| BUG-PB-004 | Transfer above the available balance is accepted (no overdraft check) | Critical |
| BUG-PB-010 | Password recovery shows the password in plain text and logs the user in | Critical |
| BUG-PB-002 | Empty or non-numeric transfer amount causes an internal server error | Medium |
| BUG-PB-001 | Account pages return HTTP 500 instead of the login page when logged out | Medium |
| BUG-PB-008 | Site is not responsive on mobile and tablet screen sizes | Medium |
| BUG-PB-009 | Registration accepts invalid phone, zip code and SSN formats | Medium |
| BUG-PB-011 | Duplicate SSN allowed at registration, which breaks password recovery | Medium |
| BUG-PB-005 | Transfer of $0.00 is accepted | Low |
| BUG-PB-006 | Transfer to the same account is accepted | Low |
| BUG-PB-007 | Invalid date in Find Transactions shows no validation message | Low |

---

## BUG-PB-001 – Account Pages Return HTTP 500 Instead of the Login Page When Logged Out

**Severity:** Medium  
**Priority:** P2  
**Module:** Session / Navigation  
**Found by:** TC-LOGIN-005, TC-LOGIN-006  

### Steps to Reproduce:
1. Log in and open **Accounts Overview**
2. Click **Log Out**
3. Press the browser **Back** button, or open https://parabank.parasoft.com/parabank/overview.htm directly
4. Click **Accounts Overview**

### Actual Result:
- The server responds with HTTP 500
- The page shows "Error! An internal error has occurred and has been logged."
- No account data is shown

### Also Occurs:
- After the session expires from inactivity (TC-LOGIN-006, 2026-11-17): logged in at 12:30, idle until 13:19, clicked **Accounts Overview**. The login form appeared, together with "Error! An internal error has occurred and has been logged."

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

---

## BUG-PB-009 – Registration Accepts Invalid Phone, Zip Code and SSN Formats

**Severity:** Medium  
**Priority:** P2  
**Module:** Registration  
**Found by:** TC-REG-005  
**Date:** 2026-11-17  

### Steps to Reproduce:
1. Open https://parabank.parasoft.com/parabank/register.htm
2. Fill in First Name `Test`, Last Name `User`, Address `1 Test Street`, City `Belgrade`, State `BG`
3. Enter Zip Code `!!!`, Phone # `abcdef`, SSN `12`
4. Enter a new username (here `qa_tester_1117c`) and Password / Confirm `Test1234!`
5. Click **Register**

### Actual Result:
- "Your account was created successfully. You are now logged in."
- The account is stored with a phone number made of letters, a zip code made of symbols and a 2-digit SSN
- No validation message is shown for any of the three fields

### Expected Result:
- Registration is blocked
- A format message is shown for each invalid field, e.g. phone must contain digits, zip code must be numeric, SSN must match the format 123-45-6789
- For a bank, invalid identity and contact details should never reach customer records

---

## BUG-PB-010 – Password Recovery Shows the Password in Plain Text and Logs the User In

**Severity:** Critical  
**Priority:** P1  
**Module:** Password Recovery ("Forgot login info?")  
**Found by:** TC-REC-001  
**Date:** 2026-11-17  

### Steps to Reproduce:
1. Register a customer with unique details (here: Lookup / Tester / 5 Recovery Road / Novi Sad / NS / 21000 / SSN 555-12-3456, username `qa_lookup_1117`)
2. Log out
3. Click **Forgot login info?**
4. Enter the same first name, last name, address, city, state, zip code and SSN
5. Click **Find My Login Info**

### Actual Result:
- "Your login information was located successfully. You are now logged in."
- The page shows the username **and the password in plain text** (`Password: Test1234!`)
- The user is logged in to the account immediately
- Only personal details are required: no email link, SMS code or other second factor

### Expected Result:
- The password is never displayed. Passwords should be stored hashed, so they cannot be shown at all
- Recovery sends a one-time reset link or code to a verified email address or phone number
- The user is not logged in until they set a new password through that link or code

### Impact:
- Anyone who knows or obtains a customer's name, address and SSN can read their password and take over the account
- Displaying the password shows it is stored in a reversible form

---

## BUG-PB-011 – Duplicate SSN Allowed at Registration, Which Breaks Password Recovery

**Severity:** Medium  
**Priority:** P2  
**Module:** Registration / Password Recovery  
**Found by:** TC-REC-001  
**Date:** 2026-11-17  

### Steps to Reproduce:
1. Register a customer: Test / User / 1 Test Street / Belgrade / BG / 11000 / SSN 123-45-6789, username `qa_tester_1117`
2. Register a second customer with exactly the same personal details and SSN but a different username
3. Log out and click **Forgot login info?**
4. Enter Test / User / 1 Test Street / Belgrade / BG / 11000 / 123-45-6789
5. Click **Find My Login Info**

### Actual Result:
- Registration accepts the same SSN for more than one customer without any warning
- Password recovery then returns "The customer information provided could not be found." for these customers, even though the details are correct
- The same lookup works for a customer whose details are unique (see BUG-PB-010)

### Expected Result:
- Registration rejects an SSN that already belongs to another customer, or asks the user to log in to the existing profile
- Password recovery never tells a real customer that their details cannot be found

