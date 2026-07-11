// Parses HTML structure exported from AiS2 and returns parsed data array
export function parseAisHtml(htmlContent, multipliers) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // AiS2 renders each subject as a mat-card with Angular Material layout
    // Desktop view uses: div.col-5 (name), div.col-2 (credits), div.col-3 (grade)
    const cards = doc.querySelectorAll('mat-card');
    const importedSubjects = [];

    cards.forEach(card => {
        // Use the desktop row (d-md-flex) to extract structured data
        const desktopRow = card.querySelector('.row.d-md-flex');
        if (!desktopRow) return;

        // Subject Name:

        // Located in div.col-5 > div > b
        const nameCol = desktopRow.querySelector('.col-5');
        if (!nameCol) return;
        const nameEl = nameCol.querySelector('b');
        if (!nameEl) return;
        const name = nameEl.textContent.trim();

        // Credits:

        // Located in div.col-2, inside first span.badge > b, format: "5K"
        const creditsCol = desktopRow.querySelector('.col-2');
        if (!creditsCol) return;
        const creditBadge = creditsCol.querySelector('.badge b');
        if (!creditBadge) return;
        // Extract only the number from text like "5K"
        const creditsText = creditBadge.textContent.trim();
        const credits = parseInt(creditsText);

        // Grade:

        // Located in div.col-3 > div > div.text-wrap > b, format: "A - výborne"
        const gradeCol = desktopRow.querySelector('.col-3');
        let grade = 'FX'; // Default if no grade found
        if (gradeCol) {
            const gradeEl = gradeCol.querySelector('.text-wrap b');
            if (gradeEl) {
                // Grade letter is the direct text node before the span
                // <b>A<span> - výborne</span></b> -> extract "A"
                const gradeText = gradeEl.childNodes[0]?.textContent.trim().toUpperCase();
                if (gradeText && multipliers[gradeText]) {
                    grade = gradeText;
                }
            }
        }

        // Only push if required data is valid
        if (name && !isNaN(credits) && credits > 0) {
            importedSubjects.push({ name, credits, grade });
        }
    });

    return importedSubjects;
}

//Parses text that was copied by user, can take different devices copy methods
export function parseCopyPaste(text){
    const gradeScale = {
        'A': 1,
        'B': 1.5,
        'C': 2,
        'D': 2.5,
        'E' : 3,
        'FX' : 4
    }

    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    const parsedCourses = [];

    let offset = 0;

    for(let i = 0; i < lines.length; i++){
        const currentLine = lines[i];

        // Using a regular expression for finding an "anker".
        // ^(1|2|3|4|5|6|7|8|9|10)- means "start's with and is followed by a dash".

        if(/^(1|2|3|4|5|6|7|8|9|10)-/.test(currentLine)){ 
            if(i==0){
                throw new Error(`You forgot to include subject name!`);
                continue;
            }
            const sunbjectName = lines[i-1];

            const creditsStr = lines[i+1];
            
            if(offset==0){

            // Using reg exp for finding offset that may vary depending on
            //  device from what data was copied
            // ^(A|B|C|D|E|FX) means "start's with".
            // \s*- means "space (several, or none) and dash".
                
                if(/^(A|B|C|D|E|FX)\s*-/.test(lines[i+3])){
                    offset+=3;
                }
                else{
                    offset+=5;
                }
            }

            const grade = lines[i+offset].split("-")[0].trim();
            
            const credits = parseInt(creditsStr,10);

            parsedCourses.push({
                name: sunbjectName,
                grade: grade,
                credits: credits
            });
        }
    }

    return parsedCourses;
}
