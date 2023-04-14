export param=$1
rm -rf ./report/$param/
mkdir -p ./report/$param/
export startTime=$(date) 
if [[ $param = "all" ]]; then
    export BROWSER="edge"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/edge.json src/features/ --tags "not @setup"
    export BROWSER="firefox"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/firefox.json src/features/ --tags "not @setup"
    export BROWSER="chrome"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/chrome.json src/features/ --tags "not @setup"
else 
    export BROWSER=$param
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param/cucumber_report.json src/features/ --tags "not @setup"
fi
result=$?
export endTime=$(date)
node multiReport.js
exit $result