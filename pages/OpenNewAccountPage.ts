import { Page } from "@playwright/test";

export class OpenNewAccountPage {
  constructor(private readonly page: Page) {}

  readonly moduleRoot = this.page.getByRole("main");

  async goto(): Promise<void> {
    await this.page.goto("https://parabank.parasoft.com/parabank/index.htm");
  }

  async openNewCheckingAccountWithExistingSourceAccount(): Promise<void> {
    // Scenario: Open New Checking Account with Existing Source Account
    await this.page.getByRole("main").click();
  }

  async openNewSavingsAccountWithExistingSourceAccount(): Promise<void> {
    // Scenario: Open New Savings Account with Existing Source Account
    await this.page.getByRole("main").click();
  }

  async attemptToOpenNewAccountWithoutSelectingAccountType(): Promise<void> {
    // Scenario: Attempt to Open New Account without Selecting Account Type
    await this.page.getByRole("main").click();
  }

  async attemptToOpenNewAccountWithoutSelectingSourceAccount(): Promise<void> {
    // Scenario: Attempt to Open New Account without Selecting Source Account
    await this.page.getByRole("main").click();
  }

  async verifyNewAccountBalanceAndSourceAccountDebit(): Promise<void> {
    // Scenario: Verify New Account Balance and Source Account Debit
    await this.page.getByRole("main").click();
  }

  async openNewAccountWhenOnlyOneSourceAccountIsAvailable(): Promise<void> {
    // Scenario: Open New Account when Only One Source Account is Available
    await this.page.getByRole("main").click();
  }
}