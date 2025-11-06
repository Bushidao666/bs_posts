#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

// Configure marked
marked.setOptions({
    breaks: true,
    gfm: true,
});

function extractTitle(markdown) {
    const match = markdown.match(/^#\s+(.+)$/m);
    return match ? match[1].replace(/[🎯🔧🧠🔄🎭📚🔬🔍💡⚡🚀📊🎨✨🔄]/g, '').trim() : 'Guide';
}

function extractEmoji(markdown) {
    const match = markdown.match(/^#\s+([🎯🔧🧠🔄🎭📚🔬🔍💡⚡🚀📊🎨✨])/m);
    return match ? match[1] : '📖';
}

function extractLead(markdown) {
    // Remove frontmatter
    let content = markdown.replace(/^---[\s\S]*?---\n/,  '');

    // Remove first h1
    content = content.replace(/^#\s+.+$/m, '');

    // Find first ## section
    const introMatch = content.match(/##\s+Introdução[\s\S]*?(?=\n##|$)/);
    if (introMatch) {
        // Get first paragraph after Introdução
        const paragraphMatch = introMatch[0].match(/##\s+Introdução\s+([\s\S]*?)(?=\n\n|$)/);
        if (paragraphMatch && paragraphMatch[1]) {
            return paragraphMatch[1].trim();
        }
    }

    // Fallback: first non-empty paragraph
    const lines = content.split('\n');
    for (let line of lines) {
        line = line.trim();
        if (line && !line.startsWith('#') && !line.startsWith('```') && line.length > 50) {
            return line;
        }
    }

    return '';
}

function extractTags(markdown) {
    const match = markdown.match(/\*\*Tags:\*\*\s*(.+)$/m);
    if (!match) return [];

    return match[1]
        .split(/[,\s]+/)
        .filter(tag => tag.startsWith('#'))
        .map(tag => tag.trim());
}

function processMarkdown(markdown) {
    // Remove YAML frontmatter
    let content = markdown.replace(/^---[\s\S]*?---\n/, '');

    // Remove the first H1 (title) since we show it in header
    content = content.replace(/^#\s+.+$/m, '');

    // Remove final tags section
    content = content.replace(/\n---\n\n\*\*Tags:\*\*[\s\S]*$/, '');

    // Parse with marked
    let html = marked.parse(content);

    // Add custom classes for styling
    html = html.replace(/<pre><code class="language-(\w+)">/g, '<div class="kb-code-block"><code class="language-$1">');
    html = html.replace(/<\/code><\/pre>/g, '</code></div>');
    html = html.replace(/<pre><code>/g, '<div class="kb-code-block"><code>');

    // Handle mermaid blocks
    html = html.replace(/<code class="language-mermaid">([\s\S]*?)<\/code>/g, '<div class="mermaid">$1</div>');

    // Style checkmarks and X marks
    html = html.replace(/✅/g, '<span style="color: var(--color-success);">✅</span>');
    html = html.replace(/❌/g, '<span style="color: var(--color-error);">❌</span>');
    html = html.replace(/🚫/g, '<span style="color: var(--color-error);">🚫</span>');
    html = html.replace(/✓/g, '<span style="color: var(--color-success);">✓</span>');

    return html;
}

function generateHTML(title, emoji, lead, content, tags) {
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
    </style>
</head>
<body>
    <div id="kb-guide-wrapper">
        <style>
            #kb-guide-wrapper {
                --color-bg: #000000;
                --color-surface: #0a0a0a;
                --color-surface-elevated: #111111;
                --color-border: #1a1a1a;
                --color-text: #ffffff;
                --color-text-secondary: #a3a3a3;
                --color-text-tertiary: #737373;
                --color-magenta: #ff0080;
                --color-magenta-dim: #8b0046;
                --color-gold: #ffd700;
                --color-gold-dim: #8b7500;
                --color-success: #00ff88;
                --color-error: #ff3366;

                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
                background: var(--color-bg);
                color: var(--color-text);
                line-height: 1.7;
                font-size: 16px;
            }

            #kb-guide-wrapper .kb-container {
                max-width: 900px;
                margin: 0 auto;
                padding: 80px 24px;
            }

            #kb-guide-wrapper .kb-header {
                margin-bottom: 64px;
                padding-bottom: 32px;
                border-bottom: 1px solid var(--color-border);
            }

            #kb-guide-wrapper .kb-title {
                font-size: 48px;
                font-weight: 800;
                line-height: 1.1;
                margin-bottom: 24px;
                background: linear-gradient(135deg, var(--color-text) 0%, var(--color-text-secondary) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                letter-spacing: -0.02em;
            }

            #kb-guide-wrapper .kb-emoji {
                display: inline-block;
                font-size: 56px;
                margin-right: 16px;
                vertical-align: middle;
                filter: drop-shadow(0 4px 8px rgba(255, 0, 128, 0.3));
            }

            #kb-guide-wrapper .kb-lead {
                font-size: 20px;
                line-height: 1.6;
                color: var(--color-text-secondary);
                margin-top: 16px;
            }

            #kb-guide-wrapper h2 {
                font-size: 36px;
                font-weight: 700;
                margin: 64px 0 24px 0;
                letter-spacing: -0.01em;
                color: var(--color-text);
            }

            #kb-guide-wrapper h3 {
                font-size: 24px;
                font-weight: 600;
                margin: 48px 0 16px 0;
                color: var(--color-text);
                display: flex;
                align-items: center;
                gap: 12px;
            }

            #kb-guide-wrapper h3::before {
                content: '';
                width: 4px;
                height: 24px;
                background: linear-gradient(180deg, var(--color-magenta) 0%, var(--color-magenta-dim) 100%);
                border-radius: 2px;
                flex-shrink: 0;
            }

            #kb-guide-wrapper h4 {
                font-size: 18px;
                font-weight: 600;
                margin: 32px 0 12px 0;
                color: var(--color-gold);
            }

            #kb-guide-wrapper p {
                margin: 16px 0;
                color: var(--color-text-secondary);
                font-size: 17px;
                line-height: 1.7;
            }

            #kb-guide-wrapper strong {
                color: var(--color-text);
                font-weight: 600;
            }

            #kb-guide-wrapper em {
                color: var(--color-text);
                font-style: italic;
            }

            #kb-guide-wrapper ul, #kb-guide-wrapper ol {
                margin: 20px 0;
                padding-left: 28px;
                color: var(--color-text-secondary);
            }

            #kb-guide-wrapper li {
                margin: 12px 0;
                padding-left: 8px;
                line-height: 1.6;
            }

            #kb-guide-wrapper li::marker {
                color: var(--color-magenta);
            }

            #kb-guide-wrapper blockquote {
                background: linear-gradient(135deg, rgba(255, 0, 128, 0.05) 0%, rgba(255, 215, 0, 0.05) 100%);
                border-left: 3px solid var(--color-magenta);
                padding: 20px 24px;
                margin: 24px 0;
                border-radius: 0 8px 8px 0;
            }

            #kb-guide-wrapper blockquote p {
                margin: 8px 0;
            }

            #kb-guide-wrapper .kb-code-block {
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: 8px;
                padding: 20px;
                margin: 24px 0;
                overflow-x: auto;
                font-family: 'Fira Code', 'Courier New', monospace;
                font-size: 14px;
                line-height: 1.6;
            }

            #kb-guide-wrapper .kb-code-block code {
                color: var(--color-text-secondary);
                white-space: pre;
                display: block;
            }

            #kb-guide-wrapper code {
                background: var(--color-surface-elevated);
                color: var(--color-magenta);
                padding: 3px 8px;
                border-radius: 4px;
                font-family: 'Fira Code', monospace;
                font-size: 14px;
            }

            #kb-guide-wrapper .kb-code-block code {
                background: transparent;
                padding: 0;
            }

            #kb-guide-wrapper a {
                color: var(--color-magenta);
                text-decoration: none;
                transition: color 0.2s ease;
            }

            #kb-guide-wrapper a:hover {
                color: var(--color-gold);
                text-decoration: underline;
            }

            #kb-guide-wrapper hr {
                border: none;
                border-top: 1px solid var(--color-border);
                margin: 48px 0;
            }

            #kb-guide-wrapper table {
                width: 100%;
                border-collapse: collapse;
                margin: 24px 0;
                background: var(--color-surface-elevated);
                border: 1px solid var(--color-border);
                border-radius: 8px;
                overflow: hidden;
            }

            #kb-guide-wrapper th {
                background: var(--color-surface);
                color: var(--color-text);
                padding: 12px 16px;
                text-align: left;
                font-weight: 600;
                border-bottom: 1px solid var(--color-border);
            }

            #kb-guide-wrapper td {
                padding: 12px 16px;
                border-bottom: 1px solid var(--color-border);
                color: var(--color-text-secondary);
            }

            #kb-guide-wrapper tr:last-child td {
                border-bottom: none;
            }

            #kb-guide-wrapper .mermaid {
                background: var(--color-surface-elevated);
                border: 1px solid var(--color-border);
                border-radius: 12px;
                padding: 32px;
                margin: 32px 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            #kb-guide-wrapper .kb-footer {
                margin-top: 80px;
                padding-top: 32px;
                border-top: 1px solid var(--color-border);
            }

            #kb-guide-wrapper .kb-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 24px;
            }

            #kb-guide-wrapper .kb-tag {
                background: var(--color-surface-elevated);
                color: var(--color-text-secondary);
                padding: 6px 12px;
                border-radius: 6px;
                font-size: 13px;
                border: 1px solid var(--color-border);
                transition: all 0.2s ease;
            }

            #kb-guide-wrapper .kb-tag:hover {
                border-color: var(--color-magenta);
                color: var(--color-magenta);
            }

            @media (max-width: 768px) {
                #kb-guide-wrapper .kb-container {
                    padding: 40px 20px;
                }

                #kb-guide-wrapper .kb-title {
                    font-size: 36px;
                }

                #kb-guide-wrapper .kb-emoji {
                    font-size: 40px;
                }

                #kb-guide-wrapper h2 {
                    font-size: 28px;
                }

                #kb-guide-wrapper h3 {
                    font-size: 20px;
                }
            }
        </style>

        <div class="kb-container">
            <header class="kb-header">
                <h1 class="kb-title">
                    <span class="kb-emoji">${emoji}</span>
                    ${title}
                </h1>
                ${lead ? `<p class="kb-lead">${lead}</p>` : ''}
            </header>

            <main class="kb-content">
                ${content}
            </main>

            ${tags.length > 0 ? `
            <footer class="kb-footer">
                <div class="kb-tags">
                    ${tags.map(tag => `<span class="kb-tag">${tag}</span>`).join('\n                    ')}
                </div>
            </footer>
            ` : ''}
        </div>
    </div>

    <script>
        // Initialize Mermaid for diagrams
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            themeVariables: {
                primaryColor: '#ff0080',
                primaryTextColor: '#fff',
                primaryBorderColor: '#ff0080',
                lineColor: '#ffd700',
                secondaryColor: '#ffd700',
                tertiaryColor: '#0a0a0a',
                background: '#111111',
                mainBkg: '#111111',
                secondBkg: '#0a0a0a'
            }
        });
    </script>
</body>
</html>`;
}

function processMarkdownFile(inputPath, outputPath) {
    console.log(`Processing: ${inputPath}`);

    const markdown = fs.readFileSync(inputPath, 'utf8');

    const title = extractTitle(markdown);
    const emoji = extractEmoji(markdown);
    const lead = extractLead(markdown);
    const tags = extractTags(markdown);
    const content = processMarkdown(markdown);

    const html = generateHTML(title, emoji, lead, content, tags);

    fs.writeFileSync(outputPath, html, 'utf8');
    console.log(`Generated: ${outputPath}`);
}

function processDirectory(sourceDir, targetDir) {
    const items = fs.readdirSync(sourceDir);

    for (const item of items) {
        const sourcePath = path.join(sourceDir, item);
        const stat = fs.statSync(sourcePath);

        if (stat.isDirectory()) {
            const newTargetDir = path.join(targetDir, item);
            if (!fs.existsSync(newTargetDir)) {
                fs.mkdirSync(newTargetDir, { recursive: true });
            }
            processDirectory(sourcePath, newTargetDir);
        } else if (item.endsWith('.md')) {
            const htmlFilename = item.replace('.md', '.html');
            const targetPath = path.join(targetDir, htmlFilename);
            processMarkdownFile(sourcePath, targetPath);
        }
    }
}

// Main execution
const layers = ['1-fundamentals', '2-engineering', '3-thinking', '4-workflows', '5-meta'];

console.log('🚀 Starting HTML conversion with marked...\n');

for (const layer of layers) {
    const sourceDir = path.join(__dirname, layer);
    const targetDir = path.join(__dirname, 'html', layer);

    if (fs.existsSync(sourceDir)) {
        console.log(`\n=== Processing ${layer} ===`);
        processDirectory(sourceDir, targetDir);
    }
}

console.log('\n✅ Conversion complete!');
console.log(`\n📊 Generated HTML files in: ${path.join(__dirname, 'html')}/`);
