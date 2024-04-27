import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    // const { situacao, nome, telefone } = req.body; // Supondo que você esteja recebendo esses dados no corpo da requisição
    const rowIndex = 4; // Índice da linha a ser atualizada

    const nome = "Nome bom"
    const telefone = "271873312"

    const auth = await google.auth.getClient({
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      credentials: {
        private_key: process.env.GAC_PVT_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.GAC_CLIENT_EMAIL,
      },
    });

    const sheets = google.sheets({ version: "v4", auth });

    const range = `Página1!D${rowIndex}:F${rowIndex}`;

    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.SHEET_ID,
      range,
      valueInputOption: "RAW",
      resource: {
        values: [["Escolhido", nome, telefone]],
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
