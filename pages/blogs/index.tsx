import { BlogCard } from "@/components/blogs";
import { BlogCred } from "@/interfaces/blogs";
import { getAllBlogs } from "@/lib/blogs";
import { GetStaticProps } from "next";
import Link from "next/link";
import type { FC } from "react";

type BlogsProps = {
  blogs: BlogCred[];
};

const Blogs: FC<BlogsProps> = ({ blogs }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {blogs.map((blog) => (
        <Link key={blog.href} href={`blogs/${blog.href}`}>
          <BlogCard key={blog.href} {...blog} />
        </Link>
      ))}
    </div>
  );
};

export default Blogs;

export const getStaticProps: GetStaticProps<BlogsProps> = async () => {
  const blogs = await getAllBlogs();

  return {
    props: {
      blogs,
    },
  };
};
