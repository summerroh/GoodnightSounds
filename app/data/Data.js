const music1 = require("../../assets/nujabes1.mp3");
const music2 = require("../../assets/nujabes2.mp3");
const rainUrl =
  "https://firebasestorage.googleapis.com/v0/b/goodnightsounds-d5cd5.appspot.com/o/531947__straget__the-rain-falls-against-the-parasol.wav?alt=media&token=9a75b285-3f75-468a-bf82-8ee2312585a7";
const sounds = [
  {
    title: "Rainy Sounds",
    data: [
      {
        name: "Rain",
        iconName: "weather-rainy",
        music: rainUrl,
      },

      { name: "Bird", iconName: "airplane", music: music2 },

      { name: "Thunder", iconName: "cloud", music: music1 },

      { name: "Snow", iconName: "weather-rainy", music: music2 },

      { name: "Puddle", iconName: "airplane", music: music1 },

      { name: "Lake", iconName: "cloud", music: music2 },
    ],
  },
];
export { sounds };
