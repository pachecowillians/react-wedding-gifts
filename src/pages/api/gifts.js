// pages/api/gifts.js
import { authenticateGoogleSheets } from "@/utils/auth";

export default async function handler(req, res) {
  try {
    // Authentication with Google Sheets
    const sheets = await authenticateGoogleSheets(".readonly");

    const range = `Página1!A:I`;

    // Get data from the spreadsheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    // Extract cell data
    const rows = response.data.values;

    // Remove the header
    const [header, ...giftsData] = rows;

    // Map the data to the format expected by the component
    const apiGifts = giftsData.map((gift, index) => ({
      id: index + 2,
      imageSrc: gift[0],
      title: gift[1],
      price: gift[2],
      status: gift[3],
      name: gift[4],
      phone: gift[5],
      paymentMethod: gift[6],
      message: gift[7],
      giftDate: gift[8],
    }));

    // Return data as response
    res.status(200).json(apiGifts);
  } catch (error) {
    console.error("Error fetching spreadsheet data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
