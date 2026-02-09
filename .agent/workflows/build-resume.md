---
description: Build and export resume PDF with proper naming
---

# Build Resume Workflow

This workflow compiles the LaTeX resume and saves it with the standard naming convention for Naukri.

## Steps

// turbo-all

1. Navigate to the project directory:
   ```
   cd c:\Users\kiran\Desktop\ResumeKt
   ```

2. Compile the LaTeX resume:
   ```
   pdflatex -interaction=nonstopmode sample.tex
   ```

3. Copy to output folder with proper name:
   ```
   Copy-Item -Path "sample.pdf" -Destination "output\KiranTilekar_SpringBoot_3.3Yrs.pdf" -Force
   ```

## Output
- **Source**: `sample.pdf`
- **Final**: `output\KiranTilekar_SpringBoot_3.3Yrs.pdf`

## Usage
Run `/build-resume` to compile and export the resume.
