import CashMachine from "../domain/CashMachine";
import createApp from "./createApp";

const app = createApp(new CashMachine());

const port = process.env.API_PORT || "8080";

app.listen(port, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`listening on port ${port}`);
  }
});
