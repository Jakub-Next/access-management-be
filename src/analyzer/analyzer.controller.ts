import {Controller, Get, UseInterceptors} from '@nestjs/common';
import {AnalyzerService} from "./analyzer.service";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {multerStorage} from "../utils/multer-storage";
import {fileStorageFolder} from "../utils/file-storage-folder";

@Controller('analyzer')
export class AnalyzerController {
  constructor(
      private readonly analyzerService: AnalyzerService,
  ) {
  }

  @Get('/analize')
  @UseInterceptors(FileFieldsInterceptor([
    {
      name: 'finger_img',
      maxCount: 1,
    }
  ], {
    storage: multerStorage(fileStorageFolder('fingerprints')),
  }))
  async analize() {
    return this.analyzerService.analize();
  }
}
