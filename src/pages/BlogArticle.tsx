
import { useParams, Link } from "react-router-dom";
import { blogArticles } from "@/data/blogArticles";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BlogArticle = () => {
  const { slug } = useParams();
  const article = blogArticles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-leaflet-green hover:text-leaflet-green-hover">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/blog" className="flex items-center text-slate-600 hover:text-slate-900">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Blog
              </Link>
              <div className="h-6 border-l border-slate-300"></div>
              <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-8 w-auto" />
            </div>
            <Link to="/login" className="text-leaflet-green hover:text-leaflet-green-hover font-medium">
              Login to CRM
            </Link>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="outline">{article.category}</Badge>
              <div className="flex items-center text-sm text-slate-500">
                <Clock className="h-4 w-4 mr-1" />
                {article.readTime}
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {article.title}
            </h1>
            
            <p className="text-xl text-slate-600 mb-6">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-slate-500">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {article.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {article.date}
                </div>
              </div>
              
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg prose-slate max-w-none">
            {article.content}
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogArticles
              .filter(a => a.category === article.category && a.id !== article.id)
              .slice(0, 2)
              .map(relatedArticle => (
                <div key={relatedArticle.id} className="bg-white rounded-lg p-6 shadow-sm">
                  <Badge variant="outline" className="mb-2">{relatedArticle.category}</Badge>
                  <h4 className="font-semibold text-slate-900 mb-2">
                    <Link to={`/blog/${relatedArticle.slug}`} className="hover:text-leaflet-green">
                      {relatedArticle.title}
                    </Link>
                  </h4>
                  <p className="text-slate-600 text-sm mb-3">{relatedArticle.excerpt}</p>
                  <div className="flex items-center text-xs text-slate-500">
                    <span>{relatedArticle.author}</span>
                    <span className="mx-2">•</span>
                    <span>{relatedArticle.readTime}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </article>

      {/* CTA Section */}
      <div className="bg-leaflet-green text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Implement These Strategies?</h2>
          <p className="text-xl opacity-90 mb-8">
            Start your CRM journey with Leaflet CRM and transform your customer relationships.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary">
              Try Leaflet CRM Today
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-8 py-10 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-8 w-auto" />
          </div>
          <div className="flex justify-center space-x-8 mb-6">
            <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
              Blog
            </Link>
            <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
              Help
            </Link>
          </div>
          <p className="text-gray-400 text-lg text-center">
            © 2025 Leaflet CRM. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlogArticle;
