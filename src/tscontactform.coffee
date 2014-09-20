###
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
###

###
 * Add a custom menu to the active form
###
`function onOpen() {
  FormApp.getUi()
      .createMenu('TSContactForm')
      .addItem('Enable Submit Trigger', 'enableSubmitTrigger')
      .addSeparator()
      .addItem('About', 'about')
      .addToUi();
}`


###
 * Process form response
 * @param {object} form submit trigger event
###
`function checkResponses(e) {
  var form, tscf;
  try {
    form = FormApp.getActiveForm();
    tscf = new TSContactForm(form, e.response).sendEmail();
  } catch(error) {
    // Send errors to owner
    MailApp.sendEmail(Session.getEffectiveUser().getEmail(), 'TSContactForm: Error processing form submission', error.message);
  }
}`

###
 * Setup form submit trigger
###
`function enableSubmitTrigger() {
  var tscf;
  tscf = new TSContactForm(FormApp.getActiveForm()).setFormTrigger('checkResponses');
  FormApp.getUi().alert('Form Submit Trigger has been Enabled.');
}`

###
 * Show About Information
###
`function about() {
  FormApp.getUi().showModelessDialog(HtmlService.createHtmlOutputFromFile('about'), ' ');
}`


###
 * Get time in pretty format
 * @param {string} time string in format hh:mm
 * @return {string} time string in pretty format
###
`function getPrettyTime(time) {
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
}`


###
 * Get duration in pretty format
 * @param {string} duration string in format hh:mm:ss
 * @return {string} duration string in pretty format
###
`function getPrettyDuration(time) {
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
}`

###
* Define TSContactForm Class
###

do ->

  ###
  * TSContactForm
  * @class
  ###
  class @TSContactForm
    ###
    * @constructor
    * @param {object} form object
    * @param {object} form response object
    * @param {string} email template name
    * @param {string} email subject line
    * @return {TSContactForm} this object for chaining
    ###
    constructor: (@form, @formResponse = null, @email = 'email', @subjectline = 'Form Submission') ->
      @meta = null
      @

    # PUBLIC FUNCTIONS

    ###
    * Generate form meta and send email
    * @return {TSContactForm} this object for chaining
    ###
    sendEmail: ->
      @generateFormResponseMeta_()
      if @meta
        @sendEmail_()
      @

    ###
    * Set a form trigger for processing form responses
    * @param {string} function name to be run on trigger
    * @return {TSContactForm} this object for chaining
    ###
    setFormTrigger: (functionName) ->
      # Set form submit trigger - call when generating form
      triggers = ScriptApp.getProjectTriggers()
      triggers.forEach (trigger) ->
        ScriptApp.deleteTrigger(trigger)
      ScriptApp.newTrigger(functionName)
        .forForm(@form)
        .onFormSubmit()
        .create()
      @

    # PRIVATE FUNCTIONS

    ###
    * Generate form response meta
    * @return {TSContactForm} this object for chaining
    * @private
    ###
    generateFormResponseMeta_: ->
      if @formResponse
        meta = new Object()
        meta.url = @form.getPublishedUrl()
        meta.title = @form.getTitle()
        if @form.collectsEmail()
          meta.submitter = @formResponse.getRespondentEmail()
        meta.response = []
        @formResponse.getItemResponses().forEach (itemResponse) =>
          item = itemResponse.getItem()
          response = new Object()
          response.title = item.getTitle()
          response.type = @getItemType_(item.getType())
          if response.type is 'grid'
            response.rows = item.asGridItem().getRows()
          if response.type is 'scale'
            scale = item.asScaleItem()
            scaleparams = new Object()
            scaleparams.lowerlabel = scale.getLeftLabel()
            scaleparams.lowerbound = scale.getLowerBound()
            scaleparams.upperlabel = scale.getRightLabel()
            scaleparams.upperbound = scale.getUpperBound()
            response.scale = scaleparams
          response.response = itemResponse.getResponse()
          meta.response.push response
          null
        @meta = meta
      @

    ###
    * Get form response item type
    * @param {object} form response item type
    * @return {string} type of form object
    * @private
    ###
    getItemType_: (itemType) ->
      type = null
      switch itemType
        when FormApp.ItemType.CHECKBOX
          type = 'checkbox'
        when FormApp.ItemType.DATE
          type = 'date'
        when FormApp.ItemType.DATETIME
          type = 'datetime'
        when FormApp.ItemType.TIME
          type = 'time'
        when FormApp.ItemType.DURATION
          type = 'duration'
        when FormApp.ItemType.GRID
          type = 'grid'
        when FormApp.ItemType.LIST
          type = 'list'
        when FormApp.ItemType.MULTIPLE_CHOICE
          type = 'multiplechoice'
        when FormApp.ItemType.SCALE
          type = 'scale'
        when FormApp.ItemType.PARAGRAPH_TEXT
          type = 'paragraph'
        when FormApp.ItemType.TEXT
          type = 'text'
        when FormApp.ItemType.TIME
          type = 'time'
        else
      type

    ###
    * Send email
    * @return {TSContactForm} this object for chaining
    * @private
    ###
    sendEmail_: () ->
      email = HtmlService.createTemplateFromFile(@email)
      email.meta = @meta
      params =
        htmlBody: email.evaluate().getContent()
      MailApp.sendEmail(Session.getEffectiveUser().getEmail(), @subjectline, "", params)
      @




