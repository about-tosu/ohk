const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // for CLI input

const apiId = YOUR_API_ID; // Replace with your actual API ID
const apiHash = "YOUR_API_HASH"; // Replace with your actual API Hash
const stringSession = new StringSession(""); // Empty string initially

(async () => {
  console.log("Generating a new session...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Enter your phone number: "),
    password: async () => await input.text("2FA password (if any): "),
    phoneCode: async () => await input.text("Enter the code sent to Telegram: "),
    onError: (err) => console.log(err),
  });
  console.log("Your session string:\n\n", client.session.save());
  await client.disconnect();
})();

