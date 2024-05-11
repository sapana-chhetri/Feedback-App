/**
 * File Name: scDal.js
 *
 * Revision History:
 *       Sapana Chhetri, 2024-02-19 : Created
 */
function initDatabase(){
    createDatabase().then((data)=>{
        console.log("Database created successfully");
        Types.selectAll().then((types) => {
            const dropdown = $("#cmbType");
            const dropdown2=$("#modifycmbType");
            dropdown.empty(); // Clear existing options
            dropdown2.empty();
            // Populate the dropdown with the retrieved types
            types.forEach((type) => {
                dropdown.append($("<option>").text(type.name).val(type.id)); // Set value attribute to typeId
                dropdown2.append($("<option>").text(type.name).val(type.id)); // Set value attribute to typeId
            });

        }).catch((error) => {
            console.error("Error fetching types:", error);
        });

    }).catch((e)=>{
        console.log("Error in database creation");
    });
}

const Reviews = {
    insert: function (review) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["reviews"], "readwrite");
            transaction.oncomplete = (event) => {
                console.log("Success: insert transaction successful");
            };
            transaction.onerror = () => console.log("Error: insert transaction failed :");
            const reviewsStore = transaction.objectStore("reviews");
            const req = reviewsStore.add(review); // Fix: pass review instead of reviews
            req.onsuccess = (event) => {
                console.log("Success: review added successfully");
                resolve(event);
            };
            req.onerror = (event) => {
                console.log("Error: error in insert : " + event);
                reject(event);
            };
        });
    },
    select: function (id) {
        return new Promise((resolve, reject)=>{
            const transaction = db.transaction(["reviews"]); //by default readonly
            transaction.oncomplete = (event)=>{
                console.log("Success: select transaction successful");
            }
            transaction.onerror = () => console.log("Error: select transaction failed :");
            const reviewsStore = transaction.objectStore("reviews");
            const req = reviewsStore.get(id);

            req.onsuccess = (event)=>{
                console.log(event.target.result)
                // resolve(event);
                event.target.result ? resolve(event.target.result) : resolve(null);

            }
            req.onerror = (event)=>{
                console.log("Error: error in select : " + event);
                reject(event);
            }

        });
    },
    selectAll:function () {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["reviews"]);
            transaction.oncomplete = (event) => {
                console.log("Success: select all transaction successful");
            }
            transaction.onerror = () => console.log("Error: select all transaction failed :");
            const reviewsStore = transaction.objectStore("reviews");
            const reviewCursor = reviewsStore.openCursor();

            let listOfReviews = [];

            reviewCursor.onsuccess = function (event) {
                const cursor = event.target.result;
                if (cursor) {
                    listOfReviews.push(cursor.value);
                    cursor.continue();
                } else {
                    // No more data, so return the list
                    resolve(listOfReviews);
                }
            }
        });
    },


    update: function(review){
        return new Promise((resolve, reject)=>{
            const transaction = db.transaction(["reviews"], "readwrite"); //by default readonly
            transaction.oncomplete = (event)=>{
                console.log("Success: update transaction successful");
            }
            transaction.onerror = () => console.log("Error: update transaction failed :");
            const reviewsStore = transaction.objectStore("reviews");

            const req = reviewsStore.put(review);
            req.onsuccess = (event)=>{
                console.log("Success: record updated successfully");
                resolve(event);
            }
            req.onerror = (event)=>{
                console.log("Error: error in update : " + event);
                reject(event);
            }

        });
    },
    delete: function (id) {
        return new Promise((resolve, reject)=>{
            const transaction = db.transaction(["reviews"], "readwrite"); //by default readonly
            transaction.oncomplete = (event)=>{
                console.log("Success: delete transaction successful");
            }
            transaction.onerror = () => console.log("Error: delete transaction failed :");
            const reviewsStore = transaction.objectStore("reviews");
            const req = reviewsStore.delete(id);
            req.onsuccess = (event)=>{
                console.log("Success: record deleted successfully");
                resolve(event);
            }
            req.onerror = (event)=>{
                console.log("Error: error in delete : " + event);
                reject(event);
            }
        });
    },
    deleteAll: function () {
        return new Promise((resolve, reject)=>{
            const transaction = db.transaction(["reviews"], "readwrite"); //by default readonly
            transaction.oncomplete = (event)=>{
                console.log("Success: delete all transaction successful");
            }
            transaction.onerror = () => console.log("Error: delete all transaction failed :");
            const reviewsStore = transaction.objectStore("reviews");

            const req = reviewsStore.clear();
            req.onsuccess = (event)=>{
                console.log("Success: all records deleted successfully");
                resolve(event);
            }
            req.onerror = (event)=>{
                console.log("Error: error in deleting all records : " + event);
                reject(event);
            }

        });
    }
};
const Types = {
    // Function to retrieve all types from the database
    selectAll: function () {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(["types"]);
            const typesStore = transaction.objectStore("types");
            const request = typesStore.getAll();

            request.onsuccess = function (event) {
                const types = event.target.result;
                resolve(types);
            };

            request.onerror = function (event) {
                reject(event.target.error);
            };
        });
    }
};
