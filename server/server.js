

import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server աշխատում է ✅");
});

app.post("/send-order", async (req, res) => {
  console.log("=================================");
  console.log("Պատվեր եկավ ✅");
  console.log(req.body);
  console.log("=================================");

  try {
    const { name, phone, address, payment, products, totalPrice } = req.body;

    if (!name || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: "Լրացրեք բոլոր դաշտերը",
      });
    }

    const productsText =
      products && products.length > 0
        ? products
            .map((item, index) => {
              const priceNumber = Number(
                String(item.price).replace(/,/g, "").replace(" դրամ", "")
              );

              const quantity = item.quantity || 1;
              const itemTotal = priceNumber * quantity;

              return `
${index + 1}. ${item.title}

Գին: ${item.price}
Քանակ: ${quantity}
Ընդհանուր: ${itemTotal} դրամ
---------------------------------
`;
            })
            .join("\n")
        : "Ապրանք ընտրված չէ";

    const paymentText =
      payment === "card" ? "Քարտով վճարում" : "Վճարում առաքման պահին";

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: "🛒 Նոր պատվեր Tonacar.am կայքից",
      text: `
🛒 Նոր պատվեր Tonacar.am կայքից

=================================

👤 Հաճախորդի տվյալներ

Անուն: ${name}
Հեռախոս: ${phone}
Հասցե: ${address}

💳 Վճարման տարբերակ

${paymentText}

=================================

🎄 Պատվիրած ապրանքներ

${productsText}

=================================

💰 Ընդհանուր գումար

${totalPrice} դրամ

=================================
      `,
    });

    console.log("Email ուղարկվեց Gmail-ին ✅");

    res.json({
      success: true,
      message: "Պատվերը հաջողությամբ ուղարկվեց",
    });
  } catch (error) {
    console.log("=================================");
    console.log("Email send error full:", error);
    console.log("Error message:", error.message);
    console.log("=================================");

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});