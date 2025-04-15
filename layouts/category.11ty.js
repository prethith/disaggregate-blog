export default function categoryLayout(data) {
  const { category, collections } = data;
  
  // Get posts for this category
  const posts = collections.categoryData ? collections.categoryData[category] || [] : [];
  
  const content = `
    <div class="main-content">
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
    </div>
  `;
  
  return content;
}

export function data() {
  return {
    layout: "base",
    eleventyComputed: {
      title: data => `Category: ${data.category}`
    }
  };
}
