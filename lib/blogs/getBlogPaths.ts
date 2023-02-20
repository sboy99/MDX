import getPriorityWiseSlugs from "./getPriorityWiseSlugs";

interface IBlogPaths {
  params: {
    slug: string[];
  };
}

const getBlogPaths = async (targetDir: string): Promise<IBlogPaths[]> => {
  const slugsWithPriority = await getPriorityWiseSlugs(targetDir);
  return slugsWithPriority.map((slugWithPriority) => {
    return {
      params: {
        slug: slugWithPriority.map((s) => s.slug),
      },
    };
  });
};

export default getBlogPaths;
