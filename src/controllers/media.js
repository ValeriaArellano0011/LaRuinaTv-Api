const { google } = require("googleapis");
const fs = require("fs");
const os = require('os');
const { POST_CLIENT_ID, POST_CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN, VISOR_FOLDER, SLIDER_FOLDER } =
  process.env;
const path = require("path");
const express = require('express');
const router = express.Router();


const oauth2Client = new google.auth.OAuth2(
  '874900879874-5hn8fcdnj01vckdokqr9a6b6fgvo8mkh.apps.googleusercontent.com',
  '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',
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: '1//04bBJy2i85i_-CgYIARAAGAQSNwF-L9IruH7YsCtWSwbptTj68fkN7yIXbO-xona6kDzuQuvaCfEyuP7-vc6cJXPp81_t0bABXrs'
});

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

//--------Create File----------

const createFile = async () => {
  try {
    const response = await drive.files.create({
      metaData: {
        parents: ["1hbwrmkNOkkXU8_tsbH5_6SM0nwECs7JI"],
        resource: { appProperties: { categories: "tu vieja en tanga" } },
      },
      requestBody: {
        name: "heyy.jpg", //file name
        mimeType: "image/jpg",
      },
      media: {
        mimeType: "image/jpg",
        body: fs.createReadStream(filePath),
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};


//--------Upload File----------

async function uploadFile(result) {
  console.log('artist: ', result.get('artist'))
  console.log('title: ', result.get('artist'))
  console.log('info: ', result.get('artist'))
  console.log('idLinkYT: ', result.get('idLinkYT'))
  console.log('idLinkSPOTY: ', result.get('idLinkSPOTY'))
  console.log('idLinkDRIVE: ', result.get('idLinkDRIVE'))
  console.log('urlLinkWEB: ', result.get('urlLinkWEB'))
  console.log('urlLinkDOWNLOAD: ', result.get('urlLinkDOWNLOAD'))
  console.log('mediaType: ', result.get('mediaType'))
  console.log('categories: ', result.get('categories'))
  console.log('genre: ', result.get('genre'))

  const filePathSlider = path.join(os.tmpdir(), `slider-image-${result.get('imageSlider')}`);
  const filePathVisor = path.join(os.tmpdir(), `visor-image-${result.get('imageVisor')}`);
  const lengthSliders = await listAndCountSliderImgs()
  const connectionId = `${result.get('title')}${lengthSliders}`
  
  let fileMetadataSlider = {
    parents: ['1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe'],
    appProperties: { 
      'id': Number(lengthSliders),
      'artist': result.get('artist'),
      'title': result.get('title'),
      'info': result.get('info'),
      'connectionId': connectionId,
      'idLinkYT': result.get('idLinkYT'),
      'idLinkSPOTY': result.get('idLinkSPOTY'),
      'idLinkDRIVE': result.get('idLinkDRIVE'),
      'urlLinkWEB': result.get('urlLinkWEB'),
      'urlLinkDOWNLOAD': result.get('urlLinkDOWNLOAD'),
      'idMedia':{},
      'mediaType': result.get('mediaType'),
      'categories': result.get('categories'),
      'genre': result.get('genre')
    },
    name: result.get('imageSlider'), //file name
    mimeType: "image/jpg",
  };

  let fileMetadataVisor = {
    parents: ['1XtXvvdt7wmHYNCPJ-kPLpuPOFqS70_1k'],
    appProperties: { 
      'connectionId': connectionId,
    },
    name: 'visor.jpg', //file name
    mimeType: "image/jpg",
  };

  let mediaSlider = {
    mimeType: "image/jpg",
    body: fs.createReadStream(filePathSlider),
  };

  let mediaVisor = {
    mimeType: "image/jpg",
    body: fs.createReadStream(filePathVisor),
  };
  try {
    const responseSlider = await drive.files.create({
      resource: fileMetadataSlider,
      media: mediaSlider,
      fields: "appProperties",
    });

    const responseVisor = await drive.files.create({
      resource: fileMetadataVisor,
      media: mediaVisor,
      fields: "appProperties",
    });
    
    console.log(responseSlider.data)
    console.log(responseVisor.data)
    return {responseSlider, responseVisor};
  } catch (error) {
    console.log(error.message);
  }
}

// async function listHolis() {
//   try {
//     const response = await drive.files.list({
//       fileId: "1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe", //sliders
//       q: `'1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe' in parents`,
//       fields: 'files(id, name, properties)',
//     });
//     return response.data.files
//   }catch(e){
//     console.log(e)
//   }
// }



//--------List Posts Slider Images----------
function imgLinks(id) {
  var imgLink = `https://drive.google.com/uc?export=view&id=${id}`;
  return imgLink;
}

async function createForGenerateUrl(e, index) {
  await drive.permissions.create({
    fileId: e.id,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });
  await drive.files.get({
    fileId: e.id,
    fields: "webViewLink, webContentLink",
  });

  const linkimg = imgLinks(e.id)
  const prop = e.appProperties
  const { id, idLinkSPOTY, idLinkDRIVE, urlLinkWEB, urlLinkDOWNLOAD, categories, info, connectionId, title, genre, artist, idMedia, idLinkYT, mediaType } = prop
  return { id, linkimg, idLinkSPOTY, idLinkDRIVE, urlLinkWEB, urlLinkDOWNLOAD, categories, info, connectionId, title, genre, artist, idMedia, idLinkYT, mediaType} 
  // console.log('MEIDAID',idMedia)
  // return {
  //   id: index,
  //   idMedia: {idLinkYT, idLinkSPOTY, idLinkDRIVE, urlLinkWEB, urlLinkDOWNLOAD},
  //   mediaType,
  //   title, 
  //   artist,
  //   tag: [''],//falta
  //   sliderImage: linkimg[index], 
  //   visorImage: linkimg[index], //falta
  //   icon: [''], //falta
  //   categories,
  //   info,
  //   actionButton: [''], //falta
  //   genre,
  //   connectionId
  //}
}

async function listPostImages() {
  const list=[]
  try {
    const response = await drive.files.list({
      fileId: "1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe", //slider 
      q: `'1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe' in parents`,
      fields: "files(id, name, appProperties)",
    });

    const objs = response.data.files.map((e) => e)
    const res = response.data.files.map(async (e, index) => {
      list.push(await createForGenerateUrl(e, index));
      return list
    });
    console.log('el resssssssss!!!!!')
    return res
  } catch (err) {
    console.log(err);
  }
}

//--------Count Slider Images----------
async function listAndCountSliderImgs() { 
  try {
    const response = await drive.files.list({
      fileId: "1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe", //slider 
      q: `'1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe' in parents`,
      fields: "files(appProperties)",
    });
    var slidersLength = response.data.files.length
    return slidersLength
  }catch(e){
    console.log(e)
  }
}
//--------List Product Images----------

async function listProdImages() {
  try {
    const response = await drive.files.list({
      fileId: "1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe", //sliders
      q: `'1AHVpvZukrnEgJzwdCjDDnpUxuDob8Lbe' in parents`,
      fields: "files(id, name)",
    });

    const objs = response.data.files.map((e) => e)

    async function createFileToUpload(e) {
      await drive.permissions.create({
        fileId: e.id,
        requestBody: {
          role: "reader",
          type: "anyone",
        },
      });
      await drive.files.get({
        fileId: e.id,
        fields: "webViewLink, webContentLink",
      });
    }

    function imgLinks(id) {
      var imgLink = `https://drive.google.com/uc?export=view&id=${id}`;
      console.log('el imgLink: ', imgLink)
      return imgLink;
    }
    response.data.files.map(async (e) => {
      await createFileToUpload(e);
    });

    return objs.map(o => imgLinks(o.id))
  } catch (err) {
    console.log(err);
  }
}

//--------Get Product By Name----------

async function getProductByName() {
  try {
    const response = await drive.files.get({
      fileId: "1hmPyVTGkRDjMgQVQJKSdNAVifNOVy2kA",
      q: 'name = "producto1.png" and parents in "1BkJ-dQUAn_642S-dQU8ibV83r0ASs-ik"',
    });
    return await response.data;
  } catch (err) {
    console.log(err);
  }
}

// const getMusicByName = (name) => {
//   try {
    
//   } catch (error) {
    
//   }
// }

///////////// LIKE /////////////////
//////////// EN DESARROLLO /////////

let contents = [];

const contentController = {}

contentController.likeContent = function(req, res){

  const id = req.params.id;

  const content = contents.find((c) => c.id === id);

  if (!content) {
    return res.status(404).json({ message: 'Contenido multimedia no encontrado' });
  }

  content.likes += 1;

  res.json({ message: 'Me gusta agregado', likes: content.likes });
};

//////////// EN DESARROLLO /////////
///////////////////////////////////
const editMedia = (req) => {
  const { id } = req.params

  drive.files.update({
    fileId: id,
    resource: {"appProperties": {"key": "value"}},
    fields: 'id,appProperties',
  });

}

const getEditMedia = async (req) => {
  const { id } = req.params

  try {
    const response = await drive.files.get({
      fileId: id,
      fields: 'appProperties'
    });
    return response.data;
  } catch (error) {
    console.log(error)
  }
  

}

module.exports = {
  uploadFile,
  createFile,
  getProductByName,
  listProdImages,
  listPostImages,
  contentController,
  getEditMedia
};
