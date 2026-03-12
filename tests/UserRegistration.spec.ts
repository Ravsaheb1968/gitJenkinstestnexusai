import { test, expect, Page } from '@playwright/test';
import { UserRegistrationPage } from '../pages/UserRegistrationPage'; // Assuming POM is in 'pages' directory

/**
 * Helper function to generate unique user data for registration.
 * Ensures tests can run repeatedly without conflicting with existing data.
 */
function generateUniqueData(prefix: string = 'TestUser') {
    const timestamp = Date.now();
    const uniqueId = Math.random().toString(36).substring(2, 8); // A short, random string
    return {
        firstName: `${prefix}${uniqueId}`,
        lastName: `Lastname${timestamp}`,
        address: `${timestamp} Main St`,
        city: `Anytown${timestamp}`,
        state: `CA`,
        zipCode: `90210`,
        phoneNumber: `555-${String(timestamp).slice(-3)}-${String(timestamp).slice(-4, -1)}`, // E.g., 555-123-456
        ssn: `123-45-${String(timestamp).slice(-4)}`, // E.g., 123-45-6789
        username: `user_${uniqueId}_${timestamp}`,
        password: `Password${timestamp}!`,
    };
}

test.describe('User Registration Module', () => {
    let userRegistrationPage: UserRegistrationPage;
    const baseURL = 'https://parabank.parasoft.com/parabank/index.htm';

    test.beforeEach(async ({ page }) => {
        userRegistrationPage = new UserRegistrationPage(page);
        // Navigate to the ParaBank home page before each test
        await page.goto(baseURL);
    });

    test('1. Successful User Registration with Valid Unique Data', async ({ page }) => {
        const uniqueData = generateUniqueData();

        await userRegistrationPage.clickRegisterLink();
        await userRegistrationPage.fillFirstName(uniqueData.firstName);
        await userRegistrationPage.fillLastName(uniqueData.lastName);
        await userRegistrationPage.fillAddress(uniqueData.address);
        await userRegistrationPage.fillCity(uniqueData.city);
        await userRegistrationPage.fillState(uniqueData.state);
        await userRegistrationPage.fillZipCode(uniqueData.zipCode);
        await userRegistrationPage.fillPhoneNumber(uniqueData.phoneNumber);
        await userRegistrationPage.fillSSN(uniqueData.ssn);
        await userRegistrationPage.fillUsername(uniqueData.username);
        await userRegistrationPage.fillPassword(uniqueData.password);
        await userRegistrationPage.fillConfirmPassword(uniqueData.password);
        await userRegistrationPage.clickRegisterButton();

        // Expected: User is successfully registered, automatically logged in, and redirected to the Account Overview page.
        await expect(page).toHaveURL(/.*overview\.htm/);
        await expect(page.locator('#leftPanel .title')).toHaveText('Accounts Overview');
        await expect(page.locator('.smallText')).toContainText(`Welcome ${uniqueData.firstName}`);
    });

    test('2. User Registration with an Already Taken Username', async ({ page }) => {
        const uniqueData = generateUniqueData();
        const existingUsername = 'john'; // A known existing username for ParaBank testing

        await userRegistrationPage.clickRegisterLink();
        await userRegistrationPage.fillFirstName(uniqueData.firstName);
        await userRegistrationPage.fillLastName(uniqueData.lastName);
        await userRegistrationPage.fillAddress(uniqueData.address);
        await userRegistrationPage.fillCity(uniqueData.city);
        await userRegistrationPage.fillState(uniqueData.state);
        await userRegistrationPage.fillZipCode(uniqueData.zipCode);
        await userRegistrationPage.fillPhoneNumber(uniqueData.phoneNumber);
        await userRegistrationPage.fillSSN(uniqueData.ssn);
        await userRegistrationPage.fillUsername(existingUsername); // Use the already taken username
        await userRegistrationPage.fillPassword(uniqueData.password);
        await userRegistrationPage.fillConfirmPassword(uniqueData.password);
        await userRegistrationPage.clickRegisterButton();

        // Expected: An error message indicating that the username is already taken is displayed.
        await expect(userRegistrationPage.getErrorMessageLocator()).toBeVisible();
        await expect(userRegistrationPage.getErrorMessageLocator()).toHaveText('This username already exists.');
    });

    test('3. User Registration with Mismatched Passwords', async ({ page }) => {
        const uniqueData = generateUniqueData();

        await userRegistrationPage.clickRegisterLink();
        await userRegistrationPage.fillFirstName(uniqueData.firstName);
        await userRegistrationPage.fillLastName(uniqueData.lastName);
        await userRegistrationPage.fillAddress(uniqueData.address);
        await userRegistrationPage.fillCity(uniqueData.city);
        await userRegistrationPage.fillState(uniqueData.state);
        await userRegistrationPage.fillZipCode(uniqueData.zipCode);
        await userRegistrationPage.fillPhoneNumber(uniqueData.phoneNumber);
        await userRegistrationPage.fillSSN(uniqueData.ssn);
        await userRegistrationPage.fillUsername(uniqueData.username);
        await userRegistrationPage.fillPassword('Password123');
        await userRegistrationPage.fillConfirmPassword('DifferentPassword'); // Mismatched password
        await userRegistrationPage.clickRegisterButton();

        // Expected: An inline validation error message indicating that the passwords do not match is displayed.
        await expect(userRegistrationPage.getPasswordMismatchErrorLocator()).toBeVisible();
        await expect(userRegistrationPage.getPasswordMismatchErrorLocator()).toHaveText('Passwords did not match.');
    });

    test('4. User Registration with Empty Mandatory Fields', async ({ page }) => {
        await userRegistrationPage.clickRegisterLink();
        // Do not fill any fields, directly click register

        await userRegistrationPage.clickRegisterButton();

        // Expected: Inline validation error messages are displayed for all empty mandatory fields.
        await expect(userRegistrationPage.getFirstNameErrorLocator()).toBeVisible();
        await expect(userRegistrationPage.getFirstNameErrorLocator()).toHaveText('First name is required.');
        await expect(userRegistrationPage.getLastNameErrorLocator()).toBeVisible();
        await expect(userRegistrationPage.getLastNameErrorLocator()).toHaveText('Last name is required.');
        await expect(userRegistrationPage.getAddressErrorLocator()).toBeVisible();
        await expect(userRegistrationPage.getAddressErrorLocator()).toHaveText('Address is required.');
        await expect(userRegistrationPage.getCityErrorLocator()).toBeVisible();
        await expect(userRegistrationPage.getCityErrorLocator()).toHaveText('City is required.');
        await expect(userRegistrationPage.getPage().locator('#customer\\.address\\.state\\.errors')).toBeVisible(); // Specific state error locator for ParaBank
        await expect(userRegistrationPage.getPage().locator('#customer\\.address\\.state\\.errors')).toHaveText('State is required.');
        await expect(userRegistrationPage.getZipCodeErrorLocator()).toBeVisible();
        await expect(userRegistrationPage.getZipCodeErrorLocator()).toHaveText('Zip Code is required.');
        await expect(userRegistrationPage.getSSNErrorLocator()).toBeVisible();
        await expect(userRegistrationPage.getSSNErrorLocator()).toHaveText('Social Security Number is required.');
        await expect(userRegistrationPage.getUsernameErrorLocator()).toBeVisible();
        await expect(userRegistrationPage.getUsernameErrorLocator()).toHaveText('Username is required.');
        await expect(userRegistrationPage.getPasswordErrorLocator()).toBeVisible();
        await expect(userRegistrationPage.getPasswordErrorLocator()).toHaveText('Password is required.');
        await expect(userRegistrationPage.getConfirmPasswordErrorLocator()).toBeVisible();
        await expect(userRegistrationPage.getConfirmPasswordErrorLocator()).toHaveText('Password Confirmation is required.');
    });

    test('5. Navigation to User Registration Page', async ({ page }) => {
        // Steps: Navigate to the ParaBank home page (handled by beforeEach).
        // Click the 'Register' link on the left navigation panel.
        await userRegistrationPage.clickRegisterLink();

        // Expected: The user is successfully navigated to the 'Sign Up' (User Registration) form.
        await expect(page).toHaveURL(/.*register\.htm/);
        await expect(userRegistrationPage.getPageTitleLocator()).toHaveText('Signing up is easy!');
    });

    test('6. User Registration with Special Characters in Username/Password', async ({ page }) => {
        const uniqueData = generateUniqueData('SpecialUser');
        const usernameWithSpecialChars = `special_user!@#_${Math.random().toString(36).substring(2, 7)}`;
        const passwordWithSpecialChars = `Pass!@#\$%^&${Math.random().toString(36).substring(2, 7)}`;

        await userRegistrationPage.clickRegisterLink();
        await userRegistrationPage.fillFirstName(uniqueData.firstName);
        await userRegistrationPage.fillLastName(uniqueData.lastName);
        await userRegistrationPage.fillAddress(uniqueData.address);
        await userRegistrationPage.fillCity(uniqueData.city);
        await userRegistrationPage.fillState(uniqueData.state);
        await userRegistrationPage.fillZipCode(uniqueData.zipCode);
        await userRegistrationPage.fillPhoneNumber(uniqueData.phoneNumber);
        await userRegistrationPage.fillSSN(uniqueData.ssn);
        await userRegistrationPage.fillUsername(usernameWithSpecialChars);
        await userRegistrationPage.fillPassword(passwordWithSpecialChars);
        await userRegistrationPage.fillConfirmPassword(passwordWithSpecialChars);
        await userRegistrationPage.clickRegisterButton();

        // Expected: User is successfully registered, automatically logged in, and redirected to the Account Overview page.
        await expect(page).toHaveURL(/.*overview\.htm/);
        await expect(page.locator('#leftPanel .title')).toHaveText('Accounts Overview');
        await expect(page.locator('.smallText')).toContainText(`Welcome ${uniqueData.firstName}`);
    });
});

/**
 * UserRegistrationPage.ts - This class would typically reside in a separate file like '../pages/UserRegistrationPage.ts'
 * and contains the Page Object Model for the User Registration functionality.
 */
// import { Page, Locator } from '@playwright/test';

// export class UserRegistrationPage {
//     readonly page: Page;
//     readonly registerLink: Locator;
//     readonly pageTitle: Locator; // Title on the registration page
//     readonly firstNameInput: Locator;
//     readonly lastNameInput: Locator;
//     readonly addressInput: Locator;
//     readonly cityInput: Locator;
//     readonly stateInput: Locator;
//     readonly zipCodeInput: Locator;
//     readonly phoneNumberInput: Locator;
//     readonly ssnInput: Locator;
//     readonly usernameInput: Locator;
//     readonly passwordInput: Locator;
//     readonly confirmPasswordInput: Locator;
//     readonly registerButton: Locator;
//     readonly errorMessage: Locator; // General error message for "username already exists"
//     readonly passwordMismatchError: Locator;

//     // Individual field error locators (based on ParaBank's typical error span IDs)
//     readonly firstNameError: Locator;
//     readonly lastNameError: Locator;
//     readonly addressError: Locator;
//     readonly cityError: Locator;
//     readonly stateError: Locator;
//     readonly zipCodeError: Locator;
//     readonly ssnError: Locator;
//     readonly usernameError: Locator;
//     readonly passwordError: Locator;
//     readonly confirmPasswordError: Locator;

//     constructor(page: Page) {
//         this.page = page;
//         this.registerLink = page.locator('#leftPanel a[href="register.htm"]');
//         this.pageTitle = page.locator('#rightPanel h1.title');
//         this.firstNameInput = page.locator('input[name="customer.firstName"]');
//         this.lastNameInput = page.locator('input[name="customer.lastName"]');
//         this.addressInput = page.locator('input[name="customer.address.street"]');
//         this.cityInput = page.locator('input[name="customer.address.city"]');
//         this.stateInput = page.locator('input[name="customer.address.state"]');
//         this.zipCodeInput = page.locator('input[name="customer.address.zipCode"]');
//         this.phoneNumberInput = page.locator('input[name="customer.phoneNumber"]');
//         this.ssnInput = page.locator('input[name="customer.ssn"]');
//         this.usernameInput = page.locator('input[name="customer.username"]');
//         this.passwordInput = page.locator('input[name="customer.password"]');
//         this.confirmPasswordInput = page.locator('input[name="repeatedPassword"]');
//         this.registerButton = page.locator('input[value="Register"]');

//         this.errorMessage = page.locator('#rightPanel p.error'); // For server-side errors like "username already exists"

//         // Locators for inline validation errors (ParaBank often uses span elements with specific IDs)
//         this.firstNameError = page.locator('#customer\\.firstName\\.errors');
//         this.lastNameError = page.locator('#customer\\.lastName\\.errors');
//         this.addressError = page.locator('#customer\\.address\\.street\\.errors');
//         this.cityError = page.locator('#customer\\.address\\.city\\.errors');
//         this.stateError = page.locator('#customer\\.address\\.state\\.errors');
//         this.zipCodeError = page.locator('#customer\\.address\\.zipCode\\.errors');
//         this.ssnError = page.locator('#customer\\.ssn\\.errors');
//         this.usernameError = page.locator('#customer\\.username\\.errors');
//         this.passwordError = page.locator('#customer\\.password\\.errors');
//         this.confirmPasswordError = page.locator('#repeatedPassword\\.errors');
//         this.passwordMismatchError = page.locator('#repeatedPassword\\.errors'); // ParaBank often uses the same locator for required and mismatch
//     }

//     getPage(): Page {
//         return this.page;
//     }

//     async clickRegisterLink() {
//         await this.registerLink.click();
//     }

//     async fillFirstName(name: string) {
//         await this.firstNameInput.fill(name);
//     }

//     async fillLastName(name: string) {
//         await this.lastNameInput.fill(name);
//     }

//     async fillAddress(address: string) {
//         await this.addressInput.fill(address);
//     }

//     async fillCity(city: string) {
//         await this.cityInput.fill(city);
//     }

//     async fillState(state: string) {
//         await this.stateInput.fill(state);
//     }

//     async fillZipCode(zip: string) {
//         await this.zipCodeInput.fill(zip);
//     }

//     async fillPhoneNumber(phone: string) {
//         await this.phoneNumberInput.fill(phone);
//     }

//     async fillSSN(ssn: string) {
//         await this.ssnInput.fill(ssn);
//     }

//     async fillUsername(username: string) {
//         await this.usernameInput.fill(username);
//     }

//     async fillPassword(password: string) {
//         await this.passwordInput.fill(password);
//     }

//     async fillConfirmPassword(password: string) {
//         await this.confirmPasswordInput.fill(password);
//     }

//     async clickRegisterButton() {
//         await this.registerButton.click();
//     }

//     // Getters for various error message locators
//     getErrorMessageLocator(): Locator {
//         return this.errorMessage;
//     }

//     getPasswordMismatchErrorLocator(): Locator {
//         return this.passwordMismatchError;
//     }

//     getFirstNameErrorLocator(): Locator {
//         return this.firstNameError;
//     }

//     getLastNameErrorLocator(): Locator {
//         return this.lastNameError;
//     }

//     getAddressErrorLocator(): Locator {
//         return this.addressError;
//     }

//     getCityErrorLocator(): Locator {
//         return this.cityError;
//     }

//     getStateErrorLocator(): Locator {
//         return this.stateError;
//     }

//     getZipCodeErrorLocator(): Locator {
//         return this.zipCodeError;
//     }

//     getSSNErrorLocator(): Locator {
//         return this.ssnError;
//     }

//     getUsernameErrorLocator(): Locator {
//         return this.usernameError;
//     }

//     getPasswordErrorLocator(): Locator {
//         return this.passwordError;
//     }

//     getConfirmPasswordErrorLocator(): Locator {
//         return this.confirmPasswordError;
//     }

//     getPageTitleLocator(): Locator {
//         return this.pageTitle;
//     }
// }