// MBBS Book Library - Master Catalog
window.MBBS_CATALOG = {
  appName: "MBBS Book Library",
  tagline: "Minimal Medical Textbook Library for MBBS Students",
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
              id: "bdc-general-anatomy",
              title: "BD Chaurasia's Handbook of General Anatomy",
              subtitle: "Anatomical Terminology, Tissues, Bones, Joints & Systems",
              author: "Dr. B.D. Chaurasia (Ed. Dr. Krishna Garg)",
              edition: "4th Edition",
              category: "Anatomy",
              year: "1st Year",
              totalPages: 276,
              basePath: "books/1st-year-mbbs/anatomy/bdc-general-anatomy/",
              cover: "books/1st-year-mbbs/anatomy/bdc-general-anatomy/1.webp",
              filePattern: "{page}.webp",
              available: true,
              description: "Foundational textbook covering medical and anatomical terminology, osteology, arthrology, myology, cardiovascular, lymphatic, and nervous systems, plus skin, fascia, and principles of radiography.",
              chapters: [
                { title: "Front Cover & Prelims", startPage: 1 },
                { title: "Chapter 1: Introduction", startPage: 17 },
                { title: "Chapter 2: Skeleton (Bones)", startPage: 45 },
                { title: "Chapter 3: Joints", startPage: 73 },
                { title: "Chapter 4: Muscles", startPage: 99 },
                { title: "Chapter 5: Cardiovascular System", startPage: 117 },
                { title: "Chapter 6: Lymphatic System", startPage: 139 },
                { title: "Chapter 7: Nervous System", startPage: 153 },
                { title: "Chapter 8: Skin and Fasciae", startPage: 187 },
                { title: "Chapter 9: Connective Tissue, Ligaments & Raphe", startPage: 211 },
                { title: "Chapter 10: Principles of Radiography", startPage: 221 },
                { title: "Word Meanings & Historical Names", startPage: 229 }
              ]
            },
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
            },
            {
              id: "vishram-singh-vol-1",
              title: "Vishram Singh's Textbook of Anatomy - Volume 1",
              subtitle: "Upper Limb & Thorax (Clinically Oriented Gross Anatomy)",
              author: "Prof. Vishram Singh",
              edition: "2nd Edition",
              category: "Anatomy",
              year: "1st Year",
              totalPages: 345,
              basePath: "books/1st-year-mbbs/anatomy/vishram-singh-vol-1/",
              cover: "books/1st-year-mbbs/anatomy/vishram-singh-vol-1/1.webp",
              filePattern: "{page}.webp",
              available: true,
              description: "Renowned Indian clinical textbook featuring clean 4-color schematic illustrations, dissection steps, surface anatomy, and clinical pearls for Upper Limb & Thoracic cavity.",
              chapters: [
                { title: "Front Cover & Prelims", startPage: 1 },
                { title: "Chapter 1: Introduction to Upper Limb", startPage: 17 },
                { title: "Chapter 2: Bones of the Upper Limb", startPage: 26 },
                { title: "Chapter 3: Pectoral Region", startPage: 50 },
                { title: "Chapter 4: Axilla (Armpit)", startPage: 64 },
                { title: "Chapter 5: Back & Scapular Region", startPage: 74 },
                { title: "Chapter 6: Shoulder Joint Complex", startPage: 88 },
                { title: "Chapter 7: Cutaneous Innervation & Drainage", startPage: 99 },
                { title: "Chapter 8: Arm", startPage: 108 },
                { title: "Chapter 9: Forearm", startPage: 121 },
                { title: "Chapter 10: Elbow & Radio-ulnar Joints", startPage: 142 },
                { title: "Chapter 11: Hand", startPage: 153 },
                { title: "Chapter 12: Joints of Hand", startPage: 177 },
                { title: "Chapter 13: Major Nerves of Upper Limb", startPage: 188 },
                { title: "Chapter 14: Introduction to Thorax", startPage: 201 },
                { title: "Chapter 15: Bones & Joints of Thorax", startPage: 212 },
                { title: "Chapter 16: Thoracic Wall & Respiration", startPage: 227 },
                { title: "Chapter 17: Pleural Cavities", startPage: 243 },
                { title: "Chapter 18: Lungs (Pulmones)", startPage: 250 },
                { title: "Chapter 19: Mediastinum", startPage: 265 },
                { title: "Chapter 20: Pericardium & Heart", startPage: 272 },
                { title: "Chapter 21: SVC, Aorta, Pulmonary Trunk", startPage: 299 },
                { title: "Chapter 22: Trachea & Esophagus", startPage: 308 },
                { title: "Chapter 23: Thoracic Duct & Azygos System", startPage: 318 },
                { title: "Multiple Choice Questions & Index", startPage: 327 }
              ]
            },
            {
              id: "vishram-singh-vol-2",
              title: "Vishram Singh's Textbook of Anatomy - Volume 2",
              subtitle: "Abdomen & Lower Limb (Clinically Oriented Gross Anatomy)",
              author: "Prof. Vishram Singh",
              edition: "2nd Edition",
              category: "Anatomy",
              year: "1st Year",
              totalPages: 521,
              basePath: "books/1st-year-mbbs/anatomy/vishram-singh-vol-2/",
              cover: "books/1st-year-mbbs/anatomy/vishram-singh-vol-2/1.webp",
              filePattern: "{page}.webp",
              available: true,
              description: "Clear clinical anatomy of Anterior Abdominal Wall, Peritoneum, Gastrointestinal Viscera, Kidneys, Pelvis, Perineum, and complete Lower Limb osteology, joints, and neurovascular pathways.",
              chapters: [
                { title: "Front Cover & Prelims", startPage: 1 },
                { title: "Chapter 1: Overview of Abdomen", startPage: 17 },
                { title: "Chapter 2: Osteology of Abdomen", startPage: 26 },
                { title: "Chapter 3: Anterior Abdominal Wall", startPage: 40 },
                { title: "Chapter 4: Inguinal Region / Groin", startPage: 62 },
                { title: "Chapter 5: Male External Genitalia", startPage: 75 },
                { title: "Chapter 6: Abdominal Cavity & Peritoneum", startPage: 90 },
                { title: "Chapter 7: Stomach & Spleen", startPage: 109 },
                { title: "Chapter 8: Liver & Biliary System", startPage: 125 },
                { title: "Chapter 9: Duodenum & Pancreas", startPage: 142 },
                { title: "Chapter 10: Intestines", startPage: 160 },
                { title: "Chapter 11: Kidneys & Ureters", startPage: 181 },
                { title: "Chapter 12: Posterior Abdominal Wall", startPage: 201 },
                { title: "Chapter 13-15: Pelvis & Perineum", startPage: 218 },
                { title: "Chapter 16-19: Pelvic Viscera & Rectum", startPage: 254 },
                { title: "Chapter 20: Lower Limb Overview", startPage: 307 },
                { title: "Chapter 21: Bones of Lower Limb", startPage: 315 },
                { title: "Chapter 22-24: Thigh & Gluteal Region", startPage: 344 },
                { title: "Chapter 25-26: Popliteal Fossa & Hip Joint", startPage: 380 },
                { title: "Chapter 27-30: Leg & Foot", startPage: 402 },
                { title: "Chapter 31-34: Arches, Joints & Nerves", startPage: 448 },
                { title: "Multiple Choice Questions & Index", startPage: 495 }
              ]
            },
            {
              id: "vishram-singh-vol-3",
              title: "Vishram Singh's Textbook of Anatomy - Volume 3",
              subtitle: "Head, Neck & Brain (Clinically Oriented Gross Anatomy & Neuroanatomy)",
              author: "Prof. Vishram Singh",
              edition: "2nd Edition",
              category: "Anatomy",
              year: "1st Year",
              totalPages: 460,
              basePath: "books/1st-year-mbbs/anatomy/vishram-singh-vol-3/",
              cover: "books/1st-year-mbbs/anatomy/vishram-singh-vol-3/1.webp",
              filePattern: "{page}.webp",
              available: true,
              description: "Complete regional anatomy of Head & Neck (Cranial Cavity, Nerves, Triangles, Pharynx, Larynx, Orbit) and essentials of Neuroanatomy (Spinal Cord, Brainstem, Cerebellum, Cerebrum).",
              chapters: [
                { title: "Front Cover & Prelims", startPage: 1 },
                { title: "Chapter 1: Living Anatomy of Head & Neck", startPage: 18 },
                { title: "Chapter 2: Osteology of Head & Neck", startPage: 29 },
                { title: "Chapter 3: Scalp, Temple & Face", startPage: 63 },
                { title: "Chapter 4-7: Neck Regions & Triangles", startPage: 85 },
                { title: "Chapter 8-9: Parotid & Submandibular", startPage: 128 },
                { title: "Chapter 10: Infratemporal & TM Joint", startPage: 150 },
                { title: "Chapter 11-12: Thyroid & Root of Neck", startPage: 173 },
                { title: "Chapter 13-15: Oral Cavity, Pharynx & Larynx", startPage: 197 },
                { title: "Chapter 16: Blood Supply & Drainage", startPage: 248 },
                { title: "Chapter 17-18: Nose, Sinuses & Ear", startPage: 268 },
                { title: "Chapter 19: Orbit & Eyeball", startPage: 299 },
                { title: "Chapter 20-21: Vertebral & Cranial Cavity", startPage: 319 },
                { title: "Chapter 22: Cranial Nerves", startPage: 350 },
                { title: "Chapter 23-25: Brainstem & Cerebellum", startPage: 370 },
                { title: "Chapter 26-29: Diencephalon, Cerebrum & Blood Supply", startPage: 399 },
                { title: "Multiple Choice Questions & Index", startPage: 430 }
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
