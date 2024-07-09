document.addEventListener('DOMContentLoaded', function () {
    const typedText = document.getElementById('typed-text');
    const cursor = document.getElementById('cursor');
    const textArray = ["Canciones en el Hot 100", "Récords Rotos", "Puntaje en Metacritic", "Hits #1", "Premios Ganados"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedText.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    document.addEventListener('DOMContentLoaded', function () { // On DOM Load initiate the effect
        if (textArray.length) setTimeout(type, newTextDelay + 250);
    });
});
