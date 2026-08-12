require('dotenv').config({ path: '.env.local' });
const { list } = require('@vercel/blob');

async function test() {
  const { blobs } = await list({ prefix: 'goa-id-726e4d93ee18d2d1205dd95919ccb5dd' });
  console.log(blobs);
}
test();
