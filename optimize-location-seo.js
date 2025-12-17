// SEO Optimization Script for Location Pages
// Adds bilingual keywords (BM + EN), BreadcrumbList schema, and optimizes meta tags
// Run: node optimize-location-seo.js

const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'sewa-oksigen-lokasi');

// State name mappings for English
const stateEnglishNames = {
  'johor': 'Johor',
  'kedah': 'Kedah',
  'kelantan': 'Kelantan',
  'kuala-lumpur': 'Kuala Lumpur',
  'labuan': 'Labuan',
  'melaka': 'Melaka',
  'negeri-sembilan': 'Negeri Sembilan',
  'pahang': 'Pahang',
  'penang': 'Penang',
  'perak': 'Perak',
  'perlis': 'Perlis',
  'sabah': 'Sabah',
  'sarawak': 'Sarawak',
  'selangor': 'Selangor',
  'terengganu': 'Terengganu'
};

// Extract location info from file path
function extractLocationFromPath(filePath) {
  const parts = filePath.split(path.sep);
  const stateFolder = parts.find(p => p.startsWith('rent-oxygen-'));
  const cityFolder = parts.find(p => p.startsWith('sewa-mesin-oksigen-'));

  if (!stateFolder || !cityFolder) return null;

  const stateSlug = stateFolder.replace('rent-oxygen-', '');
  const citySlug = cityFolder.replace('sewa-mesin-oksigen-', '');
  const cityName = citySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const stateName = stateEnglishNames[stateSlug] || stateSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return { stateSlug, citySlug, cityName, stateName };
}

// Generate BreadcrumbList schema
function generateBreadcrumbSchema(stateName, cityName, stateSlug, citySlug) {
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
        "name": "Sewa Oksigen",
        "item": "https://oxygen-concentrator.my/sewa-oxygen-concentrator"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "${stateName}",
        "item": "https://oxygen-concentrator.my/sewa-oksigen-lokasi/rent-oxygen-${stateSlug}"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "${cityName}",
        "item": "https://oxygen-concentrator.my/sewa-oksigen-lokasi/rent-oxygen-${stateSlug}/sewa-mesin-oksigen-${citySlug}"
      }
    ]
  }`;
}

// Process a single HTML file
function optimizeLocationPage(filePath) {
  const location = extractLocationFromPath(filePath);
  if (!location) {
    console.log(`Skipping: ${filePath} (could not extract location)`);
    return false;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  const { stateSlug, citySlug, cityName, stateName } = location;

  // 1. Update title tag - add bilingual keywords
  const oldTitleRegex = /<title>Sewa Oxygen Concentrator ([^|]+)\|([^<]+)<\/title>/i;
  const titleMatch = html.match(oldTitleRegex);
  if (titleMatch) {
    const newTitle = `<title>Sewa & Rent Oxygen Concentrator ${cityName} ${stateName} | RM240/Bulan 2025</title>`;
    html = html.replace(oldTitleRegex, newTitle);
  }

  // 2. Update meta description - add bilingual
  const oldDescRegex = /<meta name="description" content="Sewa oxygen concentrator ([^"]+)">/i;
  const descMatch = html.match(oldDescRegex);
  if (descMatch) {
    const newDesc = `<meta name="description" content="Sewa (rent) oxygen concentrator ${cityName}, ${stateName} dari RM240/bulan. Rent oxygen machine ${cityName}. Same day delivery. KKM certified. Hubungi 011-2868 6592.">`;
    html = html.replace(oldDescRegex, newDesc);
  }

  // 3. Update meta keywords - add English variants
  const oldKeywordsRegex = /<meta name="keywords" content="([^"]+)">/i;
  const keywordsMatch = html.match(oldKeywordsRegex);
  if (keywordsMatch) {
    const newKeywords = `<meta name="keywords" content="sewa oxygen concentrator ${cityName}, rent oxygen concentrator ${cityName}, rent oxygen machine ${cityName}, oxygen concentrator ${cityName}, mesin oksigen ${cityName}, sewa oksigen ${stateName}, rent oxygen ${stateName}, oxygen therapy ${cityName}">`;
    html = html.replace(oldKeywordsRegex, newKeywords);
  }

  // 4. Add BreadcrumbList schema if not exists
  if (!html.includes('"@type": "BreadcrumbList"') && !html.includes('"@type":"BreadcrumbList"')) {
    const breadcrumbSchema = generateBreadcrumbSchema(stateName, cityName, stateSlug, citySlug);
    // Insert before closing </head>
    html = html.replace('</head>', `  <script type="application/ld+json">\n  ${breadcrumbSchema}\n  </script>\n</head>`);
  }

  // 5. Update H1 tag - add bilingual
  const oldH1Regex = /<h1>Sewa <span class="highlight">Oxygen Concentrator<\/span> ([^<]+)<\/h1>/i;
  const h1Match = html.match(oldH1Regex);
  if (h1Match) {
    const newH1 = `<h1>Sewa & Rent <span class="highlight">Oxygen Concentrator</span> ${cityName}</h1>`;
    html = html.replace(oldH1Regex, newH1);
  }

  // 6. Update H2 tags for bilingual
  html = html.replace(/<h2>Oxygen Concentrator di ([^<]+)<\/h2>/gi, (match, city) => {
    return `<h2>Oxygen Concentrator (Mesin Oksigen) di ${city}</h2>`;
  });

  // 7. Update image alt tags - add bilingual
  html = html.replace(/alt="Sewa Oxygen Concentrator ([^"]+)"/gi, (match, rest) => {
    return `alt="Sewa Rent Oxygen Concentrator ${rest}"`;
  });

  // 8. Add hreflang for English (if not exists)
  if (!html.includes('hreflang="en"')) {
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)">/i);
    if (canonicalMatch) {
      const canonicalUrl = canonicalMatch[1];
      const hreflangTags = `
  <link rel="alternate" hreflang="ms-MY" href="${canonicalUrl}">
  <link rel="alternate" hreflang="en-MY" href="${canonicalUrl}">
  <link rel="alternate" hreflang="x-default" href="${canonicalUrl}">`;
      html = html.replace(/<link rel="canonical"[^>]+>/i, `$&${hreflangTags}`);
    }
  }

  // 9. Update OG title - bilingual
  html = html.replace(/<meta property="og:title" content="Sewa Oxygen Concentrator ([^"]+)">/gi, (match, rest) => {
    return `<meta property="og:title" content="Sewa & Rent Oxygen Concentrator ${rest}">`;
  });

  // 10. Update year to 2025
  html = html.replace(/2026/g, '2025');
  html = html.replace(/2024/g, '2025');

  // Write updated file
  fs.writeFileSync(filePath, html, 'utf8');
  return true;
}

// Recursively find all HTML files
function findHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findHtmlFiles(fullPath, files);
    } else if (item.endsWith('.html') || item === 'index.html') {
      files.push(fullPath);
    }
  }
  return files;
}

// Main execution
console.log('=== SEO Optimization Script ===');
console.log('Target: sewa-oksigen-lokasi folder');
console.log('');

const htmlFiles = findHtmlFiles(baseDir);
console.log(`Found ${htmlFiles.length} HTML files to optimize`);
console.log('');

let successCount = 0;
let failCount = 0;

for (const file of htmlFiles) {
  try {
    const result = optimizeLocationPage(file);
    if (result) {
      successCount++;
      const relativePath = path.relative(__dirname, file);
      console.log(`[OK] ${relativePath}`);
    } else {
      failCount++;
    }
  } catch (error) {
    failCount++;
    console.error(`[ERROR] ${file}: ${error.message}`);
  }
}

console.log('');
console.log('=== Summary ===');
console.log(`Successfully optimized: ${successCount} files`);
console.log(`Failed/Skipped: ${failCount} files`);
console.log('');
console.log('SEO Optimizations Applied:');
console.log('1. Bilingual titles (Sewa & Rent)');
console.log('2. Bilingual meta descriptions');
console.log('3. Enhanced meta keywords (EN + BM)');
console.log('4. BreadcrumbList schema added');
console.log('5. Bilingual H1 tags');
console.log('6. Updated H2 tags');
console.log('7. Bilingual image alt tags');
console.log('8. Hreflang tags added');
console.log('9. OG titles updated');
console.log('10. Year updated to 2025');
