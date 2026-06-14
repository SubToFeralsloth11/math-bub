/**
 * Spanish Conquest track content (Year 8 HSS, Term 2).
 *
 * Covers the Aztec Empire, Spanish colonisation, the conquest of Mexico,
 * and historical source analysis. Based on the 2026 8HSS Spanish Conquest
 * Stile unit at The Gap State High School, enriched with external sources.
 *
 * External references:
 * - YouTube: The Aztec Empire in 2 minutes (https://youtu.be/2olRyI392rI)
 * - YouTube: Introduction to the Aztecs / Mexica (https://youtu.be/B8cO1pAHVok)
 * - World History Encyclopedia: Aztec Food & Agriculture, Aztec Warfare, Aztec Society
 * - Kahoot: Gold, God and Glory - Spanish Conquest of the Aztecs
 * - AHA: Mexica Account of Cholula Massacre
 *
 * @author John Grimes
 * @module content/tracks/spanishConquest
 */

import { t } from "../blocks";

import type { Lesson, Track, Question, Figure } from "../../domain/content/types";

// ---------------------------------------------------------------------------
// Figures
// ---------------------------------------------------------------------------

const figTenochtitlan: Figure = {
  id: "tenochtitlan",
  alt: "Illustration of Tenochtitlan, the Aztec island capital on Lake Texcoco, showing step-pyramid temples, chinampas (floating gardens), causeways, and canoes navigating canals.",
  textFallback: "[Image: Tenochtitlan — the Aztec island capital on Lake Texcoco with temples, chinampas, and causeways]",
};

const figAztecHierarchy: Figure = {
  id: "aztec-hierarchy",
  alt: "Diagram of the Aztec social hierarchy pyramid: emperor at top, then nobles, warriors, commoners, and slaves at the bottom.",
  textFallback: "[Diagram: Aztec social hierarchy — emperor, nobles, warriors, commoners, slaves]",
};

const figAztecSacrifice: Figure = {
  id: "aztec-sacrifice",
  alt: "Illustration of the Templo Mayor, the great twin temple pyramid in Tenochtitlan dedicated to Huitzilopochtli and Tlaloc, with a ceremonial scene.",
  textFallback: "[Image: The Templo Mayor — the great twin temple pyramid in Tenochtitlan]",
};

const figCortesMoctezuma: Figure = {
  id: "cortes-moctezuma",
  alt: "Illustration of the first meeting between Hernán Cortés and Aztec emperor Moctezuma II in Tenochtitlan, November 1519, with Malinche as translator.",
  textFallback: "[Image: Cortés and Moctezuma meeting in Tenochtitlan, with Malinche translating]",
};

const figSiegeTenochtitlan: Figure = {
  id: "siege-tenochtitlan",
  alt: "Illustration of the 1521 siege of Tenochtitlan, showing Spanish brigantines on Lake Texcoco attacking Aztec canoes while Spanish and Tlaxcalan forces advance along causeways.",
  textFallback: "[Image: The 1521 siege of Tenochtitlan — Spanish brigantines on Lake Texcoco]",
};

const figCholulaMassacre: Figure = {
  id: "cholula-massacre",
  alt: "Split illustration showing two perspectives of the 1519 Cholula massacre — Spanish attackers on one side and unarmed Cholulan civilians on the other.",
  textFallback: "[Image: Two perspectives of the Cholula massacre — Spanish attackers and Cholulan civilians]",
};

// ---------------------------------------------------------------------------
// Lesson 1 – The Aztec Empire: rise of a civilisation
// ---------------------------------------------------------------------------

const aztecOrigins: Lesson = {
  id: "aztec-origins",
  order: 1,
  title: "The Aztec Empire: rise of a civilisation",
  sourceRef: "Aztec Empire Intro (Stile)",
  aiProvenance: {
    tool: "Claude",
    sources: [
      "Stile: Aztec Empire Intro",
      "Stile: 3.3.1 Aztec Culture Infographic",
      "World History Encyclopedia: Aztec Food & Agriculture (Cartwright, 2014)",
      "YouTube: The Aztec Empire in 2 minutes",
    ],
    role: "generated",
  },
  learnCards: [
    {
      id: "origins-who",
      heading: "Who were the Aztecs?",
      body: [
        t(
          "The Aztecs (who called themselves the Mexica) were a nomadic people from northern Mexico. According to their own histories, they migrated south and arrived in the Valley of Mexico in the early 13th century — around the 1200s — after centuries of wandering.",
        ),
        t(
          "When they arrived, the best land around the shores of Lake Texcoco was already taken by more powerful city-states. The Aztecs were forced to settle on a swampy, uninhabited island in the middle of the lake.",
        ),
        t(
          "Legend says their war god Huitzilopochtli told them to look for an eagle perched on a cactus, devouring a serpent. When they saw this sign on the island, they knew they had found their destined home. This image — the eagle, cactus, and serpent — still appears on the Mexican flag today.",
        ),
      ],
    },
    {
      id: "origins-tenochtitlan",
      heading: "Tenochtitlan: a city on water",
      figure: figTenochtitlan,
      body: [
        t(
          "The Aztecs named their island city Tenochtitlan (te-noch-TIT-lan). Over time it grew into one of the largest and most impressive cities in the world, with an estimated population of 200,000–300,000 people — larger than any European city of the same period.",
        ),
        t(
          "Because the city was built on a lake, the Aztecs became masters of hydraulic engineering. They constructed chinampas — artificial farming islands made by piling mud and vegetation onto rafts anchored to the lake bed. Each chinampa measured roughly 30 by 2.5 metres, separated by canals that allowed canoe access. These floating gardens were incredibly fertile, producing up to six harvests per year and covering up to 9,500 hectares around the lake basin.",
        ),
        t(
          "The city was connected to the mainland by three long causeways (raised roads) with removable wooden bridges. An aqueduct brought fresh water from springs on the mainland, and a network of canals allowed canoes to navigate the city like streets. A remarkable 16-kilometre dyke, built by the engineer-king Nezahualcoyotl, separated the fresh water of the western lagoon from the salty water of the larger lake — a feat of engineering unmatched in the Americas.",
        ),
        t(
          "The Spanish conquistadors, when they first saw Tenochtitlan in 1519, were stunned. Bernal Díaz del Castillo, a soldier with Cortés, later wrote that it seemed like 'an enchanted vision' — towers, temples, and gleaming white buildings rising from the water.",
        ),
      ],
    },
    {
      id: "origins-triple-alliance",
      heading: "The Triple Alliance and empire building",
      body: [
        t(
          "In 1428, the Aztecs formed a military and political partnership with two neighbouring city-states — Texcoco and Tlacopan. This agreement is known as the Triple Alliance.",
        ),
        t(
          "Together, the three allies conquered much of central Mexico. Conquered peoples were not directly ruled; instead they became tribute-paying provinces. They had to send goods — food, textiles, feathers, gold, cacao beans, and sometimes captured people for sacrifice — to Tenochtitlan on a regular schedule.",
        ),
        t(
          "The Aztec Empire was not a single unified territory with fixed borders. It was a web of alliances, tributes, and obligations held together by military power and religious authority. This loose structure would later become a weakness the Spanish exploited.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "aztec-p1",
      type: "mcq",
      prompt: [t("When did the Aztec people arrive in the Valley of Mexico?")],
      explanation: [
        t(
          "The Aztecs arrived in the early 13th century (around the 1200s) after migrating from northern Mexico. They were among the last groups to settle in the region, which is why the best land was already claimed.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Early 13th century (around the 1200s)")] },
        { id: "b", label: [t("10th century (around the 900s)")] },
        { id: "c", label: [t("15th century (around the 1400s)")] },
        { id: "d", label: [t("16th century (around the 1500s)")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "aztec-p2",
      type: "shortText",
      prompt: [
        t(
          "What is a chinampa? Explain in your own words.",
        ),
      ],
      explanation: [
        t(
          "Chinampas were artificial farming islands built on the shallow waters of Lake Texcoco. The Aztecs constructed them by piling mud and decaying vegetation onto anchored rafts, creating extremely fertile plots of land. They were sometimes called 'floating gardens' although they were actually fixed in place by tree roots. Chinampas allowed the Aztecs to grow enough food to support the large population of Tenochtitlan.",
        ),
      ],
      xp: 15,
      accepted: [
        "floating gardens",
        "artificial islands",
        "farming islands",
        "man-made farming",
      ],
    },
    {
      id: "aztec-p3",
      type: "mcq",
      prompt: [
        t(
          "The legend of the eagle, serpent, and cactus is still represented today on which national symbol?",
        ),
      ],
      explanation: [
        t(
          "The Mexican flag features an eagle perched on a prickly pear cactus, devouring a serpent. This image comes directly from the Aztec origin legend: the god Huitzilopochtli told them to build their city where they saw this sign. The symbol was officially adopted when Mexico became independent and remains a powerful national emblem.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("The Mexican flag")] },
        { id: "b", label: [t("The Spanish flag")] },
        { id: "c", label: [t("The flag of Guatemala")] },
        { id: "d", label: [t("The United Nations flag")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "aztec-p4",
      type: "numeric",
      prompt: [
        t(
          "In what year was the Triple Alliance formed between the Aztecs, Texcoco, and Tlacopan?",
        ),
      ],
      explanation: [
        t(
          "The Triple Alliance was formed in 1428. This military partnership between three city-states allowed the Aztecs to rapidly expand their control over central Mexico. The Aztecs became the dominant power within the alliance, and Tenochtitlan became the imperial capital.",
        ),
      ],
      xp: 10,
      accepted: ["1428"],
    },
    {
      id: "aztec-p5",
      type: "mcq",
      prompt: [
        t(
          "The period of time before the arrival of Europeans in the Americas is known by what term?",
        ),
      ],
      explanation: [
        t(
          "Historians use the term 'pre-Columbian' to describe the era in the Americas before Christopher Columbus's arrival in 1492 and the subsequent European colonisation. It is important because it emphasises that complex civilisations — like the Aztecs, Maya, and Inca — existed and flourished long before Europeans arrived.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Pre-Columbian")] },
        { id: "b", label: [t("Pre-Cortesian")] },
        { id: "c", label: [t("The Mesozoic era")] },
        { id: "d", label: [t("The Dark Ages")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "aztec-p6",
      type: "mcq",
      prompt: [
        t(
          "Why did the Aztecs build Tenochtitlan on an island in Lake Texcoco?",
        ),
      ],
      explanation: [
        t(
          "The Aztecs built their city on the lake island because the better land around the shore was already occupied by stronger city-states when they arrived. Rather than fight losing battles, they adapted to the challenging environment and turned it to their advantage. The lake actually provided natural defences against attack.",
        ),
      ],
      xp: 10,
      options: [
        {
          id: "a",
          label: [t("The best land around the lake was already taken by other groups")],
        },
        {
          id: "b",
          label: [t("They preferred the cooler temperatures on the water")],
        },
        {
          id: "c",
          label: [t("An earthquake had destroyed their previous city")],
        },
        {
          id: "d",
          label: [t("The Spanish forced them to live there")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "aztec-p7",
      type: "fillInTheBlank",
      prompt: [
        t("Complete the sentence about how the Aztec Empire was structured."),
      ],
      template: [
        t(
          "Conquered peoples were not directly ruled by the Aztecs; instead they became ___ -paying provinces.",
        ),
      ],
      explanation: [
        t(
          "The Aztec Empire functioned through a tribute system. Conquered groups were required to send regular payments of goods — food, textiles, gold, feathers, and cacao — to Tenochtitlan. As long as the tribute was paid, conquered peoples were largely left to govern themselves.",
        ),
      ],
      xp: 10,
      accepted: ["tribute"],
    },
    {
      id: "aztec-p8",
      type: "shortText",
      prompt: [
        t(
          "Tenochtitlan had an estimated population of 200,000–300,000 people. Why is this significant when compared with European cities of the same period?",
        ),
      ],
      explanation: [
        t(
          "At the time of Spanish contact in 1519, Tenochtitlan was larger than any European city. London had roughly 50,000–60,000 residents, Paris around 200,000, and Seville — the largest city in Spain — around 70,000. This challenges the narrative that the Americas were sparsely populated or 'uncivilised' before European arrival.",
        ),
      ],
      xp: 15,
      accepted: [
        "larger than any European city",
        "bigger",
        "more populated",
        "largest city",
      ],
    },
    {
      id: "aztec-p9",
      type: "matching",
      prompt: [t("Match each feature of Tenochtitlan to its description.")],
      explanation: [
        t(
          "Chinampas were artificial farming islands that made agriculture possible on the lake. Causeways were raised roads connecting the island city to the mainland. The aqueduct brought fresh drinking water from mainland springs. Canals were water channels that functioned like streets for canoe transport.",
        ),
      ],
      xp: 15,
      pairs: [
        {
          id: "a",
          left: [t("Chinampas")],
          right: [t("Artificial farming islands on the lake")],
        },
        {
          id: "b",
          left: [t("Causeways")],
          right: [t("Raised roads connecting the city to the mainland")],
        },
        {
          id: "c",
          left: [t("Aqueduct")],
          right: [t("A channel bringing fresh water from mainland springs")],
        },
        {
          id: "d",
          left: [t("Canals")],
          right: [t("Water channels used like streets for canoes")],
        },
      ],
    },
  ],
  mastery: [
    {
      id: "aztec-m1",
      type: "shortText",
      prompt: [
        t(
          "The Aztec Empire is sometimes described as a 'tribute empire' rather than a territorial empire. Explain what this means.",
        ),
      ],
      explanation: [
        t(
          "A tribute empire controls other peoples by demanding regular payments (tribute) of goods rather than by directly governing their territory. The Aztecs allowed conquered groups to keep their own rulers, laws, and customs as long as they paid tribute to Tenochtitlan. This is different from a territorial empire like Rome, which sent governors and soldiers to directly rule conquered lands. The Aztec approach was efficient but fragile — tributary states might rebel if they saw an opportunity.",
        ),
      ],
      xp: 20,
      accepted: ["tribute", "not directly ruled", "payment", "goods"],
    },
    {
      id: "aztec-m2",
      type: "mcq",
      prompt: [
        t(
          "Which statement best describes how the Aztecs turned the challenging lake environment into an advantage?",
        ),
      ],
      explanation: [
        t(
          "The Aztecs used engineering to make the lake work for them: chinampas for food, canals for transport, causeways for access, and the lake itself as a defensive barrier. They also built an aqueduct for fresh water and dykes to separate fresh water from salt water.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t(
              "They used engineering — chinampas, canals, causeways, and aqueducts — to thrive on the water",
            ),
          ],
        },
        {
          id: "b",
          label: [t("They drained the lake and farmed the dry lake bed")],
        },
        {
          id: "c",
          label: [t("They abandoned the island and conquered land on the shore")],
        },
        {
          id: "d",
          label: [
            t(
              "They survived only by trading with other cities for all their food",
            ),
          ],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "aztec-m3",
      type: "numeric",
      prompt: [
        t(
          "How many years did the Aztec Empire exist from the formation of the Triple Alliance (1428) until the Spanish conquest (1521)?",
        ),
      ],
      explanation: [
        t(
          "The Triple Alliance formed in 1428 and Tenochtitlan fell in 1521. The Aztec Empire therefore existed for 93 years as a dominant power. However, Aztec civilisation traced its roots to the early 13th century, giving it a total span of roughly 300 years.",
        ),
      ],
      xp: 15,
      accepted: ["93"],
    },
    {
      id: "aztec-m4",
      type: "mcq",
      prompt: [
        t(
          "Why might the loose tribute-based structure of the Aztec Empire have been a weakness when the Spanish arrived?",
        ),
      ],
      explanation: [
        t(
          "Because conquered peoples were not loyal subjects — they paid tribute to avoid punishment, not because they supported Aztec rule. When Cortés arrived, many of these groups saw an opportunity to overthrow their Aztec overlords. Cortés formed alliances with thousands of Indigenous warriors who hated the Aztecs, turning the empire's structure against itself.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t(
              "Conquered peoples were not loyal and were willing to ally with the Spanish against the Aztecs",
            ),
          ],
        },
        {
          id: "b",
          label: [
            t(
              "The tribute system made the Aztecs too poor to afford weapons",
            ),
          ],
        },
        {
          id: "c",
          label: [t("The Aztecs had no army because of the tribute system")],
        },
        {
          id: "d",
          label: [t("Tribute payments went directly to the Spanish")],
        },
      ],
      correctOptionId: "a",
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 2 – Inside Aztec society
// ---------------------------------------------------------------------------

const aztecSociety: Lesson = {
  id: "aztec-society",
  order: 2,
  title: "Inside Aztec society",
  sourceRef: "Ch11.3 Key groups in Aztec Society (Stile)",
  aiProvenance: {
    tool: "Claude",
    sources: [
      "Stile: Ch11.3 Key groups in Aztec Society",
      "Stile: 3.3.1 Aztec Culture Infographic",
      "World History Encyclopedia: Aztec Society (Cartwright, 2015)",
    ],
    role: "generated",
  },
  learnCards: [
    {
      id: "society-hierarchy",
      heading: "A strictly ordered world",
      figure: figAztecHierarchy,
      body: [
        t(
          "Aztec society was organised as a strict hierarchy — a system that ranks people with the most important at the top and everyone else beneath in decreasing order of importance. There was very little opportunity to move out of the social class you were born into.",
        ),
        t(
          "At the top stood the emperor, known as the Huey Tlatoani ('Great Speaker'). The emperor was considered semi-divine — not quite a god, but chosen by the gods to rule. Moctezuma II, who was emperor when the Spanish arrived, lived in a palace of extraordinary luxury with hundreds of servants, his own zoo, and a private aviary filled with every bird species known to the empire.",
        ),
        t(
          "Below the emperor were the nobles (pipiltin), who filled all the important positions: priests, military commanders, judges, and government officials. Nobility was inherited — if your father was a noble, so were you. Nobles received tribute from commoners, wore distinctive clothing, and could own land.",
        ),
      ],
    },
    {
      id: "society-classes",
      heading: "Warriors, commoners, and slaves",
      body: [
        t(
          "Warriors held a special position in Aztec society. Military achievement was one of the few ways a commoner could rise in status. Taking captives in battle brought honour and rewards. Elite warriors — the Eagle and Jaguar warriors — wore dramatic costumes and were treated almost like nobles.",
        ),
        t(
          "The majority of people were commoners (macehualtin): farmers, artisans, merchants, and labourers. They belonged to local clans called calpulli, which allocated land to families and organised community labour. Commoners paid tribute to nobles and the emperor through goods and work.",
        ),
        t(
          "At the bottom were slaves (tlacotin). Unlike the lifelong, race-based slavery that developed in the Atlantic world, Aztec slavery was different: people might become slaves to pay off debts, as punishment for crimes, or by selling themselves during famine. Slaves could own property, marry, and even own other slaves. Children born to slaves were born free — status was not inherited.",
        ),
        t(
          "One group that commanded universal respect was the elderly. Old age was seen as a sign of favour from the gods, and older people were treated with great reverence by all social classes.",
        ),
      ],
    },
    {
      id: "society-gender",
      heading: "Men, women, and family life",
      body: [
        t(
          "Aztec society had clearly defined roles for men and women. Marriages were arranged by families, often with priests consulting the stars to determine if a match was favourable. Girls typically married at around 16 years, men at 20.",
        ),
        t(
          "Both boys and girls attended school, though they were educated separately — which was unusually progressive for the period. Boys from noble families attended the calmecac, where they studied history, religion, warfare, law, astronomy, and rhetoric. Commoner boys attended the telpochcalli for military training, while girls attended their own telpochcalli for religious duties, dancing, singing, and history. Exceptionally gifted children from lower classes could sometimes attend the calmecac.",
        ),
        t(
          "Women were expected to manage the household: caring for children, cooking, weaving cloth, and working the family's allocated plots of land. However, Aztec women had more rights than women in many contemporary societies: they could own and inherit property, participate in commerce, and work as healers, teachers, and priestesses. They held almost no formal political roles — they could not serve as high priests, judges, or government officials. However, women who died in childbirth were honoured as warriors, since giving birth was seen as the female equivalent of battle.",
        ),
        t(
          "Men were expected to become warriors and sought glory by capturing enemies in battle. A man who had never taken a captive was looked down upon. From the age of ten, boys wore a special lock of hair at the back of the neck called a piochtli, which could only be cut off after they captured their first enemy — a powerful visible symbol of their transition to manhood. Farming, trade, and craftwork were also male responsibilities.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "society-p1",
      type: "mcq",
      prompt: [
        t(
          "Which social class was at the top of the Aztec hierarchy?",
        ),
      ],
      explanation: [
        t(
          "The emperor (Huey Tlatoani) was at the very top of Aztec society. Below him were the nobles, then warriors, then commoners, and finally slaves at the bottom. The emperor was considered semi-divine — chosen by the gods to rule.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("The emperor")] },
        { id: "b", label: [t("Priests")] },
        { id: "c", label: [t("Warriors")] },
        { id: "d", label: [t("Nobles")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "society-p2",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about Aztec social structure.")],
      template: [
        t(
          "Aztec society was organised as a strict ___, where each person had a particular place and role with little opportunity to move between classes.",
        ),
      ],
      explanation: [
        t(
          "A hierarchy is a system that ranks people with the most important at the top and others beneath in decreasing order. Social mobility — the ability to move to a higher class — was very limited in Aztec society. Military achievement was one of the few paths upward for commoners.",
        ),
      ],
      xp: 10,
      accepted: ["hierarchy"],
    },
    {
      id: "society-p3",
      type: "matching",
      prompt: [
        t("Match each Aztec social class to its description."),
      ],
      explanation: [
        t(
          "Nobles held all important positions — priests, judges, military commanders. Warriors gained status by capturing enemies; the Eagle and Jaguar warriors were the elite. Commoners were farmers, artisans, and labourers who paid tribute. Slaves were at the bottom but could own property and their children were born free.",
        ),
      ],
      xp: 15,
      pairs: [
        {
          id: "a",
          left: [t("Nobles (pipiltin)")],
          right: [
            t("Held important positions: priests, judges, military commanders"),
          ],
        },
        {
          id: "b",
          left: [t("Warriors")],
          right: [t("Gained honour by capturing enemies in battle")],
        },
        {
          id: "c",
          left: [t("Commoners (macehualtin)")],
          right: [t("Farmers, artisans, and labourers who paid tribute")],
        },
        {
          id: "d",
          left: [t("Slaves (tlacotin)")],
          right: [
            t("Lowest class, but could own property and their children were born free"),
          ],
        },
      ],
    },
    {
      id: "society-p4",
      type: "mcq",
      prompt: [
        t(
          "How was Aztec slavery different from the race-based slavery that later developed in the Americas?",
        ),
      ],
      explanation: [
        t(
          "In Aztec society, children of slaves were born free — status was not inherited. Slaves could also own property, marry, and even own other slaves. People became slaves through debt, crime, or selling themselves during famine, not through being captured or born into it. This contrasts dramatically with Atlantic slavery, which was lifelong, race-based, and inherited.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t(
              "Children of slaves were born free, and slaves could own property",
            ),
          ],
        },
        {
          id: "b",
          label: [t("Slaves were in charge of religious ceremonies")],
        },
        {
          id: "c",
          label: [t("Aztec slaves were always prisoners of war")],
        },
        {
          id: "d",
          label: [t("There were no slaves in Aztec society")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "society-p5",
      type: "shortText",
      prompt: [
        t(
          "What were the two types of Aztec schools and who attended each?",
        ),
      ],
      explanation: [
        t(
          "The calmecac was the school for noble boys, where they studied history, religion, leadership, and warfare to prepare for high positions. The telpochcalli was for commoner boys and all girls, focusing on practical skills, religious instruction, and military training for boys. Both boys and girls were educated, which was unusual for the time period.",
        ),
      ],
      xp: 15,
      accepted: ["calmecac", "telpochcalli", "noble boys", "commoner"],
    },
    {
      id: "society-p6",
      type: "mcq",
      prompt: [
        t(
          "Why were women who died in childbirth honoured similarly to warriors who died in battle?",
        ),
      ],
      explanation: [
        t(
          "The Aztecs believed childbirth was the female equivalent of battle — both involved struggle, pain, and the risk of death. A woman who died giving birth was considered to have died a warrior's death and was believed to go to the same honoured afterlife as fallen warriors. This shows how highly the Aztecs valued both military and maternal sacrifice.",
        ),
      ],
      xp: 10,
      options: [
        {
          id: "a",
          label: [
            t(
              "Childbirth was seen as the female equivalent of battle — both were struggles involving risk of death",
            ),
          ],
        },
        {
          id: "b",
          label: [t("Women also fought in Aztec armies")],
        },
        {
          id: "c",
          label: [t("The emperor's wife was always a warrior")],
        },
        {
          id: "d",
          label: [t("Childbirth was considered a religious sacrifice")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "society-p7",
      type: "mcq",
      prompt: [
        t(
          "Which group in Aztec society was treated with universal respect across all classes?",
        ),
      ],
      explanation: [
        t(
          "The elderly were highly respected in Aztec society. Old age was seen as a sign of favour from the gods, and older people were treated with great reverence regardless of their social class. This reflects the importance the Aztecs placed on wisdom and experience.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("The elderly")] },
        { id: "b", label: [t("Merchants")] },
        { id: "c", label: [t("Farmers")] },
        { id: "d", label: [t("Priests")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "society-p8",
      type: "shortText",
      prompt: [
        t(
          "What was one of the few ways a commoner could rise in social status in Aztec society?",
        ),
      ],
      explanation: [
        t(
          "Military achievement was the primary path for social mobility. A commoner who captured enemies in battle could gain honour, rewards, and elevated status. Taking four or more captives qualified a warrior for entry into the elite Eagle or Jaguar warrior orders, which brought privileges close to those of nobles.",
        ),
      ],
      xp: 15,
      accepted: [
        "military",
        "war",
        "capturing enemies",
        "battle",
        "warrior",
      ],
    },
  ],
  mastery: [
    {
      id: "society-m1",
      type: "mcq",
      prompt: [
        t(
          "The Aztec social pyramid had the emperor at the top and slaves at the bottom. Which statement about the five main classes (emperor, nobles, warriors, commoners, slaves) is most accurate?",
        ),
      ],
      explanation: [
        t(
          "There was almost no social mobility between the five main classes. You were born into your class and generally stayed there. The main exception was warriors — a commoner who captured many enemies in battle could gain elevated status, though even then they could not become a noble or emperor.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t(
              "There was very little opportunity to move out of the class you were born into",
            ),
          ],
        },
        {
          id: "b",
          label: [t("People could freely move between all classes")],
        },
        {
          id: "c",
          label: [t("Only slaves could change their social class")],
        },
        {
          id: "d",
          label: [
            t("The emperor was elected by commoners every four years"),
          ],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "society-m2",
      type: "shortText",
      prompt: [
        t(
          "Explain why the Aztec social hierarchy mattered when the Spanish arrived. How might a rigid class system affect an empire under attack?",
        ),
      ],
      explanation: [
        t(
          "A rigid social hierarchy means that leadership and decision-making are concentrated in very few hands. If the emperor is captured or killed (as happened to Moctezuma), the entire command structure can collapse. Additionally, commoners and conquered peoples who had no stake in the system had little reason to defend it. The strict hierarchy also meant that if the nobles were eliminated, there was no one trained to lead resistance. The Spanish exploited all these weaknesses.",
        ),
      ],
      xp: 20,
      accepted: [
        "leadership",
        "collapse",
        "no loyalty",
        "rigid",
        "emperor",
        "captured",
      ],
    },
    {
      id: "society-m3",
      type: "mcq",
      prompt: [
        t(
          "How did the calpulli system shape the daily lives of Aztec commoners?",
        ),
      ],
      explanation: [
        t(
          "The calpulli was a neighbourhood-based clan that allocated farmland to families and organised community labour projects, such as maintaining temples and canals. It provided a support network and a sense of identity. Commoners did not own land individually — the calpulli held it collectively and distributed it according to need.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t(
              "Calpulli were local clans that allocated land and organised community labour",
            ),
          ],
        },
        {
          id: "b",
          label: [t("Calpulli were religious temples where people worshipped")],
        },
        {
          id: "c",
          label: [
            t(
              "Calpulli were private businesses run by merchants",
            ),
          ],
        },
        {
          id: "d",
          label: [t("Calpulli were military units that fought together")],
        },
      ],
      correctOptionId: "a",
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 3 – Aztec gods and the afterlife
// ---------------------------------------------------------------------------

const aztecReligion: Lesson = {
  id: "aztec-religion",
  order: 3,
  title: "Aztec gods and the afterlife",
  sourceRef: "Ch11.4 Religious beliefs in Aztec society (Stile)",
  aiProvenance: {
    tool: "Claude",
    sources: ["Stile: Ch11.4 Religious beliefs in Aztec society"],
    role: "generated",
  },
  learnCards: [
    {
      id: "religion-beliefs",
      heading: "A world filled with gods",
      body: [
        t(
          "The Aztecs were polytheistic — they believed in many gods, each responsible for different aspects of the natural world and human life. Their gods reflected their environment: Huitzilopochtli, the god of war and the sun; Tlaloc, the rain god; Quetzalcoatl, the feathered serpent god of wind and learning; and hundreds of others.",
        ),
        t(
          "The Aztecs believed the world had been created and destroyed four times before their current era — the Fifth Sun. Each previous world had ended in catastrophe: jaguars, hurricanes, fire, and flood. They believed that without constant nourishment from human blood, the sun would stop moving across the sky and the Fifth Sun would end in darkness and earthquakes.",
        ),
        t(
          "This belief — that the gods had sacrificed themselves to create the world and that humans owed a blood debt in return — was the foundation of Aztec religious practice. It is why human sacrifice was not seen as cruel but as necessary and honourable.",
        ),
      ],
    },
    {
      id: "religion-sacrifice",
      heading: "Human sacrifice: why and how",
      figure: figAztecSacrifice,
      body: [
        t(
          "Human sacrifice was central to Aztec religion. The most common form involved cutting out the still-beating heart of the victim at the top of a temple pyramid. The body would then be thrown down the steps. This was not random violence — it was a highly ritualised ceremony with specific meanings.",
        ),
        t(
          "Victims were most often prisoners taken in battle. The Aztecs fought 'Flower Wars' — ritual conflicts with neighbouring states specifically designed to capture prisoners for sacrifice rather than to conquer territory. Sometimes people were chosen from within Aztec society for special rituals.",
        ),
        t(
          "Being sacrificed was considered an honour. Victims were told they would go directly to the highest heaven — the eastern sky, where the sun rose — alongside warriors who died in battle and women who died in childbirth. This was the most desirable afterlife an Aztec person could achieve.",
        ),
        t(
          "It is important to understand Aztec sacrifice in context. The scale was shocking to the Spanish — who themselves practiced public executions, torture during the Inquisition, and violence during their own wars of conquest — but for the Aztecs it was a deeply meaningful religious obligation.",
        ),
      ],
    },
    {
      id: "religion-afterlife",
      heading: "The afterlife and the nine-level underworld",
      body: [
        t(
          "Unlike many religions where your behaviour in life determines your afterlife, the Aztecs believed your destiny after death was determined by how you died, not how you lived.",
        ),
        t(
          "Those who died in battle, in sacrifice, or in childbirth went to the highest heaven to accompany the sun on its daily journey. Those who drowned or died from water-related causes went to Tlalocan, the paradise of the rain god — a place of eternal spring with abundant food and flowers.",
        ),
        t(
          "Most people, however, went to Mictlan — the underworld. This was not a place of punishment but a neutral realm of the dead. The journey to Mictlan took four years and involved passing through nine treacherous levels, facing challenges like razor-sharp mountains, freezing winds, and a river of blood. After completing this journey, the soul would finally find rest.",
        ),
        t(
          "The dead were buried with provisions for the journey: food, water, tools, and sometimes a small dog to guide them across the river. The dog was sacrificed at the funeral so its spirit could accompany its owner.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "religion-p1",
      type: "mcq",
      prompt: [
        t(
          "According to Aztec beliefs, what determined what happened to a person in the afterlife?",
        ),
      ],
      explanation: [
        t(
          "The Aztecs believed your afterlife destination was determined by how you died, not by how you lived. Warriors who died in battle, sacrificial victims, and women who died in childbirth went to the highest heaven. Most others went to Mictlan, the underworld. This is very different from religions where moral behaviour during life determines your fate.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("How they died, not how they lived")] },
        { id: "b", label: [t("How much wealth they accumulated")] },
        { id: "c", label: [t("Whether they were a good person")] },
        { id: "d", label: [t("How many children they had")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "religion-p2",
      type: "numeric",
      prompt: [
        t(
          "How many levels did the Aztecs believe the underworld (Mictlan) had?",
        ),
      ],
      explanation: [
        t(
          "Mictlan had nine levels, each with its own challenge. The soul had to pass through all nine — a journey that took four years — before finding final rest. The levels included tests like crossing a river of blood, passing through mountains that crashed together, and enduring freezing winds.",
        ),
      ],
      xp: 10,
      accepted: ["9", "nine"],
    },
    {
      id: "religion-p3",
      type: "shortText",
      prompt: [
        t(
          "Why did the Aztecs believe human sacrifice was necessary? Explain the connection to the sun.",
        ),
      ],
      explanation: [
        t(
          "The Aztecs believed the gods had sacrificed their own blood to create the sun and the world. Humans therefore owed a blood debt to the gods. Without constant offerings of human blood, they believed the sun would stop moving across the sky and the world would end in darkness. Sacrifice was seen not as murder but as the most important duty — keeping the cosmos alive. The heart, as the seat of life, was the most precious offering.",
        ),
      ],
      xp: 15,
      accepted: [
        "blood",
        "sun",
        "debt",
        "nourishment",
        "keep moving",
      ],
    },
    {
      id: "religion-p4",
      type: "mcq",
      prompt: [
        t(
          "Why was being sacrificed considered an honour in Aztec society?",
        ),
      ],
      explanation: [
        t(
          "Victims of sacrifice were promised a place in the highest heaven — the eastern sky where the sun rose — alongside the most honoured dead: warriors and women who died in childbirth. This was the most desirable afterlife. Rather than being seen as punishment, sacrifice was presented as a glorious destiny.",
        ),
      ],
      xp: 10,
      options: [
        {
          id: "a",
          label: [
            t(
              "They were guaranteed a place in the highest heaven reserved for warriors",
            ),
          ],
        },
        { id: "b", label: [t("They would be reborn as nobles")] },
        { id: "c", label: [t("Their family would receive gold")] },
        { id: "d", label: [t("They would become gods themselves")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "religion-p5",
      type: "mcq",
      prompt: [
        t(
          "What were 'Flower Wars' and what was their purpose?",
        ),
      ],
      explanation: [
        t(
          "Flower Wars were ritualised conflicts fought between the Aztecs and neighbouring states specifically to capture prisoners for sacrifice. Unlike normal wars of conquest, the goal was not territory but live captives. Both sides agreed to these battles, which were highly formalised. The name 'Flower War' comes from the Aztec metaphor of warriors as flowers being plucked for the gods.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t(
              "Ritual conflicts fought to capture prisoners for sacrifice rather than to conquer territory",
            ),
          ],
        },
        {
          id: "b",
          label: [t("Wars fought over control of flower-producing farmland")],
        },
        {
          id: "c",
          label: [t("Celebrations where warriors threw flowers at each other")],
        },
        {
          id: "d",
          label: [t("Battles that only happened during the spring season")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "religion-p6",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about Aztec afterlife beliefs.")],
      template: [
        t(
          "Unlike many religions where your moral behaviour determines your fate, the Aztecs believed your afterlife was determined by ___ you died.",
        ),
      ],
      explanation: [
        t(
          "The manner of death — in battle, in sacrifice, in childbirth, by drowning, or by natural causes — was the key factor in determining which afterlife a person went to. Moral conduct during life was not the deciding factor.",
        ),
      ],
      xp: 10,
      accepted: ["how"],
    },
    {
      id: "religion-p7",
      type: "matching",
      prompt: [t("Match each Aztec god to their domain.")],
      explanation: [
        t(
          "Huitzilopochtli was the god of war and the sun — the patron deity of the Aztecs. Tlaloc was the rain god, associated with agricultural fertility. Quetzalcoatl was the feathered serpent, god of wind, learning, and knowledge. Tezcatlipoca was the god of night, fate, and sorcery — often depicted as Huitzilopochtli's rival.",
        ),
      ],
      xp: 15,
      pairs: [
        {
          id: "a",
          left: [t("Huitzilopochtli")],
          right: [t("God of war and the sun")],
        },
        {
          id: "b",
          left: [t("Tlaloc")],
          right: [t("God of rain and agriculture")],
        },
        {
          id: "c",
          left: [t("Quetzalcoatl")],
          right: [t("Feathered serpent, god of wind and learning")],
        },
        {
          id: "d",
          left: [t("Tezcatlipoca")],
          right: [t("God of night, fate, and sorcery")],
        },
      ],
    },
    {
      id: "religion-p8",
      type: "mcq",
      prompt: [
        t(
          "What did the Aztecs build to worship their gods and conduct sacrifices?",
        ),
      ],
      explanation: [
        t(
          "The Aztecs built enormous step-pyramid temples. The most famous was the Templo Mayor (Great Temple) in the centre of Tenochtitlan, which was dedicated to both Huitzilopochtli and Tlaloc. Sacrifices were performed at the top of these pyramids, where the victim's heart was offered to the gods visible to the entire city below.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Step-pyramid temples")] },
        { id: "b", label: [t("Underground caves")] },
        { id: "c", label: [t("Floating barges on the lake")] },
        { id: "d", label: [t("Open fields with stone circles")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "religion-m1",
      type: "shortText",
      prompt: [
        t(
          "The Aztec belief that the world had been destroyed four times before (the Five Suns myth) shaped their religious practices. Explain how this belief connects to human sacrifice.",
        ),
      ],
      explanation: [
        t(
          "The Aztecs believed they were living in the era of the Fifth Sun. The previous four suns had ended in catastrophe — devoured by jaguars, destroyed by hurricanes, consumed by fire, and flooded. Each sun had required the sacrifice of a god to create. To prevent the Fifth Sun from ending in earthquakes and darkness, the Aztecs believed they had to continually repay the gods with the most precious substance — human blood. Sacrifice was literally keeping the world alive. This made it the most important religious duty, not an act of cruelty.",
        ),
      ],
      xp: 20,
      accepted: [
        "five suns",
        "blood",
        "keep the sun",
        "nourishment",
        "sacrifice",
        "repay",
      ],
    },
    {
      id: "religion-m2",
      type: "mcq",
      prompt: [
        t(
          "The Spanish conquistadors were horrified by Aztec human sacrifice. Which perspective best explains the complexity of judging Aztec religious practices?",
        ),
      ],
      explanation: [
        t(
          "Historical practices should be understood within their cultural and religious context. The Aztecs genuinely believed sacrifice was necessary to prevent cosmic destruction — it was not cruelty for its own sake. At the same time, the Spanish — who condemned Aztec sacrifice — were themselves engaged in violent conquest, burning heretics during the Inquisition, and forcibly converting Indigenous peoples. Both societies had practices that the other found abhorrent, and both justified violence through religion.",
        ),
      ],
      xp: 20,
      options: [
        {
          id: "a",
          label: [
            t(
              "Aztec sacrifice should be understood within their own religious worldview, just as Spanish violence should be understood within theirs",
            ),
          ],
        },
        {
          id: "b",
          label: [
            t(
              "The Aztecs were uniquely cruel and the Spanish had every right to stop them",
            ),
          ],
        },
        {
          id: "c",
          label: [
            t(
              "The Spanish and Aztecs had identical religious practices",
            ),
          ],
        },
        {
          id: "d",
          label: [
            t(
              "Human sacrifice proves the Aztecs were not a real civilisation",
            ),
          ],
        },
      ],
      correctOptionId: "a",
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 4 – The conquistadors arrive
// ---------------------------------------------------------------------------

const spanishArrival: Lesson = {
  id: "spanish-arrival",
  order: 4,
  title: "The conquistadors arrive",
  sourceRef:
    "Aztec Empire Intro; Spanish Conquest: Crazy Questions & Taboo (Stile)",
  aiProvenance: {
    tool: "Claude",
    sources: [
      "Stile: Aztec Empire Intro",
      "Stile: Spanish Conquest: Crazy Questions & Taboo",
    ],
    role: "generated",
  },
  learnCards: [
    {
      id: "arrival-motives",
      heading: "Gold, glory, and God",
      body: [
        t(
          "When Christopher Columbus reached the Americas in 1492, he triggered a wave of Spanish exploration and conquest. The men who led these expeditions were called conquistadors — a Spanish word meaning 'conquerors'. They were not official soldiers of the Spanish army; they were adventurers, minor nobles, and fortune-seekers who funded their own expeditions in exchange for a share of whatever wealth they found.",
        ),
        t(
          "Historians often describe conquistador motivations using three words: gold, glory, and God. Gold represented the immense wealth they hoped to find — rumours of cities of gold had circulated in Europe for decades. Glory meant fame, titles, and noble status that many of these men could never achieve in Spain. God represented the religious mission: to convert 'heathen' peoples to Christianity, often by force.",
        ),
        t(
          "These three motivations were intertwined. Conquistadors genuinely believed they were serving God while also enriching themselves and winning fame. The Spanish Crown required all expeditions to carry priests who would convert Indigenous peoples, but the Crown also took a 20% share (the 'royal fifth') of all plunder — making conquest both a spiritual and financial enterprise.",
        ),
      ],
    },
    {
      id: "arrival-cortes",
      heading: "Hernán Cortés and the expedition of 1519",
      body: [
        t(
          "Hernán Cortés was a minor Spanish nobleman who had lived in the Caribbean colony of Cuba for several years. In 1519, the governor of Cuba authorised him to lead an expedition to explore the Mexican coast — but at the last minute the governor changed his mind and cancelled the mission. Cortés ignored the order and set sail anyway with 11 ships, about 500 men, 16 horses, and some cannons. This act of defiance set the tone for everything that followed.",
        ),
        t(
          "When Cortés landed on the coast of Mexico in April 1519, he immediately encountered Indigenous peoples who had been conquered by the Aztecs and resented paying tribute. Through a series of battles and negotiations, Cortés began building alliances with these groups. The most important was the Tlaxcalans — a fiercely independent people who had resisted Aztec domination for decades and who provided Cortés with thousands of warriors.",
        ),
        t(
          "One of the most significant figures in this story is a woman known as Malinche (also called Doña Marina). She was an enslaved Indigenous woman given to Cortés as a gift. She spoke both Nahuatl (the Aztec language) and Mayan, and she quickly learned Spanish. She became Cortés's translator, negotiator, and advisor — without her, the Spanish would have had almost no ability to communicate with the Aztecs. Her role was so crucial that the Aztecs sometimes referred to Cortés himself as 'Malinche'.",
        ),
      ],
    },
    {
      id: "arrival-moctezuma",
      heading: "Moctezuma's dilemma",
      figure: figCortesMoctezuma,
      body: [
        t(
          "When Moctezuma II, the Aztec emperor, heard reports of strange beings arriving on the coast — pale-skinned men riding enormous deer-like creatures (horses), carrying weapons that spat thunder and fire — he faced an impossible decision. Some accounts suggest Moctezuma initially believed Cortés might be the returning god Quetzalcoatl, whose return had been prophesied, though many historians now debate whether this was a later Spanish invention.",
        ),
        t(
          "Moctezuma sent gifts of gold and precious objects to the Spanish, hoping to satisfy them and persuade them to leave. This strategy backfired: the gold confirmed to Cortés that Mexico held enormous wealth worth conquering. Moctezuma also sent spies and diplomats rather than immediately attacking, which gave Cortés time to build his alliances and march inland.",
        ),
        t(
          "In November 1519, Cortés and his force — now including thousands of Indigenous allies — arrived at Tenochtitlan. Moctezuma invited them into the city as guests. The Spanish were awed by what they saw: a city of gleaming white buildings, bustling markets, and towering pyramids. But within days, Cortés took Moctezuma hostage in his own palace, effectively taking control of the empire without a battle.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "arrival-p1",
      type: "numeric",
      prompt: [
        t(
          "In what year did Hernán Cortés arrive on the coast of Mexico?",
        ),
      ],
      explanation: [
        t(
          "Cortés landed in Mexico in 1519, the same year he defied the governor of Cuba and launched his expedition. He arrived with about 500 men, 16 horses, and a handful of cannons — a tiny force that would eventually bring down an empire of millions.",
        ),
      ],
      xp: 10,
      accepted: ["1519"],
    },
    {
      id: "arrival-p2",
      type: "mcq",
      prompt: [
        t(
          "What were the three main motivations of the Spanish conquistadors, often summarised by historians?",
        ),
      ],
      explanation: [
        t(
          "The three motivations were gold (wealth and plunder), glory (fame and noble status), and God (converting Indigenous peoples to Christianity). These were intertwined — conquistadors saw themselves as serving God while enriching themselves. The Spanish Crown took a 20% share of all treasure.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Gold, glory, and God")] },
        { id: "b", label: [t("Land, liberty, and language")] },
        { id: "c", label: [t("Spices, silk, and silver")] },
        { id: "d", label: [t("Peace, trade, and friendship")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "arrival-p3",
      type: "shortText",
      prompt: [
        t(
          "Who was Malinche and why was she important to Cortés's expedition?",
        ),
      ],
      explanation: [
        t(
          "Malinche (also called Doña Marina) was an enslaved Indigenous woman given to Cortés. She spoke Nahuatl and Mayan, and quickly learned Spanish. She served as Cortés's translator, negotiator, and cultural advisor. Without her language skills, the Spanish would have been unable to communicate with the Aztecs or negotiate alliances with Indigenous groups. Some historians argue that Malinche was one of the most decisive factors in the Spanish victory — Cortés himself acknowledged her importance.",
        ),
      ],
      xp: 15,
      accepted: [
        "translator",
        "interpreter",
        "language",
        "communicate",
        "advisor",
      ],
    },
    {
      id: "arrival-p4",
      type: "mcq",
      prompt: [
        t(
          "Why did Moctezuma's strategy of sending gifts to Cortés backfire?",
        ),
      ],
      explanation: [
        t(
          "Moctezuma sent gold and precious objects hoping to satisfy the Spanish and convince them to leave peacefully. Instead, the gifts confirmed to Cortés that Mexico held enormous wealth and was worth conquering. The gold acted as bait rather than a deterrent.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t(
              "The gold confirmed to Cortés that Mexico held enormous wealth worth conquering",
            ),
          ],
        },
        {
          id: "b",
          label: [t("The gifts were insulting and angered Cortés")],
        },
        {
          id: "c",
          label: [t("The Spanish thought the gifts were poisoned")],
        },
        {
          id: "d",
          label: [t("The gifts were stolen by Cortés's own men")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "arrival-p5",
      type: "mcq",
      prompt: [
        t(
          "Why were the Tlaxcalans willing to ally with Cortés against the Aztecs?",
        ),
      ],
      explanation: [
        t(
          "The Tlaxcalans had resisted Aztec domination for decades and resented being surrounded by a hostile empire that demanded tribute. They saw Cortés as a potential ally who could help them overthrow their Aztec overlords. Without the thousands of Tlaxcalan warriors who joined the Spanish, Cortés's tiny force would have been easily defeated.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t(
              "They had resisted Aztec domination and saw Cortés as an ally against their enemy",
            ),
          ],
        },
        {
          id: "b",
          label: [t("Cortés paid them enormous amounts of gold")],
        },
        {
          id: "c",
          label: [t("They had been ordered to help by the Aztec emperor")],
        },
        {
          id: "d",
          label: [t("They wanted to learn Spanish military techniques")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "arrival-p6",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about Cortés's expedition.")],
      template: [
        t(
          "Cortés defied the governor of Cuba and launched his expedition anyway with only about ___ men and 16 horses.",
        ),
      ],
      explanation: [
        t(
          "Cortés had approximately 500 men, 16 horses, and a few cannons. Against an empire of millions, this was a tiny force. His success depended almost entirely on the Indigenous allies who joined him — by the time he reached Tenochtitlan, his army numbered in the thousands, mostly Tlaxcalans and other groups opposed to Aztec rule.",
        ),
      ],
      xp: 10,
      accepted: ["500", "five hundred"],
    },
    {
      id: "arrival-p7",
      type: "mcq",
      prompt: [
        t(
          "What happened when Cortés and Moctezuma first met in Tenochtitlan in November 1519?",
        ),
      ],
      explanation: [
        t(
          "Moctezuma invited Cortés into Tenochtitlan as an honoured guest. The Spanish were awed by the city's beauty and size. But within days of arriving, Cortés seized Moctezuma and held him hostage in his own palace, effectively taking control of the Aztec Empire without fighting a major battle. Moctezuma continued to 'rule' as a puppet under Spanish control.",
        ),
      ],
      xp: 10,
      options: [
        {
          id: "a",
          label: [
            t(
              "Cortés took Moctezuma hostage in his own palace, taking control of the empire",
            ),
          ],
        },
        {
          id: "b",
          label: [t("Moctezuma defeated Cortés in a great battle")],
        },
        {
          id: "c",
          label: [
            t(
              "They signed a peace treaty dividing Mexico between Spain and the Aztecs",
            ),
          ],
        },
        {
          id: "d",
          label: [t("Cortés immediately converted Moctezuma to Christianity")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "arrival-p8",
      type: "shortText",
      prompt: [
        t(
          "Was Cortés a typical conquistador? Explain why or why not.",
        ),
      ],
      explanation: [
        t(
          "Cortés was both typical and exceptional. Like other conquistadors, he was motivated by gold, glory, and God, and he funded his own expedition. However, he was exceptional in his political skill — he built alliances with Indigenous groups, used psychological tactics, and turned the Aztec tribute system against itself. His defiance of the governor of Cuba showed unusual boldness. He was also unusually brutal, even by conquistador standards, as shown by the Cholula massacre.",
        ),
      ],
      xp: 15,
      accepted: [
        "typical",
        "exceptional",
        "alliances",
        "political",
        "both",
      ],
    },
  ],
  mastery: [
    {
      id: "arrival-m1",
      type: "mcq",
      prompt: [
        t(
          "Which single factor was most decisive in allowing Cortés's tiny Spanish force to defeat the Aztec Empire?",
        ),
      ],
      explanation: [
        t(
          "All these factors mattered, but historians generally agree that the Indigenous allies — particularly the Tlaxcalans, who provided thousands of warriors — were the single most decisive factor. Cortés's 500 Spaniards would have been annihilated without them. The Aztec tribute system had created deep resentment among conquered peoples, and Cortés exploited this brilliantly. Disease also played a role but mainly after the initial conquest.",
        ),
      ],
      xp: 20,
      options: [
        {
          id: "a",
          label: [
            t(
              "The thousands of Indigenous allies who joined Cortés against the Aztecs",
            ),
          ],
        },
        {
          id: "b",
          label: [t("Spanish steel weapons and armour")],
        },
        {
          id: "c",
          label: [t("The spread of smallpox")],
        },
        {
          id: "d",
          label: [t("Spanish horses, which the Aztecs had never seen before")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "arrival-m2",
      type: "shortText",
      prompt: [
        t(
          "The conquistadors described their conquest as a religious mission to spread Christianity. Modern historians have debated whether this was genuine belief or a justification for greed. What do you think? Use evidence from what you have learned.",
        ),
      ],
      explanation: [
        t(
          "This is a complex historical question with evidence on both sides. The conquistadors carried priests, built churches, and genuinely believed they were saving souls. But they also took 20% of all plunder, seized land, and enslaved people — actions hard to reconcile with Christian teachings of charity. Most historians argue religion was both a genuine motivation and a convenient justification: conquistadors could tell themselves (and the Spanish Crown) that their violence served God's purposes, making conquest morally acceptable in their own eyes.",
        ),
      ],
      xp: 20,
      accepted: [
        "both",
        "genuine",
        "justification",
        "greed",
        "religion",
        "excuse",
      ],
    },
    {
      id: "arrival-m3",
      type: "mcq",
      prompt: [
        t(
          "What does the story of Malinche reveal about the nature of the Spanish conquest?",
        ),
      ],
      explanation: [
        t(
          "Malinche's role shows that the conquest was not simply 'Spaniards versus Aztecs' — it was a complex web of Indigenous peoples with their own rivalries and agendas. An enslaved Indigenous woman became one of the most powerful people in the conquest because of her language skills and political intelligence. The Spanish victory depended on Indigenous knowledge, alliances, and labour at every stage.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t(
              "The conquest depended on Indigenous people — not just Spanish military power",
            ),
          ],
        },
        {
          id: "b",
          label: [t("The Spanish could have conquered Mexico without any help")],
        },
        {
          id: "c",
          label: [
            t(
              "Malinche single-handedly defeated the Aztec Empire",
            ),
          ],
        },
        {
          id: "d",
          label: [
            t(
              "The Aztecs were unable to communicate with anyone outside their empire",
            ),
          ],
        },
      ],
      correctOptionId: "a",
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 5 – The fall of Tenochtitlan
// ---------------------------------------------------------------------------

const fallOfTenochtitlan: Lesson = {
  id: "fall-of-tenochtitlan",
  order: 5,
  title: "The fall of Tenochtitlan",
  sourceRef:
    "Comparing Perspectives; 9.1 Aztec Minecraft City Tour (Stile)",
  aiProvenance: {
    tool: "Claude",
    sources: [
      "Stile: Comparing Perspectives - The Siege of Tenochtitlan",
      "Stile: 9.1 Aztec Minecraft City Tour",
      "Stile: Exam Sources A and B",
      "World History Encyclopedia: Aztec Warfare (Cartwright, 2015)",
    ],
    role: "generated",
  },
  learnCards: [
    {
      id: "fall-leadup",
      heading: "From hostage crisis to open war",
      body: [
        t(
          "After months of Cortés holding Moctezuma hostage, tensions in Tenochtitlan reached breaking point. In mid-1520, while Cortés was away dealing with a Spanish rival, his second-in-command Pedro de Alvarado ordered a massacre of unarmed Aztec nobles during a religious festival. When Cortés returned, the city was in uproar.",
        ),
        t(
          "Cortés brought Moctezuma out onto a palace balcony to calm the crowd. Depending on which account you read, Moctezuma was either killed by a rock thrown by his own angry people or quietly murdered by the Spanish when he was no longer useful. Either way, he died that night — and with him, any hope of a negotiated settlement died too.",
        ),
        t(
          "The Spanish and their allies tried to escape the city under cover of darkness on 30 June 1520 — a night the Spanish later called La Noche Triste ('The Sad Night'). Aztec warriors attacked from canoes as the Spanish tried to cross the causeways. Hundreds of Spanish soldiers and thousands of Tlaxcalan allies were killed or drowned, weighed down by the gold they were trying to carry away. Cortés himself barely escaped.",
        ),
      ],
    },
    {
      id: "fall-siege",
      heading: "The siege and the invisible killer",
      figure: figSiegeTenochtitlan,
      body: [
        t(
          "Cortés retreated to Tlaxcala, where he regrouped and planned his return. He had ships built in pieces, carried them over the mountains, and reassembled them on Lake Texcoco — giving the Spanish control of the water for the first time. In May 1521, he began a full siege of Tenochtitlan.",
        ),
        t(
          "The siege cut off food, water, and supplies to the city. But the most devastating weapon was invisible: smallpox. The disease had arrived with the Spanish and spread rapidly through a population with no immunity. An estimated 40% of Tenochtitlan's population died from disease during the siege — far more than were killed in battle. The new Aztec emperor, Cuauhtémoc (Moctezuma's cousin), led a desperate defence, but his people were starving, sick, and outnumbered.",
        ),
        t(
          "The siege lasted 93 days. The Spanish and their Indigenous allies fought street by street, house by house, destroying the beautiful city as they advanced. On 13 August 1521, Cuauhtémoc was captured while trying to escape by canoe. Tenochtitlan had fallen. The Spanish razed what remained and built Mexico City directly on top of the ruins.",
        ),
      ],
    },
    {
      id: "fall-why",
      heading: "How did a few hundred Spaniards defeat an empire?",
      body: [
        t(
          "The Spanish conquest was not a simple story of superior European technology overcoming a 'primitive' civilisation. Historians now identify several factors that together explain the outcome:",
        ),
        t(
          "1. Indigenous allies. The Tlaxcalans and other groups provided tens of thousands of warriors. Without them, the Spanish would have been annihilated.",
        ),
        t(
          "2. Disease. Smallpox and other Old World diseases killed millions of Indigenous people who had no prior exposure or immunity. The psychological impact — watching your people die while the Spanish seemed immune — was devastating.",
        ),
        t(
          "3. Political structure. The Aztec tribute system created widespread resentment. Many conquered peoples saw the Spanish as liberators, not invaders.",
        ),
        t(
          "4. Military technology. Spanish steel swords, armour, crossbows, and cannons provided real advantages in combat, though not as decisive as once believed.",
        ),
        t(
          "5. Psychological warfare. Horses and gunpowder were terrifying to people who had never seen them. The Spanish deliberately used theatrical violence — massacres like Cholula — to intimidate.",
        ),
        t(
          "6. Moctezuma's hesitation. The emperor's indecision and initial belief that Cortés might be a god gave the Spanish critical time to build alliances.",
        ),
        t(
          "7. Different approaches to war. The Aztecs fought ritualised battles aimed at capturing individual enemies alive for sacrifice — they avoided total destruction. The Spanish fought to annihilate the enemy completely. The Aztecs used pre-battle diplomacy and rarely attacked by surprise, which gave the more ruthless Spanish a distinct advantage. As one historian put it, the conquest was 'perhaps the Aztecs' first and last experience of total war.'",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "fall-p1",
      type: "numeric",
      prompt: [
        t(
          "In what year did Tenochtitlan finally fall to Cortés and his allies?",
        ),
      ],
      explanation: [
        t(
          "Tenochtitlan fell on 13 August 1521, after a 93-day siege. The Aztec emperor Cuauhtémoc was captured trying to escape by canoe. The Spanish then destroyed the city and built Mexico City on its ruins.",
        ),
      ],
      xp: 10,
      accepted: ["1521"],
    },
    {
      id: "fall-p2",
      type: "mcq",
      prompt: [
        t(
          "What was La Noche Triste ('The Sad Night')?",
        ),
      ],
      explanation: [
        t(
          "La Noche Triste was 30 June 1520, when the Spanish attempted to escape Tenochtitlan under cover of darkness. Aztec warriors attacked them as they crossed the causeways, killing hundreds of Spaniards and thousands of Tlaxcalan allies. Many drowned because they were weighed down by stolen gold. Cortés barely survived.",
        ),
      ],
      xp: 10,
      options: [
        {
          id: "a",
          label: [
            t(
              "The night the Spanish tried to escape Tenochtitlan and lost hundreds of men",
            ),
          ],
        },
        {
          id: "b",
          label: [t("The night Moctezuma was crowned emperor")],
        },
        {
          id: "c",
          label: [t("The night the Spanish first arrived in Mexico")],
        },
        {
          id: "d",
          label: [
            t(
              "A religious festival celebrating Aztec gods",
            ),
          ],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "fall-p3",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about the deadliest factor in the siege.")],
      template: [
        t(
          "During the siege of Tenochtitlan, ___ killed far more Aztecs than Spanish weapons did, because the population had no immunity to Old World diseases.",
        ),
      ],
      explanation: [
        t(
          "Smallpox was the most devastating weapon in the Spanish arsenal — and it was entirely unintentional. An estimated 40% of the city's population died from disease during the siege. The Aztecs had no prior exposure to Old World diseases and therefore no biological resistance. This pattern repeated across the Americas, where disease killed up to 90% of Indigenous populations within a century of contact.",
        ),
      ],
      xp: 10,
      accepted: [
        "smallpox",
        "disease",
        "illness",
        "sickness",
      ],
    },
    {
      id: "fall-p4",
      type: "shortText",
      prompt: [
        t(
          "List at least three factors that together explain how a few hundred Spaniards defeated the Aztec Empire.",
        ),
      ],
      explanation: [
        t(
          "The main factors were: (1) Indigenous allies — tens of thousands of Tlaxcalans and others joined Cortés; (2) disease — smallpox killed millions; (3) political structure — the tribute system created resentment that Cortés exploited; (4) military technology — steel weapons, cavalry, and cannons; (5) psychological warfare — horses, gunpowder, and theatrical violence terrified opponents; (6) Moctezuma's hesitation and possible belief that Cortés was a god.",
        ),
      ],
      xp: 15,
      accepted: [
        "allies",
        "disease",
        "smallpox",
        "tribute",
        "weapons",
        "horses",
        "technology",
        "moctezuma",
      ],
    },
    {
      id: "fall-p5",
      type: "mcq",
      prompt: [
        t(
          "How did Cortés regain control of Lake Texcoco for the final siege of Tenochtitlan?",
        ),
      ],
      explanation: [
        t(
          "Cortés had ships built in pieces, carried over the mountains by thousands of Tlaxcalan porters, and reassembled on the lake shore. These brigantines gave the Spanish control of the water — they could attack Aztec canoes and block supply routes. This was a remarkable feat of logistics and engineering.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t(
              "He had ships built in pieces, carried overland, and reassembled on the lake",
            ),
          ],
        },
        {
          id: "b",
          label: [t("He drained the lake")],
        },
        {
          id: "c",
          label: [t("He bought ships from the Aztecs")],
        },
        {
          id: "d",
          label: [t("The Spanish navy sailed up a river to the lake")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "fall-p6",
      type: "mcq",
      prompt: [
        t(
          "Who became the Aztec emperor after the death of Moctezuma II?",
        ),
      ],
      explanation: [
        t(
          "Cuauhtémoc, Moctezuma's young cousin, became emperor and led the desperate defence of Tenochtitlan. He was captured on 13 August 1521 while trying to escape by canoe. According to some accounts, when he surrendered, he told Cortés: 'I have done everything in my power to defend my people. Now do with me as you will.' He was later tortured and executed by the Spanish.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Cuauhtémoc")] },
        { id: "b", label: [t("Cuitláhuac")] },
        { id: "c", label: [t("Nezahualcóyotl")] },
        { id: "d", label: [t("Texcoco")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "fall-p7",
      type: "mcq",
      prompt: [
        t(
          "The Aztecs sometimes fought 'Flower Wars' (xochiyaoyotl). What was the purpose of these conflicts?",
        ),
      ],
      explanation: [
        t(
          "Flower Wars were ritualised conflicts where the goal was not to conquer territory but to capture prisoners for sacrifice. Both sides agreed to the battle beforehand, and the 'losers' provided warriors for religious ceremonies. The name comes from the Aztec metaphor of captured warriors, in their splendid feather costumes, looking like flowers being gathered. This approach to warfare — limited, ritualised, and focused on individual capture — was completely alien to the Spanish, who fought to totally destroy enemy forces.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t(
              "To capture prisoners for sacrifice, not to conquer territory",
            ),
          ],
        },
        {
          id: "b",
          label: [t("To destroy enemy crops and cause famine")],
        },
        {
          id: "c",
          label: [t("To conquer new farmland for growing flowers")],
        },
        {
          id: "d",
          label: [t("To train young warriors without real danger")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "fall-p8",
      type: "matching",
      prompt: [t("Match each factor in the Spanish victory to its description.")],
      explanation: [
        t(
          "Tlaxcalan warriors provided the numbers without which Cortés would have been overwhelmed. Smallpox killed people with no immunity, destroying Aztec ability to fight. The tribute system meant many groups hated the Aztecs and joined the Spanish. Steel swords and armour gave the Spanish advantages in close combat.",
        ),
      ],
      xp: 15,
      pairs: [
        {
          id: "a",
          left: [t("Indigenous allies")],
          right: [t("Provided thousands of warriors against the Aztecs")],
        },
        {
          id: "b",
          left: [t("Smallpox")],
          right: [t("Killed up to 40% of the population during the siege")],
        },
        {
          id: "c",
          left: [t("Tribute system")],
          right: [t("Created widespread resentment that Cortés exploited")],
        },
        {
          id: "d",
          left: [t("Steel weapons")],
          right: [t("Gave Spanish soldiers an edge in hand-to-hand combat")],
        },
      ],
    },
    {
      id: "fall-p9",
      type: "shortText",
      prompt: [
        t(
          "What happened to Tenochtitlan after it fell to the Spanish?",
        ),
      ],
      explanation: [
        t(
          "After capturing the city, the Spanish razed (completely destroyed) what remained of Tenochtitlan. They built Mexico City directly on top of the ruins, using stones from Aztec temples to construct Spanish buildings, including a cathedral that stands on the site of the Templo Mayor. The lake was gradually drained over the following centuries. Today, the ruins of the Templo Mayor can still be visited in the centre of Mexico City.",
        ),
      ],
      xp: 15,
      accepted: [
        "destroyed",
        "razed",
        "Mexico City",
        "built on top",
        "ruins",
      ],
    },
  ],
  mastery: [
    {
      id: "fall-m1",
      type: "mcq",
      prompt: [
        t(
          "Some historians argue that disease, not Spanish military superiority, was the primary reason the Aztec Empire fell. Which evidence best supports this argument?",
        ),
      ],
      explanation: [
        t(
          "The fact that up to 40% of Tenochtitlan's population died from smallpox during the siege — far more than were killed in battle — strongly supports the argument that disease was the decisive factor. It is hard to defend a city when nearly half the population is dead or dying. Additionally, disease spread ahead of the Spanish, destabilising the empire before Cortés even arrived.",
        ),
      ],
      xp: 20,
      options: [
        {
          id: "a",
          label: [
            t(
              "An estimated 40% of Tenochtitlan's population died from smallpox — far more than were killed in battle",
            ),
          ],
        },
        {
          id: "b",
          label: [t("Spanish steel swords could cut through Aztec armour")],
        },
        {
          id: "c",
          label: [t("Horses gave the Spanish a mobility advantage")],
        },
        {
          id: "d",
          label: [
            t(
              "The Spanish had more soldiers than the Aztecs",
            ),
          ],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "fall-m2",
      type: "shortText",
      prompt: [
        t(
          "The Spanish conquest of the Aztec Empire is sometimes described as an 'Indigenous civil war with Spanish involvement' rather than simply 'Spanish versus Aztecs'. Do you agree with this description? Explain your reasoning.",
        ),
      ],
      explanation: [
        t(
          "This description has merit because the vast majority of fighters on Cortés's side were Indigenous — tens of thousands of Tlaxcalans and warriors from other groups who hated Aztec rule. The Spanish provided leadership, some technology, and the catalyst for rebellion, but the fighting was largely between Indigenous peoples with long-standing grievances. However, the outcome was still Spanish colonisation, not Indigenous liberation — Cortés's allies became subjects of the Spanish Empire rather than the Aztec Empire. So while the conquest was fought mainly by Indigenous people, the ultimate beneficiaries were Spanish.",
        ),
      ],
      xp: 20,
      accepted: [
        "allies",
        "indigenous",
        "tlaxcalans",
        "civil war",
        "majority",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 6 – Voices from the conquest: analysing historical sources
// ---------------------------------------------------------------------------

const analysingSources: Lesson = {
  id: "analysing-sources",
  order: 6,
  title: "Voices from the conquest: analysing historical sources",
  sourceRef:
    "Exam Sources A & B; Close Reading Resource (Stile)",
  aiProvenance: {
    tool: "Claude",
    sources: [
      "Stile: Exam Seen Sources A and B - Spanish Conquest 2026",
      "Stile: Close Reading Resource for Exam Sources Annotation",
      "Stile: Comparing Perspectives - The Siege of Tenochtitlan",
    ],
    role: "generated",
  },
  learnCards: [
    {
      id: "sources-types",
      heading: "Primary and secondary sources",
      body: [
        t(
          "Historians use two main types of sources to understand the past. A primary source is a piece of evidence created at the time of the event being studied, by someone who was there or who directly witnessed it. Examples include letters, diaries, official records, artefacts, photographs, and eyewitness accounts — even if they were recorded later from memory.",
        ),
        t(
          "A secondary source is created after the event, usually by a historian or scholar who was not present. Secondary sources interpret and analyse primary sources to build an argument or narrative. Examples include textbooks, academic books, documentaries, and historical articles.",
        ),
        t(
          "The distinction is not always clean. Some sources can be both: an Aztec account recorded by a Spanish friar decades after the conquest is a primary source for Aztec memories of the event, but it has been filtered through a Spanish writer with his own agenda.",
        ),
      ],
    },
    {
      id: "sources-bias",
      heading: "Perspective, bias, and reliability",
      body: [
        t(
          "Every historical source has a perspective — the point of view from which it was created. Perspective is shaped by the author's identity, culture, position in society, and purpose for writing. A Spanish conquistador writing to the king to justify his actions has a very different perspective from an Aztec survivor describing what happened to their people.",
        ),
        t(
          "Bias is not the same as lying. A source can be biased — meaning it presents information in a way that favours one side — while still containing truthful information. The job of a historian is not to dismiss biased sources but to understand the bias and use it as evidence. What a source chooses to emphasise or omit can be as revealing as what it says.",
        ),
        t(
          "To evaluate reliability, historians ask: Who created this source? When? Why? Who was the intended audience? What does the source include, and what does it leave out? Can the information be corroborated (confirmed) by other sources?",
        ),
      ],
    },
    {
      id: "sources-cholula",
      heading: "Case study: two views of the Cholula massacre",
      figure: figCholulaMassacre,
      body: [
        t(
          "The Cholula massacre of 1519 shows how the same event can appear completely different depending on who tells the story. Cortés and his allies, including thousands of Tlaxcalan warriors, entered the city of Cholula (a major Aztec ally) and killed thousands of unarmed civilians in the central courtyard. Read these two accounts:",
        ),
        t(
          "Source A (Matthew Restall, historian, 2003): 'Theatrical and terrorising techniques appear again and again in the records of conquest expeditions. These include the mutilation of native prisoners often by the hundreds; the killing of women; and the mutilation or killing of select individuals … Another technique was the massacre of unarmed natives whose effect was magnified if women, children and the elderly were killed, as in the Cortés-led massacre in Cholula.' Restall argues the Spanish deliberately used violence to intimidate and control.",
        ),
        t(
          "Source B (Mexica/Aztec account, recorded 1500s): 'When they had all gathered, the Spaniards and their allies blocked the entrances … In the first moment, people were murdered and beaten. Nothing like this was in the minds of the Cholulans. Without swords or shields they met the Spaniards. Without warning, they were treacherously and deceitfully slain.' This account describes the experience of unarmed civilians ambushed without warning.",
        ),
        t(
          "Both sources describe the same massacre, but they serve different purposes. Restall is a modern historian building an argument about Spanish tactics. The Mexica account is a survivor's testimony, shaped by grief and the need to record what happened. Reading both together gives us a richer understanding than either alone.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "sources-p1",
      type: "mcq",
      prompt: [
        t(
          "A letter written by Hernán Cortés to the King of Spain in 1520 describing the conquest is an example of what kind of source?",
        ),
      ],
      explanation: [
        t(
          "Cortés's letter is a primary source because it was created at the time of the events by someone directly involved. It is also a highly biased source — Cortés was writing to justify his actions and secure royal favour, so he presented himself in the best possible light and exaggerated his achievements.",
        ),
      ],
      xp: 10,
      options: [
        {
          id: "a",
          label: [
            t(
              "A primary source — created at the time by someone directly involved",
            ),
          ],
        },
        {
          id: "b",
          label: [
            t(
              "A secondary source — written by a historian after the event",
            ),
          ],
        },
        {
          id: "c",
          label: [t("Neither — it is a fictional story")],
        },
        {
          id: "d",
          label: [t("An archaeological artefact")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "sources-p2",
      type: "mcq",
      prompt: [
        t(
          "Matthew Restall's 2003 book 'Seven Myths of the Spanish Conquest' is an example of what kind of source?",
        ),
      ],
      explanation: [
        t(
          "Restall's book is a secondary source because it was written centuries after the conquest by a historian who was not present. Restall uses primary sources — letters, accounts, records — to build an argument, but the book itself is a modern interpretation, not a source from the time.",
        ),
      ],
      xp: 10,
      options: [
        {
          id: "a",
          label: [
            t(
              "A secondary source — a modern historian's analysis of events",
            ),
          ],
        },
        {
          id: "b",
          label: [
            t(
              "A primary source — it was written by someone who witnessed the conquest",
            ),
          ],
        },
        {
          id: "c",
          label: [t("A primary source because it contains quotes")],
        },
        {
          id: "d",
          label: [t("Neither primary nor secondary")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "sources-p3",
      type: "shortText",
      prompt: [
        t(
          "Explain the difference between perspective and bias in a historical source.",
        ),
      ],
      explanation: [
        t(
          "Perspective is the point of view from which a source is created — every source has one, and it is shaped by the author's identity, culture, and position. Bias is when a source favours one side or presents information selectively to support a particular conclusion. Perspective is neutral and unavoidable; bias is a choice (conscious or unconscious) about how information is presented. A source can have a clear perspective without being biased — but most historical sources have both.",
        ),
      ],
      xp: 15,
      accepted: [
        "point of view",
        "favours",
        "unavoidable",
        "selective",
        "different",
      ],
    },
    {
      id: "sources-p4",
      type: "mcq",
      prompt: [
        t(
          "In Source B (the Mexica account of Cholula), the phrase 'Without warning, they were treacherously and deceitfully slain' reveals what about the source's perspective?",
        ),
      ],
      explanation: [
        t(
          "The language — 'treacherously', 'deceitfully', 'without warning' — reveals that the source views the Spanish attack as a cruel betrayal of unarmed civilians who had no reason to expect violence. This is the perspective of victims describing an ambush, and it is designed to evoke outrage and record the injustice. The account does not pretend to be neutral.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t(
              "It views the attack as a cruel betrayal of unarmed civilians — the perspective of victims",
            ),
          ],
        },
        {
          id: "b",
          label: [t("It is a completely neutral and unbiased account")],
        },
        {
          id: "c",
          label: [
            t(
              "It supports the Spanish justification for the attack",
            ),
          ],
        },
        {
          id: "d",
          label: [t("It was written to entertain rather than inform")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "sources-p5",
      type: "fillInTheBlank",
      prompt: [t("Complete the sentence about evaluating sources.")],
      template: [
        t(
          "When evaluating the reliability of a historical source, historians check whether its claims can be ___ by other sources.",
        ),
      ],
      explanation: [
        t(
          "Corroboration means confirming information by checking it against other independent sources. If multiple sources from different perspectives describe the same event in similar ways, we can be more confident that the account is reliable. If only one source describes something and all others contradict it, we treat it with caution.",
        ),
      ],
      xp: 10,
      accepted: ["corroborated", "confirmed", "verified", "supported", "backed up"],
    },
    {
      id: "sources-p6",
      type: "mcq",
      prompt: [
        t(
          "Why might an Aztec account of the conquest recorded by a Spanish friar decades later be problematic as a historical source?",
        ),
      ],
      explanation: [
        t(
          "The account has been filtered through the friar — a Spanish Christian with his own biases and purpose. He may have selected which stories to record, changed wording to fit Spanish understanding, or framed events to support the narrative of Spanish 'civilising' the Indigenous peoples. The Aztec voices are present but mediated through a European writer. This doesn't make the source useless — but it means we must read it with awareness of this filtering.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t(
              "The Aztec voices have been filtered through a Spanish writer with his own biases and agenda",
            ),
          ],
        },
        {
          id: "b",
          label: [t("Aztec people could not speak clearly")],
        },
        {
          id: "c",
          label: [t("The friar was unable to write")],
        },
        {
          id: "d",
          label: [t("Everything recorded by religious figures is unreliable")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "sources-p7",
      type: "matching",
      prompt: [
        t(
          "Match each question to the aspect of source evaluation it helps with.",
        ),
      ],
      explanation: [
        t(
          "Who created this? identifies the author and their perspective. Why was it created? reveals the purpose and possible bias. Who was the audience? shows who the author was trying to influence. What is left out? identifies omissions that might indicate deliberate bias.",
        ),
      ],
      xp: 15,
      pairs: [
        {
          id: "a",
          left: [t("Who created this source?")],
          right: [t("Identifies the author and their perspective")],
        },
        {
          id: "b",
          left: [t("Why was it created?")],
          right: [t("Reveals the purpose and possible bias")],
        },
        {
          id: "c",
          left: [t("Who was the audience?")],
          right: [t("Shows who the author was trying to influence")],
        },
        {
          id: "d",
          left: [t("What is left out?")],
          right: [t("Identifies omissions that might indicate deliberate bias")],
        },
      ],
    },
    {
      id: "sources-p8",
      type: "shortText",
      prompt: [
        t(
          "Source A (Restall) describes Spanish violence as 'theatrical and terrorising' and a deliberate strategy. Source B (Mexica) describes the Cholula massacre as a treacherous ambush. What do these two accounts, written over 400 years apart by very different authors, have in common in their description of the event?",
        ),
      ],
      explanation: [
        t(
          "Both accounts agree that the massacre was a deliberate attack on unarmed people who had no warning and no chance to defend themselves. Restall (2003) analyses it as a calculated military strategy; the Mexica account (1500s) describes it as a lived experience of terror. Despite being separated by centuries and created for completely different purposes, they corroborate each other on the essential facts: it was a one-sided killing of unarmed civilians.",
        ),
      ],
      xp: 20,
      accepted: [
        "unarmed",
        "deliberate",
        "no warning",
        "massacre",
        "civilians",
        "both",
        "agree",
      ],
    },
  ],
  mastery: [
    {
      id: "sources-m1",
      type: "mcq",
      prompt: [
        t(
          "A student says: 'Source A is biased because Restall is clearly critical of the Spanish, so I cannot trust anything it says.' Is this the correct approach to evaluating historical sources?",
        ),
      ],
      explanation: [
        t(
          "No — bias does not automatically make a source unreliable. A biased source can still contain accurate information and provide valuable insight into the author's perspective and motivations. The correct approach is to identify the bias, understand how it shapes the account, and corroborate claims against other sources. Dismissing biased sources entirely would mean throwing out almost all historical evidence, since every source has some perspective.",
        ),
      ],
      xp: 20,
      options: [
        {
          id: "a",
          label: [
            t(
              "No — bias does not make a source useless; it should be identified, understood, and corroborated",
            ),
          ],
        },
        {
          id: "b",
          label: [t("Yes — biased sources cannot be used by historians")],
        },
        {
          id: "c",
          label: [
            t(
              "Only primary sources can be biased; secondary sources are always objective",
            ),
          ],
        },
        {
          id: "d",
          label: [
            t(
              "Restall's source is not biased because he is a professional historian",
            ),
          ],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "sources-m2",
      type: "shortText",
      prompt: [
        t(
          "Why is it important that we have both Spanish and Aztec accounts of the conquest? What would we miss if we only had the Spanish accounts?",
        ),
      ],
      explanation: [
        t(
          "If we only had Spanish accounts, we would get a one-sided story: the conquistadors as brave heroes bringing civilisation and Christianity to 'savages'. We would miss the Aztec experience of watching their city destroyed, their people dying of disease, their temples torn down. The Spanish accounts downplay the brutality and emphasise their own heroism. The Aztec accounts emphasise the trauma and loss. Having both allows us to construct a more complete historical understanding — not by averaging the two perspectives, but by reading them against each other to identify what each reveals and what each hides.",
        ),
      ],
      xp: 20,
      accepted: [
        "one-sided",
        "perspective",
        "aztec experience",
        "both sides",
        "complete",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Boss challenge – Spanish Conquest
// ---------------------------------------------------------------------------

const spanishConquestChallengeQuestions: Question[] = [
  {
    id: "sc-boss-q1",
    type: "numeric",
    prompt: [
      t(
        "How many years after the formation of the Triple Alliance (1428) did Tenochtitlan fall to the Spanish (1521)?",
      ),
    ],
    explanation: [
      t(
        "The Triple Alliance formed in 1428 and Tenochtitlan fell in 1521 — a span of 93 years. This is a remarkably short time for an empire to rise, dominate central Mexico, and fall. The Aztec Empire lasted less than a century as a major power.",
      ),
    ],
    xp: 20,
    accepted: ["93"],
  },
  {
    id: "sc-boss-q2",
    type: "mcq",
    prompt: [
      t(
        "Which combination of factors is generally considered by historians to be the most important in explaining the Spanish victory over the Aztecs?",
      ),
    ],
    explanation: [
      t(
        "Indigenous allies (particularly the Tlaxcalans) provided the overwhelming majority of fighters; disease killed far more Aztecs than Spanish weapons; and the tribute system meant many conquered peoples were willing to fight against their Aztec overlords. Military technology mattered but was not decisive on its own.",
      ),
    ],
    xp: 20,
    options: [
      {
        id: "a",
        label: [
          t(
            "Indigenous allies, disease, and resentment of Aztec rule",
          ),
        ],
      },
      {
        id: "b",
        label: [t("Spanish steel weapons, cavalry, and cannons alone")],
      },
      {
        id: "c",
        label: [
          t(
            "The Aztecs had no army and offered no resistance",
          ),
        ],
      },
      {
        id: "d",
        label: [
          t(
            "The Spanish had far more soldiers than the Aztecs",
          ),
        ],
      },
    ],
    correctOptionId: "a",
  },
  {
    id: "sc-boss-q3",
    type: "matching",
    prompt: [t("Match each key figure to their role in the Spanish conquest.")],
    explanation: [
      t(
        "Hernán Cortés led the Spanish expedition that conquered the Aztec Empire. Moctezuma II was the Aztec emperor who initially welcomed Cortés and was later taken hostage. Malinche was Cortés's translator and advisor — crucial for communication. Cuauhtémoc was the last Aztec emperor who led the defence of Tenochtitlan.",
      ),
    ],
    xp: 25,
    pairs: [
      {
        id: "a",
        left: [t("Hernán Cortés")],
        right: [t("Spanish conquistador who led the expedition")],
      },
      {
        id: "b",
        left: [t("Moctezuma II")],
        right: [t("Aztec emperor who was taken hostage")],
      },
      {
        id: "c",
        left: [t("Malinche")],
        right: [
          t("Translator and advisor who enabled Spanish communication"),
        ],
      },
      {
        id: "d",
        left: [t("Cuauhtémoc")],
        right: [t("Last Aztec emperor who defended Tenochtitlan")],
      },
    ],
  },
  {
    id: "sc-boss-q4",
    type: "fillInTheBlank",
    prompt: [t("Complete the sentence about Tenochtitlan.")],
    template: [
      t(
        "Tenochtitlan was built on an island in ___ Texcoco and featured artificial farming islands called chinampas.",
      ),
    ],
    explanation: [
      t(
        "Lake Texcoco was a large lake system in the Valley of Mexico. The Aztecs built their capital on an island in this lake. Chinampas were artificial farming islands that allowed intensive agriculture on the water. After the conquest, the Spanish drained much of the lake, and Mexico City now stands where the lake once was.",
      ),
    ],
    xp: 20,
    accepted: ["Lake", "lake"],
  },
  {
    id: "sc-boss-q5",
    type: "shortText",
    prompt: [
      t(
        "Explain why the Aztec tribute system was both a strength and a weakness for the empire.",
      ),
    ],
    explanation: [
      t(
        "Strength: the tribute system allowed the Aztecs to extract vast wealth from conquered peoples without having to directly govern them — it was an efficient way to run an empire. Weakness: because conquered peoples were not integrated into Aztec society and resented paying tribute, they had no loyalty to the empire. When Cortés arrived, many tribute-paying groups saw an opportunity to overthrow their Aztec overlords and allied with the Spanish. The system that made the empire rich also made it fragile.",
      ),
    ],
    xp: 25,
    accepted: [
      "efficient",
      "resentment",
      "loyalty",
      "fragile",
      "weakness",
      "strength",
    ],
  },
  {
    id: "sc-boss-q6",
    type: "mcq",
    prompt: [
      t(
        "Which statement best describes how historians should approach biased historical sources?",
      ),
    ],
    explanation: [
      t(
        "Bias is a feature of sources that historians must work with, not a reason to dismiss them. Understanding bias — who created the source, why, and for whom — is part of historical analysis. Biased sources can still contain accurate information and always reveal something about the author's worldview and the context in which they wrote.",
      ),
    ],
    xp: 20,
    options: [
      {
        id: "a",
        label: [
          t(
            "Bias should be identified and understood as part of the historical analysis — it does not make a source useless",
          ),
        ],
      },
      {
        id: "b",
        label: [t("Biased sources should be ignored entirely")],
      },
      {
        id: "c",
        label: [t("Bias only exists in primary sources")],
      },
      {
        id: "d",
        label: [
          t(
            "Professional historians are never biased",
          ),
        ],
      },
    ],
    correctOptionId: "a",
  },
  {
    id: "sc-boss-q7",
    type: "mcq",
    prompt: [
      t(
        "What was Christopher Columbus originally searching for when he reached the Americas in 1492?",
      ),
    ],
    explanation: [
      t(
        "Columbus was searching for a western sea route to 'the Indies' — what Europeans called the spice-rich regions of East and South Asia. He never realised he had found a continent unknown to Europeans and died believing he had reached Asia. This is why the Caribbean islands are still called the 'West Indies' and why Indigenous Americans were historically called 'Indians'.",
      ),
    ],
    xp: 20,
    options: [
      { id: "a", label: [t("A western sea route to the Indies (Asia)")] },
      { id: "b", label: [t("The Aztec Empire specifically")] },
      { id: "c", label: [t("Australia")] },
      { id: "d", label: [t("A new continent he called America")] },
    ],
    correctOptionId: "a",
  },
  {
    id: "sc-boss-q8",
    type: "mcq",
    prompt: [
      t(
        "How did the Aztec approach to warfare differ from the Spanish approach, and why did this matter?",
      ),
    ],
    explanation: [
      t(
        "The Aztecs fought ritualised battles aimed at capturing individual enemies alive for sacrifice. They used pre-battle diplomacy, rarely attacked by surprise, and avoided total destruction of the enemy — they wanted live captives, not corpses. The Spanish fought to annihilate opposing forces completely and had no interest in taking prisoners alive. This fundamental mismatch in military culture meant the Aztecs were fighting a limited, ceremonial war while the Spanish were fighting a total war of conquest.",
      ),
    ],
    xp: 25,
    options: [
      {
        id: "a",
        label: [
          t(
            "The Aztecs fought to capture prisoners alive for sacrifice; the Spanish fought to destroy enemy forces completely",
          ),
        ],
      },
      {
        id: "b",
        label: [t("The Aztecs had no military traditions at all")],
      },
      {
        id: "c",
        label: [
          t(
            "The Spanish only fought at night when the Aztecs were sleeping",
          ),
        ],
      },
      {
        id: "d",
        label: [
          t(
            "The Aztecs used advanced gunpowder weapons the Spanish had never seen",
          ),
        ],
      },
    ],
    correctOptionId: "a",
  },
  {
    id: "sc-boss-q9",
    type: "mcq",
    prompt: [
      t(
        "Which modern city stands on the ruins of Tenochtitlan?",
      ),
    ],
    explanation: [
      t(
        "Mexico City was built directly on top of the ruins of Tenochtitlan after the Spanish razed the Aztec capital. The Spanish used stones from Aztec temples to construct their own buildings, including a cathedral on the site of the Templo Mayor. The lake was gradually drained over centuries. Today, you can still visit the excavated ruins of the Templo Mayor in the centre of Mexico City.",
      ),
    ],
    xp: 20,
    options: [
      { id: "a", label: [t("Mexico City")] },
      { id: "b", label: [t("Tlaxcala")] },
      { id: "c", label: [t("Cancún")] },
      { id: "d", label: [t("Guadalajara")] },
    ],
    correctOptionId: "a",
  },
];

// ---------------------------------------------------------------------------
// Track
// ---------------------------------------------------------------------------

/** Figures referenced by this track. */
export const spanishConquestFigures: Figure[] = [
  figTenochtitlan,
  figAztecHierarchy,
  figAztecSacrifice,
  figCortesMoctezuma,
  figSiegeTenochtitlan,
  figCholulaMassacre,
];

/** The Spanish Conquest track (Year 8 HSS). */
export const spanishConquestTrack: Track = {
  id: "spanish-conquest",
  subjectId: "hss",
  title: "Spanish Conquest (Year 8)",
  description:
    "The Aztec Empire, Spanish colonisation, the conquest of Mexico, and analysing historical sources.",
  lessons: [
    aztecOrigins,
    aztecSociety,
    aztecReligion,
    spanishArrival,
    fallOfTenochtitlan,
    analysingSources,
  ],
  challenge: {
    id: "spanish-conquest-boss",
    title: "Boss challenge: Spanish Conquest",
    sourceRef: "2026 8HSS Spanish Conquest Stile Unit, The Gap State High School",
    questions: spanishConquestChallengeQuestions,
    bonusXp: 100,
    passBadgeId: "boss-spanish-conquest",
    aiProvenance: {
      tool: "Claude",
      sources: [
        "Stile: 2026 8HSS T2 Spanish Conquest (all lessons, The Gap State High School)",
        "Stile: Exam Sources A and B - Spanish Conquest 2026",
        "World History Encyclopedia: Aztec Warfare (Cartwright, 2015)",
        "World History Encyclopedia: Aztec Society (Cartwright, 2015)",
        "Kahoot: Gold, God and Glory - Spanish Conquest of the Aztecs",
      ],
      role: "generated",
    },
  },
};
