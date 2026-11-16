# QA Portfolio & Testing Hub

Welcome to my QA Portfolio! This repository showcases my practical testing workflows, spanning both rigorous **manual testing methodologies** and modern **test automation frameworks**. Here, you'll find structured test documentation, bug reports, and automated test execution scripts across various web applications and software utilities.

## Core Testing Skills

* **Test Strategy & Planning:** Test Plan creation, requirement analysis, and scope definition.
* **Test Design:** Comprehensive test case authoring covering functional, boundary, negative, and exploratory scenarios.
* **Defect Lifecycle Management:** Detailed Jira-style bug reporting, tracking, and end-to-end retesting through GitHub.
* **Test Automation:** Developing and maintaining automated test suites using **Python**, **JavaScript/TypeScript**, **Playwright**, and **Selenium**, alongside execution log analysis for debugging test failures.
* **API Testing & CI:** Validating REST API responses, mocking API failures, and running test suites in **GitHub Actions**.
* **Software Fundamentals:** Solid grounding in the SDLC and STLC.

---

## Repository Structure

### `yettel-webshop-playwright/` ⭐ Featured
UI and API test automation for the live [Yettel Serbia webshop](https://www.yettel.rs/webshop/sr/), built with **Playwright** and **TypeScript** using the Page Object Model. [Project README →](yettel-webshop-playwright/README.md)
* **Purchase Flow Coverage:** 14 automated tests covering catalog filters and sorting, product configuration (colour, tariff pricing) and adding the selected bundle to the cart.
* **API Testing:** Validates the catalog API response, cross-checks API data against the rendered page, and tests failure handling by mocking a 500 response.
* **Bug Found in Production:** [BUG-001](yettel-webshop-playwright/README.md#bug-001-catalog-api-failure-is-shown-as-no-devices-match-your-filters): when the catalog API fails, users see "0 devices" and are told to change their installment count instead of seeing an error.
* **Safe Testing on a Live Site:** A network guard blocks every order request in the browser, so no real order is ever created.
* **CI:** Smoke and API tests run in GitHub Actions on every push to the project, with the HTML report uploaded when a run fails.

### `banking-app-testing/`
Manual testing of [ParaBank](https://parabank.parasoft.com/parabank/index.htm), a demo online banking web application, on desktop and on mobile and tablet screen sizes.
* **Coverage:** 32 test cases for registration, login and logout, password recovery, accounts, fund transfers, bill pay and transaction history.
* **Defects Found:** 8 bug reports, including two critical fund transfer bugs: negative amounts move money in reverse, and transfers above the balance are accepted.
* **Responsive Testing:** Layout checked at 375px, 768px and desktop widths using Chrome DevTools device emulation.

### `website-testing/`
Contains comprehensive manual and functional testing documentation for sample web applications, focusing on core web features:
* **Authentication & Authorization:** Login forms, session management, and security edge cases.
* **Data Input & Validation:** Complex form validation, positive/negative test inputs, and error handling.
* **Navigation & Usability:** End-to-end user journeys, workflow validation, and UI responsiveness.

### `riot-autologger-testing/`
Houses documentation and automated testing suites for **Riot Autologger**—a custom desktop utility designed to automate application authentication and login sequences. This section highlights:
* **Automated Test Execution:** Automated scripts validating login sequences, authentication tokens, and telemetry tracking.
* **Structured Test Artifacts:** Dedicated test plans, edge-case test matrices, and execution logs tracking test stability and diagnostics.

---

## Continuous Improvement
More projects and automated regression suites will be added here as I continue expanding my technical stack and advancing my career as a QA Engineer.
