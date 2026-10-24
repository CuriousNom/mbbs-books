// MBBS Book Library - Master Catalog
window.MBBS_CATALOG = {
  appName: "MBBS Book Library",
  tagline: "Interactive 3D Medical Textbook Reader for MBBS Students",
  years: [
    {
      id: "1st-year",
      title: "1st Year MBBS",
      badge: "Pre-Clinical",
      description: "Human Anatomy, Physiology, and Biochemistry",
      icon: "fa-brain",
      subjects: [
        {
          id: "anatomy",
          title: "Human Anatomy",
          tagline: "Gross Anatomy, Histology, Embryology, and Neuroanatomy",
          color: "blue",
          accent: "#2563eb",
          icon: "fa-bone",
          books: [
            {
              id: "bdc-vol-1",
              title: "BD Chaurasia's Human Anatomy - Volume 1",
              subtitle: "Upper Limb & Thorax (Regional and Applied Dissection and Clinical)",
              author: "Dr. B.D. Chaurasia",
              edition: "8th Edition",
              category: "Anatomy",
              year: "1st Year",
              totalPages: 378,
              basePath: "books/1st-year-mbbs/anatomy/bdc-vol-1/",
              cover: "books/1st-year-mbbs/anatomy/bdc-vol-1/1.webp",
              filePattern: "{page}.webp",
              available: true,
              description: "Covers bones, muscles, nerves, blood supply of upper limb, thorax, thoracic cage, lungs, heart, mediastinum, with clinical relations and dissection steps.",
              chapters: [
                { title: "Front Cover & Prelims", startPage: 1 },
                { title: "Section 1: Upper Limb - Bones", startPage: 15 },
                { title: "Pectoral Region & Axilla", startPage: 55 },
                { title: "Arm, Forearm & Hand", startPage: 110 },
                { title: "Joints of Upper Limb", startPage: 195 },
                { title: "Section 2: Thorax - Thoracic Wall", startPage: 235 },
                { title: "Lungs & Pleura", startPage: 275 },
                { title: "Heart & Pericardium", startPage: 310 },
                { title: "Superior & Posterior Mediastinum", startPage: 345 }
              ]
            },
            {
              id: "bdc-vol-2",
              title: "BD Chaurasia's Human Anatomy - Volume 2",
              subtitle: "Lower Limb, Abdomen & Pelvis (Regional and Applied Dissection and Clinical)",
              author: "Dr. B.D. Chaurasia",
              edition: "8th Edition",
              category: "Anatomy",
              year: "1st Year",
              totalPages: 562,
              basePath: "books/1st-year-mbbs/anatomy/bdc-vol-2/",
              cover: "books/1st-year-mbbs/anatomy/bdc-vol-2/1.webp",
              filePattern: "{page}.webp",
              available: true,
              description: "Comprehensive coverage of Lower Limb osteology, compartments, joints, Anterior Abdominal Wall, Peritoneum, Abdominal Viscera, Pelvis and Perineum.",
              chapters: [
                { title: "Front Cover & Prelims", startPage: 1 },
                { title: "Section 1: Lower Limb - Bones", startPage: 18 },
                { title: "Thigh, Gluteal Region & Popliteal Fossa", startPage: 60 },
                { title: "Leg, Ankle & Foot", startPage: 140 },
                { title: "Joints of Lower Limb", startPage: 190 },
                { title: "Section 2: Abdomen & Pelvis", startPage: 240 },
                { title: "Anterior Abdominal Wall & Inguinal Canal", startPage: 265 },
                { title: "Abdominal Cavity & Peritoneum", startPage: 315 },
                { title: "Stomach, Intestines & Liver", startPage: 350 },
                { title: "Kidneys, Ureters & Suprarenals", startPage: 430 },
                { title: "Pelvis, Perineum & Reproductive Organs", startPage: 480 }
              ]
            },
            {
              id: "bdc-vol-3-4",
              title: "BD Chaurasia's Human Anatomy - Volume 3 & 4",
              subtitle: "Head, Neck & Brain (Neuroanatomy)",
              author: "Dr. B.D. Chaurasia",
              edition: "8th Edition",
              category: "Anatomy",
              year: "1st Year",
              totalPages: 640,
              basePath: "books/1st-year-mbbs/anatomy/bdc-vol-3-4/",
              cover: "books/1st-year-mbbs/anatomy/bdc-vol-3-4/1.webp",
              filePattern: "{page}.webp",
              available: true,
              description: "Detailed dissection and clinical anatomy of Scalp, Face, Triangles of Neck, Cranial Cavity, Cranial Nerves, Orbit, Pharynx, Larynx, and complete Neuroanatomy (Spinal Cord, Brainstem, Cerebellum, Cerebrum).",
              chapters: [
                { title: "Front Cover & Prelims", startPage: 1 },
                { title: "Section 1: Head and Neck - Bones", startPage: 15 },
                { title: "Scalp, Temple and Face", startPage: 55 },
                { title: "Cranial Cavity & Dural Venous Sinuses", startPage: 105 },
                { title: "Triangles of the Neck", startPage: 155 },
                { title: "Orbit, Eyeball & Ear", startPage: 220 },
                { title: "Pharynx, Larynx & Oral Cavity", startPage: 285 },
                { title: "Cranial Nerves (I to XII)", startPage: 360 },
                { title: "Section 2: Neuroanatomy (Brain)", startPage: 410 },
                { title: "Spinal Cord & Brainstem", startPage: 440 },
                { title: "Cerebellum & 4th Ventricle", startPage: 510 },
                { title: "Cerebrum, Basal Ganglia & Ventricles", startPage: 555 },
                { title: "Blood Supply of Brain & Clinicals", startPage: 605 }
              ]
            }
          ]
        },
        {
          id: "physiology",
          title: "Human Physiology",
          tagline: "Organ Systems, Cellular Physiology, Biophysics, and Homeostasis",
          color: "red",
          accent: "#dc2626",
          icon: "fa-heart-pulse",
          books: [
            {
              id: "guyton-hall",
              title: "Guyton and Hall Textbook of Medical Physiology",
              subtitle: "International Edition - Cellular to Clinical Systems",
              author: "John E. Hall, Michael E. Hall",
              edition: "14th Edition",
              category: "Physiology",
              year: "1st Year",
              totalPages: 0,
              available: false,
              badge: "Coming Next",
              description: "The gold standard textbook of physiology worldwide covering membrane potentials, cardiac dynamics, circulation, renal mechanisms, respiration, neurophysiology, and endocrinology."
            },
            {
              id: "ganong",
              title: "Ganong's Review of Medical Physiology",
              subtitle: "Concise Systemic & Clinical Medical Physiology",
              author: "Kim E. Barrett et al.",
              edition: "26th Edition",
              category: "Physiology",
              year: "1st Year",
              totalPages: 0,
              available: false,
              badge: "Coming Soon",
              description: "High-yield conceptual medical physiology preferred for competitive entrance and clinical understanding."
            },
            {
              id: "ak-jain",
              title: "Textbook of Physiology (Vols 1 & 2)",
              subtitle: "Competency Based Medical Education (CBME) Curriculum",
              author: "Dr. A.K. Jain",
              edition: "Latest Edition",
              category: "Physiology",
              year: "1st Year",
              totalPages: 0,
              available: false,
              badge: "Coming Soon",
              description: "Standard Indian curriculum textbook aligned with National Medical Commission (NMC) guidelines."
            }
          ]
        },
        {
          id: "biochemistry",
          title: "Medical Biochemistry",
          tagline: "Metabolism, Clinical Enzymology, Molecular Biology, and Genetics",
          color: "emerald",
          accent: "#059669",
          icon: "fa-flask-vial",
          books: [
            {
              id: "satyanarayana",
              title: "Biochemistry",
              subtitle: "With Clinical Concepts, Case Studies & MCQs",
              author: "U. Satyanarayana, U. Chakrapani",
              edition: "6th Edition",
              category: "Biochemistry",
              year: "1st Year",
              totalPages: 0,
              available: false,
              badge: "Coming Soon",
              description: "Clear pathway flowcharts, clinical case correlations, and metabolic integration for medical students."
            },
            {
              id: "vasudevan",
              title: "Textbook of Biochemistry for Medical Students",
              subtitle: "CBME Curriculum with Clinical Correlations",
              author: "DM Vasudevan, Sreekumari S, Kannan Vaidyanathan",
              edition: "10th Edition",
              category: "Biochemistry",
              year: "1st Year",
              totalPages: 0,
              available: false,
              badge: "Coming Soon",
              description: "Widely recommended textbook focusing on clinical biochemistry, laboratory investigations, and metabolic disorders."
            }
          ]
        }
      ]
    },
    {
      id: "2nd-year",
      title: "2nd Year MBBS",
      badge: "Para-Clinical",
      description: "Pathology, Pharmacology, and Microbiology",
      icon: "fa-microscope",
      subjects: [
        {
          id: "pathology",
          title: "Pathology",
          tagline: "General Pathology, Systemic Pathology, and Hematology",
          color: "purple",
          accent: "#7c3aed",
          icon: "fa-dna",
          books: [
            {
              id: "robbins-basic",
              title: "Robbins & Cotran Pathologic Basis of Disease",
              subtitle: "The Gold Standard in Pathology",
              author: "Vinay Kumar, Abul K. Abbas, Jon C. Aster",
              edition: "10th Edition",
              category: "Pathology",
              year: "2nd Year",
              totalPages: 0,
              available: false,
              badge: "Coming Soon"
            },
            {
              id: "harsh-mohan",
              title: "Textbook of Pathology",
              subtitle: "With Clinical Vignettes & Gross Pathology",
              author: "Harsh Mohan",
              edition: "8th Edition",
              category: "Pathology",
              year: "2nd Year",
              totalPages: 0,
              available: false,
              badge: "Coming Soon"
            }
          ]
        },
        {
          id: "pharmacology",
          title: "Pharmacology",
          tagline: "Mechanism of Action, Pharmacokinetics, Adverse Effects & Clinical Therapeutics",
          color: "amber",
          accent: "#d97706",
          icon: "fa-pills",
          books: [
            {
              id: "kdt",
              title: "Essentials of Medical Pharmacology",
              subtitle: "Pharmacotherapy & Drug Classifications",
              author: "KD Tripathi",
              edition: "8th Edition",
              category: "Pharmacology",
              year: "2nd Year",
              totalPages: 0,
              available: false,
              badge: "Coming Soon"
            }
          ]
        },
        {
          id: "microbiology",
          title: "Microbiology",
          tagline: "Bacteriology, Virology, Mycology, Parasitology, and Immunology",
          color: "teal",
          accent: "#0d9488",
          icon: "fa-bacterium",
          books: [
            {
              id: "apurba-sastry",
              title: "Essentials of Medical Microbiology",
              subtitle: "Infectious Diseases & Clinical Syndromes",
              author: "Apurba S Sastry, Sandhya Bhat",
              edition: "3rd Edition",
              category: "Microbiology",
              year: "2nd Year",
              totalPages: 0,
              available: false,
              badge: "Coming Soon"
            }
          ]
        }
      ]
    },
    {
      id: "3rd-year",
      title: "3rd Year (Part I) MBBS",
      badge: "Clinical Foundations",
      description: "Ophthalmology, ENT, Community Medicine / PSM, Forensic Medicine",
      icon: "fa-eye",
      subjects: [
        {
          id: "ophthalmology",
          title: "Ophthalmology",
          tagline: "Eye Diseases, Optics, Glaucoma, Cataract & Ocular Emergencies",
          color: "cyan",
          accent: "#0891b2",
          icon: "fa-eye",
          books: [
            {
              id: "khurana",
              title: "Comprehensive Ophthalmology",
              subtitle: "Anatomy of Eye, Clinical Examination & Treatment",
              author: "A.K. Khurana",
              edition: "7th Edition",
              category: "Ophthalmology",
              year: "3rd Year",
              totalPages: 0,
              available: false,
              badge: "Coming Soon"
            }
          ]
        },
        {
          id: "ent",
          title: "Otorhinolaryngology (ENT)",
          tagline: "Diseases of Ear, Nose, Throat, Head & Neck Surgery",
          color: "rose",
          accent: "#e11d48",
          icon: "fa-ear-listen",
          books: [
            {
              id: "dhingra",
              title: "Diseases of Ear, Nose and Throat & Head and Neck Surgery",
              subtitle: "Standard Clinical & Operative ENT",
              author: "P.L. Dhingra, Shruti Dhingra",
              edition: "8th Edition",
              category: "ENT",
              year: "3rd Year",
              totalPages: 0,
              available: false,
              badge: "Coming Soon"
            }
          ]
        },
        {
          id: "psm",
          title: "Community Medicine (PSM)",
          tagline: "Epidemiology, Biostatistics, Public Health, and National Health Programs",
          color: "green",
          accent: "#16a34a",
          icon: "fa-users",
          books: [
            {
              id: "park-psm",
              title: "Park's Textbook of Preventive and Social Medicine",
              subtitle: "Epidemiology & Community Health",
              author: "K. Park",
              edition: "26th Edition",
              category: "Community Medicine",
              year: "3rd Year",
              totalPages: 0,
              available: false,
              badge: "Coming Soon"
            }
          ]
        }
      ]
    },
    {
      id: "4th-year",
      title: "Final Year (Part II) MBBS",
      badge: "Clinical Core",
      description: "General Medicine, General Surgery, Obstetrics & Gynaecology, Pediatrics",
      icon: "fa-stethoscope",
      subjects: [
        {
          id: "medicine",
          title: "General Medicine",
          tagline: "Clinical Internal Medicine, Systemic Diseases & Therapeutics",
          color: "indigo",
          accent: "#4f46e5",
          icon: "fa-user-doctor",
          books: [
            {
              id: "davidson",
              title: "Davidson's Principles and Practice of Medicine",
              subtitle: "International Standard for Clinical Medicine",
              author: "Stuart H. Ralston, Ian Penman et al.",
              edition: "24th Edition",
              category: "Medicine",
              year: "Final Year",
              totalPages: 0,
              available: false,
              badge: "Coming Soon"
            }
          ]
        },
        {
          id: "surgery",
          title: "General Surgery",
          tagline: "Operative Surgery, Trauma, Surgical Oncology, and Acute Abdomen",
          color: "pink",
          accent: "#db2777",
          icon: "fa-scissors",
          books: [
            {
              id: "bailey-love",
              title: "Bailey & Love's Short Practice of Surgery",
              subtitle: "Surgical Diagnosis and Operative Principles",
              author: "P. Ronan O'Connell et al.",
              edition: "28th Edition",
              category: "Surgery",
              year: "Final Year",
              totalPages: 0,
              available: false,
              badge: "Coming Soon"
            }
          ]
        },
        {
          id: "obgyn",
          title: "Obstetrics & Gynaecology",
          tagline: "Antenatal Care, Labor, Female Reproductive Pathology",
          color: "fuchsia",
          accent: "#c026d3",
          icon: "fa-person-pregnant",
          books: [
            {
              id: "dc-dutta-obs",
              title: "DC Dutta's Textbook of Obstetrics",
              subtitle: "Including Perinatology and Contraception",
              author: "Hiralal Konar",
              edition: "9th Edition",
              category: "Obstetrics",
              year: "Final Year",
              totalPages: 0,
              available: false,
              badge: "Coming Soon"
            }
          ]
        },
        {
          id: "pediatrics",
          title: "Pediatrics",
          tagline: "Child Health, Neonatology, Growth, Milestones & Immunization",
          color: "orange",
          accent: "#ea580c",
          icon: "fa-baby",
          books: [
            {
              id: "op-ghai",
              title: "Ghai Essential Pediatrics",
              subtitle: "Standard Indian Textbook of Pediatrics",
              author: "Vinod K. Paul, Arvind Bagga",
              edition: "9th Edition",
              category: "Pediatrics",
              year: "Final Year",
              totalPages: 0,
              available: false,
              badge: "Coming Soon"
            }
          ]
        }
      ]
    }
  ]
};
