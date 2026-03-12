import { test } from "@playwright/test";
import { BillPaymentPage } from "../pages/BillPaymentPage";

test("Successful Bill Payment with Valid Details", async ({ page }) => {
  const successfulBillPaymentWithValidDetailsPage = new BillPaymentPage(page);
  await successfulBillPaymentWithValidDetailsPage.goto();
  await successfulBillPaymentWithValidDetailsPage.successfulBillPaymentWithValidDetails();
});

test("Bill Payment with Mismatched Account Numbers", async ({ page }) => {
  const billPaymentWithMismatchedAccountNumbersPage = new BillPaymentPage(page);
  await billPaymentWithMismatchedAccountNumbersPage.goto();
  await billPaymentWithMismatchedAccountNumbersPage.billPaymentWithMismatchedAccountNumbers();
});

test("Bill Payment with Empty Mandatory Fields", async ({ page }) => {
  const billPaymentWithEmptyMandatoryFieldsPage = new BillPaymentPage(page);
  await billPaymentWithEmptyMandatoryFieldsPage.goto();
  await billPaymentWithEmptyMandatoryFieldsPage.billPaymentWithEmptyMandatoryFields();
});

test("Bill Payment with Amount Exceeding From Account Balance", async ({ page }) => {
  const billPaymentWithAmountExceedingFromAccountBalancePage = new BillPaymentPage(page);
  await billPaymentWithAmountExceedingFromAccountBalancePage.goto();
  await billPaymentWithAmountExceedingFromAccountBalancePage.billPaymentWithAmountExceedingFromAccountBalance();
});

test("Bill Payment with Zero or Negative Amount", async ({ page }) => {
  const billPaymentWithZeroOrNegativeAmountPage = new BillPaymentPage(page);
  await billPaymentWithZeroOrNegativeAmountPage.goto();
  await billPaymentWithZeroOrNegativeAmountPage.billPaymentWithZeroOrNegativeAmount();
});

test("Verify 'From Account' Dropdown Displays Balances", async ({ page }) => {
  const verifyFromAccountDropdownDisplaysBalancesPage = new BillPaymentPage(page);
  await verifyFromAccountDropdownDisplaysBalancesPage.goto();
  await verifyFromAccountDropdownDisplaysBalancesPage.verifyFromAccountDropdownDisplaysBalances();
});