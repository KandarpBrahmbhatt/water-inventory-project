import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import invoiceTemplate from "./invoiceTemplate.js";

const generateInvoice = async (order) => {
  try {

    //This starts hidden Chrome.
    const browser = await puppeteer.launch({headless: true,});

    const page = await browser.newPage(); //Creates browser page.

    // aani styling invoiceTemlete.js file ma lakheli 6e it convert db to html
    const html = invoiceTemplate(order);

    //Loads invoice HTML.
    await page.setContent(html, {
      waitUntil: "networkidle0",
    });

    const invoiceDir = "uploads/invoices";

    if (!fs.existsSync(invoiceDir)) {
      fs.mkdirSync(invoiceDir, { recursive: true });
    }

    const filePath = path.join(
      invoiceDir,
      `invoice-${order._id}.pdf`
    );

    //convert webpage into Pdf
    await page.pdf({
      path: filePath,
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return filePath;

  } catch (error) {
    console.log("PDF Error", error);
  }
};

export default generateInvoice;