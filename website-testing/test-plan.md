# Test Plan – SauceDemo Website Testing

## 1. Introduction

This test plan describes the manual testing approach for the SauceDemo website.

The goal is to verify that the main features of the application work correctly and handle invalid inputs properly.

Application URL:
https://www.saucedemo.com

---

## 2. Testing Scope

### Features to be Tested

- Login functionality
- Logout functionality
- Product inventory page
- Sorting products
- Adding products to cart
- Removing products from cart
- Cart badge updates
- Checkout process
- Checkout form validation
- Order completion

### Features Not Covered

- Performance testing
- Security testing
- API testing
- Cross-browser testing

---

## 3. Test Approach

Manual functional testing will be performed using predefined test cases.

Testing types included:
- Functional testing
- Negative testing
- Basic validation testing

All results will be recorded as Pass or Fail.

---

## 4. Test Environment

- Browser: Google Chrome (latest version)
- Operating System: Windows 10/11
- Device: Desktop
- Internet connection required

---

## 5. Test Data

Valid user:
- Username: standard_user
- Password: secret_sauce

Other test users:
- locked_out_user
- problem_user
- performance_glitch_user

Sample checkout data:
- First Name: Test
- Last Name: User
- Postal Code: 11000

---

## 6. Entry Criteria

- Website is accessible
- Valid test credentials are available

---

## 7. Exit Criteria

- All planned test cases are executed
- All identified issues are documented
- Test results are recorded