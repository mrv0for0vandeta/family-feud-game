import XLSX from 'xlsx';
import fs from 'fs';

// Read the Excel file
const workbook = XLSX.readFile('Sondage QPUC – Aide-nous à construire les questions du Family Feud !.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// Extract question columns from header row
const headerRow = data[0];
const questionColumns = [];

console.log('Analyzing Excel columns...\n');

for (let i = 0; i < headerRow.length; i++) {
    const header = headerRow[i];
    if (header && typeof header === 'string') {
        const cleanHeader = header.trim();
        // Include all question columns (skip metadata and Points/Feedback columns)
        if (!cleanHeader.includes('Points') &&
            !cleanHeader.includes('Feedback') &&
            !cleanHeader.includes('Id') &&
            !cleanHeader.includes('time') &&
            !cleanHeader.includes('Email') &&
            !cleanHeader.includes('Name') &&
            !cleanHeader.includes('Total') &&
            !cleanHeader.includes('Grade') &&
            !cleanHeader.includes('Quiz') &&
            cleanHeader.length > 10) { // Must be a substantial question
            questionColumns.push({ index: i, question: cleanHeader });
            console.log(`Column ${i}: ${cleanHeader.substring(0, 80)}...`);
        }
    }
}

console.log(`\nFound ${questionColumns.length} questions\n`);

// Process answers for each question
const questions = {};

questionColumns.forEach(({ index, question }) => {
    questions[question] = {};

    // Go through each row (skip header)
    for (let rowIndex = 1; rowIndex < data.length; rowIndex++) {
        const answer = data[rowIndex][index];

        if (answer && typeof answer === 'string') {
            const cleanAnswer = answer.trim().toLowerCase();
            // Filter out empty answers, dots, and "jsp" (je sais pas)
            if (cleanAnswer !== '' &&
                cleanAnswer !== '.' &&
                !cleanAnswer.includes('jsp') &&
                !cleanAnswer.includes('aucune idée') &&
                !cleanAnswer.includes("j'en ai aucune idée")) {
                questions[question][cleanAnswer] = (questions[question][cleanAnswer] || 0) + 1;
            }
        }
    }
});

// Convert to Family Feud format with points based on frequency
const familyFeudQuestions = [];

Object.entries(questions).forEach(([questionText, answerCounts], qIndex) => {
    // Sort answers by frequency (most repeated first)
    const sortedAnswers = Object.entries(answerCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8); // Take top 8 answers

    if (sortedAnswers.length === 0) return;

    // Calculate points (highest frequency gets highest points)
    const totalResponses = sortedAnswers.reduce((sum, [_, count]) => sum + count, 0);

    const answers = sortedAnswers.map(([answer, count]) => {
        // Calculate points as percentage of total responses, scaled to 100
        const points = Math.round((count / totalResponses) * 100);

        // Capitalize first letter of each word
        const formattedAnswer = answer
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return {
            text: formattedAnswer,
            points: points,
            revealed: false
        };
    });

    familyFeudQuestions.push({
        id: qIndex + 1,
        question: questionText,
        answers: answers
    });
});

// Save to JSON file
const outputPath = 'src/data/questions.json';
fs.writeFileSync(outputPath, JSON.stringify(familyFeudQuestions, null, 2));

console.log('\n✅ Questions processed successfully!');
console.log(`📊 Total questions: ${familyFeudQuestions.length}`);
console.log(`💾 Saved to: ${outputPath}`);

console.log('\n📋 All questions loaded:');
familyFeudQuestions.forEach((q, idx) => {
    console.log(`${idx + 1}. ${q.question.substring(0, 80)}...`);
    console.log(`   Top answer: "${q.answers[0].text}" (${q.answers[0].points} points)`);
});
