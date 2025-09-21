// Date pentru fișele de logică și gândire

// Secvențe și modele
export const sequencePatterns = {
  easy: [
    {
      id: 1,
      pattern: ["🔴", "🔵", "🔴", "🔵"],
      answer: "🔴",
      title: "Continuă secvența de culori",
    },
    {
      id: 2,
      pattern: ["🔺", "🔸", "🔺", "🔸"],
      answer: "🔺",
      title: "Continuă secvența de forme",
    },
    {
      id: 3,
      pattern: ["🐱", "🐶", "🐱", "🐶"],
      answer: "🐱",
      title: "Continuă secvența de animale",
    },
    {
      id: 4,
      pattern: ["🔴", "🔴", "🔵", "🔴", "🔴"],
      answer: "🔵",
      title: "Continuă secvența de culori",
    },
    {
      id: 5,
      pattern: ["🍎", "🍌", "🍎", "🍌"],
      answer: "🍎",
      title: "Continuă secvența de fructe",
    },
    {
      id: 6,
      pattern: ["⭐", "🌟", "⭐", "🌟"],
      answer: "⭐",
      title: "Continuă secvența de stele",
    },
    {
      id: 7,
      pattern: ["❤️", "💙", "❤️", "💙"],
      answer: "❤️",
      title: "Continuă secvența de inimi",
    },
    {
      id: 8,
      pattern: ["🚗", "🚕", "🚗", "🚕"],
      answer: "🚗",
      title: "Continuă secvența de mașini",
    },
    {
      id: 9,
      pattern: ["🌞", "🌙", "🌞", "🌙"],
      answer: "🌞",
      title: "Continuă secvența de soare și lună",
    },
    {
      id: 10,
      pattern: ["🔴", "🔵", "🟡", "🔴", "🔵"],
      answer: "🟡",
      title: "Continuă secvența de culori",
    },
  ],
  medium: [
    {
      id: 1,
      pattern: ["🔴", "🔵", "🟡", "🔴", "🔵"],
      answer: "🟡",
      title: "Continuă secvența de culori",
    },
    {
      id: 2,
      pattern: ["🔺", "🔸", "⬜", "🔺", "🔸"],
      answer: "⬜",
      title: "Continuă secvența de forme",
    },
    {
      id: 3,
      pattern: ["🐱", "🐶", "🐰", "🐱", "🐶"],
      answer: "🐰",
      title: "Continuă secvența de animale",
    },
    {
      id: 4,
      pattern: ["🍎", "🍌", "🍊", "🍎", "🍌"],
      answer: "🍊",
      title: "Continuă secvența de fructe",
    },
    {
      id: 5,
      pattern: ["🔴", "🔴", "🔵", "🔵", "🟡", "🔴"],
      answer: "🔴",
      title: "Continuă secvența complexă",
    },
    {
      id: 6,
      pattern: ["⭐", "🌟", "✨", "⭐", "🌟"],
      answer: "✨",
      title: "Continuă secvența de stele",
    },
    {
      id: 7,
      pattern: ["❤️", "💙", "💚", "❤️", "💙"],
      answer: "💚",
      title: "Continuă secvența de inimi",
    },
    {
      id: 8,
      pattern: ["🚗", "🚕", "🚙", "🚗", "🚕"],
      answer: "🚙",
      title: "Continuă secvența de mașini",
    },
    {
      id: 9,
      pattern: ["🌞", "🌙", "☁️", "🌞", "🌙"],
      answer: "☁️",
      title: "Continuă secvența de vreme",
    },
    {
      id: 10,
      pattern: ["🐱", "🐶", "🐰", "🐱", "🐶"],
      answer: "🐰",
      title: "Continuă secvența de animale",
    },
  ],
  hard: [
    {
      id: 1,
      pattern: ["🔴", "🔵", "🟡", "🟢", "🔴", "🔵", "🟡"],
      answer: "🟢",
      title: "Continuă secvența de culori",
    },
    {
      id: 2,
      pattern: ["🔺", "🔸", "⬜", "🔶", "🔺", "🔸", "⬜"],
      answer: "🔶",
      title: "Continuă secvența de forme",
    },
    {
      id: 3,
      pattern: ["🐱", "🐶", "🐰", "🐸", "🐱", "🐶", "🐰"],
      answer: "🐸",
      title: "Continuă secvența de animale",
    },
    {
      id: 4,
      pattern: ["🍎", "🍌", "🍊", "🍇", "🍎", "🍌", "🍊"],
      answer: "🍇",
      title: "Continuă secvența de fructe",
    },
    {
      id: 5,
      pattern: ["🔴", "🔴", "🔵", "🔵", "🟡", "🟡", "🟢", "🔴"],
      answer: "🔴",
      title: "Continuă secvența complexă",
    },
  ],
  expert: [
    {
      id: 1,
      pattern: ["🔴", "🔵", "🟡", "🟢", "🟣", "🔴", "🔵", "🟡", "🟢"],
      answer: "🟣",
      title: "Continuă secvența expert de culori",
    },
    {
      id: 2,
      pattern: ["🔺", "🔸", "⬜", "🔶", "🔷", "🔺", "🔸", "⬜", "🔶"],
      answer: "🔷",
      title: "Continuă secvența expert de forme",
    },
    {
      id: 3,
      pattern: ["🐱", "🐶", "🐰", "🐸", "🐸", "🐱", "🐶", "🐰", "🐸"],
      answer: "🐸",
      title: "Continuă secvența expert de animale",
    },
    {
      id: 4,
      pattern: ["🍎", "🍌", "🍊", "🍇", "🍓", "🍎", "🍌", "🍊", "🍇"],
      answer: "🍓",
      title: "Continuă secvența expert de fructe",
    },
    {
      id: 5,
      pattern: ["🔴", "🔴", "🔵", "🔵", "🟡", "🟡", "🟢", "🟢", "🟣", "🔴"],
      answer: "🔴",
      title: "Continuă secvența expert complexă",
    },
  ],
  master: [
    {
      id: 1,
      pattern: [
        "🔴",
        "🔵",
        "🟡",
        "🟢",
        "🟣",
        "🟠",
        "🔴",
        "🔵",
        "🟡",
        "🟢",
        "🟣",
      ],
      answer: "🟠",
      title: "Continuă secvența master de culori",
    },
    {
      id: 2,
      pattern: [
        "🔺",
        "🔸",
        "⬜",
        "🔶",
        "🔷",
        "🔴",
        "🔺",
        "🔸",
        "⬜",
        "🔶",
        "🔷",
      ],
      answer: "🔴",
      title: "Continuă secvența master de forme",
    },
    {
      id: 3,
      pattern: [
        "🐱",
        "🐶",
        "🐰",
        "🐸",
        "🐸",
        "🐸",
        "🐱",
        "🐶",
        "🐰",
        "🐸",
        "🐸",
      ],
      answer: "🐸",
      title: "Continuă secvența master de animale",
    },
    {
      id: 4,
      pattern: [
        "🍎",
        "🍌",
        "🍊",
        "🍇",
        "🍓",
        "🍒",
        "🍎",
        "🍌",
        "🍊",
        "🍇",
        "🍓",
      ],
      answer: "🍒",
      title: "Continuă secvența master de fructe",
    },
    {
      id: 5,
      pattern: [
        "🔴",
        "🔴",
        "🔵",
        "🔵",
        "🟡",
        "🟡",
        "🟢",
        "🟢",
        "🟣",
        "🟣",
        "🟠",
        "🔴",
      ],
      answer: "🔴",
      title: "Continuă secvența master complexă",
    },
  ],
};

// Potrivirea formelor
export const shapeMatching = {
  easy: [
    {
      id: 1,
      shapes: ["🔺", "🔸", "⬜", "🔶"],
      objects: ["🏠", "🍕", "📱", "🔺"],
      title: "Potrivește forma cu obiectul",
    },
    {
      id: 2,
      shapes: ["🔴", "🔵", "🟡", "🟢"],
      objects: ["🍎", "🌊", "☀️", "🌿"],
      title: "Potrivește culoarea cu obiectul",
    },
    {
      id: 3,
      shapes: ["🔺", "🔸", "⬜", "🔶"],
      objects: ["⛰️", "🍕", "📱", "🔺"],
      title: "Potrivește forma cu obiectul",
    },
  ],
  medium: [
    {
      id: 1,
      shapes: ["🔺", "🔸", "⬜", "🔶", "🔷"],
      objects: ["🏠", "🍕", "📱", "🔺", "🔷"],
      title: "Potrivește forma cu obiectul",
    },
    {
      id: 2,
      shapes: ["🔴", "🔵", "🟡", "🟢", "🟣"],
      objects: ["🍎", "🌊", "☀️", "🌿", "🟣"],
      title: "Potrivește culoarea cu obiectul",
    },
  ],
  hard: [
    {
      id: 1,
      shapes: ["🔺", "🔸", "⬜", "🔶", "🔷", "🔴"],
      objects: ["🏠", "🍕", "📱", "🔺", "🔷", "🔴"],
      title: "Potrivește forma cu obiectul",
    },
  ],
};

// Recunoașterea culorilor
export const colorRecognition = {
  easy: [
    {
      id: 1,
      color: "🔴",
      objects: ["🍎", "🚗", "🌹", "🔵"],
      title: "Găsește toate obiectele roșii",
    },
    {
      id: 2,
      color: "🔵",
      objects: ["🌊", "🚗", "🔵", "🟡"],
      title: "Găsește toate obiectele albastre",
    },
    {
      id: 3,
      color: "🟡",
      objects: ["☀️", "🍌", "🟡", "🔴"],
      title: "Găsește toate obiectele galbene",
    },
  ],
  medium: [
    {
      id: 1,
      color: "🟢",
      objects: ["🌿", "🍏", "🟢", "🔴", "🔵"],
      title: "Găsește toate obiectele verzi",
    },
    {
      id: 2,
      color: "🟣",
      objects: ["🍇", "🟣", "🔴", "🟡", "🔵"],
      title: "Găsește toate obiectele violet",
    },
  ],
  hard: [
    {
      id: 1,
      color: "🟠",
      objects: ["🍊", "🟠", "🔴", "🟡", "🔵", "🟢"],
      title: "Găsește toate obiectele portocalii",
    },
  ],
};

// Clasificări și grupări
export const classification = {
  easy: [
    {
      id: 1,
      category: "Animale",
      items: ["🐱", "🐶", "🐰", "🏠", "🍎", "🐸"],
      title: "Grupă animalele împreună",
    },
    {
      id: 2,
      category: "Fructe",
      items: ["🍎", "🍌", "🍊", "🚗", "🐱", "🍇"],
      title: "Grupă fructele împreună",
    },
    {
      id: 3,
      category: "Vehicule",
      items: ["🚗", "🚌", "✈️", "🐶", "🍎", "🚂"],
      title: "Grupă vehiculele împreună",
    },
  ],
  medium: [
    {
      id: 1,
      category: "Animale domestice",
      items: ["🐱", "🐶", "🐰", "🐸", "🏠", "🍎"],
      title: "Grupă animalele domestice",
    },
    {
      id: 2,
      category: "Fructe citrice",
      items: ["🍊", "🍋", "🍇", "🍎", "🍌", "🍊"],
      title: "Grupă fructele citrice",
    },
  ],
  hard: [
    {
      id: 1,
      category: "Animale marine",
      items: ["🐠", "🐙", "🦈", "🐱", "🍎", "🐠"],
      title: "Grupă animalele marine",
    },
  ],
};

// Labirinturi simple cu obiecte diverse
export const mazeSimple = {
  easy: [
    {
      id: 1,
      start: "🐱",
      end: "🐟",
      path: "→→↓→↓→→↓→→↓→→",
      title: "Ajută pisica să ajungă la pește",
    },
    {
      id: 2,
      start: "🐶",
      end: "🦴",
      path: "↓→→↓→→↓→→↓→→",
      title: "Ajută câinele să ajungă la os",
    },
    {
      id: 3,
      start: "🐻",
      end: "🍯",
      path: "→→↓→↓→→↓→→↓→→",
      title: "Ajută ursul să ajungă la miere",
    },
    {
      id: 4,
      start: "🐸",
      end: "🪷",
      path: "↓→→↓→→↓→→↓→→",
      title: "Ajută broasca să ajungă la floare",
    },
    {
      id: 5,
      start: "🐰",
      end: "🥕",
      path: "→→↓→↓→→↓→→↓→→",
      title: "Ajută iepurele să ajungă la morcov",
    },
    {
      id: 6,
      start: "🐧",
      end: "🐟",
      path: "↓→→↓→→↓→→↓→→",
      title: "Ajută pinguinul să ajungă la pește",
    },
  ],
  medium: [
    {
      id: 1,
      start: "🦆",
      end: "🌾",
      path: "→→↓→→↓→→↓→→↓→→",
      title: "Ajută rața să ajungă la grâu",
    },
    {
      id: 2,
      start: "🦉",
      end: "🐭",
      path: "→→↓→→↓→→↓→→↓→→↓→→",
      title: "Ajută bufnita să ajungă la șoarece",
    },
    {
      id: 3,
      start: "🐸",
      end: "🦗",
      path: "→→↓→→↓→→↓→→↓→→",
      title: "Ajută broasca să ajungă la lăcustă",
    },
    {
      id: 4,
      start: "🐱",
      end: "🐟",
      path: "→→↓→→↓→→↓→→↓→→↓→→",
      title: "Ajută pisica să ajungă la pește",
    },
    {
      id: 5,
      start: "🐰",
      end: "🥬",
      path: "→→↓→→↓→→↓→→↓→→",
      title: "Ajută iepurele să ajungă la varză",
    },
    {
      id: 6,
      start: "🐻",
      end: "🍓",
      path: "→→↓→→↓→→↓→→↓→→↓→→",
      title: "Ajută ursul să ajungă la căpșună",
    },
  ],
};

// Jocuri de memorie
export const memoryGame = {
  easy: [
    {
      id: 1,
      pairs: [
        { emoji: "🐱", match: "🐟" },
        { emoji: "🐶", match: "🦴" },
        { emoji: "🐰", match: "🥕" },
      ],
      title: "Găsește perechile",
    },
  ],
  medium: [
    {
      id: 1,
      pairs: [
        { emoji: "🐱", match: "🐟" },
        { emoji: "🐶", match: "🦴" },
        { emoji: "🐰", match: "🥕" },
        { emoji: "🐸", match: "🪷" },
      ],
      title: "Găsește perechile",
    },
  ],
  hard: [
    {
      id: 1,
      pairs: [
        { emoji: "🐱", match: "🐟" },
        { emoji: "🐶", match: "🦴" },
        { emoji: "🐰", match: "🥕" },
        { emoji: "🐸", match: "🪷" },
        { emoji: "🐠", match: "🌊" },
      ],
      title: "Găsește perechile",
    },
  ],
};

// Figuri geometrice și culori
export const geometricShapes = {
  easy: {
    colorKey: [
      { color: "Galben", shape: "🟡", shapeName: "triunghi" },
      { color: "Roșu", shape: "🔴", shapeName: "pătrat" },
      { color: "Albastru", shape: "🔵", shapeName: "dreptunghi" },
      { color: "Verde", shape: "🟢", shapeName: "cerc" },
    ],
    shapesToColor: [
      { shape: "🟢", name: "cerc", size: "large" },
      { shape: "🔵", name: "dreptunghi", size: "medium" },
      { shape: "🟡", name: "triunghi", size: "large" },
      { shape: "🔴", name: "pătrat", size: "small" },
      { shape: "🔵", name: "dreptunghi", size: "small" },
      { shape: "🔴", name: "pătrat", size: "large" },
      { shape: "🟡", name: "triunghi", size: "small" },
      { shape: "🟢", name: "cerc", size: "small" },
      { shape: "🔴", name: "pătrat", size: "medium" },
      { shape: "🔵", name: "dreptunghi", size: "large" },
      { shape: "🟢", name: "cerc", size: "medium" },
    ],
    sequences: [
      {
        pattern: ["🔵", "🟢", "🟡", "🔵"],
        title: "Continuă șirul și colorează corespunzător",
        nextShapes: ["🟢", "🟡"],
      },
      {
        pattern: ["🔴", "🟡", "🟡", "🔴"],
        title: "Continuă șirul și colorează corespunzător",
        nextShapes: ["🟡", "🟡"],
      },
    ],
  },
  medium: {
    colorKey: [
      { color: "Galben", shape: "🟡", shapeName: "triunghi" },
      { color: "Roșu", shape: "🔴", shapeName: "pătrat" },
      { color: "Albastru", shape: "🔵", shapeName: "dreptunghi" },
      { color: "Verde", shape: "🟢", shapeName: "cerc" },
      { color: "Violet", shape: "🟣", shapeName: "romb" },
      { color: "Portocaliu", shape: "🟠", shapeName: "oval" },
    ],
    shapesToColor: [
      { shape: "🟢", name: "cerc", size: "large" },
      { shape: "🔵", name: "dreptunghi", size: "medium" },
      { shape: "🟡", name: "triunghi", size: "large" },
      { shape: "🔴", name: "pătrat", size: "small" },
      { shape: "🟣", name: "romb", size: "small" },
      { shape: "🟠", name: "oval", size: "medium" },
      { shape: "🔵", name: "dreptunghi", size: "small" },
      { shape: "🔴", name: "pătrat", size: "large" },
      { shape: "🟡", name: "triunghi", size: "small" },
      { shape: "🟢", name: "cerc", size: "small" },
      { shape: "🟣", name: "romb", size: "large" },
      { shape: "🟠", name: "oval", size: "small" },
      { shape: "🔴", name: "pătrat", size: "medium" },
      { shape: "🔵", name: "dreptunghi", size: "large" },
      { shape: "🟢", name: "cerc", size: "medium" },
    ],
    sequences: [
      {
        pattern: ["🔵", "🟢", "🟡", "🔵", "🟢"],
        title: "Continuă șirul și colorează corespunzător",
        nextShapes: ["🟡", "🔵"],
      },
      {
        pattern: ["🔴", "🟡", "🟣", "🔴", "🟡"],
        title: "Continuă șirul și colorează corespunzător",
        nextShapes: ["🟣", "🔴"],
      },
      {
        pattern: ["🟠", "🔵", "🟠", "🔵", "🟠"],
        title: "Continuă șirul și colorează corespunzător",
        nextShapes: ["🔵", "🟠"],
      },
    ],
  },
  hard: {
    colorKey: [
      { color: "Galben", shape: "🟡", shapeName: "triunghi" },
      { color: "Roșu", shape: "🔴", shapeName: "pătrat" },
      { color: "Albastru", shape: "🔵", shapeName: "dreptunghi" },
      { color: "Verde", shape: "🟢", shapeName: "cerc" },
      { color: "Violet", shape: "🟣", shapeName: "romb" },
      { color: "Portocaliu", shape: "🟠", shapeName: "oval" },
      { color: "Roz", shape: "🩷", shapeName: "hexagon" },
    ],
    shapesToColor: [
      { shape: "🟢", name: "cerc", size: "large" },
      { shape: "🔵", name: "dreptunghi", size: "medium" },
      { shape: "🟡", name: "triunghi", size: "large" },
      { shape: "🔴", name: "pătrat", size: "small" },
      { shape: "🟣", name: "romb", size: "small" },
      { shape: "🟠", name: "oval", size: "medium" },
      { shape: "🩷", name: "hexagon", size: "small" },
      { shape: "🔵", name: "dreptunghi", size: "small" },
      { shape: "🔴", name: "pătrat", size: "large" },
      { shape: "🟡", name: "triunghi", size: "small" },
      { shape: "🟢", name: "cerc", size: "small" },
      { shape: "🟣", name: "romb", size: "large" },
      { shape: "🟠", name: "oval", size: "small" },
      { shape: "🩷", name: "hexagon", size: "medium" },
      { shape: "🔴", name: "pătrat", size: "medium" },
      { shape: "🔵", name: "dreptunghi", size: "large" },
      { shape: "🟢", name: "cerc", size: "medium" },
      { shape: "🟡", name: "triunghi", size: "medium" },
    ],
    sequences: [
      {
        pattern: ["🔵", "🟢", "🟡", "🔵", "🟢", "🟡"],
        title: "Continuă șirul și colorează corespunzător",
        nextShapes: ["🔵", "🟢"],
      },
      {
        pattern: ["🔴", "🟡", "🟣", "🔴", "🟡", "🟣"],
        title: "Continuă șirul și colorează corespunzător",
        nextShapes: ["🔴", "🟡"],
      },
      {
        pattern: ["🟠", "🔵", "🩷", "🟠", "🔵", "🩷"],
        title: "Continuă șirul și colorează corespunzător",
        nextShapes: ["🟠", "🔵"],
      },
      {
        pattern: ["🟢", "🟣", "🟢", "🟣", "🟢", "🟣"],
        title: "Continuă șirul și colorează corespunzător",
        nextShapes: ["🟢", "🟣"],
      },
    ],
  },
};
