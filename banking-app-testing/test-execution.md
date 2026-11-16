# Test Execution – ParaBank

Results: **Pass**, **Fail**, **Not run**. Every Fail links to a report in `bug-reports.md`.

- Tester: 
- Date: 2026-11-16
- Browser / OS: Google Chrome (latest) / Windows 10
- Screen sizes: 375 x 812, 768 x 1024, desktop
- Test user: Test User, accounts 74394 (checking) and 77502 (savings, opened in TC-ACC-002)

| Test Case | Title | Result | Bug | Notes |
|---|---|---|---|---|
| TC-REG-001 | Successful Registration | Pass | | Account created, "Welcome Test User" shown |
| TC-REG-002 | Required Fields Validation (All Empty) | Pass | | A "required" message for each field, e.g. "First name is required." Phone # is optional |
| TC-REG-003 | Password and Confirm Do Not Match | Not run | | |
| TC-REG-004 | Duplicate Username | Not run | | |
| TC-REG-005 | Invalid Input Formats | Not run | | |
| TC-LOGIN-001 | Valid Login | Pass | | Accounts Overview shown after login |
| TC-LOGIN-002 | Invalid Password | Not run | | |
| TC-LOGIN-003 | Empty Fields Validation | Pass | | "Please enter a username and password." |
| TC-LOGIN-004 | Logout | Pass | | Redirected to the home page with the login form |
| TC-LOGIN-005 | Back Button After Logout | Pass | BUG-PB-001 | No account data shown and no action possible, but every page returns an HTTP 500 error instead of the login page |
| TC-LOGIN-006 | Session Timeout (Exploratory) | Not run | | |
| TC-REC-001 | Recover Login Info With Valid Details | Not run | | |
| TC-REC-002 | Recover Login Info With Wrong SSN | Not run | | |
| TC-REC-003 | Recover Login Info With Empty Fields | Pass | | A "required" message for each field |
| TC-ACC-001 | Accounts Overview Shows Account and Balance | Pass | | Account 74394, $515.50, total matches |
| TC-ACC-002 | Open a New Savings Account | Pass | | Account 77502 opened with $100.00, funding account reduced by $100.00 |
| TC-TRF-001 | Transfer a Valid Amount Between Own Accounts | Pass | | "Transfer Complete!", balances changed by $100.00 |
| TC-TRF-002 | Transfer With Empty Amount | Fail | BUG-PB-002 | "An internal error has occurred" instead of a validation message |
| TC-TRF-003 | Transfer With Invalid Amounts | Fail | BUG-PB-002, BUG-PB-003, BUG-PB-005 | `0`: accepted ("$0.00 has been transferred"). `-50`: accepted and money moved in reverse. `abc`: internal error |
| TC-TRF-004 | Transfer More Than the Available Balance | Fail | BUG-PB-004 | $999,999.00 accepted, source balance became -$999,633.50 |
| TC-TRF-005 | Transfer to the Same Account | Fail | BUG-PB-006 | "$100.00 has been transferred from account #74394 to account #74394" |
| TC-BILL-001 | Bill Pay Required Fields Validation | Pass | | A message for each field, e.g. "Payee name is required.", "The amount cannot be empty." |
| TC-BILL-002 | Bill Pay Account Numbers Do Not Match | Pass | | "The account numbers do not match." |
| TC-TRX-001 | Account Activity Lists the Transfer | Pass | | $100.00 debit dated 11-16-2026. The invalid transfers ($0.00, -$50.00, $999,999.00) are also listed as normal transactions |
| TC-TRX-002 | Filter Account Activity by Type | Pass | | Credit and Debit filters show only matching rows |
| TC-TRX-003 | Find Transaction by Amount | Pass | | All $100.00 transactions listed |
| TC-TRX-004 | Find Transactions With Invalid Date | Fail | BUG-PB-007 | `99-99-9999` returns an empty result table with no validation message |
| TC-UI-001 | Home Page and Login Form on All Sizes | Fail | BUG-PB-008 | Login box fits at 375px, but the rest of the page is cut off and needs horizontal scrolling |
| TC-UI-002 | Registration Form on Mobile | Fail | BUG-PB-008 | At 375px the whole registration form is off-screen to the right |
| TC-UI-003 | Accounts Overview Table on Mobile and Tablet | Fail | BUG-PB-008 | Mobile: table cut off. Tablet: page is 876px wide in a 768px viewport, so the page scrolls sideways |
| TC-UI-004 | Navigation Menu on Mobile | Fail | BUG-PB-008 | Links visible, but 13px text and about 19px apart, too small to tap reliably |
| TC-UI-005 | Transfer Funds Form on Mobile | Fail | BUG-PB-008 | Amount field and "to account" dropdown are off-screen at 375px |

## Summary

- Planned: 32
- Executed: 25
- Passed: 15
- Failed: 10
- Not run: 7 (registration negative cases, invalid password, session timeout and password recovery with personal details)
- Bugs reported: 8
