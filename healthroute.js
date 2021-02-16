import { WebApp } from "meteor/webapp";
import { Meteor } from "meteor/meteor";
import { Promise } from "meteor/promise";

import { readFileSync } from "fs";

const BUILD_INFO_FILE = `${process.cwd()}/__build_info.json`;

let buildInfo = undefined;

let _customHealthChecks;
export const customHealthChecks = (def) => {
  _customHealthChecks = def;
};
export const getBuildInfo = () => {
  try {
    if (typeof buildInfo === "undefined") {
      if (Meteor.isDevelopment) {
        buildInfo = {
          id: "dev-local",
          commit: "dev-local-commit",
          tag: "dev-local-tag",
          time: new Date().toISOString(),
        };
      } else {
        try {
          const data = readFileSync(BUILD_INFO_FILE, "utf-8");
          buildInfo = data ? JSON.parse(data) : null;
        } catch (e) {
          //
        }
      }
    }

    return buildInfo;
  } catch (err) {
    console.error("loading the build info failed", err);
    return {};
  }
};

WebApp.connectHandlers.use(`/__health`, (req, res) => {
  const healthCheckResults = _customHealthChecks
    ? Object.keys(_customHealthChecks).reduce((acc, key) => {
        let error = null;
        let result = false;

        try {
          result = Promise.await(_customHealthChecks[key]());
        } catch (e) {
          error = e;
          result = false;
          console.error(error);
        }

        return {
          ...acc,
          [key]: {
            result,
            error: error
              ? error.message || (error.toString && error.toString()) || error
              : null,
          },
        };
      }, {})
    : {};

  const success = Object.values(healthCheckResults).every(
    (r) => r.result === true
  );
  console.log({ success, healthCheckResults });

  if (success) {
    res.writeHead(200);
  } else {
    res.writeHead(503);
  }
  const buildInfo = getBuildInfo();
  res.end(
    JSON.stringify({ buildInfo, success, healthChecks: healthCheckResults })
  );
});
