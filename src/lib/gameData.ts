import { Character, Scenario, Decision } from '@/types/game';

export const characters: Character[] = [
  {
    id: 'anna',
    name: 'Anna',
    age: 28,
    background: 'Karriereorientierte Managerin, unerwartet schwanger',
    challenges: 'Stressbewältigung, Work-Life-Balance, gesellschaftliche Events',
    avatar: '👩‍💼',
  },
  {
    id: 'lena',
    name: 'Lena',
    age: 22,
    background: 'Studentin mit aktivem Sozialleben, ungeplante Schwangerschaft',
    challenges: 'Partys, peer pressure, Unsicherheit über die Zukunft',
    avatar: '👩‍🎓',
  },
  {
    id: 'sarah',
    name: 'Sarah',
    age: 35,
    background: 'Lang gewünschte Schwangerschaft nach Jahren des Versuchens',
    challenges: 'Überfürsorglichkeit, Ängste, Informationsflut',
    avatar: '👩‍⚕️',
  },
  {
    id: 'mila',
    name: 'Mila',
    age: 19,
    background: 'Junge Frau aus schwierigen Verhältnissen, wenig Unterstützung',
    challenges: 'Fehlendes Wissen, eingeschränkte Ressourcen, sozialer Druck',
    avatar: '👩‍🎨',
  },
];

export const scenarios: Scenario[] = [
  {
    id: 'discovery',
    title: 'Die Entdeckung',
    description: `Du stehst im Badezimmer und starrst auf den positiven Schwangerschaftstest. Dein Herz klopft. Die letzten Wochen ziehen an dir vorbei – der Mädelsabend, das Glas Wein beim Dinner mit Kollegen, die Feier letzte Woche...

Die Realität holt dich ein: Du bist schwanger. Und du weißt nicht, ob du in den letzten Wochen Alkohol getrunken hast, als das Baby schon in dir heranwuchs.

Was tust du?`,
    week: 6,
    decisions: [
      {
        id: 'd1_research',
        text: 'Ich recherchiere sofort im Internet über Schwangerschaft und Alkohol',
        impact: 'positive',
        healthChange: 0,
        feedbackText: 'Du informierst dich gründlich. Das Wissen ist der erste Schritt zur Verantwortung. Du erfährst, dass es keine sichere Alkoholmenge in der Schwangerschaft gibt.',
        infoText: 'Fakten: Alkohol passiert die Plazenta und erreicht das ungeborene Kind direkt.',
      },
      {
        id: 'd1_friend',
        text: 'Ich rufe meine beste Freundin an, um zu reden',
        impact: 'positive',
        healthChange: 5,
        feedbackText: 'Deine Freundin hört dir zu und nimmt dir die Angst. Sie bietet an, dich zu unterstützen.',
        infoText: 'Unterstützung ist wichtig: Ein starkes soziales Netzwerk hilft in der Schwangerschaft.',
      },
      {
        id: 'd1_wine',
        text: 'Ich mache mir erst mal ein Glas Wein, um mich zu beruhigen',
        impact: 'negative',
        healthChange: -15,
        feedbackText: 'Der Wein beruhigt dich kurzfristig, aber jedes Glas Alkohol erreicht dein ungeborenes Kind.',
        infoText: 'Warnung: Es gibt KEINE sichere Menge Alkohol in der Schwangerschaft.',
      },
      {
        id: 'd1_doctor',
        text: 'Ich terminiere einen Arztbesuch für morgen früh',
        impact: 'positive',
        healthChange: 10,
        feedbackText: 'Das ist eine kluge Entscheidung. Der Arzt wird dir helfen, deine Schwangerschaft richtig zu planen.',
        infoText: 'Medizinische Betreuung ist wichtig für eine gesunde Schwangerschaft.',
      },
    ],
    backgroundInfo: 'Die ersten 12 Wochen sind besonders kritisch für die Organentwicklung.',
  },
  {
    id: 'girls_night',
    title: 'Der Mädelsabend',
    description: `Freitagsabend. Deine Freundinnen haben zum Mädelsabend eingeladen. Normalerweise fließt der Sekt.

Deine beste Freundin Nina winkt dich herein: "Hey! Wir haben extra deinen Lieblingswein besorgt!"

Du bist in der 10. Woche schwanger. Wie reagierst du?`,
    week: 10,
    decisions: [
      {
        id: 'd2_open',
        text: 'Ich erzähle ihnen von der Schwangerschaft',
        impact: 'positive',
        healthChange: 10,
        feedbackText: 'Deine Freundinnen sind überrascht, dann überglücklich! Du fühlst dich unterstützt.',
        infoText: 'Offenheit hilft: Wenn dein Umfeld Bescheid weiß, können sie dich unterstützen.',
      },
      {
        id: 'd2_excuse',
        text: 'Ich sage, ich muss morgen früh raus',
        impact: 'neutral',
        healthChange: 0,
        feedbackText: 'Deine Ausrede funktioniert, aber du fühlst dich unwohl dabei.',
        infoText: 'Tip: Ehrlichkeit ist einfacher, aber diese Strategie ist sicher für dein Baby.',
      },
      {
        id: 'd2_sip',
        text: 'Ich nehme ein Glas, aber trinke nur einen Schluck',
        impact: 'negative',
        healthChange: -10,
        feedbackText: 'Auch kleine Mengen Alkohol erreichen dein Baby.',
        infoText: 'Wichtig: Es gibt keine sichere Menge.',
      },
      {
        id: 'd2_mocktail',
        text: 'Ich bringe meinen eigenen alkoholfreien Cocktail mit',
        impact: 'positive',
        healthChange: 5,
        feedbackText: 'Du genießt den Abend ohne Alkohol und ohne Stress.',
        infoText: 'Es gibt viele leckere alkoholfreie Alternativen!',
      },
    ],
    backgroundInfo: 'Sozialer Druck ist eine der größten Herausforderungen.',
  },
  {
    id: 'work_stress',
    title: 'Stress bei der Arbeit',
    description: `Montagmorgen. Das Projekt muss diese Woche fertig werden. Dein Chef drängt.

In der Küche unterhalten sich Kollegen: "Nach der Arbeit gehen wir auf ein Bier. Kommst du mit?"

Du bist in der 14. Woche schwanger. Der Stress ist enorm. Was tust du?`,
    week: 14,
    decisions: [
      {
        id: 'd3_talk',
        text: 'Ich spreche mit meinem Chef über meine Situation',
        impact: 'positive',
        healthChange: 15,
        feedbackText: 'Dein Chef ist verständnisvoll. Du fühlst dich erleichtert.',
        infoText: 'Deine Rechte: Schwangere Frauen sind besonders geschützt.',
      },
      {
        id: 'd3_drink',
        text: 'Ich gehe mit den Kollegen – ein Bier entspannt',
        impact: 'negative',
        healthChange: -20,
        feedbackText: 'Stress UND Alkohol sind eine gefährliche Kombination.',
        infoText: 'Alkohol kann auch jetzt noch schaden.',
      },
      {
        id: 'd3_selfcare',
        text: 'Ich gehe nach Hause und mache einen Spaziergang',
        impact: 'positive',
        healthChange: 10,
        feedbackText: 'Die frische Luft tut gut. Du erkennst, dass du Grenzen setzen musst.',
        infoText: 'Selbstfürsorge ist wichtig.',
      },
      {
        id: 'd3_deadline',
        text: 'Ich bleibe so lange bis alles fertig ist',
        impact: 'neutral',
        healthChange: -5,
        feedbackText: 'Du schaffst es, aber du bist völlig erschöpft.',
        infoText: 'Balance ist wichtig.',
      },
    ],
    backgroundInfo: 'Achte auf dich in der Schwangerschaft.',
  },
];

export function getScenarioById(id: string): Scenario | undefined {
  return scenarios.find(s => s.id === id);
}

export function getCharacterById(id: string): Character | undefined {
  return characters.find(c => c.id === id);
}
