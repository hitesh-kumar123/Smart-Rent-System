import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github-dark-dimmed.css'; // or any other theme

const MarkdownRenderer = ({ content }) => {
    return (
        <article className="prose prose-lg prose-slate max-w-none
      prose-headings:font-bold prose-headings:tracking-tight 
      prose-h1:text-4xl prose-h1:mb-6 prose-h1:text-slate-900 
      prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-slate-800 
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-slate-800 
      prose-p:leading-relaxed prose-p:mb-6 prose-p:text-slate-700 
      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:bg-gray-50  prose-blockquote:py-2 prose-blockquote:pr-2 prose-blockquote:rounded-r
      prose-img:rounded-xl prose-img:shadow-lg prose-img:w-full prose-img:my-8
      prose-code:text-pink-600  prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-gray-900 prose-pre:text-zinc-00 prose-pre:shadow-xl prose-pre:rounded-xl prose-pre:p-6
      ">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    // Custom override for images to add extra styling if needed
                    img: ({ node, ...props }) => (
                        <span className="block my-8">
                            <img {...props} className="rounded-xl shadow-lg w-full object-cover max-h-[500px]" alt={props.alt || ''} />
                        </span>
                    ),
                    // Custom override for links to open in new tab if external
                    a: ({ node, ...props }) => {
                        const isExternal = props.href && (props.href.startsWith('http') || props.href.startsWith('https'));
                        return (
                            <a
                                {...props}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                            />
                        )
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
};

export default MarkdownRenderer;
