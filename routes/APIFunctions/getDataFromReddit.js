let axios = require("axios");

const getDataFromReddit = (keyWord, sortType, nbOfItems) => {
  return axios({
    method: "get",
    url: `http://www.reddit.com/search.json`,
    params: {
      // ?q=${keyWord}&sort=${sortType}&limit=${nbOfItems}
      q: keyWord,
      sort: sortType,
      limit: nbOfItems
    },
    responseType: "json"
  })
    .then(JSONData => dataSelection(JSONData))
    .then(selectedData => dataNormalization(selectedData))
    .catch(error => console.log(error));
};

const dataSelection = JSONdata => {
  let selectedData = [];

  selectedData = JSONdata.data.data.children.map(child => {
    let creationDate = child.data.created_utc;
    let author = child.data.author;
    let score = child.data.score;
    let title = child.data.title;
    let text = child.data.selftext;
    let postUrl = child.data.permalink;
    let postHint = child.data.post_hint;
    let mediaSrc = child.data.url;
    let thumbnail = child.data.thumbnail;

    return {
      creationDate: creationDate,
      author: author,
      score: score,
      title: title,
      text: text,
      postUrl: postUrl,
      postHint: postHint,
      mediaSrc: mediaSrc,
      thumbnail: thumbnail
    };
  });

  return selectedData;
};

const dataNormalization = selectedData => {
  let normalizedData = [];

  normalizedData = selectedData.map(article => {
    let source = "Reddit";
    let id = `Reddit_${article.author}_${article.creationDate}`;
    let creationDate = new Date(article.creationDate * 1000).toDateString();
    let author = article.author;
    let score = article.score;
    let title = article.title;
    let text = article.text;
    let postUrl = `https://www.reddit.com/${article.postUrl}`;
    let mediaSrc = article.mediaSrc;
    let thumbnail = article.thumbnail;
    let postType = article.postHint;

    return {
      source: source,
      id: id,
      creationDate: creationDate,
      author: author,
      score: score,
      title: title,
      text: text,
      postUrl: postUrl,
      mediaSrc: mediaSrc,
      thumbnail: thumbnail,
      postType: postType
    };
  });

  return normalizedData;
};

module.exports = getDataFromReddit;
