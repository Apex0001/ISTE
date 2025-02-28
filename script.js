// Function to update resume preview based on form inputs
function updatePreview() {
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const education = document.getElementById('education').value;
  const experience = document.getElementById('experience').value;
  const skills = document.getElementById('skills').value;
  const projects = document.getElementById('projects').value;
  const certifications = document.getElementById('certifications').value;
  const template = document.getElementById('templateSelect').value;

  const previewContent = `
    <h3>${fullName || 'Your Name Here'}</h3>
    <p><strong>Email:</strong> ${email || 'email@example.com'} | <strong>Phone:</strong> ${phone || 'Your phone number'}</p>
    <h4>Education</h4>
    <p>${education || 'Your education details...'}</p>
    <h4>Experience</h4>
    <p>${experience || 'Your work experience...'}</p>
    <h4>Skills</h4>
    <p>${skills || 'Your skills...'}</p>
    <h4>Projects</h4>
    <p>${projects || 'Your projects...'}</p>
    <h4>Certifications</h4>
    <p>${certifications || 'Your certifications...'}</p>
  `;

  const resumePreview = document.getElementById('resumePreview');
  // Apply the selected template style
  resumePreview.className = 'preview-content ' + (template === 'modern' ? 'modern-template' : 'classic-template');
  resumePreview.classList.add('fade-out');
  setTimeout(() => {
    resumePreview.innerHTML = previewContent;
    resumePreview.classList.remove('fade-out');
    resumePreview.classList.add('fade-in');
    setTimeout(() => {
      resumePreview.classList.remove('fade-in');
    }, 500);
  }, 300);

  // Update AI suggestion with a fresh tip
  document.querySelector('.ai-tip').textContent = getAITip();

  // Update resume score
  updateResumeScore({ fullName, email, phone, education, experience, skills, projects, certifications });
}

// Returns a random AI tip
function getAITip() {
  const tips = [
    'Keep your resume concise and impactful.',
    'Highlight your key achievements.',
    'Use strong action verbs throughout.',
    'Tailor your resume for every job application.'
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}

// Computes a simple resume score based on non-empty fields
function updateResumeScore(fields) {
  let score = 0;
  // Each non-empty field adds 12.5 points (8 fields total for a max of 100)
  for (const key in fields) {
    if (fields[key].trim() !== '') {
      score += 12.5;
    }
  }
  document.getElementById('scoreValue').textContent = score;
}

// Generates and downloads a PDF using jsPDF
function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const resumeContent = document.getElementById('resumePreview').innerText;
  const lines = doc.splitTextToSize(resumeContent, 180);
  doc.text(lines, 10, 10);
  doc.save('resume.pdf');
}

// Saves the current resume data to localStorage
function saveResume() {
  const resumeData = {
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    education: document.getElementById('education').value,
    experience: document.getElementById('experience').value,
    skills: document.getElementById('skills').value,
    projects: document.getElementById('projects').value,
    certifications: document.getElementById('certifications').value,
    template: document.getElementById('templateSelect').value
  };
  localStorage.setItem('savedResume', JSON.stringify(resumeData));
  alert('Resume saved locally!');
}

// Toggle between Dark and Light Modes
const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  modeToggle.textContent = document.body.classList.contains('light-mode')
    ? 'Dark Mode'
    : 'Light Mode';
});
