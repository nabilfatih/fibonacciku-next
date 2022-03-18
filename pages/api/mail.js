// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
  const body = JSON.parse(req.body);

  const message = `
    Nama: ${body.nama}\r\n
    Email: ${body.email}\r\n
    Subjek: ${body.subjek}\r\n
    Pesan: ${body.pesan}
  `;

  const data = {
    to: "kontak@fibonacciku.com",
    from: `${body.name} <kontak-noreply@fibonacciku.com>`,
    subject: `${body.subjek}`,
    text: message,
    html: message.replace(/\r\n/g, "<br>"),
  };

  await mail.send(data);

  res.status(200).json({ status: "Ok" });
};
