import base from "./base.11ty.js";

export default function postLayout(data) {
  const { title, content, date, category, categories, tags = [], collections } = data;
  
  // Handle both category and categories fields
  let allCategories = [];
  
  // Add singular category if present
  if (category) {
    if (Array.isArray(category)) {
      allCategories = [...allCategories, ...category.filter(Boolean)];
    } else {
      allCategories.push(category);
    }
  }
  
  // Add plural categories if present
  if (categories) {
    if (Array.isArray(categories)) {
      allCategories = [...allCategories, ...categories.filter(Boolean)];
    } else {
      allCategories.push(categories);
    }
  }
  
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const postHTML = `
    <article class="post">
      <header>
        <h1>${title}</h1>
        <p>${formattedDate}</p>
      </header>
      <section class="post-content">
        ${content}
      </section>
      <footer class="post-footer">
      </footer>
    </article>
    <link rel="stylesheet" href="/static/css/posts.css" />
  `;
  
  // Pass the entire data object to base template
  return base({
    ...data,
    content: postHTML
  });
}
