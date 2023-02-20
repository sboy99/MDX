import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

const getMdxSource = async (
  content: string
): Promise<MDXRemoteSerializeResult> => {
  const source = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [],
      remarkPlugins: [],
    },
  });

  return source;
};

export default getMdxSource;
