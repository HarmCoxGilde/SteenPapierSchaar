document.getElementById('steen').addEventListener('click', function() { speel('steen'); });
document.getElementById('papier').addEventListener('click', function() { speel('papier'); });
document.getElementById('schaar').addEventListener('click', function() { speel('schaar'); });

function speel(spelerKeuze) {
    const keuzes = ['steen', 'papier', 'schaar'];
    const computerKeuze = keuzes[Math.floor(Math.random() * 3)];
    const resultaat = bepaalWinnaar(spelerKeuze, computerKeuze);
    const resultaatDiv = document.getElementById('resultaat');
    resultaatDiv.innerHTML = `Jij koos: ${spelerKeuze}<br>Computer koos: ${computerKeuze}<br>${resultaat}`;
    updateBackgroundColor(resultaat);
}

function bepaalWinnaar(speler, computer) {
    if (speler === computer) {
        return 'Gelijkspel!';
    } else if ((speler === 'steen' && computer === 'schaar') ||
               (speler === 'papier' && computer === 'steen') ||
               (speler === 'schaar' && computer === 'papier')) {
        return 'Jij wint!';
    } else {
        return 'Computer wint!';
    }
}

function updateBackgroundColor(resultaat) {
    const resultaatDiv = document.getElementById('resultaat');
    resultaatDiv.className = '';
    if (resultaat.includes('Jij wint!')) {
        resultaatDiv.classList.add('win');
    } else if (resultaat.includes('Computer wint!')) {
        resultaatDiv.classList.add('lose');
    } else {
        resultaatDiv.classList.add('draw');
    }
}
