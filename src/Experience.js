import {MaxDataProvider} from "./DataContext";
import DummyDisplay from "./DummyDisplay";
import {VariablesProvider} from "./VariablesProvider";
import {KnobValuesProvider} from "./KnobValuesContext";

export default function Experience(){
    return(<>
    <MaxDataProvider>
        <VariablesProvider>
            <KnobValuesProvider>
                <DummyDisplay/>
            </KnobValuesProvider>
        </VariablesProvider>
    </MaxDataProvider>
    </>
    )
}