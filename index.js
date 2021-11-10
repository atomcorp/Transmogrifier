const handleCsvData = (data) => {
  const headings = data[0];
  const content = data.slice(1);
  const hasPageHeading = headings.includes("Page");
  const results = content.reduce((acc, listing) => {
    // eg. [ "Shovel ", "Fredwave ", "Label ", … ]
    let listingToArr = listing;
    if (hasPageHeading) {
      listingToArr = listingToArr.splice(0, 3);
    }
    const listingsWithType = listingToArr.map((value, i) => {
      let text = value;
      return `${headings[i]}: ${value.trim()}`;
    });
    const listingToString = listingsWithType.join("\n");
    return [...acc, listingToString];
  }, []);
  return results.join("\n\n");
};

document.addEventListener("submit", (event) => {
  event.preventDefault();
  const formdata = new FormData(event.target);
  const csvText = formdata.get("csv-text");
  if (csvText) {
    const parsedCsv = Papa.parse(csvText);
    const text = handleCsvData(parsedCsv.data);
    const outputField = document.getElementById("output");
    outputField.value = text;
  }
});

async function setClipboard(string) {
  try {
    await navigator.clipboard.writeText(string);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}

(() => {
  const copyButton = document.getElementById("copy");
  const outputTextArea = document.getElementById("output");
  const inputForm = document.getElementById("input");
  outputTextArea.value = "";
  const inputTextArea = document.querySelector('[name="csv-text"');
  inputTextArea.value = "";
  copyButton.addEventListener("click", (event) => {
    event.preventDefault();
    const output = outputTextArea.value;
    setClipboard(output).then(() => {
      copyButton.textContent = "Copied!";
      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1000);
    });
  });
})();
