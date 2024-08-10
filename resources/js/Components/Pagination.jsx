import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        links.length > 0 && (
            <div className="flex mt-8 gap-1">
                {links.map((link, key) => (
                    <Link
                        key={key}
                        href={link.url}
                        className={`px-4 py-2 border border-indigo-600 rounded-md ${
                            link.active
                                ? "bg-indigo-600 text-white "
                                : "text-indigo-600 hover:bg-indigo-600 hover:text-white"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        )
    );
}
