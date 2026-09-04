
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
      <div className="min-h-screen bg-muted flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-leaflet-green hover:text-leaflet-green-hover">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header with sticky glassmorphism */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/blog" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Blog
              </Link>
              <div className="h-6 border-l border-border"></div>
              <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-8 w-auto" />
            </div>
            <Button asChild style={{ backgroundColor: '#4AB830' }} className="hover:opacity-90">
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Article with top padding to account for fixed header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card rounded-xl shadow-sm border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <div className="w-1 h-6 bg-leaflet-green rounded-full mr-3"></div>
                  Table of Contents
                </h3>
                {article.tableOfContents && (
                  <nav className="space-y-3">
                    {article.tableOfContents.map((item, index) => (
                      <a
                        key={index}
                        href={`#${item.id}`}
                        className="block text-sm text-muted-foreground hover:text-leaflet-green transition-colors py-2 px-3 rounded-lg hover:bg-muted border-l-2 border-transparent hover:border-leaflet-green"
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <article className="lg:col-span-3">
            <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
              {/* Article Header */}
              <div className="bg-gradient-to-r from-muted to-card p-8 border-b border-border">
                <div className="flex items-center gap-4 mb-6">
                  <Badge variant="outline" className="bg-leaflet-green/10 text-leaflet-green border-leaflet-green/20 font-medium">
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                  {article.title}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <div className="flex items-center bg-card px-3 py-2 rounded-lg shadow-sm">
                      <User className="h-4 w-4 mr-2" />
                      <span className="font-medium">{article.author}</span>
                    </div>
                    <div className="flex items-center bg-card px-3 py-2 rounded-lg shadow-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="hover:bg-leaflet-green hover:text-white hover:border-leaflet-green">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                <div className="prose prose-lg prose-slate max-w-none 
                  prose-headings:text-foreground prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-leaflet-green
                  prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6
                  prose-ul:my-6 prose-li:mb-2 prose-li:text-foreground
                  prose-ol:my-6 prose-ol:text-foreground
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-a:text-leaflet-green prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-4 prose-blockquote:border-leaflet-green prose-blockquote:bg-muted prose-blockquote:p-4 prose-blockquote:rounded-r-lg
                  [&_section]:scroll-mt-20
                  [&_section:not(:first-child)]:mt-16
                  [&_section:not(:first-child)]:pt-8
                  [&_section:not(:first-child)]:border-t
                  [&_section:not(:first-child)]:border-border">
                  {article.content}
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-16">
              <div className="flex items-center mb-8">
                <div className="w-1 h-8 bg-leaflet-green rounded-full mr-4"></div>
                <h3 className="text-3xl font-bold text-foreground">Related Articles</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogArticles
                  .filter(a => a.category === article.category && a.id !== article.id)
                  .slice(0, 2)
                  .map(relatedArticle => (
                    <div key={relatedArticle.id} className="bg-card rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow group">
                      <Badge variant="outline" className="mb-4 bg-leaflet-green/10 text-leaflet-green border-leaflet-green/20">
                        {relatedArticle.category}
                      </Badge>
                      <h4 className="font-bold text-foreground mb-3 text-lg group-hover:text-leaflet-green transition-colors">
                        <Link to={`/blog/${relatedArticle.slug}`}>
                          {relatedArticle.title}
                        </Link>
                      </h4>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{relatedArticle.excerpt}</p>
                      <div className="flex items-center text-xs text-muted-foreground pt-3 border-t border-border">
                        <span className="font-medium">{relatedArticle.author}</span>
                        <span className="mx-2">•</span>
                        <span>{relatedArticle.readTime}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-leaflet-green to-leaflet-green-hover text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Implement These Strategies?</h2>
          <p className="text-xl opacity-90 mb-10 leading-relaxed">
            Start your CRM journey with Leaflet CRM and transform your customer relationships.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="text-leaflet-green hover:bg-card/90 font-semibold px-8 py-3">
              Try Leaflet CRM Today
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-8 py-12 bg-secondary text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-10 w-auto" />
          </div>
          <div className="flex justify-center space-x-8 mb-8">
            <Link to="/blog" className="text-muted-foreground hover:text-white transition-colors font-medium">
              Blog
            </Link>
            <Link to="/help" className="text-muted-foreground hover:text-white transition-colors font-medium">
              Help
            </Link>
          </div>
          <p className="text-muted-foreground text-lg text-center">
            © 2025 Leaflet CRM. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlogArticle;
