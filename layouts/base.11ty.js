export default function base(data) {
  const { title, content, page = {}, collections } = data;
  console.log("Page URL:", page.url);
  const isHomePage = page.url === '/' || page.url === '/index/' || page.url === '/index.html';
  const mainContent = isHomePage ? `
    <div class="main-content">
     <section class="intro">
      <h1>Tear it all apart. See what's inside.</h1>
      <p>Every sensationalist statistic or story you hear is a carefully crafted illusion, designed to shape a narrative by obscuring its constituent elements — which are often the most crucial details. Our mission is to tear it all apart, expose the hidden pieces, and strip away the sensationalism to reveal what is real.</p>
      </section>
      <section class="blog-posts">
        <h2>latest posts</h2>
        <ul>${content}</ul>
      </section>
    </div>
  ` : `
    <div class="main-content">
      ${content}
    </div>
  `;

  const sidebar = `
    <div class="sidebar">
      <h2>about</h2>
      <p>a blog by prathith chivukula.</p>
      <h2>links</h2>
      <ul class=links>
        <li><a href="https://www.github.com/prethith">GitHub</a></li>
      </ul>
      <h2>categories</h2>
      <ul>
        ${collections && collections.categories ? 
          collections.categories.map(category => 
            `<li><a href="/category/${category}/">${category}</a></li>`
          ).join('') : 
          '<li>No categories found</li>'
        }
      </ul>
    </div>
`;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/static/css/style.css"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Space+Grotesk:wght@300..700&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Special+Gothic&display=swap" rel="stylesheet">
    <title>${title}</title>
  </head>
  <body>
    <header class="site-header" id="navbar">
      <nav>
        <a href="/"><img src="/static/images/banner.png" alt="DISAGGREGATE" class="banner_title" /></a>
      </nav>
    </header>
    <main class="site-main">
      ${mainContent}
      ${sidebar}
    </main>
    <script src="/static/js/navbar.js"></script>
  </body>
  </html>
  `;
}
