#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Simple markdown to HTML converter
function markdownToHtml(markdown) {
    let html = markdown;

    // Remove YAML frontmatter
    html = html.replace(/^---[\s\S]*?---\n/, '');

    // Convert headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Convert bold and italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Convert lists
    html = html.replace(/^\s*[-*]\s+(.+)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Convert code blocks
    html = html.replace(/```([a-z]*)\n([\s\S]*?)```/gim, '<div class="kb-code-block"><code>$2</code></div>');

    // Convert inline code
    html = html.replace(/`([^`]+)`/g, '<span class="kb-inline-code">$1</span>');

    // Convert paragraphs
    html = html.replace(/^(?!<[h|u|l|d])(.*$)/gim, '<p>$1</p>');

    // Clean up empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, '');
    html = html.replace(/<p>(<[uh])/g, '$1');
    html = html.replace(/(<\/[uh]l>)<\/p>/g, '$1');

    return html;
}

function extractTitle(markdown) {
    const match = markdown.match(/^#\s+(.+)$/m);
    return match ? match[1].replace(/[🎯🔧🧠🔄🎭📚🔬🔍💡⚡🚀📊🎨✨🔄]/g, '').trim() : 'Guide';
}

function extractEmoji(markdown) {
    const match = markdown.match(/^#\s+([🎯🔧🧠🔄🎭📚🔬🔍💡⚡🚀📊🎨✨])/m);
    return match ? match[1] : '📖';
}

function extractLead(markdown) {
    const lines = markdown.split('\n');
    let inFrontmatter = false;
    let leadText = '';

    for (let line of lines) {
        if (line.trim() === '---') {
            inFrontmatter = !inFrontmatter;
            continue;
        }
        if (inFrontmatter) continue;
        if (line.startsWith('#')) continue;
        if (line.trim() === '') continue;

        // First non-empty, non-header line after frontmatter
        if (line.trim() !== '') {
            leadText = line.trim();
            break;
        }
    }

    return leadText;
}

function extractTags(markdown) {
    const match = markdown.match(/\*\*Tags:\*\*\s*(.+)$/m);
    if (!match) return [];

    return match[1]
        .split(/[,\s]+/)
        .filter(tag => tag.startsWith('#'))
        .map(tag => tag.trim());
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
    <div id="kb-guide-wrapper" style="all: initial; * { all: unset; }">
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
            }

            #kb-guide-wrapper p {
                margin: 16px 0;
                color: var(--color-text-secondary);
                font-size: 17px;
            }

            #kb-guide-wrapper strong {
                color: var(--color-text);
                font-weight: 600;
            }

            #kb-guide-wrapper ul, #kb-guide-wrapper ol {
                margin: 16px 0;
                padding-left: 24px;
                color: var(--color-text-secondary);
            }

            #kb-guide-wrapper li {
                margin: 8px 0;
                padding-left: 8px;
            }

            #kb-guide-wrapper .kb-code-block {
                background: var(--color-surface);
                border: 1px solid var(--color-border);
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                overflow-x: auto;
                font-family: 'Fira Code', 'Courier New', monospace;
                font-size: 14px;
                line-height: 1.6;
                color: var(--color-text-secondary);
            }

            #kb-guide-wrapper .kb-code-block code {
                color: var(--color-text-secondary);
                white-space: pre-wrap;
                word-wrap: break-word;
            }

            #kb-guide-wrapper .kb-inline-code {
                background: var(--color-surface-elevated);
                color: var(--color-magenta);
                padding: 2px 8px;
                border-radius: 4px;
                font-family: 'Fira Code', monospace;
                font-size: 14px;
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
            }

            #kb-guide-wrapper .mermaid {
                background: var(--color-surface-elevated);
                border: 1px solid var(--color-border);
                border-radius: 12px;
                padding: 32px;
                margin: 32px 0;
            }

            @media (max-width: 768px) {
                #kb-guide-wrapper .kb-container {
                    padding: 40px 20px;
                }

                #kb-guide-wrapper .kb-title {
                    font-size: 36px;
                }

                #kb-guide-wrapper h2 {
                    font-size: 28px;
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

            <main>
                ${content}
            </main>

            <footer class="kb-footer">
                ${tags.length > 0 ? `
                <div class="kb-tags">
                    ${tags.map(tag => `<span class="kb-tag">${tag}</span>`).join('\n                    ')}
                </div>
                ` : ''}
            </footer>
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
                tertiaryColor: '#0a0a0a'
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
    const content = markdownToHtml(markdown);

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

console.log('Starting conversion...\n');

for (const layer of layers) {
    const sourceDir = path.join(__dirname, layer);
    const targetDir = path.join(__dirname, 'html', layer);

    if (fs.existsSync(sourceDir)) {
        console.log(`\n=== Processing ${layer} ===`);
        processDirectory(sourceDir, targetDir);
    }
}

console.log('\n✅ Conversion complete!');
