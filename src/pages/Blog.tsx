import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft, Calendar, User, Clock } from "lucide-react";
import { blogArticles } from "@/data/blogArticles";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = blogArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(blogArticles.map(article => article.category)));

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 border-l border-border"></div>
              <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-8 w-auto" />
              <h1 className="text-xl font-semibold text-foreground">CRM Insights Blog</h1>
            </div>
            <Button asChild style={{ backgroundColor: '#4AB830' }} className="hover:opacity-90">
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-leaflet-green to-success text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">CRM Insights & Best Practices</h1>
          <p className="text-xl opacity-90 mb-8">
            Expert advice on maximizing your CRM investment and boosting sales performance
          </p>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card text-foreground placeholder:text-muted-foreground border-border focus:border-leaflet-green focus:ring-leaflet-green"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge key={category} variant="secondary" className="text-sm">
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{article.category}</Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.readTime}
                  </div>
                </div>
                <CardTitle className="text-lg hover:text-leaflet-green transition-colors">
                  <Link to={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {article.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {article.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No articles found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or browse all categories above.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="px-8 py-10 bg-secondary text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <img src="/lovable-uploads/c0907da0-bd7a-4b1e-8a74-d019f4a02220.png" alt="Leaflet CRM" className="h-8 w-auto" />
          </div>
          <div className="flex justify-center space-x-8 mb-6">
            <Link to="/blog" className="text-muted-foreground hover:text-white transition-colors">
              Blog
            </Link>
            <Link to="/help" className="text-muted-foreground hover:text-white transition-colors">
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

export default Blog;
