/**
 * File Name: scdatabase.js
 *
 * Revision History:
 *       Sapana Chhetri, 2024-02-19 : Created
 */
var db;

const typesData = [
    { id: 1, name: "Others" },
    { id: 2, name: "Canadian" },
    { id: 3, name: "Asian" },
    { id: 4, name: "European" },
    { id: 5, name: "Australian" }
];


function createDatabase(){
    return new Promise((resolve, reject)=>{
        const request = indexedDB.open("SCFeedbackDB", 1);
        request.onerror = (event)=>{
            console.error("Error in creating database:", event.target.error);
            reject(event.target.error); // Reject the promise to indicate failure
        }

        request.onsuccess = (event)=>{
            console.log("onsuccess called");
            db = event.target.result;
            resolve(db);
        }

        request.onupgradeneeded = (event)=>{
            db = event.target.result;
            console.log("onupgradeneeded called");

            // Create types store
            const typesStore = db.createObjectStore("types", {
                keyPath: "id",
                autoIncrement: true
            });
            typesStore.createIndex("name", "name", { unique: true });

            // Populate types store with initial records
            typesData.forEach((type) => {
                typesStore.add(type);
            });

            // Create reviews store
            const reviewsStore = db.createObjectStore("reviews", {
                keyPath: "id",
                autoIncrement: true
            });
            // Define fields for reviews store
            reviewsStore.createIndex("businessName", "businessName");
            reviewsStore.createIndex("reviewerEmail", "reviewerEmail");
            reviewsStore.createIndex("reviewerComments","reviewerComments");
            reviewsStore.createIndex("reviewerDate", "reviewerDate");
            reviewsStore.createIndex("hasRating", "hasRating");
            reviewsStore.createIndex("rating1", "rating1");
            reviewsStore.createIndex("rating2", "rating2");
            reviewsStore.createIndex("rating3", "rating3");
            reviewsStore.createIndex("typeId", "typeId");
        };
    });
}