const QRCode = require('qrcode');

exports.formData = (data) => {
    const qrCodeText = `Product ID: ${data.id}, Price: $${data.price}`;
    return qrCodeText;
};

exports.generateQRCode = async (qrCodeText) => {
    const options = {
         errorCorrectionLevel: 'M',
         type: 'image/png',
         margin: 1
    };
    const qrCodeBuffer = await QRCode.toBuffer(qrCodeText, options);
    return qrCodeBuffer;
};