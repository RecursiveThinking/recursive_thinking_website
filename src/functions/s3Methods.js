import { s3UploadCreds } from '../credentials/s3UploadSecrets';
import AWS from 'aws-sdk';

const getBucketName = () => {
  // console.log('bucketName: ', bucketName);
  return s3UploadCreds.s3BucketName;
}

const getBucketRegion = () => {
  // console.log('bucketRegion: ', bucketRegion);
  return s3UploadCreds.region;
}

const getBucketIdentityPoolId = () => {
  // console.log('IdentityPoolId: ', identityPoolId)
  return s3UploadCreds.IdentityPoolId;
}

// top level doesn't include user uuid + avatar || resume
const bucketName = getBucketName();
const bucketRegion = getBucketRegion();
const identityPoolId = getBucketIdentityPoolId();

// console.log('bucketName: ', bucketName, 'bucketRegion: ', bucketRegion, 'identityPoolId: ', identityPoolId);

AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: identityPoolId
  })
})

let s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {
    Bucket: bucketName
  }
})
// let defaultAvatarFileName = 'avatar_default.png';
// let defaultAvatarFileLocation = '../../public/assets/images/avatar_default.png';

// export const createAvatarFolder = new AWS.S3({ apiVersion: '2006-03-01' }).createBucket({ Bucket: bucketName}).promise().then(data => {
//   let objectParams = {
//     Bucket: bucketName,
//     Key: defaultAvatarFileName,
//     Body: defaultAvatarFileLocation
//   }
//   let uploadPromise = new AWS.S3({ apiVersion: '2006-03-01' }).putObject(objectParams).promise();
//   uploadPromise.then(data => {
//     console.log('Success!');
//     return data
//   }).catch(err => {
//     console.log('err: ', err, 'err.stack: ', err.stack)
//     return err
//   })
// })


// const doesDirectoryExist = async (id, stringSubFolder) => {
//   return null;
// }

export const createAssetFoldersForUser = (userId, stringSubFolder) => {
  let folderName = userId;
  if(!folderName){
    console.log('Invalid Folder name of: ', folderName);
    return null;
  }
  if(folderName.indexOf('/') !== -1){
    console.log('Folder Name Contains a Slash: / ', folderName);
    return null;
  }
  // ok now make it
  // let userFolder = encodeURIComponent(`${folderName}/${stringSubFolder}`) + '/';
  let userFolderWithSubFolder = `${folderName}/${stringSubFolder}/`;
  let params = { Key: userFolderWithSubFolder }
  s3.headObject(params, function(err, data){
    if(!err){
      console.log('Folder already exists: ', data)
      return;
    }
    if(err.code !== 'NotFound'){
      console.log('There was an error creating your album: ', err.message);
      return err;
    }
    s3.putObject(params, function(err, data){
      if(err){
        console.log('There was an error creating your album: ', err.message)
        return err;
      } else {
        console.log('Folder created: ', userFolderWithSubFolder)
        // if(stringSubFolder === 'avatar'){
        //   uploadDefaultPhoto(userFolder)
        // }
      }
    })
    if(stringSubFolder === 'avatar'){
      // const readFile = promisify(fs.readFile);

    //   let defaultAvatarFileName = `${userFolderWithSubFolder}avatar_default.png`;
    //   // let defaultAvatarFileName = `${userFolderWithSubFolder}`;
    //   let defaultAvatarFileLocation = '../../public/assets/images/avatar_default.png';
      
    //   const uploadToS3 = async (data) => {
    //     return s3.upload({
    //       Bucket: bucketName,
    //       Key: defaultAvatarFileName,
    //       Body: data,
    //       ContentType: 'image/png',
    //       ACL: 'public-read-write'
    //       // ContentDisposition: `attachment; filename=avatar_default.png`,
    //     }).promise();
    //   }
      
    //   const uploadImage = async (path) => {
    //     const stream = fs.createReadStream(path);
    //     return uploadToS3(stream);
    //   }
      
    //   uploadImage(defaultAvatarFileLocation)
    //     .then(() => {console.log('then: ')})
    //     .catch((err) => console.log('err: ', err))
      
    }
  })
}

// https://s3-us-west-2.amazonaws.com/recursivethinking-rct-user-assets-us-west-2-sethborne-gmail-com/99a6e888-a7bb-4f79-b67d-538e7c03bee0/avatar/avatar_default.png

// const uploadDefaultPhoto = (avatarPathByUserId) => {
  
// }

// const uploadResume = (resumePathByUserId) => {
  
// }