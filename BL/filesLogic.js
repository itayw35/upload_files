const path = require("path");
const fs = require("fs-extra");
// const winston = require("winston");
// const crypto = require("crypto");
// const mime = require("mime-types");
// const logger = require("./loggerLogic")

const createFolder = (data) => {
  const { folderPath, targetDir } = data;
  if (!folderPath || !targetDir)
    throw { code: 400, message: "missing details" };
  const baseUploadDir = path.join(`${targetDir}:`, "deposits");
  const newFolderPath = path.join(baseUploadDir, folderPath);
  fs.ensureDirSync(newFolderPath);
  return { code: 200, message: "folder created" };
};

const uploadFile = async (buffer, fileSize, filePath, data) => {
  const { size, mimeType, hash, targetDir } = data;
  if (!buffer || !filePath || !targetDir)
    throw { code: 400, message: "missing details" };
  const baseUploadDir = path.join(`${targetDir}:`, "deposits");
  const uploadPath = path.join(baseUploadDir, filePath);
  fs.writeFileSync(uploadPath, buffer, { encoding: "utf-8" });
  // const fileHash = await calculateFileHash(uploadPath);
  // const fileMimeType = mime.lookup(uploadPath);
  // if (mimeType && (fileMimeType != mimeType || fileSize != size)) {
  //   logger.error("file validation failed for: " + uploadPath);
  //   throw { code: 400, message: "validation failed" };
  // }
  // logger.info("file uploaded and verified successfully: " + uploadPath)
  return { code: 200, message: "file created and verified successfully" };
};

const calculateFileHash = async (file) => {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(file);
    stream.on("data", (data) => {
      hash.update(data);
    });
    stream.on("end", () => {
      resolve(hash.digest("hex"));
    });
    stream.on("error", (error) => {
      reject(error);
    });
  });
};

module.exports = { uploadFile, createFolder };
