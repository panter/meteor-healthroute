// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by healthroute.js.
import { name as packageName } from "meteor/healthroute";

// Write your tests here!
// Here is an example.
Tinytest.add('healthroute - example', function (test) {
  test.equal(packageName, "healthroute");
});
