const { getRouter } = require("stremio-addon-sdk");
const builder = require("../lib/addon");

const addonInterface = builder.getInterface();
const router = getRouter(addonInterface);

module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.statusCode = 200;
    res.end();
    return;
  }

  req.url = "/manifest.json";
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");

  router(req, res, () => {
    res.statusCode = 404;
    res.end(JSON.stringify({ err: "not found" }));
  });
};
