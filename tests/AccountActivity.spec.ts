import { test } from "@playwright/test";
import { AccountActivityPage } from "../pages/AccountActivityPage";

test("Display of Account Details and All Transactions", async ({ page }) => {
  const displayOfAccountDetailsAndAllTransactionsPage = new AccountActivityPage(page);
  await displayOfAccountDetailsAndAllTransactionsPage.goto();
  await displayOfAccountDetailsAndAllTransactionsPage.displayOfAccountDetailsAndAllTransactions();
});

test("Filter Transactions by Type - Credit", async ({ page }) => {
  const filterTransactionsByTypeCreditPage = new AccountActivityPage(page);
  await filterTransactionsByTypeCreditPage.goto();
  await filterTransactionsByTypeCreditPage.filterTransactionsByTypeCredit();
});

test("Filter Transactions by Type - Debit", async ({ page }) => {
  const filterTransactionsByTypeDebitPage = new AccountActivityPage(page);
  await filterTransactionsByTypeDebitPage.goto();
  await filterTransactionsByTypeDebitPage.filterTransactionsByTypeDebit();
});

test("Filter Transactions by Date Range (From/To Month and Year)", async ({ page }) => {
  const filterTransactionsByDateRangeFromToMonthAndYearPage = new AccountActivityPage(page);
  await filterTransactionsByDateRangeFromToMonthAndYearPage.goto();
  await filterTransactionsByDateRangeFromToMonthAndYearPage.filterTransactionsByDateRangeFromToMonthAndYear();
});

test("Filter Transactions by Date Range with No Transactions", async ({ page }) => {
  const filterTransactionsByDateRangeWithNoTransactionsPage = new AccountActivityPage(page);
  await filterTransactionsByDateRangeWithNoTransactionsPage.goto();
  await filterTransactionsByDateRangeWithNoTransactionsPage.filterTransactionsByDateRangeWithNoTransactions();
});

test("Combined Filtering by Type and Date Range", async ({ page }) => {
  const combinedFilteringByTypeAndDateRangePage = new AccountActivityPage(page);
  await combinedFilteringByTypeAndDateRangePage.goto();
  await combinedFilteringByTypeAndDateRangePage.combinedFilteringByTypeAndDateRange();
});

test("Account Activity for an Account with No Transactions", async ({ page }) => {
  const accountActivityForAnAccountWithNoTransactionsPage = new AccountActivityPage(page);
  await accountActivityForAnAccountWithNoTransactionsPage.goto();
  await accountActivityForAnAccountWithNoTransactionsPage.accountActivityForAnAccountWithNoTransactions();
});