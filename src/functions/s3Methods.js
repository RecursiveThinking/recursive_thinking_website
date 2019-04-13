import { s3UploadCreds } from '../credentials/s3UploadSecrets';
import AWS from 'aws-sdk';

export const getBucketName = () => {
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
export const rootBucketName = getBucketName();
const bucketRegion = getBucketRegion();
const identityPoolId = getBucketIdentityPoolId();

console.log('rootBucketName: ', rootBucketName, 'bucketRegion: ', bucketRegion, 'identityPoolId: ', identityPoolId);

// https://s3-us-west-2.amazonaws.com/recursivethinking-rct-user-assets-us-west-2-sethborne-gmail-com/dca2f5fe-16f4-4d44-bab0-66feb5997bf5/avatar/avatar_default.png

// export const PUBLIC_S3_URL = `https://s3-us-west-2.amazonaws.com/${rootBucketName}/`

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
  // userIdForFolderName is the uuId, stringForSubFolder is either 'avatar' or 'resume'
  // these two are fast fail errors
  if (!userIdForFolderName) {
    console.log('Folder names need least one non-space character.');
  }
  if (userIdForFolderName.indexOf('/') !== -1) {
    console.log('Folder names cannot contain slashes.');
  }
  // this (headObject) checks if uuid folder exists
  const userIdFolderKey = encodeURIComponent(userIdForFolderName + '/')
  const params = {
    Key: userIdFolderKey
  }
  s3.headObject(params, function(err, data){
    if(!err){
      console.log('Error: There is already a folder for this user!')
    }
    if(err.code !== 'NotFound'){
      console.log('There was an error creating a folder for this user: ', err.message)
    }
    // so if the above doesn't error, then we make the "folders" in our bucket
    const userIdFolderKeyWithSubString = `${userIdForFolderName}/${stringForSubFolder}/`
    const putParams = {
      Key: userIdFolderKeyWithSubString
    }
    // putObject makes folders
    s3.putObject(putParams, function(err, data) {
      if (err) {
        console.log('There was an error creating your user folder: ' + err.message);
      } else {
        console.log('Successfully created User Folder: ', userIdFolderKeyWithSubString, stringForSubFolder);
        // if the folder we are creating is 'avatar', copy a default avatar from the avatars/ 'folder' in s3 to the user/avatar folder.
        if(stringForSubFolder === 'avatar'){
          // define the 'from' path
          const fromPath = `avatars/`;
          // define the 'to' path (user/avatar)
          const toPath = `${userIdForFolderName}/${stringForSubFolder}/`;
          // need to list the objects in the 'from' path (source)
          let listParams = {
            Prefix: fromPath
          }
          s3.listObjects(listParams, function(err, data){
            if(err){
              console.log('err @ listObjects: ', err)
            } else {
              console.log('data @ listObjects: ', data);
              // if source exists (which it should always) will return an object, containing an Array of 'Contents', since its avatars/avatar_default.png, the Contents look like this:
              // =================================================
              // [
              //   {
              //     ETag: ""d41d8cd98f00b204e9800998ecf8427e"",
              //     Key: "avatars/",
              //     LastModified: Mon Apr 01 2019 12:51:06 GMT-0700 (Pacific Daylight Time) {},
              //     Owner: {
              //       DisplayName: "sethborne", 
              //       ID: "5d564d6af18c5ecefaa40197c435b42400edb9c2bd044781074a6888d0ca60eb"
              //     },
              //     Size: 0,
              //     StorageClass: "STANDARD" 
              //   }, 
              //   {
              //     ETag: ""519f10db831d2e4a1459c9d8bef3e56c"",
              //     Key: "avatars/avatar_default.png",
              //     LastModified: Mon Apr 01 2019 12:46:19 GMT-0700 (Pacific Daylight Time) {},
              //     Owner: {
              //       DisplayName: "sethborne", 
              //       ID: "5d564d6af18c5ecefaa40197c435b42400edb9c2bd044781074a6888d0ca60eb"
              //     },
              //     Size: 33595,
              //     StorageClass: "STANDARD"
              //   } 
              // ]
              // =================================================
              
              // the file that we want to copy is the second object, so lets access that
              const file = data.Contents[6]
              // logged for posterity
              console.log('file @ listObjects: ', file)
              if(file){
                // need to set our params
                // CopySource is file.Key = Key: "avatars/avatar_default.png" (above)
                // Key: (with the replace method) goes from 'avatars/avatar_default.png'
                // find fromPath 'avatars/' replace with userId/avatar/
                // Ending with 'userId(uuid)/avatar/avatar_default.png'
                let copyParams = {
                  CopySource: `${rootBucketName}/${file.Key}`,
                  Key: file.Key.replace(fromPath, toPath),
                  ACL: 'public-read-write'
                }
                // params set, do the copy
                s3.copyObject(copyParams, function(copyErr, copyData){
                  if(copyErr){
                    console.log('err @ copy: ', copyErr)
                  } else {
                    console.log('data @ copy: ', copyData)
                    let listParams = {
                      // Prefix: userIdForFolderName
                      Prefix: toPath
                    }
                    // second list to check the user/avatar folder if file exists
                    s3.listObjects(listParams, function(listErr, listData){
                      if(listErr){
                        console.log('err @ ListParams 2: ', listErr)
                      } else {
                        console.log('data @ ListParams 2: ', listData)
                      }
                    })
                  }
                })
              }
            }
          })
        }
      }

    });
  })
}