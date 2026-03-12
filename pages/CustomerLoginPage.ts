import { Page, Locator, expect } from '@playwright/test';

export class CustomerLoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginErrorMessage: Locator; // For "The username and password could not be verified."
    readonly usernameEmptyErrorMessage: Locator; // For "Please enter a username."
    readonly passwordEmptyErrorMessage: Locator; // For "Please enter a password."
    readonly forgotLoginInfoLink: Locator;
    readonly accountOverviewPageTitle: Locator; // For verification after successful login
    readonly lookUpCustomerPageTitle: Locator; // For verification after clicking forgot login info

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('input[value="Log In"]');
        this.loginErrorMessage = page.locator('p.error'); // This locator applies to the general "could not be verified" error
        this.usernameEmptyErrorMessage = page.locator('span[ng-show="showUsernameError"]'); // Specific error for empty username field
        this.passwordEmptyErrorMessage = page.locator('span[ng-show="showPasswordError"]'); // Specific error for empty password field
        this.forgotLoginInfoLink = page.locator('a:has-text("Forgot login info?")');
        this.accountOverviewPageTitle = page.locator('h1.title'); // Element common on overview page
        this.lookUpCustomerPageTitle = page.locator('h1.title'); // Element common on lookup page
    }

    /**
     * Navigates to the ParaBank home page.
     */
    async navigate(): Promise<void> {
        await this.page.goto('https://parabank.parasoft.com/parabank/index.htm');
    }

    /**
     * Enters the username into the username field.
     * @param username The username to enter.
     */
    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    /**
     * Enters the password into the password field.
     * @param password The password to enter.
     */
    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    /**
     * Clicks the Log In button.
     */
    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    /**
     * Performs a login attempt with the given credentials.
     * This method covers scenarios 1, 2, 3, 4, 5, 6 by accepting any string for username/password.
     * @param username The username to use for login.
     * @param password The password to use for login.
     */
    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    /**
     * Retrieves the text of the general login error message (e.g., "The username and password could not be verified.").
     * Applicable for scenarios 2 and 3.
     * @returns The error message text, or null if not found.
     */
    async getLoginFailureErrorMessageText(): Promise<string | null> {
        await this.loginErrorMessage.waitFor({ state: 'visible' });
        return this.loginErrorMessage.textContent();
    }

    /**
     * Retrieves the text of the username empty error message (e.g., "Please enter a username.").
     * Applicable for scenarios 4 and 6.
     * @returns The error message text, or null if not found.
     */
    async getUsernameEmptyValidationMessageText(): Promise<string | null> {
        await this.usernameEmptyErrorMessage.waitFor({ state: 'visible' });
        return this.usernameEmptyErrorMessage.textContent();
    }

    /**
     * Retrieves the text of the password empty error message (e.g., "Please enter a password.").
     * Applicable for scenarios 5 and 6.
     * @returns The error message text, or null if not found.
     */
    async getPasswordEmptyValidationMessageText(): Promise<string | null> {
        await this.passwordEmptyErrorMessage.waitFor({ state: 'visible' });
        return this.passwordEmptyErrorMessage.textContent();
    }

    /**
     * Clicks the 'Forgot login info?' link.
     * Applicable for scenario 7.
     */
    async clickForgotLoginInfoLink(): Promise<void> {
        await this.forgotLoginInfoLink.click();
        await this.page.waitForURL('**/lookup.htm'); // Wait for navigation to the lookup page
    }

    /**
     * Checks if the user is successfully logged in and on the Account Overview page.
     * Applicable for scenario 1 verification.
     * @returns True if on Account Overview page, false otherwise.
     */
    async isUserLoggedInSuccessfully(): Promise<boolean> {
        return await this.accountOverviewPageTitle.isVisible();
    }

    /**
     * Gets the title text of the Account Overview page.
     * Applicable for scenario 1 verification.
     * @returns The title text, or null if not found.
     */
    async getAccountOverviewPageTitleText(): Promise<string | null> {
        return await this.accountOverviewPageTitle.textContent();
    }

    /**
     * Checks if the user is on the 'Look Up Customer' page.
     * Applicable for scenario 7 verification.
     * @returns True if on Look Up Customer page, false otherwise.
     */
    async isOnLookUpCustomerPage(): Promise<boolean> {
        return await this.lookUpCustomerPageTitle.isVisible();
    }

    /**
     * Gets the title text of the 'Look Up Customer' page.
     * Applicable for scenario 7 verification.
     * @returns The title text, or null if not found.
     */
    async getLookUpCustomerPageTitleText(): Promise<string | null> {
        return await this.lookUpCustomerPageTitle.textContent();
    }
}