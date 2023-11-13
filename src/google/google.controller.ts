import { Controller, Get } from '@nestjs/common';
import { GoogleService } from './google.service';

@Controller('google-drive')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('download-file-html')
  async downloadFileAsHTML() {
    const authClient = await this.googleService.authorize();
    return this.googleService.downloadFileAsHTML(authClient);
  }
}