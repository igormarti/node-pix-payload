// @ts-nocheck
import crc from 'node-crc';

class Crc {
  /**
   * this method is responsible for calcule crc16 and generate validation hash of the pix code.
   */
  calculeCrc16(payload: string) {
    return crc.crcccitt(Buffer.from(payload, 'utf8'), {}).toString('hex').toUpperCase();
  }
}

export default new Crc();
