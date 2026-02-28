# Test Plan – Riot Autologger Desktop Application

## 1. Introduction

This test plan describes the manual testing approach for the Riot Autologger desktop application.

Riot Autologger is a Python-based desktop application that automates login to the Riot Client using saved account credentials.

---

## 2. Objective

The objective of this testing effort is to verify:

- Account management functionality (Add / Edit / Delete)
- Proper saving of accounts to local storage
- Correct automation of Riot Client login
- Handling of invalid or missing Riot Client
- Basic UI behavior and validation

---

## 3. Scope

### Features to be Tested

- Adding a new account
- Editing an existing account
- Deleting an account
- Account list display
- Login automation
- Behavior when Riot Client is not running
- Behavior with invalid credentials
- Persistence of saved accounts (accounts.json)

### Out of Scope

- Performance/load testing
- Security testing
- Riot API testing
- Network-level validation

---

## 4. Test Approach

Manual functional testing will be performed.

Testing types included:

- Functional testing
- Negative testing
- Basic UI validation
- Integration testing with Riot Client

Test results will be recorded as Pass or Fail.

---

## 5. Test Environment

- OS: Windows 10/11
- Python version installed
- Riot Client installed
- Riot Autologger application running locally
- Valid Riot account credentials available

---

## 6. Entry Criteria

- Application launches successfully
- Riot Client is installed
- Test accounts available

---

## 7. Exit Criteria

- All planned test cases executed
- All identified defects documented
- Test results recorded