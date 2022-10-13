#!/usr/bin/env node
const report = require('multiple-cucumber-html-reporter');
const os = require('os');

const {startTime} = process.env;
const {endTime} = process.env;
const browserName = process.env.BROWSER;
const paramPath = process.env.param;

const customData = {
  title: 'Run info',
  data: [
    {label: 'Execution Start Time:', value: startTime},
    {label: 'Execution End Time:', value: endTime},
  ],
};

const platformMap = {
  darwin: 'osx',
  window: '10',
};

let platformName = os.platform();

if (platformMap[os.platform()]) {
  platformName = platformMap[os.platform()];
}

const metadata = {
  device: 'Local test machine',
  browser: {
    name: browserName,
  },
  platform: {
    name: platformName,
    version: os.release(),
  },
};

report.generate({
  jsonDir: `./report/${paramPath}`,
  reportPath: `./report/${paramPath}`,
  displayDuration: true,
  metadata,
  customData,
  reportName: 'Generate Events Report',
  saveCollectedJSON: true,
  openReportInBrowser: true,
});
