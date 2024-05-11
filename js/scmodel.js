/**
 * File Name: scmodel.js.js
 *
 * Revision History:
 *       Sapana Chhetri, 2024-03-28 : Created
 */
class Review {
    constructor( businessName, reviewerEmail, reviewerComments, reviewerDate, hasRating, rating1, rating2, rating3, typeId) {
        this.businessName = businessName;
        this.reviewerEmail = reviewerEmail;
        this.reviewerComments = reviewerComments;
        this.reviewerDate = reviewerDate;
        this.hasRating = hasRating;
        this.rating1 = rating1;
        this.rating2 = rating2;
        this.rating3 = rating3;
        this.typeId = typeId;
    }
}