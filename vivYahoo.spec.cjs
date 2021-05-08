const { webBarLinks, yahooSearchBar, yahooSearchButton, yahooPagination, yahooSignInButton, staySignedInCheckbox } = require("./yahooWebElements");
const { cities } = require("./cities");
beforeEach (function() {
    browser.ignoreSynchronization = true;
    browser.get('https://www.yahoo.com');
    browser.driver.manage().window().maximize();
  })

describe('Should complete the Viventium coding challenge', () => {
    it('Should assert we are on the correct page', () => {
        expect(browser.getTitle()).toEqual("Yahoo");
    });
    it('Should count the number of links under the search bar', () => {
        webBarLinks.count().then((count) =>{
            console.log(count);
        });
    });
    it('Should print each web link under the search bar', () => {
        webBarLinks.each(link => {
            link.getText().then((text) => {
                console.log(text);
            });
        });
    });
    it('Should search for a city, click search, and wait 7 seconds for the results', () => {
        yahooSearchBar.sendKeys(cities.NYC);
        yahooSearchButton.click().then(() => {
            browser.sleep(7000);
        });
        expect((yahooPagination).isDisplayed()).toBe(true);
    });
    it('Should click sign in, display the boolean state of "Keep me signed in", and uncheck the box if it is checked', () => {
        yahooSignInButton.click();
        staySignedInCheckbox.isSelected().then(() => {
            console.log('True');
        });
        if (staySignedInCheckbox.isSelected()) {
            staySignedInCheckbox.click();
        }
        browser.sleep(5000); //sleep to allow time to visually inspect that the checkbox has been deselected
        //browser closes automatically using protractor, but if you need to close it manually:
        //browser.driver.close();
    });
});