const { getPostList } = require('../Functions/apps/index.js');
const { visorFolder } = require('../config/index.js');
const { DB_LARUINATV_MEDIA } = require('../misc/consts.js');

async function getPosts(){
    const posts = await getPostList(DB_LARUINATV_MEDIA, visorFolder);
    return posts;
}

module.exports = { getPosts };