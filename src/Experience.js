import {MaxDataProvider} from "./DataContext";
import DummyDisplay from "./DummyDisplay";

export default function Experience(){
    return(<>
    <MaxDataProvider>
        <DummyDisplay/>
    </MaxDataProvider>
    </>
    )
}