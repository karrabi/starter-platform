import "dotenv/config";

import app from "./app";

import { env } from "./config/env";

const port = env.PORT;

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});