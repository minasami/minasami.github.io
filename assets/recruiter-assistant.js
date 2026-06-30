(function () {
  const answers = [
    {
      keywords: ['project', 'pmo', 'governance', 'milestone', 'risk', 'status report'],
      answer: 'Mina has project-management and PMO experience across healthcare and digital transformation. His work includes planning, milestone tracking, stakeholder coordination, KPI dashboards, SOPs, risk and issue management, executive reporting, and implementation support.'
    },
    {
      keywords: ['medicine support hub', 'medicine hub', 'platform', '86,000', '86000'],
      answer: 'Medicine Support Hub is Mina’s bilingual digital-health platform. It integrates more than 86,000 Egyptian medicines and connects eight role-based workflows covering request intake, clinical review, pharmacy operations, procurement, delivery, administration, and analytics.'
    },
    {
      keywords: ['employee support', 'esp', 'servicedesk', 'google apps script', 'automation'],
      answer: 'For the Employee Support Program, Mina helped transform a fragmented manual healthcare-support process into a governed ticket-based workflow using ServiceDesk Plus, Google Forms, Google Apps Script, dashboards, SOPs, escalation paths, and role-based training.'
    },
    {
      keywords: ['healthcare', 'pharmacy', 'clinical', 'medicine access', 'digital health'],
      answer: 'Mina is a Licensed Pharmacist with experience in chronic medicine support, healthcare operations, clinical workflow design, medicine access, public-health delivery, and digital-health implementation.'
    },
    {
      keywords: ['technical', 'technology', 'cloud', 'react', 'supabase', 'python', 'firebase', 'aws', 'azure', 'gcp'],
      answer: 'Mina’s technical delivery experience includes Google Apps Script, ServiceDesk Plus, React, TypeScript, Firebase, Supabase, PostgreSQL, Python, JavaScript, AWS, Azure, GCP, Moodle, and Open edX. His focus is translating business and healthcare workflows into practical systems.'
    },
    {
      keywords: ['leadership', 'stakeholder', 'training', 'workshop', 'change management', 'facilitation'],
      answer: 'Mina leads through cross-functional coordination, structured facilitation, clear ownership, and change adoption. He has worked across HR, People Operations, reviewers, pharmacists, physicians, IT, vendors, and leadership, while also creating training materials, SOPs, and implementation guidance.'
    },
    {
      keywords: ['achievement', 'impact', '120', 'portfolio', 'budget'],
      answer: 'Mina has supported governance, operational coordination, reporting, and portfolio visibility across healthcare support programs exceeding EGP 120 million in value. This describes portfolio support and visibility, not sole budget ownership.'
    },
    {
      keywords: ['pmp', 'certification', 'credential'],
      answer: 'Mina is currently pursuing the Project Management Professional (PMP®) certification. Its status is In Progress; he is not yet presented as PMP certified.'
    },
    {
      keywords: ['education', 'university', 'degree'],
      answer: 'Mina holds a Bachelor of Pharmacy from Ain Shams University, completed in 2021.'
    },
    {
      keywords: ['role', 'fit', 'position', 'job'],
      answer: 'Mina is strongest for roles in Project Management, PMO, Digital Health Transformation, Healthcare Operations, Operational Excellence, Technical Project Delivery, and healthcare product or innovation work.'
    },
    {
      keywords: ['available', 'notice', 'availability'],
      answer: 'Mina’s stated notice period is three weeks.'
    },
    {
      keywords: ['contact', 'email', 'whatsapp', 'linkedin'],
      answer: 'You can contact Mina at jesussavedmina@gmail.com, WhatsApp him at +20 128 459 0503, or connect through linkedin.com/in/jesussavedmina.'
    }
  ];

  function normalize(text) {
    return String(text || '').toLowerCase().replace(/[^a-z0-9+.,@\s-]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function matchAnswer(question) {
    const q = normalize(question);
    let best = null;
    let bestScore = 0;

    answers.forEach(function (entry) {
      const score = entry.keywords.reduce(function (total, keyword) {
        return total + (q.includes(keyword) ? keyword.split(' ').length : 0);
      }, 0);
      if (score > bestScore) {
        bestScore = score;
        best = entry.answer;
      }
    });

    return best || 'I can answer verified questions about Mina’s PMO experience, healthcare projects, Medicine Support Hub, Employee Support Program transformation, technical skills, leadership, credentials, role fit, availability, and contact details.';
  }

  window.askAssistant = function () {
    const input = document.getElementById('question');
    const output = document.getElementById('answer');
    if (!input || !output) return;

    const question = input.value.trim();
    output.textContent = matchAnswer(question);

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'ask_recruiter_assistant', {
        question_category: normalize(question).slice(0, 80),
        page_location: window.location.href
      });
    }
  };

  window.preset = function (text) {
    const input = document.getElementById('question');
    if (!input) return;
    input.value = text;
    window.askAssistant();
  };
})();
