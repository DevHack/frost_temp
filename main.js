(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _assessmentsAssessment = require("./assessments/assessment");

var _assessmentsAssessment2 = _interopRequireDefault(_assessmentsAssessment);

var _dataActivity_data_factory = require("./data/activity_data_factory");

var _dataActivity_data_factory2 = _interopRequireDefault(_dataActivity_data_factory);

var _btn_setting = require("./btn_setting");

var _btn_setting2 = _interopRequireDefault(_btn_setting);

$(window).on("message", function (data) {
    // method recieves data from parent i.e frame
    if (!data.originalEvent.data.data_path) {
        return;
    }
    injectScript(data.originalEvent.data.data_path);
});

function initializeAssessment() {
    // app bootstraps from here
    dataValidator();
    var allQuestions = _dataActivity_data_factory2["default"].getActivityDataFromJSON(advJsonData.quiz);
    var assessmentController = new _assessmentsAssessment2["default"]();
    assessmentController.init(allQuestions);
    assessmentController.getInitialQuestion();
}

function injectScript(src) {
    //method for injecting the data script into head
    if ($("script[src='" + src + "']").length === 0) {
        var dataScript = document.createElement('script');
        dataScript.type = 'text/javascript';
        dataScript.src = src;
        document.getElementsByTagName('head')[0].appendChild(dataScript);
        dataScript.onload = initializeAssessment;
        dataScript.error = function (e) {
            throw e;
        };
    }
}

function dataValidator() {
    // this method scans questions
    switch (advJsonData.quiz.length) {
        case 0:
            $("#noQuestionAlert").show();
            $('footer').hide();
            return false;
            break;
        case 1:
            _btn_setting2["default"].hideNavigation();
            break;
        default:
            _btn_setting2["default"].loadFooterPanel();
    }
}
function setupInitialTemplate(parentId) {
    var template = "<div id=\"playground\" class=\"container\"></div>\n        <div id=\"noQuestionAlert\" class=\"alert alert-info\">\n            <strong>ERROR!</strong> This assessment does not have any question.\n        </div>\n        <footer class=\"main-header-block\" style=\"position:fixed;bottom: 0;left: 0;right: 0;\">\n            <figure class=\"header-action not-mobile\">\n                <div class=\"col-sm-12 primary\">\n                    <button class=\"btn btn-primary\" id=\"checkAnswer\" disabled style=\"display:none\">Check Answer</button>\n                    <button class=\"btn btn-primary\" id=\"retry\" style=\"display:none\">Retry</button>\n                    <div class=\"btn-group nxt-prev\" role=\"group\" aria-label=\"Navigation\">\n                        <button class=\"btn btn-default btn-arrow-left\" id=\"prev\" disabled style=\"display:none\"><i\n                                class=\"fa fa-arrow-circle-left fa-fw\"></i> Back\n                        </button>\n                        <button class=\"btn btn-default btn-arrow-right\" id=\"next\" style=\"display:none\"> Next <i\n                                class=\"fa fa-arrow-circle-right fa-fw\"></i></button>\n                    </div>\n                    <div class=\"clearfix\"></div>\n                </div>\n                <div class=\"clearfix\"></div>\n            </figure>\n            <figure class=\"header-action mobile-only\">\n                <div class=\"col-sm-9 primary\">\n                    <button class=\"btn btn-primary\" id=\"checkAnswerMobile\" disabled style=\"display:none\">Check Answer\n                    </button>\n                    <button class=\"btn btn-primary\" id=\"retryMobile\" style=\"display:none\">Retry</button>\n                    <div class=\"btn-group nxt-prev\" role=\"group\" aria-label=\"Navigation\">\n                        <button id=\"prevMobile\" class=\"btn btn-default\" data-toggle=\"tooltip\" data-placement=\"bottom\"\n                                title=\"\" data-original-title=\"Previous Question\" disabled style=\"display:none\"><i\n                                class=\"fa fa-arrow-circle-left fa-fw\"></i></button>\n                        <button id=\"nextMobile\" class=\"btn btn-default\" data-toggle=\"tooltip\" data-placement=\"bottom\"\n                                title=\"\" data-original-title=\"Next Question\" style=\"display:none\"><i\n                                class=\"fa fa-arrow-circle-right fa-fw\"></i></button>\n                    </div>\n                    <div class=\"clearfix\"></div>\n                </div>\n                <div class=\"clearfix\"></div>\n            </figure>\n            <div class=\"clearfix\"></div>\n        </footer>\n        <div class=\"modal fade bs-example-modal-sm fdbackmodal\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\">\n            <div class=\"modal-dialog modal-sm\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span\n                                aria-hidden=\"true\">&times;</span></button>\n                    </div>\n                    <div class=\"modal-body\" id=\"modalBodyPanel\"></div>\n                </div>\n            </div>\n        </div>";

    document.getElementById(parentId || "assessmentObject").innerHTML = template;
}
//for iframe usage
/*$(document).ready(function () {
    //method posts data  to top i.e outer parent
    setupInitialTemplate();
    top.postMessage("getDefaultData", "*");
});*/

//for standalone usage
function initAssessments(parentContainerId, data) {
    if (!data) {
        throw new Error("Please send data to initialize");
    }
    setupInitialTemplate(parentContainerId);
    if (typeof data === "string") {
        injectScript(data);
        return;
    }
    if (typeof data === "object") {
        advJsonData = data;
        initializeAssessment();
    }
}
window.initAssessments = initAssessments;

},{"./assessments/assessment":2,"./btn_setting":6,"./data/activity_data_factory":8}],2:[function(require,module,exports){
/**
 * Created by debayan.das on 26-09-2016.
 */
/** 
 *edited by tarique hussain
 */
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _templatesTemplate_provider = require("../templates/template_provider");

var _templatesTemplate_provider2 = _interopRequireDefault(_templatesTemplate_provider);

var _checkAnswer = require("./checkAnswer");

var _checkAnswer2 = _interopRequireDefault(_checkAnswer);

var _navigation = require("./navigation");

var _navigation2 = _interopRequireDefault(_navigation);

var AssessmentController = (function () {
    function AssessmentController() {
        _classCallCheck(this, AssessmentController);

        //initialises variables
        this.currentTemplate = null;
        this.navigator = new _navigation2["default"](this);
        this.checkAnswer = new _checkAnswer2["default"](this);
        this.correctAnswers = null;
    }

    AssessmentController.prototype.init = function init(assessmentData) {
        // calls init function of different components with assessment data
        this.navigator.init(assessmentData);
        this.checkAnswer.init(assessmentData);
    };

    AssessmentController.prototype.loadQuestion = function loadQuestion(question, pageIndex) {
        // method loads question i.e previews them
        this.currentTemplate = _templatesTemplate_provider2["default"].get(question);
        $('#playground').attr('aria-hidden', true);
        $("#playground").html(this.currentTemplate.render(pageIndex + 1));
        //ARIA Fix
        setTimeout(function () {
            $('#playground').attr('aria-hidden', false);
        }, 400);
        //ARIA Fix Ends
        this.currentTemplate.bindEvents();
        //        this.bindResizeFunction();
        //        this.resizeIframe();
    };

    AssessmentController.prototype.getInitialQuestion = function getInitialQuestion() {
        // method gets the very first question
        this.navigator.next();
    };

    AssessmentController.prototype.getCorrectAnswer = function getCorrectAnswer() {
        //method used to get Correct Answer
        this.currentTemplate.checkCorrectAnswer();
    };

    AssessmentController.prototype.retry = function retry() {
        // method used to give user a preference to retry for particular question
        this.currentTemplate.retry();
    };

    AssessmentController.prototype.checkAndUpdateSelectedOptions = function checkAndUpdateSelectedOptions() {
        // checks and updates the selected options given by user
        if (this.currentTemplate) {
            this.currentTemplate.updateSelectedOptions();
        }
    };

    //    bindResizeFunction(){//method binds reszieFrame function every button present in DOM
    //          $("body").off("click", "button").on("click", "button", this.resizeIframe.bind(this));
    //    }
    //    resizeIframe() { //method auto adjusts the iframe according to its content
    //    var iframeWin = parent.document.getElementById("parentFrame");
    //        iframeWin.height = document.getElementById('playground').scrollHeight +20;
    //    }
    return AssessmentController;
})();

exports["default"] = AssessmentController;
;
module.exports = exports["default"];

},{"../templates/template_provider":17,"./checkAnswer":3,"./navigation":4}],3:[function(require,module,exports){
/** 
 *edited by tarique hussain
 */
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CheckAnswerController = (function () {
    function CheckAnswerController(assessmentControllerInstance) {
        _classCallCheck(this, CheckAnswerController);

        this.assessmentController = assessmentControllerInstance;
        this.allQuestions = null;
        this.selector = {
            body: $("body"),
            retry: $("#retry"),
            retryMobile: $("#retryMobile"),
            checkAnswer: $("#checkAnswer"),
            checkAnswerMobile: $("#checkAnswerMobile")
        };
    }

    CheckAnswerController.prototype.init = function init(assessmentData) {
        // this method initialises data
        this.allQuestions = assessmentData;
        this.bindEvents();
    };

    CheckAnswerController.prototype.bindEvents = function bindEvents() {
        // binds click event to check answer button
        this.selector.body.off("click", "#checkAnswer").on("click", "#checkAnswer", this.checkAnswer.bind(this));
        this.selector.body.off("click", "#checkAnswerMobile").on("click", "#checkAnswerMobile", this.checkAnswer.bind(this));
        this.selector.body.off("click", "#retry").on("click", "#retry", this.retry.bind(this));
        this.selector.body.off("click", "#retryMobile").on("click", "#retryMobile", this.retry.bind(this));
    };

    CheckAnswerController.prototype.checkAnswer = function checkAnswer() {
        //method used to get response
        // this.assessmentController.resizeIframe();
        this.selector.retry.show();
        this.selector.retryMobile.show();
        this.selector.checkAnswer.hide();
        this.selector.checkAnswerMobile.hide();
        $(".inputClass").addClass('pointerEvent');
        this.assessmentController.checkAndUpdateSelectedOptions();
        this.assessmentController.getCorrectAnswer();
    };

    CheckAnswerController.prototype.retry = function retry() {
        // method used to give user a preference to retry for particular question
        // this.assessmentController.resizeIframe();
        this.selector.retry.hide();
        this.selector.retryMobile.hide();
        this.selector.checkAnswer.show();
        this.selector.checkAnswerMobile.show();
        $('#modalBodyPanel').html('');
        $(".inputClass").removeClass('pointerEvent');
        $('.alert').hide().removeClass('show');
        this.assessmentController.retry();
    };

    return CheckAnswerController;
})();

exports["default"] = CheckAnswerController;
;
module.exports = exports["default"];

},{}],4:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _saveState = require('./saveState');

var _saveState2 = _interopRequireDefault(_saveState);

var NavigationController = (function () {
    function NavigationController(assessmentControllerInstance) {
        _classCallCheck(this, NavigationController);

        this.assessmentController = assessmentControllerInstance;
        this.allQuestions = null;
        this.pageIndex = -1;
        _saveState2["default"].setAssesmentCtrl(assessmentControllerInstance);
        this.selector = {
            body: $("body"),
            prev: $("#prev"),
            prevMobile: $("#prevMobile"),
            next: $("#next"),
            nextMobile: $("#nextMobile")
        };
    }

    NavigationController.prototype.init = function init(data) {
        // initialises data
        this.allQuestions = data;
        this.bindEvents();
    };

    NavigationController.prototype.bindEvents = function bindEvents() {
        //method binds events to next and previous button
        this.selector.body.off("click", "#next").on("click", "#next", this.next.bind(this));
        this.selector.body.off("click", "#nextMobile").on("click", "#nextMobile", this.next.bind(this));
        this.selector.body.off("click", "#prev").on("click", "#prev", this.prev.bind(this));
        this.selector.body.off("click", "#prevMobile").on("click", "#prevMobile", this.prev.bind(this));
    };

    NavigationController.prototype.next = function next() {
        // method used to navigate to next button
        var currentQuestion = this.allQuestions[++this.pageIndex];
        _saveState2["default"].performBasicNavigationCheck(currentQuestion, this.pageIndex);
        if (this.pageIndex > 0) {
            this.selector.prev.prop('disabled', false);
            this.selector.prevMobile.prop('disabled', false);
        }
        if (this.pageIndex === this.allQuestions.length - 1) {
            this.selector.next.prop('disabled', true);
            this.selector.nextMobile.prop('disabled', true);
        }
    };

    NavigationController.prototype.prev = function prev() {
        // method used  to navigate to prev button
        var currentQuestion = this.allQuestions[--this.pageIndex];
        _saveState2["default"].performBasicNavigationCheck(currentQuestion, this.pageIndex);
        if (this.pageIndex === 0) {
            this.selector.prev.prop('disabled', true);
            this.selector.prevMobile.prop('disabled', true);
        }
        if (this.pageIndex < this.allQuestions.length) {
            this.selector.next.prop('disabled', false);
            this.selector.nextMobile.prop('disabled', false);
        }
    };

    return NavigationController;
})();

exports["default"] = NavigationController;
;
module.exports = exports["default"];

},{"./saveState":5}],5:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SaveStateController = (function () {
    function SaveStateController() {
        _classCallCheck(this, SaveStateController);

        this.assessmentController = '';
        this.selector = {
            retry: $("#retry"),
            retryMobile: $("#retryMobile"),
            checkAnswer: $("#checkAnswer"),
            checkAnswerMobile: $("#checkAnswerMobile")
        };
    }

    SaveStateController.prototype.setAssesmentCtrl = function setAssesmentCtrl(assessmentControllerInstance) {
        this.assessmentController = assessmentControllerInstance;
    };

    SaveStateController.prototype.performBasicNavigationCheck = function performBasicNavigationCheck(currentQuestion, pageIndex) {
        this.assessmentController.loadQuestion(currentQuestion, pageIndex);
        switch (currentQuestion.type) {
            case 'mcss':
            case 'mcms':
                this.saveStateForMcq(currentQuestion);
                break;
            case 'open-ended':
                this.saveStateForOpenEnded(currentQuestion);
                break;
        }
    };

    SaveStateController.prototype.saveStateForMcq = function saveStateForMcq(currentQuestion) {
        if (currentQuestion.choices !== null && currentQuestion.choices !== undefined) {
            if (currentQuestion.selectedOptions.length === 0) {
                $(".inputClass").removeClass('pointerEvent');
                this.selector.retry.hide();
                this.selector.retryMobile.hide();
                if (this.isOptionChecked(currentQuestion)) {
                    this.selector.checkAnswer.show().attr('disabled', false);
                    this.selector.checkAnswerMobile.show().attr('disabled', false);
                } else {
                    this.selector.checkAnswer.show().attr('disabled', true);
                    this.selector.checkAnswerMobile.show().attr('disabled', true);
                }
            } else {
                this.selector.retry.show();
                this.selector.retryMobile.show();
                this.selector.checkAnswer.hide();
                this.selector.checkAnswerMobile.hide();
                $(".inputClass").addClass('pointerEvent');
            }
        }
    };

    SaveStateController.prototype.saveStateForOpenEnded = function saveStateForOpenEnded(currentQuestion, prevQuestion) {
        this.selector.checkAnswer.hide();
        this.selector.checkAnswerMobile.hide();
        this.selector.retry.hide();
        this.selector.retryMobile.hide();
    };

    SaveStateController.prototype.isOptionChecked = function isOptionChecked(currentQuestion) {
        if (currentQuestion.choices.length > 0) {
            for (var i = 0; i < currentQuestion.choices.length; i++) {
                if (currentQuestion.choices[i].pinanswer === 1) {
                    return true;
                }
            }
        }
    };

    return SaveStateController;
})();

exports["default"] = new SaveStateController();
module.exports = exports["default"];

},{}],6:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Setup = (function () {
    function Setup() {
        _classCallCheck(this, Setup);
    }

    Setup.prototype.loadFooterPanel = function loadFooterPanel() {
        $("#checkAnswer,#checkAnswerMobile,#prev,#prevMobile,#next,#nextMobile").show();
    };

    Setup.prototype.hideNavigation = function hideNavigation() {
        $("#checkAnswer,#checkAnswerMobile").show();
    };

    return Setup;
})();

exports["default"] = new Setup();
module.exports = exports["default"];

},{}],7:[function(require,module,exports){
/**
 * Created by debayan.das on 09-11-2016.
 */
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ActivityData = (function () {
    function ActivityData() {
        _classCallCheck(this, ActivityData);

        this.questionText = null; // variable used to store the question
        this.choices = null; // variable used to store the choice    
        this.instructionText = null; // variable used to store the instruction
        this.correctAnswers = null; // variable used to store the correct answer
        this.type = null; // variable used to store the type
        this.mediaUrl = ""; // variable used to store the media address
        this.mediaHeight = null; // variable used to store the media height
        this.mediaWidth = null; // variable used to store the media width
        this.assetType = null; // variable used to store the assesment type
        this.openEndedType = null; // variable used to store the open ended question type
        this.sampleAnswer = null; // variable used to store the sample answer
        this.feedback = null; // variable used to store the feedback
        this.selectedOptions = []; // variable used to store the selected option
        this.responsetext = ""; // variable used to store the response
        this.answer = null; // variable used to store the answer
        this.openEndedClass = ""; // variable used to store the openended classname
        this.sampleAnswerClass = ""; // variable used to store the sample answer classname
        this.answerClass = ""; // variable used to store the answer classname
        this.btnLabelOpenEnded = "SHOW ANSWER"; // variable used to store the value of openended button label
        this.textAreaClass = ""; // variable used to store the classname of textarea
    }

    ActivityData.prototype.setChoices = function setChoices(choiceArray) {
        //method sets the choices of a question
        this.choices = choiceArray;
        this.correctAnswers = [];
        var currentChoice = undefined;
        for (var i = 0; i < choiceArray.length; i++) {
            currentChoice = choiceArray[i];
            if (currentChoice.assess) {
                this.correctAnswers.push(currentChoice);
            }
        }
    };

    ActivityData.prototype.getChoices = function getChoices() {
        // method returns the choices
        return this.choices;
    };

    ActivityData.prototype.getCorrectAnswers = function getCorrectAnswers() {
        // method returns correct responses
        return this.correctAnswers;
    };

    ActivityData.prototype.setQuestionText = function setQuestionText(questionText) {
        //method sets the text of the question
        this.questionText = questionText;
    };

    ActivityData.prototype.setInstructionText = function setInstructionText(instructionText) {
        this.instructionText = instructionText;
    };

    ActivityData.prototype.setAnswer = function setAnswer(answer) {
        this.answer = answer;
    };

    ActivityData.prototype.getAnswer = function getAnswer() {
        return this.answer;
    };

    ActivityData.prototype.setMediaParameters = function setMediaParameters(mediaObj, mediaType) {
        this.mediaUrl = mediaObj.url;
        if ((window.location.protocol === 'filesystem:' || window.location.protocol === 'file:') && mediaObj.type === 'brightcove') {

            this.mediaUrl = "http:" + this.mediaUrl;
        }
        this.mediaType = mediaObj.type;
        if (this.mediaType === 'brightcove') {
            this.mediaHeight = mediaObj.height;
            this.mediaWidth = mediaObj.width;
        } else {
            this.assetType = mediaObj.asset_type;
        }
    };

    ActivityData.prototype.getQuestionText = function getQuestionText() {
        // method gets the question's text
        return this.questionText;
    };

    ActivityData.prototype.setGlobalCorrectFeedback = function setGlobalCorrectFeedback(globalCorrectFeedback) {
        this.globalCorrectFeedback = globalCorrectFeedback;
    };

    ActivityData.prototype.getGlobalCorrectFeedback = function getGlobalCorrectFeedback() {
        // method gets the question's text
        return this.globalCorrectFeedback;
    };

    ActivityData.prototype.setGlobalInCorrectFeedback = function setGlobalInCorrectFeedback(globalInCorrectFeedback) {
        this.globalInCorrectFeedback = globalInCorrectFeedback;
    };

    ActivityData.prototype.getGlobalInCorrectFeedback = function getGlobalInCorrectFeedback() {
        // method gets the question's text
        return this.globalInCorrectFeedback;
    };

    ActivityData.prototype.getSampleAnswer = function getSampleAnswer() {
        return this.sampleAnswer;
    };

    ActivityData.prototype.getMediaParameters = function getMediaParameters(parameter) {
        if (parameter === 'url') {
            return this.mediaUrl;
        }
        if (parameter === 'height') {
            return this.mediaHeight;
        }
        if (parameter === 'width') {
            return this.mediaWidth;
        }
        if (parameter === 'type') {
            return this.mediaType;
        }
        if (parameter === 'assetType') {
            return this.assetType;
        }
    };

    ActivityData.prototype.getInstructionText = function getInstructionText() {
        return this.instructionText;
    };

    ActivityData.prototype.setType = function setType(type, openEndedType) {
        //method sets the type of the question for example :MCQ,MCSS
        this.type = type;
        if (type === 'open-ended') {
            this.openEndedType = openEndedType;
        }
    };

    ActivityData.prototype.setSampleAnswer = function setSampleAnswer(sampleAnswer) {
        this.sampleAnswer = sampleAnswer;
    };

    ActivityData.prototype.getType = function getType() {
        //method returns the type of the question
        return this.type;
    };

    ActivityData.prototype.getOpenendedType = function getOpenendedType() {
        return this.openEndedType;
    };

    ActivityData.prototype.addSelectedOption = function addSelectedOption(newOption) {
        this.selectedOptions.push(newOption);
    };

    ActivityData.prototype.resetSelectedOption = function resetSelectedOption() {
        this.selectedOptions = [];
    };

    ActivityData.prototype.resetPinanswer = function resetPinanswer() {
        for (var i = 0; i < this.choices.length; i++) {
            this.choices[i].pinanswer = 0;
        }
    };

    ActivityData.prototype.setPinanswer = function setPinanswer(index) {
        if (typeof index === 'number') {
            this.choices[index - 1].pinanswer = 1;
        } else if (typeof index === 'object') {
            for (var i = 0; i < this.choices.length; i++) {
                if (index.indexOf(this.choices[i].choiceid) > -1) {
                    this.choices[i].pinanswer = 1;
                } else {
                    this.choices[i].pinanswer = 0;
                }
            }
        }
    };

    ActivityData.prototype.setResponseText = function setResponseText(responsetext) {
        this.responsetext = responsetext;
    };

    ActivityData.prototype.getResponseText = function getResponseText() {
        return this.responsetext;
    };

    ActivityData.prototype.setOpenEndedClass = function setOpenEndedClass(btnClassName) {
        this.openEndedClass = btnClassName;
    };

    ActivityData.prototype.getOpenEndedClass = function getOpenEndedClass(btnClass) {
        return this.openEndedClass;
    };

    ActivityData.prototype.setSampleAnswerClass = function setSampleAnswerClass(className) {
        this.sampleAnswerClass = className;
    };

    ActivityData.prototype.getSampleAnswerClass = function getSampleAnswerClass() {
        return this.sampleAnswerClass;
    };

    ActivityData.prototype.setButtonLabel = function setButtonLabel(label) {
        this.btnLabelOpenEnded = label;
    };

    ActivityData.prototype.getButtonLabel = function getButtonLabel() {
        return this.btnLabelOpenEnded;
    };

    ActivityData.prototype.setAnswerClass = function setAnswerClass(answerClass) {
        this.answerClass = answerClass;
    };

    ActivityData.prototype.getAnswerClass = function getAnswerClass() {
        return this.answerClass;
    };

    ActivityData.prototype.setTextAreaClass = function setTextAreaClass(className) {
        this.textAreaClass = className;
    };

    ActivityData.prototype.getTextAreaClass = function getTextAreaClass() {
        return this.textAreaClass;
    };

    ActivityData.prototype.setFeedback = function setFeedback(feedback) {
        this.feedback = feedback;
    };

    ActivityData.prototype.getFeedback = function getFeedback() {
        return this.feedback;
    };

    return ActivityData;
})();

exports["default"] = ActivityData;
module.exports = exports["default"];

},{}],8:[function(require,module,exports){
/**
 * Created by debayan.das on 09-11-2016.
 */
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _data_serviceMcq_data_service = require("./data_service/mcq_data_service");

var _data_serviceMcq_data_service2 = _interopRequireDefault(_data_serviceMcq_data_service);

var _data_serviceOpen_ended_data_service = require("./data_service/open_ended_data_service");

var _data_serviceOpen_ended_data_service2 = _interopRequireDefault(_data_serviceOpen_ended_data_service);

var ActivityDataFactory = (function () {
    function ActivityDataFactory() {
        _classCallCheck(this, ActivityDataFactory);
    }

    ActivityDataFactory.prototype.getActivityDataFromJSON = function getActivityDataFromJSON(jsonData) {
        var allActivities = [],
            currentActivity = undefined;
        for (var i = 0; i < jsonData.length; i++) {
            currentActivity = jsonData[i];
            switch (currentActivity.QuestionData.question_type.text) {
                case "mcss":
                case "mcms":
                    allActivities.push(_data_serviceMcq_data_service2["default"].getActivityData(currentActivity));
                    break;
                case "open-ended":
                    allActivities.push(_data_serviceOpen_ended_data_service2["default"].getActivityData(currentActivity));
                    break;
                default:
                    console.log("in default");
            }
        }
        return allActivities;
    };

    return ActivityDataFactory;
})();

exports["default"] = new ActivityDataFactory();
module.exports = exports["default"];

},{"./data_service/mcq_data_service":9,"./data_service/open_ended_data_service":10}],9:[function(require,module,exports){
/**
 * Created by debayan.das on 09-11-2016.
 */
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _activity_data = require("../activity_data");

var _activity_data2 = _interopRequireDefault(_activity_data);

var MCQDataService = (function () {
    function MCQDataService() {
        _classCallCheck(this, MCQDataService);
    }

    MCQDataService.prototype.getActivityData = function getActivityData(activityDataJSON) {
        // method returns the filtered data from JSON file
        var activityData = new _activity_data2['default']();
        activityData.setQuestionText(activityDataJSON.QuestionData.question_stem.text);
        activityData.setInstructionText(activityDataJSON.QuestionData.instruction_text.text);
        activityData.setChoices(activityDataJSON.QuestionData.choices);
        this.setMediaParameters(activityDataJSON, activityData);
        activityData.setType(activityDataJSON.QuestionData.question_type.text);
        activityData.setGlobalCorrectFeedback(activityDataJSON.QuestionData.global_correct_feedback.text);
        activityData.setGlobalInCorrectFeedback(activityDataJSON.QuestionData.global_incorrect_feedback.text);
        return activityData;
    };

    MCQDataService.prototype.setMediaParameters = function setMediaParameters(activityDataJSON, activityData) {
        switch (activityDataJSON.QuestionData.media.type) {
            case 'brightcove':
                activityData.setMediaParameters(activityDataJSON.QuestionData.media, 'brightcove');
                break;
            case 'assets':
                activityData.setMediaParameters(activityDataJSON.QuestionData.media, 'assets');
                break;
        }
    };

    return MCQDataService;
})();

exports['default'] = new MCQDataService();
module.exports = exports['default'];

},{"../activity_data":7}],10:[function(require,module,exports){
/**
 * Created by Tarique.das on 20-10-2016.
 */
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _activity_data = require("../activity_data");

var _activity_data2 = _interopRequireDefault(_activity_data);

var OpenEndedDataService = (function () {
    function OpenEndedDataService() {
        _classCallCheck(this, OpenEndedDataService);
    }

    OpenEndedDataService.prototype.getActivityData = function getActivityData(activityDataJSON) {
        // method returns the filtered data from JSON file
        var activityData = new _activity_data2['default']();
        activityData.setQuestionText(activityDataJSON.QuestionData.question_stem.text);
        activityData.setInstructionText(activityDataJSON.QuestionData.instruction_text.text);
        activityData.setMediaParameters(activityDataJSON.QuestionData.media);
        if (activityDataJSON.QuestionData.question_type.text === 'open-ended') {
            activityData.setType(activityDataJSON.QuestionData.question_type.text, activityDataJSON.QuestionData.response_type);
            if (activityDataJSON.QuestionData.response_type.text === 'with-response') {
                activityData.setSampleAnswer(activityDataJSON.QuestionData.sample_answer.text);
                activityData.setFeedback(activityDataJSON.QuestionData.feedback.text);
            } else {
                activityData.setAnswer(activityDataJSON.QuestionData.answer.text);
            }
        } else {
            activityData.setType(activityDataJSON.QuestionData.question_type.text, null);
        }
        return activityData;
    };

    return OpenEndedDataService;
})();

exports['default'] = new OpenEndedDataService();
module.exports = exports['default'];

},{"../activity_data":7}],11:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MainActivity = (function () {
    function MainActivity() {
        _classCallCheck(this, MainActivity);

        if (this.constructor === MainActivity) {
            throw new Error("Abstract class can not be instantiated");
        }
    }

    MainActivity.prototype.loadMedia = function loadMedia() {
        //returns an iframe with the media
        var frameHtml = "",
            mediaUrl = this.assessmentData.getMediaParameters('url'),
            mediaType = this.assessmentData.getMediaParameters('type'),
            assetType = this.assessmentData.getMediaParameters('assetType');
        if (mediaUrl !== "") {
            switch (assetType) {
                case null:
                    frameHtml += "<iframe title='brightcove' class=\"mediaLoader\" frameborder=\"0\" src=" + mediaUrl + " height=" + this.assessmentData.getMediaParameters('height') + " width=" + this.assessmentData.getMediaParameters('width') + " allowfullscreen=\"allowfullscreen\" webkitallowfullscreen=\"allowfullscreen\" mozallowfullscreen=\"allowfullscreen\"  style=\"max-width: 100%\"></iframe>";
                    break;
                case 'image':
                    frameHtml += "<img tabindex=0 alt='image' src=" + mediaUrl + " >";
                    break;
                case 'video':
                    frameHtml += "<video tabindex=0 alt='video' width=\"400\" controls>\n       <source src=" + mediaUrl + "  type=\"video/mp4\">\n       </video>";
                    break;
            }
        }
        return frameHtml;
    };

    MainActivity.prototype.mediaClass = function mediaClass() {
        //method for getting the class related to media
        if (this.assessmentData.getMediaParameters('url') !== "") {
            switch (this.assessmentData.getMediaParameters('assetType')) {
                case null:
                    return;
                    break;
                default:
                    return 'resizer';
            }
        }
    };

    return MainActivity;
})();

exports["default"] = MainActivity;
module.exports = exports["default"];

},{}],12:[function(require,module,exports){
/**
 * Created by debayan.das on 19-09-2016.
 */
/** 
 *edited by tarique hussain
 */
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mcq = require("./mcq");

var _mcq2 = _interopRequireDefault(_mcq);

var MCMS = (function (_MCQ) {
    _inherits(MCMS, _MCQ);

    function MCMS(assessmentData) {
        _classCallCheck(this, MCMS);

        _MCQ.call(this);
        this.assessmentData = assessmentData;
    }

    MCMS.prototype.selectAnswers = function selectAnswers() {
        //method used to add a styles to options
        if ($('input[name="optionsRadios"]:checked').length === 0) {
            $("#checkAnswer,#checkAnswerMobile").attr('disabled', true);
        } else {
            $("#checkAnswer,#checkAnswerMobile").attr('disabled', false);
        }
        $('input[name="optionsRadios"]:not(:checked)').parents('.option').removeClass('selected');
        $('input[name="optionsRadios"]:checked').parents('.option').addClass('selected');
        $('.options .option').removeClass('rightanswer wronganswer');
        var chekedIndxArr = [],
            checkedIndx = $('input:checked');
        if (checkedIndx.length > 0) {
            for (var i = 0; i < checkedIndx.length; i++) {
                chekedIndxArr.push(parseInt(checkedIndx.eq(i).attr("id").split('checkbox')[1]));
            }
        }
        this.assessmentData.setPinanswer(chekedIndxArr);
    };

    MCMS.prototype.checkCorrectAnswer = function checkCorrectAnswer() {
        //method used to check the response
        this.assessmentData.resetPinanswer();
        $('.alert').hide();
        var correctChoiceId = [];
        var selectedbtnId = $('input:checked');
        if (selectedbtnId.length === this.assessmentData.getCorrectAnswers().length) {
            var totalCorrect = true;
            for (var i = 0; i < this.assessmentData.getCorrectAnswers().length; i++) {
                correctChoiceId.push(this.assessmentData.getCorrectAnswers()[i].choiceid);
            }
            for (var i = 0; i < selectedbtnId.length; i++) {
                if (correctChoiceId.indexOf(parseInt($(selectedbtnId[i]).attr("id").split('checkbox')[1])) === -1) {
                    totalCorrect = false;
                }
            }
            if (totalCorrect) {
                selectedbtnId.parents('.option').removeClass('selected').addClass('rightanswer');
                $('.alert-success').show().focus();
            } else {
                selectedbtnId.parents('.option').removeClass('selected').addClass('wronganswer');
                $('.alert-danger').show().focus();
            }
        } else {
            selectedbtnId.parents('.option').removeClass('selected').addClass('wronganswer');
            $('.alert-danger').show().focus();
        }
    };

    MCMS.prototype.render = function render(pageIndex) {
        // method returns the desired HTML which then gets rendered.
        this.wrongAnswerCounter = 0;
        this.rightAnswerCounter = 0;
        var list = "<section class=\"contentArea\">\n                    <section tabindex=0 class=\"question\">\n                    <div class=\"stem\">\n                    <div class=\"qst\">" + pageIndex + ": " + this.assessmentData.getQuestionText() + "</div>\n                    </div>\n                    </section>\n                    <section class=\"activity\">\n                    <div tabindex=0 class=\"instruction\">" + this.assessmentData.getInstructionText() + "</div>\n                    <div id=\"media\" class=" + this.mediaClass() + ">" + this.loadMedia() + "</div>\n                    <ul class=\"options\">" + this.getChoiceList() + "</ul>\n                    <div class=\"clearfix\"></div>\n                    </section>";
        list += this.addGlobalLabelFeedBack();
        list += "</section>";

        if (this.wrongAnswerCounter > 0) {
            return list.replace(/rightanswer/g, 'wronganswer');
        } else if (this.rightAnswerCounter !== this.assessmentData.getCorrectAnswers().length) {
            return list.replace(/rightanswer/g, 'wronganswer');
        } else {
            return list;
        }
    };

    MCMS.prototype.getChoiceList = function getChoiceList() {
        // method return the checkbox option html
        var choiceList = "",
            allChoices = this.assessmentData.getChoices();
        for (var i = 0; i < allChoices.length; i++) {
            choiceList += "<li class=\"col-md-12\">\n                            <div class=\"option " + this.checkItemAttemptState(allChoices[i]) + "\">\n                            <div class=\"checkbox inputClass\">\n                            <label><input type=\"checkbox\" name=\"optionsRadios\" id=\"checkbox" + (i + 1) + "\"                                               value=\"option" + (i + 1) + "\" " + this.isItemChecked(allChoices[i]) + ">" + allChoices[i].text + "</label>\n                            </div>\n                            <div class=\"sign\"><div class=\"sr-only\"></div><span class=\"fa\"></span></div>\n                            </div>\n                            </li>";
        }
        return choiceList;
    };

    MCMS.prototype.submittedCheckedItemState = function submittedCheckedItemState(item) {
        if (this.assessmentData.selectedOptions.indexOf(String(item.choiceid)) === -1) {
            return;
        }
        if (this.assessmentData.selectedOptions.indexOf(String(item.choiceid)) > -1 && item.assess === true) {
            this.rightAnswerCounter++;
            return "rightanswer";
        }
        if (this.assessmentData.selectedOptions.indexOf(String(item.choiceid)) > -1 && item.assess === false) {
            this.wrongAnswerCounter++;
            return "wronganswer";
        }
    };

    MCMS.prototype.checkItemAttemptState = function checkItemAttemptState(item) {
        //method return the classname for already selected right or wrong answer
        if (this.assessmentData.selectedOptions.length === 0 && item.pinanswer === 1) {
            return "selected";
        }
        if (this.assessmentData.selectedOptions.length > 0) {
            return this.submittedCheckedItemState(item);
        }
    };

    return MCMS;
})(_mcq2["default"]);

exports["default"] = MCMS;
module.exports = exports["default"];

},{"./mcq":13}],13:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mainActivity = require('./mainActivity');

var _mainActivity2 = _interopRequireDefault(_mainActivity);

var MCQ = (function (_MainActivity) {
    _inherits(MCQ, _MainActivity);

    function MCQ() {
        _classCallCheck(this, MCQ);

        _MainActivity.call(this);
        if (this.constructor === MCQ) {
            throw new Error("Abstract class can not be instantiated");
        }
        this.pageIndex = 1;
    }

    MCQ.prototype.bindEvents = function bindEvents() {
        //method binds click events checkbox & radio button
        $("#playground").off("click", "input").on("click", "input", this.selectAnswers.bind(this));
        $('.feedBackIcon').off().on('click keypress', function (e) {
            if (e.keyCode === 13 || e.type === "click") {
                var feedBackText = [];
                feedBackText = $(this).parent().text().split('|#@~');
                if ($(this).parents('.rightanswer').length) {
                    $('#modalBodyPanel').html(feedBackText[0]);
                    $('#myModal').modal('show');
                } else if ($(this).parents('.wronganswer').length) {
                    $('#modalBodyPanel').html(feedBackText[1]);
                    $('#myModal').modal('show');
                }
            }
        });
    };

    MCQ.prototype.updateSelectedOptions = function updateSelectedOptions() {
        //method for updating selected option
        var selectedInput = $('input:checked');
        this.assessmentData.resetSelectedOption();
        for (var i = 0; i < selectedInput.length; i++) {
            this.assessmentData.addSelectedOption($(selectedInput[i]).attr("id").split('checkbox')[1]);
        }
    };

    MCQ.prototype.isItemChecked = function isItemChecked(item) {
        //method for checking the item is already selected or not
        if (this.assessmentData.selectedOptions.length === 0) {
            return item.pinanswer === 1 ? "checked" : "";
        }
        return this.assessmentData.selectedOptions.indexOf(String(item.choiceid)) > -1 ? "checked" : "";
    };

    MCQ.prototype.retry = function retry() {
        //method allows user to retry for a question
        this.assessmentData.resetPinanswer();
        this.assessmentData.resetSelectedOption();
        $('input[name="optionsRadios"]').prop('disabled', false);
        $("#checkAnswer,#checkAnswerMobile").attr('disabled', true);
        $('input[name="optionsRadios"]:checked').prop('checked', false);
        $('input[name="optionsRadios"]').parents('.option').removeClass('selected wronganswer rightanswer');
    };

    MCQ.prototype.isCorrectFedbckVisible = function isCorrectFedbckVisible(wrongAnswerCounter, rightAnswerCounter) {
        //method decide the flag to show the correct feedback panel
        if (wrongAnswerCounter === 0 && rightAnswerCounter === 0 || wrongAnswerCounter > 0 || rightAnswerCounter !== this.assessmentData.getCorrectAnswers().length) {
            return;
        }
        return 'show';
    };

    MCQ.prototype.isInCorrectFedbckVisible = function isInCorrectFedbckVisible(wrongAnswerCounter, rightAnswerCounter) {
        //method decide the flag to show the incorrect feedback panel
        if (wrongAnswerCounter > 0 && rightAnswerCounter !== this.assessmentData.getCorrectAnswers().length) {
            return 'show';
        }
        if (wrongAnswerCounter === 0 && rightAnswerCounter === 0) {
            return;
        }
        return;
    };

    MCQ.prototype.addGlobalLabelFeedBack = function addGlobalLabelFeedBack() {
        //method return the global correct & incorrect feedback html
        var globalFeedbackHtml = '';
        if (this.assessmentData.getGlobalCorrectFeedback().replace(/^\s+|\s+$/gm, '') !== "") {
            globalFeedbackHtml += "<section tabindex=0 class=\"alert alert-success " + this.isCorrectFedbckVisible(this.wrongAnswerCounter, this.rightAnswerCounter) + "\">" + this.assessmentData.getGlobalCorrectFeedback() + "</section>";
        }
        if (this.assessmentData.getGlobalInCorrectFeedback().replace(/^\s+|\s+$/gm, '') !== "") {
            globalFeedbackHtml += "<section tabindex=0 class=\"alert alert-danger " + this.isInCorrectFedbckVisible(this.wrongAnswerCounter, this.rightAnswerCounter) + "\">" + this.assessmentData.getGlobalInCorrectFeedback() + "</section>";
        }
        return globalFeedbackHtml;
    };

    return MCQ;
})(_mainActivity2["default"]);

exports["default"] = MCQ;
module.exports = exports["default"];

},{"./mainActivity":11}],14:[function(require,module,exports){
/**
 * Created by debayan.das on 19-09-2016.
 */
/** 
 *edited by tarique hussain
 */
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mcq = require("./mcq");

var _mcq2 = _interopRequireDefault(_mcq);

var MCSS = (function (_MCQ) {
    _inherits(MCSS, _MCQ);

    function MCSS(assessmentData) {
        _classCallCheck(this, MCSS);

        _MCQ.call(this);
        this.assessmentData = assessmentData;
    }

    MCSS.prototype.selectAnswers = function selectAnswers() {
        //method used to add a styles to options
        if ($('input[name="optionsRadios"]:checked').length === 0) {
            $("#checkAnswer,#checkAnswerMobile").attr('disabled', true);
        } else {
            $("#checkAnswer,#checkAnswerMobile").attr('disabled', false);
        }
        $('input[name="optionsRadios"]:not(:checked)').parents('.option').removeClass('selected');
        $('input[name="optionsRadios"]:checked').parents('.option').addClass('selected');
        $('.options .option').removeClass('rightanswer wronganswer');
        this.assessmentData.resetPinanswer();
        this.assessmentData.setPinanswer(parseInt($('input:checked').attr("id").split('checkbox')[1]));
    };

    MCSS.prototype.checkCorrectAnswer = function checkCorrectAnswer() {
        //method used to validate the correct & incorrect answer
        this.assessmentData.resetPinanswer();
        $('.alert').hide();
        $('input[name="optionsRadios"]').prop('disabled', true);
        var selectedbtnId = undefined,
            rightanswerChoiceId = undefined;
        selectedbtnId = $('input:checked').attr("id").split('checkbox')[1];
        rightanswerChoiceId = this.assessmentData.getCorrectAnswers()[0].choiceid;
        if (selectedbtnId === String(rightanswerChoiceId)) {
            $('input[name="optionsRadios"]:checked').parents('.option').removeClass('selected').addClass('rightanswer');
            $('.alert-success').show().focus();
        } else {
            $('input[name="optionsRadios"]:checked').parents('.option').removeClass('selected').addClass('wronganswer');
            $('.alert-danger').show().focus();
        }
    };

    MCSS.prototype.render = function render(pageIndex) {
        // method returns the desired HTML which then gets rendered.
        this.wrongAnswerCounter = 0;
        this.rightAnswerCounter = 0;
        var list = "<section class=\"contentArea\">\n                    <section tabindex=0 class=\"question\">\n                    <div class=\"stem\">\n                    <div class=\"qst\">" + pageIndex + ": " + this.assessmentData.getQuestionText() + "</div>\n                    </div>\n                    </section>\n                    <section class=\"activity\">\n                    <div tabindex=0  class=\"instruction\">" + this.assessmentData.getInstructionText() + "</div>\n                    <div id=\"media\" class=" + this.mediaClass() + ">" + this.loadMedia() + "</div>\n                    <ul class=\"options\">" + this.getChoiceList() + "</ul>\n                    <div class=\"clearfix\"></div>\n                    </section>";
        list += this.addGlobalLabelFeedBack();
        list += "</section>";

        return list;
    };

    MCSS.prototype.getChoiceList = function getChoiceList() {
        //method build the radio button html list
        var choiceList = "",
            allChoices = this.assessmentData.getChoices();
        for (var i = 0; i < allChoices.length; i++) {
            choiceList += "<li class=\"col-md-12\">\n                            <div class=\"option " + this.checkItemAttemptState(allChoices[i]) + "\">\n                            <div class=\"radio inputClass\">\n                            <label><input type=\"radio\" name=\"optionsRadios\" id=\"checkbox" + (i + 1) + "\" value=\"option" + (i + 1) + "\" " + this.isItemChecked(allChoices[i]) + ">" + allChoices[i].text + "</label>\n                            </div>\n                            <div class=\"sign\"><div class=\"sr-only\"></div><span class=\"fa\"></span></div>";
            if (this.addOptionLevelFeedback(allChoices[i]) !== undefined) {
                choiceList += this.addOptionLevelFeedback(allChoices[i]);
            }
            choiceList += "</div></li>";
        }
        return choiceList;
    };

    MCSS.prototype.addOptionLevelFeedback = function addOptionLevelFeedback(allChoices) {
        //method used to decide the option lebel feedback
        if (allChoices.correct_feedback.replace(/^\s+|\s+$/gm, '') !== "" && allChoices.incorrect_feedback.replace(/^\s+|\s+$/gm, '') !== "" || allChoices.correct_feedback.replace(/^\s+|\s+$/gm, '') !== '' && allChoices.assess === true || allChoices.incorrect_feedback.replace(/^\s+|\s+$/gm, '') !== '' && allChoices.assess === false) {
            return "<div class=\"fdback\" data-toggle=\"modal\"><div class=\"sr-only\" aria-hidden=\"true\" aria-label=\"Click to open feedback\">" + allChoices.correct_feedback + "|#@~" + allChoices.incorrect_feedback + "</div><span tabindex=0 class=\"fa fa-commenting-o feedBackIcon\"></span></div>";
        }
    };

    MCSS.prototype.submittedCheckedItemState = function submittedCheckedItemState(item) {
        if (String(item.choiceid) === this.assessmentData.selectedOptions[0] && item.assess === true) {
            this.rightAnswerCounter++;
            return "rightanswer";
        } else if (String(item.choiceid) === this.assessmentData.selectedOptions[0] && item.assess === false) {
            this.wrongAnswerCounter++;
            return "wronganswer";
        } else {
            return;
        }
    };

    MCSS.prototype.checkItemAttemptState = function checkItemAttemptState(item) {
        //method used to add the selected or right & wrong answer class
        if (this.assessmentData.selectedOptions.length === 0 && item.pinanswer === 1) {
            return "selected";
        }
        if (this.assessmentData.selectedOptions.length > 0) {
            return this.submittedCheckedItemState(item);
        }
    };

    return MCSS;
})(_mcq2["default"]);

exports["default"] = MCSS;
module.exports = exports["default"];

},{"./mcq":13}],15:[function(require,module,exports){
/*
 *created by tarique hussain on 10.20.16 */

"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mainActivity = require('./mainActivity');

var _mainActivity2 = _interopRequireDefault(_mainActivity);

var OpenWithResponse = (function (_MainActivity) {
    _inherits(OpenWithResponse, _MainActivity);

    function OpenWithResponse(assessmentData) {
        _classCallCheck(this, OpenWithResponse);

        _MainActivity.call(this);
        this.assessmentData = assessmentData;
    }

    OpenWithResponse.prototype.bindEvents = function bindEvents() {
        //binds events to buttons presnt in DOM
        $("body").off("click", "#toggler").on("click", "#toggler", this.submitForm.bind(this));
        $("body").off("blur", "#responseArea").on("blur", "#responseArea", this.textInteractivity.bind(this));
    };

    OpenWithResponse.prototype.render = function render(pageIndex) {
        // method returns the desired HTML which then gets rendered.
        var list = "<section class=\"contentArea\">\n                    <section tabindex=0 class=\"question\">\n                    <div class=\"stem\">\n                    <div class=\"qst\">" + pageIndex + ": " + this.assessmentData.getQuestionText() + "</div>\n                    </div>\n                    </section>\n                    <section class=\"activity\">\n                    <div tabindex=0 class=\"instruction\">" + this.assessmentData.getInstructionText() + "</div>\n                    <div id=\"media\" class=" + this.mediaClass() + ">" + this.loadMedia() + "</div>\n                    <form>\n                    <div class=\"form-group\">\n                    <textarea class=\"form-control " + this.assessmentData.getTextAreaClass() + "\" rows=\"5\" id=\"responseArea\">" + this.assessmentData.getResponseText() + "</textarea>\n                    </div>\n                    </form>\n                    <button id=\"toggler\" class=\"btn btn-primary " + this.assessmentData.getOpenEndedClass() + "\">Submit</button>\n                    <h5 tabindex=0 class=\"" + this.assessmentData.getSampleAnswerClass() + " openFeedback\"><strong>Feedback:</strong><br>" + this.assessmentData.getFeedback() + "</h5>\n                    <h5 tabindex=0 class=\"" + this.assessmentData.getSampleAnswerClass() + "\"><strong>Sample Answer:</strong><br>" + this.assessmentData.getSampleAnswer() + "</h5>\n                    <div class=\"clearfix\"></div>\n                    </section>\n                    </section>";
        return list;
    };

    OpenWithResponse.prototype.textInteractivity = function textInteractivity() {
        //method extracts the text from the text area
        this.assessmentData.setResponseText($('#responseArea').val());
    };

    OpenWithResponse.prototype.submitForm = function submitForm() {
        //method submits the form and disables the text area
        this.assessmentData.setOpenEndedClass('hideBtn');
        this.assessmentData.setSampleAnswerClass('showSampleAnswer');
        this.assessmentData.setTextAreaClass('textAreaDisabled');
        $('h5').show();
        $('#responseArea').prop('disabled', true);
        $('#toggler').hide();
        $('.openFeedback').focus();
    };

    return OpenWithResponse;
})(_mainActivity2["default"]);

exports["default"] = OpenWithResponse;
module.exports = exports["default"];

},{"./mainActivity":11}],16:[function(require,module,exports){
/*
 *created by tarique hussain on 10.20.16 */

"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mainActivity = require('./mainActivity');

var _mainActivity2 = _interopRequireDefault(_mainActivity);

var OpenWithoutResponse = (function (_MainActivity) {
    _inherits(OpenWithoutResponse, _MainActivity);

    function OpenWithoutResponse(assessmentData) {
        _classCallCheck(this, OpenWithoutResponse);

        _MainActivity.call(this);
        this.assessmentData = assessmentData;
    }

    OpenWithoutResponse.prototype.bindEvents = function bindEvents() {
        //binfs events to button present in DOM
        $("body").off("click", "#toggler").on("click", "#toggler", this.showAnswer.bind(this));
    };

    OpenWithoutResponse.prototype.render = function render(pageIndex) {
        // method returns the desired HTML which then gets rendered.
        var list = "<section class=\"contentArea\">\n                    <section tabindex=0 class=\"question\">\n                    <div class=\"stem\">\n                    <div class=\"qst\">" + pageIndex + ": " + this.assessmentData.getQuestionText() + "</div>\n                    </div>\n                    </section>\n                    <section class=\"activity\">\n                    <div tabindex=0 class=\"instruction\">" + this.assessmentData.getInstructionText() + "</div>\n        <div id=\"media\" class=" + this.mediaClass() + ">" + this.loadMedia() + "</div>\n                    <button id=\"toggler\" class=\"btn btn-primary\">" + this.assessmentData.getButtonLabel() + "</button>\n                    <h5 id=\"answer\" tabindex=0 class=\"" + this.assessmentData.getAnswerClass() + "\">" + this.assessmentData.getAnswer() + "</h5>\n                    <div class=\"clearfix\"></div>\n                    </section>\n                    </section>";
        return list;
    };

    OpenWithoutResponse.prototype.showAnswer = function showAnswer() {
        //method is triggered when button is clicked,it toggles between hide and show.
        if ($('#toggler').text() === 'SHOW ANSWER') {
            this.assessmentData.setAnswerClass('showAnswer');
            this.assessmentData.setButtonLabel('HIDE ANSWER');
            $('h5').show();
            $('#answer').focus();
            $('#toggler').text('HIDE ANSWER');
        } else {
            this.assessmentData.setAnswerClass('hideAnswer');
            this.assessmentData.setButtonLabel('SHOW ANSWER');
            $('h5').hide();
            $('#toggler').text('SHOW ANSWER');
        }
    };

    return OpenWithoutResponse;
})(_mainActivity2["default"]);

exports["default"] = OpenWithoutResponse;
module.exports = exports["default"];

},{"./mainActivity":11}],17:[function(require,module,exports){
/**
 * Created by debayan.das on 19-09-2016.
 */
"use strict";

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _mcssJs = require("./mcss.js");

var _mcssJs2 = _interopRequireDefault(_mcssJs);

var _mcmsJs = require("./mcms.js");

var _mcmsJs2 = _interopRequireDefault(_mcmsJs);

var _openWithResponse = require("./openWithResponse");

var _openWithResponse2 = _interopRequireDefault(_openWithResponse);

var _openWithoutResponse = require("./openWithoutResponse");

var _openWithoutResponse2 = _interopRequireDefault(_openWithoutResponse);

var TemplateProvider = (function () {
    function TemplateProvider() {
        _classCallCheck(this, TemplateProvider);
    }

    TemplateProvider.prototype.get = function get(question) {
        // method returns the desired template
        switch (question.getType()) {
            case "mcss":
                return new _mcssJs2["default"](question);
                break;
            case "mcms":
                return new _mcmsJs2["default"](question);
                break;
            case "open-ended":
                if (question.getOpenendedType().text === 'without-response') {
                    return new _openWithoutResponse2["default"](question);
                }
                return new _openWithResponse2["default"](question);
                break;
            default:
                console.log("default");
        }
    };

    return TemplateProvider;
})();

exports["default"] = new TemplateProvider();
module.exports = exports["default"];

},{"./mcms.js":12,"./mcss.js":14,"./openWithResponse":15,"./openWithoutResponse":16}]},{},[1]);
