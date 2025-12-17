// URL Migration Script
// Migrates from: /sewa-oksigen-lokasi/rent-oxygen-[state]/sewa-mesin-oksigen-[city]/
// To: /[state]/oxygen-concentrator-[city]/

const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

// State mappings
const states = {
  'johor': { name: 'Johor', cities: [] },
  'kedah': { name: 'Kedah', cities: [] },
  'kelantan': { name: 'Kelantan', cities: [] },
  'kuala-lumpur': { name: 'Kuala Lumpur', cities: [] },
  'labuan': { name: 'Labuan', cities: [] },
  'melaka': { name: 'Melaka', cities: [] },
  'negeri-sembilan': { name: 'Negeri Sembilan', cities: [] },
  'pahang': { name: 'Pahang', cities: [] },
  'penang': { name: 'Penang', cities: [] },
  'perak': { name: 'Perak', cities: [] },
  'perlis': { name: 'Perlis', cities: [] },
  'sabah': { name: 'Sabah', cities: [] },
  'sarawak': { name: 'Sarawak', cities: [] },
  'selangor': { name: 'Selangor', cities: [] },
  'terengganu': { name: 'Terengganu', cities: [] }
};

// Collect all cities from existing structure
const oldBaseDir = path.join(baseDir, 'sewa-oksigen-lokasi');

console.log('=== URL Migration Script ===\n');
console.log('From: /sewa-oksigen-lokasi/rent-oxygen-[state]/sewa-mesin-oksigen-[city]/');
console.log('To: /[state]/oxygen-concentrator-[city]/\n');

// Step 1: Scan existing structure and collect cities
console.log('Step 1: Scanning existing location pages...');

if (fs.existsSync(oldBaseDir)) {
  const stateFolders = fs.readdirSync(oldBaseDir).filter(f => f.startsWith('rent-oxygen-'));

  for (const stateFolder of stateFolders) {
    const stateSlug = stateFolder.replace('rent-oxygen-', '');
    const statePath = path.join(oldBaseDir, stateFolder);

    if (fs.statSync(statePath).isDirectory()) {
      const cityFolders = fs.readdirSync(statePath).filter(f => f.startsWith('sewa-mesin-oksigen-'));

      for (const cityFolder of cityFolders) {
        const citySlug = cityFolder.replace('sewa-mesin-oksigen-', '');
        const cityPath = path.join(statePath, cityFolder, 'index.html');

        if (fs.existsSync(cityPath)) {
          if (states[stateSlug]) {
            states[stateSlug].cities.push({
              slug: citySlug,
              oldPath: cityPath,
              name: citySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
            });
          }
        }
      }
    }
  }
}

// Count total pages
let totalCities = 0;
for (const state of Object.values(states)) {
  totalCities += state.cities.length;
}
console.log(`Found ${totalCities} city pages across ${Object.keys(states).length} states\n`);

// Step 2: Create new folder structure
console.log('Step 2: Creating new folder structure...');

for (const [stateSlug, stateData] of Object.entries(states)) {
  const newStatePath = path.join(baseDir, stateSlug);

  // Create state folder
  if (!fs.existsSync(newStatePath)) {
    fs.mkdirSync(newStatePath, { recursive: true });
    console.log(`  Created: /${stateSlug}/`);
  }

  // Create city folders
  for (const city of stateData.cities) {
    const newCityFolder = `oxygen-concentrator-${city.slug}`;
    const newCityPath = path.join(newStatePath, newCityFolder);

    if (!fs.existsSync(newCityPath)) {
      fs.mkdirSync(newCityPath, { recursive: true });
    }
  }
}

// Step 3: Copy and update HTML files
console.log('\nStep 3: Migrating HTML files with updated URLs...');

let migratedCount = 0;
const redirectRules = [];

for (const [stateSlug, stateData] of Object.entries(states)) {
  for (const city of stateData.cities) {
    const oldPath = city.oldPath;
    const newCityFolder = `oxygen-concentrator-${city.slug}`;
    const newPath = path.join(baseDir, stateSlug, newCityFolder, 'index.html');

    // Old and new URLs for redirects
    const oldUrl = `/sewa-oksigen-lokasi/rent-oxygen-${stateSlug}/sewa-mesin-oksigen-${city.slug}`;
    const newUrl = `/${stateSlug}/${newCityFolder}`;

    redirectRules.push({ oldUrl, newUrl, state: stateSlug, city: city.slug });

    if (fs.existsSync(oldPath)) {
      let html = fs.readFileSync(oldPath, 'utf8');

      // Update canonical URL
      html = html.replace(
        /href="https:\/\/oxygen-concentrator\.my\/sewa-oksigen-lokasi\/rent-oxygen-[^"]+"/g,
        `href="https://oxygen-concentrator.my${newUrl}"`
      );

      // Update internal links to use new URL pattern
      html = html.replace(
        /\/sewa-oksigen-lokasi\/rent-oxygen-([^\/]+)\/sewa-mesin-oksigen-([^\/]+)/g,
        (match, state, cityName) => `/${state}/oxygen-concentrator-${cityName}`
      );

      // Update breadcrumb URLs
      html = html.replace(
        /"item": "https:\/\/oxygen-concentrator\.my\/sewa-oksigen-lokasi\/[^"]+"/g,
        (match) => {
          if (match.includes(stateSlug) && match.includes(city.slug)) {
            return `"item": "https://oxygen-concentrator.my${newUrl}"`;
          }
          return match;
        }
      );

      // Update OG URL
      html = html.replace(
        /<meta property="og:url" content="[^"]+"/g,
        `<meta property="og:url" content="https://oxygen-concentrator.my${newUrl}"`
      );

      // Write to new location
      fs.writeFileSync(newPath, html, 'utf8');
      migratedCount++;
    }
  }
}

console.log(`  Migrated ${migratedCount} pages\n`);

// Step 4: Generate .htaccess redirect rules
console.log('Step 4: Generating 301 redirect rules...');

let htaccessRules = `
# ===========================================
# URL MIGRATION REDIRECTS (Added ${new Date().toISOString().split('T')[0]})
# From: /sewa-oksigen-lokasi/rent-oxygen-[state]/sewa-mesin-oksigen-[city]/
# To: /[state]/oxygen-concentrator-[city]/
# ===========================================

`;

// Group by state for organized output
const stateGroups = {};
for (const rule of redirectRules) {
  if (!stateGroups[rule.state]) {
    stateGroups[rule.state] = [];
  }
  stateGroups[rule.state].push(rule);
}

for (const [state, rules] of Object.entries(stateGroups)) {
  htaccessRules += `# ${states[state]?.name || state}\n`;
  for (const rule of rules) {
    htaccessRules += `Redirect 301 ${rule.oldUrl} ${rule.newUrl}\n`;
  }
  htaccessRules += '\n';
}

// Save redirect rules to a file
const redirectFilePath = path.join(baseDir, 'new-htaccess-redirects.txt');
fs.writeFileSync(redirectFilePath, htaccessRules, 'utf8');
console.log(`  Saved redirect rules to: new-htaccess-redirects.txt\n`);

// Step 5: Generate new sitemap entries
console.log('Step 5: Generating new sitemap entries...');

let sitemapEntries = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- ========== MAIN PAGES ========== -->
  <url>
    <loc>https://oxygen-concentrator.my/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <url>
    <loc>https://oxygen-concentrator.my/sewa-oxygen-concentrator</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <url>
    <loc>https://oxygen-concentrator.my/beli-oxygen-concentrator</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- ========== LOCATION PAGES (NEW URL STRUCTURE) ========== -->
`;

for (const [stateSlug, stateData] of Object.entries(states)) {
  if (stateData.cities.length === 0) continue;

  sitemapEntries += `\n  <!-- ${stateData.name} -->\n`;

  // State hub page
  sitemapEntries += `  <url>
    <loc>https://oxygen-concentrator.my/${stateSlug}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;

  // City pages
  for (const city of stateData.cities) {
    const newUrl = `https://oxygen-concentrator.my/${stateSlug}/oxygen-concentrator-${city.slug}/`;
    const priority = ['kuala-lumpur', 'selangor', 'penang', 'johor'].includes(stateSlug) ? '0.7' : '0.6';

    sitemapEntries += `  <url>
    <loc>${newUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
  }
}

sitemapEntries += `
</urlset>`;

const newSitemapPath = path.join(baseDir, 'sitemap-new-urls.xml');
fs.writeFileSync(newSitemapPath, sitemapEntries, 'utf8');
console.log(`  Saved new sitemap to: sitemap-new-urls.xml\n`);

// Summary
console.log('===========================================');
console.log('MIGRATION SUMMARY');
console.log('===========================================');
console.log(`Total pages migrated: ${migratedCount}`);
console.log(`Redirect rules generated: ${redirectRules.length}`);
console.log(`\nNew URL Structure:`);
console.log(`  /${Object.keys(states)[0]}/oxygen-concentrator-${states[Object.keys(states)[0]].cities[0]?.slug || 'city'}/`);
console.log(`\nFiles generated:`);
console.log(`  - new-htaccess-redirects.txt (add to .htaccess)`);
console.log(`  - sitemap-new-urls.xml (replace sitemap.xml)`);
console.log(`\nNext steps:`);
console.log(`  1. Review the new folder structure`);
console.log(`  2. Add redirect rules from new-htaccess-redirects.txt to .htaccess`);
console.log(`  3. Replace sitemap.xml with sitemap-new-urls.xml`);
console.log(`  4. Test URLs and redirects`);
console.log(`  5. Push to GitHub`);
