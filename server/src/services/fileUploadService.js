const admin = require("firebase-admin");

const serviceAccount = require("../../firestore.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    StorageBucket: process.env.FIREBASE_STORAGE_BUCKET
});


const bucket = admin.storage().bucket(process.env.FIREBASE_STORAGE_BUCKET);


const generateBuffer = async (file) => {

}



const uploadFile = async (file) => {
    try {
        const fileName = `${Date.now()}-${file?.originalname || file?.name || ''}`;
        const fileBuffer = Buffer.from(file.buffer, 'base64');
        const fileUpload = bucket.file(fileName);
        await fileUpload.save(fileBuffer);
        const [url] = await fileUpload.getSignedUrl({
            action: 'read',
            expires: '03-09-3000',

        });
        return url;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}


module.exports = {
    uploadFile
}

