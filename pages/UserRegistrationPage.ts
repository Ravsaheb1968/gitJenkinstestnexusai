import { Page, Locator, expect } from '@playwright/test';

interface UserData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  ssn: string;
  username: string;
  password: string;
  confirmPassword?: string; // Optional for scenarios where it might differ
}

export class UserRegistrationPage {
  readonly page: Page;

  // --- Locators for User Registration ---
  readonly registerLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;

  // --- Locators for Error Messages ---
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly addressError: Locator;
  readonly cityError: Locator;
  readonly stateError: Locator;
  readonly zipCodeError: Locator;
  readonly ssnError: Locator;
  readonly usernameError: Locator;
  readonly passwordError: Locator;
  readonly confirmPasswordError: Locator; // For password mismatch specifically

  // --- Locators for Success/Navigation Verification ---
  readonly registrationSuccessHeader: Locator; // e.g., "Welcome <Username>"
  readonly accountsOverviewHeader: Locator;     // e.g., "Accounts Overview"
  readonly signUpFormHeader: Locator;           // e.g., "Signing up is easy!"

  constructor(page: Page) {
    this.page = page;

    // Initialize Locators
    this.registerLink = page.getByRole('link', { name: 'Register' });

    this.firstNameInput = page.locator('input[name="customer.firstName"]');
    this.lastNameInput = page.locator('input[name="customer.lastName"]');
    this.addressInput = page.locator('input[name="customer.address.street"]');
    this.cityInput = page.locator('input[name="customer.address.city"]');
    this.stateInput = page.locator('input[name="customer.address.state"]');
    this.zipCodeInput = page.locator('input[name="customer.address.zipCode"]');
    this.phoneInput = page.locator('input[name="customer.phoneNumber"]');
    this.ssnInput = page.locator('input[name="customer.ssn"]');
    this.usernameInput = page.locator('input[name="customer.username"]');
    this.passwordInput = page.locator('input[name="customer.password"]');
    this.confirmPasswordInput = page.locator('input[name="repeatedPassword"]');
    this.registerButton = page.locator('input[value="Register"]');

    // Error Message Locators (inline validation below fields)
    this.firstNameError = page.locator('#customer\\.firstName\\.errors');
    this.lastNameError = page.locator('#customer\\.lastName\\.errors');
    this.addressError = page.locator('#customer\\.address\\.street\\.errors');
    this.cityError = page.locator('#customer\\.address\\.city\\.errors');
    this.stateError = page.locator('#customer\\.address\\.state\\.errors');
    this.zipCodeError = page.locator('#customer\\.address\\.zipCode\\.errors');
    this.ssnError = page.locator('#customer\\.ssn\\.errors');
    this.usernameError = page.locator('#customer\\.username\\.errors');
    this.passwordError = page.locator('#customer\\.password\\.errors');
    this.confirmPasswordError = page.locator('#repeatedPassword\\.errors'); // Catches mismatch and empty confirm

    // Success/Navigation Locators
    this.registrationSuccessHeader = page.locator('#rightPanel h1.title');
    this.accountsOverviewHeader = page.locator('#accountOverview h1.title'); // After successful login
    this.signUpFormHeader = page.locator('#rightPanel h1.title'); // "Signing up is easy!" on registration page
  }

  // --- Common Action Methods ---

  async navigateToRegistrationPage(): Promise<void> {
    await this.registerLink.click();
    await expect(this.signUpFormHeader).toHaveText('Signing up is easy!');
  }

  async fillRegistrationForm(userData: UserData): Promise<void> {
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.addressInput.fill(userData.address);
    await this.cityInput.fill(userData.city);
    await this.stateInput.fill(userData.state);
    await this.zipCodeInput.fill(userData.zipCode);
    await this.phoneInput.fill(userData.phone);
    await this.ssnInput.fill(userData.ssn);
    await this.usernameInput.fill(userData.username);
    await this.passwordInput.fill(userData.password);
    await this.confirmPasswordInput.fill(userData.confirmPassword || userData.password); // Use password if confirmPassword not provided
  }

  async clickRegisterButton(): Promise<void> {
    await this.registerButton.click();
  }

  // --- Scenario-Specific Action Methods ---

  // Scenario 1 & 6: Successful User Registration (with/without special characters)
  async registerSuccessfulUser(userData: UserData): Promise<void> {
    await this.navigateToRegistrationPage();
    await this.fillRegistrationForm(userData);
    await this.clickRegisterButton();
    await expect(this.registrationSuccessHeader).toHaveText(`Welcome ${userData.username}`);
    await expect(this.accountsOverviewHeader).toHaveText('Accounts Overview');
    await expect(this.page).toHaveURL(/overview\.htm/);
  }

  // Scenario 2: User Registration with an Already Taken Username
  async registerUserWithExistingUsername(userData: UserData): Promise<void> {
    await this.navigateToRegistrationPage();
    await this.fillRegistrationForm(userData);
    await this.clickRegisterButton();
    await expect(this.usernameError).toBeVisible();
    await expect(this.usernameError).toHaveText('This username already exists.');
    await expect(this.page).toHaveURL(/register\.htm/); // Should remain on registration page
  }

  // Scenario 3: User Registration with Mismatched Passwords
  async registerUserWithMismatchedPasswords(userData: UserData, confirmPasswordValue: string): Promise<void> {
    await this.navigateToRegistrationPage();
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.addressInput.fill(userData.address);
    await this.cityInput.fill(userData.city);
    await this.stateInput.fill(userData.state);
    await this.zipCodeInput.fill(userData.zipCode);
    await this.phoneInput.fill(userData.phone);
    await this.ssnInput.fill(userData.ssn);
    await this.usernameInput.fill(userData.username);
    await this.passwordInput.fill(userData.password);
    await this.confirmPasswordInput.fill(confirmPasswordValue); // Mismatched password

    await this.clickRegisterButton();
    await expect(this.confirmPasswordError).toBeVisible();
    await expect(this.confirmPasswordError).toHaveText('Passwords do not match.');
    await expect(this.page).toHaveURL(/register\.htm/);
  }

  // Scenario 4: User Registration with Empty Mandatory Fields
  async registerUserWithEmptyFields(userData: Partial<UserData>, expectedErrorMessages: { field: Locator; message: string }[]): Promise<void> {
    await this.navigateToRegistrationPage();

    // Fill only provided fields, leaving others empty
    if (userData.firstName !== undefined) await this.firstNameInput.fill(userData.firstName);
    if (userData.lastName !== undefined) await this.lastNameInput.fill(userData.lastName);
    if (userData.address !== undefined) await this.addressInput.fill(userData.address);
    if (userData.city !== undefined) await this.cityInput.fill(userData.city);
    if (userData.state !== undefined) await this.stateInput.fill(userData.state);
    if (userData.zipCode !== undefined) await this.zipCodeInput.fill(userData.zipCode);
    if (userData.phone !== undefined) await this.phoneInput.fill(userData.phone);
    if (userData.ssn !== undefined) await this.ssnInput.fill(userData.ssn);
    if (userData.username !== undefined) await this.usernameInput.fill(userData.username);
    if (userData.password !== undefined) await this.passwordInput.fill(userData.password);
    // Use userData.password for confirmPassword if not specified, otherwise leave empty if password is empty
    if (userData.confirmPassword !== undefined) {
        await this.confirmPasswordInput.fill(userData.confirmPassword);
    } else if (userData.password !== undefined) {
        await this.confirmPasswordInput.fill(userData.password);
    }

    await this.clickRegisterButton();

    for (const error of expectedErrorMessages) {
      await expect(error.field).toBeVisible();
      await expect(error.field).toHaveText(error.message);
    }
    await expect(this.page).toHaveURL(/register\.htm/);
  }

  // Scenario 5: Navigation to User Registration Page
  async assertNavigationToRegistrationPage(): Promise<void> {
    await this.navigateToRegistrationPage(); // This method already includes assertion for header
    await expect(this.page).toHaveURL(/register\.htm/);
  }

  // Helper to get specific error locators for scenario 4
  getFieldErrorLocator(fieldName: keyof UserData): Locator {
    switch (fieldName) {
      case 'firstName': return this.firstNameError;
      case 'lastName': return this.lastNameError;
      case 'address': return this.addressError;
      case 'city': return this.cityError;
      case 'state': return this.stateError;
      case 'zipCode': return this.zipCodeError;
      case 'ssn': return this.ssnError;
      case 'username': return this.usernameError;
      case 'password': return this.passwordError;
      // confirmPassword is usually covered by passwordError or confirmPasswordError for mismatch
      default: throw new Error(`No specific error locator found for field: ${fieldName}`);
    }
  }
}