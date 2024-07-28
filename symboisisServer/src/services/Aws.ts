import { HeadObjectCommand } from "@aws-sdk/client-s3";

const AWS_ACESS_KEY = "AKIAYS2NUG6QT42MAUGJ"
const AWS_SECRET_KEY = "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"
const AWS_REGION = "eu-north-1"

const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const s3bucket = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACESS_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
});
async function checkFileExists(key: string) {
    const bucketName = 'symbucket'
    try {
        await s3bucket.send(new HeadObjectCommand({
            Bucket: bucketName,
            Key: `std/${key}`
        }));
        console.log(`File ${key} exists in bucket ${bucketName}`);
        return true;
    } catch (err: any) {
        if (err.name === 'NotFound') {
            console.log(`File ${key} does not exist in bucket ${bucketName}`);
            return false;
        }
        console.log("Error", err);
        return false;
    }
}
export default checkFileExists;
