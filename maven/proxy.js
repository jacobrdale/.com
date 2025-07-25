const express = require('express');
const fetch = require('node-fetch');

const app = express();

const OWNER = 'mavenpm';
const REPO = 'maven.hexon404.com';

// Use this if you have a GitHub token to avoid API rate limits
// Otherwise fallback to unauthenticated requests (limited)
const GITHUB_TOKEN = process.env.GH_TOKEN || '';

const headers = GITHUB_TOKEN
  ? { Authorization: `token ${GITHUB_TOKEN}`, Accept: 'application/vnd.github.v3.raw' }
  : { Accept: 'application/vnd.github.v3.raw' };

app.get('/*', async (req, res) => {
  const path = req.path === '/' ? '' : req.path.slice(1);

  const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;

  try {
    const response = await fetch(apiUrl, { headers });

    if (response.status === 404) {
      return res.status(404).send('Not Found, this is probably because hexon has a 404 Brain Not Found');
    }
    if (!response.ok) {
      return res.status(response.status).send('GitHub API Error');
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      let html = `<h1>Index of /${path}</h1><ul>`;
      if (path) {
        const parentPath = path.split('/').slice(0, -1).join('/');
        html += `<li><a href="/${parentPath}">../</a></li>`;
      }
      data.forEach(item => {
        const slash = item.type === 'dir' ? '/' : '';
        html += `<li><a href="${req.path.endsWith('/') ? req.path : req.path + '/'}${item.name}${slash}">${item.name}${slash}</a></li>`;
      });
      html += '</ul>';
      res.send(html);

    } else if (data.type === 'file') {
      const fileResp = await fetch(data.download_url);
      if (!fileResp.ok) return res.status(fileResp.status).send('Error fetching file');

      const contentType = fileResp.headers.get('content-type') || 'application/octet-stream';
      res.set('Content-Type', contentType);

      fileResp.body.pipe(res);

    } else {
      res.status(400).send('Not a file or directory');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Maven repo proxy server running at http://localhost:${PORT}`);
});
