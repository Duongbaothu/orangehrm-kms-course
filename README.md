## Requirements
- Node 14.x+
- Chrome, Firefox and Edge browser

## Getting Started
You need to install Node on your machine. Then use Node for installing packages and running scripts.
```bash
npm install
```

## Running Demo
You can use chrome, firefox or edge to run the demo.
```bash
bash runFeature_Demo.sh chrome
```

## Code Convention
You need to install Visual Studio Code then install ESLint extension. If you are new to ESLint check the [documentation](https://eslint.org/docs/latest/rules/).

## Code Structure
Expand src/features folder
- feature_files: We will create subfolder by page. Feature files will be saved inside subfolder
- step_definitions : Step definitions used in feature file will be defined here
- page_objects: Methods used in step definitions will be defined here

## Naming convention
- For file: use camelCase
- For folder: use snake_case
- For method in page object: use verbs to describe what the method does
- For element xpath in page object: 

| UI/Control type            | Prefix | Example         |
| :------------------------- | :------| :-------------- |
| Button                     | btn    | btnExit         |
| Check box                  | chk    | chkReadOnly     |
| Combo box                  | cbo    | cboEnglish      |
| Common dialog              | dlg    | dlgFileOpen     |
| Date picker                | dtp    | dtpPublished    |
| Dropdown List / Select tag | ddl    | ddlCountry      |
| Form                       | frm    | frmEntry        |
| Frame                      | fra    | fraLanguage     |
| Image                      | img    | imgIcon         |
| Label                      | lbl    | lblHelpMessage  |
| Links/Anchor Tags          | lnk    | lnkForgotPwd    |
| List box                   | lst    | lstPolicyCodes  |
| Menu                       | mnu    | mnuFileOpen     |
| Radio button / group       | rdo    | rdoGender       |
| RichTextBox                | rtf    | rtfReport       |
| Table                      | tbl    | tblCustomer     |
| TabStrip                   | tab    | tabOptions      |
| Text Area                  | txa    | txaDescription  |
| Text box                   | txt    | txtLastName     |
| Chevron                    | chv    | chvProtocol     |
| Data grid                  | dgd    | dgdTitles       |
| Data list                  | dbl    | dblPublisher    |
| Directory list box         | dir    | dirSource       |
| Drive list box             | drv    | drvTarget       |
| File list box              | fil    | filSource       |
| Panel/Fieldset             | pnl    | pnlGroup        |
| ProgressBar                | prg    | prgLoadFile     |
| Slider                     | sld    | sldScale        |
| Spinner                    | spn    | spnPages        |
| StatusBar                  | sta    | staDateTime     |
| Timer                      | tmr    | tmrAlarm        |
| Toolbar                    | tlb    | tlbActions      |
| TreeView                   | tre    | treOrganization |