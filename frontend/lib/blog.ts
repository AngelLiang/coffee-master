import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content: string;
}

const blogDirectory = path.join(process.cwd(), "content", "blog");

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const files = fs.readdirSync(blogDirectory);
  const mdFiles = files.filter((file) => file.endsWith(".md"));

  const posts = mdFiles.map((file) => {
    const slug = file.replace(".md", "");
    const fullPath = path.join(blogDirectory, file);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      description: data.description || "",
      tags: data.tags || [],
      content: "",
    };
  });

  // Sort by date descending
  return posts.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(blogDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "",
    description: data.description || "",
    tags: data.tags || [],
    content,
  };
}

export async function getBlogPostHtml(slug: string): Promise<string> {
  const post = getBlogPostBySlug(slug);
  if (!post) return "";

  const result = await remark().use(html).process(post.content);
  return result.toString();
}
