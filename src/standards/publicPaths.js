import { rootBucketName } from '../functions/s3Methods';

export const PUBLIC_S3_URL = `https://s3-us-west-2.amazonaws.com/${rootBucketName}/`

export const PATH_FOR_IMAGES = process.env.PUBLIC_URL + '/assets/images/'
export const PATH_FOR_ANIMATIONS = process.env.PUBLIC_URL + '/assets/animations/'