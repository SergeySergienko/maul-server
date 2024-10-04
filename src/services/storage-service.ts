import { BlockBlobClient } from '@azure/storage-blob';
import { ApiError } from '../exceptions/api-error';
import { parseBlobUrl } from '../utils';

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

export const storageService = {
  async writeFileToAzureStorage(
    containerName: string,
    fileName: string,
    fileBuffer: Buffer
  ) {
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

  async deleteFileFromAzureStorage(photoUrl: string) {
    if (!connectionString) {
      throw ApiError.ServerError('Storage connection string is required');
    }

    const { containerName, blobName } = parseBlobUrl(photoUrl);

    const blobFile = new BlockBlobClient(
      connectionString,
      containerName,
      blobName
    );
    const response = await blobFile.delete({ deleteSnapshots: 'include' });

    return response;
  },
};
