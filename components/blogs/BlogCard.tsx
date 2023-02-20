import { BlogCred } from "@/interfaces/blogs";
import type { FC } from "react";

type BlogCardProps = BlogCred;

const BlogCard: FC<BlogCardProps> = (props) => {
  return (
    <div className="p-4 rounded-md bg-slate-100 text-slate-800">
      <h2>{props.title}</h2>
      <p>{props.tldr}</p>
    </div>
  );
};

export default BlogCard;
