import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function Mail(req, res) {
  const { nama, email, subjek, pesan } = req.body;

  try {
    if (req.method === "POST") {
      if (!nama || !email || !subjek || !pesan) {
        return res.status(422).json({ error: "Masukkan data kamu 🤬" });
      }

      const message = `
        Nama: ${nama}\r\n
        Email: ${email}\r\n
        Subjek: ${subjek}\r\n
        Pesan: ${pesan}
      `;

      const data = {
        to: "kontak@fibonacciku.com",
        from: `${nama} <kontak-noreply@fibonacciku.com>`,
        subject: `${subjek}`,
        text: message,
        html: `
          <p style="white-space: pre-line; font-family: Verdana, Arial, Helvetica, sans-serif;">Nama: ${nama}
          Email: ${email}
          Subjek: ${subjek}
          
          Pesan:
          
          ${pesan}</p>
        `,
      };
      await mail.send(data);
      return res.status(202).json({ success: "Pesan sudah dikirim 🥳" });
    } else {
      return res.status(401).json({ error: "Invalid credentials 🤯" });
    }
  } catch (e) {
    return res.status(401).json({ error: "Gagal menngirim pesan 🤯" });
  }
}
