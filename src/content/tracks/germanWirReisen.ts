/**
 * German Wir reisen! track content (Year 8 Languages, Term 2).
 *
 * Covers German vocabulary for places of interest, tourist attractions
 * in German-speaking countries, prepositions of location and movement,
 * transport vocabulary, sentence structures for describing what can be
 * seen and done in a city, and writing a short paragraph about a
 * German-speaking town or city. Based on the 2026 German 7&8 "Unit 6:
 * Wir reisen!" Stile unit (Frau Harris) at The Gap State High School.
 *
 * External references:
 * - Quizlet: Attraktionen / Sehenswürdigkeiten (attractions vocabulary)
 * - Quizlet: Modes of transport (Verkehrsmittel)
 * - Quizlet: Unit 6 nouns and phrases for "Ingrid fliegt mit dem Flugzeug"
 * - Quizlet: Unit 6 verbs
 * - stadttour-deutschland.de: Virtual map of German cities
 *
 * @author John Grimes
 * @module content/tracks/germanWirReisen
 */

import { t } from "../blocks";

import type {
  Lesson,
  Track,
  Question,
  Figure,
} from "../../domain/content/types";

// ---------------------------------------------------------------------------
// Figures
// ---------------------------------------------------------------------------

const figGermanyMap: Figure = {
  id: "germany-map-cities",
  alt: "A labelled map of Germany showing major cities: Berlin, München, Frankfurt, Hamburg, Köln, Stuttgart, Heidelberg, and Dresden. Each city is marked with a dot and label. Neighbouring countries are shown with faint borders.",
  textFallback:
    "[Map: Germany showing Berlin, München, Frankfurt, Hamburg, Köln, Stuttgart, Heidelberg, Dresden]",
};

const figTransportModes: Figure = {
  id: "german-transport-modes",
  alt: "Six labelled illustrations of transport modes in a clean textbook style: der Bus (bus), die Straßenbahn (tram), die Fähre (ferry), das Fahrrad (bicycle), das Flugzeug (aeroplane), zu Fuß (on foot, shown as walking shoes).",
  textFallback:
    "[Diagram: six transport modes — der Bus, die Straßenbahn, die Fähre, das Fahrrad, das Flugzeug, zu Fuß]",
};

const figPrepositionsDiagram: Figure = {
  id: "german-prepositions-diagram",
  alt: "A diagram showing German prepositions of location with visual examples: in der Stadt (in the city, with a building), auf dem Spielplatz (on the playground), zu der Eisdiele (to the ice cream shop, with an arrow), an dem Fluss (by the river), mit dem Bus (with a bus icon), nach Deutschland (to Germany, with a map arrow).",
  textFallback:
    "[Diagram: German prepositions — in, auf, zu, an, mit, nach — with visual examples]",
};

// ---------------------------------------------------------------------------
// Lesson 1 – Sehenswürdigkeiten: places of interest in German
// ---------------------------------------------------------------------------

const germanPlaces: Lesson = {
  id: "german-places",
  order: 1,
  title: "Sehenswürdigkeiten: places of interest",
  sourceRef: "Week 1: Introduction to Unit 6 (Stile)",
  aiProvenance: {
    tool: "Claude",
    sources: [
      "Stile: Week 1 — Introduction to Unit 6 — Wir reisen!",
      "Stile: Week 3 — Places of interest, prepositions and transport",
      "Quizlet: Attraktionen / Sehenswürdigkeiten",
    ],
    role: "generated",
  },
  learnCards: [
    {
      id: "places-key-vocab",
      heading: "Key vocabulary: places around town",
      body: [
        t(
          "German nouns for places of interest (Sehenswürdigkeiten) are essential for talking about a city. Like all German nouns, they have a grammatical gender — masculine (der), feminine (die), or neuter (das) — which determines the article and affects how prepositions combine with them.",
        ),
        t(
          "Here are the most important places to know. Pay attention to the gender of each one, because it changes the form of words like 'to the' and 'in the':",
        ),
        t(
          "die Stadt (the city), der Flughafen (the airport), der Bahnhof (the train station), der Busbahnhof (the bus station), das Museum (the museum), die Kathedrale (the cathedral), das Schloss (the castle/palace), die Eisdiele (the ice cream shop), das Kino (the cinema), das Einkaufszentrum (the shopping centre), das Stadion (the stadium), der See (the lake), der Fluss (the river), der Strand (the beach), das Schwimmbad (the swimming pool), der Park (the park), der Botanische Garten (the botanical garden), der Spielplatz (the playground), der Markt (the market), das Rathaus (the town hall), der Zoo (the zoo).",
        ),
        t(
          "Notice how some German nouns are compound words built from smaller words. For example, Flughafen = Flug (flight) + Hafen (harbour), Spielplatz = Spiel (play) + Platz (place), and Einkaufszentrum = Einkauf (shopping) + s + Zentrum (centre). This pattern makes long German words easier to decode.",
        ),
      ],
    },
    {
      id: "places-location",
      heading: "Saying where things are: liegt and befindet sich",
      body: [
        t(
          "To say where a place is located, German uses two main verbs: liegen (to lie, to be located) and sich befinden (to be situated). Both mean essentially the same thing, but befindet sich is slightly more formal.",
        ),
        t(
          "Die Kathedrale liegt in der Stadt. — The cathedral is located in the city.",
        ),
        t(
          "Das Museum befindet sich in der Adelaide Street. — The museum is situated in Adelaide Street.",
        ),
        t("Der See liegt in dem Wald. — The lake is located in the forest."),
        t(
          "Das Stadion liegt in der Müllerstraße. — The stadium is located in Müllerstraße.",
        ),
        t(
          "When using in with these verbs, the preposition takes the dative case because the action is static — the place is already there, not moving. This means der becomes dem and die becomes der. You will see this pattern throughout the unit: in der Stadt, in dem Wald, in der Straße.",
        ),
      ],
    },
    {
      id: "places-gender-patterns",
      heading: "Spotting gender patterns",
      body: [
        t(
          "While German gender must often be memorised, some endings give clues. Nouns ending in -e are very often feminine (die Straße, die Eisdiele, die Kathedrale, die Fähre, die Reise). Nouns ending in -chen or -lein are always neuter (das Mädchen). Nouns ending in -er are often masculine when they describe people or tools (der Lehrer, der Computer), but place names can vary. Nouns ending in -um are usually neuter (das Museum, das Stadion, das Zentrum).",
        ),
        t(
          "Compound nouns always take the gender of the last word. For example, der Bahnhof is masculine because der Hof (yard) is masculine, even though die Bahn (railway) is feminine. Das Einkaufszentrum is neuter because das Zentrum is neuter.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "places-p1",
      type: "mcq",
      prompt: [t("What is the gender of the German word for 'museum'?")],
      explanation: [
        t(
          "Das Museum is neuter. Nouns ending in -um (like Museum, Stadion, Zentrum) are usually neuter. The article is das, and in the dative case after in it becomes dem: in dem Museum.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Neuter (das)")] },
        { id: "b", label: [t("Masculine (der)")] },
        { id: "c", label: [t("Feminine (die)")] },
        { id: "d", label: [t("No gender")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "places-p2",
      type: "fillInTheBlank",
      prompt: [
        t("Complete the sentence: Das Schloss ___ in der Stadt. (is located)"),
      ],
      explanation: [
        t(
          "The correct word is liegt. The sentence Das Schloss liegt in der Stadt means 'The castle is located in the city.' Liegen is the most common verb for saying where something is located. You could also use befindet sich, which is slightly more formal: Das Schloss befindet sich in der Stadt.",
        ),
      ],
      xp: 10,
      template: [t("Das Schloss ___ in der Stadt.")],
      accepted: ["liegt", "befindet sich"],
    },
    {
      id: "places-p3",
      type: "matching",
      prompt: [t("Match each German place with its English meaning.")],
      explanation: [
        t(
          "Building your place vocabulary is the foundation for describing a city. Let's review: der Flughafen = the airport, die Kathedrale = the cathedral, das Einkaufszentrum = the shopping centre, der Bahnhof = the train station, das Rathaus = the town hall, der See = the lake. Notice the compound words: Einkaufszentrum (shopping centre) and Rathaus (town hall) are built from simpler German words.",
        ),
      ],
      xp: 20,
      pairs: [
        {
          id: "1",
          left: [t("der Flughafen")],
          right: [t("the airport")],
        },
        {
          id: "2",
          left: [t("die Kathedrale")],
          right: [t("the cathedral")],
        },
        {
          id: "3",
          left: [t("das Einkaufszentrum")],
          right: [t("the shopping centre")],
        },
        {
          id: "4",
          left: [t("der Bahnhof")],
          right: [t("the train station")],
        },
        {
          id: "5",
          left: [t("das Rathaus")],
          right: [t("the town hall")],
        },
        {
          id: "6",
          left: [t("der See")],
          right: [t("the lake")],
        },
      ],
    },
    {
      id: "places-p4",
      type: "shortText",
      prompt: [
        t(
          "How would you say 'The ice cream shop is located in the city centre' in German? Use liegt.",
        ),
      ],
      explanation: [
        t(
          "Die Eisdiele liegt in dem Stadtzentrum. The key points: Eisdiele is feminine (die), so no article change for the subject. Stadtzentrum is neuter (das Stadtzentrum), and after the preposition in with a static location verb (liegt), we use the dative case: in dem Stadtzentrum. In spoken German, in dem is often contracted to im: Die Eisdiele liegt im Stadtzentrum.",
        ),
      ],
      xp: 15,
      accepted: [
        "die eisdiele liegt in dem stadtzentrum",
        "die eisdiele liegt im stadtzentrum",
        "die eisdiele liegt im zentrum",
        "die eisdiele befindet sich in dem stadtzentrum",
        "die eisdiele befindet sich im stadtzentrum",
      ],
    },
    {
      id: "places-p5",
      type: "mcq",
      prompt: [
        t(
          "In the sentence 'Der Zoo liegt in der Stadt', why is it in der Stadt and not in die Stadt?",
        ),
      ],
      explanation: [
        t(
          "The preposition in takes the dative case (der) when describing a static location — something that is already there, not moving. The dative answers the question 'where?' (wo?). The accusative case (die) would be used for motion toward a destination, answering 'where to?' (wohin?). So: Der Zoo liegt in der Stadt (stationary location — dative), but Ich gehe in die Stadt (movement into the city — accusative).",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t("In takes dative for static location (where something is)"),
          ],
        },
        {
          id: "b",
          label: [
            t("Stadt is always feminine so it uses der after prepositions"),
          ],
        },
        { id: "c", label: [t("In always takes the dative case regardless")] },
        { id: "d", label: [t("It is just an exception to memorise")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "places-p6",
      type: "numeric",
      prompt: [
        t(
          "How many genders does German have for nouns? (Enter a single digit.)",
        ),
      ],
      explanation: [
        t(
          "German has three grammatical genders: masculine (der), feminine (die), and neuter (das). Every noun belongs to one of these three categories. The gender affects the article used with the noun and how prepositions, adjectives, and cases change the form of words in the sentence. This is different from English, which has no grammatical gender for objects.",
        ),
      ],
      xp: 10,
      accepted: ["3", "three"],
    },
    {
      id: "places-p7",
      type: "mcq",
      prompt: [
        t(
          "The German word Flughafen (airport) is a compound of which two words?",
        ),
      ],
      explanation: [
        t(
          "Flughafen combines Flug (flight) and Hafen (harbour). It literally means 'flight harbour'. German frequently builds new words by combining existing ones. The gender of a compound noun always comes from the last element — Hafen is masculine (der Hafen), so Flughafen is also masculine (der Flughafen).",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Flug (flight) + Hafen (harbour)")] },
        { id: "b", label: [t("Flug (flight) + Hof (yard)")] },
        { id: "c", label: [t("Fluss (river) + Hafen (harbour)")] },
        { id: "d", label: [t("Fliegen (to fly) + Hof (yard)")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "places-p8",
      type: "shortText",
      prompt: [t("Translate into German: 'The train station is in the city.'")],
      explanation: [
        t(
          "Der Bahnhof liegt in der Stadt. Bahnhof is masculine (der Bahnhof). For static location with in, we use the dative case: die Stadt becomes der Stadt. Der Bahnhof befindet sich in der Stadt is also correct — befindet sich is a slightly more formal way of saying 'is located'.",
        ),
      ],
      xp: 12,
      accepted: [
        "der bahnhof liegt in der stadt",
        "der bahnhof befindet sich in der stadt",
        "der bahnhof ist in der stadt",
      ],
    },
  ],
  mastery: [
    {
      id: "places-m1",
      type: "fillInTheBlank",
      prompt: [
        t(
          "Complete with the correct article: ___ Flughafen liegt in ___ Stadt. (The airport is located in the city.)",
        ),
      ],
      explanation: [
        t(
          "Der Flughafen liegt in der Stadt. Flughafen is masculine, so the subject takes der. After in with a static location, die Stadt becomes der Stadt (dative). Remember: masculine and neuter dative use dem, feminine dative uses der.",
        ),
      ],
      xp: 15,
      template: [t("___ Flughafen liegt in ___ Stadt.")],
      accepted: ["der|||der"],
    },
    {
      id: "places-m2",
      type: "matching",
      prompt: [
        t("Match each location description to the correct German noun."),
      ],
      explanation: [
        t(
          "A place where you can buy ice cream = die Eisdiele (ice cream shop). A popular place to cool down in summer = das Schwimmbad (swimming pool) or der See (lake). A place to admire art and learn about history = das Museum. A place with lots of shops under one roof = das Einkaufszentrum. Kings live in a = das Schloss. European inland water used for recreation = der See. Mastering these associations helps you describe any city in German.",
        ),
      ],
      xp: 20,
      pairs: [
        {
          id: "1",
          left: [t("A place where you can buy ice cream")],
          right: [t("die Eisdiele")],
        },
        {
          id: "2",
          left: [t("A popular place to cool down in summer")],
          right: [t("das Schwimmbad")],
        },
        {
          id: "3",
          left: [t("A place to admire art and learn about history")],
          right: [t("das Museum")],
        },
        {
          id: "4",
          left: [t("Lots of shops under one roof")],
          right: [t("das Einkaufszentrum")],
        },
        {
          id: "5",
          left: [t("Kings live here")],
          right: [t("das Schloss")],
        },
        {
          id: "6",
          left: [t("European inland water used for recreation")],
          right: [t("der See")],
        },
      ],
    },
    {
      id: "places-m3",
      type: "shortText",
      prompt: [
        t(
          "Write a sentence in German saying that the museum is located in Adelaide Street. Use either liegt or befindet sich.",
        ),
      ],
      explanation: [
        t(
          "Das Museum liegt in der Adelaide Street. Or: Das Museum befindet sich in der Adelaide Street. Museum is neuter (das), so the subject uses das. Straße is feminine (die Straße), so after in for a static location it becomes der Straße (dative). This sentence structure is one you will use throughout the unit to describe any city.",
        ),
      ],
      xp: 15,
      accepted: [
        "das museum liegt in der adelaide street",
        "das museum liegt in der adelaidestraße",
        "das museum befindet sich in der adelaide street",
        "das museum befindet sich in der adelaidestraße",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 2 — Deutschlands Sehenswürdigkeiten: German sights
// ---------------------------------------------------------------------------

const germanSights: Lesson = {
  id: "german-sights",
  order: 2,
  title: "Deutschlands Sehenswürdigkeiten: famous German sights",
  sourceRef: "Week 2: Germany Bucket-list (Stile)",
  aiProvenance: {
    tool: "Claude",
    sources: [
      "Stile: Week 2 L2 — Germany Bucket-list",
      "Stile: Week 3 — Places of interest, prepositions and transport",
    ],
    role: "generated",
  },
  learnCards: [
    {
      id: "sights-intro",
      heading: "Famous German sights and where to find them",
      figure: figGermanyMap,
      body: [
        t(
          "Germany has many world-famous attractions (Sehenswürdigkeiten). Knowing these sights and where they are located gives you the vocabulary to talk about German cities and what tourists can do there.",
        ),
        t(
          "Neuschwanstein Schloss — This fairy-tale castle in Bavaria (Bayern) was built by King Ludwig II in the 19th century. It is one of the most photographed buildings in Germany and inspired the Disney castle. Es liegt in Bayern.",
        ),
        t(
          "Das Brandenburger Tor — The Brandenburg Gate in Berlin is one of Germany's most recognisable landmarks. Built in the 18th century, it was a symbol of division during the Cold War and is now a symbol of unity. Es befindet sich in Berlin.",
        ),
        t(
          "Der Kölner Dom — Cologne Cathedral is a massive Gothic cathedral that took over 600 years to build. Its twin spires dominate the Cologne skyline. Er liegt in Köln, in der Nähe vom Rhein (near the Rhine River).",
        ),
        t(
          "Das Heidelberger Schloss — The Heidelberg Castle ruins overlook the old town (die Altstadt) of Heidelberg. It is one of the most important Renaissance structures north of the Alps. Es befindet sich in der Altstadt von Heidelberg.",
        ),
        t(
          "Die Berliner Mauer — The Berlin Wall divided East and West Berlin from 1961 to 1989. Today, sections remain as a memorial and tourist attraction. Sie liegt in der Bernauer Straße in Berlin.",
        ),
      ],
    },
    {
      id: "sights-man-kann",
      heading: "Man kann: saying what you can do",
      body: [
        t(
          "German uses the impersonal pronoun man (one) to say what people in general can do, similar to English 'one can' or 'you can'. This is a very common structure in travel writing and city descriptions.",
        ),
        t(
          "The structure is: Man kann + (object) + (infinitive verb). The main verb always goes to the end of the clause.",
        ),
        t("Man kann das Schloss besuchen. — One can visit the castle."),
        t("Man kann den Dom sehen. — One can see the cathedral."),
        t(
          "Man kann in dem Park spazieren gehen. — One can go for a walk in the park.",
        ),
        t(
          "Man kann im Restaurant Eis essen. — One can eat ice cream in the restaurant.",
        ),
        t(
          "The second verb always goes at the end. This is a key rule of German word order: in sentences with a modal verb (like können) or man kann, the main verb is pushed to the final position.",
        ),
      ],
    },
    {
      id: "sights-wo-liegt",
      heading: "Asking and answering where things are",
      body: [
        t(
          "To ask where something is located, use: Wo liegt ...? or Wo befindet sich ...?",
        ),
        t("Wo liegt Neuschwanstein? — Where is Neuschwanstein located?"),
        t("Neuschwanstein liegt in Bayern. — Neuschwanstein is in Bavaria."),
        t(
          "Wo befindet sich das Brandenburger Tor? — Where is the Brandenburg Gate situated?",
        ),
        t(
          "Das Brandenburger Tor befindet sich in Berlin. — The Brandenburg Gate is situated in Berlin.",
        ),
        t(
          "Remember that city and country names usually do not take an article in German: in Berlin, in Deutschland, in Bayern. But when a country has an article (like die Schweiz — Switzerland), the article must be included: in der Schweiz.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "sights-p1",
      type: "mcq",
      prompt: [
        t(
          "In which German state (Bundesland) is Neuschwanstein Castle located?",
        ),
      ],
      explanation: [
        t(
          "Neuschwanstein liegt in Bayern (Bavaria). It was built by King Ludwig II of Bavaria in the 19th century. Bavaria is in southern Germany and is known for its Alps, castles, and distinct cultural traditions like Oktoberfest.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Bayern (Bavaria)")] },
        { id: "b", label: [t("Berlin")] },
        { id: "c", label: [t("Hamburg")] },
        { id: "d", label: [t("Sachsen (Saxony)")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "sights-p2",
      type: "fillInTheBlank",
      prompt: [t("Complete: Man kann das Schloss ___ . (visit)")],
      explanation: [
        t(
          "Man kann das Schloss besuchen. Besuchen means 'to visit'. In a man kann sentence, the second verb always goes to the end. This is because können is a modal verb, and in German modal constructions, the main infinitive is placed at the end of the clause.",
        ),
      ],
      xp: 10,
      template: [t("Man kann das Schloss ___.")],
      accepted: ["besuchen", "besichtigen"],
    },
    {
      id: "sights-p3",
      type: "shortText",
      prompt: [
        t(
          "How do you ask 'Where is the Cologne Cathedral located?' in German?",
        ),
      ],
      explanation: [
        t(
          "Wo liegt der Kölner Dom? or Wo befindet sich der Kölner Dom? Both are correct and common. Wo is the question word for 'where' when asking about location (as opposed to wohin — 'where to'). Kölner Dom is masculine (der Dom), so the article is der.",
        ),
      ],
      xp: 12,
      accepted: [
        "wo liegt der kolner dom",
        "wo liegt der kölner dom",
        "wo befindet sich der kolner dom",
        "wo befindet sich der kölner dom",
      ],
    },
    {
      id: "sights-p4",
      type: "mcq",
      prompt: [
        t(
          "In the sentence 'Man kann den Dom sehen', why is it den Dom and not der Dom?",
        ),
      ],
      explanation: [
        t(
          "Den Dom is in the accusative case because Dom is the direct object of sehen (to see). Masculine nouns change from der to den in the accusative. So: Der Dom ist groß (nominative — subject), but Man kann den Dom sehen (accusative — direct object). Feminine and neuter articles do not change in the accusative: Man kann die Kathedrale sehen, Man kann das Schloss sehen.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [t("It is the accusative case — direct object of sehen")],
        },
        { id: "b", label: [t("All objects after man kann take den")] },
        { id: "c", label: [t("Dom is irregular in the accusative")] },
        { id: "d", label: [t("It is a mistake; it should be der Dom")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "sights-p5",
      type: "matching",
      prompt: [t("Match each German sight to the city where it is found.")],
      explanation: [
        t(
          "Das Brandenburger Tor is in Berlin — it's the iconic neoclassical gate that symbolised division and later reunification. Der Kölner Dom is in Köln (Cologne) — the massive Gothic cathedral on the Rhine. Das Heidelberger Schloss is in Heidelberg — the famous Renaissance castle ruins overlooking the Neckar River. Die Frauenkirche is in Dresden — the Baroque church rebuilt after WWII destruction. The Reeperbahn is in Hamburg — the famous entertainment district.",
        ),
      ],
      xp: 20,
      pairs: [
        {
          id: "1",
          left: [t("Das Brandenburger Tor")],
          right: [t("Berlin")],
        },
        {
          id: "2",
          left: [t("Der Kölner Dom")],
          right: [t("Köln")],
        },
        {
          id: "3",
          left: [t("Das Heidelberger Schloss")],
          right: [t("Heidelberg")],
        },
        {
          id: "4",
          left: [t("Die Frauenkirche")],
          right: [t("Dresden")],
        },
        {
          id: "5",
          left: [t("Die Reeperbahn")],
          right: [t("Hamburg")],
        },
      ],
    },
    {
      id: "sights-p6",
      type: "shortText",
      prompt: [
        t("Translate into German: 'One can go for a walk in the park.'"),
      ],
      explanation: [
        t(
          "Man kann in dem Park spazieren gehen. Or with contraction: Man kann im Park spazieren gehen. Spazieren gehen means 'to go for a walk'. It is a separable verb phrase: spazieren (to stroll) + gehen (to go). In the man kann construction, both parts go to the end, with gehen last. In dem contracts to im in everyday German.",
        ),
      ],
      xp: 12,
      accepted: [
        "man kann in dem park spazieren gehen",
        "man kann im park spazieren gehen",
      ],
    },
    {
      id: "sights-p7",
      type: "mcq",
      prompt: [
        t(
          "The Berlin Wall Memorial (Gedenkstätte Berliner Mauer) is located on which street?",
        ),
      ],
      explanation: [
        t(
          "Die Berliner Mauer liegt in der Bernauer Straße. The Bernauer Straße section is the most complete remaining stretch of the Berlin Wall and is now a memorial site. The wall divided the street itself — the pavement on one side was in West Berlin while the buildings on the other side were in East Berlin.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Bernauer Straße")] },
        { id: "b", label: [t("Unter den Linden")] },
        { id: "c", label: [t("Kurfürstendamm")] },
        { id: "d", label: [t("Friedrichstraße")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "sights-p8",
      type: "fillInTheBlank",
      prompt: [t("Complete: Man ___ das Museum besuchen. (can)")],
      explanation: [
        t(
          "Man kann das Museum besuchen. Kann is the third-person singular form of können (to be able to / can). The pronoun man always takes the third-person singular verb form, the same as er/sie/es: man kann, man geht, man sieht. This is a fixed pattern — man never takes a plural verb.",
        ),
      ],
      xp: 10,
      template: [t("Man ___ das Museum besuchen.")],
      accepted: ["kann"],
    },
  ],
  mastery: [
    {
      id: "sights-m1",
      type: "shortText",
      prompt: [
        t(
          "Write a sentence in German saying that one can see the Brandenburg Gate in Berlin. Use man kann.",
        ),
      ],
      explanation: [
        t(
          "Man kann das Brandenburger Tor in Berlin sehen. The structure: Man kann + object (accusative) + place + main verb (at the end). Brandenburger Tor is neuter (das), so the accusative article is also das. Berlin as a city name takes no article. You could also say Man kann das Brandenburger Tor in Berlin besichtigen (visit/view) or besuchen (visit).",
        ),
      ],
      xp: 15,
      accepted: [
        "man kann das brandenburger tor in berlin sehen",
        "man kann das brandenburger tor in berlin besichtigen",
        "man kann in berlin das brandenburger tor sehen",
      ],
    },
    {
      id: "sights-m2",
      type: "matching",
      prompt: [t("Match each sight with its German location description.")],
      explanation: [
        t(
          "Neuschwanstein liegt in Bayern — the fairy-tale castle in the Bavarian Alps. Der Kölner Dom liegt in Köln, in der Nähe vom Rhein — the cathedral near the Rhine. Das Brandenburger Tor befindet sich in Berlin — the famous gate in the capital. Das Heidelberger Schloss befindet sich in der Altstadt — the castle ruins in Heidelberg's old town. Die Berliner Mauer liegt in der Bernauer Straße — the Wall memorial on Bernauer Street.",
        ),
      ],
      xp: 20,
      pairs: [
        {
          id: "1",
          left: [t("Neuschwanstein")],
          right: [t("liegt in Bayern")],
        },
        {
          id: "2",
          left: [t("Der Kölner Dom")],
          right: [t("liegt in Köln, in der Nähe vom Rhein")],
        },
        {
          id: "3",
          left: [t("Das Brandenburger Tor")],
          right: [t("befindet sich in Berlin")],
        },
        {
          id: "4",
          left: [t("Das Heidelberger Schloss")],
          right: [t("befindet sich in der Altstadt")],
        },
        {
          id: "5",
          left: [t("Die Berliner Mauer")],
          right: [t("liegt in der Bernauer Straße")],
        },
      ],
    },
    {
      id: "sights-m3",
      type: "shortText",
      prompt: [
        t(
          "Explain in your own words why the word order in 'Man kann im Park spazieren gehen' has spazieren gehen at the end.",
        ),
      ],
      explanation: [
        t(
          "In German, modal verbs like können (can) push the main verb to the end of the clause. When the main action is a two-part expression like spazieren gehen, both parts go to the end, with the core verb (gehen) last. This is called the 'modal verb bracket' — the modal verb (kann) and the main verb (gehen) form a frame around the rest of the sentence. This rule applies to all modal verbs: müssen (must), wollen (want to), dürfen (may), sollen (should), and mögen (like to).",
        ),
      ],
      xp: 15,
      accepted: [
        "modal verb",
        "modal verbs push the main verb to the end",
        "the second verb goes to the end",
        "können sends the infinitive to the end",
        "german word order puts the main verb at the end",
        "because of the modal verb rule",
        "because german word order requires the infinitive at the end after a modal verb",
        "the verb goes to the end when there is a modal verb",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 3 — Prepositions and transport: getting around
// ---------------------------------------------------------------------------

const germanPrepositions: Lesson = {
  id: "german-prepositions",
  order: 3,
  title: "Prepositions and transport: getting around",
  sourceRef: "Week 3: Places of interest, prepositions and transport (Stile)",
  aiProvenance: {
    tool: "Claude",
    sources: [
      "Stile: Week 3 — Places of interest, prepositions and transport",
      "Stile: Week 5 — Was kann man in Brisbane machen",
      "Quizlet: Modes of transport (Verkehrsmittel)",
    ],
    role: "generated",
  },
  learnCards: [
    {
      id: "prep-transport-vocab",
      heading: "Transport vocabulary: Verkehrsmittel",
      figure: figTransportModes,
      body: [
        t(
          "Getting around a German-speaking city requires transport vocabulary (Verkehrsmittel). Here are the most common modes of transport with their genders:",
        ),
        t(
          "der Bus (the bus), die Straßenbahn (the tram), die Fähre (the ferry), das Fahrrad / das Rad (the bicycle), das Flugzeug (the aeroplane), das Auto (the car), der Zug (the train), die U-Bahn (the underground/subway), die S-Bahn (the suburban train), zu Fuß (on foot — note: this is a phrase, not a noun).",
        ),
        t(
          "When saying 'by' a mode of transport, German uses mit (with) + the dative case: mit dem Bus (by bus), mit der Straßenbahn (by tram), mit dem Fahrrad (by bicycle), mit dem Flugzeug (by plane). For 'on foot', use zu Fuß (no article).",
        ),
        t(
          "To say how long a journey takes: Es dauert (time) mit (transport). For example: Es dauert 20 Minuten mit dem Bus. — It takes 20 minutes by bus. Es dauert 10 Minuten zu Fuß. — It takes 10 minutes on foot.",
        ),
      ],
    },
    {
      id: "prep-key-prepositions",
      heading: "Key prepositions for travel and location",
      figure: figPrepositionsDiagram,
      body: [
        t(
          "German prepositions govern specific cases. The most important ones for describing travel and location are:",
        ),
        t(
          "in — in, at (dative for location, accusative for destination): in der Stadt (in the city — static), in die Stadt gehen (go into the city — movement).",
        ),
        t(
          "zu — to (always dative): zu der Eisdiele → zur Eisdiele (to the ice cream shop), zu dem Bahnhof → zum Bahnhof (to the train station). Note the common contractions: zu + der = zur, zu + dem = zum.",
        ),
        t(
          "nach — to (used with cities and countries without articles): nach Berlin, nach Deutschland, nach Australien. But: in die Schweiz (to Switzerland, because die Schweiz has an article).",
        ),
        t(
          "mit — by, with (always dative): mit dem Bus, mit der Fähre, mit dem Fahrrad.",
        ),
        t(
          "an — on, at, by (dative for location): an dem Fluss → am Fluss (by the river). The contraction an + dem = am is extremely common.",
        ),
        t(
          "auf — on (dative for location): auf dem Spielplatz (on the playground), auf der Straße (on the street).",
        ),
        t(
          "von ... bis zu — from ... to: von dem Bahnhof bis zu dem Einkaufszentrum (from the train station to the shopping centre).",
        ),
      ],
    },
    {
      id: "prep-dative-accusative",
      heading: "Dative vs accusative: the two-way preposition rule",
      body: [
        t(
          "Some German prepositions (in, an, auf, and others) are called 'two-way prepositions' (Wechselpräpositionen) because they can take either the dative or accusative case. The rule is simple:",
        ),
        t(
          "Dative = location (where? / wo?). Answers 'where is it?' — static position. Example: Das Buch liegt auf dem Tisch. (The book is lying on the table — it is already there.)",
        ),
        t(
          "Accusative = destination (where to? / wohin?). Answers 'where to is it going?' — movement toward. Example: Ich lege das Buch auf den Tisch. (I put the book onto the table — it is moving there.)",
        ),
        t(
          "This distinction applies to all two-way prepositions: in, an, auf, über, unter, vor, hinter, neben, zwischen. For travel descriptions, you will mostly use the dative because you are describing where things are located.",
        ),
        t(
          "In summary: masculine dative = dem, masculine accusative = den. Feminine dative = der, feminine accusative = die. Neuter dative = dem, neuter accusative = das.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "prep-p1",
      type: "matching",
      prompt: [t("Match each transport mode with its German name.")],
      explanation: [
        t(
          "der Bus = the bus (masculine), die Straßenbahn = the tram (feminine — note the -en ending is unusual for feminine), die Fähre = the ferry (feminine — -e ending), das Fahrrad = the bicycle (neuter — compound of fahren + Rad), das Flugzeug = the aeroplane (neuter — compound of Flug + Zeug), zu Fuß = on foot (phrase, not a noun — uses zu, not mit).",
        ),
      ],
      xp: 20,
      pairs: [
        { id: "1", left: [t("der Bus")], right: [t("the bus")] },
        { id: "2", left: [t("die Straßenbahn")], right: [t("the tram")] },
        { id: "3", left: [t("die Fähre")], right: [t("the ferry")] },
        { id: "4", left: [t("das Fahrrad")], right: [t("the bicycle")] },
        { id: "5", left: [t("das Flugzeug")], right: [t("the aeroplane")] },
        { id: "6", left: [t("zu Fuß")], right: [t("on foot")] },
      ],
    },
    {
      id: "prep-p2",
      type: "fillInTheBlank",
      prompt: [t("Complete: Ich fahre ___ dem Bus nach Brisbane. (with / by)")],
      explanation: [
        t(
          "Ich fahre mit dem Bus nach Brisbane. Mit always takes the dative case: mit dem Bus (masculine), mit der Straßenbahn (feminine), mit dem Fahrrad (neuter). Nach is used for cities and countries without articles. The verb fahren (to travel / to go by vehicle) is commonly used with transport.",
        ),
      ],
      xp: 10,
      template: [t("Ich fahre ___ dem Bus nach Brisbane.")],
      accepted: ["mit"],
    },
    {
      id: "prep-p3",
      type: "mcq",
      prompt: [t("Which preposition would you use for 'to Germany'?")],
      explanation: [
        t(
          "Nach Deutschland. Nach is used with countries and cities that have no article (neuter countries and most cities): nach Australien, nach Österreich, nach Berlin, nach München. But countries with articles use in + accusative: in die Schweiz (to Switzerland), in die USA (to the USA), in den Iran (to Iran).",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("nach")] },
        { id: "b", label: [t("zu")] },
        { id: "c", label: [t("in")] },
        { id: "d", label: [t("auf")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "prep-p4",
      type: "shortText",
      prompt: [t("Translate into German: 'It takes 20 minutes by bus.'")],
      explanation: [
        t(
          "Es dauert 20 Minuten mit dem Bus. The structure: Es dauert + time + mit + dative transport. You could also omit mit dem Bus if the context is clear: Es dauert 20 Minuten. Minuten is plural and takes no article after numbers in this construction. If specifying an exact number plus a half, use: Es dauert eineinhalb Stunden or Es dauert 90 Minuten.",
        ),
      ],
      xp: 12,
      accepted: [
        "es dauert 20 minuten mit dem bus",
        "es dauert zwanzig minuten mit dem bus",
      ],
    },
    {
      id: "prep-p5",
      type: "mcq",
      prompt: [
        t(
          "Why do we say 'zu der Eisdiele' (often contracted to 'zur Eisdiele') but 'nach Australien'?",
        ),
      ],
      explanation: [
        t(
          "Zu is used for specific places, buildings, and people: zu der Eisdiele (to the ice cream shop), zu dem Bahnhof (to the train station), zu meiner Mutter (to my mother). Nach is reserved for cities and countries without an article: nach Berlin, nach Deutschland. The rule is: nach + geographical name without article; zu + everything else.",
        ),
      ],
      xp: 15,
      options: [
        {
          id: "a",
          label: [
            t(
              "Zu is for specific places; nach is for cities and countries without articles",
            ),
          ],
        },
        { id: "b", label: [t("They are interchangeable; both are correct")] },
        { id: "c", label: [t("Zu is formal; nach is informal")] },
        { id: "d", label: [t("Zu is only used with people, not places")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "prep-p6",
      type: "fillInTheBlank",
      prompt: [t("Complete: Der See liegt ___ dem Wald. (in)")],
      explanation: [
        t(
          "Der See liegt in dem Wald. In with a static location takes the dative: der Wald → dem Wald (masculine dative). The contraction im (in + dem) is more common in spoken German: Der See liegt im Wald. This pattern applies to all two-way prepositions describing static location: use dative.",
        ),
      ],
      xp: 10,
      template: [t("Der See liegt ___ dem Wald.")],
      accepted: ["in"],
    },
    {
      id: "prep-p7",
      type: "matching",
      prompt: [
        t("Match each German preposition phrase with its English meaning."),
      ],
      explanation: [
        t(
          "zu der Eisdiele (zur Eisdiele) = to the ice cream shop. an dem Fluss (am Fluss) = by/on the river. mit der Fähre = by ferry. von dem Bahnhof bis zu dem Einkaufszentrum = from the train station to the shopping centre. auf dem Spielplatz = on the playground. nach Österreich = to Austria. Notice the common contractions: zur = zu der, zum = zu dem, am = an dem. These contractions are standard in both spoken and written German.",
        ),
      ],
      xp: 20,
      pairs: [
        {
          id: "1",
          left: [t("zu der Eisdiele (zur Eisdiele)")],
          right: [t("to the ice cream shop")],
        },
        {
          id: "2",
          left: [t("an dem Fluss (am Fluss)")],
          right: [t("by the river")],
        },
        {
          id: "3",
          left: [t("mit der Fähre")],
          right: [t("by ferry")],
        },
        {
          id: "4",
          left: [t("von dem Bahnhof bis zu dem Einkaufszentrum")],
          right: [t("from the train station to the shopping centre")],
        },
        {
          id: "5",
          left: [t("auf dem Spielplatz")],
          right: [t("on the playground")],
        },
        {
          id: "6",
          left: [t("nach Österreich")],
          right: [t("to Austria")],
        },
      ],
    },
    {
      id: "prep-p8",
      type: "shortText",
      prompt: [
        t(
          "How would you say 'How long does the trip from the airport to the city centre take?' in German? Use dauern.",
        ),
      ],
      explanation: [
        t(
          "Wie lange dauert die Reise von dem Flughafen bis zum Stadtzentrum? The question word wie lange (how long) starts the question. Dauert is the third-person singular of dauern. Von ... bis zu(m/r) means 'from ... to'. Flughafen is masculine (der), so von dem Flughafen. Stadtzentrum is neuter (das), so bis zu dem → bis zum Stadtzentrum.",
        ),
      ],
      xp: 15,
      accepted: [
        "wie lange dauert die reise von dem flughafen bis zum stadtzentrum",
        "wie lange dauert die reise vom flughafen bis zum stadtzentrum",
        "wie lange dauert die fahrt von dem flughafen bis zum stadtzentrum",
      ],
    },
  ],
  mastery: [
    {
      id: "prep-m1",
      type: "shortText",
      prompt: [
        t(
          "Write a complete sentence in German: 'One can travel by ferry on the river.' Use man kann, mit der Fähre, and auf dem Fluss.",
        ),
      ],
      explanation: [
        t(
          "Man kann mit der Fähre auf dem Fluss fahren. The word order: man kann + mit der Fähre (transport with preposition) + auf dem Fluss (location with preposition) + fahren (main verb at end). You could also say Man kann auf dem Fluss mit der Fähre fahren — the prepositional phrases can be reordered, but the main verb must stay at the end. Fahren is the verb for travelling by vehicle or on water.",
        ),
      ],
      xp: 15,
      accepted: [
        "man kann mit der fahre auf dem fluss fahren",
        "man kann mit der fähre auf dem fluss fahren",
        "man kann auf dem fluss mit der fahre fahren",
        "man kann auf dem fluss mit der fähre fahren",
      ],
    },
    {
      id: "prep-m2",
      type: "mcq",
      prompt: [
        t(
          "In the sentence 'Ich gehe in die Stadt', why is it die Stadt and not der Stadt?",
        ),
      ],
      explanation: [
        t(
          "It is die Stadt because in here indicates movement toward a destination (wohin? — where to?), so it takes the accusative case. Die Stadt is feminine, and the feminine article does not change in the accusative: nominative die, accusative die. Contrast with stationary location: Ich bin in der Stadt (wo? — where?), which takes dative: der Stadt. The in + accusative vs dative rule only changes the article for masculine nouns: in den Park (accusative, movement) vs in dem Park / im Park (dative, stationary).",
        ),
      ],
      xp: 18,
      options: [
        {
          id: "a",
          label: [
            t(
              "It is accusative because gehen expresses movement toward a destination",
            ),
          ],
        },
        { id: "b", label: [t("Stadt is always die after any preposition")] },
        {
          id: "c",
          label: [t("In always takes accusative with feminine nouns")],
        },
        {
          id: "d",
          label: [t("It is a fixed expression with no grammatical rule")],
        },
      ],
      correctOptionId: "a",
    },
    {
      id: "prep-m3",
      type: "fillInTheBlank",
      prompt: [
        t(
          "Complete with the correct contracted form: Ich fahre ___ Bahnhof. (to the train station)",
        ),
      ],
      explanation: [
        t(
          "Ich fahre zum Bahnhof. Zum is the contraction of zu + dem. Since Bahnhof is masculine (der Bahnhof), the dative article after zu is dem: zu dem → zum. For feminine nouns: zu der → zur Eisdiele. For neuter: zu dem → zum Museum. The contractions zum and zur are standard and expected in both spoken and written German — using the uncontracted forms is grammatically correct but sounds stilted.",
        ),
      ],
      xp: 12,
      template: [t("Ich fahre ___ Bahnhof.")],
      accepted: ["zum", "zu dem"],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 4 — Ingrids Geschichte: reading a German story
// ---------------------------------------------------------------------------

const germanStory: Lesson = {
  id: "german-story",
  order: 4,
  title: "Ingrids Geschichte: reading a German story",
  sourceRef: "Week 4 L1 + L2: Ingrid will einen Drachen (Stile)",
  aiProvenance: {
    tool: "Claude",
    sources: [
      "Stile: Week 4 L1 — Ingrid will einen Drachen — The story!",
      "Stile: Week 4 L2 — Ingrid will einen Drachen — story retell",
      "Quizlet: Unit 6 nouns and phrases for the Ingrid story",
      "Quizlet: Unit 6 verbs",
    ],
    role: "generated",
  },
  learnCards: [
    {
      id: "story-intro",
      heading: "The story of Ingrid: a reading adventure",
      body: [
        t(
          "Reading short stories in German helps you see vocabulary and grammar working together in real sentences. The bilingual story Ingrid fliegt mit dem Flugzeug (Ingrid flies with the aeroplane) follows a girl named Ingrid as she travels through Germany and beyond, searching for a dragon.",
        ),
        t(
          "Here is a short retelling of the story. Read it carefully and try to understand the German before looking at the English:",
        ),
        t(
          "In ihrer Freizeit will Ingrid einen Drachen fliegen. Sie geht zum Flughafen und fliegt mit dem Flugzeug nach Frankfurt. Der Flug dauert sehr lange — Frankfurt ist 16 000 Kilometer von Australien entfernt.",
        ),
        t(
          "In English: In her free time, Ingrid wants to fly a dragon. She goes to the airport and flies by plane to Frankfurt. The flight takes a very long time — Frankfurt is 16,000 kilometres from Australia.",
        ),
        t(
          "In Frankfurt gibt es drei Männer, aber keinen Drachen. Ingrid ist enttäuscht. Eine Frau sagt ihr, dass es einen Drachen in München gibt. Ingrid fliegt nach München, aber im Zoo gibt es keinen echten Drachen. Sie fliegt weiter nach Barcelona. Dort sieht sie eine Kämpferin und ein Spiel, das sie mag. Am Ende geht Ingrid in ihrer Freizeit einfach zum Rugby-Spiel. Sie ist glücklich.",
        ),
        t(
          "In Frankfurt there are three men, but no dragon. Ingrid is disappointed. A woman tells her there is a dragon in Munich. Ingrid flies to Munich, but at the zoo there is no real dragon. She flies on to Barcelona. There she sees a fighter and a game that she likes. In the end, Ingrid just goes to the rugby game in her free time. She is happy.",
        ),
      ],
    },
    {
      id: "story-key-verbs",
      heading: "Key verbs from the story",
      body: [
        t(
          "The story uses many important German verbs, especially verbs of movement. Here are the most important ones, listed as infinitive → third-person singular (er/sie/es form):",
        ),
        t(
          "fliegen → fliegt (to fly), gehen → geht (to go), fahren → fährt (to travel / to go by vehicle), sehen → sieht (to see), sagen → sagt (to say), kommen → kommt (to come), geben → es gibt (there is/are), wollen → will (to want), haben → hat (to have), sein → ist (to be).",
        ),
        t(
          "Notice that some of these verbs change their stem vowel in the third-person singular: fliegen → fliegt (ie stays), fahren → fährt (a → ä), sehen → sieht (e → ie), wollen → will (o → i). These vowel changes are a feature of German strong verbs and must be memorised.",
        ),
        t(
          "Es gibt is a very useful fixed expression meaning 'there is' or 'there are'. It does not change for singular or plural: Es gibt einen Drachen (There is a dragon — singular), Es gibt drei Männer (There are three men — plural). The noun after es gibt is in the accusative case.",
        ),
      ],
    },
    {
      id: "story-comprehension-tips",
      heading: "Strategies for reading German",
      body: [
        t(
          "When reading German, you do not need to understand every word to follow the story. Use these strategies:",
        ),
        t(
          "1. Look for cognates — words that look similar to English: Flughafen (airport — flight harbour), Museum (museum), Zoo (zoo), Rugby (rugby), interessant (interesting), Kilometer (kilometre).",
        ),
        t(
          "2. Identify the verb and its position. In main clauses, the conjugated verb is always the second element. In the sentence 'Ingrid fliegt mit dem Flugzeug nach Frankfurt', fliegt is the second element after the subject Ingrid.",
        ),
        t(
          "3. Watch for time and place phrases: in ihrer Freizeit (in her free time), zum Flughafen (to the airport), in Frankfurt (in Frankfurt), am Ende (at the end). These give you the setting even if you miss some words.",
        ),
        t(
          "4. Use the bilingual approach: read the German paragraph first and try to grasp the main idea, then check the English. Over time, try to rely less on the translation.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "story-p1",
      type: "mcq",
      prompt: [t("What does Ingrid want to do in her free time?")],
      explanation: [
        t(
          "In ihrer Freizeit will Ingrid einen Drachen fliegen. Will means 'wants to' (from wollen). Einen Drachen is 'a dragon' in the accusative case (der Drache → einen Drachen). Fliegen means 'to fly'. The whole sentence means: Ingrid wants to fly a dragon in her free time. After the modal verb will, the main verb fliegen goes to the end.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Fly a dragon")] },
        { id: "b", label: [t("Visit a museum")] },
        { id: "c", label: [t("Go to the zoo")] },
        { id: "d", label: [t("Travel by bus")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "story-p2",
      type: "fillInTheBlank",
      prompt: [
        t(
          "Complete: Frankfurt ist 16 000 Kilometer von Australien ___. (is distant / away)",
        ),
      ],
      explanation: [
        t(
          "Frankfurt ist 16 000 Kilometer von Australien entfernt. Entfernt means 'distant' or 'away'. The construction is: (place A) ist (distance) von (place B) entfernt. This is a very useful structure for describing how far apart two places are.",
        ),
      ],
      xp: 10,
      template: [t("Frankfurt ist 16 000 Kilometer von Australien ___.")],
      accepted: ["entfernt"],
    },
    {
      id: "story-p3",
      type: "shortText",
      prompt: [
        t(
          "Translate into English: 'In Frankfurt gibt es drei Männer, aber keinen Drachen.'",
        ),
      ],
      explanation: [
        t(
          "'In Frankfurt there are three men, but no dragon.' Es gibt means 'there is/are'. Drei Männer is 'three men' in the accusative. Aber means 'but'. Keinen Drachen is the accusative of kein Drache (no dragon) — the negative kein takes the same endings as ein: kein Drache → keinen Drachen. The sentence sets up the story's comic disappointment: Ingrid expects a dragon but finds only ordinary men.",
        ),
      ],
      xp: 12,
      accepted: [
        "in frankfurt there are three men but no dragon",
        "there are three men in frankfurt but no dragon",
        "in frankfurt there are three men, but no dragon",
      ],
    },
    {
      id: "story-p4",
      type: "mcq",
      prompt: [
        t(
          "In the sentence 'Sie fliegt nach München', what does nach indicate?",
        ),
      ],
      explanation: [
        t(
          "Nach München means 'to Munich'. Nach is used with cities and most countries without an article. It indicates direction toward a geographical destination. Other examples: nach Berlin, nach Deutschland, nach Hause (home — note the -e ending on Haus). Nach can also mean 'after': nach der Schule (after school — here it takes dative).",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Direction toward a city (to)")] },
        { id: "b", label: [t("After")] },
        { id: "c", label: [t("Near")] },
        { id: "d", label: [t("By means of")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "story-p5",
      type: "matching",
      prompt: [
        t("Match each German verb from the story with its English meaning."),
      ],
      explanation: [
        t(
          "fliegen = to fly (strong verb: fliegt, flog, ist geflogen). wollen = to want (modal verb: will, wollte, hat gewollt). gehen = to go (strong verb: geht, ging, ist gegangen). sehen = to see (strong verb: sieht, sah, hat gesehen). kommen = to come (strong verb: kommt, kam, ist gekommen). sagen = to say (weak verb: sagt, sagte, hat gesagt). Knowing these verb meanings helps you decode any simple German narrative.",
        ),
      ],
      xp: 20,
      pairs: [
        { id: "1", left: [t("fliegen")], right: [t("to fly")] },
        { id: "2", left: [t("wollen")], right: [t("to want")] },
        { id: "3", left: [t("gehen")], right: [t("to go")] },
        { id: "4", left: [t("sehen")], right: [t("to see")] },
        { id: "5", left: [t("kommen")], right: [t("to come")] },
        { id: "6", left: [t("sagen")], right: [t("to say")] },
      ],
    },
    {
      id: "story-p6",
      type: "shortText",
      prompt: [t("Translate into German: 'She goes to the airport.'")],
      explanation: [
        t(
          "Sie geht zum Flughafen. Zum is zu + dem (to the). Flughafen is masculine (der Flughafen), so the dative after zu is dem, and the contraction zum is standard. The verb gehen (to go) is used for going on foot or generally going somewhere.",
        ),
      ],
      xp: 12,
      accepted: ["sie geht zum flughafen", "sie geht zu dem flughafen"],
    },
    {
      id: "story-p7",
      type: "mcq",
      prompt: [t("At the end of the story, what makes Ingrid happy?")],
      explanation: [
        t(
          "Am Ende geht Ingrid in ihrer Freizeit zum Rugby-Spiel und sie ist glücklich. After travelling to Frankfurt, Munich, and Barcelona searching for a real dragon, Ingrid discovers that she is happy just going to the rugby game. The story has a gentle message about finding joy in ordinary activities rather than chasing fantastical adventures. Das Rugby-Spiel means 'the rugby game'.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Going to the rugby game")] },
        { id: "b", label: [t("Finding a real dragon")] },
        { id: "c", label: [t("Flying back to Australia")] },
        { id: "d", label: [t("Visiting the zoo")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "story-p8",
      type: "fillInTheBlank",
      prompt: [t("Complete: ___ gibt keinen echten Drachen im Zoo. (there)")],
      explanation: [
        t(
          "Es gibt keinen echten Drachen im Zoo. Es gibt is the fixed expression for 'there is/are'. Keinen echten Drachen is the accusative form — keinen is the masculine accusative of kein (no/not a), and echten (real) takes the -en adjective ending in the accusative masculine. The sentence means: There is no real dragon in the zoo.",
        ),
      ],
      xp: 10,
      template: [t("___ gibt keinen echten Drachen im Zoo.")],
      accepted: ["es"],
    },
  ],
  mastery: [
    {
      id: "story-m1",
      type: "shortText",
      prompt: [
        t(
          "Summarise in 2–3 German sentences where Ingrid travels and what happens. Use at least two different verbs of movement.",
        ),
      ],
      explanation: [
        t(
          "A good answer: Ingrid fliegt nach Frankfurt, nach München und nach Barcelona. Sie sucht einen Drachen, aber es gibt keinen echten Drachen. Am Ende geht sie zum Rugby-Spiel und ist glücklich. Key verbs: fliegt (flies), sucht (searches for), geht (goes), ist (is). The structure es gibt is used for 'there is'. Notice that city names after nach take no article.",
        ),
      ],
      xp: 18,
      accepted: [
        "ingrid fliegt",
        "sie fliegt",
        "ingrid geht",
        "sie geht",
        "ingrid sucht",
        "sie sucht",
        "ingrid ist",
        "sie ist",
      ],
    },
    {
      id: "story-m2",
      type: "matching",
      prompt: [
        t(
          "Match each German sentence from the story to its English translation.",
        ),
      ],
      explanation: [
        t(
          "In ihrer Freizeit will Ingrid einen Drachen fliegen = In her free time Ingrid wants to fly a dragon. Sie geht zum Flughafen = She goes to the airport. Der Flug dauert sehr lange = The flight takes a very long time. Eine Frau sagt, es gibt einen Drachen in München = A woman says there is a dragon in Munich. Am Ende ist sie glücklich = In the end she is happy. These sentences show key structures: modal verb pushing infinitive to end, zu + dem contraction, es gibt for 'there is', and time phrases at the start.",
        ),
      ],
      xp: 20,
      pairs: [
        {
          id: "1",
          left: [t("In ihrer Freizeit will Ingrid einen Drachen fliegen.")],
          right: [t("In her free time Ingrid wants to fly a dragon.")],
        },
        {
          id: "2",
          left: [t("Sie geht zum Flughafen.")],
          right: [t("She goes to the airport.")],
        },
        {
          id: "3",
          left: [t("Der Flug dauert sehr lange.")],
          right: [t("The flight takes a very long time.")],
        },
        {
          id: "4",
          left: [t("Eine Frau sagt, es gibt einen Drachen in München.")],
          right: [t("A woman says there is a dragon in Munich.")],
        },
        {
          id: "5",
          left: [t("Am Ende ist sie glücklich.")],
          right: [t("In the end she is happy.")],
        },
      ],
    },
    {
      id: "story-m3",
      type: "shortText",
      prompt: [t("Translate into German: 'She flies by plane to Barcelona.'")],
      explanation: [
        t(
          "Sie fliegt mit dem Flugzeug nach Barcelona. Mit dem Flugzeug means 'by plane' (literally 'with the aeroplane'). Nach Barcelona uses nach because Barcelona is a city without an article. The verb fliegen conjugates to fliegt for er/sie/es. Alternative: Sie fliegt nach Barcelona — omitting mit dem Flugzeug is fine if the mode of transport is implied by the verb fliegen itself.",
        ),
      ],
      xp: 12,
      accepted: [
        "sie fliegt mit dem flugzeug nach barcelona",
        "sie fliegt nach barcelona",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 5 — Meine Stadt: describing a city
// ---------------------------------------------------------------------------

const germanCityDescription: Lesson = {
  id: "german-city-description",
  order: 5,
  title: "Meine Stadt: describing a city in German",
  sourceRef:
    "Week 5: Was kann man in Brisbane machen + Week 6/7: Exam practice (Stile)",
  aiProvenance: {
    tool: "Claude",
    sources: [
      "Stile: Week 5 — Was kann man in Brisbane machen",
      "Stile: Week 6/7 — A standard Exam sample: Exam practice",
      "Stile: Week 7 L1 — Formative assessment (Stuttgart text)",
    ],
    role: "generated",
  },
  learnCards: [
    {
      id: "city-model-text",
      heading: "A model paragraph: describing Brisbane",
      body: [
        t(
          "The best way to learn how to describe a city is to study a model text. Below is an A-level paragraph describing Brisbane, using all the sentence structures you have learned:",
        ),
        t(
          "Meine Stadt heißt Brisbane. Es gibt viele Sehenswürdigkeiten in der Stadt. Das South Bank Parkland liegt in der Nähe vom Fluss. Man kann dort spazieren gehen, schwimmen und Restaurants besuchen. Das Museum von Brisbane befindet sich in der Adelaide Street. Man kann dort viele interessante Dinge sehen und besichtigen. Das Wheel of Brisbane ist 500 Meter vom Bahnhof South Brisbane entfernt. Mit dem Bus dauert es fünf Minuten vom Bahnhof zum South Bank. Mit dem Fahrrad dauert es zehn Minuten vom South Bank zum Botanischen Garten. Man kann auch mit der Fähre fahren und die Stadt vom Wasser sehen.",
        ),
        t(
          "Let's break down the structures: Meine Stadt heißt ... (My city is called ...), Es gibt ... (There is/are ...), ... liegt in der Nähe vom ... (... is located near the ...), Man kann dort ... (One can there ...), ... befindet sich in ... (... is situated in ...), ... ist ... Meter von ... entfernt (... is ... metres from ...), Mit ... dauert es ... Minuten von ... zum/zur ... (By ... it takes ... minutes from ... to ...).",
        ),
      ],
    },
    {
      id: "city-writing-template",
      heading: "A template for writing your own city description",
      body: [
        t(
          "Use this template to structure your own paragraph about any city. Fill in the blanks with your chosen city's details:",
        ),
        t(
          "1. Name the city: Meine Stadt heißt [city name]. / [City] ist eine Stadt in [country].",
        ),
        t(
          "2. Say what is there: Es gibt viele Sehenswürdigkeiten in [city]. / In [city] gibt es [attractions].",
        ),
        t(
          "3. Locate a sight: [Attraction] liegt in [street/area]. / [Attraction] befindet sich in [street].",
        ),
        t(
          "4. Say what you can do: Man kann [activity] und [activity]. / Man kann dort [verb phrase].",
        ),
        t("5. Give distance: [Place A] ist [distance] von [Place B] entfernt."),
        t(
          "6. Give travel time: Mit [transport] dauert es [time] von [place] zum/zur [place].",
        ),
        t(
          "7. Add a mode of transport: Man kann mit [transport] fahren und [what you see/do].",
        ),
        t(
          "You can rearrange these elements to create variety. The important thing is that each sentence uses a correct German structure and that the verbs are in the right position.",
        ),
      ],
    },
    {
      id: "city-key-phrases",
      heading: "Useful phrases for city descriptions",
      body: [
        t(
          "Here are phrases you can mix and match. The words in brackets can be swapped for your own choices:",
        ),
        t(
          "Es gibt [viele Sehenswürdigkeiten / einen Zoo / ein Museum / einen Park] in der Stadt.",
        ),
        t(
          "Man kann [spazieren gehen / schwimmen / Eis essen / einkaufen gehen / Sport sehen / das Gebäude besichtigen / über Geschichte lernen / mit der Fähre fahren].",
        ),
        t(
          "... liegt [im Stadtzentrum / in der Nähe vom Fluss / in der [street name] / neben dem Bahnhof].",
        ),
        t(
          "... befindet sich [in der Altstadt / im Norden der Stadt / in der Berliner Straße].",
        ),
        t(
          "Die Reise von [place A] bis zu [place B] dauert [time] mit [transport].",
        ),
        t(
          "Man kann [place] zu Fuß erreichen. — One can reach [place] on foot.",
        ),
        t(
          "[Place] ist nicht weit von [place] entfernt. — [Place] is not far from [place].",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "city-p1",
      type: "mcq",
      prompt: [
        t("What does 'Es gibt viele Sehenswürdigkeiten in der Stadt' mean?"),
      ],
      explanation: [
        t(
          "'There are many sights in the city.' Es gibt is the fixed expression for 'there is/are'. Viele means 'many'. Sehenswürdigkeiten (plural) means 'sights' or 'places of interest'. In der Stadt uses the dative after in for a static location. This sentence is a great opener for any city description.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("There are many sights in the city.")] },
        { id: "b", label: [t("The city has many buildings.")] },
        { id: "c", label: [t("I like the sights in the city.")] },
        { id: "d", label: [t("One can see the sights in the city.")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "city-p2",
      type: "fillInTheBlank",
      prompt: [
        t("Complete: Das Museum ___ 500 Meter vom Bahnhof entfernt. (is)"),
      ],
      explanation: [
        t(
          "Das Museum ist 500 Meter vom Bahnhof entfernt. The construction [Place A] ist [distance] von [Place B] entfernt is the standard way to express distance. Vom is the contraction of von + dem (from the). Entfernt means 'distant/away' and always goes at the end of this construction.",
        ),
      ],
      xp: 10,
      template: [t("Das Museum ___ 500 Meter vom Bahnhof entfernt.")],
      accepted: ["ist"],
    },
    {
      id: "city-p3",
      type: "shortText",
      prompt: [
        t(
          "Translate into German: 'By bicycle it takes ten minutes from the station to the botanical garden.'",
        ),
      ],
      explanation: [
        t(
          "Mit dem Fahrrad dauert es zehn Minuten vom Bahnhof zum Botanischen Garten. Mit dem Fahrrad = by bicycle (with the bicycle — dative). Dauert es = it takes. Zehn Minuten = ten minutes. Vom = von + dem (from the). Zum = zu + dem (to the). Botanischen Garten takes the dative adjective ending -en after zu + dem. This structure combines transport, time, and two locations in one sentence.",
        ),
      ],
      xp: 15,
      accepted: [
        "mit dem fahrrad dauert es zehn minuten vom bahnhof zum botanischen garten",
        "mit dem fahrrad dauert es 10 minuten vom bahnhof zum botanischen garten",
      ],
    },
    {
      id: "city-p4",
      type: "matching",
      prompt: [
        t(
          "Match each German city description phrase with its English equivalent.",
        ),
      ],
      explanation: [
        t(
          "Meine Stadt heißt Brisbane = My city is called Brisbane. Es gibt viele Sehenswürdigkeiten = There are many sights. in der Nähe vom Fluss = near the river (literally 'in the nearness of the river'). Man kann dort spazieren gehen = One can go for a walk there. vom Wasser sehen = to see from the water. mit der Fähre fahren = to travel by ferry.",
        ),
      ],
      xp: 20,
      pairs: [
        {
          id: "1",
          left: [t("Meine Stadt heißt Brisbane.")],
          right: [t("My city is called Brisbane.")],
        },
        {
          id: "2",
          left: [t("Es gibt viele Sehenswürdigkeiten.")],
          right: [t("There are many sights.")],
        },
        {
          id: "3",
          left: [t("in der Nähe vom Fluss")],
          right: [t("near the river")],
        },
        {
          id: "4",
          left: [t("Man kann dort spazieren gehen.")],
          right: [t("One can go for a walk there.")],
        },
        {
          id: "5",
          left: [t("vom Wasser sehen")],
          right: [t("to see from the water")],
        },
        {
          id: "6",
          left: [t("mit der Fähre fahren")],
          right: [t("to travel by ferry")],
        },
      ],
    },
    {
      id: "city-p5",
      type: "mcq",
      prompt: [
        t(
          "In the sentence 'Man kann auch mit der Fähre fahren', what position does fahren occupy?",
        ),
      ],
      explanation: [
        t(
          "Fahren is at the end of the clause. In a man kann construction, the modal verb kann is in second position and the main verb (fahren) is at the end. Auch (also) is an adverb that sits in the middle. The full structure is: Man kann [optional adverbs] [objects and prepositional phrases] [infinitive verb]. This is the modal verb bracket rule applied to man kann sentences.",
        ),
      ],
      xp: 12,
      options: [
        { id: "a", label: [t("At the end of the clause")] },
        { id: "b", label: [t("Immediately after kann")] },
        { id: "c", label: [t("After der Fähre")] },
        { id: "d", label: [t("At the start of the clause")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "city-p6",
      type: "shortText",
      prompt: [t("How would you say 'My city is called Stuttgart' in German?")],
      explanation: [
        t(
          "Meine Stadt heißt Stuttgart. Meine is the feminine possessive pronoun (die Stadt is feminine). Heißt is the third-person singular of heißen (to be called). An alternative is Stuttgart ist meine Stadt (Stuttgart is my city), but Meine Stadt heißt Stuttgart is the more natural way to name a city in a description.",
        ),
      ],
      xp: 10,
      accepted: ["meine stadt heisst stuttgart", "meine stadt heißt stuttgart"],
    },
    {
      id: "city-p7",
      type: "fillInTheBlank",
      prompt: [
        t(
          "Complete: Die Reise von der Bushaltestelle bis ___ Porsche Museum dauert 30 Minuten mit dem Bus. (to the)",
        ),
      ],
      explanation: [
        t(
          "Die Reise von der Bushaltestelle bis zum Porsche Museum dauert 30 Minuten mit dem Bus. Zum = zu + dem (to the). Porsche Museum is neuter (das Museum), so after zu the dative article is dem, contracted to zum. The phrase von ... bis zu(m/r) is the standard way to express 'from ... to ...' for places.",
        ),
      ],
      xp: 10,
      template: [
        t(
          "Die Reise von der Bushaltestelle bis ___ Porsche Museum dauert 30 Minuten mit dem Bus.",
        ),
      ],
      accepted: ["zum", "zu dem"],
    },
    {
      id: "city-p8",
      type: "mcq",
      prompt: [
        t(
          "Which of these is NOT a correct way to say 'one can visit' in German?",
        ),
      ],
      explanation: [
        t(
          "Man kann besuchen is correct — besuchen (to visit) is the correct verb and goes to the end. Man kann besichtigen is also correct — besichtigen means 'to visit/view' (for sights). Man kann sehen is correct — sehen means 'to see'. Man kann besuchen gehen is incorrect because besuchen already covers the action of visiting; adding gehen is redundant. In German, you visit a place or you go to a place — you do not 'go visit' as a single action.",
        ),
      ],
      xp: 12,
      options: [
        { id: "a", label: [t("Man kann besuchen")] },
        { id: "b", label: [t("Man kann besichtigen")] },
        { id: "c", label: [t("Man kann sehen")] },
        { id: "d", label: [t("Man kann besuchen gehen")] },
      ],
      correctOptionId: "d",
    },
  ],
  mastery: [
    {
      id: "city-m1",
      type: "shortText",
      prompt: [
        t(
          "Write 3 German sentences describing a city. Include: (1) the city's name, (2) one thing you can do there using man kann, (3) how far one attraction is from the train station.",
        ),
      ],
      explanation: [
        t(
          "Example answer: Meine Stadt heißt Berlin. Man kann das Brandenburger Tor besichtigen und im Tiergarten spazieren gehen. Das Brandenburger Tor ist 500 Meter vom Hauptbahnhof entfernt. Any correct German using the taught structures is acceptable. Key checkpoints: (1) correct use of heißt or ist, (2) man kann + infinitive at end, (3) distance construction with ist ... entfernt.",
        ),
      ],
      xp: 18,
      accepted: ["meine stadt", "heißt", "heisst", "man kann", "entfernt"],
    },
    {
      id: "city-m2",
      type: "matching",
      prompt: [
        t(
          "Match each question about a city to the sentence structure you would use to answer it.",
        ),
      ],
      explanation: [
        t(
          "Wie heißt die Stadt? → Meine Stadt heißt ... (use heißen). Was kann man dort machen? → Man kann ... (use man kann + infinitive). Wo liegt das Museum? → Das Museum liegt in ... (use liegen + dative). Wie weit ist der Bahnhof vom Park entfernt? → Der Bahnhof ist ... Meter vom Park entfernt (use ist ... entfernt). Wie lange dauert es mit dem Bus? → Es dauert ... Minuten mit dem Bus (use es dauert). Understanding which structure answers which question is the key to writing a coherent paragraph.",
        ),
      ],
      xp: 20,
      pairs: [
        {
          id: "1",
          left: [t("Wie heißt die Stadt?")],
          right: [t("Meine Stadt heißt ...")],
        },
        {
          id: "2",
          left: [t("Was kann man dort machen?")],
          right: [t("Man kann ...")],
        },
        {
          id: "3",
          left: [t("Wo liegt das Museum?")],
          right: [t("Das Museum liegt in ... (dative)")],
        },
        {
          id: "4",
          left: [t("Wie weit ist der Bahnhof vom Park entfernt?")],
          right: [t("... ist ... Meter von ... entfernt")],
        },
        {
          id: "5",
          left: [t("Wie lange dauert es mit dem Bus?")],
          right: [t("Es dauert ... Minuten mit dem Bus")],
        },
      ],
    },
    {
      id: "city-m3",
      type: "shortText",
      prompt: [
        t(
          "The Brisbane model text uses Man kann dort spazieren gehen, schwimmen und Restaurants besuchen. Why is besuchen at the end, after Restaurants?",
        ),
      ],
      explanation: [
        t(
          "In a list of man kann activities, all the infinitives go to the end of their respective phrases. In this sentence, three activities are listed: spazieren gehen (go for a walk), schwimmen (swim), and Restaurants besuchen (visit restaurants). Each follows the man kann + ... + infinitive pattern. For Restaurants besuchen, the object (Restaurants) comes before the infinitive (besuchen) because in a man kann clause, the infinitive is always the last element after all objects and prepositional phrases.",
        ),
      ],
      xp: 15,
      accepted: [
        "infinitive goes to the end",
        "the verb goes to the end",
        "besuchen is the infinitive",
        "modal verb pushes the infinitive to the end",
        "after all objects and phrases",
        "it is the main verb",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Lesson 6 — Eine deutsche Stadt: writing about a German city
// ---------------------------------------------------------------------------

const germanCityWriting: Lesson = {
  id: "german-city-writing",
  order: 6,
  title: "Eine deutsche Stadt: writing about a German city",
  sourceRef:
    "Week 7 L1: Formative assessment + Week 8-9: Assessment 2026 (Stile)",
  aiProvenance: {
    tool: "Claude",
    sources: [
      "Stile: Week 7 L1 — Formative assessment (Stuttgart map and text)",
      "Stile: Week 8-9 — Assessment 2026",
      "stadttour-deutschland.de: Virtual map of German cities",
    ],
    role: "generated",
  },
  learnCards: [
    {
      id: "writing-stuttgart-model",
      heading: "Model text: Stuttgart",
      body: [
        t(
          "Before writing your own paragraph, study this model text about Stuttgart. It uses all the required structures at an A-level standard:",
        ),
        t(
          "Willkommen zu Stuttgart. Die Stadt liegt in Deutschland und ist sehr beliebt.",
        ),
        t(
          "Es gibt viele Sehenswürdigkeiten in Stuttgart. Man kann in Stuttgart die Kathedrale, das Porsche Museum und das Schlossplatz besichtigen. Die Kathedrale liegt neben dem Rathaus in der Schillerstraße und der Schlossplatz befindet sich in der Kreisstraße.",
        ),
        t(
          "Man kann in Stuttgart auch an den Neckar Fluss und zu dem Rosensteinpark spazieren gehen oder Eis bei einer Eisdiele essen. Der Rosensteinpark liegt in dem Stadtzentrum und die Eisdiele ist auch in der Nähe in der Brunnenstraße. Die Reise von der Bushaltestelle bis zu dem Porsche Museum dauert mit dem Bus ungefähr 30 Minuten. Die Kathedrale ist nicht weit von dem Hilton Hotel entfernt und man kann dahin zu Fuß gehen oder mit der Straßenbahn fahren.",
        ),
        t(
          "Notice the variety: the text uses both liegt and befindet sich for location; it describes what you can do (besichtigen, spazieren gehen, Eis essen); it gives travel times and distances; and it mentions multiple modes of transport (Bus, zu Fuß, Straßenbahn). The prepositions are correctly used with the dative case throughout.",
        ),
      ],
    },
    {
      id: "writing-assessment-structure",
      heading: "Assessment task structure",
      body: [
        t(
          "The summative assessment for this unit has three parts. Understanding the structure helps you prepare:",
        ),
        t(
          "Part 1 — Eine Touristenkarte (a tourist map): Draw a city plan with 8–10 main streets, label street names that have cultural or historical significance, position 8 tourist attractions labelled in German, add 4 types of public transport, and create a legend. Write a short German paragraph about what one can see in your city, how far away places are, and how long trips take.",
        ),
        t(
          "Part 2 — Ein Paragraph (a paragraph, about 100 words): In German, describe what one can see and do in your city, what streets the sights are in, how far apart they are, and how long trips take with different modes of transport.",
        ),
        t(
          "Part 3 — Reflexion (reflection, in English): Choose one attraction and one street name from your map. Write a paragraph reflecting on how these names connect to German culture, history, famous people, beliefs, or values. This demonstrates awareness that language is connected with culture and identity.",
        ),
      ],
    },
    {
      id: "writing-culture-reflection",
      heading: "Language, culture, and identity",
      body: [
        t(
          "The reflection task asks you to think about how place names carry cultural meaning. Here is an example using Brisbane names, adapted to a German-speaking city context:",
        ),
        t(
          "The name Schillerstraße (Schiller Street) reflects how German culture and identity are embedded in language. It is named after Friedrich Schiller, an 18th-century German poet, philosopher, and playwright whose works like Wilhelm Tell and Ode to Joy are central to German literature. Naming a street after Schiller shows that German-speaking communities value their literary heritage and use public spaces to honour cultural figures. When you say Schillerstraße, you are not just giving directions — you are speaking a piece of German cultural history.",
        ),
        t(
          "Similarly, the attraction Schloss Neuschwanstein (Neuschwanstein Castle) connects to Bavarian royal history and German Romanticism. It was built by King Ludwig II, who was fascinated by mediaeval legends and the operas of Richard Wagner. The castle's fairy-tale design expresses 19th-century German Romantic ideals about beauty, nature, and the past. Visiting or naming Neuschwanstein means engaging with Germany's artistic and architectural heritage.",
        ),
        t(
          "This kind of reflection shows that you understand language is not just words and grammar — it carries the history, values, and identity of the people who speak it.",
        ),
      ],
    },
  ],
  practice: [
    {
      id: "writing-p1",
      type: "mcq",
      prompt: [
        t(
          "In the Stuttgart model text, what does 'Willkommen zu Stuttgart' mean?",
        ),
      ],
      explanation: [
        t(
          "'Welcome to Stuttgart.' Willkommen means 'welcome'. Zu is used here in the sense of 'to', though in standard German you would more commonly see Willkommen in Stuttgart. The zu construction here emphasises the invitation to come to the city. Note that Stuttgart (like most cities) takes no article, so zu is used rather than zum/zur.",
        ),
      ],
      xp: 10,
      options: [
        { id: "a", label: [t("Welcome to Stuttgart")] },
        { id: "b", label: [t("Goodbye from Stuttgart")] },
        { id: "c", label: [t("Stuttgart is beautiful")] },
        { id: "d", label: [t("Come back to Stuttgart")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "writing-p2",
      type: "fillInTheBlank",
      prompt: [
        t(
          "Complete: Die Kathedrale ist nicht weit ___ dem Hilton Hotel entfernt. (from)",
        ),
      ],
      explanation: [
        t(
          "Die Kathedrale ist nicht weit von dem Hilton Hotel entfernt. Von is the preposition for 'from' in distance expressions. Nicht weit means 'not far'. The full construction is: [place] ist nicht weit von [place] entfernt. Von dem can be contracted to vom in everyday German.",
        ),
      ],
      xp: 10,
      template: [
        t("Die Kathedrale ist nicht weit ___ dem Hilton Hotel entfernt."),
      ],
      accepted: ["von"],
    },
    {
      id: "writing-p3",
      type: "shortText",
      prompt: [
        t(
          "Translate into German: 'One can also go there on foot or travel by tram.'",
        ),
      ],
      explanation: [
        t(
          "Man kann auch dahin zu Fuß gehen oder mit der Straßenbahn fahren. Dahin means 'there/to that place'. Zu Fuß gehen means 'to go on foot'. Oder means 'or'. Mit der Straßenbahn fahren means 'to travel by tram'. Both infinitives (gehen, fahren) go at the end of their respective clauses after oder. Straßenbahn is feminine (die Straßenbahn), so mit takes the dative der: mit der Straßenbahn.",
        ),
      ],
      xp: 15,
      accepted: [
        "man kann auch dahin zu fuss gehen oder mit der strassenbahn fahren",
        "man kann auch dahin zu fuß gehen oder mit der straßenbahn fahren",
        "man kann dahin auch zu fuss gehen oder mit der strassenbahn fahren",
      ],
    },
    {
      id: "writing-p4",
      type: "matching",
      prompt: [t("Match each German question word to its English equivalent.")],
      explanation: [
        t(
          "Wo? = Where? (location — dative question). Wohin? = Where to? (destination — accusative question). Wie? = How? (manner or means). Wie lange? = How long? (duration). Wie weit? = How far? (distance). Was? = What? (thing or action). These question words are essential for both reading comprehension questions and for asking about cities.",
        ),
      ],
      xp: 20,
      pairs: [
        { id: "1", left: [t("Wo?")], right: [t("Where?")] },
        { id: "2", left: [t("Wohin?")], right: [t("Where to?")] },
        { id: "3", left: [t("Wie?")], right: [t("How?")] },
        { id: "4", left: [t("Wie lange?")], right: [t("How long?")] },
        { id: "5", left: [t("Wie weit?")], right: [t("How far?")] },
        { id: "6", left: [t("Was?")], right: [t("What?")] },
      ],
    },
    {
      id: "writing-p5",
      type: "mcq",
      prompt: [t("Why is the reflection task written in English, not German?")],
      explanation: [
        t(
          "The reflection task assesses your understanding of the connection between language, culture, and identity. Writing it in English allows you to express complex ideas about history, cultural values, and the meaning of place names at a depth that would not be possible at Year 8 German level. The German language skills are assessed through the map and the German paragraph. The reflection tests a different skill: cultural awareness.",
        ),
      ],
      xp: 10,
      options: [
        {
          id: "a",
          label: [
            t(
              "It assesses cultural understanding rather than German language skills",
            ),
          ],
        },
        {
          id: "b",
          label: [t("The assessment doesn't allow German for the reflection")],
        },
        {
          id: "c",
          label: [t("German doesn't have words for cultural concepts")],
        },
        { id: "d", label: [t("It's a mistake; it should be in German")] },
      ],
      correctOptionId: "a",
    },
    {
      id: "writing-p6",
      type: "shortText",
      prompt: [
        t(
          "The Stuttgart text says die Kathedrale liegt neben dem Rathaus. What does neben mean here and what case does it take?",
        ),
      ],
      explanation: [
        t(
          "Neben means 'next to' or 'beside'. It is a two-way preposition (Wechselpräposition), and here it takes the dative case (dem Rathaus) because it describes a static location — the cathedral is already next to the town hall. If describing movement (putting something next to something else), neben would take the accusative: Ich stelle das Fahrrad neben das Rathaus (I put the bicycle next to the town hall).",
        ),
      ],
      xp: 15,
      accepted: [
        "next to",
        "beside",
        "dative",
        "neben takes the dative",
        "neben takes dative",
        "dem is dative",
        "next to, dative",
        "beside, dative",
      ],
    },
    {
      id: "writing-p7",
      type: "fillInTheBlank",
      prompt: [
        t(
          "Complete: Man kann in Stuttgart die Kathedrale, das Porsche Museum und das Schlossplatz ___ . (visit/view)",
        ),
      ],
      explanation: [
        t(
          "Man kann in Stuttgart die Kathedrale, das Porsche Museum und das Schlossplatz besichtigen. Besichtigen means 'to visit' or 'to view', specifically for sights and attractions. It is listed once at the end and applies to all three objects. This is efficient German: when listing multiple objects with the same verb in a man kann construction, the infinitive at the end covers all of them.",
        ),
      ],
      xp: 10,
      template: [
        t(
          "Man kann in Stuttgart die Kathedrale, das Porsche Museum und das Schlossplatz ___ .",
        ),
      ],
      accepted: ["besichtigen", "besuchen"],
    },
    {
      id: "writing-p8",
      type: "mcq",
      prompt: [
        t("A German street named Goethestraße is most likely named after:"),
      ],
      explanation: [
        t(
          "Johann Wolfgang von Goethe — one of Germany's greatest writers. Goethe (1749–1832) wrote Faust, The Sorrows of Young Werther, and many poems that are central to German literature. Streets named Goethestraße are found in almost every German city, reflecting his importance to German cultural identity. Recognising names like Goethe, Schiller, Beethoven, and Kant on street signs is part of understanding how German language and culture are embedded in everyday spaces.",
        ),
      ],
      xp: 12,
      options: [
        {
          id: "a",
          label: [t("Johann Wolfgang von Goethe, a famous German writer")],
        },
        { id: "b", label: [t("A type of German food")] },
        { id: "c", label: [t("A German car manufacturer")] },
        { id: "d", label: [t("A region in northern Germany")] },
      ],
      correctOptionId: "a",
    },
  ],
  mastery: [
    {
      id: "writing-m1",
      type: "shortText",
      prompt: [
        t(
          "Write a 4–5 sentence paragraph in German about a German-speaking city of your choice. Use: heißt/liegt, es gibt, man kann, distance (entfernt), and travel time (dauert).",
        ),
      ],
      explanation: [
        t(
          "Example for Berlin: Berlin ist die Hauptstadt von Deutschland. Es gibt viele Sehenswürdigkeiten in Berlin. Man kann das Brandenburger Tor besichtigen und im Tiergarten spazieren gehen. Das Brandenburger Tor ist ungefähr einen Kilometer vom Hauptbahnhof entfernt. Mit der S-Bahn dauert es fünf Minuten vom Hauptbahnhof zum Alexanderplatz. Any correct German using the five required structures is acceptable. The key is demonstrating you can combine all the unit's sentence patterns into a coherent paragraph.",
        ),
      ],
      xp: 20,
      accepted: [
        "liegt",
        "befindet sich",
        "gibt",
        "man kann",
        "entfernt",
        "dauert",
      ],
    },
    {
      id: "writing-m2",
      type: "matching",
      prompt: [
        t(
          "Match each assessment task component with its language requirement.",
        ),
      ],
      explanation: [
        t(
          "The tourist map (Touristenkarte) requires labels in German — street names, attraction names, and transport hubs are labelled in German vocabulary. The paragraph (Paragraph) requires writing in German — using all the unit's sentence structures. The reflection (Reflexion) requires writing in English — to show deep understanding of the connection between language, culture, and identity. This three-part structure tests different skills: vocabulary recall, sentence construction, and cultural analysis.",
        ),
      ],
      xp: 20,
      pairs: [
        {
          id: "1",
          left: [t("Touristenkarte (tourist map)")],
          right: [t("Labels and legend in German")],
        },
        {
          id: "2",
          left: [t("Paragraph (paragraph)")],
          right: [t("Writing in German (about 100 words)")],
        },
        {
          id: "3",
          left: [t("Reflexion (reflection)")],
          right: [t("Writing in English about culture and identity")],
        },
      ],
    },
    {
      id: "writing-m3",
      type: "shortText",
      prompt: [
        t(
          "Explain why the street name Schillerstraße carries cultural meaning, and give one example of how you could write about it in a reflection.",
        ),
      ],
      explanation: [
        t(
          "Schillerstraße is named after Friedrich Schiller, a major figure in German literature. In a reflection, you might write: 'The name Schillerstraße shows how German street names honour the country's literary heritage. Schiller wrote works that explore freedom and human dignity, values that are important to modern German identity. By naming streets after writers like Schiller, German cities embed cultural memory into everyday life — every person who walks down Schillerstraße is reminded of this cultural legacy.' The key is connecting the name to specific cultural, historical, or value-based meaning.",
        ),
      ],
      xp: 18,
      accepted: [
        "schiller",
        "literature",
        "poet",
        "writer",
        "cultural",
        "heritage",
        "german culture",
        "named after",
      ],
    },
  ],
};

// ---------------------------------------------------------------------------
// Boss challenge
// ---------------------------------------------------------------------------

const challengeQuestions: Question[] = [
  {
    id: "ger-boss-1",
    type: "mcq",
    prompt: [t("Which sentence correctly uses the man kann structure?")],
    explanation: [
      t(
        "Man kann das Schloss besuchen is correct. In a man kann sentence, the modal verb kann is in second position and the main verb (besuchen) goes to the end of the clause. Option b is wrong because besuchen is not at the end. Option c is wrong because kann is not conjugated correctly (man always takes third-person singular). Option d is wrong because the word order is English, not German.",
      ),
    ],
    xp: 20,
    options: [
      { id: "a", label: [t("Man kann das Schloss besuchen.")] },
      { id: "b", label: [t("Man besuchen kann das Schloss.")] },
      { id: "c", label: [t("Man können das Schloss besuchen.")] },
      { id: "d", label: [t("Man kann besuchen das Schloss.")] },
    ],
    correctOptionId: "a",
  },
  {
    id: "ger-boss-2",
    type: "fillInTheBlank",
    prompt: [
      t(
        "Complete with the correct article and preposition contraction: Das Museum befindet sich ___ Schillerstraße. (in the)",
      ),
    ],
    explanation: [
      t(
        "Das Museum befindet sich in der Schillerstraße. Straße is feminine (die Straße), and after in for a static location we use the dative case: die becomes der. So: in der Schillerstraße. The contraction in + dem = im is for masculine and neuter nouns only (im Park, im Museum). There is no contraction for in + der.",
      ),
    ],
    xp: 20,
    template: [t("Das Museum befindet sich ___ Schillerstraße.")],
    accepted: ["in der"],
  },
  {
    id: "ger-boss-3",
    type: "shortText",
    prompt: [
      t(
        "Translate into German: 'The castle is 2 kilometres from the city centre. It takes 10 minutes by bicycle.'",
      ),
    ],
    explanation: [
      t(
        "Das Schloss ist zwei Kilometer vom Stadtzentrum entfernt. Es dauert zehn Minuten mit dem Fahrrad. The distance construction uses ist ... entfernt. Vom is von + dem (from the). Stadtzentrum is neuter (das). The time construction uses es dauert. Mit dem Fahrrad is 'by bicycle' — Fahrrad is neuter, so mit takes dem. Alternatively: Mit dem Rad (shorter form of Fahrrad).",
      ),
    ],
    xp: 25,
    accepted: [
      "das schloss ist zwei kilometer vom stadtzentrum entfernt",
      "das schloss ist 2 kilometer vom stadtzentrum entfernt",
      "es dauert zehn minuten mit dem fahrrad",
      "es dauert 10 minuten mit dem fahrrad",
      "es dauert zehn minuten mit dem rad",
    ],
  },
  {
    id: "ger-boss-4",
    type: "matching",
    prompt: [t("Match each German preposition with its correct use.")],
    explanation: [
      t(
        "Nach is used with cities and countries without articles (nach Berlin, nach Deutschland). Zu is used with specific places and buildings (zu der Eisdiele → zur Eisdiele). Mit is for 'by' a mode of transport, always dative (mit dem Bus). In with dative is for static location (in der Stadt — in the city). Von ... bis zu is from ... to (von dem Bahnhof bis zu dem Museum). Mastering these distinctions is essential for accurate German.",
      ),
    ],
    xp: 25,
    pairs: [
      {
        id: "1",
        left: [t("nach")],
        right: [t("to a city or country without an article")],
      },
      {
        id: "2",
        left: [t("zu (zur/zum)")],
        right: [t("to a specific place or building")],
      },
      {
        id: "3",
        left: [t("mit (+ dative)")],
        right: [t("by a mode of transport")],
      },
      {
        id: "4",
        left: [t("in (+ dative)")],
        right: [t("in/at a location (static)")],
      },
      {
        id: "5",
        left: [t("von ... bis zu")],
        right: [t("from ... to (places)")],
      },
    ],
  },
  {
    id: "ger-boss-5",
    type: "mcq",
    prompt: [
      t(
        "In the sentence 'Ingrid fliegt mit dem Flugzeug nach Frankfurt', why is fliegt in second position?",
      ),
    ],
    explanation: [
      t(
        "In German main clauses, the conjugated verb must be the second element. Here, Ingrid is the first element (the subject) and fliegt is the second element. Mit dem Flugzeug and nach Frankfurt are additional elements that come after. This is the V2 (verb-second) rule, a fundamental principle of German word order. It applies regardless of what the first element is — if the sentence started with a time phrase like Heute (today), the verb would still be second: Heute fliegt Ingrid...",
      ),
    ],
    xp: 20,
    options: [
      {
        id: "a",
        label: [t("German main clauses follow verb-second (V2) word order")],
      },
      {
        id: "b",
        label: [t("Fliegen is an irregular verb that always goes second")],
      },
      { id: "c", label: [t("Mit dem Flugzeug occupies the first position")] },
      { id: "d", label: [t("It is a question, not a statement")] },
    ],
    correctOptionId: "a",
  },
  {
    id: "ger-boss-6",
    type: "shortText",
    prompt: [
      t(
        "Write a sentence in German using man kann that says you can eat ice cream, go for a walk, and visit the museum. Use at least three activities.",
      ),
    ],
    explanation: [
      t(
        "Man kann Eis essen, spazieren gehen und das Museum besuchen. All three infinitives (essen, gehen, besuchen) are at the end of their phrases. Eis essen is a separable phrase (eat ice cream). Spazieren gehen is a two-part verb (go for a walk). Das Museum besuchen has the object before the infinitive. The und connects the list. This demonstrates the man kann pattern with multiple activities.",
      ),
    ],
    xp: 25,
    accepted: [
      "man kann eis essen",
      "man kann spazieren gehen",
      "man kann das museum besuchen",
      "man kann ... und ... und",
    ],
  },
  {
    id: "ger-boss-7",
    type: "mcq",
    prompt: [
      t(
        "What is the correct way to say 'There is a cathedral in the old town'?",
      ),
    ],
    explanation: [
      t(
        "Es gibt eine Kathedrale in der Altstadt. Es gibt is 'there is/are'. Eine Kathedrale is accusative (feminine, so eine stays the same). In der Altstadt uses dative after in for static location. Option b incorrectly uses es ist instead of es gibt. Option c uses the wrong gender article (das for a feminine noun). Option d uses the wrong case after in.",
      ),
    ],
    xp: 20,
    options: [
      { id: "a", label: [t("Es gibt eine Kathedrale in der Altstadt.")] },
      { id: "b", label: [t("Es ist eine Kathedrale in der Altstadt.")] },
      { id: "c", label: [t("Es gibt das Kathedrale in der Altstadt.")] },
      { id: "d", label: [t("Es gibt eine Kathedrale in die Altstadt.")] },
    ],
    correctOptionId: "a",
  },
];

// ---------------------------------------------------------------------------
// Track definition
// ---------------------------------------------------------------------------

/** The German Wir reisen! track. */
export const germanWirReisenTrack: Track = {
  id: "german-wir-reisen",
  subjectId: "languages",
  title: "German: Wir reisen! (Year 8)",
  description:
    "German vocabulary for travel, places of interest, prepositions, transport, and describing cities.",
  lessons: [
    germanPlaces,
    germanSights,
    germanPrepositions,
    germanStory,
    germanCityDescription,
    germanCityWriting,
  ],
  challenge: {
    id: "german-wir-reisen-boss",
    title: "Boss challenge: Wir reisen!",
    sourceRef:
      "2026 German 7&8 Unit 6: Wir reisen! Stile unit (Frau Harris), The Gap State High School",
    questions: challengeQuestions,
    bonusXp: 100,
    passBadgeId: "boss-german-wir-reisen",
    aiProvenance: {
      tool: "Claude",
      sources: [
        "Stile: 2026 German 7&8 Unit 6 — Wir reisen! (all lessons, Frau Harris, The Gap State High School)",
        "Quizlet: Attraktionen / Sehenswürdigkeiten, Modes of transport, Unit 6 nouns and phrases, Unit 6 verbs",
        "stadttour-deutschland.de: Virtual map of German cities",
      ],
      role: "generated",
    },
  },
};

/** Figures used by the German Wir reisen! track. */
export const germanWirReisenFigures: Figure[] = [
  figGermanyMap,
  figTransportModes,
  figPrepositionsDiagram,
];
