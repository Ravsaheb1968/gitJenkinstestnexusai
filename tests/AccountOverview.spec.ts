import { test } from "@playwright/test";
import { AccountOverviewPage } from "../pages/AccountOverviewPage";

test("Display of All User Accounts and Balances", async ({ page }) => {
  const displayOfAllUserAccountsAndBalancesPage = new AccountOverviewPage(page);
  await displayOfAllUserAccountsAndBalancesPage.goto();
  await displayOfAllUserAccountsAndBalancesPage.displayOfAllUserAccountsAndBalances();
});

test("Display of Total Balance", async ({ page }) => {
  const displayOfTotalBalancePage = new AccountOverviewPage(page);
  await displayOfTotalBalancePage.goto();
  await displayOfTotalBalancePage.displayOfTotalBalance();
});

test("Navigation to Account Activity from Account Number Click", async ({ page }) => {
  const navigationToAccountActivityFromAccountNumberClickPage = new AccountOverviewPage(page);
  await navigationToAccountActivityFromAccountNumberClickPage.goto();
  await navigationToAccountActivityFromAccountNumberClickPage.navigationToAccountActivityFromAccountNumberClick();
});

test("Unauthorized Access to Account Overview Page", async ({ page }) => {
  const unauthorizedAccessToAccountOverviewPagePage = new AccountOverviewPage(page);
  await unauthorizedAccessToAccountOverviewPagePage.goto();
  await unauthorizedAccessToAccountOverviewPagePage.unauthorizedAccessToAccountOverviewPage();
});

test("Account Overview for User with a Single Account", async ({ page }) => {
  const accountOverviewForUserWithASingleAccountPage = new AccountOverviewPage(page);
  await accountOverviewForUserWithASingleAccountPage.goto();
  await accountOverviewForUserWithASingleAccountPage.accountOverviewForUserWithASingleAccount();
});