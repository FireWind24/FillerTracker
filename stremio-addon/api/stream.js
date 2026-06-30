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

  let reqPath = req.url || "";
  if (reqPath.startsWith("/api/")) reqPath = reqPath.slice(4);
  else if (reqPath === "/api" || reqPath === "/api/") reqPath = "/";
  req.url = reqPath;

  if (/\/(stream|subtitles)\//.test(reqPath)) {
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400");
  }

  router(req, res, () => {
    res.statusCode = 404;
    res.end(JSON.stringify({ err: "not found" }));
  });
};
