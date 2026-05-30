// KALINITECH SYSTEMS - Central Data Configuration
// Company identity, services catalog, product data, WhatsApp integration
// Color Theme: Turquoise Blue (#00B4D8) + Navy Blue (#0A1128) + White (#FFFFFF)

export const company = {
  name: "KALINITECH SYSTEMS",
  tagline: "Built to Hack the Future",
  founder: "JARED ANDIKA",
  role: "CEO & Founder | Lead Developer & Expert",
  whatsappNumber: "254790493120",
  email: "kalinimedia001@gmail.com",
  location: "Kenya & East Africa",
  currency: "KES",
  description:
    "KALINITECH SYSTEMS is a comprehensive technology enterprise specializing in premium laptop distribution, software development, cybersecurity, business automation, digital marketing, and professional training across Kenya and East Africa.",
  mission:
    "To democratize access to premium technology by providing affordable, reliable, and professionally-maintained solutions to businesses and individuals, enabling productivity, innovation, and digital transformation.",
  vision:
    "To become East Africa's leading trusted technology retailer and services provider, recognized for exceptional customer experiences, product quality, competitive pricing, and commitment to technological advancement.",
  values: [
    "Quality & Reliability",
    "Customer-Centric Service",
    "Innovation",
    "Transparency",
    "Accessibility",
    "Integrity",
  ],
};

export interface ServiceItem {
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
}

export const serviceCatalog: ServiceItem[] = [
  {
    title: "Software Development",
    slug: "software-development",
    description: "Custom software solutions built by our expert development team. From web applications and mobile apps to enterprise systems and API integrations, we deliver production-ready code using modern frameworks and best practices.",
    icon: "Code",
    features: ["Web & Mobile App Development", "API Design & Integration", "Enterprise Software Solutions", "UI/UX Design & Prototyping", "Cloud-Native Development", "Technical Consulting"],
  },
  {
    title: "Cybersecurity Services",
    slug: "cybersecurity",
    description: "Protect your digital assets with our comprehensive cybersecurity solutions. Our security experts provide vulnerability assessments, penetration testing, security audits, and incident response to safeguard your organization.",
    icon: "Shield",
    features: ["Vulnerability Assessment & Penetration Testing", "Security Audits & Compliance", "Network Security Monitoring", "Incident Response & Recovery", "Security Awareness Training", "Data Protection & Encryption"],
  },
  {
    title: "E-Commerce & Laptop Sales",
    slug: "ecommerce-laptops",
    description: "Premium refurbished and brand-new laptops from world-leading manufacturers including Apple, HP, Dell, Lenovo, and more. Competitive pricing in KES with nationwide delivery, warranty, and professional after-sales support.",
    icon: "Laptop",
    features: ["150+ Laptop Models Across 8 Brands", "Brand New & Refurbished Options", "Nationwide Delivery", "Warranty & After-Sales Support", "Bulk/Wholesale Pricing", "M-Pesa & Multiple Payment Methods"],
  },
  {
    title: "Business Software & Automation",
    slug: "business-automation",
    description: "Streamline your operations with custom business software and automation tools. From inventory management and CRM systems to workflow automation and reporting dashboards, we build solutions that boost productivity.",
    icon: "Zap",
    features: ["Custom CRM & ERP Solutions", "Workflow Automation Tools", "Inventory Management Systems", "Reporting & Analytics Dashboards", "Social Media Marketing Automation", "Process Optimization Consulting"],
  },
  {
    title: "Freelancing & Technical Tasks",
    slug: "freelancing",
    description: "Access our team of skilled professionals for project-based technical work. Whether you need a quick script, a design mockup, data analysis, or a complex integration, our freelancing team delivers quality results on time.",
    icon: "Briefcase",
    features: ["Project-Based Technical Delivery", "Scripting & Automation Tasks", "Data Analysis & Visualization", "Design & Multimedia Work", "System Administration", "On-Demand Technical Support"],
  },
  {
    title: "KALINITECH Academy",
    slug: "academy",
    description: "Professional technology training programs designed by industry experts. Our academy offers hands-on courses in software development, cybersecurity, data science, cloud computing, and digital skills.",
    icon: "GraduationCap",
    features: ["Software Development Bootcamps", "Cybersecurity Certification Prep", "Data Science & Analytics Courses", "Cloud Computing Training", "Digital Skills Workshops", "Mentorship & Career Guidance"],
  },
  {
    title: "Charity & Foundation",
    slug: "charity-foundation",
    description: "Giving back to society through technology-driven community initiatives. Our foundation focuses on digital literacy programs, tech donations to underserved communities, STEM education, and bridging the digital divide.",
    icon: "Heart",
    features: ["Digital Literacy Programs", "Tech Donations to Communities", "STEM Education Support", "Youth Empowerment Initiatives", "Community Tech Workshops", "Bridging the Digital Divide"],
  },
  {
    title: "Digital Marketing & Lead Generation",
    slug: "digital-marketing",
    description: "Data-driven digital marketing strategies that generate qualified leads and drive business growth. From social media campaigns and SEO optimization to content marketing and WhatsApp lead conversion.",
    icon: "TrendingUp",
    features: ["Social Media Marketing", "SEO & Content Optimization", "WhatsApp Lead Generation", "Email Marketing Campaigns", "Analytics & Performance Tracking", "Brand Strategy & Positioning"],
  },
  {
    title: "Networking & Wi-Fi Solutions",
    slug: "networking-wifi",
    description: "Reliable networking infrastructure and high-speed Wi-Fi connectivity solutions for businesses, institutions, and residential setups. Our certified technicians handle design, installation, monitoring, and maintenance.",
    icon: "Wifi",
    features: ["Network Design & Installation", "Enterprise Wi-Fi Deployment", "Network Security & Monitoring", "Fiber & Broadband Solutions", "VPN & Remote Access Setup", "24/7 Network Support"],
  },
  {
    title: "Blog & Tech News",
    slug: "blog-tech-news",
    description: "Stay ahead with the latest technology insights, product reviews, industry trends, and exclusive deals from KALINITECH SYSTEMS. Expert analysis, buying guides, and company updates to keep you informed.",
    icon: "Newspaper",
    features: ["Technology News & Analysis", "Product Reviews & Comparisons", "Buying Guides & Tips", "Exclusive Deals & Offers", "Company Updates & Announcements", "Industry Trend Reports"],
  },
];

export interface ProductItem {
  name: string;
  brand: string;
  category: string;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  price: number;
  condition: string;
  features: string;
  offer: string;
  image: string;
}

// Product image mapping based on uploaded files
const img = (brand: string, filename: string) => `/images/${brand.toLowerCase()}/${filename}`;

export const featuredProducts: ProductItem[] = [
  { name: "HP EliteBook 840 G7", brand: "HP", category: "EliteBook", processor: "Intel Core i5 (10th Gen)", ram: "16GB", storage: "256GB SSD", display: '14"', price: 39000, condition: "Refurbished", features: "Touch Screen, Wi-Fi 6, Fingerprint", offer: "Business Series Deal", image: img("hp", "elitebook-840-g7.jpg") },
  { name: "MacBook Pro A1708", brand: "Apple", category: "MacBook Pro", processor: "Intel Core i7 (7th Gen)", ram: "16GB", storage: "512GB SSD", display: '13.3" Retina', price: 75000, condition: "Refurbished", features: "Retina Display, Touch Bar, Thunderbolt 3", offer: "Retina Performance Offer", image: img("apple", "macbook-pro-a1708.jpg") },
  { name: "Lenovo ThinkPad X1 Yoga 7th Gen", brand: "Lenovo", category: "ThinkPad X1", processor: "Intel Core i7", ram: "16GB", storage: "512GB SSD", display: '14" Touch', price: 46000, condition: "Refurbished", features: "X360 Convertible, Touch Screen, Pen Support", offer: "Convertible Pro Offer", image: img("lenovo", "thinkpad-x1-yoga-7th-gen.jpg") },
  { name: "Dell Latitude 3420", brand: "Dell", category: "Latitude", processor: "Intel Core i5 (11th Gen)", ram: "16GB", storage: "256GB SSD", display: '14"', price: 38000, condition: "Refurbished", features: "Latest Gen, Business Grade", offer: "Enterprise Bundle", image: img("dell", "latitude-3420.jpg") },
  { name: "HP ZBook 15 G6 RTX 3000", brand: "HP", category: "ZBook", processor: "Intel Core i7 (9th Gen)", ram: "32GB", storage: "512GB SSD", display: '15.6"', price: 95000, condition: "Refurbished", features: "Nvidia RTX 3000 6GB, Workstation", offer: "Creative Pro Workstation Deal", image: img("hp", "zbook-15-g6-rtx-3000.jpg") },
  { name: "MacBook Pro A2141", brand: "Apple", category: "MacBook Pro", processor: "Intel Core i7 (9th Gen)", ram: "16GB", storage: "512GB SSD", display: '16" Retina', price: 160000, condition: "Refurbished", features: "AMD Radeon Pro 5300M, Flagship", offer: "Ultimate Pro Machine", image: img("apple", "macbook-pro-a2141.jpg") },
  { name: "HP Elite Dragonfly X360", brand: "HP", category: "Elite Dragonfly", processor: "Intel Core i7 (11th Gen)", ram: "16GB", storage: "512GB SSD", display: '13.3" Touch', price: 78000, condition: "Refurbished", features: "Ultra-Premium Convertible, Touch", offer: "Executive Convertible Offer", image: img("hp", "elite-dragonfly-x360.jpg") },
  { name: "Microsoft Surface 3 (1872)", brand: "Microsoft", category: "Surface", processor: "Intel Core i5 (10th Gen)", ram: "8GB", storage: "256GB SSD", display: '15.6" Touch', price: 63000, condition: "Refurbished", features: "Premium 2-in-1, Touch Screen", offer: "Surface Premium Deal", image: img("microsoft", "surface-3-model-1872.jpg") },
];

export const allProducts: ProductItem[] = [
  // Apple MacBooks
  { name: "MacBook Air A1466 (Budget)", brand: "Apple", category: "MacBook Air", processor: "Intel Core i5 (7th Gen)", ram: "4GB", storage: "256GB SSD", display: '13.3"', price: 38000, condition: "Refurbished", features: "Classic lightweight portable", offer: "Budget MacBook Entry", image: img("apple", "macbook-air-a1466-budget.jpg") },
  { name: "MacBook Air A1466", brand: "Apple", category: "MacBook Air", processor: "Intel Core i5 (7th Gen)", ram: "8GB", storage: "256GB SSD", display: '13.3"', price: 70000, condition: "Refurbished", features: "Excellent for everyday professionals", offer: "Air Professional Deal", image: img("apple", "macbook-air-a1466.jpg") },
  { name: "MacBook Pro A1706 v2", brand: "Apple", category: "MacBook Pro", processor: "Intel Core i5 (6th Gen)", ram: "8GB", storage: "256GB SSD", display: '13.3" Retina', price: 49000, condition: "Refurbished", features: "Slim profile, Touch Bar", offer: "Touch Bar Deal", image: img("apple", "macbook-pro-a1706-v2.jpg") },
  { name: "MacBook Pro A1706 v1", brand: "Apple", category: "MacBook Pro", processor: "Intel Core i5 (7th Gen)", ram: "16GB", storage: "256GB SSD", display: '13.3" Retina', price: 60000, condition: "Refurbished", features: "Touch Bar, Enhanced Performance", offer: "Pro Performance Deal", image: img("apple", "macbook-pro-a1706.jpg") },
  { name: "MacBook Pro A1706 v3", brand: "Apple", category: "MacBook Pro", processor: "Intel Core i7 (7th Gen)", ram: "16GB", storage: "256GB SSD", display: '13.3" Retina', price: 68000, condition: "Refurbished", features: "Exceptional processing power", offer: "i7 Power Deal", image: img("apple", "macbook-pro-a1706-v3.jpg") },
  { name: "MacBook Pro A1708", brand: "Apple", category: "MacBook Pro", processor: "Intel Core i7 (7th Gen)", ram: "16GB", storage: "512GB SSD", display: '13.3" Retina', price: 75000, condition: "Refurbished", features: "Dual Thunderbolt 3", offer: "Retina Performance Offer", image: img("apple", "macbook-pro-a1708.jpg") },
  { name: "MacBook A1708 (256GB) Boxed", brand: "Apple", category: "MacBook Pro", processor: "Intel Core i5 (7th Gen)", ram: "8GB", storage: "256GB SSD", display: '13.3" Retina', price: 85000, condition: "Brand New", features: "Brand new sealed unit", offer: "New Sealed MacBook", image: img("apple", "macbook-a1708-boxed-256gb.jpg") },
  { name: "MacBook A1708 (512GB) Boxed", brand: "Apple", category: "MacBook Pro", processor: "Intel Core i5 (7th Gen)", ram: "8GB", storage: "512GB SSD", display: '13.3" Retina', price: 90000, condition: "Brand New", features: "Brand new sealed unit", offer: "New Sealed Max Storage", image: img("apple", "macbook-a1708-boxed-512gb.jpg") },
  { name: "MacBook Pro A1707", brand: "Apple", category: "MacBook Pro", processor: "Intel Core i7 (6th Gen)", ram: "16GB", storage: "512GB SSD", display: '15.6"', price: 43000, condition: "Refurbished", features: "Professional mobile workstation", offer: "15-inch Pro Deal", image: img("apple", "macbook-pro-a1707.jpg") },
  { name: "MacBook Pro A1990", brand: "Apple", category: "MacBook Pro", processor: "Intel Core i7 (8th Gen)", ram: "16GB", storage: "512GB SSD", display: '15.6"', price: 63000, condition: "Refurbished", features: "8th-gen architecture", offer: "8th-Gen Pro Deal", image: img("apple", "macbook-pro-a1990.jpg") },
  { name: "MacBook Pro A2159", brand: "Apple", category: "MacBook Pro", processor: "Intel Core i7 (8th Gen)", ram: "16GB", storage: "256GB SSD", display: '13.3" Retina', price: 63000, condition: "Refurbished", features: "Iris Plus 655, Lightweight", offer: "Latest Gen Compact Pro", image: img("apple", "macbook-pro-a2159.jpg") },
  { name: "MacBook Pro A2141", brand: "Apple", category: "MacBook Pro", processor: "Intel Core i7 (9th Gen)", ram: "16GB", storage: "512GB SSD", display: '16" Retina', price: 160000, condition: "Refurbished", features: "AMD Radeon Pro 5300M", offer: "Ultimate Pro Machine", image: img("apple", "macbook-pro-a2141.jpg") },
  // HP Laptops
  { name: "HP EliteBook 840 G1/G2", brand: "HP", category: "EliteBook", processor: "Intel Core i5 (4th Gen)", ram: "8GB", storage: "256GB SSD", display: '14"', price: 21000, condition: "Refurbished", features: "Entry-level business device", offer: "Budget Business Starter", image: img("hp", "elitebook-840-g1-g2.jpg") },
  { name: "HP EliteBook 840 G3", brand: "HP", category: "EliteBook", processor: "Intel Core i5 (6th Gen)", ram: "8GB", storage: "256GB SSD", display: '14"', price: 24500, condition: "Refurbished", features: "Reliable mid-range business", offer: "Reliable Business Deal", image: img("hp", "elitebook-840-g3.jpg") },
  { name: "HP EliteBook 840 G3 i7", brand: "HP", category: "EliteBook", processor: "Intel Core i7 (6th Gen)", ram: "8GB", storage: "256GB SSD", display: '14"', price: 29000, condition: "Refurbished", features: "Performance-focused business", offer: "i7 Performance Deal", image: img("hp", "elitebook-840-g3-i7.jpg") },
  { name: "HP EliteBook 840 G5 i7", brand: "HP", category: "EliteBook", processor: "Intel Core i7 (8th Gen)", ram: "16GB", storage: "512GB SSD", display: '14"', price: 43000, condition: "Refurbished", features: "High-spec traditional business", offer: "8th-Gen Business Pro", image: img("hp", "elitebook-840-g5-non-touch.jpg") },
  { name: "HP EliteBook 840 G6", brand: "HP", category: "EliteBook", processor: "Intel Core i5 (8th Gen)", ram: "8GB", storage: "256GB SSD", display: '14"', price: 31500, condition: "Refurbished", features: "8th-gen professional", offer: "8th-Gen Professional", image: img("hp", "elitebook-840-g6.jpg") },
  { name: "HP EliteBook 840 G7", brand: "HP", category: "EliteBook", processor: "Intel Core i5 (10th Gen)", ram: "16GB", storage: "256GB SSD", display: '14"', price: 39000, condition: "Refurbished", features: "Latest-gen business device", offer: "Business Series Deal", image: img("hp", "elitebook-840-g7.jpg") },
  { name: "HP EliteBook 840 G7 High-End", brand: "HP", category: "EliteBook", processor: "Intel Core i7 (10th Gen)", ram: "16GB", storage: "512GB SSD", display: '14" Touch', price: 54000, condition: "Refurbished", features: "Premium touch + performance", offer: "Premium Touch Deal", image: img("hp", "elitebook-840-g7-high-end.jpg") },
  { name: "HP EliteBook 840 G8", brand: "HP", category: "EliteBook", processor: "Intel Core i7 (11th Gen)", ram: "16GB", storage: "256GB SSD", display: '14"', price: 52500, condition: "Refurbished", features: "Cutting-edge 11th-gen", offer: "11th-Gen Cutting Edge", image: img("hp", "elitebook-840-g8.jpg") },
  { name: "HP EliteBook 830 G7", brand: "HP", category: "EliteBook", processor: "Intel Core i5 (10th Gen)", ram: "16GB", storage: "512GB SSD", display: '13.3"', price: 43000, condition: "Refurbished", features: "High-spec compact business", offer: "Compact Business Pro", image: img("hp", "elitebook-830-g7.jpg") },
  { name: "HP EliteBook 830 G7 i7", brand: "HP", category: "EliteBook", processor: "Intel Core i7 (10th Gen)", ram: "32GB", storage: "256GB SSD", display: '13.3"', price: 49000, condition: "Refurbished", features: "Ultra-high-performance compact", offer: "Ultra Performance Compact", image: img("hp", "elitebook-830-g7-high-end.jpg") },
  { name: "HP Elite Dragonfly X360", brand: "HP", category: "Elite Dragonfly", processor: "Intel Core i7 (11th Gen)", ram: "16GB", storage: "512GB SSD", display: '13.3" Touch', price: 78000, condition: "Refurbished", features: "Ultra-premium convertible", offer: "Executive Convertible Offer", image: img("hp", "elite-dragonfly-x360-11th-gen.jpg") },
  { name: "HP EliteBook X360 1030 G3", brand: "HP", category: "EliteBook X360", processor: "Intel Core i7 (8th Gen)", ram: "16GB", storage: "256GB SSD", display: '13.3" Touch', price: 52000, condition: "Refurbished", features: "8th-gen convertible", offer: "Convertible Pro Deal", image: img("hp", "elitebook-x360-1030-g3.jpg") },
  { name: "HP EliteBook X360 1040 G8", brand: "HP", category: "EliteBook X360", processor: "Intel Core i7 (11th Gen)", ram: "16GB", storage: "512GB SSD", display: '14" Touch', price: 62000, condition: "Refurbished", features: "Latest 11th-gen convertible", offer: "Latest Convertible Deal", image: img("hp", "elitebook-x360-1040-g8.jpg") },
  { name: "HP ZBook 15 G6 RTX 3000", brand: "HP", category: "ZBook", processor: "Intel Core i7 (9th Gen)", ram: "32GB", storage: "512GB SSD", display: '15.6"', price: 95000, condition: "Refurbished", features: "Nvidia RTX 3000 6GB", offer: "Creative Pro Workstation Deal", image: img("hp", "zbook-15-g6-rtx-3000.jpg") },
  { name: "HP ZBook Studio G5", brand: "HP", category: "ZBook", processor: "Intel Core i7 (9th Gen)", ram: "32GB", storage: "1TB SSD", display: '15.6"', price: 85000, condition: "Refurbished", features: "Nvidia Quadro P2000", offer: "Studio Workstation Deal", image: img("hp", "zbook-studio-g5.jpg") },
  { name: "HP ZBook 17 G5 Extreme", brand: "HP", category: "ZBook", processor: "Intel Core i7 (8th Gen)", ram: "64GB", storage: "2TB SSD", display: '17.3"', price: 105000, condition: "Refurbished", features: "Nvidia Quadro P3200 6GB", offer: "Ultimate Workstation Deal", image: img("hp", "zbook-17-g5-extreme.jpg") },
  { name: "HP ProBook 445 G7", brand: "HP", category: "ProBook", processor: "AMD Ryzen 5", ram: "16GB", storage: "512GB SSD", display: '14"', price: 30500, condition: "Refurbished", features: "Budget AMD business", offer: "AMD Business Value", image: img("hp", "probook-445-g7.jpg") },
  { name: "HP Chromebook", brand: "HP", category: "Chromebook", processor: "Intel Celeron", ram: "4GB", storage: "16GB eMMC", display: '14"', price: 10000, condition: "Refurbished", features: "Budget web browsing", offer: "Ultra Budget Chromebook", image: img("hp", "chromebook-14-g5.jpg") },
  // Dell Laptops
  { name: "Dell Latitude 3300", brand: "Dell", category: "Latitude", processor: "Intel Core i3 (7th Gen)", ram: "4GB", storage: "128GB SSD", display: '13.3"', price: 18000, condition: "Refurbished", features: "Ultra-budget business", offer: "Budget Business Starter", image: img("dell", "latitude-3300.jpg") },
  { name: "Dell Latitude 5400", brand: "Dell", category: "Latitude", processor: "Intel Core i5 (8th Gen)", ram: "8GB", storage: "256GB SSD", display: '14" Touch', price: 30500, condition: "Refurbished", features: "Convertible Touch", offer: "Flexible Business Deal", image: img("dell", "latitude-5400.jpg") },
  { name: "Dell Latitude 3420", brand: "Dell", category: "Latitude", processor: "Intel Core i5 (11th Gen)", ram: "16GB", storage: "256GB SSD", display: '14"', price: 38000, condition: "Refurbished", features: "Latest-gen business", offer: "Enterprise Bundle", image: img("dell", "latitude-3420.jpg") },
  { name: "Dell Latitude 5300 X360", brand: "Dell", category: "Latitude", processor: "Intel Core i5 (8th Gen)", ram: "8GB", storage: "256GB SSD", display: '13.3" Touch', price: 32000, condition: "Refurbished", features: "Convertible professional", offer: "Convertible Professional Deal", image: img("dell", "latitude-5300-x360-i5.jpg") },
  // Lenovo Laptops
  { name: "Lenovo ThinkPad X1 Yoga 6th Gen", brand: "Lenovo", category: "ThinkPad X1", processor: "Intel Core i7", ram: "16GB", storage: "512GB SSD", display: '14" Touch', price: 35000, condition: "Refurbished", features: "Premium convertible ultrabook", offer: "Premium Convertible Deal", image: img("lenovo", "thinkpad-x1-yoga-6th-gen.jpg") },
  { name: "Lenovo ThinkPad X1 Yoga 7th Gen", brand: "Lenovo", category: "ThinkPad X1", processor: "Intel Core i7", ram: "16GB", storage: "512GB SSD", display: '14" Touch', price: 46000, condition: "Refurbished", features: "X360 Touch, Pen Support", offer: "Convertible Pro Offer", image: img("lenovo", "thinkpad-x1-yoga-7th-gen.jpg") },
  { name: "Lenovo ThinkPad T490s", brand: "Lenovo", category: "ThinkPad T", processor: "Intel Core i7 (8th Gen)", ram: "8GB", storage: "256GB SSD", display: '14"', price: 34000, condition: "Refurbished", features: "Professional mainstream", offer: "Mainstream Pro Deal", image: img("lenovo", "thinkpad-t490s.jpg") },
  { name: "Lenovo ThinkPad L460", brand: "Lenovo", category: "ThinkPad L", processor: "Intel Core i5 (6th Gen)", ram: "8GB", storage: "256GB SSD", display: '14"', price: 22000, condition: "Refurbished", features: "Proven value device", offer: "Value Business Deal", image: img("lenovo", "thinkpad-l460-256gb.jpg") },
  { name: "Lenovo ThinkPad Yoga 11e", brand: "Lenovo", category: "ThinkPad Yoga", processor: "Intel Celeron", ram: "4GB", storage: "128GB SSD", display: '11.6" Touch', price: 16000, condition: "Refurbished", features: "Budget convertible", offer: "Budget Convertible Deal", image: img("lenovo", "thinkpad-yoga-11e-celeron-4gb.jpg") },
  // Microsoft Surface
  { name: "Microsoft Surface Pro", brand: "Microsoft", category: "Surface", processor: "Intel Core i5 (8th Gen)", ram: "8GB", storage: "256GB SSD", display: '12.3" Touch', price: 43000, condition: "Refurbished", features: "Premium 2-in-1 convertible", offer: "Surface 2-in-1 Deal", image: img("microsoft", "surface-pro-i5-8th-gen.jpg") },
  { name: "Microsoft Surface 3 (1872)", brand: "Microsoft", category: "Surface", processor: "Intel Core i5 (10th Gen)", ram: "8GB", storage: "256GB SSD", display: '15.6" Touch', price: 63000, condition: "Refurbished", features: "Full-size premium 2-in-1", offer: "Surface Premium Deal", image: img("microsoft", "surface-3-model-1872.jpg") },
  // ASUS
  { name: "Asus VivoBook X543", brand: "ASUS", category: "VivoBook", processor: "Intel Core i3 (6th Gen)", ram: "4GB", storage: "1TB HDD", display: '15.6"', price: 54000, condition: "Brand New", features: "Brand new consumer device", offer: "New VivoBook Deal", image: img("asus", "vivobook-x543.jpg") },
  // Fujitsu
  { name: "Fujitsu Professional", brand: "Fujitsu", category: "Professional", processor: "Intel Core i3 (8th Gen)", ram: "4GB", storage: "128GB SSD", display: '13.3"', price: 16000, condition: "Refurbished", features: "Ultra-budget professional", offer: "Budget Professional", image: img("fujitsu", "lifebook-a579.jpg") },
  // NEC
  { name: "NEC Professional", brand: "NEC", category: "Professional", processor: "Intel Core i5 (6th Gen)", ram: "4GB", storage: "128GB SSD", display: '13.3"', price: 17500, condition: "Refurbished", features: "Budget professional", offer: "NEC Value Deal", image: img("nec", "versapro-i5.jpg") },
];

export const brandList = ["All", "Apple", "HP", "Dell", "Lenovo", "Microsoft", "ASUS", "Fujitsu", "NEC"];

export const blogPosts = [
  { id: "1", title: "How to Choose a Business Laptop in Kenya", slug: "choose-business-laptop-kenya", excerpt: "A practical guide for startups, SMEs, and enterprise teams looking for reliable business laptops in the Kenyan market.", category: "Buying Guide", author: "JARED ANDIKA", date: "2026-05-20" },
  { id: "2", title: "HP EliteBook vs Dell Latitude: Which is Best for Your Business?", slug: "hp-elitebook-vs-dell-latitude", excerpt: "An in-depth comparison of two of the most popular enterprise laptop families available in East Africa.", category: "Comparison", author: "JARED ANDIKA", date: "2026-05-15" },
  { id: "3", title: "Why Refurbished Laptops Are the Smart Choice for Kenyan Businesses", slug: "refurbished-laptops-smart-choice", excerpt: "How choosing professionally refurbished enterprise laptops can save your business up to 60% without compromising quality.", category: "Industry Insight", author: "JARED ANDIKA", date: "2026-05-10" },
  { id: "4", title: "Cybersecurity Best Practices for Remote Workers in 2026", slug: "cybersecurity-remote-workers-2026", excerpt: "Essential security measures every remote worker and distributed team should implement to protect sensitive business data.", category: "Cybersecurity", author: "JARED ANDIKA", date: "2026-05-05" },
  { id: "5", title: "KALINITECH SYSTEMS Launches New Academy Training Programs", slug: "kalinitech-academy-launch", excerpt: "KALINITECH SYSTEMS Academy now offers hands-on training in software development, cybersecurity, and cloud computing.", category: "Company News", author: "JARED ANDIKA", date: "2026-05-01" },
  { id: "6", title: "5 Automation Tools Every Small Business Needs", slug: "automation-tools-small-business", excerpt: "From social media scheduling to inventory management, discover the tools that can save your team hours every week.", category: "Business Automation", author: "JARED ANDIKA", date: "2026-04-28" },
];

export const whatsappLeadLink = (product?: string) => {
  const base = `https://wa.me/${company.whatsappNumber}`;
  const text = product
    ? `Hello KALINITECH SYSTEMS, I am interested in ${product}. Please share more details.`
    : "Hello KALINITECH SYSTEMS, I would like to inquire about your products and services.";
  return `${base}?text=${encodeURIComponent(text)}`;
};

export const socialPlatforms = [
  { name: "WhatsApp", priority: "Highest", icon: "MessageCircle" },
  { name: "Facebook", priority: "Highest", icon: "Facebook" },
  { name: "Instagram", priority: "Very High", icon: "Instagram" },
  { name: "TikTok", priority: "Very High", icon: "Music" },
  { name: "X (Twitter)", priority: "Medium", icon: "Twitter" },
  { name: "Telegram", priority: "Medium", icon: "Send" },
];

export const academyCourses = [
  { title: "Full-Stack Web Development", duration: "12 Weeks", level: "Beginner to Advanced", description: "Learn React, Next.js, Node.js, databases, and deploy production-ready web applications.", price: "KES 35,000" },
  { title: "Cybersecurity Fundamentals", duration: "8 Weeks", level: "Intermediate", description: "Master ethical hacking, penetration testing, network security, and incident response techniques.", price: "KES 28,000" },
  { title: "Data Science & Analytics", duration: "10 Weeks", level: "Intermediate", description: "Python, machine learning, data visualization, and statistical analysis for business intelligence.", price: "KES 30,000" },
  { title: "Cloud Computing (AWS/Azure)", duration: "6 Weeks", level: "Intermediate to Advanced", description: "Cloud architecture, deployment, monitoring, and cost optimization on major cloud platforms.", price: "KES 25,000" },
  { title: "Digital Marketing & SEO", duration: "4 Weeks", level: "Beginner", description: "Social media strategy, content marketing, SEO optimization, and analytics-driven campaigns.", price: "KES 15,000" },
  { title: "Mobile App Development", duration: "10 Weeks", level: "Intermediate", description: "React Native and Flutter for building cross-platform mobile applications for iOS and Android.", price: "KES 32,000" },
];
