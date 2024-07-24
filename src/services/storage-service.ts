import { BlockBlobClient } from '@azure/storage-blob';
import { ApiError } from '../exceptions/api-error';

export const storageService = {
  async writeFileToAzureStorage(
    containerName: string,
    fileName: string,
    fileBuffer: Buffer
  ) {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (!connectionString) {
      throw ApiError.ServerError('Storage connection string is required');
    }

    const blobFile = new BlockBlobClient(
      connectionString,
      containerName,
      fileName
    );

    await blobFile.uploadData(fileBuffer);

    return blobFile;
  },
};
