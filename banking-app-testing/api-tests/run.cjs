// Runs the ParaBank collection with Newman.
// Credentials come from local.postman_environment.json (git-ignored) or the
// PARABANK_USERNAME / PARABANK_PASSWORD environment variables, never from the repo.
const fs = require('fs');
const path = require('path');
const newman = require('newman');

const dir = __dirname;
const localEnv = path.join(dir, 'local.postman_environment.json');
const environment = JSON.parse(
  fs.readFileSync(fs.existsSync(localEnv) ? localEnv : path.join(dir, 'parabank.postman_environment.json'), 'utf8'),
);

const overrides = {
  username: process.env.PARABANK_USERNAME,
  password: process.env.PARABANK_PASSWORD,
  customerId: process.env.PARABANK_CUSTOMER_ID,
};
for (const [key, value] of Object.entries(overrides)) {
  if (!value) continue;
  const variable = environment.values.find((v) => v.key === key);
  if (variable) variable.value = value;
  else environment.values.push({ key, value, enabled: true });
}

newman.run(
  {
    collection: path.join(dir, 'parabank.postman_collection.json'),
    environment,
    reporters: ['cli', 'junit'],
    reporter: { junit: { export: path.join(dir, 'results', 'junit.xml') } },
    timeoutRequest: 30000,
    // ParaBank sits behind Cloudflare and answers 429 when requests come too fast
    delayRequest: 400,
  },
  (err, summary) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const failures = summary.run.failures.length;
    process.exit(failures > 0 ? 1 : 0);
  },
);
