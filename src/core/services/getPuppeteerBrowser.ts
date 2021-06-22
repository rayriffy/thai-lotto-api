import puppeteer, { LaunchOptions } from 'puppeteer-core'
import chrome from 'chrome-aws-lambda'

export const getPuppeteerBrowser = async (options?: LaunchOptions) => {
  return await puppeteer.launch({
    headless: true,
    args: chrome.args,
    executablePath:
      (await chrome.executablePath) || '/usr/bin/google-chrome-stable',
    ...options,
  })
}