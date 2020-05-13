/**
 * Configuration file for handling uploads
 */
import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

// `resolve` correctly returns the folder path accordingly with the OS
const folderPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  // directory: folderPath,
  tempFolder: folderPath,
  uploadsFolder: path.resolve(folderPath, 'uploads'),
  storage: multer.diskStorage({
    destination: folderPath,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};

/**
 * - directory: upload folder
 * - storage: multer configuration option
 * -- destination: upload folder
 * -- filename: callback function used to create a pattern for file names.
 * --- Here we are appending the original filename to 10 bytes of random
 *     generated chars (a8c0f88941395a9dcb8a-filename)
 */
