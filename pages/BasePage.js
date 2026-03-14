class BasePage {
  constructor(page) {
    this.page = page;
  }

  // Replaces: homePage.open() / PageObject navigation
  async navigate(path = '') {
    await this.page.goto(path);
  }

  // Replaces: waitUntilVisible() pattern from Serenity
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle() {
    return this.page.title();
  }
}

module.exports = { BasePage };