/**
 * Resume Download & Print Utilities for Ravita Choudhary
 * Supports direct PDF file generation via html2pdf.js + fallback print & clipboard tools
 */

document.addEventListener('DOMContentLoaded', () => {
  initResumeActions();
});

function initResumeActions() {
  const downloadBtn = document.getElementById('download-resume-btn');
  const printBtn = document.getElementById('print-resume-btn');
  const downloadTxtBtn = document.getElementById('download-txt-btn');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyPhoneBtn = document.getElementById('copy-phone-btn');

  // Direct PDF Download Handler
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadResumeAsPDF();
    });
  }

  // Print Handler
  if (printBtn) {
    printBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerResumePrint();
    });
  }

  // Download Plain Text ATS Resume
  if (downloadTxtBtn) {
    downloadTxtBtn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadPlainTextResume();
    });
  }

  // Copy Email Handler
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      copyToClipboard('ravitakulriya@gmail.com', 'Email address copied to clipboard!');
    });
  }

  // Copy Phone Handler
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      copyToClipboard('+91 9001616008', 'Phone number copied to clipboard!');
    });
  }
}

/**
 * Generates and downloads a high-quality PDF directly to the user's Downloads folder
 */
function downloadResumeAsPDF() {
  const resumeElement = document.getElementById('printable-resume-container');
  const downloadBtn = document.getElementById('download-resume-btn');

  if (!resumeElement) {
    if (window.showToast) window.showToast('Resume container not found!');
    return;
  }

  // Visual loading feedback
  const originalBtnText = downloadBtn ? downloadBtn.innerHTML : '';
  if (downloadBtn) {
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Generating PDF...';
    downloadBtn.disabled = true;
  }

  if (window.showToast) {
    window.showToast('Compiling high-resolution PDF resume...');
  }

  // Check if html2pdf library is available
  if (typeof html2pdf !== 'undefined') {
    const opt = {
      margin:       [8, 8, 8, 8], // mm
      filename:     'Ravita_Choudhary_Resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(resumeElement).save().then(() => {
      if (downloadBtn) {
        downloadBtn.innerHTML = originalBtnText;
        downloadBtn.disabled = false;
      }
      if (window.showToast) {
        window.showToast('✅ Ravita_Choudhary_Resume.pdf saved to Downloads!');
      }
    }).catch(err => {
      console.warn('html2pdf error, triggering print fallback:', err);
      if (downloadBtn) {
        downloadBtn.innerHTML = originalBtnText;
        downloadBtn.disabled = false;
      }
      triggerResumePrint();
    });
  } else {
    // Fallback if CDN is offline
    setTimeout(() => {
      if (downloadBtn) {
        downloadBtn.innerHTML = originalBtnText;
        downloadBtn.disabled = false;
      }
      triggerResumePrint();
    }, 400);
  }
}

/**
 * Triggers native browser print dialogue configured for PDF saving
 */
function triggerResumePrint() {
  if (window.showToast) {
    window.showToast('Opening Print window... Choose "Save as PDF"');
  }
  setTimeout(() => {
    window.print();
  }, 350);
}

/**
 * Downloads a clean ATS-friendly plain text resume
 */
function downloadPlainTextResume() {
  const textContent = `========================================================================
RAVITA CHOUDHARY
LinkedIn: https://www.linkedin.com/in/ravita-choudhary-798377382/
Email: ravitakulriya@gmail.com
GitHub: https://github.com/ravita-choudhary3
Mobile: +91 9001616008
========================================================================

SKILLS
------------------------------------------------------------------------
Languages: C++, Python, C
Core Computer Science: Data Structures & Algorithms, DBMS, Object-Oriented Programming,
Software Engineering, Operating System Concepts, Computer Fundamentals
Tools/Platforms: Git, GitHub, VS Code, Proteus, Tinker cad, Wokwi, Jupyter Notebook, Streamlit
Design: Blender, 3D Modelling
Soft Skills: Problem Solving, Teamwork, Communication, Adaptability, Leadership, Time Management

PROJECTS
------------------------------------------------------------------------
RETRIUM OS — Custom Operating System | C | Operating Systems | Systems Programming (Jul '23)
• Developed an independent custom operating system named Retrium OS to explore low-level systems
  programming and operating system concepts.
• Worked with C and system-level programming concepts to understand the interaction between software
  and computer hardware.
• Explored fundamental operating system concepts including system architecture, memory, processes,
  input/output, and kernel-level operations.
• GitHub: https://github.com/ravita-choudhary3/Retrium-OS

EV WIRELESS CHARGING SMART PARKING SYSTEM | Arduino | ESP32 | ACS712 | Proteus (Nov '25)
• Designed an EV wireless charging system integrated with a smart parking concept for electric vehicles.
• Worked with Arduino, ESP32, ACS712 current sensor, bridge rectifier, and buck converter for the hardware system.
• Designed and simulated circuit components using Proteus to study system functionality and electrical behavior.
• GitHub: https://github.com/ravita-choudhary3/EV-Wireless-Charging-Smart-Parking

TRAINING & INNOVATION
------------------------------------------------------------------------
CM YUVA Innovation Challenge with IIT Kanpur (Jun '23 – Jul '23)
• Worked on idea development, problem identification, solution strategy, and presentation.
• Gained exposure to entrepreneurship, innovation, business strategy, and startup-oriented problem solving.
• Presented the proposed solution in a competitive environment and collaborated with other participants and innovators.

CERTIFICATES & ACHIEVEMENTS
------------------------------------------------------------------------
• Google Gemini QuizOff 2026 | CampusCrew (#TeamGemini) — 525K+ Competitors (Jul '26)
• TrueFoundry GenAI ProdEdge Product Case Competition | IIT Kharagpur
• Arcadia Rivals | National Institute of Technology (NIT), Tiruchirappalli
• Data Visualization with Tableau | Coursera (May '24)
• Data Engineering Professional Certification | Altair Inc. RapidMiner (Apr '24)
• Python | HackerRank (Mar '23)
• SQL | HackerRank (Mar '23)

EDUCATION
------------------------------------------------------------------------
Lovely Professional University, Phagwara, Punjab
Bachelor of Technology — Computer Science and Engineering | CGPA: 7.73 (Aug '25 – Present)

SVN School, Anupgarh, Rajasthan
Intermediate (PCM) | Percentage: 83% (Mar '24 – May '25)

D.A.V School, Bhadra, Rajasthan
Matriculation | Percentage: 94.00% (Mar '22 – May '23)
========================================================================`;

  const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Ravita_Choudhary_Resume.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  if (window.showToast) {
    window.showToast('✅ Plain Text ATS Resume downloaded!');
  }
}

/**
 * Universal clipboard copy helper
 */
function copyToClipboard(text, successMessage) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      if (window.showToast) window.showToast(successMessage);
    });
  } else {
    // Fallback for non-https or restricted contexts
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      if (window.showToast) window.showToast(successMessage);
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  }
}
