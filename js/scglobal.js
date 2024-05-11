/**
 * File Name: scglobal.js
 *
 * Revision History:
 *       Sapana Chhetri, 2024-02-19 : Created
 *       Sapana Chhetri, 2024 03-30 : Make changes
 */

function  chckRate_checked(){
    showRatingForm();
}
function  modifycheckRate_checked(){
    showModifyRatingForm();
}
function  btnSave_click(){
    addFeedback();

}
function btnupdate_click(){
    updateFeedback();
}
function  overallRating_change(){
    showOverallRating();
}
function modifyOverallRating_change() {
    showModifyOverallRating();
}
function  btnSaveDefaults_click(){
    saveEmail();
}
function pageList_show() {
    getReviews();
}
function btnCancel_click(){
    getReviews();
}
function pageDetail_show(){
    showCurrentReview();
}
function btnDelete_click(){
    deleteReview();
}
function btnClearReviews_click(){
    clearReviews();
}
function addPage_show(){
    addPageShow();
}

function init(){
    console.log("Dom is ready");
    $("#chckRate").on("change", chckRate_checked);
    $("#modifychckRate").on("change", modifycheckRate_checked);
    $("#btnSave").on("click",btnSave_click);
    $("#btnCancel").on("click",btnCancel_click);
    $("#btnUpdate").on("click", btnupdate_click);
    $("#btnDelete").on("click", btnDelete_click);
    $("#btnSaveDefaults").on("click", btnSaveDefaults_click);
    $("#foodQuality").on("input", overallRating_change);
    $("#value").on("input", overallRating_change);
    $("#service").on("input", overallRating_change);
    $("#modifyService").on("input", modifyOverallRating_change);
    $("#modifyFoodQuality").on("input", modifyOverallRating_change);
    $("#modifyValue").on("input", modifyOverallRating_change);
    $("#btnClearAllReviews").on("click", btnClearReviews_click);
    $("#scViewFeedbackPage").on("pageshow", pageList_show);
    $("#scModifyFeedbackPage").on("pageshow", pageDetail_show);
    $("#scAddFeedbackPage").on("pageshow", addPage_show);
    // Set the email in default reviewerEmail input field
    $("#defaultReviewerEmail").val("SapanaChhetri34@gmail.com");

    // Store the email in local storage
    localStorage.setItem("defaultReviewerEmail", "SapanaChhetri34@gmail.com");


}

function initDB(){
    initDatabase();

}

$(document).ready(function () {
    init();
    initDB();
});



