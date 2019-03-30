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
const rootBucketName = getBucketName();
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
    Bucket: rootBucketName
  }
})

export const createAssetFoldersForUser = (userIdForFolderName, stringForSubFolder) => {
  if (!userIdForFolderName) {
    console.log('Album names must contain at least one non-space character.');
  }
  if (userIdForFolderName.indexOf('/') !== -1) {
    console.log('Album names cannot contain slashes.');
  }
  // check if uuid folder exists
  const userIdFolderKey = encodeURIComponent(userIdForFolderName + '/')
  const params = {
    Key: userIdFolderKey
  }
  s3.headObject(params, function(err, data){
    if(!err){
      console.log('err: folder with userId already exists: ')
    }
    if(err.code !== 'NotFound'){
      console.log('There was an error creating a folder for this user: ', err.message)
    }
    // now make the folders
    
  })
}

export const createAssetFoldersForUserOld = (userId, stringSubFolder) => {
  
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
  
  // s3.headObject(params, function(err, data){
    // console.log('==== @ s3.headObject - err: ', err, 'data: ', data)
    // if(!err){
    //   console.log('@ s3.headObject - Folder already exists: ', data)
    //   return;
    // }
    // if(err.code !== 'NotFound'){
    //   console.log('@ s3.headObject - There was an error creating your folder: ', err);
    //   return err;
    // }
    // http(s)://<bucket>.s3.amazonaws.com/<object>
    // http(s)://s3.amazonaws.com/<bucket>/<object>
    let userFolderWithSubFolder = `${folderName}/${stringSubFolder}/`;
    let params = { 
      Key: userFolderWithSubFolder,
      ACL: 'public-read-write'
    }
    s3.putObject(params, function(err, data){
      if(err){
        console.log('@ s3.putObject - There was an error creating your folder: ', err)
        return err;
      } else {
        console.log('@ s3.putObject - Folder created: ', userFolderWithSubFolder)
        if(stringSubFolder === 'avatar'){
          let listparams = {
            // Bucket: `${bucketName}/avatar_default`
            // Bucket: `avatar_default`
            Bucket: rootBucketName
          }
          s3.listObjectsV2(listparams, function(err, data){
            if(err){
              console.log('err: ', err)
              // return err
            } else {
              console.log('data: ', data)
              // return data
              // returns an obj, has key contents, arr of obj {
              //   Contents: Array(4)
              //   3:
              //   ETag: ""519f10db831d2e4a1459c9d8bef3e56c""
              //   Key: "default_avatar/avatar_default.png"
              //   LastModified: Fri Mar 29 2019 16:32:32 GMT-0700 (Pacific Daylight Time) {}
              //   Size: 33595
              //   StorageClass: "STANDARD"
              // }
              if(data.Contents){
                console.log('data filter' );
                const dataToCopyArr = data.Contents.filter(item => item['Key'] === "default_avatar/avatar_default.png")
                const dataToCopyObj = dataToCopyArr[0]
                const copySource = dataToCopyObj.Key
                const objectKeySplit = dataToCopyObj.Key.split('/');
                const objectKey = objectKeySplit[1];
                let copyParams = {
                  Bucket: userFolderWithSubFolder, 
                  CopySource: copySource, 
                  Key: objectKey
                };
                s3.copyObject(copyParams, function(err, data) {
                  if(err){
                    console.log(err, err.stack)
                  } else {
                    console.log(data)
                  }
                  // successful response
                  /*
                  data = {
                  CopyObjectResult: {
                    ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
                    LastModified: <Date Representation>
                  }
                  }
                  */
                });
              }
            }
          })
        }
      }
    })

  // })
}
