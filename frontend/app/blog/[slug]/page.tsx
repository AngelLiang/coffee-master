import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPosts, getBlogPostHtml } from "@/lib/blog";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return { title: "文章未找到" };
  }
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = await getBlogPostHtml(slug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            href="/blog/"
            className="text-coffee-600 hover:text-coffee-800 text-sm flex items-center gap-1 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回博客列表
          </Link>
        </nav>

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-coffee-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-coffee-500">
            <span className="flex items-center gap-1">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {post.date || "暂无日期"}
            </span>
            {post.tags.length > 0 && (
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  />
                </svg>
                {post.tags.join(", ")}
              </span>
            )}
          </div>
        </header>

        {/* Post Content */}
        <article className="bg-white rounded-xl shadow-md border border-coffee-200 p-6 md:p-8">
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>

        {/* Post Footer */}
        <div className="mt-8 pt-8 border-t border-coffee-200">
          <Link
            href="/blog/"
            className="text-coffee-600 hover:text-coffee-800 text-sm flex items-center gap-1 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回博客列表
          </Link>
        </div>
      </div>
    </div>
  );
}
