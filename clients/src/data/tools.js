import {
  RiPaletteLine,
  RiUserSmileLine,
  RiImageLine,
  RiYoutubeLine,
  RiTodoLine,
  RiChatSmile2Line,
  RiQrCodeLine,
  RiBracesLine,
  RiMoneyRupeeCircleLine,
} from "react-icons/ri";

const tools = [
  {
    toolName: "Gradient Generator",
    slug: "gradient-generator",
    url: "/gradient-generator",
    description: "Create beautiful CSS gradients instantly.",
    icon: RiPaletteLine,
    status: "active",
  },
  {
    toolName: "Avatar Generator",
    slug: "avatar-generator",
    url: "/avatar-generator",
    description: "Generate unlimited avatars for your website or apps.",
    icon: RiUserSmileLine,
    status: "active",
  },
  {
    toolName: "Image Finder",
    slug: "image-finder",
    url: "/image-finder",
    description:
      "Image Finder helps you quickly find relevant, high-quality images.",
    icon: RiImageLine,
    status: "active",
  },
  {
    toolName: "Yt Thumbnail Downloader",
    slug: "youtube-thumbnail-downloader",
    url: "/youtube-thumbnail-downloader",
    description:
      "Easily fetch and download YouTube video thumbnails in HD, SD, and original quality.",
    icon: RiYoutubeLine,
    status: "active",
  },
  {
    toolName: "Task Planner App",
    slug: "task-planner",
    url: "/task-planner",
    description:
      "Plan, organize, and manage your daily tasks efficiently with reminders and progress tracking.",
    icon: RiTodoLine,
    status: "active",
  },
  {
    toolName: "Chatbot App",
    slug: "chatbot",
    url: "/chatbot",
    description:
      "An AI-powered chatbot that helps users with instant answers, smart conversations, and automated support in real time.",
    icon: RiChatSmile2Line,
    status: "active",
  },
  {
    toolName: "QR Code Generator",
    slug: "qr-code",
    url: "/qr-code",
    description:
      "Generate QR codes instantly for URLs, text, phone numbers, emails, and more with a clean and easy-to-use interface.",
    icon: RiQrCodeLine,
    status: "active",
  },
  {
    toolName: "Dummy JSON Generator",
    slug: "json-generator",
    url: "/json-generator",
    description:
      "Generate dummy JSON data instantly for testing APIs, frontend development, and mock projects with ease.",
    icon: RiBracesLine,
    status: "active",
  },
  {
    toolName: "Expense Tracker",
    slug: "expense",
    url: "/expense",
    description:
      "Track your daily income and expenses, analyze spending habits, and manage your budget efficiently with a simple and intuitive expense tracker.",
    icon: RiMoneyRupeeCircleLine,
    status: "active",
  },
];

export default tools;
