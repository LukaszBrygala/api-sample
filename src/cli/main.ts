const axios = require("axios");

const baseUrl = process.env.API_URL || "http://localhost:8080";
const [, , amount] = process.argv;

async function main() {
  if (!amount) {
    console.log("amount argument missing");
    return;
  }

  if (!amount.match(/^[0-9]+$/)) {
    console.log("amount must be a positive integer");
    return;
  }

  try {
    const response = await axios.get(`${baseUrl}/withdraw/${amount}`);
    console.log(response.data);
  } catch (e) {
    console.error(e.message);
    if (e.response && e.response.data) {
      console.error(e.response.data);
    }
  }
}

main();
