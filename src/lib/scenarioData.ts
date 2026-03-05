export interface QuickScenario {
  id: string;
  title: string;
  emoji: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'party' | 'work' | 'family' | 'medical' | 'social';
  situation: string;
  pressure?: string; // Social pressure or urgency description
  choices: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback: string;
    healthImpact: number;
  }[];
  tip: string;
  timeLimit?: number; // seconds, optional
}

export const quickScenarios: QuickScenario[] = [
  // EINFACHE SZENARIEN
  {
    id: 'party_wine',
    title: 'Geburtstagsfeier',
    emoji: '🎂',
    difficulty: 'easy',
    category: 'party',
    situation: 'Du bist auf einer Geburtstagsfeier. Der Gastgeber schenkt Wein ein und stellt dir ein Glas hin.',
    pressure: 'Alle anderen trinken mit. "Prost!" rufen sie.',
    choices: [
      {
        id: 'accept',
        text: 'Das Glas nehmen und mittrinken',
        isCorrect: false,
        feedback: 'Alkohol in der Schwangerschaft ist nie sicher – auch nicht "nur ein Glas".',
        healthImpact: -15,
      },
      {
        id: 'decline',
        text: 'Nein danke sagen und nach Wasser fragen',
        isCorrect: true,
        feedback: 'Perfekt! Wasser ist die beste Wahl. Du schützt dein Baby.',
        healthImpact: 10,
      },
      {
        id: 'sip',
        text: 'Nur einen kleinen Schluck probieren',
        isCorrect: false,
        feedback: 'Auch ein kleiner Schluck Alkohol erreicht dein ungeborenes Baby.',
        healthImpact: -10,
      },
      {
        id: 'pretend',
        text: 'Das Glas nehmen, aber nicht trinken',
        isCorrect: true,
        feedback: 'Clever! Du vermeidest Konflikte, ohne dein Baby zu gefährden.',
        healthImpact: 5,
      },
    ],
    tip: 'Es ist immer okay, Nein zu Alkohol zu sagen. Du schützt damit zwei Leben!',
  },
  {
    id: 'friend_question',
    title: 'Die neugierige Freundin',
    emoji: '👭',
    difficulty: 'easy',
    category: 'social',
    situation: 'Deine Freundin fragt: "Trinkst du nicht mit? Du bist sonst immer dabei!" Du bist in der 8. Woche schwanger.',
    pressure: 'Sie schaut dich erwartungsvoll an.',
    choices: [
      {
        id: 'honest',
        text: 'Ich bin schwanger und trinke deshalb keinen Alkohol',
        isCorrect: true,
        feedback: 'Ehrlichkeit ist meistens am besten. Wahre Freunde verstehen das!',
        healthImpact: 15,
      },
      {
        id: 'antibiotics',
        text: 'Ich nehme Antibiotika, deshalb nicht',
        isCorrect: true,
        feedback: 'Eine harmlose Ausrede, die funktioniert. Du schützt dein Baby.',
        healthImpact: 5,
      },
      {
        id: 'just_one',
        text: 'Okay, nur ein Glas dann',
        isCorrect: false,
        feedback: 'In der 8. Woche entwickeln sich die Organe – Alkohol ist besonders gefährlich!',
        healthImpact: -20,
      },
      {
        id: 'later',
        text: 'Ich trinke heute nichts, vielleicht später',
        isCorrect: true,
        feedback: 'Eine gute Entscheidung! So vermeidest du Erklärungsbedarf.',
        healthImpact: 10,
      },
    ],
    tip: 'Du musst nicht lügen – aber du musst auch nicht alles erklären. Dein Baby steht an erster Stelle.',
  },
  {
    id: 'dinner_restaurant',
    title: 'Im Restaurant',
    emoji: '🍽️',
    difficulty: 'easy',
    category: 'social',
    situation: 'Im Restaurant fragt der Kellner: "Und zum Trinken?" Dein Partner bestellt ein Bier.',
    pressure: 'Der Kellner wartet auf deine Bestellung.',
    choices: [
      {
        id: 'same',
        text: 'Ein Bier für mich auch, bitte',
        isCorrect: false,
        feedback: 'Bier enthält Alkohol – auch das kann deinem Baby schaden.',
        healthImpact: -15,
      },
      {
        id: 'water',
        text: 'Ein Mineralwasser, bitte',
        isCorrect: true,
        feedback: 'Wasser ist perfekt! Hydriert und sicher für dein Baby.',
        healthImpact: 10,
      },
      {
        id: 'mocktail',
        text: 'Haben Sie alkoholfreie Cocktails?',
        isCorrect: true,
        feedback: 'Toll! Mocktails sind eine leckere Alternative ohne Alkohol.',
        healthImpact: 10,
      },
      {
        id: 'wine',
        text: 'Ein Glas Rotwein – das ist doch gesund',
        isCorrect: false,
        feedback: 'Rotwein enthält Alkohol. Es gibt keine sichere Menge in der Schwangerschaft!',
        healthImpact: -15,
      },
    ],
    tip: 'Viele Restaurants bieten alkoholfreie Alternativen an – frag einfach!',
  },

  // MITTELSCHwere SZENARIEN
  {
    id: 'work_event',
    title: 'Firmenfeier',
    emoji: '🎊',
    difficulty: 'medium',
    category: 'work',
    situation: 'Auf der Firmenfeier wird angestoßen. Dein Chef kommt mit einem Sekt zu dir.',
    pressure: '"Na, auf das neue Jahr!" Er hält dir das Glas hin.',
    choices: [
      {
        id: 'accept',
        text: 'Das Glas nehmen und anstoßen',
        isCorrect: false,
        feedback: 'Sekt enthält Alkohol. Auch bei Geschäftsanlässen darfst du Nein sagen.',
        healthImpact: -15,
      },
      {
        id: 'decline_explain',
        text: 'Nein danke, ich trinke keinen Alkohol – aber ich stoße gerne mit Wasser an',
        isCorrect: true,
        feedback: 'Sehr gut! Du bleibst standhaft und bist trotzdem dabei.',
        healthImpact: 15,
      },
      {
        id: 'fake_sip',
        text: 'Anstoßen und so tun als würdest du trinken',
        isCorrect: true,
        feedback: 'Sozialer Trick, der funktioniert! Du sicherst dein Baby ab.',
        healthImpact: 5,
      },
      {
        id: 'leave',
        text: 'Ich muss leider gehen',
        isCorrect: false,
        feedback: 'Du müsstest nicht gehen. Es gibt bessere Lösungen!',
        healthImpact: -5,
      },
    ],
    tip: 'In Deutschland gilt das Mutterschutzgesetz – niemand darf dich wegen Schwangerschaft benachteiligen.',
    timeLimit: 20,
  },
  {
    id: 'partner_offers',
    title: 'Der Partner bietet an',
    emoji: '💑',
    difficulty: 'medium',
    category: 'family',
    situation: 'Dein Partner kommt mit Wein aus dem Supermarkt. "Ich hab deinen Lieblingswein gekauft!"',
    pressure: 'Er freut sich und möchte dir eine Freude machen.',
    choices: [
      {
        id: 'drink',
        text: 'Wie nett! Ich freue mich auf ein Glas',
        isCorrect: false,
        feedback: 'Auch wenn es nett gemeint ist – Alkohol schadet deinem Baby.',
        healthImpact: -20,
      },
      {
        id: 'explain',
        text: 'Das ist lieb, aber ich bin schwanger – können wir alkoholfrei feiern?',
        isCorrect: true,
        feedback: 'Perfekte Kommunikation! Dein Partner versteht und kann dich unterstützen.',
        healthImpact: 20,
      },
      {
        id: 'save',
        text: 'Super, den heben wir für später auf!',
        isCorrect: true,
        feedback: 'Gute Idee! Nach der Schwangerschaft kannst du wieder genießen.',
        healthImpact: 10,
      },
      {
        id: 'he_drinks',
        text: 'Trink du, ich nehme Wasser',
        isCorrect: true,
        feedback: 'Du schützt dein Baby und lässt deinen Partner genießen.',
        healthImpact: 10,
      },
    ],
    tip: 'Teile deine Schwangerschaft mit deinem Partner – so kann er dich aktiv unterstützen!',
  },
  {
    id: 'doctor_visit',
    title: 'Beim Frauenarzt',
    emoji: '👩‍⚕️',
    difficulty: 'medium',
    category: 'medical',
    situation: 'Der Arzt fragt: "Haben Sie Alkohol getrunken?" Du hattest ein Glas Wein, bevor du wusstest, dass du schwanger bist.',
    pressure: 'Du schämst dich und überlegst, ob du die Wahrheit sagst.',
    choices: [
      {
        id: 'lie',
        text: 'Nein, ich trinke keinen Alkohol',
        isCorrect: false,
        feedback: 'Ärzte brauchen ehrliche Informationen, um dich und dein Baby bestmöglich zu betreuen.',
        healthImpact: -5,
      },
      {
        id: 'truth',
        text: 'Ja, einmal, bevor ich es wusste. Macht das was?',
        isCorrect: true,
        feedback: 'Mutig und richtig! Der Arzt kann dich jetzt beruhigen und informieren.',
        healthImpact: 15,
      },
      {
        id: 'little',
        text: 'Nur ein kleines bisschen',
        isCorrect: false,
        feedback: 'Unklare Angaben helfen dem Arzt nicht. Sei konkret.',
        healthImpact: -5,
      },
      {
        id: 'deny',
        text: 'Das möchte ich nicht beantworten',
        isCorrect: false,
        feedback: 'Der Arzt ist verpflichtet, Schweigepflicht zu halten. Ehrlichkeit ist wichtig.',
        healthImpact: -5,
      },
    ],
    tip: 'Ärzte sind da, um zu helfen, nicht zu verurteilen. Ehrlichkeit schützt dein Baby.',
  },

  // SCHWIERIGE SZENARIEN
  {
    id: 'peer_pressure',
    title: 'Gruppenzwang',
    emoji: '👯',
    difficulty: 'hard',
    category: 'party',
    situation: 'Auf einer Party rufen deine Freunde: "Trink mit! Nicht so langweilig!" Sie wollen Shots trinken.',
    pressure: 'Alle schauen dich an. "Bist du krank oder was?" ruft einer.',
    choices: [
      {
        id: 'give_in',
        text: 'Okay, okay, ich mach mit',
        isCorrect: false,
        feedback: 'Harter Alkohol ist besonders gefährlich! Gruppenzwang sollte nie dein Baby gefährden.',
        healthImpact: -30,
      },
      {
        id: 'announce',
        text: 'Ich bin schwanger und trinke keinen Alkohol. Punkt.',
        isCorrect: true,
        feedback: 'Klar und direkt! Wahre Freunde respektieren das.',
        healthImpact: 20,
      },
      {
        id: 'excuse',
        text: 'Ich muss morgen fit sein, ich nehme Wasser',
        isCorrect: true,
        feedback: 'Gute Strategie! Du setzt Grenzen ohne Konflikt.',
        healthImpact: 15,
      },
      {
        id: 'leave',
        text: 'Du gehst nach Hause',
        isCorrect: true,
        feedback: 'Wenn der Druck zu groß wird, ist Gehen eine gute Wahl.',
        healthImpact: 10,
      },
    ],
    tip: 'Dein Baby ist wichtiger als Party-Stimmung. Wahre Freunde akzeptieren ein Nein.',
    timeLimit: 15,
  },
  {
    id: 'wedding',
    title: 'Hochzeit',
    emoji: '💒',
    difficulty: 'hard',
    category: 'social',
    situation: 'Auf einer Hochzeit gibt es Champagner für den Toast. Die Braut kommt persönlich mit dem Glas zu dir.',
    pressure: '"Bitte trink mit auf uns!" sagt sie strahlend.',
    choices: [
      {
        id: 'drink',
        text: 'Natürlich, alles Gute! *trinkt*',
        isCorrect: false,
        feedback: 'Auch bei besonderen Anlässen ist Alkohol gefährlich für dein Baby.',
        healthImpact: -15,
      },
      {
        id: 'toast_water',
        text: 'Ich stoße mit Wasser an – alles Gute euch!',
        isCorrect: true,
        feedback: 'Der Toast zählt, nicht der Alkohol. Du bist dabei, ohne zu trinken!',
        healthImpact: 20,
      },
      {
        id: 'whisper',
        text: 'Ich bin schwanger, darf ich mit Wasser anstoßen?',
        isCorrect: true,
        feedback: 'Sehr gut! Die Braut wird es sicher verstehen.',
        healthImpact: 15,
      },
      {
        id: 'pretend_drink',
        text: 'Anstoßen und nur so tun als ob',
        isCorrect: true,
        feedback: 'Soziale Rettung! Du bist dabei ohne Alkohol.',
        healthImpact: 10,
      },
    ],
    tip: 'Niemand erwartet, dass du Alkohol trinkst. Ein Toast gilt auch mit Wasser!',
    timeLimit: 20,
  },
  {
    id: 'stress_night',
    title: 'Stressige Nacht',
    emoji: '😰',
    difficulty: 'hard',
    category: 'work',
    situation: 'Du hattest einen furchtbaren Tag. Zu Hause öffnest du den Weinschrank. "Ein Glas würde mir gut tun..."',
    pressure: 'Du bist gestresst, müde und sehnst dich nach Entspannung.',
    choices: [
      {
        id: 'drink',
        text: 'Nur ein Glas zur Entspannung',
        isCorrect: false,
        feedback: 'Stress und Alkohol sind eine gefährliche Kombination für dich und dein Baby.',
        healthImpact: -25,
      },
      {
        id: 'bath',
        text: 'Stattdessen ein warmes Bad nehmen',
        isCorrect: true,
        feedback: 'Tolle Alternative! Entspannung ohne Risiken.',
        healthImpact: 20,
      },
      {
        id: 'tea',
        text: 'Einen beruhigenden Kräutertee machen',
        isCorrect: true,
        feedback: 'Perfekt! Tee kann auch beruhigen und ist sicher.',
        healthImpact: 15,
      },
      {
        id: 'call',
        text: 'Eine gute Freundin anrufen und reden',
        isCorrect: true,
        feedback: 'Soziale Unterstützung ist eine der besten Stressbewältigungsstrategien!',
        healthImpact: 20,
      },
    ],
    tip: 'Es gibt viele Wege zur Entspannung ohne Alkohol: Baden, Tee, Spazieren, Musik, Meditation...',
  },

  // Zusätzliche Szenarien
  {
    id: 'christmas',
    title: 'Weihnachtsfeier',
    emoji: '🎄',
    difficulty: 'medium',
    category: 'family',
    situation: 'Bei der Familienfeier reicht dir deine Tante den Glühwein. "Der ist selbstgemacht!"',
    pressure: 'Die ganze Familie schaut. "Probier doch!"',
    choices: [
      {
        id: 'drink',
        text: 'Danke, Tante! *trinkt*',
        isCorrect: false,
        feedback: 'Glühwein enthält viel Alkohol. Auch selbstgemachter ist gefährlich.',
        healthImpact: -20,
      },
      {
        id: 'alcohol_free',
        text: 'Gibt es auch alkoholfreien Glühwein?',
        isCorrect: true,
        feedback: 'Sehr gut! Kinderpunsch oder alkoholfreier Glühwein schmeckt genauso gut!',
        healthImpact: 15,
      },
      {
        id: 'decline',
        text: 'Nein danke, ich trinke gerade keinen Alkohol',
        isCorrect: true,
        feedback: 'Perfekt! Du setzt Grenzen, ohne dich zu rechtfertigen.',
        healthImpact: 15,
      },
      {
        id: 'hot_chocolate',
        text: 'Ich nehme lieber heiße Schokolade',
        isCorrect: true,
        feedback: 'Leckere Alternative! Du bleibst dabei und trinkst sicher.',
        healthImpact: 10,
      },
    ],
    tip: 'Alkoholfreier Glühwein (Kinderpunsch) ist eine tolle Alternative in der Weihnachtszeit!',
  },
  {
    id: 'beer_garden',
    title: 'Im Biergarten',
    emoji: '🍺',
    difficulty: 'easy',
    category: 'social',
    situation: 'Ein schöner Sommertag im Biergarten. Die Bedienung kommt zur Bestellung.',
    pressure: 'Alle anderen bestellen Bier.',
    choices: [
      {
        id: 'beer',
        text: 'Ein Helles, bitte!',
        isCorrect: false,
        feedback: 'Bier enthält Alkohol – auch "nur ein Bier" ist nicht sicher.',
        healthImpact: -15,
      },
      {
        id: 'non_alcoholic_beer',
        text: 'Ein alkoholfreies Bier, bitte',
        isCorrect: true,
        feedback: 'Tolle Wahl! Alkoholfreies Bier ist sicher und erfrischend.',
        healthImpact: 15,
      },
      {
        id: 'radler_zero',
        text: 'Ein alkoholfreies Radler',
        isCorrect: true,
        feedback: 'Perfekt! Erfrischend und sicher für dein Baby.',
        healthImpact: 15,
      },
      {
        id: 'soda',
        text: 'Eine Cola, bitte',
        isCorrect: true,
        feedback: 'Jede alkoholfreie Alternative ist eine gute Wahl!',
        healthImpact: 10,
      },
    ],
    tip: 'Alkoholfreies Bier schmeckt fast wie das Original und ist in der Schwangerschaft erlaubt!',
  },
];

// Helper function to get random scenarios
export function getRandomScenarios(count: number = 5): QuickScenario[] {
  const shuffled = [...quickScenarios].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Helper function to get scenarios by difficulty
export function getScenariosByDifficulty(difficulty: QuickScenario['difficulty']): QuickScenario[] {
  return quickScenarios.filter(s => s.difficulty === difficulty);
}

// Helper function to get scenarios by category
export function getScenariosByCategory(category: QuickScenario['category']): QuickScenario[] {
  return quickScenarios.filter(s => s.category === category);
}
