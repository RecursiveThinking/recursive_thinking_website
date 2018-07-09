import { s3UploadCreds } from '../secrets/s3UploadSecrets.js'
// info for s3Bucket
console.log('s3UploadCreds', s3UploadCreds);
const bucketName = s3UploadCreds.s3BucketName;
const bucketRegion = s3UploadCreds.region;
const IdentityPoolId = s3UploadCreds.IdentityPoolId;

// console.log('bucketName: ', bucketName);
// console.log('bucketRegion: ', bucketRegion);
// console.log('identityPoolId: ', identityPoolId);

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

var s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {
        Bucket: bucketName
    }
});

const getBucketCreds = () => {
    console.log('bucketName: ', bucketName);
    return bucketName;
}

const getBucketRegion = () => {
    console.log('bucketRegion: ', bucketRegion);
    return bucketRegion;
}

const getBucketIdentityPoolId = () => {
    console.log('IdentityPoolId: ', identityPoolId);
    return identityPoolId;
}

const doesDirectoryExist = (id, stringSubFolder) => {
    console.log(`In Check For Directory | Passing Id: ${id}`);
    let folderName = id;
    console.log(`${folderName}/${stringSubFolder}/`);
    let exists = true;
    let obj = s3.headObject({
        Key: `${folderName}/${stringSubFolder}/`
    }, function(error, data){
        console.log(error, data);
        if(data){
            console.log(`Folder Exists`);
            exists = true;
        }
        else{
            // console.log(error, error.code);
            exists = false;
        }
    })
    // console.log(obj);
    return exists;
}

const createFolderByStringS3 = (id, stringSubFolder) => {
    let folderName = id;
    if(!folderName){
        console.log('Invalid Folder name of: ', folderName);
        return null;
    }
    if(folderName.indexOf('/') !== -1){
        console.log('Folder Name Contains a slash: / ', folderName);
        return null;
    }
    let folderKey = folderName;
    let success = false;
    s3.headObject(
        //
        {
            Key: `${folderKey}/${stringSubFolder}/`
        }, 
            function(error, data){
                if(data){
                    console.log(`Folder already exists, ${data}`);
                    // return null;
                    success = false;
                }
                if(error.code !== 'NotFound'){
                    console.log(`Error1 Creating Folder (${stringSubFolder}): ${error.message}`);
                }
                s3.putObject({
                    Key: `${folderKey}/${stringSubFolder}/`
                }, function(error, data){
                    if(error){
                        console.log(`Error2 Creating Folder: ${error.message}`);
                        return null;
                    }
                    console.log(`Successfully Created Folder (${folderKey}/${stringSubFolder}/): `);
                    // This is where I should build/rebuild a data object
                    // return true; 
                    success = true;
                })
    })
    return success;
}

export const s3Utils = {
    doesDirectoryExist,
    createFolderByStringS3,
    getBucketCreds,
    getBucketRegion,
    getBucketIdentityPoolId
}