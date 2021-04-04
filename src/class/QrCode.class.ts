import QRCode from 'qrcode';
import { QrCode as QrCodeInteface } from '../interfaces/index.inteface';

class QrCode {
  /**
   * generate payload qrcode
   */
  async generateQrCode(text: string): Promise<string> {
    const url = await QRCode.toDataURL(text);
    return url;
  }

  /**
   * this function is responsible for generate image qrcode saving in a path,
   * possible output formats are: png, svg and utf8. format default is png.
   * @param path
   * @param text
   * @param format
   * @return void
   */
  outPutImage(data: QrCodeInteface): void {
    QRCode.toFile(data.path, data.text, { type: data.format }, (err: any) => {
      if (err) throw err;
    });
  }
}

export default new QrCode();
