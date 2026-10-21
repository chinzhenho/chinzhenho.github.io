/*
 * ====================================================
 *  只需要修改這個檔案，就能更新整個網站的內容
 * ====================================================
 *
 *  新增作品：複製 projects 裡的一個 { ... } 區塊，改成你的資料。
 *  封面照片：把圖片放進 images/ 資料夾，然後在 cover 填 "images/檔名.jpg"。
 *            建議尺寸 1600 x 1000（16:10）。
 *  不需要的連結（例如沒有 GitHub）就填 "" 留空，按鈕會自動隱藏。
 */

const PROFILE = {
  name: "你的名字",
  role: "前端工程師 / UI 設計師",
  intro: "我專注於打造好用、好看的網頁產品。以下是我做過的作品，點擊卡片即可前往查看。",
  about:
    "在這裡寫幾句關於你的背景：學歷、工作經驗、你擅長什麼、你在找什麼樣的機會。\n\n例如：我畢業於 XX 大學資訊工程系，有 2 年前端開發經驗，喜歡把複雜的問題變成簡單的介面。",
  skills: ["HTML / CSS", "JavaScript", "React", "Figma", "Node.js", "Git"],
  resume: "",                          // 履歷 PDF，例如 "resume.pdf"（放在同一個資料夾）
  email: "you@example.com",
  github: "https://github.com/CHINZHENHO",
  linkedin: "https://www.linkedin.com/in/yourname",
};

const projects = [
  {
    title: "電商網站",
    year: "2026",
    category: "網頁開發",
    description: "一個完整的線上購物網站，包含商品瀏覽、購物車與結帳流程，支援手機版。",
    tags: ["React", "Node.js", "Stripe"],
    cover: "images/project-1.svg",
    link: "https://example.com",       // 作品網站
    code: "https://github.com/yourname/project-1", // 原始碼（可留空）
  },
  {
    title: "記帳 App",
    year: "2025",
    category: "App",
    description: "簡潔的個人記帳工具，用圖表呈現每月支出，資料儲存在瀏覽器中。",
    tags: ["JavaScript", "Chart.js"],
    cover: "images/project-2.svg",
    link: "https://example.com",
    code: "",
  },
  {
    title: "品牌形象設計",
    year: "2025",
    category: "設計",
    description: "為咖啡店設計的品牌識別與官方網站，包含 Logo、色彩系統與排版規範。",
    tags: ["Figma", "Branding"],
    cover: "images/project-3.svg",
    link: "https://example.com",
    code: "",
  },
];
