export param_1=$1
export param_2=$2
rm -rf ./report/$param_1/
mkdir -p ./report/$param_1/
export startTime=$(date) 
if [[ $param_1 = "all" ]]; then
    export BROWSER="edge"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param_1/edge.json $param_2 --tags "not @setup"
    export BROWSER="firefox"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param_1/firefox.json $param_2 --tags "not @setup"
    export BROWSER="chrome"
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param_1/chrome.json $param_2 --tags "not @setup"
else 
    export BROWSER=$param_1
    node node_modules/@cucumber/cucumber/bin/cucumber-js -f json:report/$param_1/cucumber_report.json $param_2 --tags "not @setup"
fi
result=$?
export endTime=$(date)
node multiReport.js
exit $result