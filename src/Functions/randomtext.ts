export const generateRandomParagraph = (): string => {
  const words = [
    "Lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet,",
    "consectetur",
    "adipiscing",
    "elit,",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua.",
    "blejiupwdop[wduuudgsuygdaiWJQIWOJ",
    "WDLWDHDWYD87YD0IWDOQWIDJOWIJDWJDOWQIDOWIDJU0",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua.",
    "blejiupwdop[wduuudgsuygdaiWJQIWOJ",
    "WDLWDHDWYD87YD0IWDOQWIDJOWIJDWJDOWQIDOWIDJU0",
  ];

  const paragraphLength = 30; // Number of words in the paragraph

  let paragraph = "";
  for (let i = 0; i < paragraphLength; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    const word = words[randomIndex];

    paragraph += word + " ";
  }

  return paragraph.trim(); // Remove trailing whitespace
};
