# Test Plan – ParaBank Online Banking Testing

## 1. Introduction

This test plan describes the manual testing approach for ParaBank, a demo online banking web application published by Parasoft for testing practice.

The goal is to verify that the core banking features work correctly, handle invalid input safely, and display correctly on desktop and mobile screen sizes.

Application URL:
https://parabank.parasoft.com/parabank/index.htm

ParaBank is not a real bank. No real money, accounts or personal data are involved.

---

## 2. Testing Scope

### Features to be Tested

- User registration
- Login and logout
- Password recovery ("Forgot login info?")
- Session handling after logout
- Accounts overview
- Opening a new account
- Transferring funds between accounts
- Bill pay form validation
- Transaction history (account activity and Find Transactions)
- Layout on mobile, tablet and desktop screen sizes

### Features Not Covered

- Performance and load testing
- Security testing (penetration, SQL injection, etc.)
- API / web service testing
- Request Loan and Update Contact Info
- Admin Page (it can reset data for all users of the demo site)
- Native mobile apps (the site is tested in mobile browser viewports)

---

## 3. Test Approach

Manual functional testing will be performed using predefined test cases.

Testing types included:
- Functional testing
- Negative testing (invalid and missing input)
- Input validation testing
- Responsive UI testing on multiple screen sizes

All results will be recorded as Pass or Fail in `test-execution.md`. Every failure is documented in `bug-reports.md`.

---

## 4. Test Environment

- Browser: Google Chrome (latest version)
- Operating System: Windows 10/11
- Devices: Desktop, plus mobile and tablet sizes using Chrome DevTools device emulation
- Viewports:
  - Mobile: 375 x 812 (iPhone X class)
  - Tablet: 768 x 1024 (iPad class)
  - Desktop: 1920 x 1080
- Internet connection required

---

## 5. Test Data

All test data is fake. Never use real personal data on the demo site.

Registration data:
- First Name: Test
- Last Name: User
- Address: 1 Test Street
- City: Belgrade
- State: BG
- Zip Code: 11000
- Phone #: 0601234567
- SSN: 123-45-6789
- Username: a unique value per run, e.g. `qa_tester_<date>`
- Password: `Test1234!`

Transfer and bill pay data:
- Valid amount: 100
- Zero amount: 0
- Negative amount: -50
- Non-numeric amount: abc
- Amount above balance: 999999

Note: ParaBank's database is shared and reset from time to time. If a registered user stops working, register a new one.

---

## 6. Entry Criteria

- Website is accessible
- A test user can be registered

---

## 7. Exit Criteria

- All planned test cases are executed
- All results are recorded in `test-execution.md`
- All identified issues are documented in `bug-reports.md`
