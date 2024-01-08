import EleventyFetch from "@11ty/eleventy-fetch";

const data = {
	permalink: "/public/model-viewer.js"
}

async function render() {
  return EleventyFetch("https://ajax.googleapis.com/ajax/libs/model-viewer/3.0.1/model-viewer.min.js", {
    duration: "1d",
    type: "text"
  });
}

export { data, render };