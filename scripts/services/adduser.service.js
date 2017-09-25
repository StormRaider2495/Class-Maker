'use strict';
classMaker.service("userSvc", function() {

    var self = this;

    var dbName = "CLASSMAKER";
    var storeName = "USERS";
    var superAdmin = {
        email: "arunit95@gmail.com",
        firstname: "Arunit",
        lastname: "Mazumdar",
        password: "1234",
        usertype: "superAdmin"
    };
    self.superAdmin = superAdmin;

    self.loadDB = function() {
        // CREATING INDEXED DB STRUCTURE

        var request = indexedDB.open(dbName);
        request.onupgradeneeded = function() {
            // The database did not previously exist, so create object stores and indexes.
            var db = request.result;
            var store = db.createObjectStore(storeName, {
                keyPath: "email"
            });
            var typeIndex = store.createIndex("TYPE", "usertype", {
                unique: false
            });
            store.put(superAdmin);

        };
        request.onsuccess = function() {
            // var db = request.result;
        };
    }

    self.addUser = function(data) {
        // ADDING DATA TO THE OBJECT STORE.

        // var storeName = "users";
        self.loadDB();
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        var open = indexedDB.open(dbName);
        open.onsuccess = function() {
            var db = open.result;
            var transaction = db.transaction([storeName], "readwrite");
            var objectStore = transaction.objectStore(storeName);
            var request = objectStore.add(data);
            request.onsuccess = function(event) {
                alert("User has been added to your database.");
            };
            request.onerror = function(event) {
                alert("Unable to add data\r\User is already exist in your database! ");
            }
        }
    };

    self.getUser = function() {
        // GETTING AN USER'S DATA BASED ON THE KEYPATH WHICH HERE IS EMAIL

        var userEmail = "Arunit95@gmail.com";
        // var storeName = "users";
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        var open = indexedDB.open(dbName);
        open.onsuccess = function() {
            var db = open.result;
            var transaction = db.transaction([storeName], "readwrite");
            var objectStore = transaction.objectStore(storeName);
            var request = objectStore.get(userEmail);
            request.onsuccess = function(event) {
                alert("Name for " + userEmail + " is " + request.result.author);
                console.log(request.result);
            };
            request.onerror = function(event) {
                alert("Data Not Found");
            }
        }
    };

    self.editUser = function() {
        // EDITTING A USER'S DATA BASED ON THE KEYPATH VALUE

        var userEmail = "Arunit95@gmail.com";
        // var storeName = "users";
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        var open = indexedDB.open("ClassData");
        open.onsuccess = function() {
            var db = open.result;
            var transaction = db.transaction([storeName], "readwrite");
            var objectStore = transaction.objectStore(storeName);
            var request = objectStore.get(userEmail);
            request.onsuccess = function(event) {
                // Get the old value that we want to update
                var data = event.target.result;
                // update the value(s) in the object that you want to change
                data.age = 21;
                // Put this updated object back into the database.
                var requestUpdate = objectStore.put(data);
                requestUpdate.onerror = function(event) {
                    // Do something with the error
                };
                requestUpdate.onsuccess = function(event) {
                    // Success - the data is updated!
                };
            };
            request.onerror = function(event) {
                alert("Data Not Found");
            }
        }
    };

    self.getAll = function() {
        // GETTING ALL USERS USING OBJECTSTOE.GETALL() METHOD

        // var storeName = "users";
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        var open = indexedDB.open(dbName);
        open.onsuccess = function() {
            var db = open.result;
            var transaction = db.transaction([storeName]);
            var objectStore = transaction.objectStore(storeName);
            objectStore.getAll().onsuccess = function(event) {
                console.log("Got all users: ");
                var userdata = event.target.result;
                console.log(userdata);
            };
        }

    };

    self.removeUser = function() {
        // REMOVING AN USER BASED ON THE KEYPATH.

        var userEmail = "Arunit95@gmail.com";
        // var storeName = "users";
        var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
        var open = indexedDB.open("ClassData");
        open.onsuccess = function() {
            var db = open.result;
            var transaction = db.transaction([storeName], "readwrite");
            var objectStore = transaction.objectStore(storeName);
            var request = objectStore.delete(userEmail);
            request.onsuccess = function(event) {
                alert("User has been removed from your database.");
            };
            request.onerror = function(event) {
                alert("Unable to remove user as it already doesn't exist in your database! ");
            }
        }
    };

});
