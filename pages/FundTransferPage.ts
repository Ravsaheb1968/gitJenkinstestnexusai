import { Page } from "@playwright/test";

export class FundTransferPage {
  constructor(private readonly page: Page) {}

  readonly moduleRoot = this.page.getByRole("main");

  async goto(): Promise<void> {
    await this.page.goto("https://parabank.parasoft.com/parabank/index.htm");
  }

  async successfulFundTransferBetweenTwoDifferentAccounts(): Promise<void> {
    // Scenario: Successful Fund Transfer Between Two Different Accounts
    await this.page.getByRole("main").click();
  }

  async fundTransferExceedingSourceAccountBalance(): Promise<void> {
    // Scenario: Fund Transfer Exceeding Source Account Balance
    await this.page.getByRole("main").click();
  }

  async fundTransferWithZeroAmount(): Promise<void> {
    // Scenario: Fund Transfer with Zero Amount
    await this.page.getByRole("main").click();
  }

  async fundTransferWithNegativeAmount(): Promise<void> {
    // Scenario: Fund Transfer with Negative Amount
    await this.page.getByRole("main").click();
  }

  async fundTransferWithEmptyAmountField(): Promise<void> {
    // Scenario: Fund Transfer with Empty Amount Field
    await this.page.getByRole("main").click();
  }

  async verifyAccountDropdownsDisplayBalances(): Promise<void> {
    // Scenario: Verify Account Dropdowns Display Balances
    await this.page.getByRole("main").click();
  }

  async attemptToTransferFundsToTheSameAccount(): Promise<void> {
    // Scenario: Attempt to Transfer Funds to the Same Account
    await this.page.getByRole("main").click();
  }
}