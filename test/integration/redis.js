var webdriver = require('selenium-webdriver')
, mocha = require('mocha')
, chai = require('chai')
, chaiAsPromised = require('chai-as-promised')
, assert = chai.assert
, expect = chai.expect
, should = chai.should()
, dotenv = require('dotenv').config()
, _ = require('lodash')

chai.use(chaiAsPromised)

describe('seneca:action microservice', () => {
    var driver
    before((done) => {
        // Input capabilities
        var capabilities = {
            'browserName' : 'chrome',
            'browserstack.user' : process.env.BROWSERSTACK_USER,
            'browserstack.key' : process.env.BROWSERSTACK_KEY,
            'browserstack.debug' : 'true',
            'build' : 'First build'
        }

        driver = new webdriver.Builder().
            usingServer('http://hub-cloud.browserstack.com/wd/hub').
            withCapabilities(capabilities).
            build()
        done()
    })
    
    describe('browser',function(){
        this.timeout(15000)

        it('open start page', done => {            
            driver.get('http://staging.softsky.com.ua')
            driver.navigate().refresh()

            driver
                .getTitle()
                .then(title => {
                    expect(title).to.be.equal('SOFTSKY - Information Security Audit')
                })
                .then(_.curry(done)(null))
        })

        it.only('open submit top form', function(done) {            
            driver.get('http://staging.softsky.com.ua')
            driver.navigate().refresh()
            driver.findElement(webdriver.By.id('name-0')).sendKeys('Automated Tester')
            driver.findElement(webdriver.By.id('email-0')).sendKeys('test@example.com')
            driver.findElement(webdriver.By.name('url')).sendKeys('http://www.example.com')

            driver
                .findElement(webdriver.By.id('send-0'))
                .click()
                .then( text => console.log('Hello'))
                .then(() => driver.sleep(1000))
                .then(() => driver.findElement(webdriver.By.id('ajaxsuccess-0')).getText())
                .then( text =>  expect(text).to.be.equal('Your scan has been queued. We will send you email when it\'s started.') )
                .then(() => driver.findElement(webdriver.By.id('ajaxsuccess')).getText())
                .then( text => console.log(text))
                .then( text =>  expect(text).to.not.equal('Successfully sent!!') )
                .then(_.curry(done))
        })

        it('open send message bottom form', function(done) {
            
            driver.get('http://staging.softsky.com.ua')
            driver.navigate().refresh()
            driver.findElement(webdriver.By.id('name')).sendKeys('Automated Tester')
            driver.findElement(webdriver.By.id('email')).sendKeys('test@example.com')
            driver.findElement(webdriver.By.name('url')).sendKeys('http://www.example.com')
            driver.findElement(webdriver.By.name('subject')).sendKeys('some subject')
            driver.findElement(webdriver.By.name('subject')).sendKeys('some message')

            driver
                .findElement(webdriver.By.id('send'))
                .click()
                .then(() => driver.sleep(1000))
                .then(() => driver.findElement(webdriver.By.id('ajaxsuccess')).getText())
                .then( text =>  expect(text).to.be.equal('Your scan has been queued. We will send you email when it\'s started.') )
                .then(_.curry(done)(null))
        })        
        
    })
    
    after((done)=>{
        driver.quit()
        done()
    })
})



