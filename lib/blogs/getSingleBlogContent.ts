import matter from "gray-matter";
import fs from "fs/promises";
import path from "path";

const getSingleBlogContent = async (targetDir: string, filePath: string) => {
  const fPath = path.join(process.cwd(), targetDir, filePath);
  const fBuffer = await fs.readFile(fPath);
  const { content, data } = matter(fBuffer);
  return {
    content,
    meta: data,
  };
};

export default getSingleBlogContent;
