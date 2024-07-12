"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageService = void 0;
const storage_blob_1 = require("@azure/storage-blob");
const api_error_1 = require("../exceptions/api-error");
exports.storageService = {
    writeFileToAzureStorage(fileName, fileBuffer) {
        return __awaiter(this, void 0, void 0, function* () {
            const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
            const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
            if (!connectionString || !containerName) {
                throw api_error_1.ApiError.BadRequest(409, 'Storage connection string and storage container name are required');
            }
            const blobFile = new storage_blob_1.BlockBlobClient(connectionString, containerName, fileName);
            yield blobFile.uploadData(fileBuffer);
            return blobFile;
        });
    },
};
//# sourceMappingURL=storage-service.js.map