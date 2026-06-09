interface ProjectCardProps {
  title: string;
  description: string;
  links: { label: string; href: string; emoji?: string }[];
}

export default function ProjectCard({ title, description, links }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-coffee-200 p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-coffee-900 mb-2">{title}</h3>
      <p className="text-coffee-600 text-sm mb-4 leading-relaxed">{description}</p>
      <div className="space-y-2">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-coffee-700 hover:text-coffee-900 transition-colors group"
          >
            <span className="text-lg group-hover:scale-110 transition-transform">
              {link.emoji || "🔗"}
            </span>
            <span className="underline underline-offset-2 decoration-coffee-400 group-hover:decoration-coffee-700">
              {link.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
