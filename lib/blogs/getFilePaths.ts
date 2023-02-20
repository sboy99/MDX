import { GetFilePaths } from "@/interfaces/blogs";
import fs from "fs/promises";
import path from "path";

const getFilesPaths: GetFilePaths = async (dirPath, toRem = dirPath) => {
  let files: string[] = [];
  const items = await fs.readdir(dirPath, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory()) {
      files = [
        ...files,
        ...(await getFilesPaths(path.join(dirPath, item.name), toRem)),
      ];
    } else {
      const fPath = `${dirPath}/${item.name}`;
      files.push(fPath.replace(toRem, ""));
    }
  }
  return files;
};

export default getFilesPaths;
