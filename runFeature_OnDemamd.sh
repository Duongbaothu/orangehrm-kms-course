export param=$1
export featureFile=$2
rm -rf ./report/$param/
mkdir -p ./report/$param/
export startTime=$(date) 
if [[ $param = "all" ]]; then
    export BROWSER="edge"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/edge.json $featureFile --tags "not @setup"
    export BROWSER="firefox"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/firefox.json $featureFile --tags "not @setup"
    export BROWSER="chrome"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/chrome.json $featureFile --tags "not @setup"
else 
    export BROWSER=$param
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/cucumber_report.json $featureFile --tags "not @setup"
fi
result=$?
export endTime=$(date)
node multiReport.js
exit $result