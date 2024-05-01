import { authenticateGoogleSheets } from "@/utils/auth";

export default async function handler(req, res) {
  try {
    const { id, name, phone, paymentMethod, giftDate } = req.body; // Supondo que você esteja recebendo esses dados no corpo da requisição

    console.log(req.body);

    const sheets = await authenticateGoogleSheets();

    const range = `Página1!D${id}:H${id}`;

    console.log("aquiiiiiiiiiiiiiiii");

    console.log(giftDate);

    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.SHEET_ID,
      range,
      valueInputOption: "RAW",
      resource: {
        values: [["Escolhido", name, phone, paymentMethod, giftDate]],
      },
    });

    console.log("Gift atualizado:", response.data);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar gift na planilha: " + error });
  }
}
