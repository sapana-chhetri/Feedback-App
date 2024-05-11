/**
 * File Name: scfacade.js
 *
 * Revision History:
 *       Sapana Chhetri, 2024-02-19 : Created
 */
function showRatingForm() {
    var ratingFields = document.getElementById("ratingFields");
    if ($("#chckRate").is(":checked")) {
        ratingFields.style.display = "block";
    } else {
        ratingFields.style.display = "none";
    }
}
function showModifyRatingForm(){
    var modifyRatingFields = document.getElementById("modifyratingFields");
    if ($("#modifychckRate").is(":checked")) {
        modifyRatingFields.style.display = "block";
    } else {
        modifyRatingFields.style.display = "none";
    }
}
function  addFeedback(){
    if(doValidate_frmAdd()){
        console.log("Add form is Valid");
        const businessName= $("#txtbusinessName").val();
        const reviewerEmail=$("#txtreviewerEmail").val();
        const reviewerDate=$("#reviewerDate").val();
        const reviewerComments=$("#reviewerComments").val();
        const hasRating= $("#chckRate").prop("checked");
        // Get the selected dropdown value
        const selectedTypeid = $("#cmbType").val();
        console.log("Selected Type:", selectedTypeid);



        // // Find the corresponding type ID based on the selected value
        // let typeId;
        // typesData.forEach((type) => {
        //     if (type.name === selectedType) {
        //         typeId = type.id;
        //     }
        // });
        let rating1,rating2,rating3;
        if(hasRating){
             rating1 = parseInt($("#foodQuality").val());
             rating2 = parseInt($("#service").val());
             rating3= parseInt($("#value").val());
        }
        else{
            rating1=0;
            rating2=0;
            rating3=0;
        }


        const review = new Review(businessName,reviewerEmail,reviewerComments,reviewerDate,hasRating,rating1,rating2,rating3,selectedTypeid);

        Reviews.insert(review).then((data)=>{
            console.log(data);
            alert("Record added successfully, id: " + data.target.result);
        }).catch((e)=>{
            console.log("Error: " + e);
        });
        // Calculate overall rating
        const overallRating =(foodQuality+service+value)*100/15;
        // Update the overall rating input field
        $("#overallRating").val(overallRating+"%");

    }
    else {
        console.log("Add form is not valid");
    }
}
function showOverallRating(){
    const foodQuality = parseInt($("#foodQuality").val());
    const service = parseInt($("#service").val());
    const value= parseInt($("#value").val());
    // Check if all inputs have values
    if (!isNaN(foodQuality) && !isNaN(service) && !isNaN(value)) {
        // Calculate overall rating
        let overallRating = (foodQuality + service + value) * 100 / 15;
        // Round off the overall rating to two decimal places
        overallRating = overallRating.toFixed(2);

        // Update the overall rating input field
        $("#overallRating").val(overallRating + "%");
    }

}
function showModifyOverallRating(){
    const foodQuality = parseInt($("#modifyFoodQuality").val());
    const service = parseInt($("#modifyService").val());
    const value= parseInt($("#modifyValue").val());
    // Check if all inputs have values
    if (!isNaN(foodQuality) && !isNaN(service) && !isNaN(value)) {
        // Calculate overall rating
        let overallRating = (foodQuality + service + value) * 100 / 15;
        // Round off the overall rating to two decimal places
        overallRating = overallRating.toFixed(2);

        // Update the overall rating input field
        $("#modifyoverallRating").val(overallRating + "%");
    }
}

function updateFeedback(){
    if (dovalidate_frmModify()) {
        console.log("Modify form is valid");

       const id = Number(localStorage.getItem("id"));
        const businessName = $("#modifybusinessName").val();
        const reviewerEmail = $("#modifyreviewerEmail").val();
        const reviewerDate = $("#modifyreviewerDate").val();
        const reviewerComments = $("#modifyreviewerComments").val();
        const hasRating = $("#modifychckRate").prop("checked");
        const typeId = $("#modifycmbType").val();
        let rating1, rating2, rating3;

        if (hasRating) {
            rating1 = parseInt($("#modifyFoodQuality").val());
            rating2 = parseInt($("#modifyService").val());
            rating3 = parseInt($("#modifyValue").val());
        } else {
            rating1 = 0;
            rating2 = 0;
            rating3 = 0;
            // Also update the corresponding input fields to show 0
            $("#modifyFoodQuality").val(0);
            $("#modifyService").val(0);
            $("#modifyValue").val(0);
        }
        // Create a review object with updated values
        const review = new Review(businessName, reviewerEmail, reviewerComments, reviewerDate, hasRating, rating1, rating2, rating3, typeId);
        review.id=id;
        // Call the update CRUD operation of reviews store
        Reviews.update(review).then(() => {
            // Show alert indicating successful update
            alert("Feedback updated successfully");
        }).catch((error) => {
            console.error("Error updating feedback:", error);
            // Show alert for any errors during update
            alert("Error updating feedback. Please try again later.");
        });
    }
    else{
        console.log("Mofify form is not valid")
    }
}
function saveEmail() {

    // Get the updated default reviewer email from the input field
    var defaultReviewerEmail = $("#defaultReviewerEmail").val();

    // Save the default reviewer email to local storage
    localStorage.setItem("defaultReviewerEmail", defaultReviewerEmail);

    // Show an alert message indicating that the default email has been saved
    alert("Default reviewer email saved ");

}
function getReviews(){
    Reviews.selectAll().then((data)=>{
        console.log(data);
        let htmlCode = "";
        let lv = $("#lstViewFeedback");
        lv.empty();

        if (data.length === 0) {
            // Display "No record found" message
            htmlCode = "<li>No record found</li>";
        } else {
            for (let i = 0; i < data.length; i++) {
                const row = data[i];

                // Include overall ratings only if hasRating is true
                let overallRatingHTML = "";
                if (row.hasRating) {
                    overallRatingHTML = `<p>Overall Rating: ${calculateOverallRating(row.rating1, row.rating2, row.rating3)}%</p>`;
                }

                htmlCode += `<li><a data-role="button" href="#" data-row-id="${row.id}">
                        <h1>Business Name:${row.businessName}</h1>
                        <p>Reviewer Email:${row.reviewerEmail}</p>
                        ${overallRatingHTML}
                    </a></li>`;
            }
        }
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        $("#lstViewFeedback a").on("click", function(){
            localStorage.setItem("id", $(this).attr("data-row-id") );
            $.mobile.changePage("#scModifyFeedbackPage", {transition: 'none'})
        } );
    }).catch((e)=>{
        console.log(e);
    });
}

// Function to calculate overall rating
function calculateOverallRating(rating1, rating2, rating3) {
    const totalRating = rating1 + rating2 + rating3;
    const overallRating = (totalRating * 100) / 15;
    return Math.round(overallRating * 100) / 100; // Round to two decimal places
}

function showCurrentReview() {
    const id = Number(localStorage.getItem("id"));

    // Check if the retrieved 'id' is valid
    if (!isNaN(id)) {
        Reviews.select(id).then((review) => {
            console.log(review.reviewerDate);
            // Populate form fields with review data
            $("#txtId").val(review.id);
            $("#modifybusinessName").val(review.businessName);

            $("#modifyreviewerEmail").val(review.reviewerEmail);
            $("#modifyreviewerComments").val(review.reviewerComments);
            $("#modifyreviewerDate").val(review.reviewerDate);

            if (review.hasRating) {
                $("#modifychckRate").prop("checked", review.hasRating);
                $("#modifyratingFields").show();
                $("#modifyFoodQuality").val(review.rating1);
                $("#modifyService").val(review.rating2);
                $("#modifyValue").val(review.rating3);
                $("#modifyoverallRating").val(calculateOverallRating(review.rating1, review.rating2, review.rating3) + "%");
            } else {
                $("#modifyratingFields").hide();
                //$("#modifychckRate").prop("checked", review.hasRating);
                $("#modifyFoodQuality").val(review.rating1);
                $("#modifyService").val(review.rating2);
                $("#modifyValue").val(review.rating3);
                $("#modifyoverallRating").val(calculateOverallRating(review.rating1, review.rating2, review.rating3) + "%");

            }
            const typeId = review.typeId;
            const dropdown = $("#modifycmbType");

            // Select the option in the dropdown based on the typeId
            dropdown.val(typeId).change();

        });
    } else {
        console.error("Invalid or missing 'id' value from local storage.");
    }
}
function  deleteReview(){
    const id = Number(localStorage.getItem("id"));
    Reviews.delete(id).then((data)=>{
        alert("record deleted successfully");
        $.mobile.changePage("#scViewFeedbackPage", {transition: 'none'})
    }).catch((e)=>{
        console.log(e);
    });
}
function clearReviews(){
    const result = confirm("Do you really want to delete?")
    if (result ) {
        Reviews.deleteAll().then((data)=>{
            alert("All records deleted successfully");

        }).catch((e)=>{
            console.log(e);
        });
    }
}
function addPageShow(){
    $("#txtbusinessName").val("");
    const typeId=1;
    const dropdown = $("#cmbType");
    // Select the option in the dropdown based on the typeId
    dropdown.val(typeId).change();

    // Load the default email address from local storage and fill in the Reviewer Email field
    const defaultReviewerEmail = localStorage.getItem("defaultReviewerEmail");
    $("#txtreviewerEmail").val(defaultReviewerEmail);

    // Set Reviewer Comments to empty
    $("#reviewerComments").val("");

    // Set Review Date to empty
    $("#reviewerDate").val("");

    // Uncheck the 'Do you want to add your Rating?' checkbox
    $("#chckRate").prop("checked", false).checkboxradio("refresh");

    // Hide the rating fields and clear their values
    $("#ratingFields").hide();
    $("#foodQuality").val("");
    $("#service").val("");
    $("#value").val("");
    $("#overallRating").val("");
}
