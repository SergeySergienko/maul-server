import { BlockBlobClient } from '@azure/storage-blob';
import { ApiError } from '../exceptions/api-error';

export const storageService = {
  async writeFileToAzureStorage(fileName: string, fileBuffer: Buffer) {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

    if (!connectionString || !containerName) {
      throw ApiError.BadRequest(
        409,
        'Storage connection string and storage container name are required'
      );
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
