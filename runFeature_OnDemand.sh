export param=$1
export featureFile=$2
rm -rf ./report/$param/
mkdir -p ./report/$param/
export startTime=$(date) 
if [[ $param = "all" ]]; then
    export BROWSER="firefox"
    node node_modules/@cucumber/cucumber/bin/cucumber-js --parallel 4 -f json:report/$param/firefox_FullRegression.json $featureFile --tags "not @ignore" --tags "not @DeleteAll" 
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/firefox_SpecialCases.json $featureFile --tags "@DeleteAll"
    export BROWSER="chrome"
    node node_modules/@cucumber/cucumber/bin/cucumber-js --parallel 4 -f json:report/$param/chrome_FullRegression.json $featureFile --tags "not @ignore" --tags "not @DeleteAll"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/chrome_SpecialCases.json $featureFile --tags "@DeleteAll"
else 
    export BROWSER=$param
    node node_modules/@cucumber/cucumber/bin/cucumber-js --parallel 4 -f json:report/$param/cucumber_report_FullRegression.json $featureFile --tags "not @ignore" --tags "not @DeleteAll"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/cucumber_report_SpecialCases.json $featureFile --tags "@DeleteAll"
fi
result=$?
export endTime=$(date)
node multiReport.js
exit $result