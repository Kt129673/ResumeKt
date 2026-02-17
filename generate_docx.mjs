import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, TabStopType, TabStopPosition,
  AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType,
  ImageRun, ExternalHyperlink, TableBorders, convertInchesToTwip
} from "docx";
import fs from "fs";

// ── Color palette (matching LaTeX) ──
const DARK_RED = "450808";
const PASTEL_RED = "8F0D0D";
const SLATE_GREY = "2E2E2E";
const LIGHT_GREY = "666666";
const GOLDEN = "E7D192";

// ── Helpers ──
const bold = (text, opts = {}) => new TextRun({ text, bold: true, font: "Calibri", size: 20, color: SLATE_GREY, ...opts });
const normal = (text, opts = {}) => new TextRun({ text, font: "Calibri", size: 20, color: LIGHT_GREY, ...opts });
const accent = (text, opts = {}) => new TextRun({ text, bold: true, font: "Calibri", size: 20, color: PASTEL_RED, ...opts });

function sectionHeading(title) {
  return [
    new Paragraph({
      children: [new TextRun({ text: title.toUpperCase(), bold: true, font: "Cambria", size: 26, color: DARK_RED })],
      spacing: { before: 200, after: 60 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLDEN, space: 4 } },
    }),
  ];
}

function subSectionHeading(title) {
  return new Paragraph({
    children: [new TextRun({ text: title, bold: true, font: "Calibri", size: 22, color: PASTEL_RED })],
    spacing: { before: 120, after: 40 },
  });
}

function bulletItem(children) {
  return new Paragraph({
    children,
    bullet: { level: 0 },
    spacing: { before: 20, after: 20 },
  });
}

function divider() {
  return new Paragraph({
    children: [new TextRun({ text: "" })],
    border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 4 } },
    spacing: { before: 60, after: 60 },
  });
}

function eventHeading(title, company, date, location) {
  const children = [accent(title, { size: 22 })];
  if (company) children.push(normal("  |  " + company, { size: 20 }));
  if (date) children.push(normal("  |  " + date, { size: 20, italics: true }));
  if (location) children.push(normal("  |  " + location, { size: 20, italics: true }));
  return new Paragraph({ children, spacing: { before: 100, after: 40 } });
}

function achievementItem(title, desc) {
  return new Paragraph({
    children: [accent("★ " + title + "  "), normal(desc)],
    spacing: { before: 40, after: 40 },
  });
}

function tagsParagraph(tags) {
  const children = [];
  tags.forEach((tag, i) => {
    children.push(new TextRun({
      text: ` ${tag} `,
      font: "Calibri", size: 18, color: DARK_RED,
      border: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 },
    }));
    if (i < tags.length - 1) children.push(normal("  ", { size: 18 }));
  });
  return new Paragraph({ children, spacing: { before: 40, after: 40 } });
}

// ── Build Document ──

// ===== LEFT COLUMN CONTENT (as sequential sections) =====
const leftContent = [];

// --- Header ---
const headerParagraphs = [
  new Paragraph({
    children: [new TextRun({ text: "Kiran Tilekar", bold: true, font: "Cambria", size: 44, color: "000000" })],
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [
      new TextRun({
        text: "Senior Java Developer | Spring Boot 3.x | Monolithic Architecture",
        font: "Calibri", size: 20, color: PASTEL_RED, italics: true,
      }),
      new TextRun({
        text: "99.9% Uptime | Rs.156Cr+ Systems | 3.3+ Yrs | Immediate Joiner",
        font: "Calibri", size: 20, color: PASTEL_RED, italics: true,
        break: 1,
      })
    ],
    spacing: { after: 40 },
  }),
  new Paragraph({
    children: [
      normal("✉ kirantilekar@icloud.com   |   📞 +91-9834882015   |   📍 Pune, India", { size: 18 }),
    ],
    spacing: { after: 10 },
  }),
  new Paragraph({
    children: [
      normal("🔗 linkedin.com/in/kiran-tilekar-94173382   |   💻 github.com/Kt129673", { size: 18 }),
    ],
    spacing: { after: 80 },
  }),
];

// --- Professional Summary ---
const summarySection = [
  ...sectionHeading("Professional Summary"),
  new Paragraph({
    children: [
      bold("Senior Java and Backend Developer"), normal(" with "), bold("3.3+ years"),
      normal(" delivering mission-critical "), bold("monolithic applications"),
      normal(" using "), bold("Spring Boot 3.x"), normal(", processing "),
      bold("Rs.156Cr+"), normal(" government transactions at "), bold("99.9% uptime"),
      normal(" (50K+ txns/month, sub-200ms latency). Expert in "),
      bold("modular monolithic architecture"), normal(" with clean "),
      bold("layered design"), normal(" (Controller-Service-Repository pattern), "),
      bold("Hibernate ORM"), normal(", "), bold("Redis caching"),
      normal(", and "), bold("database optimization"),
      normal(" outperforming microservices complexity. Monolithic systems designed with "),
      bold("modular boundaries"), normal(" for future microservices migration. Cloud deployment experience ("),
      bold("AWS, DigitalOcean"), normal("), "),
      bold("CI/CD pipelines"), normal(", and "), bold("IoT systems"),
      normal(" (10K+ data points/min). Productive in modern workflows using "),
      bold("Git"), normal(", "), bold("GitHub"), normal(", and "),
      bold("AI-assisted coding (GitHub Copilot)"), normal(" to accelerate delivery. Known for "),
      bold("zero-downtime deployments"), normal(" and "), bold("100% data integrity"), normal("."),
    ],
    spacing: { before: 40, after: 80 },
  }),
];

// --- Experience ---
const experienceSection = [
  ...sectionHeading("Experience"),
  eventHeading("Senior Software Developer", "AVICS", "Nov 2022 – 31 Jan 2026", "Pune, India"),
  bulletItem([bold("Architected enterprise-grade monolithic applications"), normal(" using Spring Boot 3.x with layered architecture (Controller-Service-Repository), processing 50K+ txns/month at "), bold("99.9% SLA")]),
  bulletItem([normal("Designed RESTful APIs with "), bold("Hibernate ORM + Redis/Caffeine caching"), normal(", achieving sub-200ms latency vs microservices overhead")]),
  bulletItem([normal("Implemented monolithic scalability patterns — JVM tuning, HikariCP connection pooling, advanced indexing — "), bold("60% faster queries")]),
  bulletItem([bold("Added security features"), normal(" using Spring Security, JWT/OAuth2, protecting "), bold("Rs.500+ Cr"), normal(" in transactions")]),
  bulletItem([bold("Automated government reports"), normal(" with JasperReports, creating "), bold("20+ reports"), normal(" and saving "), bold("30+ hrs/week")]),
  bulletItem([bold("Set up caching system"), normal(" using Redis + Caffeine, reducing database load by "), bold("40%")]),
  bulletItem([bold("Led team of 5 developers"), normal(", reviewed 100+ code changes, and trained "), bold("3 junior developers"), normal(" to mid-level")]),
  bulletItem([bold("Remote Work Excellence: "), normal("Successfully delivered high-quality code and collaborated with cross-functional teams in a "), bold("100% remote environment"), normal(".")]),
  bulletItem([bold("Agile Leadership: "), normal("Managed "), bold("Sprint workflows"), normal(" and documentation using "), bold("Jira & Confluence"), normal(", ensuring "), bold("on-time delivery"), normal(" of features.")]),
  divider(),
  eventHeading("Quality Assurance Engineer", "Schneider Electric", "Feb 2018 – Nov 2021", "Ahmednagar, India"),
  bulletItem([bold("Led quality testing"), normal(" for Medium Voltage systems, achieving "), bold("95%+ first-time pass rate")]),
  bulletItem([bold("Created problem-solving process"), normal(" using 8D method, reducing product failures by "), bold("30%")]),
  bulletItem([bold("Worked with R&D teams"), normal(" on design improvements, helping achieve "), bold("3 product certifications")]),
];

// --- Key Projects ---
const projectsSection = [
  ...sectionHeading("Key Projects"),

  // ZP Work Management
  eventHeading("ZP Work Management & Financial System", "", "Feb 2023 – 31 Jan 2026", ""),
  bulletItem([bold("Monolithic enterprise platform"), normal(" for Maharashtra Zilla Parishads tracking "), bold("Rs.156Cr+ yearly income"), normal(" across "), bold("15 departments"), normal(" — single JAR deployment")]),
  bulletItem([normal("Created "), bold("live budget dashboard"), normal(" showing spending details (Rs.25+ Cr/year) and usage reports")]),
  bulletItem([normal("Built approval system with multiple levels, digital signatures, and automatic activity logging")]),
  bulletItem([normal("Generated "), bold("20+ statutory government reports"), normal(" automatically using JasperReports, saving "), bold("30+ hours/week")]),
  bulletItem([normal("Optimized complex SQL queries with indexing and caching, reducing report generation time by "), bold("60%")]),
  bulletItem([normal("Added system monitoring with Prometheus + Grafana, budget planning, and document storage on AWS S3")]),
  bulletItem([normal("Created fund distribution module with automatic budget mapping and expense tracking")]),
  bulletItem([bold("Tech: "), normal("Spring Boot, Spring Security, Angular 14, MySQL, JasperReports, Prometheus, Grafana, AWS")]),
  divider(),

  // Government Cashbook
  eventHeading("Government Cashbook Application", "", "2023 – Dec 2024", ""),
  bulletItem([bold("Scalable monolithic architecture"), normal(" — digital cashbook managing "), bold("Rs.100+ Cr"), normal(" daily with proper accounting")]),
  bulletItem([normal("Connected with banks for live updates, cheque tracking, and receipt generation")]),
  bulletItem([normal("Built dashboard for multiple departments showing live cash status; supports "), bold("200+ users at once")]),
  bulletItem([normal("Added automatic daily matching of records with "), bold("100% accuracy"), normal(" and full activity history")]),
  bulletItem([normal("Created payment approval system with multiple levels and digital signature support")]),
  bulletItem([normal("Built month-end closing with automatic balance transfer to next month/year")]),
  bulletItem([bold("Tech: "), normal("Spring Boot, Spring Security, Angular 14, MySQL, JasperReports, AWS (EC2, RDS)")]),
  divider(),

  // IoT Platform
  eventHeading("IoT Data Collection Platform", "", "2024 – 31 Jan 2026", ""),
  bulletItem([bold("Monolithic 3-tier architecture"), normal(" — IoT platform collecting "), bold("10K+ readings/min"), normal(" from "), bold("50+ factory machines")]),
  bulletItem([normal("Used multiple databases (PostgreSQL + InfluxDB) with smart caching — "), bold("70% fewer database calls")]),
  bulletItem([normal("Created live alerts, device health checks, and connectors for industrial protocols with backup system")]),
  bulletItem([normal("Set up data cleanup rules saving "), bold("50% storage costs"), normal("; built Windows installer for easy setup")]),
  bulletItem([normal("Developed data summarization tool for analyzing historical trends")]),
  bulletItem([normal("Built automatic device detection and remote configuration management")]),
  bulletItem([bold("Tech: "), normal("Spring Boot 3.4, Java 17, InfluxDB, PostgreSQL, MQTT, DigitalOcean")]),
  divider(),

  // Online Examination Portal
  eventHeading("Online Examination Portal", "", "Jun 2024 – 31 Jan 2026", ""),
  bulletItem([normal("Built exam platform supporting "), bold("1000+ students at once"), normal(" with live sync and cheating prevention")]),
  bulletItem([normal("Created question bank with "), bold("10,000+ questions"), normal(", auto-grading, monitoring, and result reports")]),
  bulletItem([normal("Developed exam scheduling with time slots, bulk student upload, and email login details")]),
  bulletItem([normal("Added live exam monitoring with student tracking and instant notifications")]),
  bulletItem([normal("Built results dashboard showing pass/fail trends and subject-wise performance")]),
  bulletItem([normal("Created random question order system giving each student a unique paper")]),
  bulletItem([normal("Built certificate generation with QR code verification and result publishing")]),
  bulletItem([bold("Tech: "), normal("Spring Boot, Angular 16, MySQL, WebSocket, JWT, Redis, AWS EC2")]),
  divider(),

  // Ground Booking
  eventHeading("Ground Booking Management System", "", "Aug 2024 – Jan 2025", ""),
  bulletItem([normal("Sports booking system for "), bold("20+ grounds"), normal(" earning "), bold("Rs.10+ Lakhs/month"), normal(" with flexible pricing")]),
  bulletItem([normal("Multiple payment options (Cash, UPI, Razorpay), membership system, and "), bold("10+ financial reports")]),
  bulletItem([normal("Built slot booking with overlap detection, repeat bookings, and auto reminders")]),
  bulletItem([normal("Added loyalty program with discount levels and promotional offers")]),
  bulletItem([normal("Created pricing system for peak/off-peak hours with holiday and seasonal rates")]),
  bulletItem([normal("Built tournament module with bracket creation and team registration")]),
  bulletItem([bold("Tech: "), normal("Spring Boot, Angular 14, MySQL, JasperReports, DigitalOcean")]),
  divider(),

  // ITI Inventory
  eventHeading("ITI Inventory Management System", "", "2022 – 2024", ""),
  bulletItem([normal("Full system tracking "), bold("5000+ items"), normal(" for "), bold("200+ users"), normal("; Excel upload reduced data entry by "), bold("80%")]),
  bulletItem([normal("Built user permission system, value depreciation, barcode/QR scanning, and "), bold("15+ reports")]),
  bulletItem([normal("Added supplier management, low-stock warnings, and complete history with undo option")]),
  bulletItem([normal("Created multi-location tracking with transfer between branches and stock matching")]),
  bulletItem([normal("Built asset lifecycle tracking with maintenance reminders and warranty management")]),
  bulletItem([normal("Built dashboard with real-time stock levels and department-wise inventory reports")]),
  bulletItem([normal("Created audit trail system for all inventory changes with user tracking")]),
  bulletItem([bold("Tech: "), normal("Spring Boot 2.5, Spring Security, MySQL, Thymeleaf, Apache POI, DigitalOcean")]),
];

// --- Right column content (Key Highlights, Technical Skills, Education, etc.) ---

const keyHighlightsSection = [
  ...sectionHeading("Key Highlights"),
  achievementItem("3.3+ Years Enterprise Java", "Monolithic | Spring Boot | Cloud Deployment"),
  achievementItem("50K+ Txns/Month @ 99.9%", "Sub-200ms Latency | Zero Downtime"),
  achievementItem("Rs.156Cr+ Gov Systems", "Real-Time Budget Tracking | 100% Data Integrity"),
  achievementItem("IoT & Industrial Systems", "10K+ Data Points/Min | Real-Time Analytics"),
];

const technicalSkillsSection = [
  ...sectionHeading("Technical Skills"),

  subSectionHeading("Architecture"),
  tagsParagraph(["Monolithic Architecture", "Modular Monolith", "Layered Architecture", "Microservices-ready (modular monolith)", "3-Tier Design"]),

  subSectionHeading("Backend & Frameworks"),
  tagsParagraph(["Core Java (8/11/17)", "Spring Boot 2.x/3.x", "Spring MVC", "Spring Security", "Spring Data JPA", "Spring Batch", "Hibernate ORM", "RESTful APIs", "WebSocket"]),

  subSectionHeading("Frontend"),
  tagsParagraph(["Angular", "TypeScript", "HTML5/CSS3", "Bootstrap", "Thymeleaf"]),

  subSectionHeading("Databases & Caching"),
  tagsParagraph(["MySQL 8.x", "PostgreSQL", "Redis", "Caffeine Cache", "HikariCP", "Query Optimization"]),

  subSectionHeading("DevOps & Cloud"),
  tagsParagraph(["AWS (EC2, S3, RDS)", "DigitalOcean", "Linux Server", "Docker", "Jenkins", "Git/GitHub", "CI/CD", "Tomcat", "SSH/PuTTY", "FileZilla/FTP"]),

  subSectionHeading("Tools & Libraries"),
  tagsParagraph(["Maven", "Gradle", "JasperReports", "Apache POI", "Swagger/OpenAPI", "Postman", "IntelliJ IDEA", "GitHub Copilot", "Jira", "Confluence", "Prometheus", "Grafana"]),

  subSectionHeading("Security & Testing"),
  tagsParagraph(["JWT", "OAuth2", "RBAC", "JUnit 5", "Mockito", "SonarQube"]),

  subSectionHeading("IoT & Industrial"),
  tagsParagraph(["MQTT", "InfluxDB 2.x", "Modbus TCP", "Eclipse Paho", "Jamod Library", "NSIS Installer", "Time-Series DB"]),

  subSectionHeading("Integrations"),
  tagsParagraph(["Razorpay", "SMS Gateway", "Email SMTP", "Barcode/QR Code"]),
];

const educationSection = [
  ...sectionHeading("Education"),
  eventHeading("B.E. Electrical Engineering", "Sinhgad College of Engineering", "2012 – 2016", "Pune, India"),
  bulletItem([normal("Focus: Power Systems & Industrial Automation")]),
  bulletItem([normal("Relevant Coursework: Control Systems, Microprocessors, Industrial Electronics")]),
  divider(),
  eventHeading("Java Full Stack Developer", "Seed Infotech Pvt Ltd", "Certified", ""),
  bulletItem([normal("Comprehensive training in Java, Spring Boot, Angular, and enterprise application development")]),
];

const achievementsSection = [
  ...sectionHeading("Achievements"),
  achievementItem("Zero Data Loss Record", "100% integrity across Rs.500+ Cr | 2+ years"),
  achievementItem("30+ Hours/Week Saved", "Automated 20+ reports | Eliminated manual processing"),
  achievementItem("3 Developers Promoted", "Mentored juniors to mid-level | Spring Boot mastery"),
];

const coreStrengthsSection = [
  ...sectionHeading("Core Strengths"),
  tagsParagraph(["System Design", "Monolithic Architecture", "Technical Leadership", "Agile/Scrum Master", "Performance Engineering", "Code Quality Champion", "Cross-Functional Collaboration", "Stakeholder Management", "DevOps Practices", "Continuous Improvement"]),
];

const languagesSection = [
  ...sectionHeading("Languages"),
  tagsParagraph(["English (Professional)", "Hindi (Native)", "Marathi (Native)"]),
];

// ===== Assemble Document =====
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "Calibri", size: 20, color: LIGHT_GREY },
      },
      listParagraph: {
        run: { font: "Calibri", size: 20 },
      },
    },
  },
  numbering: {
    config: [{
      reference: "bullet-list",
      levels: [{
        level: 0,
        format: "bullet",
        text: "•",
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: convertInchesToTwip(0.3), hanging: convertInchesToTwip(0.15) } } },
      }],
    }],
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 500, bottom: 500, left: 600, right: 600 },
      },
    },
    children: [
      ...headerParagraphs,
      ...summarySection,
      ...experienceSection,
      ...projectsSection,
      ...keyHighlightsSection,
      ...technicalSkillsSection,
      ...educationSection,
      ...achievementsSection,
      ...coreStrengthsSection,
      ...languagesSection,
    ],
  }],
});

// Generate .docx file
const buffer = await Packer.toBuffer(doc);
const outPath = "output/KiranTilekar_SpringBoot_3.3Yrs.docx";
fs.writeFileSync(outPath, buffer);
console.log(`✅ DOCX generated: ${outPath}`);
