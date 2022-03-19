// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import mail from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const body = JSON.parse(req.body);
  const { nama, email, subjek, pesan } = body;
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
};
