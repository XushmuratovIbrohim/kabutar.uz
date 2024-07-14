import { Vonage } from "@vonage/server-sdk"

const vonage = new Vonage({
  apiKey: "b68e4457",
  apiSecret: "UoJG8ptec1kxNQaP"
})

const from = "Kabutar.uz"

export async function sendSMS(phoneNumber) {
    try {
      const text = `Kabutar ilovasiga kirish uchun kod: ${String(Math.floor(Math.random() * 10000))}`
    } catch (e) {
      return e
    }
}