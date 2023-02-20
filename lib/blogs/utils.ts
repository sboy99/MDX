import { z } from "zod";

export const selectFilesByExtension = (
  filelist: string[],
  ...ext: string[]
): string[] => {
  return filelist.filter((file) => {
    const _ext = file.substring(file.lastIndexOf(".") + 1, file.length);
    return ext.includes(_ext);
  });
};

export const removeExtensions = (filelist: string[]) => {
  return filelist.flatMap((file) => {
    return file.substring(0, file.lastIndexOf("."));
  });
};

export const getSlugArr = (paths: string[]) => {
  const slugs: string[][] = [];
  paths.forEach((path) => {
    slugs.push([...path.split("/").filter((dir) => dir !== "")]);
  });
  return slugs;
};

export interface ISlugWithPriority {
  slug: string;
  priority: number | null;
}

export const extractPriorityFromSlug = (
  slugs: string[][]
): ISlugWithPriority[][] => {
  const priorityWiseSlugs: ISlugWithPriority[][] = [];
  for (const slugArr of slugs) {
    const pSlugs = slugArr.map((slug) => {
      const isNumber = z.number();
      const priority = isNumber.safeParse(parseInt(slug.split(".")[0])).success
        ? parseInt(slug.split(".")[0])
        : null;
      return {
        priority,
        slug: slug.replace(`${priority}.`, ""),
      };
    });
    priorityWiseSlugs.push(pSlugs);
  }
  return priorityWiseSlugs;
};
