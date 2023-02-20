import getFilesPaths from "./getFilePaths";
import path from "path";
import {
  extractPriorityFromSlug,
  getSlugArr,
  removeExtensions,
  selectFilesByExtension,
} from "./utils";

const getPriorityWiseSlugs = async (targetDir: string) => {
  const blogsDir = path.join(process.cwd(), targetDir);
  const filesSlug = await getFilesPaths(blogsDir);
  const onlyMdxFiles = selectFilesByExtension(filesSlug, "mdx");
  const withoutExtensions = removeExtensions(onlyMdxFiles);
  const slugArr = getSlugArr(withoutExtensions);
  const priorityWiseSlugs = extractPriorityFromSlug(slugArr);
  return priorityWiseSlugs;
};

export default getPriorityWiseSlugs;
