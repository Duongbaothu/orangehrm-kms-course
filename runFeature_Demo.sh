export param=$1
rm -rf ./report/$param/
mkdir -p ./report/$param/
export startTime=$(date)
export BROWSER=$param
node node_modules/@cucumber/cucumber/bin/cucumber-js --parallel 4 -f json:report/$param/cucumber_report.json src/features/feature_files/demo.feature --tags "not @ignore" --tags "not @DeleteAll" --tags "not @Config"
result=$?
export endTime=$(date)
node multiReport.js
exit $result