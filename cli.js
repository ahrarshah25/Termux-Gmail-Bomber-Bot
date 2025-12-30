import readline from "readline";
import fetch from "node-fetch";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter email: ", (email) => {
  rl.question("Enter count (1-100): ", async (count) => {

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
        console.log("\n✅ SUCCESS:", data.success);
      } else {
        console.log("\n❌ ERROR:", data.error);
      }

    } catch (err) {
      console.log("\n❌ ERROR:", err.message);
    }

    rl.close();
  });
});
