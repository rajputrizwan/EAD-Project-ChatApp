// scan-routes.js
import fs from "fs";
import path from "path";

function scanDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith(".js")) {
      const content = fs.readFileSync(fullPath, "utf8");
      const matches = content.match(/\/:\//g);
      if (matches) {
        console.log(`Possible mistake in: ${fullPath}`);
      }
    }
  });
}

scanDir("./"); // Run from project root
