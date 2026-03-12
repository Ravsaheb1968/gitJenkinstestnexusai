import { test } from "@playwright/test";
import { OpenNewAccountPage } from "../pages/OpenNewAccountPage";

test("Open New Checking Account with Existing Source Account", async ({ page }) => {
  const openNewCheckingAccountWithExistingSourceAccountPage = new OpenNewAccountPage(page);
  await openNewCheckingAccountWithExistingSourceAccountPage.goto();
  await openNewCheckingAccountWithExistingSourceAccountPage.openNewCheckingAccountWithExistingSourceAccount();
});

test("Open New Savings Account with Existing Source Account", async ({ page }) => {
  const openNewSavingsAccountWithExistingSourceAccountPage = new OpenNewAccountPage(page);
  await openNewSavingsAccountWithExistingSourceAccountPage.goto();
  await openNewSavingsAccountWithExistingSourceAccountPage.openNewSavingsAccountWithExistingSourceAccount();
});

test("Attempt to Open New Account without Selecting Account Type", async ({ page }) => {
  const attemptToOpenNewAccountWithoutSelectingAccountTypePage = new OpenNewAccountPage(page);
  await attemptToOpenNewAccountWithoutSelectingAccountTypePage.goto();
  await attemptToOpenNewAccountWithoutSelectingAccountTypePage.attemptToOpenNewAccountWithoutSelectingAccountType();
});

test("Attempt to Open New Account without Selecting Source Account", async ({ page }) => {
  const attemptToOpenNewAccountWithoutSelectingSourceAccountPage = new OpenNewAccountPage(page);
  await attemptToOpenNewAccountWithoutSelectingSourceAccountPage.goto();
  await attemptToOpenNewAccountWithoutSelectingSourceAccountPage.attemptToOpenNewAccountWithoutSelectingSourceAccount();
});

test("Verify New Account Balance and Source Account Debit", async ({ page }) => {
  const verifyNewAccountBalanceAndSourceAccountDebitPage = new OpenNewAccountPage(page);
  await verifyNewAccountBalanceAndSourceAccountDebitPage.goto();
  await verifyNewAccountBalanceAndSourceAccountDebitPage.verifyNewAccountBalanceAndSourceAccountDebit();
});

test("Open New Account when Only One Source Account is Available", async ({ page }) => {
  const openNewAccountWhenOnlyOneSourceAccountIsAvailablePage = new OpenNewAccountPage(page);
  await openNewAccountWhenOnlyOneSourceAccountIsAvailablePage.goto();
  await openNewAccountWhenOnlyOneSourceAccountIsAvailablePage.openNewAccountWhenOnlyOneSourceAccountIsAvailable();
});