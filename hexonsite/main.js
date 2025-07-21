const terminal = document.getElementById('terminal');

const lines = [
  { prompt: true, text: 'whoami' },
  { prompt: false, type: 'text', text: "I'm Hexon — a creative dev + builder of weird and cool stuff." },
  { prompt: true, text: 'links' },
  { prompt: false, type: 'html', html: '<a href="https://github.com/jacobrdale" target="_blank">GitHub</a>' },
  { prompt: false, type: 'html', html: '<a href="https://steamcommunity.com/id/itsiJakeYT" target="_blank">Steam</a>' },
  { prompt: true, text: 'languages' },
  { prompt: false, type: 'html', html: `
    <ul>
      <li>JavaScript (Node, etc)</li>
      <li>HTML/CSS</li>
      <li>Python</li>
      <li>Bash</li>
      <li>Java (for Minecraft mods)</li>
      <li>C (basics)</li>
      <li>Custom scripting formats (.jplus)</li>
      <li>Plaintext (yes)</li>
      <li>GoDot</li>
    </ul>` },
  { prompt: true, text: 'github' },
  { prompt: false, type: 'html', html: `
    <a href="https://github.com/jacobrdale" target="_blank">
      <img src="https://github-readme-stats.vercel.app/api?username=jacobrdale&show_icons=true" alt="Hexon's Github Stats">
    </a>` }
];

let currentLine = 0;

function typeLine(line, i = 0) {
  const div = document.createElement('p');
  div.classList.add('line');
  if (line.prompt) div.classList.add('prompt');
  terminal.appendChild(div);

  if (line.type === 'html') {
    // Simulate typing effect for HTML line label, then insert full HTML
    let fakeText = '';
    function typeChar() {
      if (i < '[rendering html]'.length) {
        fakeText += '[rendering html]'.charAt(i++);
        div.textContent = fakeText;
        setTimeout(typeChar, 15);
      } else {
        div.innerHTML = line.html;
        currentLine++;
        setTimeout(typeNextLine, 300);
      }
    }
    typeChar();
  } else {
    function typeChar() {
      if (i < line.text.length) {
        div.textContent += line.text[i++];
        setTimeout(typeChar, 15);
      } else {
        currentLine++;
        setTimeout(typeNextLine, 300);
      }
    }
    typeChar();
  }
}

function typeNextLine() {
  if (currentLine < lines.length) {
    typeLine(lines[currentLine]);
  }
}

// Start typing
typeNextLine();