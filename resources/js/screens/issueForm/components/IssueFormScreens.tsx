
/**
 * Este archivo contiene la configuración de los componentes que se renderizarán en cada paso del formulario
 * de creación de issues.
 * Dependiendo el Question_TypeId, se renderizará un componente u otro.
 */

import { IssueFormHome } from "../IssueFormHome";
import { ChckRadioDDownIssueFrm } from "./ChckRadioDDownIssueFrm";
import { FinalStepIssueFrm } from "./FinalStepIssueFrm";
import { InputFieldIssueFrm } from "./InputFieldIssueFrm";
import { SimpleTxtIssueFrm } from "./SimpleTxtIssueFrm";

export const IssueFormScreens = {
    0: IssueFormHome, // 0: IssueFormHome, (First Step screen)
    1: SimpleTxtIssueFrm, // 1: SimpleTextScreen,
    2: InputFieldIssueFrm, // 2: InputFieldScreen,
    3: ChckRadioDDownIssueFrm, // 3: CheckRadioDDownScreen, // Multiple Choice
    4: ChckRadioDDownIssueFrm, // 4: CheckRadioDDownScreen, // Single RadioButton Screen
    5: ChckRadioDDownIssueFrm, // 5: CheckRadioDDownScreen, // DropDown screen
    6: FinalStepIssueFrm // 6 : Final Step screen.
}