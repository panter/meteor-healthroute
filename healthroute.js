import { WebApp } from "meteor/webapp";
import { Meteor } from "meteor/meteor";

import { readFileSync } from "fs";

const BUILD_INFO_FILE = `${process.cwd()}/__build_info.json`;

let buildInfo = undefined;

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
  res.writeHead(200);
  const buildInfo = getBuildInfo();
  res.end(JSON.stringify({ buildInfo }));
});
