import { Injectable } from '@nestjs/common';
import Jimp from "jimp";

@Injectable()
export class AnalyzerService {
  async analize() {
    await this.getImg();
  }

  async getImg() {
    const myPath = `C:\\Users\\jagam\\Desktop\\1.Sukcesja\\Access Management\\access-management-be\\src\\public\\fingerprints\\zksiazki.jpg`;
    const fingerprintImage001 = await Jimp.read(myPath);
    fingerprintImage001.write('src/public/fingerprints/generated/fingerprintImage_step_1.jpg');
  }
}
