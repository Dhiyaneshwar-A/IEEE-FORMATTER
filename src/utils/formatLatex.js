export const formatLatex = (data) => {
  const { title, authors, abstract, keywords, sections, tables, images } = data;

  const latexAuthors = authors.join(', ');

  // Modified section formatting to handle subsections
  const latexSections = sections.map(section => {
    // Check if the section has subsections
    const subsectionContent = section.subsections
      ? section.subsections.map(subsection => `\\subsection{${subsection.heading}} ${subsection.content}`).join('\n')
      : '';
    
    // Return the section with content and any subsections
    return `\\section{${section.heading}} ${section.content}\n${subsectionContent}`;
  }).join('\n');

  const formatTables = (tables) => {
    return tables.map((table, index) => {
      const { caption, columns, rows } = table; // Ensure structure matches here
      let tableContent = `\\begin{tabular}{||${'c '.repeat(columns.length)}||}\n \\hline\n`;
      tableContent += columns.join(' & ') + ' \\\\ [0.5ex] \n';
      tableContent += ' \\hline\\hline\n';

      rows.forEach(row => {
        tableContent += Object.values(row).join(' & ') + ' \\\\ \n';
        tableContent += ' \\hline\n';
      });

      tableContent += '\\end{tabular}\n';
      
      // Return the table with caption only once, before the tabular environment
      return `\\begin{table}[htbp]\n\\caption{${caption}}\n\\centering\n${tableContent}\\end{table}`;
    }).join('\n');
  };

  const latexTables = formatTables(tables); // Call the new function to generate tables

  const latexImages = images.map(
      (image, index) => `\\begin{figure}[htbp]\n\\centering\n\\includegraphics[width=0.5\\textwidth]{${image.name}}\n\\caption{Figure ${index + 1}}\n\\end{figure}`
  ).join('\n');

  return `
    \\documentclass{IEEEtran}
    \\title{${title}}
    \\author{${latexAuthors}}
    \\begin{document}
    \\maketitle
    \\begin{abstract}
    ${abstract}
    \\end{abstract}
    \\begin{IEEEkeywords}
    ${keywords.join(', ')}
    \\end{IEEEkeywords}

    ${latexSections} % Include the formatted sections

    ${latexTables} % Include the formatted tables

    ${latexImages} % Include the formatted images

    \\end{document}
  `;
};
