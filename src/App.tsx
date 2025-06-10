import { useEffect, useState } from 'react'
import './App.css'
import { ApproveSetter } from './ApproveSetter'

import OBR from "@owlbear-rodeo/sdk";

import { getPluginId } from "./getPluginId";

function App() {

    const [sceneReady, setSceneReady] = useState(false);
    useEffect(() => {

        OBR.onReady(() => {
            OBR.scene.isReady().then(setSceneReady);
            return OBR.scene.onReadyChange(setSceneReady);
        });
        OBR.onReady(() => {

            OBR.popover.open({
                id: getPluginId("popover"),
                url: "/popover.html",
                height: 150,
                width: 400,
                hidePaper: true,
                anchorOrigin: { horizontal: "RIGHT", vertical: "BOTTOM" },
                anchorPosition: { left: 0, top: 0 },
                disableClickAway: true
            });
        });

        }, []);

    if (sceneReady) {
        return (<> <ApproveSetter /></>);
    }
    else {
        return (<div className="App"><button>
            else Approve
        </button > </div>)
    }

}

export default App;