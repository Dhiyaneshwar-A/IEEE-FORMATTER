export const formatLatex = (data) => {
    const { title, authors, abstract, keywords, sections, tables, images } = data;
  
    const latexAuthors = authors.join(', ');
  
    const latexSections = sections.map(
      section => `\\section{${section.heading}} ${section.content}`
    ).join('\n');
  
    const latexTables = tables.map(
      (table, index) => `\\begin{table}[htbp]\n\\caption{Table ${index + 1}}\n\\centering\n${table}\n\\end{table}`
    ).join('\n');
  
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
      ${latexSections}
      ${latexTables}
      ${latexImages}
      \\end{document}
    `;
  };
  