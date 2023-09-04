const { getFolderFiles, getUrlFileById } = require("../googleapis/index.js");
const { listProductsImages } = require("../../controllers/media");

async function getPostList() {
  const postList = [];
  try {
    await listProductsImages().then(async (res) => {
      console.log('el res; ', res)
    });

    return postList;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getPostList,
};
