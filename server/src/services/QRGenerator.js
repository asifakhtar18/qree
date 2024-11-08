const qrCode = require('qrcode');


exports.QRGenerator = async (id) => {
    try {
        const qrCodeData = await qrCode.toDataURL(`${process.env.FRONTEND_URL}/${id}`);
        const qr = qrCodeData.split(',')[1]
        return qr
    } catch (error) {
        console.log(error);
    }
}

