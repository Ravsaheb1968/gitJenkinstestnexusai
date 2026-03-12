import { Page } from "@playwright/test";

export class AccountOverviewPage {
  constructor(private readonly page: Page) {}

  readonly moduleRoot = this.page.getByRole("main");

  async goto(): Promise<void> {
    await this.page.goto("https://parabank.parasoft.com/parabank/index.htm");
  }

  async displayOfAllUserAccountsAndBalances(): Promise<void> {
    // Scenario: Display of All User Accounts and Balances
    await this.page.getByRole("main").click();
  }

  async displayOfTotalBalance(): Promise<void> {
    // Scenario: Display of Total Balance
    await this.page.getByRole("main").click();
  }

  async navigationToAccountActivityFromAccountNumberClick(): Promise<void> {
    // Scenario: Navigation to Account Activity from Account Number Click
    await this.page.getByRole("main").click();
  }

  async unauthorizedAccessToAccountOverviewPage(): Promise<void> {
    // Scenario: Unauthorized Access to Account Overview Page
    await this.page.getByRole("main").click();
  }

  async accountOverviewForUserWithASingleAccount(): Promise<void> {
    // Scenario: Account Overview for User with a Single Account
    await this.page.getByRole("main").click();
  }
}