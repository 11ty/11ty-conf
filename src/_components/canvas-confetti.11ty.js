import { minify } from "terser";
import fs from "node:fs";

const data = {
	permalink: "/public/canvas-confetti.js"
}

async function render() {
  let code = fs.readFileSync("./node_modules/canvas-confetti/dist/confetti.module.mjs", "utf8");

  try {
    let result = await minify(code, { sourceMap: true });
    return result.code;
  } catch(e) {
    console.error( e );
    return code;
  }
}

export { data, render };