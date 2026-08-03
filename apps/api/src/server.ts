import "dotenv/config";

import app from "./app";

import { env } from "./config/env";

import { logger } from "./utils/logger";

const port = env.PORT;

app.listen(port, () => {
  logger.info(`API running at http://localhost:${port}`);
});