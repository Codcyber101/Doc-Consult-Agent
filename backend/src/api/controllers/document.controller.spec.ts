import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController } from './document.controller';
import { StorageService } from '../../modules/storage/storage.service';
import { AuthGuard } from '../../modules/auth/auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('DocumentController', () => {
  let controller: DocumentController;
  let storageService: StorageService;

  const mockStorageService = {
    uploadFile: jest.fn().mockResolvedValue('govassist-docs/test-file.pdf'),
  };

  const mockAuthGuard = {
    canActivate: (context: ExecutionContext) => {
      const req = context.switchToHttp().getRequest();
      req.user = { id: 'user-123' };
      return true;
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [
        {
          provide: StorageService,
          useValue: mockStorageService,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<DocumentController>(DocumentController);
    storageService = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should upload a file and return document details', async () => {
    const mockFile = {
      originalname: 'test.pdf',
      buffer: Buffer.from('test'),
      mimetype: 'application/pdf',
    } as any;

    const mockReq = { user: { id: 'user-123' } };

    const result = await controller.uploadFile(mockFile, mockReq);

    expect(result).toHaveProperty('document_id');
    expect(result.storage_path).toBe('govassist-docs/test-file.pdf');
    expect(result.user_id).toBe('user-123');
    expect(storageService.uploadFile).toHaveBeenCalledWith('test.pdf', mockFile.buffer, 'application/pdf');
  });
});
