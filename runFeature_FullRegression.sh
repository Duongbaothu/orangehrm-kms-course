export param=$1
rm -rf ./report/$param/
mkdir -p ./report/$param/
export startTime=$(date) 
if [[ $param = "all" ]]; then
    export BROWSER="edge"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/edge.json features/
    export BROWSER="firefox"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/firefox.json features/
    export BROWSER="chrome"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/chrome.json features/
else 
    export BROWSER=$param
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/cucumber_report.json features/
fi
result=$?
export endTime=$(date)
node multiReport.js
exit $result