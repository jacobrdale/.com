const terminal = document.getElementById('terminal');

// Commands registry
const commands = {
  whoami: {
    description: "Show information about Me",
    run: () => "I'm Hexon — a creative dev + builder of weird and cool stuff."
  },
  "gui": {
    description: "Show a GUI version of this website",
    run: () => `<a href="./gui.html" target="_blank" rel="noopener noreferrer">Open GUI</a>`
  },
  links: {
    description: "Show links to profiles",
    run: () => `
      <a href="https://github.com/jacobrdale" target="_blank">GitHub</a><br>
      <a href="https://steamcommunity.com/id/itsiJakeYT" target="_blank">Steam</a>
      <a href="https://x.com/stetupyt" target="_blank">X</a>
    `
  },
  languages: {
    description: "List known programming languages",
    run: () => `
      JavaScript (Node, Express, NexaJS, etc)<br>
      HTML/CSS<br>
      Python<br>
      Bash<br>
      Java (for Minecraft mods)<br>
      C (Basics)<br>
      Custom scripting formats (.jplus)<br>
      Plaintext (yes)<br>
      GoDot
    `
  },
  github: {
    description: "Show GitHub stats",
    run: () => `
      <a href="https://github.com/jacobrdale" target="_blank">
        <img src="https://github-readme-stats.vercel.app/api?username=jacobrdale&show_icons=true&theme=radical" alt="Hexon's Github Stats">
      </a>
    `
  },
  help: {
    description: "Show available commands",
    run: () => {
      return Object.entries(commands)
        .map(([cmd, { description }]) => `${cmd} — ${description}`)
        .join('<br>');
    }
  },
  clear: {
    description: "Clear the terminal",
    run: () => {
      terminal.innerHTML = "";
      return "";
    }
  }
};

// Create new input line
function newPrompt() {
  const line = document.createElement("div");
  line.classList.add("line");

  const label = document.createElement("span");
  label.textContent = "visitor@site.local ~$ ";
  label.style.color = "#0f0";

  const input = document.createElement("input");
  input.type = "text";
  input.classList.add("terminal-input");

  line.appendChild(label);
  line.appendChild(input);
  terminal.appendChild(line);

  input.focus();

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      handleCommand(input.value);
      input.disabled = true; // lock previous command
      input.classList.remove("terminal-input");
    }
  });

  // auto-scroll down
  terminal.scrollTop = terminal.scrollHeight;
}

function handleCommand(input) {
  const command = input.trim();
  if (command === "") {
    newPrompt();
    return;
  }

  let output;
  if (commands[command]) {
    output = commands[command].run();
  } else {
    output = `hecmd: ${command}: command not found`;
  }

  if (output) {
    const outLine = document.createElement("div");
    outLine.classList.add("line");
    outLine.innerHTML = output;
    terminal.appendChild(outLine);
  }

  if (command !== "clear") {
    newPrompt();
  }
}

// Init terminal
newPrompt();
