const { google } = require("googleapis");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const QRCode = require("qrcode");
const axios = require("axios");

const drive = google.drive({
  version: "v3",
  auth: new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, process.env.GOOGLE_CREDENTIAL_PATH),
    scopes: ["https://www.googleapis.com/auth/drive"],
  }),
});

async function downloadImage(url) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "arraybuffer",
  });
  return response.data;
}

// Membership Card
async function generateMembershipCard(user, memberId, club) {
  const cardsDir = path.join(__dirname, "cards");

  await fsPromises.mkdir(cardsDir, { recursive: true });

  const filePath = path.join(cardsDir, `${memberId}_membership_card.pdf`);
  const doc = new PDFDocument({
    size: [400, 250],
    margins: { top: 20, bottom: 20, left: 20, right: 20 },
  });

  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  doc.rect(0, 0, 400, 250).fill("#f9f9f9");
  doc.rect(5, 5, 390, 240).stroke("#b0b0b0");

  if (club.logoUrl) {
    try {
      const imageData = await downloadImage(club.logoUrl);
      doc.image(imageData, {
        fit: [80, 80],
        align: "left",
        valign: "top",
        margin: 5,
      });
    } catch (error) {
      console.error("Error downloading logo image:", error);
    }
  }

  doc.moveDown(1.5);
  doc.fontSize(24).fillColor("#2980b9").text("Membership Card", {
    align: "right",
    underline: true,
    font: "Helvetica-Bold",
  });

  doc.moveDown(1.5);
  const infoBoxY = doc.y + 20;
  doc.rect(20, infoBoxY, 360, 100).fill("#ffffff").stroke("#b0b0b0");
  doc
    .moveTo(20, infoBoxY + 10)
    .fontSize(14)
    .fillColor("#34495e")
    .text(`Name: ${user.name}`, { align: "left" })
    .moveDown(0.5)
    .text(`Club: ${club.name}`, { align: "left" })
    .moveDown(0.5)
    .text(`Member ID: ${memberId}`, { align: "left" });

  const qrCodeUrl = await QRCode.toDataURL(memberId);
  doc.image(qrCodeUrl, {
    fit: [140, 140],
    align: "right",
    valign: "top",
    x: 270 - 20,
    y: infoBoxY - 20,
  });

  const formattedDate = new Date().toLocaleDateString();
  doc.moveDown(2);
  doc.fontSize(12).fillColor("#7f8c8d").text(`Joined On: ${formattedDate}`, {
    align: "left",
    italic: true,
    opacity: 0.8,
  });

  doc.moveTo(0, doc.page.height - 50);
  doc.fontSize(10).fillColor("#7f8c8d").text("Source: CampusSync", {
    align: "center",
    lineBreak: false,
  });

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on("finish", async () => {
      try {
        const stats = await fsPromises.stat(filePath);
        console.log(`Generated PDF Size: ${stats.size} bytes`);

        const fileMetadata = {
          name: `${memberId}_membership_card.pdf`,
          mimeType: "application/pdf",
          parents: [process.env.GOOGLE_DRIVE_PATH],
        };

        const media = {
          mimeType: "application/pdf",
          body: fs.createReadStream(filePath),
        };

        const uploadResponse = await drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: "id, webViewLink, webContentLink",
        });

        console.log("Upload Result:", uploadResponse.data);

        await fsPromises.unlink(filePath);
        resolve(uploadResponse.data.webContentLink);
      } catch (error) {
        console.error("Error during upload or file handling:", error);
        reject(error);
      }
    });

    writeStream.on("error", (error) => {
      console.error("Write Stream Error:", error);
      reject(error);
    });
  });
}

//Evnet Ticket
async function generateTicketCard(user, ticketId, event) {
  const cardsDir = path.join(__dirname, "cards");

  await fsPromises.mkdir(cardsDir, { recursive: true });

  const filePath = path.join(cardsDir, `${ticketId}_ticket_card.pdf`);
  const doc = new PDFDocument({
    size: [400, 250],
    margins: { top: 20, bottom: 20, left: 20, right: 20 },
  });

  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  doc.rect(0, 0, 400, 250).fill("#f3f3f3");
  doc.rect(5, 5, 390, 240).stroke("#cccccc");

  doc
    .font("Helvetica-Bold")
    .fontSize(26)
    .fillColor("#007bff")
    .text("Event Ticket", {
      align: "center",
      underline: true,
    });

  doc.moveDown(0.7);

  const infoBoxY = doc.y + 20;
  doc.rect(20, infoBoxY, 360, 140).fill("#ffffff").stroke("#cccccc");

  doc
    .moveTo(20, infoBoxY + 10)
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor("#34495e")
    .text(`Event: ${event.name}`, { align: "left" })
    .moveDown(0.8);

  doc
    .font("Helvetica")
    .fontSize(12)
    .fillColor("#333333")
    .text(`Name: ${user.name}`, { align: "left" })
    .moveDown(0.5);

  doc.text(`Ticket ID: ${ticketId}`, { align: "left" }).moveDown(0.5);

  const eventDate = new Date(event.timeDate).toLocaleDateString();
  const eventTime = new Date(event.timeDate).toLocaleTimeString();

  doc
    .fontSize(12)
    .text(`Date: ${eventDate}`, { align: "left" })
    .moveDown(0.5)
    .text(`Time: ${eventTime}`, { align: "left" })
    .moveDown(0.5);

  if (event.venue) {
    doc.fontSize(12).text(`Place: ${event.venue}`, { align: "left" });
  }

  const qrCodeUrl = await QRCode.toDataURL(ticketId);
  doc.image(qrCodeUrl, {
    fit: [120, 120],
    align: "right",
    valign: "top",
    x: 260,
    y: infoBoxY - 5,
  });

  doc.moveDown(0.8);

  doc.fontSize(12).fillColor("#666666").text("Source : CampusSync", {
    align: "center",
  });

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on("finish", async () => {
      try {
        const stats = await fsPromises.stat(filePath);
        console.log(`Generated PDF Size: ${stats.size} bytes`);

        const fileMetadata = {
          name: `${ticketId}_ticket_card.pdf`,
          mimeType: "application/pdf",
          parents: [process.env.GOOGLE_DRIVE_PATH],
        };

        const media = {
          mimeType: "application/pdf",
          body: fs.createReadStream(filePath),
        };

        const uploadResponse = await drive.files.create({
          resource: fileMetadata,
          media: media,
          fields: "id, webViewLink, webContentLink",
        });

        console.log("Upload Result:", uploadResponse.data);

        await fsPromises.unlink(filePath);
        resolve(uploadResponse.data.webContentLink);
      } catch (error) {
        console.error("Error during upload or file handling:", error);
        reject(error);
      }
    });

    writeStream.on("error", (error) => {
      console.error("Write Stream Error:", error);
      reject(error);
    });
  });
}

module.exports = { generateMembershipCard, generateTicketCard };
