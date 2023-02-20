import matter from "gray-matter";
import fs from "fs/promises";

export default async function getFilecontents(filePath: string) {
  const file = await fs.readFile(filePath);
  const { content, data } = matter(file);
  return {
    meta: data,
    content,
  };
}
