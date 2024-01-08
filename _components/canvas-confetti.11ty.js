import EleventyFetch from "@11ty/eleventy-fetch";

const data = {
	permalink: "/public/canvas-confetti.js"
}

async function render() {
  return EleventyFetch("https://esm.run/canvas-confetti@1", {
    duration: "1d",
    type: "text"
  });
}

export { data, render };