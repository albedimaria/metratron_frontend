import {MaxDataProvider} from "./DataContext";
import DummyDisplay from "./DummyDisplay";
import {VariablesProvider} from "./VariablesProvider";
import {KnobValuesProvider} from "./KnobValuesContext";
import HexagonRendering from "./HexagonRendering";
import GeomKnobsOut from "./KnobsOut";

export default function Experience(){
    return(<>

            <MaxDataProvider>
                <VariablesProvider>
                    <KnobValuesProvider>
                        <GeomKnobsOut/>
                        <DummyDisplay/>
                        <HexagonRendering/>
                    </KnobValuesProvider>
                </VariablesProvider>
            </MaxDataProvider>
    </>
    )
}