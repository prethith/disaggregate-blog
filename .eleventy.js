export default async function(eleventyConfig) {
  eleventyConfig.setInputDirectory("content");
  eleventyConfig.setLayoutsDirectory("../layouts");
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.setOutputDirectory("_site");
  eleventyConfig.setTemplateFormats(["md", "11ty.js"]);
  
  // Blog posts collection
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("content/blog/**/*.md").reverse();
  });
  
  // Categories collection - handle both category and categories
  eleventyConfig.addCollection("categories", function(collectionApi) {
    const categorySet = new Set();
    collectionApi.getAll().forEach((item) => {
      // Handle singular category
      if (item.data.category) {
        if (Array.isArray(item.data.category)) {
          item.data.category.forEach(cat => cat && categorySet.add(cat));
        } else if (item.data.category) {
          categorySet.add(item.data.category);
        }
      }
      
      // Handle plural categories
      if (item.data.categories) {
        if (Array.isArray(item.data.categories)) {
          item.data.categories.forEach(cat => cat && categorySet.add(cat));
        } else if (item.data.categories) {
          categorySet.add(item.data.categories);
        }
      }
    });
    return [...categorySet].sort();
  });
  
  // Category pages collection for data access
  eleventyConfig.addCollection("categoryData", function(collectionApi) {
    const postsByCategory = {};
    
    collectionApi.getFilteredByGlob("content/blog/**/*.md").forEach((post) => {
      // Process singular category
      if (post.data.category) {
        const categories = Array.isArray(post.data.category) ? post.data.category : [post.data.category];
        categories.filter(Boolean).forEach((category) => {
          if (!postsByCategory[category]) {
            postsByCategory[category] = [];
          }
          postsByCategory[category].push(post);
        });
      }
      
      // Process plural categories
      if (post.data.categories) {
        const categories = Array.isArray(post.data.categories) ? post.data.categories : [post.data.categories];
        categories.filter(Boolean).forEach((category) => {
          if (!postsByCategory[category]) {
            postsByCategory[category] = [];
          }
          postsByCategory[category].push(post);
        });
      }
    });
    
    // Return the raw data for use in templates
    return postsByCategory;
  });
};
