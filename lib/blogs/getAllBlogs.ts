import { BlogCred, GetAllBlogs } from "@/interfaces/blogs";

import getPriorityWiseSlugs from "./getPriorityWiseSlugs";
import path from "path";
import getFilecontents from "./getFileContents";

/**
 * **Get All Blogs**
 * - Gets the blog dir path
 * - Gets priritywise blog content
 * - Runs through every slugs
 * - Creates a `slugHref` that can be used as parameter and `slugPath` that targets the file in file system
 * - Reads file content from a file
 * - Creates a blog creadential and retuns an array of blog credential
 * @returns Blog List with credentials
 */
const getAllBlogs: GetAllBlogs = async () => {
  const blogDir = path.join(process.cwd(), "blogs");
  const priorityWiseSlugs = await getPriorityWiseSlugs("blogs");
  const blogs: BlogCred[] = [];
  for (const slugArr of priorityWiseSlugs) {
    const slugHref = slugArr.map((s) => s.slug).join("/");
    const slugPath = slugArr
      .map((s) => {
        return s.priority ? `${s.priority}.${s.slug}` : s.slug;
      })
      .join("/");
    const filePath = path.join(blogDir, `${slugPath}.mdx`);
    const { meta } = await getFilecontents(filePath);

    const prorityHierarchy = slugArr.map<number | null>((p) => p.priority);
    const cred: BlogCred = {
      href: slugHref,
      filePath: `${slugPath}.mdx`,
      priority: prorityHierarchy,
      title: meta?.title || "Title",
      tldr: meta?.tldr || "TlDr",
    };
    blogs.push(cred);
  }
  return blogs;
};

export default getAllBlogs;
