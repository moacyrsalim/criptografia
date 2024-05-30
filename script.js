let currentKey = "";

document.getElementById('fileInput').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            currentKey = e.target.result;
            alert("Chave carregada com sucesso!");
        };
        reader.readAsText(file);
    }
});

function encryptMessage() {
    if (!currentKey) {
        alert("Por favor, carregue uma chave ou gere uma nova.");
        return;
    }
    const input = document.getElementById('message').value;
    const encrypted = CryptoJS.AES.encrypt(input, currentKey.trim());
    const encryptedString = encrypted.toString();
    document.getElementById('output').textContent = 'Mensagem criptografada: ';
    document.getElementById('encryptedMessage').value = encryptedString;
}

function generateAndEncrypt() {
    const input = document.getElementById('message').value;
    currentKey = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
    const encrypted = CryptoJS.AES.encrypt(input, currentKey);
    const encryptedString = encrypted.toString();
    document.getElementById('output').textContent = 'Mensagem criptografada: ';
    document.getElementById('encryptedMessage').value = encryptedString;
    downloadKey(currentKey);
}

function decryptMessage() {
    if (!currentKey) {
        alert("Por favor, carregue uma chave para descriptografar.");
        return;
    }
    const input = document.getElementById('message').value;
    try {
		/*debugger;*/
        const decrypted = CryptoJS.AES.decrypt(input, currentKey.trim());
        const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
        if (plaintext) {
            document.getElementById('output').textContent = 'Mensagem descriptografada: ';
			document.getElementById('encryptedMessage').value = plaintext;
        } else {
            document.getElementById('output').textContent = 'Falha na descriptografia. Verifique a chave e a mensagem.';
        }
    } catch (e) {
        document.getElementById('output').textContent = 'Erro durante a descriptografia: ' + e.message;
    }
}

function downloadKey(key) {
    const fileName = prompt("Por favor, insira o nome do arquivo para salvar a chave:", "chave.txt");
    if (fileName) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(key));
        element.setAttribute('download', fileName);
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    } else {
        alert("Nome do arquivo não pode estar vazio.");
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    document.getElementById('theme-icon').textContent = newTheme === "dark" ? "🌙" : "☀️";
    localStorage.setItem('theme', newTheme);
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute("data-theme", savedTheme);
    document.getElementById('theme-icon').textContent = savedTheme === "dark" ? "🌙" : "☀️";
});
