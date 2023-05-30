export param=$1
rm -rf ./report/$param/
mkdir -p ./report/$param/
export startTime=$(date) 
if [[ $param = "all" ]]; then
    export BROWSER="firefox"
    node node_modules/@cucumber/cucumber/bin/cucumber-js --parallel 4 -f json:report/$param/firefox_FullRegression.json src/features/ --tags "not @ignore" --tags "not @DeleteAll" --tags "not @Config"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/firefox_SpecialCases.json src/features/ --tags "@DeleteAll or @Config"
    export BROWSER="chrome"
    node node_modules/@cucumber/cucumber/bin/cucumber-js --parallel 4 -f json:report/$param/chrome_FullRegression.json src/features/ --tags "not @ignore" --tags "not @DeleteAll" --tags "not @Config"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/chrome_SpecialCases.json src/features/ --tags "@DeleteAll or @Config"
else 
    export BROWSER=$param
    node node_modules/@cucumber/cucumber/bin/cucumber-js --parallel 4 -f json:report/$param/cucumber_report_FullRegression.json src/features/ --tags "not @ignore" --tags "not @DeleteAll" --tags "not @Config"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/cucumber_report_SpecialCases.json src/features/ --tags "@DeleteAll or @Config"
fi
result=$?
export endTime=$(date)
node multiReport.js
exit $result