import { InputFieldScreen, SimpleTextScreen, CheckRadioDDownScreen } from "../components";

// { id: 1, name: "Simple Text" },
// { id: 2, name: "Input Field" },
// { id: 3, name: "Multiple Choice - Check Box" },
// { id: 4, name: "Single Option - Radio Button" },
// { id: 5, name: "Single Option - Drop Down Combo" },

// Explicación de la función. 
// Dado un question_TypeId, devolvemos el componente en cuestión (Simple, Input, el que sea)
// Se llama en FormQuestions asi: questionScreens[questionTypeId]. 

export const questionScreens = {
    1: SimpleTextScreen,
    2: InputFieldScreen,
    3: CheckRadioDDownScreen, // Multiple Choice
    4: CheckRadioDDownScreen, // Single RadioButton Screen
    5: CheckRadioDDownScreen, // DropDown screen
}