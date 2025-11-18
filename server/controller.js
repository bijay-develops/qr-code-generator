const service = require("./service");

exports.generateQR = async (req, res) => {
  try {
    const {data} = req.body;

    const qrCodeText = service.formData(data);

    const qrCodeBuffer = await service.generateQRCode(qrCodeText);

    res.setHeader('Content-Disposition', 'attachment; filename= qrcode.png');
    res.type('image/png').send(qrCodeBuffer);

  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).send({ error: 'Failed to generate QR code' });
  }
};
