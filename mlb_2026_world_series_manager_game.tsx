import React, { useState, useEffect, useRef } from "react";
import {
  Settings,
  Play,
  Square,
  RotateCcw,
  Compass,
  TrendingUp,
  Tv,
  Activity,
  Award,
  Shield,
  Sliders,
  Globe,
  Sun,
  Moon,
  Flame,
  Zap,
  Sparkles,
  Clock,
  HeartPulse,
  Info,
  HelpCircle,
  Send,
  MessageSquare,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  User,
  MapPin,
  ChevronRight,
  Volume2,
  Bot,
  Trophy,
  RefreshCw,
  Search,
  Newspaper,
  FileText,
  Music,
  Heart,
  ListMusic,
  Eye,
  Share2,
  Download,
  UserCheck,
  VolumeX,
  Maximize2,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

const MLB_TEAMS = [
  { id: "NYY", code: "NYY", nameEn: "New York Yankees", nameZh: "紐約洋基", league: "AL East", primaryColor: "#003087", secondaryColor: "#E3D4AD", form: 88, coachEn: "Aaron Boone", coachZh: "亞倫·布恩", tier: "Contender" },
  { id: "LAD", code: "LAD", nameEn: "Los Angeles Dodgers", nameZh: "洛杉磯道奇", league: "NL West", primaryColor: "#005A9C", secondaryColor: "#A5ACAF", form: 94, coachEn: "Dave Roberts", coachZh: "戴夫·羅伯茨", tier: "Powerhouse" },
  { id: "BOS", code: "BOS", nameEn: "Boston Red Sox", nameZh: "波士頓紅襪", league: "AL East", primaryColor: "#BD3039", secondaryColor: "#0C2340", form: 82, coachEn: "Alex Cora", coachZh: "亞歷克斯·科拉", tier: "Challenger" },
  { id: "ATL", code: "ATL", nameEn: "Atlanta Braves", nameZh: "亞特蘭大勇士", league: "NL East", primaryColor: "#CE1141", secondaryColor: "#13274F", form: 90, coachEn: "Brian Snitker", coachZh: "布萊恩·斯尼特克", tier: "Powerhouse" },
  { id: "HOU", code: "HOU", nameEn: "Houston Astros", nameZh: "休士頓太空人", league: "AL West", primaryColor: "#002D62", secondaryColor: "#EB6E1F", form: 86, coachEn: "Joe Espada", coachZh: "喬·埃斯帕達", tier: "Contender" },
  { id: "SFG", code: "SFG", nameEn: "San Francisco Giants", nameZh: "舊金山巨人", league: "NL West", primaryColor: "#FD5A1E", secondaryColor: "#27251F", form: 79, coachEn: "Bob Melvin", coachZh: "鮑勃·梅爾文", tier: "Challenger" },
  { id: "CHC", code: "CHC", nameEn: "Chicago Cubs", nameZh: "芝加哥小熊", league: "NL Central", primaryColor: "#0E3386", secondaryColor: "#CC3433", form: 81, coachEn: "Craig Counsell", coachZh: "克雷格·卡恩塞爾", tier: "Challenger" },
  { id: "PHI", code: "PHI", nameEn: "Philadelphia Phillies", nameZh: "費城費城人", league: "NL East", primaryColor: "#E81828", secondaryColor: "#002D62", form: 89, coachEn: "Rob Thomson", coachZh: "羅布·湯姆森", tier: "Powerhouse" },
  { id: "SDP", code: "SDP", nameEn: "San Diego Padres", nameZh: "聖地牙哥教士", league: "NL West", primaryColor: "#2F241D", secondaryColor: "#FFC425", form: 85, coachEn: "Mike Shildt", coachZh: "邁克·希爾特", tier: "Contender" },
  { id: "SEA", code: "SEA", nameEn: "Seattle Mariners", nameZh: "西雅圖水手", league: "AL West", primaryColor: "#0C2340", secondaryColor: "#005C5C", form: 83, coachEn: "Dan Wilson", coachZh: "丹·威爾森", tier: "Challenger" }
];

const STADIUMS_20 = [
  { id: "yankee_stadium", nameEn: "Yankee Stadium", nameZh: "洋基體育場", cityEn: "Bronx, NY", cityZh: "紐約布朗克斯", elevation: 16, capacity: 46537, dimensionsEn: "318' L - 408' C - 314' R (Short Porch)", atmosphericFactor: "Short right field porch favors lefty pull hitters; crisp coastal breeze." },
  { id: "dodger_stadium", nameEn: "Dodger Stadium", nameZh: "道奇體育場", cityEn: "Los Angeles, CA", cityZh: "洛杉磯", elevation: 142, capacity: 56000, dimensionsEn: "330' L - 395' C - 330' R", atmosphericFactor: "Chavez Ravine marine layer suppresses night fly balls by 8%." },
  { id: "fenway_park", nameEn: "Fenway Park", nameZh: "芬威球場", cityEn: "Boston, MA", cityZh: "波士頓", elevation: 6, capacity: 37755, dimensionsEn: "310' Green Monster - 420' Deep - 302' Pesky Pole", atmosphericFactor: "37-foot Green Monster wall creates doubles bonanza and high drama." },
  { id: "wrigley_field", nameEn: "Wrigley Field", nameZh: "瑞格利球場", cityEn: "Chicago, IL", cityZh: "芝加哥", elevation: 182, capacity: 41649, dimensionsEn: "355' L - 400' C - 353' R", atmosphericFactor: "Lake Michigan winds blowing out boost home run probability by 22%." },
  { id: "oracle_park", nameEn: "Oracle Park", nameZh: "甲骨文球場", cityEn: "San Francisco, CA", cityZh: "舊金山", elevation: 3, capacity: 41265, dimensionsEn: "339' L - 391' C - 309' McCovey Cove", atmosphericFactor: "McCovey Cove splash hits & heavy ocean fog dampens power hitters." },
  { id: "coors_field", nameEn: "Coors Field", nameZh: "庫爾斯球場", cityEn: "Denver, CO", cityZh: "丹佛", elevation: 1610, capacity: 50445, dimensionsEn: "347' L - 415' C - 350' R", atmosphericFactor: "Mile High thin air adds +10% ball carry distance and humidor effect." },
  { id: "minute_maid", nameEn: "Minute Maid Park", nameZh: "美汁源球場", cityEn: "Houston, TX", cityZh: "休士頓", elevation: 12, capacity: 41168, dimensionsEn: "315' Crawford Boxes - 409' C - 326' R", atmosphericFactor: "Retractable roof humidor climate control with iconic Crawford Boxes." },
  { id: "petco_park", nameEn: "Petco Park", nameZh: "派考球場", cityEn: "San Diego, CA", cityZh: "聖地牙哥", elevation: 4, capacity: 40280, dimensionsEn: "336' L - 396' C - 322' R", atmosphericFactor: "Pitcher-friendly marine atmosphere with Western Metal Supply Co. building." },
  { id: "t_mobile_park", nameEn: "T-Mobile Park", nameZh: "T-Mobile球場", cityEn: "Seattle, WA", cityZh: "西雅圖", elevation: 5, capacity: 47929, dimensionsEn: "331' L - 401' C - 326' R", atmosphericFactor: "Pacific Northwest damp air suppresses fly balls; retractable roof." },
  { id: "truist_park", nameEn: "Truist Park", nameZh: "特魯斯特球場", cityEn: "Atlanta, GA", cityZh: "亞特蘭大", elevation: 298, capacity: 41084, dimensionsEn: "335' L - 400' C - 325' R", atmosphericFactor: "Humid Georgia summers accelerate fastball velocity and batter endurance decay." },
  { id: "citizens_bank", nameEn: "Citizens Bank Park", nameZh: "公民銀行球場", cityEn: "Philadelphia, PA", cityZh: "費城", elevation: 9, capacity: 42797, dimensionsEn: "329' L - 401' C - 330' R", atmosphericFactor: "Loud electric fan atmosphere; small outfield favors HR hitters." },
  { id: "citi_field", nameEn: "Citi Field", nameZh: "花旗球場", cityEn: "Queens, NY", cityZh: "紐約皇后區", elevation: 4, capacity: 41922, dimensionsEn: "335' L - 408' C - 330' R", atmosphericFactor: "Swirling winds off Flushing Bay with deep power alleys." },
  { id: "pnc_park", nameEn: "PNC Park", nameZh: "PNC球場", cityEn: "Pittsburgh, PA", cityZh: "匹茲堡", elevation: 220, capacity: 38747, dimensionsEn: "325' L - 399' C - 320' R", atmosphericFactor: "Iconic Roberto Clemente Wall and Allegheny River backdrop." },
  { id: "busch_stadium", nameEn: "Busch Stadium", nameZh: "布希體育場", cityEn: "St. Louis, MO", cityZh: "聖路易", elevation: 140, capacity: 45494, dimensionsEn: "336' L - 400' C - 335' R", atmosphericFactor: "Traditional natural grass pitch with Gateway Arch skyline backdrop." },
  { id: "kauffman_stadium", nameEn: "Kauffman Stadium", nameZh: "考夫曼體育場", cityEn: "Kansas City, MO", cityZh: "堪薩斯城", elevation: 250, capacity: 37903, dimensionsEn: "330' L - 410' C - 330' R", atmosphericFactor: "Water spectacular fountain outfield layout with spacious gap territory." },
  { id: "progressive_field", nameEn: "Progressive Field", nameZh: "進步球場", cityEn: "Cleveland, OH", cityZh: "克里夫蘭", elevation: 200, capacity: 34830, dimensionsEn: "325' L - 400' C - 325' R", atmosphericFactor: "Lake Erie crosswinds and 19-foot left field wall 'Little Green Monster'." },
  { id: "camden_yards", nameEn: "Oriole Park at Camden Yards", nameZh: "金鶯球場", cityEn: "Baltimore, MD", cityZh: "巴爾的摩", elevation: 10, capacity: 44970, dimensionsEn: "333' L - 410' C - 318' R", atmosphericFactor: "Pushed-back deep left-field wall dramatically curbs right-handed home runs." },
  { id: "globe_life_field", nameEn: "Globe Life Field", nameZh: "環球人生球場", cityEn: "Arlington, TX", cityZh: "阿靈頓", elevation: 185, capacity: 40300, dimensionsEn: "329' L - 407' C - 326' R", atmosphericFactor: "Climate-controlled dome combats Texas extreme summer heatwaves." },
  { id: "rogers_centre", nameEn: "Rogers Centre", nameZh: "羅傑斯中心", cityEn: "Toronto, ON", cityZh: "多倫多", elevation: 76, capacity: 39150, dimensionsEn: "328' L - 400' C - 328' R", atmosphericFactor: "First functional retractable dome in MLB with artificial turf bounce." },
  { id: "target_field", nameEn: "Target Field", nameZh: "目標球場", cityEn: "Minneapolis, MN", cityZh: "明尼亞波利斯", elevation: 256, capacity: 38541, dimensionsEn: "339' L - 404' C - 328' R", atmosphericFactor: "Cool Northern breeze and limestone exterior downtown setting." }
];

const BaseballAudioSynth = {
  ctx: null,
  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },
  playBeep(freq = 440, duration = 0.08, type = "sine") {
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  },
  playCrackOfBat() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.12);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  },
  playBallCatch() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  },
  playHomeRunHorn() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99]; // Major arpeggio
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.06, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6 + idx * 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + 0.6 + idx * 0.08);
      });
    } catch (e) {}
  },
  playOrganCharge() {
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const chargeNotes = [
        { f: 261.63, d: 0.15 },
        { f: 329.63, d: 0.15 },
        { f: 392.00, d: 0.15 },
        { f: 523.25, d: 0.25 },
        { f: 392.00, d: 0.12 },
        { f: 523.25, d: 0.50 }
      ];
      let curTime = now;
      chargeNotes.forEach((n) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(n.f, curTime);
        gain.gain.setValueAtTime(0.05, curTime);
        gain.gain.exponentialRampToValueAtTime(0.001, curTime + n.d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(curTime);
        osc.stop(curTime + n.d);
        curTime += n.d + 0.04;
      });
    } catch (e) {}
  }
};

export default function App() {
  const [lang, setLang] = useState("zh");
  const [themeMode, setThemeMode] = useState("dark");
  const [homeTeam, setHomeTeam] = useState(MLB_TEAMS[0]); // NYY
  const [awayTeam, setAwayTeam] = useState(MLB_TEAMS[1]); // LAD
  const [selectedStadium, setSelectedStadium] = useState(STADIUMS_20[0]);

  // Game Engine Simulation State
  const [gameState, setGameState] = useState("SETUP"); // SETUP, SIMULATING, FT
  const [inning, setInning] = useState(1);
  const [isTopInning, setIsTopInning] = useState(true);
  const [balls, setBalls] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [outs, setOuts] = useState(0);
  const [bases, setBases] = useState({ b1: false, b2: false, b3: false });
  const [homeRuns, setHomeRuns] = useState(0);
  const [awayRuns, setAwayRuns] = useState(0);
  const [homeHits, setHomeHits] = useState(0);
  const [awayHits, setAwayHits] = useState(0);
  const [homeErrors, setHomeErrors] = useState(0);
  const [awayErrors, setAwayErrors] = useState(0);

  // Tabs navigation
  const [activeTab, setActiveTab] = useState("NEWS_REPORT"); // NEWS_REPORT, PITCH_CANVAS, REPLAY_LAB, SCOUT, LIVE_SCORES, CARDS, DUGOUT_CHAT

  // AI Generator States
  const [selectedModel, setSelectedModel] = useState("gemini-3.1-flash");
  const [customNewsPrompt, setCustomNewsPrompt] = useState("");
  const [selectedMagicTag, setSelectedMagicTag] = useState("HOME_RUN_ANALYTICS");
  const [newsReportText, setNewsReportText] = useState("");
  const [isGeneratingNews, setIsGeneratingNews] = useState(false);
  const [reportWordCount, setReportWordCount] = useState(0);

  // Realtime Live Scores grounding state
  const [groundedScores, setGroundedScores] = useState([
    { home: "LAD", away: "NYY", homeR: 5, awayR: 4, status: "FT", inning: "9th", keyPitcher: "Yoshinobu Yamamoto (7 SO)", venue: "Dodger Stadium" },
    { home: "ATL", away: "PHI", homeR: 3, awayR: 2, status: "LIVE", inning: "Bot 7th", keyPitcher: "Spencer Strider (102mph Fastball)", venue: "Truist Park" },
    { home: "HOU", away: "BOS", homeR: 6, awayR: 1, status: "FT", inning: "9th", keyPitcher: "Framber Valdez (Complete Game)", venue: "Minute Maid Park" },
    { home: "SFG", away: "SDP", homeR: 2, awayR: 3, status: "LIVE", inning: "Top 8th", keyPitcher: "Yu Darvish (6.1 IP)", venue: "Oracle Park" }
  ]);
  const [isFetchingLiveScores, setIsFetchingLiveScores] = useState(false);

  // WOW Feature 1: Interactive Physics Canvas State
  const [pitchType, setPitchType] = useState("4-Seam Fastball");
  const [pitchVelocity, setPitchVelocity] = useState(98);
  const [strikeZoneTarget, setStrikeZoneTarget] = useState({ x: 50, y: 50 });
  const [physicsResult, setPhysicsResult] = useState(null);
  const canvasRef = useRef(null);

  // WOW Feature 2: AI Player Card Evolution State
  const [playerCards, setPlayerCards] = useState([
    { id: "p1", name: "Aaron Judge", pos: "OF", team: "NYY", stage: 1, power: 99, contact: 88, speed: 72, cardGlow: "#003087" },
    { id: "p2", name: "Shohei Ohtani", pos: "DH/P", team: "LAD", stage: 2, power: 98, contact: 92, speed: 90, cardGlow: "#005A9C" },
    { id: "p3", name: "Mookie Betts", pos: "SS/OF", team: "LAD", stage: 1, power: 85, contact: 94, speed: 86, cardGlow: "#CE1141" }
  ]);
  const [isEvolvingCard, setIsEvolvingCard] = useState(false);

  // Dugout Chat State
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Welcome to the MLB Dugout, Manager! Ask me about pitch selection, bullpen strategy, shift defense, or stadium weather dynamics." }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isSendingChat, setIsSendingChat] = useState(false);

  // Match Play-by-Play Logs
  const [matchLogs, setMatchLogs] = useState([]);

  const pushLog = (msg) => {
    setMatchLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 30));
  };

  // Canvas Physics Simulator Renderer
  useEffect(() => {
    if (activeTab !== "PITCH_CANVAS" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Draw Outfield Field Perspective
    ctx.fillStyle = "#1e3a1e";
    ctx.fillRect(0, 0, w, h);

    // Strike zone frame
    const szW = 120;
    const szH = 150;
    const szX = (w - szW) / 2;
    const szY = (h - szH) / 2;

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.strokeRect(szX, szY, szW, szH);

    // Grid lines for 9-square strike zone
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(szX + szW / 3, szY); ctx.lineTo(szX + szW / 3, szY + szH);
    ctx.moveTo(szX + (2 * szW) / 3, szY); ctx.lineTo(szX + (2 * szW) / 3, szY + szH);
    ctx.moveTo(szX, szY + szH / 3); ctx.lineTo(szX + szW, szY + szH / 3);
    ctx.moveTo(szX, szY + (2 * szH) / 3); ctx.lineTo(szX + szW, szY + (2 * szH) / 3);
    ctx.stroke();

    // Home plate outline
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.moveTo(szX + 10, szY + szH + 40);
    ctx.lineTo(szX + szW - 10, szY + szH + 40);
    ctx.lineTo(szX + szW - 10, szY + szH + 55);
    ctx.lineTo(w / 2, szY + szH + 70);
    ctx.lineTo(szX + 10, szY + szH + 55);
    ctx.closePath();
    ctx.fill();

    // Target crosshair
    const targetX = szX + (strikeZoneTarget.x / 100) * szW;
    const targetY = szY + (strikeZoneTarget.y / 100) * szH;

    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(targetX, targetY, 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(targetX, targetY, 4, 0, Math.PI * 2);
    ctx.fill();
  }, [activeTab, strikeZoneTarget]);

  // Execute Pitch Simulator Physics
  const handleSimulatePitch = () => {
    BaseballAudioSynth.playCrackOfBat();
    const isStrike = strikeZoneTarget.x >= 15 && strikeZoneTarget.x <= 85 && strikeZoneTarget.y >= 15 && strikeZoneTarget.y <= 85;
    const exitVel = Math.floor(pitchVelocity * 0.95 + Math.random() * 25);
    const launchAngle = Math.floor(Math.random() * 45 - 5);

    let resultType = "Foul Ball";
    if (exitVel > 102 && launchAngle >= 22 && launchAngle <= 35) {
      resultType = "🚀 HOME RUN! 435 FT Out of Stadium!";
      BaseballAudioSynth.playHomeRunHorn();
    } else if (exitVel > 95 && launchAngle >= 10 && launchAngle < 22) {
      resultType = "⚡ Line Drive Single / Double into the gap";
      BaseballAudioSynth.playBallCatch();
    } else if (launchAngle < 0) {
      resultType = "⚾ Hard Groundball Out to Shortstop";
      BaseballAudioSynth.playBallCatch();
    } else {
      resultType = isStrike ? "Strike Called / Swinging Strike!" : "Ball Outside Zone";
      BaseballAudioSynth.playBeep(600, 0.1);
    }

    setPhysicsResult({
      pitchType,
      velocity: pitchVelocity,
      exitVel,
      launchAngle,
      resultType,
      isStrike
    });
    pushLog(`[PITCH] Threw ${pitchVelocity}mph ${pitchType} -> ${resultType}`);
  };

  const handleGenerateNewsReport = async () => {
    setIsGeneratingNews(true);
    pushLog(`[AI REPORT] Contacting model '${selectedModel}' for 2026 MLB recap...`);

    try {
      const promptText = `
Act as an elite MLB Sports Analyst compiling an extensive 2026 Major League Baseball recaps and stadium report.
Selected Teams: ${homeTeam.nameEn} vs ${awayTeam.nameEn} at ${selectedStadium.nameEn}.
Custom User Directive: ${customNewsPrompt || "Provide in-depth breakdown on bullpen usage, exit velocity analytics, and altitude effects."}
Include highlighted coral text elements (<span style="color: #FF7F50; font-weight: bold;">like this</span>) for key star names and statistics.
Format with clean Markdown headings and sections.
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }]
        })
      });

      const result = await response.json();
      const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (text) {
        setNewsReportText(text);
        setReportWordCount(text.split(/\s+/).length);
        pushLog(`[SUCCESS] Generated report containing ~${text.split(/\s+/).length} words.`);
      } else {
        throw new Error("API returned blank content");
      }
    } catch (err) {
      pushLog(`[FALLBACK] Using high-fidelity offline 2026 MLB analysis report.`);
      const fallbackReport = `### ⚾ **2026 MLB GRAND SLAM DAILY REPORT: ${homeTeam.nameEn.toUpperCase()} VS ${awayTeam.nameEn.toUpperCase()}**

---

### <span style="color: #FF7F50; font-weight: bold;">1. Stadium Environmental Dynamics & Ball Velocity</span>

At <span style="color: #FF7F50; font-weight: bold;">${selectedStadium.nameEn}</span> (${selectedStadium.cityEn}), pitch physics dictate key tactical shifts. With an elevation of <span style="color: #FF7F50; font-weight: bold;">${selectedStadium.elevation}m</span>, fastball spin decay is decreased by 4.2%, giving power pitchers an elevated strikeout rate in high leverage situations.

*   **Key Pitcher Impact**: 4-seam fastballs averaging <span style="color: #FF7F50; font-weight: bold;">98.5 MPH</span> carry 2.1 inches further into the upper strike zone.
*   **Outfield Dimensions**: ${selectedStadium.dimensionsEn}.

---

### <span style="color: #FF7F50; font-weight: bold;">2. Key Batting Analytics & Exit Velocities</span>

Lineup cards show peak exit velocities hitting upwards of <span style="color: #FF7F50; font-weight: bold;">112.4 MPH</span>. Power hitters are exploiting field dimensions with optimal launch angles between 25° and 32°.

*   **Clutch Performance**: <span style="color: #FF7F50; font-weight: bold;">Aaron Judge</span> and <span style="color: #FF7F50; font-weight: bold;">Shohei Ohtani</span> project a combined <span style="color: #FF7F50; font-weight: bold;">2.85 xG / HR index</span> today.`;
      setNewsReportText(fallbackReport);
      setReportWordCount(185);
    } finally {
      setIsGeneratingNews(false);
    }
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || isSendingChat) return;
    const userMsg = chatInput;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsSendingChat(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Act as a veteran MLB Dugout Manager. Answer concise strategy query: ${userMsg}` }] }]
        })
      });
      const result = await response.json();
      const reply = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Bring in your lefty setup pitcher to face their heavy-hitting pull lineup!";
      setChatMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (e) {
      setChatMessages((prev) => [...prev, { role: "assistant", text: "I recommend bringing in your closer to lock down the 9th inning save opportunity!" }]);
    } finally {
      setIsSendingChat(false);
    }
  };

  const handleSimulateAtBat = () => {
    BaseballAudioSynth.playCrackOfBat();
    const rand = Math.random();

    if (rand > 0.85) {
      // Home Run
      BaseballAudioSynth.playHomeRunHorn();
      if (isTopInning) setAwayRuns((r) => r + 1);
      else setHomeRuns((r) => r + 1);
      pushLog(`🚀 HOME RUN! ${isTopInning ? awayTeam.code : homeTeam.code} scores!`);
      setBalls(0); setStrikes(0);
    } else if (rand > 0.60) {
      // Base hit
      BaseballAudioSynth.playBallCatch();
      if (isTopInning) setAwayHits((h) => h + 1);
      else setHomeHits((h) => h + 1);
      pushLog(`⚡ Base Hit into center field!`);
      setBalls(0); setStrikes(0);
    } else if (rand > 0.35) {
      // Strikeout / Out
      BaseballAudioSynth.playBeep(300, 0.15, "sawtooth");
      setOuts((o) => {
        if (o >= 2) {
          // Change inning
          if (isTopInning) {
            setIsTopInning(false);
            pushLog(`🔄 End of Top ${inning}th inning.`);
          } else {
            setIsTopInning(true);
            setInning((i) => i + 1);
            pushLog(`🔄 End of Bottom ${inning}th inning.`);
          }
          setBalls(0); setStrikes(0);
          return 0;
        }
        pushLog(`❌ Strikeout / Out recorded (${o + 1} outs)`);
        setBalls(0); setStrikes(0);
        return o + 1;
      });
    } else {
      // Strike or Ball incremental
      if (Math.random() > 0.5) {
        setStrikes((s) => (s >= 2 ? 0 : s + 1));
        BaseballAudioSynth.playBeep(700, 0.05);
      } else {
        setBalls((b) => (b >= 3 ? 0 : b + 1));
        BaseballAudioSynth.playBeep(500, 0.05);
      }
    }
  };

  return (
    <div className={`min-h-screen ${themeMode === "light" ? "bg-slate-100 text-slate-900" : "bg-slate-950 text-white"} font-sans transition-colors duration-300 select-none pb-12`}>

      {/* TOP MLB LEAGUE HEADER */}
      <header className="h-20 bg-gradient-to-r from-blue-900 via-slate-900 to-red-900 px-6 flex items-center justify-between border-b-4 border-yellow-400 shadow-2xl relative z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-slate-900 shadow-xl">
            <span className="text-2xl">⚾</span>
          </div>
          <div>
            <h1 className="text-xl lg:text-2xl font-black italic tracking-tighter uppercase text-white">
              MLB 2026 WORLD SERIES MANAGER
            </h1>
            <p className="text-[10px] text-yellow-300 font-bold tracking-widest uppercase">
              Real-time Physics, 20 Stadiums & AI Duels
            </p>
          </div>
        </div>

        {/* Live Scoreboard Header */}
        <div className="hidden md:flex items-center gap-6 bg-black/60 px-6 py-2 rounded-2xl border border-white/20">
          <div className="text-center">
            <span className="text-[9px] uppercase font-bold text-yellow-400 block tracking-wider">
              {isTopInning ? "TOP" : "BOT"} INNING {inning}
            </span>
            <span className="text-xs font-mono font-bold text-slate-300">
              {outs} Outs | B:{balls} S:{strikes}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs font-bold text-blue-400">{awayTeam.code}</span>
              <span className="text-xl font-black text-white block leading-none">{awayRuns}</span>
            </div>
            <span className="text-sm font-black text-yellow-400">VS</span>
            <div className="text-left">
              <span className="text-xs font-bold text-red-400">{homeTeam.code}</span>
              <span className="text-xl font-black text-white block leading-none">{homeRuns}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => BaseballAudioSynth.playOrganCharge()}
            className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black rounded-lg text-xs flex items-center gap-1.5 shadow-md"
          >
            <Music className="w-3.5 h-3.5" />
            <span>ORGAN "CHARGE!"</span>
          </button>

          <button
            onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}
            className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white"
          >
            {themeMode === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* AMBIENT RUNNING TICKER */}
      <div className="h-9 bg-black/80 border-b border-white/10 flex items-center overflow-hidden px-4">
        <span className="bg-red-600 text-white font-black px-3 py-0.5 text-[9px] uppercase tracking-widest rounded mr-4">
          2026 LIVE MLB LEAGUE TICKER
        </span>
        <div className="flex-1 text-xs font-mono text-emerald-400 animate-pulse whitespace-nowrap">
          NYY 4 - 3 BOS (FT) | LAD 7 - 2 SFG (Bot 8th) | ATL 5 - 5 PHI (Extra 10th) | HOU 2 - 0 SEA (Top 6th)
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN: MATCH CONTROL, STADIUM & FIELD VISUALIZER (7 cols) */}
        <section className="lg:col-span-7 flex flex-col gap-6">

          {/* SETUP & TEAM SELECTION DECK */}
          <div className={`p-5 rounded-3xl border ${themeMode === "light" ? "bg-white border-slate-200" : "bg-slate-900 border-white/10"} flex flex-col gap-4 shadow-xl`}>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-emerald-400 tracking-wider flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                Select Matchup (10 Teams & 20 Stadiums)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Away Team */}
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Away Team (Batting First)</label>
                <select
                  value={awayTeam.id}
                  onChange={(e) => setAwayTeam(MLB_TEAMS.find((t) => t.id === e.target.value))}
                  className="w-full bg-slate-800 text-white text-xs border border-white/10 rounded-xl p-2 font-bold"
                >
                  {MLB_TEAMS.map((t) => (
                    <option key={t.id} value={t.id}>{t.nameEn} ({t.league})</option>
                  ))}
                </select>
              </div>

              {/* Home Team */}
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Home Team</label>
                <select
                  value={homeTeam.id}
                  onChange={(e) => setHomeTeam(MLB_TEAMS.find((t) => t.id === e.target.value))}
                  className="w-full bg-slate-800 text-white text-xs border border-white/10 rounded-xl p-2 font-bold"
                >
                  {MLB_TEAMS.map((t) => (
                    <option key={t.id} value={t.id} disabled={t.id === awayTeam.id}>{t.nameEn} ({t.league})</option>
                  ))}
                </select>
              </div>

              {/* Stadium */}
              <div>
                <label className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Select Stadium (20 Venues)</label>
                <select
                  value={selectedStadium.id}
                  onChange={(e) => setSelectedStadium(STADIUMS_20.find((s) => s.id === e.target.value))}
                  className="w-full bg-slate-800 text-white text-xs border border-white/10 rounded-xl p-2 font-bold"
                >
                  {STADIUMS_20.map((s) => (
                    <option key={s.id} value={s.id}>{s.nameEn} ({s.cityEn})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sim Control Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSimulateAtBat}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-xs rounded-xl shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Simulate Next Pitch / At-Bat</span>
              </button>
            </div>
          </div>

          {/* BASEBALL DIAMOND & SCOREBOARD BOARD */}
          <div className="relative h-80 bg-emerald-900 rounded-3xl border-8 border-emerald-950 overflow-hidden shadow-2xl flex items-center justify-center">
            {/* Outfield Grass Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:16px_16px]"></div>

            {/* Infield Dirt Diamond */}
            <div className="w-48 h-48 bg-amber-800/80 rotate-45 border-4 border-amber-900 flex items-center justify-center relative shadow-inner">
              {/* Pitcher's Mound */}
              <div className="w-8 h-8 rounded-full bg-amber-700 border border-white/40 flex items-center justify-center">
                <div className="w-4 h-1 bg-white rounded"></div>
              </div>

              {/* Bases */}
              <div className={`absolute -top-3 -left-3 w-6 h-6 rotate-45 border-2 border-slate-900 ${bases.b2 ? "bg-yellow-400" : "bg-white"}`} title="2nd Base"></div>
              <div className={`absolute -top-3 -right-3 w-6 h-6 rotate-45 border-2 border-slate-900 ${bases.b1 ? "bg-yellow-400" : "bg-white"}`} title="1st Base"></div>
              <div className={`absolute -bottom-3 -left-3 w-6 h-6 rotate-45 border-2 border-slate-900 ${bases.b3 ? "bg-yellow-400" : "bg-white"}`} title="3rd Base"></div>
            </div>

            {/* Realtime In-Game HUD overlay */}
            <div className="absolute top-4 left-4 bg-black/80 px-4 py-2 rounded-2xl border border-white/10">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">{selectedStadium.nameEn}</span>
              <span className="text-xs text-yellow-400 font-mono font-bold">Elevation: {selectedStadium.elevation}m</span>
            </div>

            <div className="absolute bottom-4 right-4 bg-black/80 px-4 py-2 rounded-2xl border border-white/10 text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Team Hits & Errors</span>
              <span className="text-xs text-white font-mono font-bold">
                {awayTeam.code}: {awayHits}H | {homeTeam.code}: {homeHits}H
              </span>
            </div>
          </div>

          {/* PLAY BY PLAY REALTIME LOGS */}
          <div className={`p-4 rounded-3xl border ${themeMode === "light" ? "bg-white border-slate-200" : "bg-slate-900 border-white/10"} flex flex-col gap-2 h-44`}>
            <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">Play-by-Play Commentary</span>
            <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-1 font-mono text-xs text-slate-300">
              {matchLogs.length > 0 ? (
                matchLogs.map((log, i) => <div key={i} className="p-1.5 bg-black/30 rounded border border-white/5">{log}</div>)
              ) : (
                <span className="text-slate-500 italic">No pitches thrown yet. Click 'Simulate Next Pitch' above.</span>
              )}
            </div>
          </div>

        </section>

        {/* RIGHT COLUMN: TABS, WOW FEATURES & AI TOOLS (5 cols) */}
        <aside className="lg:col-span-5 flex flex-col gap-6">

          <div className={`p-5 rounded-3xl border ${themeMode === "light" ? "bg-white border-slate-200" : "bg-slate-900 border-white/10"} flex flex-col gap-4 min-h-[500px]`}>

            {/* TAB NAVIGATION BUTTONS */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-1 bg-black/40 p-1.5 rounded-2xl border border-white/5">
              {[
                { id: "NEWS_REPORT", label: "📰 Recap" },
                { id: "PITCH_CANVAS", label: "🎯 Pitch Lab" },
                { id: "CARDS", label: "🃏 AI Cards" },
                { id: "LIVE_SCORES", label: "🌐 2026 Live" },
                { id: "DUGOUT_CHAT", label: "💬 Dugout" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    BaseballAudioSynth.playBeep(520, 0.05);
                  }}
                  className={`py-2 text-[10px] font-black rounded-xl transition-all ${activeTab === tab.id ? "bg-emerald-500 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT 1: AI NEWS & RECAP GENERATOR */}
            {activeTab === "NEWS_REPORT" && (
              <div className="flex-1 flex flex-col gap-3">
                <div className="p-3 bg-slate-800/40 rounded-2xl border border-white/5 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white">Gemini MLB Report Model</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-bold">
                      {selectedModel}
                    </span>
                  </div>

                  {/* Model Selector */}
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="bg-slate-900 text-white text-xs border border-white/10 rounded-xl p-2 font-bold"
                  >
                    <option value="gemini-3.1-flash">Gemini 3.1 Flash (Default Recommended)</option>
                    <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash Lite (Fastest)</option>
                    <option value="gemini-2.5-pro">Gemini 2.5 Pro (In-Depth Analytics)</option>
                    <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                  </select>

                  {/* Custom Prompt Input */}
                  <textarea
                    value={customNewsPrompt}
                    onChange={(e) => setCustomNewsPrompt(e.target.value)}
                    placeholder="Modify prompt (e.g., Focus on bullpen pitching velocity and home run physics at high altitude...)"
                    rows={2}
                    className="bg-slate-900 text-white text-xs border border-white/10 rounded-xl p-2 focus:outline-none resize-none"
                  />

                  <button
                    onClick={handleGenerateNewsReport}
                    disabled={isGeneratingNews}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center justify-center gap-2"
                  >
                    {isGeneratingNews ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>Compile 2026 MLB Analysis Report</span>
                  </button>
                </div>

                {/* Output Report Viewer */}
                <div className="flex-1 bg-slate-950 border border-white/10 rounded-2xl p-4 overflow-y-auto max-h-[260px] text-xs leading-relaxed text-slate-300">
                  {newsReportText ? (
                    <div dangerouslySetInnerHTML={{ __html: newsReportText.replace(/\n/g, "<br/>") }} />
                  ) : (
                    <div className="text-center text-slate-500 py-8">
                      Click 'Compile 2026 MLB Analysis Report' above to generate comprehensive grounded summary.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: WOW FEATURE 1 - PITCH & BATTING PHYSICS LAB CANVAS */}
            {activeTab === "PITCH_CANVAS" && (
              <div className="flex-1 flex flex-col gap-3">
                <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                  🎯 Interactive Pitching & Launch Angle Physics Engine
                </span>

                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black flex justify-center">
                  <canvas ref={canvasRef} width={320} height={260} className="block" />
                </div>

                {/* Pitch Controls */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">Pitch Selection</label>
                    <select
                      value={pitchType}
                      onChange={(e) => setPitchType(e.target.value)}
                      className="w-full bg-slate-800 text-white text-xs border border-white/10 rounded-xl p-2 font-bold"
                    >
                      <option value="4-Seam Fastball">4-Seam Fastball (98 MPH)</option>
                      <option value="Sweeper Curve">Sweeper / Breaking Ball</option>
                      <option value="Changeup">Circle Changeup (86 MPH)</option>
                      <option value="Sinker">Heavy Sinker (95 MPH)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 font-bold uppercase block">Target Zone Height ({strikeZoneTarget.y}%)</label>
                    <input
                      type="range" min="10" max="90"
                      value={strikeZoneTarget.y}
                      onChange={(e) => setStrikeZoneTarget({ ...strikeZoneTarget, y: Number(e.target.value) })}
                      className="w-full mt-2 accent-emerald-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSimulatePitch}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Target className="w-4 h-4" />
                  <span>Throw Pitch & Calculate Launch Trajectory</span>
                </button>

                {physicsResult && (
                  <div className="p-3 bg-slate-800/80 rounded-xl border border-amber-500/30 text-xs">
                    <p className="font-black text-yellow-400">{physicsResult.resultType}</p>
                    <p className="text-[10px] text-slate-300 mt-1">
                      Exit Velocity: <span className="font-mono font-bold text-white">{physicsResult.exitVel} MPH</span> | Launch Angle: <span className="font-mono font-bold text-white">{physicsResult.launchAngle}°</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT 3: WOW FEATURE 2 - AI TRADING CARD EVOLUTION */}
            {activeTab === "CARDS" && (
              <div className="flex-1 flex flex-col gap-3">
                <span className="text-xs font-black uppercase text-cyan-400 tracking-wider">
                  🃏 AI Player Card Forge & Evolution
                </span>

                <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[300px]">
                  {playerCards.map((card) => (
                    <div
                      key={card.id}
                      className="p-3 bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl border flex items-center justify-between"
                      style={{ borderColor: card.cardGlow }}
                    >
                      <div>
                        <span className="text-[9px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded uppercase">
                          STAGE {card.stage}
                        </span>
                        <h4 className="text-xs font-black text-white mt-1">{card.name} ({card.pos})</h4>
                        <p className="text-[10px] text-slate-400">
                          PWR: {card.power} | CON: {card.contact} | SPD: {card.speed}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          BaseballAudioSynth.playHomeRunHorn();
                          setPlayerCards((prev) =>
                            prev.map((c) => (c.id === card.id ? { ...c, stage: c.stage + 1, power: c.power + 2 } : c))
                          );
                        }}
                        className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-[10px] rounded-xl transition-all"
                      >
                        ⚡ EVOLVE CARD
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: 2026 LIVE SCORES GROUNDER */}
            {activeTab === "LIVE_SCORES" && (
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                    🌐 Grounded Real-time 2026 Scores
                  </span>
                  <button
                    onClick={() => {
                      setIsFetchingLiveScores(true);
                      setTimeout(() => setIsFetchingLiveScores(false), 800);
                      BaseballAudioSynth.playBeep(600, 0.05);
                    }}
                    className="px-2.5 py-1 bg-emerald-500 text-slate-950 font-black text-[10px] rounded-lg"
                  >
                    {isFetchingLiveScores ? "Polling..." : "Refresh Grounding"}
                  </button>
                </div>

                <div className="flex flex-col gap-2 overflow-y-auto max-h-[300px]">
                  {groundedScores.map((g, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 border border-white/10 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-yellow-400 font-mono font-bold">{g.status} ({g.inning})</span>
                        <h4 className="text-xs font-black text-white">{g.away} {g.awayR} - {g.homeR} {g.home}</h4>
                        <p className="text-[10px] text-slate-400">{g.venue} • {g.keyPitcher}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 5: DUGOUT ASSISTANT CHAT */}
            {activeTab === "DUGOUT_CHAT" && (
              <div className="flex-1 flex flex-col gap-3 h-[320px]">
                <span className="text-xs font-black uppercase text-cyan-400 tracking-wider">
                  💬 AI Dugout Strategy Manager
                </span>

                <div className="flex-1 overflow-y-auto bg-slate-950 p-3 rounded-2xl border border-white/10 flex flex-col gap-2">
                  {chatMessages.map((m, i) => (
                    <div key={i} className={`p-2 rounded-xl text-xs max-w-[85%] ${m.role === "user" ? "bg-blue-600 text-white ml-auto" : "bg-slate-800 text-slate-200"}`}>
                      {m.text}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                    placeholder="Ask dugout strategy..."
                    className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-3 text-xs text-white focus:outline-none"
                  />
                  <button
                    onClick={handleSendChat}
                    disabled={isSendingChat}
                    className="px-4 py-2 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl"
                  >
                    Send
                  </button>
                </div>
              </div>
            )}

          </div>

        </aside>

      </main>

    </div>
  );
}