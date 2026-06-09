import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "博客",
  description: "咖啡大师博客 - 分享咖啡知识、技术见解和项目动态",
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <span className="text-4xl mb-4 block">📝</span>
          <h1 className="text-4xl font-bold text-coffee-900 mb-4">博客</h1>
          <p className="text-lg text-coffee-600 max-w-2xl mx-auto">
            分享咖啡知识、技术见解和项目动态
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">📭</span>
            <p className="text-coffee-500 text-lg">暂无文章，敬请期待...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl shadow-md border border-coffee-200 p-6 hover:shadow-lg transition-shadow"
              >
                <Link href={`/blog/${post.slug}/`}>
                  <h2 className="text-xl font-bold text-coffee-900 mb-2 hover:text-coffee-600 transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-coffee-600 text-sm mb-4">
                  {post.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-coffee-400">
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
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="text-coffee-600 hover:text-coffee-800 text-sm font-medium flex items-center gap-1 transition-colors"
                  >
                    阅读全文
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
