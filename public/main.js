const terminal = document.getElementById('terminal');

const lines = [
  { prompt: true, text: 'whoami' },
  { prompt: false, type: 'text', text: "I'm Hexon — a creative dev + builder of weird and cool stuff." },
  { prompt: true, text: 'links' },
  { prompt: false, type: 'html', html: '<a href="https://github.com/jacobrdale" target="_blank">GitHub</a>' },
  { prompt: false, type: 'html', html: '<a href="https://steamcommunity.com/id/itsiJakeYT" target="_blank">Steam</a>' },
  { prompt: true, text: 'languages' },
  { prompt: false, type: 'text', text: 'JavaScript (Node, Express, NexaJS, etc)' },
  { prompt: false, type: 'text', text: 'HTML/CSS' },
  { prompt: false, type: 'text', text: 'Python' },
  { prompt: false, type: 'text', text: 'Bash'},
  { prompt: false, type: 'text', text: 'Java (for Minecraft mods)'},
  { prompt: false, type: 'text', text: 'C (Basics)'},
  { prompt: false, type: 'text', text: 'Custom scripting formats (.jplus)'},
  { prompt: false, type: 'text', text: 'Plaintext (yes)'},
  { prompt: false, type: 'text', text: 'GoDot'},
  { prompt: true, text: 'github' },
  { prompt: false, type: 'html', html: `
    <a href="https://github.com/jacobrdale" target="_blank">
      <img src="https://github-readme-stats.vercel.app/api?username=jacobrdale&show_icons=true" alt="Hexon's Github Stats">
    </a>` },
  { prompt: true, text: 'projects' },
  { prompt: false, type: 'html', html: `
    <a href="./projects" target="_blank" rel="noopener noreferrer">My Projects</a>` },
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
