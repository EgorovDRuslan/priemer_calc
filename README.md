# Priemer & Intrak Points Calculator

A web-based application designed to help university students calculate their semester or annual weighted average grade (Priemer) and dormitory/scholarship points (Intrak Points).

The project runs entirely on the client side (in the browser) using HTML, CSS, and JavaScript. It does not require any backend server and does not transmit data over the network.

## Formulas Used

### 1. Priemer (Weighted Average)
$$\text{Priemer} = \frac{\sum (\text{Credits}_i \times \text{Coefficient}_i)}{\sum \text{Credits}_i}$$

### 2. Intrak Points
Maps the average grade ($1.0 \le x \le 3.0$) onto a $0 - 700$ points scale:
$$\text{Intrak Points} = 700 \times \frac{3.00 - \text{Average Grade}}{3.00 - 1.00}$$

## How to use AiS2 Import

The application supports importing your subjects and grades directly from the AiS2 system

### Steps to Import:
1. Log in to your university's **AiS2** system
2. Navigate to the **"Moje predmety"** (My Subjects) section or the equivalent page where your current subjects and grades are listed
3. Save the entire webpage to your local machine (Right-click anywhere on the page $\rightarrow$ **Save as...** or press `Ctrl + S`). Save it as an HTML file (`Moje predmety.html`)
4. In the Priemer Calculator, locate the **"Import from AiS2"** section.
5. Click **"Choose File"** and select the HTML file you just saved
6. The application will automatically parse the file, extract your subjects, credits, and grades, and populate the table

### How Parsing Works (Under the hood):
The `parser.js` module reads the uploaded HTML file and looks for specific Angular Material Cards (`mat-card`) which AiS2 uses to render the subject list. For each card, it extracts:
- **Subject Name:** from the `div.col-5 > b` element.
- **Credits:** from the `div.col-2` badge, stripping out text like "K" ("5K" becomes `5`).
- **Grade:** from the `div.col-3` element, taking the first letter of the grade description ("A - výborne" becomes `A`). If no grade is found, it defaults to `FX`.

All parsed data is immediately loaded into the calculator and saved to your browser's local storage
