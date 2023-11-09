let getEmotesData = async () => {
  // Replace ./data.json with your JSON feed
  await fetch("./data/emotes.txt")
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      // Work with JSON data here
      rawText = data;
      buildArray(rawText);
    })
    .catch((err) => {
      console.log(err);
      // Do something for an error here
    });
};
getEmotesData();

let buildArray = (text) => {
  let emotesArray = [];
  rawArray = text.split(/\ +/);
  for (let item of rawArray) {
    emotesArray.push(
      item
        .replace(/:/g, "")
        .replace(/(alola)/, "-alolan")
        .replace(/(galar)/, "-galarian")
        .replace(/(hisui)/, "-hisuian")
        .replace(/(shiny)/, "")
        .trim()
    );
  }
  getPokedexInfo(emotesArray);
};

const getPokedexInfo = async (emotesArray) => {
  // Replace ./data.json with your JSON feed
  await fetch("./data/pokedexdata.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      sortArrayBasedOnPokedexData(data, emotesArray);
    })
    .catch((err) => {
      console.log(err);
      // Do something for an error here
    });
};

const sortArrayBasedOnPokedexData = (pokedexData, emotesArray) => {
  emotesArray.sort(
    (a, b) => pokedexData[a.split("-")[0]] - pokedexData[b.split("-")[0]]
  );
  console.log(emotesArray);
  document.querySelector("output").textContent = emotesArray.join(" ");
};

let text = document.querySelector("textarea");
text.addEventListener("input", () => {
  buildArray(text.value);
});
