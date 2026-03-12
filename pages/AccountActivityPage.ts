import { Page } from "@playwright/test";

export class AccountActivityPage {
  constructor(private readonly page: Page) {}

  readonly moduleRoot = this.page.getByRole("main");

  async goto(): Promise<void> {
    await this.page.goto("https://parabank.parasoft.com/parabank/index.htm");
  }

  async displayOfAccountDetailsAndAllTransactions(): Promise<void> {
    // Scenario: Display of Account Details and All Transactions
    await this.page.getByRole("main").click();
  }

  async filterTransactionsByTypeCredit(): Promise<void> {
    // Scenario: Filter Transactions by Type - Credit
    await this.page.getByRole("main").click();
  }

  async filterTransactionsByTypeDebit(): Promise<void> {
    // Scenario: Filter Transactions by Type - Debit
    await this.page.getByRole("main").click();
  }

  async filterTransactionsByDateRangeFromToMonthAndYear(): Promise<void> {
    // Scenario: Filter Transactions by Date Range (From/To Month and Year)
    await this.page.getByRole("main").click();
  }

  async filterTransactionsByDateRangeWithNoTransactions(): Promise<void> {
    // Scenario: Filter Transactions by Date Range with No Transactions
    await this.page.getByRole("main").click();
  }

  async combinedFilteringByTypeAndDateRange(): Promise<void> {
    // Scenario: Combined Filtering by Type and Date Range
    await this.page.getByRole("main").click();
  }

  async accountActivityForAnAccountWithNoTransactions(): Promise<void> {
    // Scenario: Account Activity for an Account with No Transactions
    await this.page.getByRole("main").click();
  }
}