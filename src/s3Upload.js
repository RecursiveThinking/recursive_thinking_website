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

async function doesDirectoryExist(id, stringSubFolder){
    // console.log(`In Check For Directory | Passing Id: ${id}`);
    let folderName = id;
    // console.log(`${folderName}/${stringSubFolder}/`);
    // let exists = false;
    let reqObj = s3.headObject({
        Key: `${folderName}/${stringSubFolder}/`
    }, function(error, data){
        // console.log(error, data);
        if(data){
            console.log(`Folder Exists`);
        }
        else{
            console.log('Folder Does Not Exist');      
        }
    })
    return reqObj;
}

const createFolderByStringS3 = (id, stringSubFolder) => {
    console.log('MAKE MY BUCKETS');
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
    s3.headObject(
        //
        {
            Key: `${folderKey}/${stringSubFolder}/`
        }, 
            function(error, data){
                if(data){
                    console.log(`Folder already exists, ${data}`);
                    // return null;
                    // success = false;
                }
                if(error.code !== 'NotFound'){
                    console.log(`Unkown Error: ${error.message}`);
                }
                s3.putObject({
                    Key: `${folderKey}/${stringSubFolder}/`
                }, function(error, data){
                    if(error){
                        console.log(`Error Creating Folder at Path: ${error.message}`);
                        return null;
                    }
                    else if(data){
                        console.log(`Successfully Created Folder (${folderKey}/${stringSubFolder}/): `);
                    }
                    else{
                        console.log('Should Never Run');
                    }
                })
    })
}

export const s3Utils = {
    doesDirectoryExist,
    createFolderByStringS3,
    getBucketCreds,
    getBucketRegion,
    getBucketIdentityPoolId
}