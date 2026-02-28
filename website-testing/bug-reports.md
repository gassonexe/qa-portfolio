# Bug Reports – SauceDemo Test Execution

Environment:
- Browser: Google Chrome (latest)
- OS: Windows 10/11
- URL: https://www.saucedemo.com
- User: standard_user / secret_sauce

---

## BUG-SD-001 – Product Buttons Not Reset After "Reset App State"

**Severity:** Medium  
**Priority:** P2  
**Module:** Menu / Cart State  

### Steps to Reproduce:
1. Login as `standard_user`
2. Add one or more products to cart
3. Open the menu (☰)
4. Click "Reset App State"
5. Observe product buttons on Inventory page

### Actual Result:
- Cart badge resets to 0
- However, product buttons still display "Remove"
- This creates an inconsistent UI state because the cart is empty

### Expected Result:
- Cart badge should reset to 0
- All product buttons should revert to "Add to cart"
- UI state should fully reflect empty cart
