/*
* Copyright 2014 Laura Taylor
* (https://github.com/techstreams/TSContactForm)
*
* Licensed under the Apache License, Version 2.0 (the "License"); 
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
 * Add a custom menu to the active form
 */
function onOpen() {
  FormApp.getUi()
      .createMenu('TSContactForm')
      .addItem('Enable Submit Trigger', 'enableSubmitTrigger')
      .addItem('Clear All Form Responses', 'clearResponses')
      .addSeparator()
      .addItem('About', 'about')
      .addToUi();
}


/**
 * Process form response
 * @param {object} form submit trigger event
 */
function checkResponses(e) {
  var form, tscf;
  try {
    form = FormApp.getActiveForm();
    tscf = new TSContactForm(form, e.response).sendEmail(); 
  } catch(error) {
    // Send errors to owner
    MailApp.sendEmail(Session.getEffectiveUser().getEmail(), 'TSContactForm: Error processing form submission', error.message);
  }
}

/**
 * Clear all form responses
 */
function clearResponses() {
  var tscf;
  tscf = new TSContactForm(FormApp.getActiveForm()).clearFormResponses();
  FormApp.getUi().alert('All Form Responses Deleted.');
}

/**
 * Setup form submit trigger
 */
function enableSubmitTrigger() {
  var tscf;
  tscf = new TSContactForm(FormApp.getActiveForm()).setFormTrigger('checkResponses');
  FormApp.getUi().alert('Form Submit Trigger has been Enabled.');
}

/**
 * Show About Information
 */
function about() {
  FormApp.getUi().showModelessDialog(HtmlService.createHtmlOutputFromFile('about'), '');
}


/**
 * Get time in pretty format
* @param {string} time string in format hh:mm
 */
function getPrettyTime(time) {
  var t;
  t = time.trim().split(":");
  if (t[0] == 0) {
    return '12' +  ":" + t[1] + 'AM';
  } else if (t[0] < 12) {
    return parseInt(t[0]) + ":" + t[1] + 'AM';
  } else if (t[0] == 12) {
    return '12' + ":" + t[1] + 'PM';
  } else {
    return (t[0] - 12) + ":" + t[1] + 'PM';
  }
}


/**
 * Get duration in pretty format
 * @param {string} duration string in format hh:mm:ss
 */
function getPrettyDuration(time) {
  var duration, t;
  duration = '';
  t = time.trim().split(":");
  if (t[0] > 0) {
    duration += parseInt(t[0]) + " hours";
  }
  if (t[1] > 0) {
    if (t[0] > 0) {
      duration += "  : "
    }
    duration += parseInt(t[1]) + " minutes";
  }
  if (t[2] > 0) {
    if (t[0] > 0 || t[1] > 0) {
      duration += "  : "
    }
    duration += parseInt(t[2]) + " seconds";
  }
  return duration;
}


/*
* TSContactForm
* @class
*/


(function() {
  this.TSContactForm = (function() {
    /*
    * @constructor
    * @param {object} form object
    * @param {object} form response object
    * @param {string} email template name
    * @param {string} email subject line
    */

    function TSContactForm(form, formResponse, email, subjectline) {
      this.form = form;
      this.formResponse = formResponse != null ? formResponse : null;
      this.email = email != null ? email : 'email';
      this.subjectline = subjectline != null ? subjectline : 'Form Submission';
      this.meta = null;
      this;
    }

    /*
    * Delete all form responses
    */


    TSContactForm.prototype.clearFormResponses = function() {
      this.deleteFormResponses_();
      return this;
    };

    /*
    * Generate form meta and send email
    */


    TSContactForm.prototype.sendEmail = function() {
      this.generateFormResponseMeta_();
      if (this.meta) {
        this.sendEmail_();
      }
      return this;
    };

    /*
    * Set a form trigger for processing form responses
    * @param {string} function name to be run on trigger
    */


    TSContactForm.prototype.setFormTrigger = function(functionName) {
      var triggers;
      triggers = ScriptApp.getProjectTriggers();
      triggers.forEach(function(trigger) {
        return ScriptApp.deleteTrigger(trigger);
      });
      ScriptApp.newTrigger(functionName).forForm(this.form).onFormSubmit().create();
      return this;
    };

    /*
    * Delete all form responses
    */


    TSContactForm.prototype.deleteFormResponses_ = function() {
      this.form.deleteAllResponses();
      return this;
    };

    /*
    * Generate form response meta
    */


    TSContactForm.prototype.generateFormResponseMeta_ = function() {
      var meta,
        _this = this;
      if (this.formResponse) {
        meta = new Object();
        meta.url = this.form.getPublishedUrl();
        meta.title = this.form.getTitle();
        if (this.form.collectsEmail()) {
          meta.submitter = this.formResponse.getRespondentEmail();
        }
        meta.response = [];
        this.formResponse.getItemResponses().forEach(function(itemResponse) {
          var item, response, scale, scaleparams;
          item = itemResponse.getItem();
          response = new Object();
          response.title = item.getTitle();
          response.type = _this.getItemType_(item.getType());
          if (response.type === 'grid') {
            response.rows = item.asGridItem().getRows();
          }
          if (response.type === 'scale') {
            scale = item.asScaleItem();
            scaleparams = new Object();
            scaleparams.lowerlabel = scale.getLeftLabel();
            scaleparams.lowerbound = scale.getLowerBound();
            scaleparams.upperlabel = scale.getRightLabel();
            scaleparams.upperbound = scale.getUpperBound();
            response.scale = scaleparams;
          }
          response.response = itemResponse.getResponse();
          meta.response.push(response);
          return null;
        });
        this.meta = meta;
      }
      return this;
    };

    /*
    * Get form response item type
    * @param {object} form response item type
    */


    TSContactForm.prototype.getItemType_ = function(itemType) {
      var type;
      type = null;
      switch (itemType) {
        case FormApp.ItemType.CHECKBOX:
          type = 'checkbox';
          break;
        case FormApp.ItemType.DATE:
          type = 'date';
          break;
        case FormApp.ItemType.DATETIME:
          type = 'datetime';
          break;
        case FormApp.ItemType.TIME:
          type = 'time';
          break;
        case FormApp.ItemType.DURATION:
          type = 'duration';
          break;
        case FormApp.ItemType.GRID:
          type = 'grid';
          break;
        case FormApp.ItemType.LIST:
          type = 'list';
          break;
        case FormApp.ItemType.MULTIPLE_CHOICE:
          type = 'multiplechoice';
          break;
        case FormApp.ItemType.SCALE:
          type = 'scale';
          break;
        case FormApp.ItemType.PARAGRAPH_TEXT:
          type = 'paragraph';
          break;
        case FormApp.ItemType.TEXT:
          type = 'text';
          break;
        case FormApp.ItemType.TIME:
          type = 'time';
          break;
      }
      return type;
    };

    /*
    * Send email
    */


    TSContactForm.prototype.sendEmail_ = function() {
      var email, params;
      email = HtmlService.createTemplateFromFile(this.email);
      email.meta = this.meta;
      params = {
        htmlBody: email.evaluate().getContent()
      };
      MailApp.sendEmail(Session.getEffectiveUser().getEmail(), this.subjectline, "", params);
      return null;
    };

    return TSContactForm;

  })();

}).call(this);
