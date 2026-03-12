import { test } from "@playwright/test";
import { FundTransferPage } from "../pages/FundTransferPage";

test("Successful Fund Transfer Between Two Different Accounts", async ({ page }) => {
  const successfulFundTransferBetweenTwoDifferentAccountsPage = new FundTransferPage(page);
  await successfulFundTransferBetweenTwoDifferentAccountsPage.goto();
  await successfulFundTransferBetweenTwoDifferentAccountsPage.successfulFundTransferBetweenTwoDifferentAccounts();
});

test("Fund Transfer Exceeding Source Account Balance", async ({ page }) => {
  const fundTransferExceedingSourceAccountBalancePage = new FundTransferPage(page);
  await fundTransferExceedingSourceAccountBalancePage.goto();
  await fundTransferExceedingSourceAccountBalancePage.fundTransferExceedingSourceAccountBalance();
});

test("Fund Transfer with Zero Amount", async ({ page }) => {
  const fundTransferWithZeroAmountPage = new FundTransferPage(page);
  await fundTransferWithZeroAmountPage.goto();
  await fundTransferWithZeroAmountPage.fundTransferWithZeroAmount();
});

test("Fund Transfer with Negative Amount", async ({ page }) => {
  const fundTransferWithNegativeAmountPage = new FundTransferPage(page);
  await fundTransferWithNegativeAmountPage.goto();
  await fundTransferWithNegativeAmountPage.fundTransferWithNegativeAmount();
});

test("Fund Transfer with Empty Amount Field", async ({ page }) => {
  const fundTransferWithEmptyAmountFieldPage = new FundTransferPage(page);
  await fundTransferWithEmptyAmountFieldPage.goto();
  await fundTransferWithEmptyAmountFieldPage.fundTransferWithEmptyAmountField();
});

test("Verify Account Dropdowns Display Balances", async ({ page }) => {
  const verifyAccountDropdownsDisplayBalancesPage = new FundTransferPage(page);
  await verifyAccountDropdownsDisplayBalancesPage.goto();
  await verifyAccountDropdownsDisplayBalancesPage.verifyAccountDropdownsDisplayBalances();
});

test("Attempt to Transfer Funds to the Same Account", async ({ page }) => {
  const attemptToTransferFundsToTheSameAccountPage = new FundTransferPage(page);
  await attemptToTransferFundsToTheSameAccountPage.goto();
  await attemptToTransferFundsToTheSameAccountPage.attemptToTransferFundsToTheSameAccount();
});