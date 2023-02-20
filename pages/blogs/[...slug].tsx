import { getAllBlogs } from "@/lib/blogs";
import getBlogPaths from "@/lib/blogs/getBlogPaths";
import getSingleBlogContent from "@/lib/blogs/getSingleBlogContent";
import getMdxSource from "@/lib/mdx/getMdxSource";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import React from "react";

import type { FC } from "react";

interface IBlogMeta {
  [key: string]: string;
}

type BlogProps = {
  meta: IBlogMeta;
  source: MDXRemoteSerializeResult;
};

const Blog: FC<BlogProps> = ({ source, meta }) => {
  console.log(meta);
  return (
    <div>
      <MDXRemote {...source} />
    </div>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths<{ slug: string[] }> = async () => {
  const paths = await getBlogPaths("blogs");
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<BlogProps> = async ({ params }) => {
  try {
    const { slug } = params as { slug: string[] };
    const blogs = await getAllBlogs();
    //! Might create issue in production, so deploy and test if its working
    const filePath = blogs.find(
      (blog) => blog.href === slug.join("/")
    )?.filePath;
    if (!filePath) throw new Error("File path not found");
    const { content, meta } = await getSingleBlogContent("blogs", filePath);
    const source = await getMdxSource(content);
    return {
      props: {
        meta,
        source,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};
