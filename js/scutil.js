/**
 * File Name: scutil.js
 *
 * Revision History:
 *       Sapana Chhetri, 2024-02-19 : Created
 */
function doValidate_frmAdd() {
    const form = $("#frmAdd");
    form.validate({
        rules: {
            txtbusinessName: {
                required: true,
                rangelength: [2, 20]
            },
            txtreviewerEmail:{
                required: true,
                email:true,
                //emailcheck: true
            },
            reviewerDate:{
                required:true
            },

            foodQuality:{
                ratingRange: true
            },
            service:{
                ratingRange: true
            },
            value:{
                ratingRange: true
            }

        },
        messages: {
            txtbusinessName: {
                required: "You must provide a business name",
                rangelength: "Name must be 2 to 20 characters long"
            },
            txtreviewerEmail: {
                required:"Email is required",
                email: "Enter a valid email"
            },
            reviewerDate:{
                required: "Reviewer date is required"
            },
            foodQuality:{
                ratingRange: "Value must be 0 to 5"
            },
            service :{
                ratingRange: "Value must be 0 to 5"
            },
            value:{
                ratingRange: "Value must be 0 to 5"
            }
        }
    });
    return form.valid();
}

function dovalidate_frmModify(){
    const form=$("#frmModifyPage");
    form.validate({
        rules: {
            modifybusinessName: {
                required: true,
                rangelength: [2, 20]
            },
            modifyreviewerEmail:{
                required: true,
                email: true
            },
            modifyreviewerDate:{
                required:true
            },
            modifyFoodQuality:{
                ratingRange: true
            },
            modifyService:{
                ratingRange: true
            },
            modifyValue:{
                ratingRange: true
            }
        },
        messages: {
            modifybusinessName: {
                required: "You must provide a business name",
                rangelength: "Name must be 2 to 20 characters long"
            },
            modifyreviewerEmail: {
                required:"Email is required",
                email: "Enter a valid email"
            },
            modifyreviewerDate:{
                required: "Reviewer date is required"
            },
            modifyFoodQuality:{
                ratingRange: "Value must be 0 to 5"
            },
            modifyService :{
                ratingRange: "Value must be 0 to 5"
            },
            modifyValue:{
                ratingRange: "Value must be 0 to 5"
            }
        }
    });
    return form.valid();
}
// jQuery.validator.addMethod(
//     "emailcheck",
//     function(value, element){
//         const regex = /^[^\s@]+@gmail\.com$/;
//         return this.optional(element) || regex.test(value);
//     },
//     "Valid Email Checker"
// );
jQuery.validator.addMethod(
    "ratingRange",
    function (value, elment){
        return !isNaN(value) && parseInt(value) >= 0 && parseInt(value) <= 5;
    },
    "Value must be 0 to 5"
);

