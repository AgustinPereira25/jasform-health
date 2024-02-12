
/**
 * Este archivo contiene la configuración de los componentes que se renderizarán en cada paso del formulario
 * de creación de issues.
 * Dependiendo el Question_TypeId, se renderizará un componente u otro.
 */

import { ChckRadioDDownIssueFrm } from "./ChckRadioDDownIssueFrm";
import { InputFieldIssueFrm } from "./InputFieldIssueFrm";
import { SimpleTxtIssueFrm } from "./SimpleTxtIssueFrm";

export const IssueFormScreens = {
    1: SimpleTxtIssueFrm, // 1: SimpleTextScreen,
    2: InputFieldIssueFrm, // 2: InputFieldScreen,
    3: ChckRadioDDownIssueFrm, // 3: CheckRadioDDownScreen, // Multiple Choice
    4: ChckRadioDDownIssueFrm, // 4: CheckRadioDDownScreen, // Single RadioButton Screen
    5: ChckRadioDDownIssueFrm, // 5: CheckRadioDDownScreen, // DropDown screen
}