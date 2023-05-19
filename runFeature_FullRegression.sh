export param=$1
rm -rf ./report/$param/
mkdir -p ./report/$param/
export startTime=$(date) 
if [[ $param = "all" ]]; then
    export BROWSER="firefox"
    node node_modules/@cucumber/cucumber/bin/cucumber-js --parallel 4 -f json:report/$param/firefox.json src/features/ --tags "not @ignore"
    export BROWSER="chrome"
    node node_modules/@cucumber/cucumber/bin/cucumber-js --parallel 4 -f json:report/$param/chrome.json src/features/ --tags "not @ignore"
else 
    export BROWSER=$param
    node node_modules/@cucumber/cucumber/bin/cucumber-js --parallel 4 -f json:report/$param/cucumber_report.json src/features/ --tags "not @ignore"
fi
result=$?
export endTime=$(date)
node multiReport.js
exit $result