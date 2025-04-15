export default class CategoryPages {
  data() {
    return {
      pagination: {
        data: "collections.categories",
        size: 1,
        alias: "category"
      },
      permalink: data => `/category/${data.category}/`,
      layout: "base",
      eleventyComputed: {
        title: data => `Category: ${data.category}`
      }
    };
  }

  render(data) {
    const { category, collections } = data;
    const posts = collections.categoryData && collections.categoryData[category] ? 
      collections.categoryData[category] : [];
    
    return `
      <div class="main-content category-page">
        <h1>Category: ${category}</h1>
        <ul>
          ${posts.map(post => `
            <li>
              <a href="${post.url}">${post.data.title}</a>
              ${post.data.date ? `<span>${new Date(post.data.date).toLocaleDateString()}</span>` : ''}
            </li>
          `).join('')}
        </ul>
        <p><a href="/">Back to Home</a></p>
        <link rel="stylesheet" href="/static/css/category.css" />
      </div>
    `;
  }
}
