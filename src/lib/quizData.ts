export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'medical' | 'social' | 'prevention' | 'facts';
  difficulty: 'easy' | 'medium' | 'hard';
}

export const quizQuestions: QuizQuestion[] = [
  // EINFACHE FRAGEN
  {
    id: 'q1',
    question: 'Was bedeutet die Abkürzung FASD?',
    options: [
      'Fetales Alkohol Spektrum Disorder',
      'Fetales Alkohol Syndrom Disorder',
      'Fetales Alkohol Spektrum Störung',
      'Funktionelle Alkohol Syndrom Disorder'
    ],
    correctIndex: 0,
    explanation: 'FASD steht für "Fetales Alkohol Spektrum Disorder" (Fetales Alkoholspektrum-Störung). Es ist der Überbegriff für alle Schädigungen, die durch Alkoholkonsum in der Schwangerschaft verursacht werden können.',
    category: 'facts',
    difficulty: 'easy',
  },
  {
    id: 'q2',
    question: 'Kann Alkohol die Plazenta passieren und das ungeborene Baby erreichen?',
    options: [
      'Nein, die Plazenta filtert Alkohol vollständig',
      'Ja, Alkohol passiert die Plazenta ungehindert',
      'Nur bei sehr hohem Alkoholkonsum',
      'Nur im letzten Schwangerschaftsdrittel'
    ],
    correctIndex: 1,
    explanation: 'Ja, Alkohol passiert die Plazenta ungehindert und erreicht das ungeborene Kind direkt. Die Leber des Fötus kann Alkohol noch nicht abbauen, wodurch der Alkoholspiegel beim Kind oft höher ist als bei der Mutter.',
    category: 'medical',
    difficulty: 'easy',
  },
  {
    id: 'q3',
    question: 'Gibt es eine sichere Menge Alkohol in der Schwangerschaft?',
    options: [
      'Ja, ein Glas Wein pro Woche ist sicher',
      'Ja, aber nur im letzten Monat',
      'Nein, es gibt keine sichere Menge',
      'Ja, maximal 2 Gläser pro Monat'
    ],
    correctIndex: 2,
    explanation: 'Es gibt KEINE sichere Menge Alkohol in der Schwangerschaft. Selbst kleine Mengen können das ungeborene Kind schädigen. Die World Health Organization (WHO) empfiehlt daher: Kein Alkohol in der Schwangerschaft.',
    category: 'medical',
    difficulty: 'easy',
  },
  {
    id: 'q4',
    question: 'Wann ist der gefährlichste Zeitpunkt für Alkoholkonsum in der Schwangerschaft?',
    options: [
      'Im letzten Monat',
      'Im 7. und 8. Monat',
      'Die gesamte Schwangerschaft ist kritisch',
      'Nur bei der Geburt'
    ],
    correctIndex: 2,
    explanation: 'Die gesamte Schwangerschaft ist kritisch. Besonders empfindlich ist das erste Trimenon (Wochen 1-12) für Organfehlbildungen, aber auch später kann Alkohol das Wachstum und die Gehirnentwicklung beeinträchtigen.',
    category: 'medical',
    difficulty: 'easy',
  },
  {
    id: 'q5',
    question: 'Was ist eine gute Strategie, um in der Schwangerschaft nicht versehentlich Alkohol zu trinken?',
    options: [
      'Nur zu Hause trinken',
      'Alkoholfreie Alternativen bereitstellen',
      'Weniger trinken als vorher',
      'Auf den Durst warten'
    ],
    correctIndex: 1,
    explanation: 'Alkoholfreie Alternativen wie Mocktails, alkoholfreies Bier oder Saft sind eine hervorragende Strategie. So können Schwangere gesellschaftlich teilnehmen, ohne ihr Baby zu gefährden.',
    category: 'prevention',
    difficulty: 'easy',
  },

  // MITTELSCHwere FRAGEN
  {
    id: 'q6',
    question: 'Welche der folgenden Folgen kann FASD verursachen?',
    options: [
      'Nur körperliche Beeinträchtigungen',
      'Nur Verhaltensauffälligkeiten',
      'Körperliche, kognitive und Verhaltensbeeinträchtigungen',
      'Nur temporäre Entwicklungsverzögerungen'
    ],
    correctIndex: 2,
    explanation: 'FASD kann ein breites Spektrum an Beeinträchtigungen verursachen: körperliche Merkmale (z.B. Gesichtsauffälligkeiten), kognitive Defizite (Lernschwierigkeiten) und Verhaltensprobleme (Impulsivität, Aufmerksamkeitsstörungen).',
    category: 'facts',
    difficulty: 'medium',
  },
  {
    id: 'q7',
    question: 'Wie viele Kinder werden in Deutschland schätzungsweise mit FASD geboren?',
    options: [
      'Etwa 1 von 10.000 Kindern',
      'Etwa 1 von 1.000 Kindern',
      'Etwa 1 von 100 Kindern',
      'Etwa 1 von 50.000 Kindern'
    ],
    correctIndex: 2,
    explanation: 'Schätzungen gehen von etwa 1-3 von 100 Kindern aus, die mit FASD geboren werden. Das bedeutet, FASD ist häufiger als Down-Syndrom und eine der häufigsten vermeidbaren Ursachen für geistige Behinderungen.',
    category: 'facts',
    difficulty: 'medium',
  },
  {
    id: 'q8',
    question: 'Warum ist der Alkoholspiegel beim Fötus oft höher als bei der Mutter?',
    options: [
      'Der Fötus trinkt mehr',
      'Die fetale Leber kann Alkohol noch nicht abbauen',
      'Der Fötus hat mehr Blut',
      'Das Fruchtwasser speichert Alkohol'
    ],
    correctIndex: 1,
    explanation: 'Die fetale Leber ist noch nicht vollständig entwickelt und kann Alkohol nicht effektiv abbauen. Dadurch bleibt der Alkohol länger im Körper des Fötus und erreicht höhere Konzentrationen.',
    category: 'medical',
    difficulty: 'medium',
  },
  {
    id: 'q9',
    question: 'Was ist das "Fetale Alkoholsyndrom" (FAS)?',
    options: [
      'Eine milde Form von FASD',
      'Die schwerste Form der alkoholbedingten Schädigung',
      'Eine vorübergehende Störung',
      'Ein Syndrom nur bei Erwachsenen'
    ],
    correctIndex: 1,
    explanation: 'FAS (Fetales Alkoholsyndrom) ist die schwerste Ausprägung von FASD. Es umfasst typische Gesichtszüge, Wachstumsstörungen und zentralnervöse Beeinträchtigungen. Es ist die häufigste vermeidbare Ursache für geistige Behinderung.',
    category: 'medical',
    difficulty: 'medium',
  },
  {
    id: 'q10',
    question: 'Wie kann man als Freund/Freundin eine schwangere Person unterstützen?',
    options: [
      'Ihr sagen, sie soll sich keine Sorgen machen',
      'Alkohol verstecken',
      'Alkoholfreie Optionen anbieten und Verständnis zeigen',
      'Sie nicht zu Veranstaltungen einladen'
    ],
    correctIndex: 2,
    explanation: 'Die beste Unterstützung ist, alkoholfreie Alternativen anzubieten und Verständnis zu zeigen. So fühlt sich die schwangere Person eingeschlossen und muss sich nicht erklären oder rechtfertigen.',
    category: 'social',
    difficulty: 'medium',
  },

  // SCHWIERIGE FRAGEN
  {
    id: 'q11',
    question: 'Welche Gehirnregionen sind bei FASD besonders betroffen?',
    options: [
      'Nur das Kleinhirn',
      'Präfrontaler Cortex, Hippocampus und Kleinhirn',
      'Nur der Hirnstamm',
      'Nur die Sehrinde'
    ],
    correctIndex: 1,
    explanation: 'FASD betrifft besonders den präfrontalen Cortex (Entscheidungen, Impulskontrolle), den Hippocampus (Gedächtnis) und das Kleinhirn (Motorik, Balance). Dies erklärt die typischen Verhaltens- und Lernschwierigkeiten.',
    category: 'medical',
    difficulty: 'hard',
  },
  {
    id: 'q12',
    question: 'Kann FASD auch durch Alkoholkonsum vor der Schwangerschaft verursacht werden?',
    options: [
      'Ja, Alkohol bleibt jahrelang im Körper',
      'Nein, nur Alkohol während der Schwangerschaft schadet',
      'Ja, aber nur bei sehr hohem Konsum',
      'Unklar, die Forschung ist sich nicht einig'
    ],
    correctIndex: 1,
    explanation: 'Nein, FASD wird nur durch Alkoholkonsum WÄHREND der Schwangerschaft verursacht. Alkohol vor der Schwangerschaft kann die Fruchtbarkeit beeinträchtigen, führt aber nicht zu FASD beim Kind.',
    category: 'medical',
    difficulty: 'hard',
  },
  {
    id: 'q13',
    question: 'Ist FASD heilbar?',
    options: [
      'Ja, mit der richtigen Therapie',
      'Nein, aber frühzeitige Unterstützung kann helfen',
      'Ja, es wächst sich aus',
      'Nur mit Medikamenten'
    ],
    correctIndex: 1,
    explanation: 'FASD ist nicht heilbar – die Schädigung ist dauerhaft. Aber: Frühzeitige Diagnose und gezielte Förderung können die Lebensqualität erheblich verbessern und betroffenen Kindern helfen, ihr Potenzial zu entfalten.',
    category: 'facts',
    difficulty: 'hard',
  },
  {
    id: 'q14',
    question: 'Warum wird FASD oft nicht oder spät erkannt?',
    options: [
      'Es gibt keine Symptome',
      'Symptome ähneln anderen Störungen wie ADHS',
      'Ärzte wissen nichts darüber',
      'Es wird immer sofort erkannt'
    ],
    correctIndex: 1,
    explanation: 'FASD wird oft spät oder gar nicht erkannt, weil die Symptome denen anderer Störungen ähneln (ADHS, Autismus, Lernbehinderungen). Zudem fehlen bei vielen betroffenen Kindern die typischen Gesichtszüge.',
    category: 'facts',
    difficulty: 'hard',
  },
  {
    id: 'q15',
    question: 'Was bedeutet "sekundäre Beeinträchtigungen" bei FASD?',
    options: [
      'Beeinträchtigungen durch andere Substanzen',
      'Probleme, die durch fehlende Unterstützung entstehen',
      'Körperliche Probleme zusätzlich zu geistigen',
      'Vererbte Probleme von den Eltern'
    ],
    correctIndex: 1,
    explanation: 'Sekundäre Beeinträchtigungen sind Probleme, die nicht direkt durch Alkohol verursacht werden, sondern durch fehlende Unterstützung: Schulabbruch, psychische Probleme, Arbeitslosigkeit, Konflikte mit dem Gesetz. Diese sind durch Frühförderung vermeidbar.',
    category: 'facts',
    difficulty: 'hard',
  },

  // Zusätzliche Fragen
  {
    id: 'q16',
    question: 'Wie hoch ist das Risiko für FASD wenn die Mutter während der Schwangerschaft trinkt?',
    options: [
      'Jedes Kind wird betroffen sein',
      'Es ist ein Risiko, aber nicht jedes Kind ist betroffen',
      'Es gibt kein Risiko',
      'Nur bei täglichen Konsum'
    ],
    correctIndex: 1,
    explanation: 'Es ist ein Risiko – nicht jedes Kind, dessen Mutter trinkt, entwickelt FASD. Aber: Man kann im Voraus nicht wissen, welches Kind betroffen sein wird. Deshalb gilt: Kein Alkohol in der Schwangerschaft.',
    category: 'prevention',
    difficulty: 'medium',
  },
  {
    id: 'q17',
    question: 'Was ist ein "Mocktail"?',
    options: [
      'Ein Cocktail mit wenig Alkohol',
      'Ein alkoholfreier Cocktail',
      'Ein Medikament gegen Übelkeit',
      'Eine neue Cocktailart'
    ],
    correctIndex: 1,
    explanation: 'Ein Mocktail ist ein alkoholfreier Cocktail – eine leckere Alternative, die wie ein echter Cocktail schmeckt, aber ohne Alkohol auskommt. Perfekt für Schwangere und alle, die keinen Alkohol trinken möchten!',
    category: 'prevention',
    difficulty: 'easy',
  },
  {
    id: 'q18',
    question: 'Dürfen Stillende Alkohol trinken?',
    options: [
      'Ja, ohne Einschränkungen',
      'Nein, Alkohol geht in die Muttermilch über',
      'Nur Bier ist erlaubt',
      'Nur vor dem Schlafen'
    ],
    correctIndex: 1,
    explanation: 'Alkohol geht in die Muttermilch über und kann auch beim gestillten Baby Schäden verursachen. Zudem kann Alkohol den Milchfluss beeinträchtigen. Empfehlung: Auch beim Stillen auf Alkohol verzichten.',
    category: 'medical',
    difficulty: 'medium',
  },
];

// Helper function to get random questions
export function getRandomQuestions(count: number = 10): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Helper function to get questions by difficulty
export function getQuestionsByDifficulty(difficulty: QuizQuestion['difficulty']): QuizQuestion[] {
  return quizQuestions.filter(q => q.difficulty === difficulty);
}

// Helper function to get questions by category
export function getQuestionsByCategory(category: QuizQuestion['category']): QuizQuestion[] {
  return quizQuestions.filter(q => q.category === category);
}
