
/**
 * Este archivo contiene la configuración de los componentes que se renderizarán en cada paso del formulario
 * de creación de issues.
 * Dependiendo el Question_TypeId, se renderizará un componente u otro.
 */

import type { Form } from "@/api";
import { InstanceFormHome } from "../InstanceFormHome";
import { ChckRadioDDownFrmInstance } from "./ChckRadioDDownFrmInstance";
import { FinalStepFrmInstance } from "./FinalStepFrmInstance";
import { InputFieldFrmInstance } from "./InputFieldFrmInstance";
import { SimpleTxtFrmInstance } from "./SimpleTxtFrmInstance";
import type { FormInstanceFlow } from "../InstanceForm";

export interface InstanceProps {
    formInstanceInfo: Form;
    currentScreen: FormInstanceFlow;
    setCurrentScreen: (screen: FormInstanceFlow) => void;
};

export const FormInstanceScreens = {
    0: InstanceFormHome, // 0: IssueFormHome, (First Step screen)
    1: SimpleTxtFrmInstance, // 1: SimpleTextScreen,
    2: InputFieldFrmInstance, // 2: InputFieldScreen,
    3: ChckRadioDDownFrmInstance, // 3: CheckRadioDDownScreen, // Multiple Choice
    4: ChckRadioDDownFrmInstance, // 4: CheckRadioDDownScreen, // Single RadioButton Screen
    5: ChckRadioDDownFrmInstance, // 5: CheckRadioDDownScreen, // DropDown screen
    6: FinalStepFrmInstance // 6 : Final Step screen.
}