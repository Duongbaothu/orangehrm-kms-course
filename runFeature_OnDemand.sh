export param=$1
export featureFile=$2
rm -rf ./report/$param/
mkdir -p ./report/$param/
export startTime=$(date) 
if [[ $param = "all" ]]; then
    export BROWSER="firefox"
    node node_modules/@cucumber/cucumber/bin/cucumber-js --parallel 4 -f json:report/$param/firefox.json $featureFile --tags "not @ignore"
    export BROWSER="chrome"
    node node_modules/@cucumber/cucumber/bin/cucumber-js --parallel 4 -f json:report/$param/chrome.json $featureFile --tags "not @ignore"
else 
    export BROWSER=$param
    node node_modules/@cucumber/cucumber/bin/cucumber-js --parallel 4 -f json:report/$param/cucumber_report.json $featureFile --tags "not @ignore"
fi
result=$?
export endTime=$(date)
node multiReport.js
exit $result