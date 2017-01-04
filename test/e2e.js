import path from 'path';
import chromedriver from 'chromedriver';
import webdriver from 'selenium-webdriver';
import { expect } from 'chai';
import electronPath from 'electron-prebuilt';

chromedriver.start(); // on port 9515
process.on('exit', chromedriver.stop);

const delay = time => new Promise(resolve => setTimeout(resolve, time));

const executeFunction = function (driver, func) {
  const callable = "(" + func.toString() + ")()";
  return driver.executeScript(callable);
};

describe('main window', function spec() {
  this.timeout(0);

  before(async () => {
    await delay(1000); // wait chromedriver start time
    this.driver = new webdriver.Builder()
      .usingServer('http://localhost:9515')
      .withCapabilities({
        chromeOptions: {
          binary: electronPath,
          args: ['app=' + path.resolve()]
        }
      })
      .forBrowser('electron')
      .build();
  });

  after(async () => {
    await this.driver.quit();
  });

  it('creates new project via menu', async () => {
    executeFunction(this.driver, function () {
      bridge.clickMenuEntry("File", "New project");
    });

    const inputs = await this.driver.findElements(webdriver.By.css('.new-project-page input'));

    inputs[0].sendKeys('test name');
    inputs[1].sendKeys('/tmp/test');
    inputs[inputs.length - 1].click();

    const listedProjects = await this.driver.findElements(webdriver.By.css('.project-details .name'))

    expect(await listedProjects[0].getText()).to.eql('test name');
  });
});
