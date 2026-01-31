import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { StorageService } from "../../modules/storage/storage.service";
import { AuthGuard } from "../../modules/auth/auth.guard";
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from "@nestjs/swagger";

@ApiTags("Documents")
@Controller("documents")
export class DocumentController {
  constructor(private readonly storageService: StorageService) {}

  @Post("upload")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  @ApiConsumes("multipart/form-data")
  @ApiOperation({ summary: "Upload a document for analysis" })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
      },
    },
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req: any) {
    const storagePath = await this.storageService.uploadFile(
      file.originalname,
      file.buffer,
      file.mimetype,
    );
    // In real app, save to DB here (T009 entities)
    return {
      document_id: Math.random().toString(36).substring(7),
      storage_path: storagePath,
      user_id: req.user.id,
    };
  }
}
