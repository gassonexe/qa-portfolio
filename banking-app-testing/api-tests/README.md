# ParaBank API Tests (Postman + Newman)

API tests for the [ParaBank](https://parabank.parasoft.com/parabank/index.htm) REST API, written as a Postman collection and run with Newman locally and in GitHub Actions.

They extend the [manual ParaBank testing](../test-plan.md) to the API layer: the same features, checked without the UI.

## What is covered

| Folder | Tests |
|---|---|
| 01 Setup and Authentication | Login with valid and wrong credentials, list the customer's accounts, open a new savings account and check it was funded |
| 02 Customer and Account Data | Customer profile, unknown account ID |
| 03 Fund Transfers | Valid transfer, negative, zero, above the balance, same account, empty and non-numeric amount, unknown account |
| 04 Bill Pay | Valid payment and negative payment |
| 05 Transaction History | List, get by ID, find by amount, date range, invalid date |

After every request that moves money, a **Check** request reads the balances again and confirms each account changed by exactly the expected amount. A transfer that returns "Successfully transferred" but moves the wrong amount still fails the run.

Each run opens its own savings account and deposits $200 first, so the tests don't depend on balances left over from earlier runs.

## Known bugs

Tests named **"BUG-PB-xxx still reproduces"** check the current, buggy behaviour. The run stays green while the bug exists and fails once it's fixed, which is the signal to update the test to the correct behaviour.

| Bug | Found or confirmed by | Severity |
|---|---|---|
| [BUG-PB-012](../bug-reports.md#bug-pb-012--rest-api-requires-no-authentication-for-customer-data-or-money-movement) No authentication on the API | API-CUS-001 | Critical |
| [BUG-PB-013](../bug-reports.md#bug-pb-013--negative-bill-payment-amount-is-accepted-and-adds-money-to-the-account) Negative bill payment adds money | API-BILL-002 | Critical |
| [BUG-PB-003](../bug-reports.md#bug-pb-003--negative-transfer-amount-is-accepted-and-moves-money-in-reverse) Negative transfer moves money in reverse | API-TRF-002 | Critical |
| [BUG-PB-004](../bug-reports.md#bug-pb-004--transfer-above-the-available-balance-is-accepted-no-overdraft-check) No overdraft check | API-TRF-004 | Critical |
| BUG-PB-002 Empty amount causes a server error | API-TRF-006 | Medium |
| BUG-PB-005 $0 transfer accepted | API-TRF-003 | Low |
| BUG-PB-006 Transfer to the same account accepted | API-TRF-005 | Low |
| BUG-PB-007 Invalid date returns an empty list | API-TRX-005 | Low |
| [BUG-PB-014](../bug-reports.md#bug-pb-014--open-account-api-returns-balance-0-for-an-account-funded-with-100) Wrong balance in the open account response | API-ACC-002 | Low |

## How to run

Requirements: Node.js 20+.

```bash
cd banking-app-testing/api-tests
npm install
npm test
```

Without credentials, the login test is skipped and the run uses the `customerId` from `parabank.postman_environment.json`. ParaBank's API doesn't check credentials anyway (BUG-PB-012).

To include the login test, copy `parabank.postman_environment.json` to `local.postman_environment.json` and fill in `username` and `password` for your own ParaBank test user. That file is git-ignored. You can also set `PARABANK_USERNAME` and `PARABANK_PASSWORD` as environment variables.

### In Postman

Import `parabank.postman_collection.json` and `parabank.postman_environment.json`, select the **ParaBank** environment and run the collection with the Collection Runner. Run it in order, because later requests use the accounts created in the setup folder.

### In CI

[`.github/workflows/parabank-api-tests.yml`](../../.github/workflows/parabank-api-tests.yml) runs the collection on every push that changes this folder, and on demand. Credentials come from the `PARABANK_USERNAME` and `PARABANK_PASSWORD` repository secrets, and the customer ID from the `PARABANK_CUSTOMER_ID` repository variable.

## Notes

- ParaBank is a shared public demo. Its database is reset from time to time, which removes registered users. If the run fails at "Get customer accounts", register a new user and update the customer ID.
- ParaBank sits behind Cloudflare and answers HTTP 429 when requests come too fast, so the runner waits 400 ms between requests.
- All tests use the tester's own customer and accounts. No requests are sent to other customers' accounts.
