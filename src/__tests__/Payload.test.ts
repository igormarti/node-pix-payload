import Payload from '../index';

test('Testing payload text static', async () => {
  const payload = Payload.setPixKey('1c995784-b8a4-482a-952e-4b8cd6928216')
    .setDescription('payment xyz')
    .setMerchantName('IJ Solutions')
    .setMerchantCity('MACEIO')
    .setAmount('100.00')
    .setTxid('ij123');

  expect((await payload.getData()).text_payload).toBe(
    '00020126730014br.gov.bcb.pix01361c995784-b8a4-482a-952e-4b8cd69282160211payment xyz5204000053039865406100.005802BR5912IJ Solutions6006MACEIO62090505ij1236304BAA9',
  );
});

test('Testing payload text dynamic', async () => {
  const location = 'qrpix.seupsp.com.br/qr/v2/c-8c7193b-34cc6180be87850a-89193060-9705a6b8';
  const payload = Payload.setMerchantName('IJ Company')
    .setMerchantCity('MACEIO')
    .setAmount('548.78')
    .setTxid('***')
    .setUrl(location)
    .setUniquePayment(true);

  const text = (await payload.getData()).text_payload;

  expect(text).toBe(
    '00020101021226920014br.gov.bcb.pix2570qrpix.seupsp.com.br/qr/v2/c-8c7193b-34cc6180be87850a-89193060-9705a6b85204000053039865406548.785802BR5910IJ Company6006MACEIO62070503***6304DA32',
  );
});

test('Testing payload qrcode base64.', async () => {
  const payload = Payload.setPixKey('1c995784-b8a4-482a-952e-4b8cd6928216')
    .setDescription('payment xyz')
    .setMerchantName('IJ Solutions')
    .setMerchantCity('MACEIO')
    .setAmount('100.00')
    .setTxid('ij123');

  const base64_qrcode = (await payload.getData()).qrcode_payload;

  expect(base64_qrcode).toContain('base64');
});
