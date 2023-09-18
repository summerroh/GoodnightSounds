import React from "react";
// 컨텍스트를 만들어준다
const MyContext = React.createContext({
  presetImages: [],
  setPresetImages: () => {},
});

export { MyContext };
