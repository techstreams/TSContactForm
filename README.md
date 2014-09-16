#  TSContactForm

**TSContactForm** is a [Google Apps Script](https://www.google.com/script/start/) for [Google Forms](https://support.google.com/docs/topic/6063584) which automatically emails the form owner each time a user submits a response to the form.  Emails are nicely formatted and contain the contents of the form submission.



## Install


### Method #1:  TSScriptCopy Application Install

Use the **TSScriptCopy application** to install the **TSContactForm script and host form** into your Google Drive.  

* Login to your [Google Drive](http://drive.google.com)

* Access the [TSScriptCopy application](https://script.google.com/macros/s/AKfycbyvyOdWanBy-3ovr_YirIK9gNR-EYkpdYtbROPi7qgrpABO7H09/exec). *(If you have not run TSScriptCopy before, you will be prompted to perform a one-time authorization to allow the application to copy scripts and host documents to your Google Drive.)*

* On the resulting web page, click the **Copy to Drive** button associated with TSContactForm to install

* Locate and open the **TSContact host form** which was copied to your Google Drive

* To use the script, see the [TSContactForm documentation](https://docs.google.com/document/d/1gTBYgxVAjbRP2VoGg3pbZBhoLNKen10hYnuTP8PK8Dk/pub).


*NOTE: The TSScriptCopy application is licensed under [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)*



### Method #2:  Manual Install

* Login to your [Google Drive](http://drive.google.com)

* Create a [Google Form](https://support.google.com/docs/topic/6063584)

* Create a form project following [these instructions](https://developers.google.com/apps-script/managing_projects#creatingSpreadsheet)

* Add the following files from the **dist** directory to the form project:

  * [code.gs](dist/code.gs)
  * [email.html](dist/email.html)
  * [about.html](dist/about.html)

  NOTES:

  There should already be a file named **Code.gs** in your form project when you first create it.  Replace the contents of that file with the contents of the [code.gs](dist/code.gs) file and save.

  When creating form project files for [email.html](dist/email.html) and [about.html](dist/about.html), be sure to select the ***File > New > Html*** menu option from the script editor.  Enter the associated file name ( `email` or `about` ) but omit the `.html` suffix as it will automatically be added when the file is created.  Replace the created project file content with the respective html file content ( [email.html](dist/email.html) or [about.html](dist/about.html) ) and save.

* Close the script editor and reload the form in your browser

* To use the script, see the [TSContactForm documentation](https://docs.google.com/document/d/1gTBYgxVAjbRP2VoGg3pbZBhoLNKen10hYnuTP8PK8Dk/pub)




## Usage

See the [TSContactForm documentation](https://docs.google.com/document/d/1gTBYgxVAjbRP2VoGg3pbZBhoLNKen10hYnuTP8PK8Dk/pub)

**Important Usage Notes**

* Google Apps Scripts are subject to daily quota limits including the number of emails sent.   See the *Quota Limits* tab of the [Google Apps Script Dashboard](https://docs.google.com/macros/dashboard) for more information.

* TSContactForm may not be appropriate for high traffic forms, especially in cases where the form owner consistently receives quota limit exceeded notifications.


## Change Log

See the [Change Log](CHANGELOG.md).


## Contributing to this project

Contributions are welcome. Please take a moment to review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bug-reports)
* [Feature requests](CONTRIBUTING.md#feature-requests)
* [Pull requests](CONTRIBUTING.md#pull-requests)



## Developer Notes

* Edit [src/tscontactform.coffee](src/tscontactform.coffee) for all changes to [dist/code.gs](dist/code.gs) and use [Gulp](http://gulpjs.com/) to build.  *See the [Using CoffeeScript and Gulp](#using-coffeescript-and-gulp) section below for more information.*

* Edit `.html` files directly in the [dist directory](./dist).


### Using CoffeeScript and Gulp

Ensure that [Node.js](http://nodejs.org/) and [npm](https://github.com/npm/npm) are installed on your system.  *NOTE: Most Node.js installers include npm.*

To install dependencies, run the following command from the project's root directory:

    npm install

*You may need to run `sudo npm install` depending upon your environment.*

To build code, edit the [source](src/tscontactform.coffee) and run the following command from the project's root directory:

    gulp

*While developing, the `gulp dev` task may be useful.  Run the following command from the project's root directory:*

    gulp dev

To run the docs locally, [install Harp](#docs) and run the following command from the project's root directory:

    gulp docsdev

*Open up a browser and navigate to http://localhost:9000*

To compile the docs, [install Harp](#docs) and run the following command from the project's root directory:

    gulp docsbuild

You can find all gulp tasks in [gulpfile](gulpfile.coffee).


### Docs

The documentation was built with [Harp](http://harpjs.com/).  To run the documentation locally:

Install Harp globally.  *See the [documentation](http://harpjs.com/docs/environment/install) for more information.*

To run the Harp server, execute the following command from the project's root directory *(or use the [gulp docsdev](#using-coffeeScript-and-gulp) task)*:

    harp server ./docs/_harp

*Open up a browser and navigate to http://localhost:9000*

To build the docs, execute the following command from the project's root directory *(or use the [gulp docsbuild](#using-coffeeScript-and-gulp) task)*:

    harp compile ./docs/_harp ./docs/_site






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

