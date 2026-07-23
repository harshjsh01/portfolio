const fs = require('fs');
const https = require('https');
const path = require('path');

const icons = [
  'python', 'pytorch', 'pandas', 'opencv', 'fastapi',
  'cplusplus', 'kotlin', 'googlecloud', 'googlegemini', 'tensorflow',
  'numpy', 'nextdotjs', 'tailwindcss', 'javascript', 'typescript',
  'mysql', 'arduino', 'raspberrypi', 'git', 'linux'
];

const destDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

icons.forEach((icon) => {
  const fileMap = {
    'cplusplus': 'cpp.svg',
    'googlecloud': 'gcp.svg',
  };
  const filename = fileMap[icon] || `${icon}.svg`;
  const filepath = path.join(destDir, filename);

  const url = `https://cdn.simpleicons.org/${icon}`;
  
  https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        if (!data.includes('width=')) {
          data = data.replace('<svg ', '<svg width="256" height="256" ');
        }
        fs.writeFileSync(filepath, data);
        console.log(`Downloaded ${icon} to ${filename}`);
      } else {
        console.error(`Failed to download ${icon}: ${res.statusCode}`);
      }
    });
  }).on('error', (err) => {
    console.error(`Error downloading ${icon}:`, err.message);
  });
});
