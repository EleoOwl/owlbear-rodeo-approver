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

            OBR.player.setMetadata({
                [getPluginId("metadata")]: {
                    characterName: OBR.player.name,
                    characterImageUrl: ""
                }
            });
        });
        OBR.onReady(() => {

            OBR.popover.open({
                id: getPluginId("popover"),
                url: "/popover.html",
                height: 500,
                width: 800,
                hidePaper: true,
                anchorOrigin: { horizontal: "RIGHT", vertical: "BOTTOM" },
                anchorPosition: { left: 200, top: 200 },
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