import React, { useState, useEffect } from "react";
import {
  Flame,
  Star,
  Zap,
  Lock,
  Plus,
  X,
  CheckCircle,
  AlertCircle,
  Trophy,
  Award,
  Settings,
  RotateCcw,
  Coins,
  Sparkles,
  User,
  Check,
} from "lucide-react";

// ISHA YOGA TRACKER v6.1 - TODAS LAS CORRECCIONES APLICADAS
// - Programas corregidos (solo 3 reales)
// - Prácticas en sección correcta
// - Shambhavi 2x al día
// - Calendario bloqueado hasta Ingeniería Interior
// - Diseño del jardín mejorado

const IshaTrackerApp = () => {
  const [currentView, setCurrentView] = useState("home");

  // Estados compartidos
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem("ishaTrackerCoins");
    return saved ? parseInt(saved) : 0;
  });

  const [soilContent, setSoilContent] = useState(() => {
    const saved = localStorage.getItem("ishaTrackerSoil");
    return saved ? parseFloat(saved) : 1.0;
  });

  const [currentDay, setCurrentDay] = useState(() => {
    const saved = localStorage.getItem("ishaTrackerDay");
    return saved ? parseInt(saved) : 1;
  });

  const [practiceCalendar, setPracticeCalendar] = useState(() => {
    const saved = localStorage.getItem("ishaTrackerCalendar");
    return saved ? JSON.parse(saved) : {};
  });

  const [totalXP, setTotalXP] = useState(() => {
    const saved = localStorage.getItem("ishaTrackerXP");
    return saved ? parseInt(saved) : 0;
  });

  const [clarity, setClarity] = useState(() => {
    const saved = localStorage.getItem("ishaTrackerClarity");
    return saved ? parseInt(saved) : 0;
  });

  const [intensity, setIntensity] = useState(() => {
    const saved = localStorage.getItem("ishaTrackerIntensity");
    return saved ? parseInt(saved) : 0;
  });

  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem("ishaTrackerBalance");
    return saved ? parseInt(saved) : 0;
  });

  const [vitality, setVitality] = useState(() => {
    const saved = localStorage.getItem("ishaTrackerVitality");
    return saved ? parseInt(saved) : 0;
  });

  const [completedPrograms, setCompletedPrograms] = useState(() => {
    const saved = localStorage.getItem("ishaTrackerPrograms");
    return saved ? JSON.parse(saved) : [];
  });

  const [unlockedPractices, setUnlockedPractices] = useState(() => {
    const saved = localStorage.getItem("ishaTrackerUnlocked");
    return saved
      ? JSON.parse(saved)
      : ["isha_kriya", "chit_exito", "chit_salud", "chit_amor", "chit_paz"];
  });

  const [todayCount, setTodayCount] = useState({});
  const [practiceMinutes, setPracticeMinutes] = useState({});
  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    const saved = localStorage.getItem("ishaTrackerBadges");
    return saved ? JSON.parse(saved) : [];
  });

  const [milagroMinutesToday, setMilagroMinutesToday] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(() => {
    const saved = localStorage.getItem("ishaTrackerStreak");
    return saved ? parseInt(saved) : 0;
  });

  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [programToUnlock, setProgramToUnlock] = useState(null);
  const [demoMode] = useState(true);
  const [showAchievementPopup, setShowAchievementPopup] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [showAvatarCustomizer, setShowAvatarCustomizer] = useState(false);
  const [userName, setUserName] = useState(() => {
    const saved = localStorage.getItem("ishaTrackerName");
    return saved || "Balam";
  });
  const [avatarGender, setAvatarGender] = useState(() => {
    const saved = localStorage.getItem("ishaTrackerGender");
    return saved || "male";
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showAdminDemo, setShowAdminDemo] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const [gardenPlants, setGardenPlants] = useState(() => {
    const saved = localStorage.getItem("ishaGardenPlants");
    return saved ? JSON.parse(saved) : Array(12).fill(null);
  });

  const [showShopModal, setShowShopModal] = useState(false);
  const [showPlantInfoModal, setShowPlantInfoModal] = useState(false);
  const [selectedPlantInfo, setSelectedPlantInfo] = useState(null);
  const [gardenMessage, setGardenMessage] = useState({
    show: false,
    text: "",
    type: "",
  });

  useEffect(() => {
    localStorage.setItem("ishaTrackerCoins", coins);
    localStorage.setItem("ishaTrackerSoil", soilContent);
    localStorage.setItem("ishaTrackerDay", currentDay);
    localStorage.setItem(
      "ishaTrackerCalendar",
      JSON.stringify(practiceCalendar)
    );
    localStorage.setItem("ishaTrackerXP", totalXP);
    localStorage.setItem("ishaTrackerClarity", clarity);
    localStorage.setItem("ishaTrackerIntensity", intensity);
    localStorage.setItem("ishaTrackerBalance", balance);
    localStorage.setItem("ishaTrackerVitality", vitality);
    localStorage.setItem(
      "ishaTrackerPrograms",
      JSON.stringify(completedPrograms)
    );
    localStorage.setItem(
      "ishaTrackerUnlocked",
      JSON.stringify(unlockedPractices)
    );
    localStorage.setItem("ishaTrackerBadges", JSON.stringify(unlockedBadges));
    localStorage.setItem("ishaTrackerStreak", currentStreak);
    localStorage.setItem("ishaTrackerName", userName);
    localStorage.setItem("ishaTrackerGender", avatarGender);
    localStorage.setItem("ishaGardenPlants", JSON.stringify(gardenPlants));
  }, [
    coins,
    soilContent,
    currentDay,
    practiceCalendar,
    totalXP,
    clarity,
    intensity,
    balance,
    vitality,
    completedPrograms,
    unlockedPractices,
    unlockedBadges,
    currentStreak,
    userName,
    avatarGender,
    gardenPlants,
  ]);

  const MAIN_PRACTICES = [
    "shambhavi",
    "shakti",
    "shunya",
    "yogasanas",
    "surya_kriya",
    "samyama_proceso",
    "samyama_observacion",
  ];

  const SOIL_CONFIG = {
    INCREMENT: 0.0556,
    DECREMENT: 0.714,
    MIN: 0.0,
    MAX: 8.0,
  };

  const PLANTS_DATA = {
    dalia: {
      id: "dalia",
      name: "Dalia",
      scientificName: "Dahlia pinnata",
      origin: "México",
      requiredLevel: 1,
      price: 50,
      description: "Flor nacional de México, símbolo de la diversidad",
      color: "#E63946",
    },
    orquidea: {
      id: "orquidea",
      name: "Orquídea Cattleya",
      scientificName: "Cattleya trianae",
      origin: "Colombia",
      requiredLevel: 2,
      price: 100,
      description: "Flor nacional de Colombia, elegancia tropical",
      color: "#C77DFF",
    },
    pasionaria: {
      id: "pasionaria",
      name: "Pasionaria",
      scientificName: "Passiflora ligularis",
      origin: "Perú",
      requiredLevel: 3,
      price: 150,
      description: "Maracuyá andino, flor de la pasión",
      color: "#7209B7",
    },
    ceibo: {
      id: "ceibo",
      name: "Ceibo",
      scientificName: "Erythrina crista-galli",
      origin: "Argentina",
      requiredLevel: 4,
      price: 200,
      description: "Flor nacional de Argentina y Uruguay",
      color: "#DC2F02",
    },
    copihue: {
      id: "copihue",
      name: "Copihue",
      scientificName: "Lapageria rosea",
      origin: "Chile",
      requiredLevel: 5,
      price: 300,
      description: "Flor nacional de Chile, belleza austral",
      color: "#D90429",
    },
    floripondio: {
      id: "floripondio",
      name: "Floripondio",
      scientificName: "Brugmansia arborea",
      origin: "Ecuador",
      requiredLevel: 6,
      price: 450,
      description: "Trompeta de los Andes, flor sagrada",
      color: "#FFD700",
    },
  };

  // SOLO 3 PROGRAMAS REALES
  const programs = [
    {
      id: "ingenieria_interior",
      name: "Ingeniería Interior",
      desc: "Programa de auto-transformación fundamental",
      icon: "🏛️",
      xpUnlock: 800,
      unlocks: ["shambhavi"],
      prerequisites: ["isha_kriya"],
      color: "from-cyan-600 to-blue-700",
      oneTime: true,
      unlockText: "¿Has completado el programa de Ingeniería Interior?",
    },
    {
      id: "shunya",
      name: "Shunya Intensive",
      desc: "Programa para aprender Shakti Chalana Kriya y Shunya",
      icon: "🌑",
      xpUnlock: 800,
      unlocks: ["shakti", "shunya"],
      prerequisites: ["ingenieria_interior"],
      color: "from-slate-600 to-gray-700",
      oneTime: true,
      unlockText: "¿Has completado Shunya Intensive?",
    },
    {
      id: "bhava_spandana",
      name: "Bhava Spandana",
      desc: "Programa intensivo - Duplica beneficios de Shambhavi permanentemente",
      icon: " ❤️",
      xpUnlock: 1200,
      unlocks: [],
      boostsPractice: "shambhavi",
      prerequisites: ["ingenieria_interior"],
      color: "from-orange-600 to-red-700",
      oneTime: true,
    },
    {
      id: "samyama",
      name: "Samyama",
      desc: "Programa de 8 semanas de meditación avanzada",
      icon: "🌌",
      xpUnlock: 2000,
      unlocks: ["samyama_proceso", "samyama_observacion"],
      prerequisites: ["bhava_spandana", "shunya", "yogasanas", "surya_kriya"],
      color: "from-purple-600 to-indigo-700",
      oneTime: true,
      unlockText: "¿Has completado el programa Samyama?",
    },
  ];

  // TODAS LAS PRÁCTICAS (valores originales restaurados)
  const allPracticesData = [
    // Kriyas principales - 1 a 2 veces al día
    {
      id: "shambhavi",
      name: "Shambhavi Mahamudra",
      minDaily: 1,
      maxDaily: 2,
      unit: "práctica",
      xpBase: 50,
      coinsBase: 10,
      xpUnlock: 200,
      qualities: { clarity: 5, intensity: 4, balance: 3, vitality: 2 },
      category: "Kriyas",
      unlockText: "¿Has aprendido esta práctica?",
      programUnlock: "ingenieria_interior",
    },
    {
      id: "shakti",
      name: "Shakti Chalana Kriya",
      minDaily: 1,
      maxDaily: 2,
      unit: "práctica",
      xpBase: 60,
      coinsBase: 12,
      xpUnlock: 200,
      qualities: { intensity: 6, vitality: 3 },
      category: "Kriyas",
      unlockText: "¿Has aprendido esta práctica?",
      programUnlock: "shunya",
    },
    {
      id: "Shunya",
      name: "Shunya Intensivo",
      minDaily: 1,
      maxDaily: 2,
      unit: "práctica",
      xpBase: 80,
      coinsBase: 16,
      xpUnlock: 300,
      qualities: { clarity: 8, balance: 4 },
      category: "Kriyas",
      unlockText: "¿Has aprendido esta práctica?",
      programUnlock: "shunya",
    },

    // Samyama Observación - mínimo 40 min, sin máximo

    {
      id: "samyama_observacion",
      name: "Samyama - Observación",
      minDaily: 40,
      maxDaily: 720,
      unit: "min",
      increment: 10,
      xpBase: 50,
      coinsBase: 10,
      xpBonus: 4,
      xpUnlock: 200,
      qualities: { balance: 5, vitality: 2 },
      category: "Samyama",
      unlockText: "¿Has aprendido esta práctica?",
      programUnlock: "samyama",
      isMinutePractice: true,
    },

    // Surya Kriya - 1 a 12 veces
    {
      id: "surya_kriya",
      name: "Surya Kriya",
      minDaily: 1,
      maxDaily: 12,
      unit: "práctica",
      xpBase: 30,
      coinsBase: 6,
      xpBonus: 5,
      xpUnlock: 100,
      qualities: { vitality: 4, intensity: 3 },
      category: "Hatha Yoga",
      unlockText: "¿Has aprendido esta práctica?",
      isProgramUnlockable: true,
    },

    // Surya Shakti - 1 a 108 veces
    {
      id: "surya_shakti",
      name: "Surya Shakti",
      minDaily: 1,
      maxDaily: 108,
      unit: "práctica",
      xpBase: 40,
      coinsBase: 8,
      xpUnlock: 80,
      qualities: { vitality: 6, intensity: 2 },
      category: "Hatha Yoga",
      unlockText: "¿Has aprendido esta práctica?",
      isProgramUnlockable: true,
    },

    // Milagro de la mente - opciones específicas
    {
      id: "milagro_mente",
      name: "Milagro de la Mente",
      unit: "min",
      xpBase: 15,
      xpBonus: 5,
      coinsBase: 3,
      coinsBonus: 1,
      xpUnlock: 40,
      qualities: {},
      category: "Milagro de la Mente",
      unlockText: "¿Ya descargaste esta app? Te da un boost %",
      isOnline: true,
      isProgramUnlockable: true,
    },

    // Todas las demás prácticas - SOLO 1 vez al día (0-1)
    {
      id: "isha_kriya",
      name: "Isha Kriya",
      minDaily: 0,
      maxDaily: 2,
      unit: "check",
      xpBase: 25,
      coinsBase: 5,
      xpUnlock: 100,
      qualities: { balance: 3, clarity: 2 },
      category: "Meditaciones",
      isOnline: true,
    },
    {
      id: "samyama_proceso",
      name: "Samyama - Proceso",
      minDaily: 0,
      maxDaily: 1,
      unit: "check",
      xpBase: 100,
      coinsBase: 20,
      xpUnlock: 300,
      qualities: { clarity: 10, intensity: 6 },
      category: "Samyama",
      unlockText: "¿Has aprendido esta práctica?",
      programUnlock: "samyama",
    },
    {
      id: "yogasanas",
      name: "Yogasanas",
      minDaily: 0,
      maxDaily: 1,
      unit: "check",
      xpBase: 45,
      coinsBase: 9,
      xpUnlock: 50,
      qualities: { balance: 5, vitality: 3 },
      category: "Hatha Yoga",
      unlockText: "¿Has aprendido esta práctica?",
      isProgramUnlockable: true,
    },
    {
      id: "angamardana",
      name: "Angamardana",
      minDaily: 0,
      maxDaily: 1,
      unit: "check",
      xpBase: 45,
      coinsBase: 9,
      xpUnlock: 80,
      qualities: { vitality: 7, intensity: 2 },
      category: "Hatha Yoga",
      unlockText: "¿Has aprendido esta práctica?",
      isProgramUnlockable: true,
    },
    {
      id: "bhastrika_kriya",
      name: "Bhastrika Kriya",
      minDaily: 0,
      maxDaily: 1,
      unit: "check",
      xpBase: 25,
      coinsBase: 5,
      xpUnlock: 50,
      qualities: { vitality: 3, balance: 2 },
      category: "Hatha Yoga",
      unlockText: "¿Has aprendido esta práctica?",
      isProgramUnlockable: true,
    },
    {
      id: "yoga_namaskar",
      name: "Yoga Namaskar",
      minDaily: 1,
      maxDaily: 33,
      unit: "práctica",
      xpBase: 20,
      coinsBase: 4,
      xpBonus: 2,
      xpUnlock: 40,
      qualities: { vitality: 2, balance: 2 },
      category: "Upa Yoga",
      unlockText: "¿Has aprendido esta práctica?",
      isProgramUnlockable: true,
    },
    {
      id: "bhuta_shuddhi",
      name: "Bhuta Shuddhi",
      minDaily: 0,
      maxDaily: 1,
      unit: "check",
      xpBase: 35,
      coinsBase: 7,
      xpUnlock: 80,
      qualities: { balance: 4, vitality: 3 },
      category: "Kriyas Avanzadas",
      unlockText: "¿Has aprendido esta práctica?",
      isProgramUnlockable: true,
    },
    {
      id: "simha_kriya",
      name: "Simha Kriya",
      minDaily: 0,
      maxDaily: 1,
      unit: "check",
      xpBase: 30,
      coinsBase: 6,
      xpUnlock: 60,
      qualities: { vitality: 4 },
      category: "Kriyas Avanzadas",
      unlockText: "¿Has aprendido esta práctica?",
      isProgramUnlockable: true,
    },
    {
      id: "movimientos_laterales",
      name: "Movimientos Laterales",
      minDaily: 0,
      maxDaily: 1,
      unit: "check",
      xpBase: 10,
      coinsBase: 2,
      xpUnlock: 20,
      qualities: { vitality: 1 },
      category: "Upa Yoga",
      unlockText: "¿Has aprendido esta práctica?",
      isOnline: true,
      isProgramUnlockable: true,
    },
    {
      id: "movimientos_cuello",
      name: "Movimientos de Cuello",
      minDaily: 0,
      maxDaily: 1,
      unit: "check",
      xpBase: 10,
      coinsBase: 2,
      xpUnlock: 20,
      qualities: { clarity: 1 },
      category: "Upa Yoga",
      unlockText: "¿Has aprendido esta práctica?",
      isOnline: true,
      isProgramUnlockable: true,
    },
    {
      id: "nadi_shuddhi",
      name: "Nadi Shuddhi",
      minDaily: 1,
      maxDaily: 21,
      unit: "min",
      increment: 1,
      xpBase: 20,
      coinsBase: 4,
      xpBonus: 1,
      xpUnlock: 40,
      qualities: { balance: 2 },
      category: "Upa Yoga",
      unlockText: "¿Has aprendido esta práctica?",
      isOnline: true,
      isProgramUnlockable: true,
      isMinutePractice: true,
    },
    {
      id: "chit_exito",
      name: "Chit Shakti - Éxito",
      minDaily: 0,
      maxDaily: 1,
      unit: "check",
      xpBase: 20,
      coinsBase: 4,
      xpUnlock: 50,
      qualities: { clarity: 3 },
      category: "Chit Shakti",
      isOnline: true,
    },
    {
      id: "chit_salud",
      name: "Chit Shakti - Salud",
      minDaily: 0,
      maxDaily: 1,
      unit: "check",
      xpBase: 20,
      coinsBase: 4,
      xpUnlock: 50,
      qualities: { vitality: 3 },
      category: "Chit Shakti",
      isOnline: true,
    },
    {
      id: "chit_amor",
      name: "Chit Shakti - Amor",
      minDaily: 0,
      maxDaily: 1,
      unit: "check",
      xpBase: 20,
      coinsBase: 4,
      xpUnlock: 50,
      qualities: { balance: 3 },
      category: "Chit Shakti",
      isOnline: true,
    },
    {
      id: "chit_paz",
      name: "Chit Shakti - Paz",
      minDaily: 0,
      maxDaily: 1,
      unit: "check",
      xpBase: 20,
      coinsBase: 4,
      xpUnlock: 50,
      qualities: { balance: 3 },
      category: "Chit Shakti",
      isOnline: true,
    },
  ];
  const achievements = [
    {
      id: "itzamna",
      name: "Itzamná",
      desc: "21 días seguidos - Shambhavi 2 veces al día",
      type: "streak_double",
      practiceId: "shambhavi",
      days: 21,
      dailyCount: 2,
      xp: 300,
      coins: 75,
      requirement:
        "Completa Shambhavi Mahamudra 2 veces al día durante 21 días consecutivos",
    },
    {
      id: "quetzalcoatl",
      name: "Quetzalcóatl",
      desc: "40 días seguidos - Shambhavi 2 veces al día",
      type: "streak_double",
      practiceId: "shambhavi",
      days: 40,
      dailyCount: 2,
      xp: 600,
      coins: 150,
      requirement:
        "Completa Shambhavi Mahamudra 2 veces al día durante 40 días consecutivos",
    },
    {
      id: "chalchiuhtlicue",
      name: "Chalchiuhtlicue",
      desc: "21 días seguidos - Shakti Chalana 2 veces al día",
      type: "streak_double",
      practiceId: "shakti",
      days: 21,
      dailyCount: 2,
      xp: 300,
      coins: 75,
      requirement:
        "Completa Shakti Chalana Kriya 2 veces al día durante 21 días consecutivos",
    },
    {
      id: "coatlicue",
      name: "Coatlicue",
      desc: "40 días seguidos - Shakti Chalana 2 veces al día",
      type: "streak_double",
      practiceId: "shakti",
      days: 40,
      dailyCount: 2,
      xp: 600,
      coins: 150,
      requirement:
        "Completa Shakti Chalana Kriya 2 veces al día durante 40 días consecutivos",
    },
    {
      id: "hunab_ku",
      name: "Hunab Ku",
      desc: "21 días seguidos - Mínimo 3 prácticas de Hatha Yoga al día",
      type: "streak_hatha",
      days: 21,
      minDaily: 3,
      xp: 350,
      coins: 90,
      requirement:
        "Completa al menos 3 prácticas de Hatha Yoga al día durante 21 días consecutivos",
    },
    {
      id: "tonatiuh",
      name: "Tonatiuh",
      desc: "6 ciclos de Surya Kriya en un día",
      type: "single_day_cycles",
      practiceId: "surya_kriya",
      cycles: 6,
      xp: 200,
      coins: 50,
      requirement: "Completa 6 ciclos de Surya Kriya en un solo día",
    },
    {
      id: "huitzilopochtli",
      name: "Huitzilopochtli",
      desc: "12 ciclos de Surya Kriya en un día",
      type: "single_day_cycles",
      practiceId: "surya_kriya",
      cycles: 12,
      xp: 400,
      coins: 100,
      requirement: "Completa 12 ciclos de Surya Kriya en un solo día",
    },
    {
      id: "tezcatlipoca",
      name: "Tezcatlipoca",
      desc: "Las 4 Chit Shakti en un día",
      type: "chit_all_day",
      xp: 150,
      coins: 40,
      requirement: "Completa las 4 meditaciones de Chit Shakti en un solo día",
    },
    {
      id: "pachamama",
      name: "Pachamama",
      desc: "40 días seguidos - Isha Kriya 2 veces al día",
      type: "streak_double",
      practiceId: "isha_kriya",
      days: 40,
      dailyCount: 2,
      xp: 550,
      coins: 140,
      requirement:
        "Completa Isha Kriya 2 veces al día durante 40 días consecutivos",
    },
    {
      id: "viracocha",
      name: "Viracocha",
      desc: "60 días - Práctica completa diaria",
      type: "streak_complex",
      days: 60,
      xp: 1000,
      coins: 250,
      requirement:
        "Durante 60 días consecutivos: 1 Shambhavi + 1 Shakti + 2 shunya + (1 Yogasanas O 1 Surya Kriya)",
    },
    {
      id: "mama_quilla",
      name: "Mama Quilla",
      desc: "40 días seguidos - Bhuta Shuddhi",
      type: "streak_simple",
      practiceId: "bhuta_shuddhi",
      days: 40,
      xp: 500,
      coins: 125,
      requirement: "Completa Bhuta Shuddhi durante 40 días consecutivos",
    },
    {
      id: "inti",
      name: "Inti",
      desc: "21 días seguidos - Yoga Namaskar",
      type: "streak_simple",
      practiceId: "yoga_namaskar",
      days: 21,
      xp: 300,
      coins: 75,
      requirement: "Completa Yoga Namaskar durante 21 días consecutivos",
    },
    {
      id: "kon",
      name: "Kon",
      desc: "21 días - Combo de purificación",
      type: "streak_combo",
      days: 21,
      practices: [
        "simha_kriya",
        "bhuta_shuddhi",
        "movimientos_laterales",
        "chit_salud",
      ],
      xp: 400,
      coins: 100,
      requirement:
        "21 días consecutivos: Simha Kriya + Bhuta Shuddhi + Movimientos Laterales + Chit Shakti Salud",
    },
    {
      id: "ehecatl",
      name: "Ehecatl",
      desc: "7 días - Combo de manifestación",
      type: "streak_combo",
      days: 7,
      practices: ["chit_exito", "movimientos_cuello"],
      xp: 150,
      coins: 40,
      requirement:
        "7 días consecutivos: Chit Shakti Éxito + Movimientos de Cuello",
    },
  ];

  const allAchievements = achievements;

  const unlockAchievement = (achievementId) => {
    if (unlockedBadges.includes(achievementId)) return;
    const achievement = allAchievements.find((a) => a.id === achievementId);
    if (!achievement) return;
    setUnlockedBadges((prev) => [...prev, achievementId]);
    setTotalXP((prev) => prev + achievement.xp);
    setCoins((prev) => prev + achievement.coins);
    setCurrentAchievement(achievement);
    setShowAchievementPopup(true);
  };

  const checkAchievements = () => {
    achievements.forEach((achievement) => {
      if (unlockedBadges.includes(achievement.id)) return;
      let shouldUnlock = false;
      switch (achievement.type) {
        case "streak_double":
          shouldUnlock = checkStreakDouble(achievement);
          break;
        case "streak_hatha":
          shouldUnlock = checkStreakHatha(achievement);
          break;
        case "single_day_cycles":
          shouldUnlock = checkSingleDayCycles(achievement);
          break;
        case "chit_all_day":
          shouldUnlock = checkChitAllDay(achievement);
          break;
        case "streak_simple":
          shouldUnlock = checkStreakSimple(achievement);
          break;
        case "streak_complex":
          shouldUnlock = checkStreakComplex(achievement);
          break;
        case "streak_combo":
          shouldUnlock = checkStreakCombo(achievement);
          break;
      }
      if (shouldUnlock) unlockAchievement(achievement.id);
    });
  };

  const checkStreakDouble = (achievement) => {
    const { days, practiceId } = achievement;
    for (let i = 0; i < days; i++) {
      const dayNum = currentDay - i;
      const practices = practiceCalendar[dayNum] || [];
      const count = practices.filter((p) => p === practiceId).length;
      if (count < 2) return false;
    }
    return true;
  };

  const checkStreakHatha = (achievement) => {
    const hathaPractices = [
      "yogasanas",
      "surya_kriya",
      "surya_shakti",
      "angamardana",
      "yoga_namaskar",
    ];
    const { days, minDaily } = achievement;
    for (let i = 0; i < days; i++) {
      const dayNum = currentDay - i;
      const practices = practiceCalendar[dayNum] || [];
      const hathaCount = practices.filter((p) =>
        hathaPractices.includes(p)
      ).length;
      if (hathaCount < minDaily) return false;
    }
    return true;
  };

  const checkSingleDayCycles = (achievement) => {
    const { practiceId, cycles } = achievement;
    const todayCycles = getPracticeMinutes(practiceId) || 0;
    return todayCycles >= cycles;
  };

  const checkChitAllDay = () => {
    const chitPractices = ["chit_exito", "chit_salud", "chit_amor", "chit_paz"];
    const todayPractices = practiceCalendar[currentDay] || [];
    return chitPractices.every((p) => todayPractices.includes(p));
  };

  const checkStreakSimple = (achievement) => {
    const { days, practiceId } = achievement;
    for (let i = 0; i < days; i++) {
      const dayNum = currentDay - i;
      const practices = practiceCalendar[dayNum] || [];
      if (!practices.includes(practiceId)) return false;
    }
    return true;
  };

  const checkStreakComplex = (achievement) => {
    const { days } = achievement;
    for (let i = 0; i < days; i++) {
      const dayNum = currentDay - i;
      const practices = practiceCalendar[dayNum] || [];
      if (practices.filter((p) => p === "shambhavi").length < 1) return false;
      if (practices.filter((p) => p === "shakti").length < 1) return false;
      if (practices.filter((p) => p === "shunya").length < 2) return false;
      const hasYogaOrSurya =
        practices.includes("yogasanas") || practices.includes("surya_kriya");
      if (!hasYogaOrSurya) return false;
    }
    return true;
  };

  const checkStreakCombo = (achievement) => {
    const { days, practices: requiredPractices } = achievement;
    for (let i = 0; i < days; i++) {
      const dayNum = currentDay - i;
      const dayPractices = practiceCalendar[dayNum] || [];
      const hasAll = requiredPractices.every((p) => dayPractices.includes(p));
      if (!hasAll) return false;
    }
    return true;
  };

  const getMilagroBoost = () => {
    if (milagroMinutesToday === 0) return 0;
    const boostPercent = Math.min(7 + milagroMinutesToday, 21);
    return boostPercent / 100;
  };

  const getDisplayRewards = (practice) => {
    const isBoosted =
      completedPrograms.includes("bhava_spandana") &&
      practice.id === "shambhavi";
    const boost = isBoosted ? 2 : 1;
    return {
      xp: practice.xpBase * boost,
      coins: practice.coinsBase * boost,
      isBoosted: isBoosted,
    };
  };

  const updateSoilContent = (didPractice) => {
    setSoilContent((prev) => {
      const change = didPractice
        ? SOIL_CONFIG.INCREMENT
        : -SOIL_CONFIG.DECREMENT;
      const newValue = prev + change;
      return Math.max(SOIL_CONFIG.MIN, Math.min(newValue, SOIL_CONFIG.MAX));
    });
  };

  const setSoilManually = (value) => {
    setSoilContent(Math.max(SOIL_CONFIG.MIN, Math.min(value, SOIL_CONFIG.MAX)));
  };

  const advanceDay = () => {
    const todayPractices = practiceCalendar[currentDay] || [];
    const didMainPractice = todayPractices.some((p) =>
      MAIN_PRACTICES.includes(p)
    );
    if (!didMainPractice) {
      updateSoilContent(false);
      witherGardenPlants();
    } else {
      advanceGardenPlants();
    }
    setCurrentDay((prev) => prev + 1);
    setTodayCount({});
    setPracticeMinutes({});
    setMilagroMinutesToday(0);
    setTimeout(() => checkAchievements(), 100);
  };

  const getLast21Days = () => {
    const days = [];
    for (let i = 20; i >= 0; i--) {
      const dayNum = currentDay - i;
      const practices = practiceCalendar[dayNum] || [];
      const hasMainPractice = practices.some((p) => MAIN_PRACTICES.includes(p));
      days.push({
        date: `Día ${dayNum}`,
        dayNumber: dayNum,
        practices: practices.filter((p) => MAIN_PRACTICES.includes(p)),
        hasMainPractice: hasMainPractice,
        isToday: i === 0,
      });
    }
    return days;
  };

  const getLast3DaysDetails = () => {
    const allDays = getLast21Days();
    return allDays.slice(-3);
  };

  const isIngenieriaCompletada = () =>
    completedPrograms.includes("ingenieria_interior");

  const isProgramCompleted = (programId) =>
    completedPrograms.includes(programId);
  const isPracticeUnlocked = (practiceId) =>
    unlockedPractices.includes(practiceId);

  const canCompleteProgram = (program) => {
    if (program.oneTime && isProgramCompleted(program.id)) return false;
    return program.prerequisites.every((prereq) => {
      const practice = allPracticesData.find((p) => p.id === prereq);
      return practice ? isPracticeUnlocked(prereq) : isProgramCompleted(prereq);
    });
  };

  const getMissingPrerequisites = (program) => {
    return program.prerequisites
      .filter((prereq) => {
        const practice = allPracticesData.find((p) => p.id === prereq);
        return practice
          ? !isPracticeUnlocked(prereq)
          : !isProgramCompleted(prereq);
      })
      .map((prereq) => {
        const practice = allPracticesData.find((p) => p.id === prereq);
        return practice
          ? practice.name
          : programs.find((p) => p.id === prereq)?.name;
      });
  };

  const requestProgramUnlock = (program) => {
    if (!canCompleteProgram(program)) return;
    setProgramToUnlock(program);
    setShowUnlockModal(true);
  };

  const confirmProgramCompletion = () => {
    if (!programToUnlock) return;
    setCompletedPrograms((prev) => [...prev, programToUnlock.id]);
    setTotalXP((prev) => prev + programToUnlock.xpUnlock);
    if (programToUnlock.unlocks) {
      programToUnlock.unlocks.forEach((practiceId) => {
        if (!unlockedPractices.includes(practiceId)) {
          setUnlockedPractices((prev) => [...prev, practiceId]);
          const practice = allPracticesData.find((p) => p.id === practiceId);
          if (practice && practice.xpUnlock) {
            setTotalXP((prev) => prev + practice.xpUnlock);
          }
        }
      });
    }
    setShowUnlockModal(false);
    setProgramToUnlock(null);
  };

  const getPracticeCount = (practiceId) => todayCount[practiceId] || 0;
  const getPracticeMinutes = (practiceId) => practiceMinutes[practiceId] || 0;

  const canAddPractice = (practice) => {
    if (!isPracticeUnlocked(practice.id)) return false;
    if (practice.isMilagro) {
      const currentMinutes = getPracticeMinutes(practice.id);
      return currentMinutes < practice.maxDaily;
    }
    if (practice.isCycles) {
      const currentCycles = getPracticeMinutes(practice.id) || 0;
      return currentCycles < practice.maxCycles;
    }
    const count = getPracticeCount(practice.id);
    return count < practice.maxDaily;
  };

  const addPracticeCompletion = (practice, additionalValue = null) => {
    if (!canAddPractice(practice)) return;
    const count = getPracticeCount(practice.id);
    setTodayCount((prev) => ({ ...prev, [practice.id]: count + 1 }));

    if (MAIN_PRACTICES.includes(practice.id)) {
      setPracticeCalendar((prev) => {
        const todayPractices = prev[currentDay] || [];
        if (!todayPractices.includes(practice.id)) {
          const updated = {
            ...prev,
            [currentDay]: [...todayPractices, practice.id],
          };
          if (todayPractices.length === 0) {
            updateSoilContent(true);
          }
          return updated;
        }
        return prev;
      });
    }

    const isFirstPracticeToday =
      Object.values(todayCount).reduce((sum, c) => sum + c, 0) === 0;
    if (isFirstPracticeToday) {
      setCurrentStreak((prev) => prev + 1);
    }

    if (practice.isMilagro) {
      const currentMinutes = getPracticeMinutes(practice.id);
      const newMinutes = Math.min(currentMinutes + 10, practice.maxDaily);
      setPracticeMinutes((prev) => ({ ...prev, [practice.id]: newMinutes }));
      setMilagroMinutesToday(newMinutes);
      setTotalXP(
        (prev) =>
          prev +
          practice.xpBase +
          Math.floor(
            (newMinutes - practice.minDaily) / practice.bonusInterval
          ) *
            practice.xpBonus
      );
      setCoins(
        (prev) =>
          prev +
          practice.coinsBase +
          Math.floor(
            (newMinutes - practice.minDaily) / practice.bonusInterval
          ) *
            practice.coinsBonus
      );
      return;
    }

    if (practice.isCycles && additionalValue) {
      const currentCycles = getPracticeMinutes(practice.id) || 0;
      const newCycles = Math.min(
        currentCycles + additionalValue,
        practice.maxCycles
      );
      setPracticeMinutes((prev) => ({ ...prev, [practice.id]: newCycles }));
    }

    if (practice.unit === "min" && !practice.isMilagro) {
      const currentMinutes =
        getPracticeMinutes(practice.id) || practice.minDaily;
      setPracticeMinutes((prev) => ({
        ...prev,
        [practice.id]: currentMinutes + 10,
      }));
    }

    const isBoosted =
      completedPrograms.includes("bhava_spandana") &&
      practice.id === "shambhavi";
    const milagroBoost = getMilagroBoost();
    const totalBoost = 1 + (isBoosted ? 1 : 0) + milagroBoost;

    let xpGain = practice.xpBase;
    let coinsGain = practice.coinsBase;

    if (practice.unit === "min" && !practice.isMilagro) {
      const minutes = getPracticeMinutes(practice.id) || practice.minDaily;
      const extraTime = Math.max(0, minutes - practice.minDaily);
      const bonusSets = Math.floor(extraTime / (practice.bonusInterval || 10));
      xpGain += bonusSets * (practice.xpBonus || 0);
      coinsGain += bonusSets * (practice.coinsBonus || 0);
    }

    xpGain = Math.floor(xpGain * totalBoost);
    coinsGain = Math.floor(coinsGain * totalBoost);
    setTotalXP((prev) => prev + xpGain);
    setCoins((prev) => prev + coinsGain);

    if (practice.qualities) {
      if (practice.qualities.clarity)
        setClarity(
          (prev) => prev + Math.floor(practice.qualities.clarity * totalBoost)
        );
      if (practice.qualities.intensity)
        setIntensity(
          (prev) => prev + Math.floor(practice.qualities.intensity * totalBoost)
        );
      if (practice.qualities.balance)
        setBalance(
          (prev) => prev + Math.floor(practice.qualities.balance * totalBoost)
        );
      if (practice.qualities.vitality)
        setVitality(
          (prev) => prev + Math.floor(practice.qualities.vitality * totalBoost)
        );
    }

    if (practice.category === "Chit Shakti") {
      const allChitPractices = allPracticesData.filter(
        (p) => p.category === "Chit Shakti"
      );
      const allCompleted = allChitPractices.every(
        (p) => getPracticeCount(p.id) > 0 || p.id === practice.id
      );
      if (allCompleted) {
        const chitAchievement = allAchievements.find(
          (a) => a.type === "chit_complete"
        );
        if (chitAchievement && !unlockedBadges.includes(chitAchievement.id)) {
          unlockAchievement(chitAchievement.id);
        }
      }
    }
    checkAchievements();
  };

  const resetDemoData = () => {
    setTotalXP(0);
    setCoins(0);
    setClarity(0);
    setIntensity(0);
    setBalance(0);
    setVitality(0);
    setCompletedPrograms([]);
    setUnlockedPractices([
      "isha_kriya",
      "chit_exito",
      "chit_salud",
      "chit_amor",
      "chit_paz",
    ]);
    setTodayCount({});
    setPracticeMinutes({});
    setUnlockedBadges([]);
    setMilagroMinutesToday(0);
    setCurrentStreak(0);
    setPracticeCalendar({});
    setSoilContent(1.0);
    setCurrentDay(1);
    setUserName("Balam");
    setAvatarGender("male");
    setGardenPlants(Array(12).fill(null));
  };

  const addDemoXP = (amount) => setTotalXP((prev) => prev + amount);
  const addDemoCoins = (amount) =>
    setCoins((prev) => Math.max(0, prev + amount));

  const userLevel = Math.floor(Math.sqrt(totalXP / 100)) + 1;
  const xpNeededForNextLevel = Math.pow(userLevel, 2) * 100;
  const xpProgress = (totalXP / xpNeededForNextLevel) * 100;

  const getAvatarEmoji = () => {
    const level = userLevel;
    if (avatarGender === "female") {
      if (level < 10) return "🧘‍♀️";
      if (level < 20) return "🧙‍♀️";
      if (level < 30) return "👸";
      return "👑";
    } else if (avatarGender === "neutral") {
      if (level < 10) return "🧘";
      if (level < 20) return "🧙";
      if (level < 30) return "🏆";
      return "⭐";
    } else {
      if (level < 10) return "🧘‍♂️";
      if (level < 20) return "🧙‍♂️";
      if (level < 30) return "🤴";
      return "👑";
    }
  };

  const getUnlockedPlots = () => {
    const keyPractices = [
      "shambhavi",
      "shakti",
      "shunya",
      "yogasanas",
      "surya_kriya",
      "surya_shakti",
      "samyama_proceso",
      "samyama_observacion",
      "angamardana",
      "bhastrika_kriya",
      "yoga_namaskar",
      "upa_yoga",
    ];
    const unlockedCount = keyPractices.filter((p) =>
      unlockedPractices.includes(p)
    ).length;
    return Math.max(1, unlockedCount);
  };

  const advanceGardenPlants = () => {
    setGardenPlants((prev) =>
      prev.map((plant) => {
        if (!plant) return null;
        if (plant.witherStage !== undefined && plant.witherStage > 0) {
          const newPlant = { ...plant };
          newPlant.witherStage = Math.max(0, newPlant.witherStage - 1);
          if (newPlant.witherStage === 0) delete newPlant.witherStage;
          return newPlant;
        }
        if (plant.level < 3) return { ...plant, level: plant.level + 1 };
        return plant;
      })
    );
  };

  const witherGardenPlants = () => {
    setGardenPlants((prev) =>
      prev.map((plant) => {
        if (!plant) return null;

        // Si el suelo está por debajo del nivel mínimo de supervivencia (1%), la planta muere más rápido
        const soilTooLow = soilContent < 1.0;

        const newPlant = { ...plant };

        if (newPlant.witherStage === undefined) {
          newPlant.witherStage = soilTooLow ? 2 : 1; // Salta directamente a "muy marchita" si el suelo está muy bajo
        } else {
          newPlant.witherStage += soilTooLow ? 2 : 1;
        }

        // Si llega a 3 días marchita, muere
        if (newPlant.witherStage >= 3) {
          return null;
        }

        return newPlant;
      })
    );
  };
  const buyPlant = (plantType) => {
    const unlockedPlots = getUnlockedPlots();
    const emptyIndex = gardenPlants.findIndex(
      (p, idx) => p === null && idx < unlockedPlots
    );

    if (emptyIndex === -1) {
      showGardenMessage(
        "⚠️ No tienes parcelas vacías. Desbloquea más prácticas para nuevas parcelas.",
        "warning"
      );
      return;
    }

    const plantData = PLANTS_DATA[plantType];

    setCoins((prev) => prev - plantData.price);
    setGardenPlants((prev) => {
      const newPlants = [...prev];
      newPlants[emptyIndex] = {
        type: plantType,
        level: 0,
        plantedDay: currentDay,
      };
      return newPlants;
    });

    showGardenMessage(`🌱 ¡${plantData.name} comprada!`, "success");
    setShowShopModal(false);
  };
  const showGardenMessage = (text, type = "success") => {
    setGardenMessage({ show: true, text, type });
    setTimeout(
      () => setGardenMessage({ show: false, text: "", type: "" }),
      2500
    );
  };

  const createPlantSVG = (plantType, plantLevel) => {
    const plant = PLANTS_DATA[plantType];

    if (plantLevel === 0) {
      return (
        <svg
          viewBox="0 0 100 100"
          style={{
            width: "100px",
            height: "100px",
            filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.3))",
          }}
        >
          <ellipse
            cx="50"
            cy="70"
            rx="20"
            ry="25"
            fill="#8B4513"
            opacity="0.9"
          />
          <ellipse cx="50" cy="65" rx="15" ry="18" fill="#A0522D" />
          <path
            d="M 45 60 Q 50 55 55 60"
            stroke="#654321"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      );
    }

    if (plantLevel === 2 || plantLevel === 3) {
      const isSuperFlower = plantLevel === 3;
      const scale = isSuperFlower ? 1.5 : 1.2;
      const glowFilter = isSuperFlower
        ? "drop-shadow(0 0 15px rgba(255,215,0,0.8)) drop-shadow(0 5px 10px rgba(0,0,0,0.3))"
        : "drop-shadow(0 5px 10px rgba(0,0,0,0.3))";

      return (
        <svg
          viewBox="0 0 100 100"
          style={{
            width: `${100 * scale}px`,
            height: `${100 * scale}px`,
            filter: glowFilter,
          }}
        >
          {/* Tallo más grueso para súper flor */}
          <line
            x1="50"
            y1="85"
            x2="50"
            y2="40"
            stroke="#2D5016"
            strokeWidth={isSuperFlower ? 5 : 4}
          />

          {/* Hojas principales */}
          <ellipse
            cx="45"
            cy="65"
            rx="8"
            ry="12"
            fill="#4A7C2C"
            opacity="0.8"
          />
          <ellipse
            cx="55"
            cy="70"
            rx="8"
            ry="12"
            fill="#4A7C2C"
            opacity="0.8"
          />

          {/* Hojas EXTRA para súper flor */}
          {isSuperFlower && (
            <>
              <ellipse
                cx="40"
                cy="55"
                rx="7"
                ry="10"
                fill="#5CB85C"
                opacity="0.8"
              />
              <ellipse
                cx="60"
                cy="60"
                rx="7"
                ry="10"
                fill="#5CB85C"
                opacity="0.8"
              />
              <ellipse
                cx="48"
                cy="75"
                rx="6"
                ry="9"
                fill="#3A6B2C"
                opacity="0.8"
              />
              <ellipse
                cx="52"
                cy="78"
                rx="6"
                ry="9"
                fill="#3A6B2C"
                opacity="0.8"
              />
            </>
          )}

          <g transform="translate(50, 30)">
            {plantType === "dalia" && (
              <>
                {/* Pétalos externos */}
                <ellipse cx="0" cy="-12" rx="6" ry="14" fill={plant.color} />
                <ellipse cx="-12" cy="0" rx="14" ry="6" fill={plant.color} />
                <ellipse cx="12" cy="0" rx="14" ry="6" fill={plant.color} />
                <ellipse cx="0" cy="12" rx="6" ry="14" fill={plant.color} />

                {/* Pétalos intermedios */}
                <ellipse
                  cx="-8"
                  cy="-8"
                  rx="10"
                  ry="10"
                  fill="#F77F00"
                  transform="rotate(-45)"
                />
                <ellipse
                  cx="8"
                  cy="-8"
                  rx="10"
                  ry="10"
                  fill="#F77F00"
                  transform="rotate(45)"
                />
                <ellipse
                  cx="-8"
                  cy="8"
                  rx="10"
                  ry="10"
                  fill="#F77F00"
                  transform="rotate(45)"
                />
                <ellipse
                  cx="8"
                  cy="8"
                  rx="10"
                  ry="10"
                  fill="#F77F00"
                  transform="rotate(-45)"
                />

                {/* Súper flor: pétalos extras y brillo */}
                {isSuperFlower && (
                  <>
                    <ellipse
                      cx="0"
                      cy="-16"
                      rx="5"
                      ry="10"
                      fill="#FF6B6B"
                      opacity="0.8"
                    />
                    <ellipse
                      cx="-16"
                      cy="0"
                      rx="10"
                      ry="5"
                      fill="#FF6B6B"
                      opacity="0.8"
                    />
                    <ellipse
                      cx="16"
                      cy="0"
                      rx="10"
                      ry="5"
                      fill="#FF6B6B"
                      opacity="0.8"
                    />
                    <ellipse
                      cx="0"
                      cy="16"
                      rx="5"
                      ry="10"
                      fill="#FF6B6B"
                      opacity="0.8"
                    />
                    <circle cx="0" cy="0" r="7" fill="#FFD700" opacity="0.6" />
                  </>
                )}

                <circle cx="0" cy="0" r="5" fill="#FCBF49" />
              </>
            )}

            {plantType === "orquidea" && (
              <>
                <ellipse cx="0" cy="-15" rx="7" ry="15" fill={plant.color} />
                <ellipse
                  cx="-12"
                  cy="-8"
                  rx="8"
                  ry="14"
                  fill={plant.color}
                  transform="rotate(-30)"
                />
                <ellipse
                  cx="12"
                  cy="-8"
                  rx="8"
                  ry="14"
                  fill={plant.color}
                  transform="rotate(30)"
                />
                <ellipse
                  cx="-10"
                  cy="5"
                  rx="6"
                  ry="12"
                  fill="#E0AAFF"
                  transform="rotate(-20)"
                />
                <ellipse
                  cx="10"
                  cy="5"
                  rx="6"
                  ry="12"
                  fill="#E0AAFF"
                  transform="rotate(20)"
                />

                {isSuperFlower && (
                  <>
                    <ellipse
                      cx="-6"
                      cy="-12"
                      rx="5"
                      ry="10"
                      fill="#F0B8FF"
                      opacity="0.7"
                      transform="rotate(-15)"
                    />
                    <ellipse
                      cx="6"
                      cy="-12"
                      rx="5"
                      ry="10"
                      fill="#F0B8FF"
                      opacity="0.7"
                      transform="rotate(15)"
                    />
                    <circle cx="0" cy="0" r="6" fill="#FFE4FF" opacity="0.5" />
                  </>
                )}

                <path
                  d="M -8 8 Q 0 15 8 8 Q 4 12 0 12 Q -4 12 -8 8 Z"
                  fill="#FFFFFF"
                />
                <circle cx="0" cy="-10" r="2" fill="#FFD700" />
              </>
            )}

            {plantType === "pasionaria" && (
              <>
                {/* Rayos externos */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 360) / 24;
                  const color = i % 2 === 0 ? plant.color : "#F72585";
                  const length = isSuperFlower ? 16 : 14;
                  return (
                    <line
                      key={i}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2={-length}
                      stroke={color}
                      strokeWidth={isSuperFlower ? 2 : 1.5}
                      transform={`rotate(${angle})`}
                    />
                  );
                })}

                {/* Pétalos internos */}
                <ellipse
                  cx="0"
                  cy="-10"
                  rx="5"
                  ry="12"
                  fill="#4CC9F0"
                  opacity="0.9"
                />
                <ellipse
                  cx="0"
                  cy="-10"
                  rx="5"
                  ry="12"
                  fill="#4CC9F0"
                  opacity="0.9"
                  transform="rotate(72)"
                />
                <ellipse
                  cx="0"
                  cy="-10"
                  rx="5"
                  ry="12"
                  fill="#4CC9F0"
                  opacity="0.9"
                  transform="rotate(144)"
                />
                <ellipse
                  cx="0"
                  cy="-10"
                  rx="5"
                  ry="12"
                  fill="#4CC9F0"
                  opacity="0.9"
                  transform="rotate(216)"
                />
                <ellipse
                  cx="0"
                  cy="-10"
                  rx="5"
                  ry="12"
                  fill="#4CC9F0"
                  opacity="0.9"
                  transform="rotate(288)"
                />

                {isSuperFlower && (
                  <>
                    <circle cx="0" cy="0" r="8" fill="#F72585" opacity="0.3" />
                    <circle cx="0" cy="0" r="6" fill="#4CC9F0" opacity="0.4" />
                  </>
                )}

                <circle cx="0" cy="0" r="4" fill="#FFD700" />
                <circle cx="0" cy="0" r="2" fill={plant.color} />
              </>
            )}

            {plantType === "ceibo" && (
              <>
                {/* Pétalos largos característicos del ceibo */}
                <ellipse cx="0" cy="-14" rx="8" ry="18" fill={plant.color} />
                <ellipse
                  cx="-10"
                  cy="-6"
                  rx="6"
                  ry="14"
                  fill="#E85D04"
                  transform="rotate(-35)"
                />
                <ellipse
                  cx="10"
                  cy="-6"
                  rx="6"
                  ry="14"
                  fill="#E85D04"
                  transform="rotate(35)"
                />

                {/* Forma de campana inferior */}
                <path
                  d="M -6 2 Q 0 10 6 2 Q 4 6 0 8 Q -4 6 -6 2 Z"
                  fill="#F48C06"
                />

                {isSuperFlower && (
                  <>
                    <ellipse
                      cx="-12"
                      cy="-2"
                      rx="5"
                      ry="10"
                      fill="#FF6B35"
                      opacity="0.7"
                      transform="rotate(-45)"
                    />
                    <ellipse
                      cx="12"
                      cy="-2"
                      rx="5"
                      ry="10"
                      fill="#FF6B35"
                      opacity="0.7"
                      transform="rotate(45)"
                    />
                    <circle cx="0" cy="-8" r="4" fill="#FFD700" opacity="0.6" />
                  </>
                )}

                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-10"
                  stroke="#FFE4B5"
                  strokeWidth="1.5"
                />
                <circle cx="0" cy="-10" r="2" fill="#FFD700" />
              </>
            )}

            {plantType === "copihue" && (
              <>
                {/* Estambres delicados */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const angle = i * 60;
                  return (
                    <line
                      key={i}
                      x1="0"
                      y1="-4"
                      x2="0"
                      y2="-12"
                      stroke="#FFD166"
                      strokeWidth="1"
                      opacity="0.5"
                      transform={`rotate(${angle})`}
                    />
                  );
                })}

                {/* Forma de campana alargada del copihue */}
                <path
                  d="M -6 -5 Q -8 -10 -6 -16 Q -4 -20 0 -22 Q 4 -20 6 -16 Q 8 -10 6 -5 Q 4 -2 0 0 Q -4 -2 -6 -5 Z"
                  fill={plant.color}
                  stroke="#EF476F"
                  strokeWidth="1.5"
                />

                {isSuperFlower && (
                  <>
                    {/* Venas y detalles extras */}
                    <path
                      d="M -4 -8 Q 0 -14 4 -8"
                      stroke="#FFFFFF"
                      strokeWidth="0.5"
                      opacity="0.6"
                      fill="none"
                    />
                    <path
                      d="M -3 -12 Q 0 -16 3 -12"
                      stroke="#FFFFFF"
                      strokeWidth="0.5"
                      opacity="0.6"
                      fill="none"
                    />
                    <circle
                      cx="0"
                      cy="-10"
                      r="5"
                      fill="#FF6B9D"
                      opacity="0.3"
                    />
                  </>
                )}

                <circle cx="0" cy="-1" r="2" fill="#FFD166" />
              </>
            )}

            {plantType === "floripondio" && (
              <>
                {/* Rayos de luz tenues */}
                {Array.from({ length: isSuperFlower ? 9 : 7 }).map((_, i) => {
                  const offset = i * 3 - (isSuperFlower ? 12 : 9);
                  return (
                    <line
                      key={i}
                      x1={offset * 0.8}
                      y1="-18"
                      x2={offset * 1.2}
                      y2="5"
                      stroke="#FFF8DC"
                      strokeWidth="0.5"
                      opacity="0.3"
                    />
                  );
                })}

                {/* Trompeta del floripondio */}
                <path
                  d="M -3 5 L -6 0 Q -8 -5 -8 -10 Q -7 -15 -4 -18 L 0 -20 L 4 -18 Q 7 -15 8 -10 Q 8 -5 6 0 L 3 5 Q 1 7 0 7 Q -1 7 -3 5 Z"
                  fill="#FFFACD"
                  stroke="#FFF8DC"
                  strokeWidth="0.5"
                />

                {isSuperFlower && (
                  <>
                    <path
                      d="M -2 0 Q -4 -8 -3 -14"
                      stroke="#F0E68C"
                      strokeWidth="0.8"
                      opacity="0.6"
                      fill="none"
                    />
                    <path
                      d="M 2 0 Q 4 -8 3 -14"
                      stroke="#F0E68C"
                      strokeWidth="0.8"
                      opacity="0.6"
                      fill="none"
                    />
                    <circle
                      cx="0"
                      cy="-10"
                      r="6"
                      fill="#FFFFE0"
                      opacity="0.4"
                    />
                  </>
                )}

                <line
                  x1="0"
                  y1="-15"
                  x2="0"
                  y2="8"
                  stroke="#E6D690"
                  strokeWidth="2"
                />
                <circle cx="0" cy="8" r="2" fill="#FFD700" />
              </>
            )}
          </g>
        </svg>
      );
    }
    return null;
  };
  const practiceNames = {
    shambhavi: "Shambhavi",
    shakti: "Shakti Chalana",
    shunya: "shunya",
    yogasanas: "Yogasanas",
    surya_kriya: "Surya Kriya",
    samyama_proceso: "Samyama Proceso",
    samyama_observacion: "Samyama Observación",
  };

  const CalendarModal = () => {
    if (!showCalendar) return null;
    const last21Days = getLast21Days();
    const last3Days = getLast3DaysDetails();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
        <div
          className="bg-gradient-to-br from-stone-900 to-cyan-900 rounded-lg max-w-4xl w-full border-4 border-cyan-700"
          style={{
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="flex justify-between items-center p-6 pb-4 border-b-2 border-cyan-800 flex-shrink-0">
            <h3
              className="text-2xl font-bold text-cyan-300"
              style={{ fontFamily: "serif" }}
            >
              📅 CALENDARIO DE RACHAS
            </h3>
            <button
              onClick={() => setShowCalendar(false)}
              className="text-cyan-400 hover:text-cyan-300 bg-stone-800 p-2 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
          <div
            style={{ overflowY: "auto", flex: 1, minHeight: 0 }}
            className="p-6 pt-4"
          >
            <div className="mb-6">
              <h4
                className="text-lg font-bold text-orange-200 mb-3"
                style={{ fontFamily: "serif" }}
              >
                🗓 Últimos 21 días:
              </h4>
              <div className="grid grid-cols-7 gap-2">
                {last21Days.map((day) => (
                  <div
                    key={day.dayNumber}
                    className={`aspect-square rounded-lg border-3 flex items-center justify-center ${
                      day.isToday
                        ? "bg-gray-800 border-gray-600"
                        : day.hasMainPractice
                        ? "bg-green-900 bg-opacity-50 border-green-700"
                        : "bg-red-900 bg-opacity-50 border-red-700"
                    }`}
                  >
                    <span className="text-3xl">
                      {day.isToday ? "○" : day.hasMainPractice ? "✓" : "✗"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4
                className="text-lg font-bold text-orange-200 mb-3"
                style={{ fontFamily: "serif" }}
              >
                📋 Detalle últimos 3 días:
              </h4>
              <div className="space-y-3">
                {last3Days.map((day, index) => {
                  let label = day.isToday
                    ? "HOY"
                    : index === 1
                    ? "AYER"
                    : "ANTIER";
                  return (
                    <div
                      key={day.dayNumber}
                      className={`rounded-lg p-4 border-3 ${
                        day.isToday
                          ? "bg-gray-800 border-gray-600"
                          : day.hasMainPractice
                          ? "bg-green-900 bg-opacity-50 border-green-700"
                          : "bg-red-900 bg-opacity-50 border-red-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {day.isToday
                              ? "○"
                              : day.hasMainPractice
                              ? "✓"
                              : "✗"}
                          </span>
                          <div>
                            <h5
                              className="font-bold text-white"
                              style={{ fontFamily: "serif" }}
                            >
                              {label}
                            </h5>
                            <p className="text-xs text-stone-400">{day.date}</p>
                          </div>
                        </div>
                      </div>
                      {day.practices.length > 0 ? (
                        <div className="space-y-1">
                          {day.practices.map((practiceId) => (
                            <div
                              key={practiceId}
                              className="flex items-center gap-2 text-sm text-stone-200"
                            >
                              <span className="text-green-400">●</span>
                              <span>
                                {practiceNames[practiceId] || practiceId}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-stone-400 italic">
                          {day.isToday
                            ? "Aún no has realizado prácticas principales hoy"
                            : "Sin prácticas principales"}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AchievementsModal = () => {
    if (!showAchievementsModal) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
        <div
          className="bg-gradient-to-br from-stone-900 to-cyan-900 rounded-lg max-w-2xl w-full border-4 border-cyan-700"
          style={{
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="flex justify-between items-center p-6 pb-4 border-b-2 border-cyan-800 flex-shrink-0">
            <h3
              className="text-2xl font-bold text-cyan-300"
              style={{ fontFamily: "serif" }}
            >
              🏆 LOGROS SAGRADOS
            </h3>
            <button
              onClick={() => setShowAchievementsModal(false)}
              className="text-cyan-400 hover:text-cyan-300 bg-stone-800 p-2 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
          <div
            style={{ overflowY: "auto", flex: 1, minHeight: 0 }}
            className="p-6 pt-4"
          >
            <div className="mb-4 text-center">
              <span className="text-cyan-300 font-bold text-lg">
                {unlockedBadges.length}/{allAchievements.length} Desbloqueados
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {allAchievements.map((achievement) => {
                const unlocked = unlockedBadges.includes(achievement.id);
                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-3 ${
                      unlocked
                        ? "bg-gradient-to-br from-yellow-800 to-amber-800 border-yellow-600"
                        : "bg-stone-800 border-stone-700 opacity-70"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">
                        {unlocked ? (
                          <Trophy className="text-yellow-300" size={32} />
                        ) : (
                          <Lock className="text-stone-600" size={32} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h5
                          className="font-bold text-amber-100 mb-1"
                          style={{ fontFamily: "serif" }}
                        >
                          {achievement.name}
                        </h5>
                        <p
                          className="text-sm text-amber-200 mb-2"
                          style={{ fontFamily: "serif" }}
                        >
                          {achievement.desc}
                        </p>
                        {!unlocked && achievement.requirement && (
                          <div className="bg-black bg-opacity-40 rounded p-2 mb-2">
                            <p
                              className="text-xs text-cyan-300"
                              style={{ fontFamily: "serif" }}
                            >
                              📋 {achievement.requirement}
                            </p>
                          </div>
                        )}
                        {unlocked && (
                          <div className="flex gap-3 text-xs">
                            <span className="text-green-400">
                              +{achievement.xp} XP
                            </span>
                            <span className="text-yellow-400">
                              +{achievement.coins} 🪙
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SettingsModal = () => {
    if (!showSettings) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
        <div
          className="bg-gradient-to-br from-stone-900 to-purple-900 rounded-lg max-w-md w-full border-4 border-purple-700"
          style={{
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="flex justify-between items-center p-6 pb-4 border-b-2 border-purple-800 flex-shrink-0">
            <h3
              className="text-2xl font-bold text-purple-300"
              style={{ fontFamily: "serif" }}
            >
              ⚙️ AJUSTES
            </h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-purple-400 hover:text-purple-300 bg-stone-800 p-2 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>
          <div
            style={{ overflowY: "auto", flex: 1, minHeight: 0 }}
            className="p-6 pt-4 space-y-4"
          >
            <div>
              <label
                className="block text-purple-200 mb-2 font-bold"
                style={{ fontFamily: "serif" }}
              >
                Nombre:
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-stone-800 text-white px-4 py-2 rounded-lg border-2 border-purple-700"
                style={{ fontFamily: "serif" }}
              />
            </div>
            <div>
              <label
                className="block text-purple-200 mb-2 font-bold"
                style={{ fontFamily: "serif" }}
              >
                Género del Avatar:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setAvatarGender("male")}
                  className={`p-3 rounded-lg border-2 ${
                    avatarGender === "male"
                      ? "bg-purple-700 border-purple-500"
                      : "bg-stone-800 border-stone-700"
                  }`}
                >
                  <div className="text-4xl">🧘‍♂️</div>
                  <div className="text-xs text-purple-200 mt-1">Masculino</div>
                </button>
                <button
                  onClick={() => setAvatarGender("female")}
                  className={`p-3 rounded-lg border-2 ${
                    avatarGender === "female"
                      ? "bg-purple-700 border-purple-500"
                      : "bg-stone-800 border-stone-700"
                  }`}
                >
                  <div className="text-4xl">🧘‍♀️</div>
                  <div className="text-xs text-purple-200 mt-1">Femenino</div>
                </button>
                <button
                  onClick={() => setAvatarGender("neutral")}
                  className={`p-3 rounded-lg border-2 ${
                    avatarGender === "neutral"
                      ? "bg-purple-700 border-purple-500"
                      : "bg-stone-800 border-stone-700"
                  }`}
                >
                  <div className="text-4xl">🧘</div>
                  <div className="text-xs text-purple-200 mt-1">Neutral</div>
                </button>
              </div>
            </div>
            <div className="border-t-2 border-purple-800 pt-4 mt-4">
              <button
                onClick={() => setShowAdminDemo(!showAdminDemo)}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-3 rounded-lg font-bold border-2 border-orange-800"
                style={{ fontFamily: "serif" }}
              >
                {showAdminDemo ? "▼ Admin Demo" : "▶ Admin Demo"}
              </button>
              {showAdminDemo && (
                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-purple-200 mb-2 text-sm font-bold">
                      Contenido Orgánico del Suelo:
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="8"
                      step="0.1"
                      value={soilContent}
                      onChange={(e) =>
                        setSoilManually(parseFloat(e.target.value))
                      }
                      className="w-full"
                    />
                    <div className="text-center text-purple-300 text-sm mt-1">
                      {soilContent.toFixed(2)}%
                    </div>
                  </div>
                  <div>
                    <label className="block text-purple-200 mb-2 text-sm font-bold">
                      Monedas:
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addDemoCoins(-50)}
                        className="flex-1 bg-red-700 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        -50
                      </button>
                      <button
                        onClick={() => addDemoCoins(50)}
                        className="flex-1 bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        +50
                      </button>
                      <button
                        onClick={() => addDemoCoins(500)}
                        className="flex-1 bg-green-700 text-white px-3 py-2 rounded-lg text-sm"
                      >
                        +500
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={advanceDay}
                      className="w-full bg-blue-700 text-white px-4 py-2 rounded-lg font-bold"
                      style={{ fontFamily: "serif" }}
                    >
                      ⏭ Avanzar Día (Día actual: {currentDay})
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={resetDemoData}
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-bold"
                      style={{ fontFamily: "serif" }}
                    >
                      ↻ Reiniciar Todo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SoilBar = () => {
    const percentage = (soilContent / SOIL_CONFIG.MAX) * 100;
    const level = Math.floor(soilContent);
    const soilColors = [
      "linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)",
      "linear-gradient(135deg, #C19A6B 0%, #B08968 100%)",
      "linear-gradient(135deg, #A0826D 0%, #8B7355 100%)",
      "linear-gradient(135deg, #9DB665 0%, #8BA055 100%)",
      "linear-gradient(135deg, #8FBC5A 0%, #7CA850 100%)",
      "linear-gradient(135deg, #7EC850 0%, #6BB542 100%)",
      "linear-gradient(135deg, #6AB63E 0%, #5AA034 100%)",
      "linear-gradient(135deg, #5AA034 0%, #4A8D2A 100%)",
      "linear-gradient(135deg, #4A8D2A 0%, #3A7A1A 100%)",
    ];
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-amber-900 to-amber-950 border-t-4 border-amber-800 p-4 shadow-xl z-40">
        <div
          className="text-sm text-amber-200 mb-2 text-center font-bold"
          style={{ fontFamily: "serif" }}
        >
          🌱 Contenido Orgánico del Suelo
        </div>
        <div className="bg-stone-900 rounded-full h-8 overflow-hidden border-3 border-amber-800 max-w-2xl mx-auto relative">
          <div
            className="h-full transition-all duration-800 flex items-center justify-center text-white text-sm font-bold"
            style={{
              width: `${percentage}%`,
              background: soilColors[level],
              textShadow: "2px 2px 3px rgba(0,0,0,0.7)",
            }}
          >
            {soilContent.toFixed(2)}%
          </div>
        </div>
      </div>
    );
  };

  const ShopModal = () => {
    if (!showShopModal) return null;
    const currentLevel = Math.floor(soilContent);
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
        onClick={() => setShowShopModal(false)}
      >
        <div
          className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-3xl max-w-5xl w-full max-h-[90vh] relative border-4 border-green-700 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowShopModal(false)}
            className="absolute top-5 right-5 w-10 h-10 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center text-white text-xl z-10"
          >
            <X size={24} />
          </button>

          <div className="p-10 pb-6">
            <div className="text-center">
              <h1
                className="text-5xl font-bold text-green-300 mb-2"
                style={{ fontFamily: "serif" }}
              >
                🌺 Plantas de Hispanoamérica 🌺
              </h1>
              <p
                className="text-green-200 text-lg"
                style={{ fontFamily: "serif" }}
              >
                Colección de flores endémicas
              </p>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 px-10 pb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.keys(PLANTS_DATA).map((plantKey) => {
                const plant = PLANTS_DATA[plantKey];
                const isUnlocked = currentLevel >= plant.requiredLevel;
                const canAfford = coins >= plant.price;
                return (
                  <div
                    key={plantKey}
                    className={`bg-white rounded-2xl overflow-hidden border-4 ${
                      !isUnlocked ? "opacity-60 grayscale" : ""
                    }`}
                    style={{ borderColor: plant.color }}
                  >
                    <div
                      className="p-3"
                      style={{ backgroundColor: plant.color }}
                    >
                      <div className="flex justify-between items-center text-white">
                        <span className="font-bold">
                          Requiere {plant.requiredLevel}%
                        </span>
                        {!isUnlocked && <span className="text-2xl">🔒</span>}
                      </div>
                    </div>
                    <div className="h-40 flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
                      {isUnlocked ? (
                        createPlantSVG(plantKey, 2)
                      ) : (
                        <svg
                          viewBox="0 0 100 100"
                          style={{ width: "80px", height: "80px" }}
                        >
                          <ellipse
                            cx="50"
                            cy="70"
                            rx="20"
                            ry="25"
                            fill="#8B4513"
                            opacity="0.9"
                          />
                          <ellipse
                            cx="50"
                            cy="65"
                            rx="15"
                            ry="18"
                            fill="#A0522D"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="p-4">
                      <h3
                        className="text-2xl font-bold text-green-900 mb-1"
                        style={{ fontFamily: "serif" }}
                      >
                        {plant.name}
                      </h3>
                      <p className="text-sm italic text-green-700 mb-2">
                        {plant.scientificName}
                      </p>
                      <p className="text-sm text-green-800 font-bold mb-2">
                        🌎 {plant.origin}
                      </p>
                      <p className="text-sm text-stone-700">
                        {plant.description}
                      </p>
                    </div>
                    <div className="p-4 pt-0 flex justify-between items-center">
                      <span className="text-xl font-bold text-orange-600">
                        💰 {plant.price}
                      </span>
                      <button
                        onClick={() => buyPlant(plantKey)}
                        disabled={!isUnlocked || !canAfford}
                        className={`px-5 py-2 rounded-xl font-bold ${
                          !isUnlocked || !canAfford
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white"
                        }`}
                        style={{ fontFamily: "serif" }}
                      >
                        {!isUnlocked
                          ? "Bloqueado"
                          : canAfford
                          ? "Comprar"
                          : "Sin fondos"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const GardenView = () => {
    const unlockedPlots = getUnlockedPlots();
    const soilLevel = Math.floor(soilContent);
    const getPlotSoilClass = () => {
      const colors = [
        "linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)",
        "linear-gradient(135deg, #C19A6B 0%, #B08968 100%)",
        "linear-gradient(135deg, #A0826D 0%, #8B7355 100%)",
        "linear-gradient(135deg, #9DB665 0%, #8BA055 100%)",
        "linear-gradient(135deg, #8FBC5A 0%, #7CA850 100%)",
        "linear-gradient(135deg, #7EC850 0%, #6BB542 100%)",
        "linear-gradient(135deg, #6AB63E 0%, #5AA034 100%)",
        "linear-gradient(135deg, #5AA034 0%, #4A8D2A 100%)",
        "linear-gradient(135deg, #4A8D2A 0%, #3A7A1A 100%)",
      ];
      return colors[soilLevel] || colors[0];
    };

    return (
      <div
        className="min-h-screen pb-32 pt-20 px-4"
        style={{
          background:
            "linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 40%, #90EE90 100%)",
          position: "relative",
        }}
      >
        {" "}
        {/* Nubes decorativas */}{" "}
        <div
          style={{
            position: "fixed",
            top: "20px",
            left: 0,
            width: "100%",
            height: "200px",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          {" "}
          <div
            style={{
              position: "absolute",
              background: "white",
              borderRadius: "100px",
              opacity: 0.8,
              width: "100px",
              height: "40px",
              top: "20px",
              left: "10%",
              animation: "float 60s infinite linear",
            }}
          ></div>{" "}
          <div
            style={{
              position: "absolute",
              background: "white",
              borderRadius: "100px",
              opacity: 0.8,
              width: "80px",
              height: "35px",
              top: "80px",
              left: "60%",
              animation: "float 60s infinite linear",
              animationDelay: "-20s",
            }}
          ></div>{" "}
          <div
            style={{
              position: "absolute",
              background: "white",
              borderRadius: "100px",
              opacity: 0.8,
              width: "120px",
              height: "45px",
              top: "140px",
              left: "30%",
              animation: "float 60s infinite linear",
              animationDelay: "-40s",
            }}
          ></div>{" "}
        </div>{" "}
        <div
          className="max-w-6xl mx-auto mb-8"
          style={{ position: "relative", zIndex: 2 }}
        >
          {" "}
          <div className="flex justify-between items-center mb-4">
            {" "}
            <button
              onClick={() => setCurrentView("home")}
              className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-bold border-4 border-amber-900 flex items-center gap-2 shadow-lg"
              style={{ fontFamily: "serif" }}
            >
              {" "}
              ← VOLVER AL TRACKER{" "}
            </button>{" "}
            <button
              onClick={() => setShowShopModal(true)}
              className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-xl font-bold border-4 border-orange-800 flex items-center gap-2 shadow-lg"
              style={{ fontFamily: "serif" }}
            >
              {" "}
              🏪 TIENDA DE PLANTAS{" "}
            </button>{" "}
          </div>{" "}
          <h1
            className="text-5xl font-bold text-center text-green-900 mb-2"
            style={{
              fontFamily: "serif",
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            {" "}
            🌻 Mi Jardín{" "}
          </h1>{" "}
          <p
            className="text-center text-green-800 text-lg"
            style={{ fontFamily: "serif" }}
          >
            Parcelas desbloqueadas: {unlockedPlots} / 12
          </p>{" "}
        </div>{" "}
        <div
          className="max-w-5xl mx-auto grid grid-cols-4 gap-6"
          style={{ position: "relative", zIndex: 2 }}
        >
          {" "}
          {gardenPlants.map((plant, index) => {
            const isLocked = index >= unlockedPlots;
            return (
              <div
                key={index}
                className="aspect-square rounded-3xl border-4 border-amber-900 p-4 relative overflow-hidden shadow-xl"
                style={{
                  background: isLocked ? "#666" : getPlotSoilClass(),
                  opacity: isLocked ? 0.4 : 1,
                }}
              >
                {" "}
                {isLocked ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Lock size={48} className="text-stone-800" />
                  </div>
                ) : plant === null ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl opacity-30">🌱</span>
                  </div>
                ) : (
                  <div
                    className="h-full flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => {
                      setSelectedPlantInfo(PLANTS_DATA[plant.type]);
                      setShowPlantInfoModal(true);
                    }}
                  >
                    {" "}
                    {plant.witherStage !== undefined &&
                    plant.witherStage > 0 ? (
                      <span className="text-7xl">
                        {plant.witherStage === 1 ? "🥀" : "🍂"}
                      </span>
                    ) : plant.level === 0 ? (
                      createPlantSVG(plant.type, 0)
                    ) : plant.level === 1 ? (
                      <span className="text-7xl">🌱</span>
                    ) : (
                      createPlantSVG(plant.type, plant.level)
                    )}{" "}
                  </div>
                )}{" "}
              </div>
            );
          })}{" "}
        </div>{" "}
        {gardenMessage.show && (
          <div
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 rounded-2xl p-6 shadow-2xl z-50 text-center font-bold text-xl ${
              gardenMessage.type === "success"
                ? "border-green-600 text-green-600"
                : gardenMessage.type === "warning"
                ? "border-orange-600 text-orange-600"
                : "border-red-600 text-red-600"
            }`}
          >
            {gardenMessage.text}
          </div>
        )}{" "}
        {showPlantInfoModal && selectedPlantInfo && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
            onClick={() => setShowPlantInfoModal(false)}
          >
            {" "}
            <div
              className="bg-white rounded-2xl p-8 max-w-md border-4 border-green-700 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {" "}
              <div className="text-6xl mb-4">🌺</div>{" "}
              <h2
                className="text-3xl font-bold text-green-900 mb-2"
                style={{ fontFamily: "serif" }}
              >
                {selectedPlantInfo.name}
              </h2>{" "}
              <p className="text-lg italic text-green-700 mb-2">
                {selectedPlantInfo.scientificName}
              </p>{" "}
              <p className="text-md text-green-800 font-bold mb-4">
                🌎 {selectedPlantInfo.origin}
              </p>{" "}
              <p className="text-stone-700 mb-6">
                {selectedPlantInfo.description}
              </p>{" "}
              <button
                onClick={() => setShowPlantInfoModal(false)}
                className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-xl font-bold"
                style={{ fontFamily: "serif" }}
              >
                Cerrar
              </button>{" "}
            </div>{" "}
          </div>
        )}{" "}
        <ShopModal /> <SoilBar />{" "}
        <style>{` @keyframes float { from { transform: translateX(-200px); } to { transform: translateX(calc(100vw + 200px)); } } `}</style>{" "}
      </div>
    );
  };

  const HomeView = () => {
    const QualityBar = ({ label, value, max, color }) => {
      const level = Math.min(Math.floor(value / 100) + 1, 10);
      const progress = value % 100;
      return (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <span
                className="text-stone-300 text-sm font-bold"
                style={{ fontFamily: "serif" }}
              >
                {label}
              </span>
              <span className="text-xs text-cyan-400 font-bold">
                Nv.{level}
              </span>
            </div>
            <span className="text-cyan-300 font-bold text-sm">{value}</span>
          </div>
          <div className="w-full bg-stone-800 rounded-full h-3 overflow-hidden border-2 border-stone-700">
            <div
              className={`h-full ${color} transition-all duration-500`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-xs text-stone-500 mt-1 text-right">
            {Math.floor(progress)}%
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-5">
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 rounded-lg p-6 border-4 border-purple-700 text-center">
          <div className="text-9xl mb-3">{getAvatarEmoji()}</div>
          <h2
            className="text-2xl font-bold text-purple-100 mb-1"
            style={{ fontFamily: "serif" }}
          >
            {userName}
          </h2>
          <p
            className="text-purple-300 text-sm"
            style={{ fontFamily: "serif" }}
          >
            Namaskaram 🙏
          </p>
        </div>
        <div className="bg-gradient-to-r from-amber-900 to-orange-900 rounded-lg p-5 border-4 border-amber-700">
          <div className="bg-black bg-opacity-40 rounded-lg p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-amber-200 font-bold"
                style={{ fontFamily: "serif" }}
              >
                Nivel {userLevel}
              </span>
              <span className="text-cyan-400 font-bold">{totalXP} XP</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-4 overflow-hidden border-3 border-stone-900">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              ></div>
            </div>
            <div className="text-xs text-stone-400 mt-1 text-right">
              {Math.floor(xpProgress)}% al Nivel {userLevel + 1}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-yellow-600 to-amber-600 rounded-lg p-3 border-3 border-amber-800 flex items-center justify-center gap-2">
              <Coins size={24} className="text-yellow-200" />
              <div>
                <div
                  className="text-xs text-yellow-200"
                  style={{ fontFamily: "serif" }}
                >
                  Monedas
                </div>
                <div className="text-2xl font-bold text-white">{coins}</div>
              </div>
            </div>
            <div
              onClick={() => {
                if (!isIngenieriaCompletada()) {
                  alert(
                    "Completa Ingeniería Interior para desbloquear el calendario"
                  );
                  return;
                }
                setShowCalendar(true);
              }}
              className="bg-gradient-to-br from-orange-600 to-red-600 rounded-lg p-3 border-3 border-orange-800 flex items-center justify-center gap-2 cursor-pointer hover:from-orange-500 hover:to-red-500 transition-all"
            >
              <Flame size={24} className="text-orange-200" />
              <div>
                <div
                  className="text-xs text-orange-200"
                  style={{ fontFamily: "serif" }}
                >
                  Racha
                </div>
                <div className="text-2xl font-bold text-white">
                  {currentStreak} días
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg p-5 border-4 border-purple-700">
          <h3
            className="text-lg font-bold text-purple-200 mb-3 text-center"
            style={{ fontFamily: "serif" }}
          >
            ✨ CUALIDADES
          </h3>
          <div className="space-y-3">
            <QualityBar
              label="🧠 Claridad"
              value={clarity}
              max={1000}
              color="bg-gradient-to-r from-cyan-500 to-blue-500"
            />
            <QualityBar
              label="🔥 Intensidad"
              value={intensity}
              max={1000}
              color="bg-gradient-to-r from-orange-500 to-red-500"
            />
            <QualityBar
              label="⚖️ Balance"
              value={balance}
              max={1000}
              color="bg-gradient-to-r from-green-500 to-teal-500"
            />
            <QualityBar
              label="💪 Vitalidad"
              value={vitality}
              max={1000}
              color="bg-gradient-to-r from-yellow-500 to-amber-500"
            />
          </div>
        </div>
        <button
          onClick={() => setCurrentView("garden")}
          className="w-full bg-gradient-to-r from-green-700 to-emerald-700 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-5 rounded-2xl font-bold text-xl border-4 border-green-900 shadow-2xl transition-all"
          style={{ fontFamily: "serif" }}
        >
          🌻 VER MI JARDÍN
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setCurrentView("practices")}
            className="bg-gradient-to-br from-cyan-700 to-blue-700 text-white px-6 py-4 rounded-xl font-bold border-3 border-cyan-900"
            style={{ fontFamily: "serif" }}
          >
            📿 Prácticas
          </button>
          <button
            onClick={() => setCurrentView("programs")}
            className="bg-gradient-to-br from-purple-700 to-indigo-700 text-white px-6 py-4 rounded-xl font-bold border-3 border-purple-900"
            style={{ fontFamily: "serif" }}
          >
            🏛️ Programas
          </button>
        </div>
        <button
          onClick={() => setShowAchievementsModal(true)}
          className="w-full bg-gradient-to-br from-yellow-700 to-amber-700 text-white px-6 py-4 rounded-xl font-bold border-3 border-yellow-900"
          style={{ fontFamily: "serif" }}
        >
          🏆 Logros ({unlockedBadges.length}/{allAchievements.length})
        </button>
      </div>
    );
  };

  const PracticesView = () => {
    const unlockedPracticesOnly = allPracticesData.filter((p) =>
      isPracticeUnlocked(p.id)
    );

    const PracticeCard = ({ practice }) => {
      const isUnlocked = isPracticeUnlocked(practice.id);
      const count = getPracticeCount(practice.id);
      const minutes = getPracticeMinutes(practice.id);

      // Milagro de la Mente
      if (practice.id === "milagro_mente" && isUnlocked) {
        const currentMinutes = minutes || 7;
        const options = [7, 12, 15, 18, 21];
        const currentIndex = options.indexOf(currentMinutes);
        const canDecrease = currentIndex > 0;
        const canIncrease = currentIndex < options.length - 1;

        return (
          <div className="rounded-lg p-4 border-4 bg-stone-900 border-cyan-800">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <span
                  className="font-bold text-amber-100 text-base"
                  style={{ fontFamily: "serif" }}
                >
                  {practice.name}
                </span>
                <div
                  className="text-xs text-purple-400 mt-1"
                  style={{ fontFamily: "serif" }}
                >
                  Minutos: {currentMinutes} (Boost: {currentMinutes}%)
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => {
                  if (canDecrease) {
                    setPracticeMinutes((prev) => ({
                      ...prev,
                      [practice.id]: options[currentIndex - 1],
                    }));
                  }
                }}
                disabled={!canDecrease}
                className={`px-4 py-2 rounded-lg font-bold text-xl ${
                  canDecrease
                    ? "bg-red-700 hover:bg-red-600 text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-bold text-purple-300">
                  {currentMinutes} min
                </span>
              </div>
              <button
                onClick={() => {
                  if (canIncrease) {
                    setPracticeMinutes((prev) => ({
                      ...prev,
                      [practice.id]: options[currentIndex + 1],
                    }));
                  }
                }}
                disabled={!canIncrease}
                className={`px-4 py-2 rounded-lg font-bold text-xl ${
                  canIncrease
                    ? "bg-green-700 hover:bg-green-600 text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                const mins = currentMinutes;
                setMilagroMinutesToday(mins);
                setPracticeCalendar((prev) => {
                  const todayPractices = prev[currentDay] || [];
                  return {
                    ...prev,
                    [currentDay]: [...todayPractices, practice.id],
                  };
                });
                setTotalXP(
                  (prev) =>
                    prev +
                    practice.xpBase +
                    Math.floor(mins / 5) * practice.xpBonus
                );
                setCoins(
                  (prev) =>
                    prev +
                    practice.coinsBase +
                    Math.floor(mins / 5) * practice.coinsBonus
                );
                setTodayCount((prev) => ({ ...prev, [practice.id]: 1 }));
                updateSoilContent(true);
              }}
              className="w-full bg-purple-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-bold border-2 border-purple-900"
            >
              Completar ({currentMinutes} min)
            </button>
          </div>
        );
      }

      // Prácticas de minutos
      if (practice.isMinutePractice && isUnlocked) {
        const currentMinutes = minutes || practice.minDaily;
        const increment = practice.increment || 1;
        const canDecrease = currentMinutes > practice.minDaily;
        const canIncrease = currentMinutes < practice.maxDaily;
        const isValid = currentMinutes >= practice.minDaily;

        return (
          <div className="rounded-lg p-4 border-4 bg-stone-900 border-cyan-800">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1">
                <span
                  className="font-bold text-amber-100 text-base"
                  style={{ fontFamily: "serif" }}
                >
                  {practice.name}
                </span>
                <div
                  className="text-xs text-cyan-400 mt-1"
                  style={{ fontFamily: "serif" }}
                >
                  Mínimo: {practice.minDaily} min
                </div>
                {!isValid && (
                  <div
                    className="text-xs text-red-400 mt-1"
                    style={{ fontFamily: "serif" }}
                  >
                    ⚠️ Debes hacer mínimo {practice.minDaily} minutos
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => {
                  if (canDecrease) {
                    setPracticeMinutes((prev) => ({
                      ...prev,
                      [practice.id]: currentMinutes - increment,
                    }));
                  }
                }}
                disabled={!canDecrease}
                className={`px-4 py-2 rounded-lg font-bold text-xl ${
                  canDecrease
                    ? "bg-red-700 hover:bg-red-600 text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                −
              </button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-bold text-cyan-300">
                  {currentMinutes} min
                </span>
              </div>
              <button
                onClick={() => {
                  if (canIncrease) {
                    setPracticeMinutes((prev) => ({
                      ...prev,
                      [practice.id]: currentMinutes + increment,
                    }));
                  }
                }}
                disabled={!canIncrease}
                className={`px-4 py-2 rounded-lg font-bold text-xl ${
                  canIncrease
                    ? "bg-green-700 hover:bg-green-600 text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                if (!isValid) return;
                const mins = currentMinutes;
                const extraTime = Math.max(0, mins - practice.minDaily);
                const bonusSets = Math.floor(extraTime / 10);
                const xpGain =
                  practice.xpBase + bonusSets * (practice.xpBonus || 0);
                const coinsGain =
                  practice.coinsBase + bonusSets * (practice.coinsBonus || 0);
                setTotalXP((prev) => prev + xpGain);
                setCoins((prev) => prev + coinsGain);
                setTodayCount((prev) => ({ ...prev, [practice.id]: 1 }));
                if (practice.qualities) {
                  if (practice.qualities.clarity)
                    setClarity((prev) => prev + practice.qualities.clarity);
                  if (practice.qualities.intensity)
                    setIntensity((prev) => prev + practice.qualities.intensity);
                  if (practice.qualities.balance)
                    setBalance((prev) => prev + practice.qualities.balance);
                  if (practice.qualities.vitality)
                    setVitality((prev) => prev + practice.qualities.vitality);
                }
              }}
              disabled={!isValid}
              className={`w-full px-4 py-2 rounded-lg font-bold border-2 ${
                isValid
                  ? "bg-cyan-700 hover:bg-cyan-600 text-white border-cyan-900"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed border-gray-700"
              }`}
            >
              Completar ({currentMinutes} min)
            </button>
          </div>
        );
      }

      // Resto de prácticas
      const maxReached = practice.isMilagro
        ? minutes >= practice.maxDaily
        : practice.isCycles
        ? minutes >= practice.maxCycles
        : count >= practice.maxDaily;
      const isBoosted =
        completedPrograms.includes("bhava_spandana") &&
        practice.id === "shambhavi";
      let displayText = "";
      if (practice.isMilagro) {
        displayText = `${minutes}/${practice.maxDaily} min`;
      } else if (practice.isCycles) {
        displayText = `${minutes}/${practice.maxCycles} ciclos`;
      } else {
        displayText = `${count}/${practice.maxDaily} ${practice.unit}${
          count !== 1 ? "s" : ""
        }`;
      }

      return (
        <div
          className={`rounded-lg p-4 border-4 ${
            isUnlocked
              ? "bg-stone-900 border-cyan-800"
              : "bg-stone-950 border-stone-800 opacity-60"
          }`}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="font-bold text-amber-100 text-base"
                  style={{ fontFamily: "serif" }}
                >
                  {practice.name}
                </span>
                {!isUnlocked && <Lock size={16} className="text-stone-600" />}
                {isBoosted && <Zap size={16} className="text-orange-400" />}
              </div>
              <div
                className="text-xs text-cyan-400 mb-1"
                style={{ fontFamily: "serif" }}
              >
                {displayText}
              </div>
              {!practice.isMilagro &&
                (() => {
                  const rewards = getDisplayRewards(practice);
                  return (
                    <div
                      className="text-xs text-green-400"
                      style={{ fontFamily: "serif" }}
                    >
                      {rewards.xp} XP • {rewards.coins} 🪙
                      {rewards.isBoosted && (
                        <span className="text-orange-400 ml-1">⚡ x2</span>
                      )}
                    </div>
                  );
                })()}
            </div>
            <div className="flex flex-col items-center gap-2">
              {isUnlocked && maxReached && (
                <CheckCircle size={28} className="text-green-400" />
              )}
              {!isUnlocked && <Lock size={24} className="text-stone-600" />}
            </div>
          </div>
          {isUnlocked && !maxReached && (
            <div className="flex gap-2">
              {practice.isCycles ? (
                <>
                  <button
                    onClick={() => addPracticeCompletion(practice, 3)}
                    className="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg font-bold border-2 border-cyan-900"
                  >
                    +3 ciclos
                  </button>
                  <button
                    onClick={() => addPracticeCompletion(practice, 6)}
                    className="flex-1 bg-cyan-700 hover:bg-cyan-600 text-white px-3 py-2 rounded-lg font-bold border-2 border-cyan-900"
                  >
                    +6 ciclos
                  </button>
                </>
              ) : (
                <button
                  onClick={() => addPracticeCompletion(practice)}
                  className="w-full bg-cyan-700 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg font-bold border-2 border-cyan-900"
                >
                  <Plus size={20} className="inline mr-1" />
                  {practice.isMilagro ? "+10 min" : "Completar"}
                </button>
              )}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="space-y-4">
        <h3
          className="text-xl font-bold text-cyan-300 mb-3 border-b-2 border-cyan-800 pb-2"
          style={{ fontFamily: "serif" }}
        >
          📿 Mis Prácticas Desbloqueadas
        </h3>
        {unlockedPracticesOnly.length === 0 ? (
          <p className="text-stone-400 text-center py-8">
            No tienes prácticas desbloqueadas aún. Ve a Programas para
            desbloquear prácticas.
          </p>
        ) : (
          <div className="space-y-3">
            {unlockedPracticesOnly.map((practice) => (
              <PracticeCard key={practice.id} practice={practice} />
            ))}
          </div>
        )}
      </div>
    );
  };
  const ProgramsView = () => {
    const practicesForUnlock = allPracticesData.filter(
      (p) => p.isProgramUnlockable && !isPracticeUnlocked(p.id)
    );
    const ProgramCard = ({ program }) => {
      const isCompleted = isProgramCompleted(program.id);
      const canComplete = canCompleteProgram(program);
      const missing = getMissingPrerequisites(program);

      return (
        <div
          className={`rounded-lg p-5 border-4 ${
            isCompleted
              ? "bg-gradient-to-br from-green-900 to-teal-900 border-green-700"
              : canComplete
              ? `bg-gradient-to-br ${program.color} border-opacity-80`
              : "bg-stone-900 border-stone-700 opacity-70"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="text-5xl">{program.icon}</div>
            <div className="flex-1">
              <h3
                className="text-xl font-bold text-white mb-2"
                style={{ fontFamily: "serif" }}
              >
                {program.name}
              </h3>
              <p
                className="text-sm text-stone-300 mb-3"
                style={{ fontFamily: "serif" }}
              >
                {program.desc}
              </p>
              {!isCompleted && missing.length > 0 && (
                <div className="bg-red-900 bg-opacity-40 rounded p-2 mb-3">
                  <p
                    className="text-xs text-red-300"
                    style={{ fontFamily: "serif" }}
                  >
                    ⚠️ Requisitos faltantes: {missing.join(", ")}
                  </p>
                </div>
              )}
              {isCompleted ? (
                <div className="flex items-center gap-2 text-green-300">
                  <CheckCircle size={20} />
                  <span className="font-bold" style={{ fontFamily: "serif" }}>
                    ✓ Completado
                  </span>
                </div>
              ) : canComplete ? (
                <button
                  onClick={() => requestProgramUnlock(program)}
                  className="bg-white text-stone-900 px-6 py-2 rounded-lg font-bold hover:bg-stone-200 transition-all border-2 border-stone-700"
                  style={{ fontFamily: "serif" }}
                >
                  Marcar como completado
                </button>
              ) : (
                <div
                  className="text-stone-500 italic text-sm"
                  style={{ fontFamily: "serif" }}
                >
                  Completa los requisitos para desbloquear
                </div>
              )}
            </div>
          </div>
          {!isCompleted && (
            <div
              className="mt-3 text-green-400 text-sm font-bold"
              style={{ fontFamily: "serif" }}
            >
              💰 +{program.xpUnlock} XP
            </div>
          )}
        </div>
      );
    };

    const PracticeUnlockCard = ({ practice }) => {
      const requestPracticeUnlock = () => {
        if (practice.id === "milagro_mente") {
          if (window.confirm("¿Ya descargaste esta app?")) {
            setUnlockedPractices((prev) => [...prev, practice.id]);
            if (practice.xpUnlock) {
              setTotalXP((prev) => prev + practice.xpUnlock);
            }
          }
        } else {
          if (
            window.confirm(
              practice.unlockText || `¿Has aprendido ${practice.name}?`
            )
          ) {
            setUnlockedPractices((prev) => [...prev, practice.id]);
            if (practice.xpUnlock) {
              setTotalXP((prev) => prev + practice.xpUnlock);
            }
          }
        }
      };

      return (
        <div className="rounded-lg p-4 border-4 bg-stone-950 border-stone-800 opacity-80">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <Lock size={24} className="text-stone-600 mt-1" />
              <div className="flex-1">
                <h4
                  className="font-bold text-amber-100 mb-1"
                  style={{ fontFamily: "serif" }}
                >
                  {practice.name}
                </h4>
                <p
                  className="text-xs text-stone-400 mb-2"
                  style={{ fontFamily: "serif" }}
                >
                  {practice.unlockText ||
                    "Completa el programa correspondiente para desbloquear"}
                </p>
                <div
                  className="text-xs text-green-400"
                  style={{ fontFamily: "serif" }}
                >
                  💰 +{practice.xpUnlock} XP al desbloquear
                </div>
              </div>
            </div>
            <button
              onClick={requestPracticeUnlock}
              className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap"
            >
              {practice.id === "milagro_mente" ? "Desbloquear" : "Aprendido"}
            </button>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-6">
        <div>
          <h3
            className="text-xl font-bold text-purple-300 mb-3 border-b-2 border-purple-800 pb-2"
            style={{ fontFamily: "serif" }}
          >
            🏛️ Programas
          </h3>
          <div className="space-y-4">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </div>
        {practicesForUnlock.length > 0 && (
          <div>
            <h3
              className="text-xl font-bold text-orange-300 mb-3 border-b-2 border-orange-800 pb-2"
              style={{ fontFamily: "serif" }}
            >
              🔒 Prácticas para Desbloquear
            </h3>
            <div className="space-y-3">
              {practicesForUnlock.map((practice) => (
                <PracticeUnlockCard key={practice.id} practice={practice} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-white pb-24">
      {currentView === "garden" ? (
        <GardenView />
      ) : (
        <>
          <div className="bg-gradient-to-r from-amber-900 via-orange-900 to-amber-900 p-4 border-b-4 border-amber-700 shadow-xl sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Sparkles size={32} className="text-amber-300" />
                <h1
                  className="text-2xl font-bold text-amber-100"
                  style={{ fontFamily: "serif" }}
                >
                  Isha Tracker
                </h1>
              </div>
              <button
                onClick={() => setShowSettings(true)}
                className="bg-amber-800 hover:bg-amber-700 p-3 rounded-lg border-2 border-amber-600"
              >
                <Settings size={24} className="text-amber-200" />
              </button>
            </div>
          </div>
          <div className="max-w-6xl mx-auto p-4 mt-4">
            {currentView === "home" && <HomeView />}
            {currentView === "practices" && (
              <>
                <button
                  onClick={() => setCurrentView("home")}
                  className="mb-4 bg-stone-800 text-cyan-300 px-4 py-2 rounded-lg font-bold border-2 border-cyan-700"
                >
                  ← Volver
                </button>
                <PracticesView />
              </>
            )}
            {currentView === "programs" && (
              <>
                <button
                  onClick={() => setCurrentView("home")}
                  className="mb-4 bg-stone-800 text-purple-300 px-4 py-2 rounded-lg font-bold border-2 border-purple-700"
                >
                  ← Volver
                </button>
                <ProgramsView />
              </>
            )}
          </div>
          <CalendarModal />
          <AchievementsModal />
          <SettingsModal />
          <SoilBar />
          {showUnlockModal && programToUnlock && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
              <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg p-8 max-w-md border-4 border-purple-700">
                <h3
                  className="text-2xl font-bold text-purple-200 mb-4"
                  style={{ fontFamily: "serif" }}
                >
                  {programToUnlock.unlockText ||
                    "¿Has completado este programa?"}
                </h3>
                <p
                  className="text-purple-300 mb-6"
                  style={{ fontFamily: "serif" }}
                >
                  Programa:{" "}
                  <span className="font-bold">{programToUnlock.name}</span>
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={confirmProgramCompletion}
                    className="flex-1 bg-green-700 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-bold"
                  >
                    Sí, completado
                  </button>
                  <button
                    onClick={() => setShowUnlockModal(false)}
                    className="flex-1 bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
          {showAchievementPopup && currentAchievement && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
              <div className="bg-gradient-to-br from-yellow-900 to-amber-900 rounded-lg p-8 max-w-md border-4 border-yellow-600 text-center">
                <Trophy size={64} className="text-yellow-300 mx-auto mb-4" />
                <h3
                  className="text-3xl font-bold text-yellow-200 mb-2"
                  style={{ fontFamily: "serif" }}
                >
                  ¡Logro Desbloqueado!
                </h3>
                <h4
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "serif" }}
                >
                  {currentAchievement.name}
                </h4>
                <p
                  className="text-amber-200 mb-4"
                  style={{ fontFamily: "serif" }}
                >
                  {currentAchievement.desc}
                </p>
                <div className="flex gap-4 justify-center mb-4">
                  <span className="text-green-400 font-bold">
                    +{currentAchievement.xp} XP
                  </span>
                  <span className="text-yellow-400 font-bold">
                    +{currentAchievement.coins} 🪙
                  </span>
                </div>
                <button
                  onClick={() => setShowAchievementPopup(false)}
                  className="bg-yellow-600 hover:bg-yellow-500 text-white px-8 py-3 rounded-lg font-bold"
                >
                  ¡Continuar!
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default IshaTrackerApp;
