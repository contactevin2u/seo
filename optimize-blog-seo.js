// SEO Optimization Script for Blog Articles
// Adds Article schema and BreadcrumbList schema to all blog posts
// Run: node optimize-blog-seo.js

const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, 'blog');

// Extract title and date from HTML
function extractArticleInfo(html, filename) {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1].split('|')[0].trim() : filename.replace('.html', '').replace(/-/g, ' ');

  const dateMatch = html.match(/(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : '2025-01-01';

  const descMatch = html.match(/<meta name="description" content="([^"]+)"/i);
  const description = descMatch ? descMatch[1] : '';

  return { title, date, description };
}

// Generate Article schema
function generateArticleSchema(title, description, url, date) {
  return `{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${title}",
    "description": "${description}",
    "author": {
      "@type": "Organization",
      "name": "Oxygen Concentrator Malaysia"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Oxygen Concentrator Malaysia",
      "logo": {
        "@type": "ImageObject",
        "url": "https://oxygen-concentrator.my/images/logo.png"
      }
    },
    "datePublished": "${date}",
    "dateModified": "2025-12-17",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "${url}"
    }
  }`;
}

// Generate BreadcrumbList schema for blog
function generateBreadcrumbSchema(title, slug) {
  return `{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://oxygen-concentrator.my/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://oxygen-concentrator.my/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "${title.substring(0, 50)}",
        "item": "https://oxygen-concentrator.my/blog/${slug}"
      }
    ]
  }`;
}

// Process a single blog HTML file
function optimizeBlogPage(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);
  const slug = filename.replace('.html', '');

  // Skip if already has Article schema
  if (html.includes('"@type": "Article"') || html.includes('"@type":"Article"')) {
    console.log(`[SKIP] ${filename} (already has Article schema)`);
    return false;
  }

  const { title, date, description } = extractArticleInfo(html, filename);
  const url = `https://oxygen-concentrator.my/blog/${slug}`;

  // Generate schemas
  const articleSchema = generateArticleSchema(title, description, url, date);
  const breadcrumbSchema = generateBreadcrumbSchema(title, slug);

  // Add schemas before </head>
  const schemaBlock = `
  <!-- SCHEMA: Article -->
  <script type="application/ld+json">
  ${articleSchema}
  </script>

  <!-- SCHEMA: BreadcrumbList -->
  <script type="application/ld+json">
  ${breadcrumbSchema}
  </script>
`;

  // Insert before </head>
  html = html.replace('</head>', `${schemaBlock}</head>`);

  // Update year references
  html = html.replace(/2024/g, '2025');
  html = html.replace(/2026/g, '2025');

  // Add hreflang if not exists
  if (!html.includes('hreflang="en"')) {
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)">/i);
    if (canonicalMatch) {
      const canonicalUrl = canonicalMatch[1];
      const hreflangTags = `
  <link rel="alternate" hreflang="ms-MY" href="${canonicalUrl}">
  <link rel="alternate" hreflang="en-MY" href="${canonicalUrl}">`;
      html = html.replace(/<link rel="canonical"[^>]+>/i, `$&${hreflangTags}`);
    }
  }

  // Write updated file
  fs.writeFileSync(filePath, html, 'utf8');
  return true;
}

// Main execution
console.log('=== Blog SEO Optimization Script ===');
console.log('Target: blog folder');
console.log('');

// Get all HTML files in blog folder
const htmlFiles = fs.readdirSync(blogDir)
  .filter(f => f.endsWith('.html'))
  .map(f => path.join(blogDir, f));

console.log(`Found ${htmlFiles.length} blog articles to optimize`);
console.log('');

let successCount = 0;
let skipCount = 0;

for (const file of htmlFiles) {
  try {
    const result = optimizeBlogPage(file);
    if (result) {
      successCount++;
      console.log(`[OK] ${path.basename(file)}`);
    } else {
      skipCount++;
    }
  } catch (error) {
    console.error(`[ERROR] ${path.basename(file)}: ${error.message}`);
  }
}

console.log('');
console.log('=== Summary ===');
console.log(`Successfully optimized: ${successCount} files`);
console.log(`Skipped: ${skipCount} files`);
console.log('');
console.log('SEO Optimizations Applied:');
console.log('1. Article schema added');
console.log('2. BreadcrumbList schema added');
console.log('3. Year updated to 2025');
console.log('4. Hreflang tags added');
