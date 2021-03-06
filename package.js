Package.describe({
  name: "panter:healthroute",
  version: "0.3.1",
  // Brief, one-line summary of the package.
  summary: "simple package that adds a route __health",
  // URL to the Git repository containing the source code for this package.
  git: "",
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: "README.md",
});

Package.onUse(function (api) {
  api.versionsFrom("1.8.0.2");
  api.use("ecmascript");
  api.use("webapp");
  api.mainModule("healthroute.js", ["server"]);
});

Package.onTest(function (api) {
  api.use("ecmascript");
  api.use("tinytest");
  api.use("panter:healthroute");
});
