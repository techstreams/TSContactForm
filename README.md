#  TSContactForm

**TSContactForm** is a [Google Apps Script](https://www.google.com/script/start/) for [Google Forms](https://support.google.com/docs/topic/6063584) which automatically emails the form owner each time a user submits a response to the form.  Emails are nicely formatted and contain the contents of the form submission.



## Install


### Method #1:  Manual Install

1. Login to your [Google Drive](http://drive.google.com).
1. Create a [Google Form](https://support.google.com/docs/topic/6063584).
1. Create a form project following [these instructions](https://developers.google.com/apps-script/managing_projects#creatingSpreadsheet).
1. Add **code.gs**, **email.html** and **about.html** to the form project. 
  * There should already be a file named Code.gs in your project.  Replace the contents of that file with the contents of the code.gs file found in this directory.  
  * For all remaining html files, be sure to select **File > New > Html** when creating the file.  Enter the associated file name but omit the .html suffix. The suffix will be automatically added when the file is created.
1. Close the script editor and reload the form.  
1. To use the script, see the [TSContactForm documentation](https://docs.google.com/document/d/1gTBYgxVAjbRP2VoGg3pbZBhoLNKen10hYnuTP8PK8Dk/pub) for more information.


### Method #2:  TSScriptCopy Application Install

Use the **TSScriptCopy application** to install the **TSContactForm script and host form** into your Google Drive.  

1. Login to your [Google Drive](http://drive.google.com).
1. Access the [TSScriptCopy application](https://script.google.com/macros/s/AKfycbyvyOdWanBy-3ovr_YirIK9gNR-EYkpdYtbROPi7qgrpABO7H09/exec). *(If you have not run TSScriptCopy before, you will be prompted to perform a one-time authorization to allow the application to copy scripts and host documents to your Google Drive.)*
1. On the resulting web page, click the **Copy to Drive** button associated with TSContactForm to install.
1. Locate and open the **TSContact host form** which was copied to your Google Drive.
1. To use the script, see the [TSContactForm documentation](https://docs.google.com/document/d/1gTBYgxVAjbRP2VoGg3pbZBhoLNKen10hYnuTP8PK8Dk/pub) for more information.


*NOTE: TSScriptCopy application use is licensed under [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)*



## Usage

See the [TSContactForm documentation](https://docs.google.com/document/d/1gTBYgxVAjbRP2VoGg3pbZBhoLNKen10hYnuTP8PK8Dk/pub)



## Important Notes

* Google Apps Scripts are subject to daily quota limits including the number of emails sent in a given 24 hour period.   See the *Quota Limits* tab of the [Google Apps Script Dashboard](https://docs.google.com/a/macros/mytechstreams.com/dashboard) for more information.

* TSContactForm may not be appropriate for high traffic forms, especially in cases where the form owner consistently receives quota limit exceeded notifications.



## Release Notes

**v.0.1.0 (2014-09-08)** 

* Initial Release



## License

Copyright 2014 [Laura Taylor](https://github.com/techstreams)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.