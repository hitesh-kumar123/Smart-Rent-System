import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, User, Share2, Bookmark } from 'lucide-react';
import { blogs } from '../data/blog';
import MarkdownRenderer from '../components/MarkdownRenderer';

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // Find blog by ID (handle string/number mismatch)
    const blog = blogs.find(b => b.id === parseInt(slug));

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Post not found</h1>
                    <p className="text-gray-600 mb-8">The article you are looking for does not exist.</p>
                    <Link to="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
                        &larr; Back to all posts
                    </Link>
                </div>
            </div>
        );
    }

    // Common Header Components
    const BackButton = ({ className = "" }) => (
        <button
            onClick={() => navigate(-1)}
            className={`group flex items-center gap-2 text-sm font-medium transition-colors ${className}`}
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back
        </button>
    );

    const Metadata = ({ className = "" }) => (
        <div className={`flex flex-wrap items-center gap-4 text-sm ${className}`}>
            <div className="flex items-center gap-2">
                <img src={blog.authorImage} alt={blog.author} className="w-8 h-8 rounded-full border border-gray-200" />
                <span className="font-medium">{blog.author}</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-70">
                <Calendar className="w-4 h-4" />
                <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-70">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
            </div>
        </div>
    );

    // --- LAYOUTS ---

    // 1. Immersive Layout (Hero Image Full Width)
    if (blog.layout === 'immersive') {
        return (
            <div className="min-h-screen bg-white">
                {/* Full Width Hero */}
                <div className="relative h-[60vh] md:h-[70vh] w-full">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-12 pb-16">
                        <div className="max-w-4xl mx-auto w-full">
                            <div className="mb-6">
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {blog.category}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                {blog.title}
                            </h1>
                            <div className="text-white/90">
                                <Metadata className="text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Nav over image */}
                    <div className="absolute top-6 left-6 md:left-12">
                        <BackButton className="text-white/90 hover:text-white bg-black/20 hover:bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm" />
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-6 py-16 -mt-10 relative bg-white rounded-t-3xl md:rounded-none md:bg-transparent md:-mt-0 md:pt-16">
                    <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed font-light border-l-4 border-blue-500 pl-6 italic">
                        {blog.excerpt}
                    </p>
                    <MarkdownRenderer content={blog.content} />

                    {/* Footer Actions */}
                    <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
                        <div className="flex gap-4">
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <Bookmark className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 2. Minimal Layout (No Hero Image, Text Focus)
    if (blog.layout === 'minimal') {
        return (
            <div className="min-h-screen bg-[#fcfcfc]">
                <div className="max-w-3xl mx-auto px-6 pt-12 pb-24">
                    <div className="mb-12 border-b border-gray-100 pb-8">
                        <BackButton className="text-gray-500 hover:text-gray-900 mb-8" />
                        <p className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-3 text-center">
                            {blog.category}
                        </p>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center leading-tight">
                            {blog.title}
                        </h1>
                        <div className="flex justify-center">
                            <Metadata className="text-gray-500" />
                        </div>
                    </div>

                    <div className="prose prose-lg prose-slate max-w-none">
                        <p className="lead text-2xl text-gray-700 font-serif mb-10 text-center">
                            {blog.excerpt}
                        </p>
                        <MarkdownRenderer content={blog.content} />
                    </div>
                </div>
            </div>
        )
    }

    // 3. Classic / Standard Layout (Container, Image, Content)
    return (
        <div className="min-h-screen bg-gray-50 pt-10 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <BackButton className="text-gray-600 hover:text-gray-900 mb-8" />

                <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Header */}
                    <div className="p-6 md:p-10 pb-0">
                        <span className="text-blue-600 font-semibold tracking-wide text-sm uppercase">
                            {blog.category}
                        </span>
                        <h1 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                            {blog.title}
                        </h1>
                        <div className="mt-6 mb-8 flex items-center justify-between border-b border-gray-100 pb-8">
                            <Metadata className="text-gray-600" />
                            <div className="flex gap-2">
                                <button className="text-gray-400 hover:text-blue-600 transition-colors"><Share2 className="w-5 h-5" /></button>
                            </div>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="w-full aspect-video md:aspect-[21/9] bg-gray-200">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6 md:p-12 md:pt-10">
                        <p className="text-xl text-gray-600 mb-10 font-normal leading-relaxed">
                            {blog.excerpt}
                        </p>
                        <MarkdownRenderer content={blog.content} />
                    </div>
                </article>
            </div>
        </div>
    );
};

export default BlogPost;