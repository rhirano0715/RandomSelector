// script.js

document.addEventListener('DOMContentLoaded', () => {
    loadWords()
        .then(words => {
            populateDropdown(words);
            window.words = words; // Make words accessible globally
        })
        .catch(error => console.error('Error loading words:', error));
});

async function loadWords() {
    const response = await fetch('words.tsv'); // Path to your TSV file
    const text = await response.text();
    return parseTSV(text);
}

function parseTSV(text) {
    const lines = text.trim().split('\n');
    const words = {};
    const headers = lines[0].split('\t'); // Extract headers
    const typeIndex = headers.indexOf('type'); // Index of 'type' column
    const wordIndex = headers.indexOf('word'); // Index of 'word' column

    for (let i = 1; i < lines.length; i++) { // Start from 1 to skip header
        const line = lines[i].split('\t');
        const type = line[typeIndex];
        const word = line[wordIndex];

        if (!words[type]) {
            words[type] = [];
        }
        words[type].push(word);
    }
    return words;
}

function populateDropdown(words) {
    const dropdown = document.getElementById('type');
    Object.keys(words).forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        dropdown.appendChild(option);
    });
}

function selectRandomWord() {
    const type = document.getElementById('type').value;
    const words = window.words;
    const wordList = words[type];
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    document.getElementById('result').textContent = `${randomWord}`;
}
