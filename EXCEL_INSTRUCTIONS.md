# How to Update Questions from Excel

## Automatic Processing

The game automatically loads questions from your Excel survey file. The script:

1. **Reads the Excel file** with survey responses
2. **Counts answer frequencies** for each question
3. **Assigns points** based on popularity:
   - Most repeated answer = Highest points
   - Least repeated answer = Lowest points
4. **Generates JSON** with top 8 answers per question

## To Update Questions:

### Option 1: Replace the Excel File
1. Replace the Excel file in the root directory
2. Run: `npm run process-excel`
3. Restart the dev server: `npm run dev`

### Option 2: Use the Question Editor
1. Open the Host View
2. Click "Question Editor"
3. Manually add/edit questions
4. Click "Load to Game"

## Excel File Format

The script expects:
- **Header row** with question text (must end with `?`)
- **Data rows** with one answer per respondent
- Automatically filters out:
  - Empty answers
  - "jsp" (je sais pas)
  - "aucune idée"
  - Single dots (.)

## Current Questions Loaded

✅ **5 questions** from your survey:
1. Quel est le meilleur endroit pour faire une sieste « incognito » sur le campus ?
2. Quelle est la première chose que vous faites en arrivant sur le campus ?
3. Quel est le moyen de transport le plus « stylé » sur le campus ?
4. Quel est le « dress code » non officiel d'un étudiant en période de partiels ?
5. Quel est l'outil (logiciel) que les économistes préfèrent à leur propre famille ?

## Points Calculation

Points are calculated as a **percentage of total responses**:
- If "Golfette" was answered 12 times out of 20 total responses
- Points = (12/20) × 100 = 60 points

This ensures the most popular answers get the highest points!

## Troubleshooting

If questions don't load:
1. Check that the Excel file is in the root directory
2. Run `npm run process-excel` to regenerate questions
3. Check `src/data/questions.json` was created
4. Restart the dev server
