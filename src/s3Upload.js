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

const doesDirectoryExist = (id) => {
    return `In Check For Directory | Passing Id: ${id}`;
}

const createUserFolderS3 = (id) => {
    console.log('bucketName: ', bucketName);
    console.log('bucketRegion: ', bucketRegion);
    console.log('IdentityPoolId: ', IdentityPoolId);
    console.log(`In Create User Folder | Passing Id: ${id}`);
    console.log('s3: ', s3);
    // let folderName = id + "/";
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
    s3.headObject({
        Key: folderKey
    }, function(error, data){
        if(!error){
            console.log('Folder already exists');
            return null;
        }
        if(error.code !== 'NotFound'){
            console.log('Error1 Creating Folder: ', error.message);
        }
        s3.putObject({
            Key: `${folderKey}/Avatar`
        }, function(error, data){
            if(error){
                console.log('Error2 Creating Folder: ', error.message);
                return null;
            }
            console.log('Successfully Created Folder: Avatar');
            // This is where I should build/rebuild a data object
            return true; 
        })
        s3.putObject({
            Key: `${folderKey}/Resume`
        }, function(error, data){
            if(error){
                console.log('Error2 Creating Folder: ', error.message);
                return null;
            }
            console.log('Successfully Created Folder: Resume');
            // This is where I should build/rebuild a data object
            return true; 
        })
    })
}

export const s3Utils = {
    doesDirectoryExist,
    createUserFolderS3,
    getBucketCreds,
    getBucketRegion,
    getBucketIdentityPoolId
}