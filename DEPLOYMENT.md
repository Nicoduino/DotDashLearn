# DotDashLearn - Deployment & Setup Guide

## Local Development Setup

### Prerequisites
- Node.js 14+ (Download from https://nodejs.org/)
- npm or yarn package manager
- Git (optional, for version control)
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Step-by-Step Local Installation

#### 1. Clone or Download Project
```bash
# If using Git
git clone https://github.com/Nicoduino/DotDashLearn.git
cd DotDashLearn

# Or download and extract ZIP file, then navigate to folder
cd /path/to/DotDashLearn
```

#### 2. Install Dependencies
```bash
npm install
```

This installs:
- Vite (development server and build tool)
- All necessary development dependencies

**Installation Output**:
```
added 11 packages, and audited 12 packages in 4s
```

#### 3. Start Development Server
```bash
npm run dev
```

**Expected Output**:
```
  VITE v5.4.21  ready in 485 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

#### 4. Open in Browser
- Automatically opens at http://localhost:3000
- Or manually navigate to: `http://localhost:3000`

#### 5. Start Learning!
- The app is now ready to use
- All features are fully functional
- Progress is saved locally

---

## Building for Production

### Build Process

```bash
npm run build
```

**What This Does**:
- Optimizes all code
- Minifies JavaScript and CSS
- Combines assets efficiently
- Creates `dist/` folder with production files
- Generates source maps (optional)

**Expected Output**:
```
vite v5.4.21 building for production...
✓ 15 modules transformed.
dist/index.html           0.45 kB
dist/assets/main.hash.js  42.34 kB
dist/assets/style.hash.css 18.56 kB

✓ built in 1.23s
```

### Output Files

**dist/ folder contains**:
```
dist/
├── index.html          (Main HTML file)
├── assets/
│   ├── main-*.js       (Bundled JavaScript)
│   └── style-*.css     (Bundled CSS)
└── favicon.ico         (Optional: App icon)
```

**File Sizes** (Approximate):
- HTML: 0.5 KB
- JavaScript: 40-45 KB (gzipped: 12-15 KB)
- CSS: 18-20 KB (gzipped: 6-8 KB)
- **Total**: ~65 KB (uncompressed), ~20 KB (gzipped)

---

## Deployment Options

### Option 1: GitHub Pages (Free & Recommended)

#### Prerequisites
- GitHub account
- Git installed
- Repository on GitHub

#### Steps

1. **Initialize Git (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: DotDashLearn"
   git branch -M main
   ```

2. **Add Remote Repository**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/DotDashLearn.git
   git push -u origin main
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Deploy to GitHub Pages**
   
   **Method A: Using GitHub CLI**
   ```bash
   # Install gh CLI if not already installed
   brew install gh  # macOS
   # or visit: https://cli.github.com/
   
   # Deploy
   gh repo create DotDashLearn --source=. --remote=origin --push
   gh api repos/{owner}/{repo}/pages -X POST -f source='{"branch":"main","path":"/dist"}'
   ```

   **Method B: Manual Setup**
   - Go to https://github.com/YOUR_USERNAME/DotDashLearn
   - Settings → Pages
   - Source: main branch
   - Folder: /dist
   - Save

5. **Access Your Site**
   - URL: `https://YOUR_USERNAME.github.io/DotDashLearn`
   - Fully functional, no server needed

#### GitHub Pages Configuration

**Package.json Update** (Optional):
```json
{
  "homepage": "https://YOUR_USERNAME.github.io/DotDashLearn"
}
```

### Option 2: Netlify (Free & Fast)

#### Steps

1. **Create Netlify Account**
   - Visit https://netlify.com
   - Sign up (GitHub login recommended)

2. **Connect Repository**
   - Click "Add new site"
   - Select "Import an existing project"
   - Choose GitHub
   - Select DotDashLearn repo

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Leave other fields default

4. **Deploy**
   - Netlify automatically builds and deploys
   - Get a URL like: `https://dotdashlearn-abc123.netlify.app`

#### Netlify Advantages
- Automatic builds on git push
- Free SSL certificate
- Global CDN
- Custom domain support
- Excellent performance

### Option 3: Vercel (Free & Performant)

#### Steps

1. **Create Vercel Account**
   - Visit https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Select DotDashLearn repo
   - Auto-detect Vite

3. **Deploy Settings**
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`

4. **Deploy**
   - Automatic deployment
   - URL: `https://dotdashlearn-username.vercel.app`

#### Vercel Advantages
- Blazingly fast
- Preview deployments
- Auto-scaling
- Analytics included

### Option 4: Traditional Static Hosting

#### Web Hosting Services
- **Bluehost**: $2-3/month
- **GoDaddy**: $2-3/month
- **Namecheap**: $2-5/month
- **DreamHost**: $2-3/month

#### Deployment Steps

1. **Upload via FTP**
   ```bash
   # After npm run build
   # Use FTP client (FileZilla, WinSCP, etc.)
   # Upload contents of dist/ to public_html/
   ```

2. **Upload via cPanel**
   - Access cPanel
   - File Manager
   - Upload dist/ contents
   - Make index.html accessible

3. **Configure .htaccess** (Apache servers)
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Option 5: Docker Deployment

#### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

#### Build and Run
```bash
docker build -t dotdashlearn .
docker run -p 3000:3000 dotdashlearn
```

---

## Self-Hosted Deployment

### Using Node.js + Express

```javascript
// server.js
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(join(__dirname, 'dist')));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`DotDashLearn listening at http://localhost:${port}`);
});
```

#### Run
```bash
npm run build
node server.js
```

### Using Python HTTP Server

```bash
cd dist
python -m http.server 3000
# or Python 2
python -m SimpleHTTPServer 3000
```

---

## Performance Optimization

### Pre-deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Test at http://localhost:3000 (dev mode)
- [ ] Run `npm run preview` (production preview)
- [ ] Check browser console for errors
- [ ] Test on mobile device
- [ ] Test in multiple browsers
- [ ] Verify audio works
- [ ] Check theme switching
- [ ] Test all three learning modes
- [ ] Verify localStorage works

### Build Size Optimization

**Current Sizes**:
- JavaScript: ~42 KB (12 KB gzipped)
- CSS: ~18 KB (6 KB gzipped)
- Total: ~65 KB (18 KB gzipped)

**Optimization Techniques Used**:
- Tree-shaking unused code
- CSS minification
- JavaScript minification
- No external dependencies
- Efficient module bundling

### Speed Optimization Tips

1. **Enable Gzip Compression**
   ```nginx
   # nginx.conf
   gzip on;
   gzip_min_length 1000;
   gzip_types text/plain text/css application/javascript;
   ```

2. **Add Cache Headers**
   ```nginx
   location ~* ^/assets/ {
     expires 1y;
     add_header Cache-Control "public, immutable";
   }
   ```

3. **Use CDN**
   - Cloudflare (free tier available)
   - Bunny CDN
   - AWS CloudFront

4. **Enable HTTP/2**
   - Most modern hosts support it
   - Significantly faster

---

## Continuous Deployment (CI/CD)

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### GitLab CI/CD

Create `.gitlab-ci.yml`:

```yaml
image: node:18-alpine

stages:
  - build
  - deploy

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

deploy:
  stage: deploy
  script:
    - echo "Deploying..."
  only:
    - main
```

---

## Monitoring & Maintenance

### Health Checks

**Test Deployment**:
```bash
# Check if site loads
curl -I https://your-domain.com

# Check HTTP status
curl -s -o /dev/null -w "%{http_code}" https://your-domain.com
# Should return 200
```

### Error Tracking

**Browser Console Errors**:
```javascript
// Add to index.html for error tracking
window.onerror = function(msg, url, line) {
  console.error('Error:', msg, 'at', url + ':' + line);
};
```

### Performance Monitoring

**Use DevTools**:
- Network tab: Check load times
- Performance tab: Measure render time
- Lighthouse: Full audit
- WebPageTest: Detailed analysis

---

## Custom Domain Setup

### Point Domain to GitHub Pages

1. **Add DNS Records**
   ```
   Type    Name    Value
   A       @       185.199.108.153
   A       @       185.199.109.153
   A       @       185.199.110.153
   A       @       185.199.111.153
   CNAME   www     your-username.github.io
   ```

2. **GitHub Pages Settings**
   - Settings → Pages
   - Custom domain: yourdomain.com
   - Enable HTTPS

### Point Domain to Netlify

1. **Get Netlify DNS Records**
   - Netlify Dashboard → Site Settings → Domain management
   - Copy provided DNS records

2. **Update DNS Provider**
   - Add provided records
   - Wait for propagation (15-24 hours)

---

## Troubleshooting Deployment

### Issue: Blank Page
**Solutions**:
- Check browser console (F12)
- Verify all files uploaded
- Check file permissions (755 for folders, 644 for files)
- Clear browser cache

### Issue: Styles Not Loading
**Solutions**:
- Verify CSS file path
- Check gzip compression settings
- Clear cache in browser
- Check MIME types

### Issue: Audio Not Working
**Solutions**:
- Check browser permissions
- Test audio in different browser
- Verify Web Audio API support
- Check browser console

### Issue: Progress Not Saving
**Solutions**:
- Check localStorage enabled
- Verify not in private mode
- Check browser storage quota
- Try different browser

### Issue: Slow Performance
**Solutions**:
- Enable gzip compression
- Add cache headers
- Use CDN
- Enable HTTP/2
- Minify assets (should be automatic)

---

## Rollback & Updates

### Update Application

1. **Pull Latest Changes**
   ```bash
   git pull origin main
   ```

2. **Reinstall Dependencies**
   ```bash
   npm ci  # Cleaner than npm install
   ```

3. **Rebuild**
   ```bash
   npm run build
   ```

4. **Deploy**
   ```bash
   # GitHub Pages: Auto-deploy on push
   git add .
   git commit -m "Update: [your changes]"
   git push origin main
   ```

### Rollback to Previous Version

```bash
# View history
git log --oneline

# Checkout previous version
git checkout COMMIT_HASH

# Rebuild and redeploy
npm run build
git push origin main --force  # Use with caution!
```

---

## Security Considerations

### SSL/HTTPS
✅ **Always Use HTTPS**
- GitHub Pages: Automatic
- Netlify: Automatic
- Vercel: Automatic
- Manual hosting: Use Let's Encrypt (free)

### Data Security
✅ **LocalStorage Only**
- No server communication
- No data sent anywhere
- All data client-side
- User has full control

### Content Security Policy

**Add to server headers**:
```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
```

---

## Analytics & Monitoring (Optional)

### Add Google Analytics

```html
<!-- Add to index.html before closing </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Add Umami (Privacy-Friendly)

```html
<!-- Add to index.html -->
<script async src="https://cloud.umami.is/script.js" 
  data-website-id="YOUR_ID"></script>
```

---

## Support & Resources

### Documentation Files
- `README.md` - Quick start guide
- `GUIDE.md` - User guide
- `ARCHITECTURE.md` - Technical architecture
- `FEATURES.md` - Complete feature list

### Useful Links
- **Vite**: https://vitejs.dev
- **GitHub Pages**: https://pages.github.com
- **Netlify**: https://netlify.com
- **Vercel**: https://vercel.com

### Community
- GitHub Issues: Report bugs
- GitHub Discussions: Ask questions
- Pull Requests: Submit improvements

---

## Version History

### v1.0.0 (Current)
- Initial release
- Three learning methods
- Full localStorage support
- Responsive design
- Dark/light themes

---

**Last Updated**: November 2024
**Maintainer**: DotDashLearn Community
