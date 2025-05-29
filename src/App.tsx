import { useEffect, useState } from 'react'
import './App.css'
import { ApproveSetter } from './ApproveSetter'

import OBR from "@owlbear-rodeo/sdk";


function App() {

    const [sceneReady, setSceneReady] = useState(false);
    useEffect(() => {

        OBR.onReady(() => {
            OBR.scene.isReady().then(setSceneReady);
            return OBR.scene.onReadyChange(setSceneReady);
        });


        }, []);

    if (sceneReady) {
        return (<> <button>
            Approve
        </button > <ApproveSetter /></>);
    }
    else {
        return (<div className="App"><button>
            else Approve
        </button > </div>)
    }

}

export default App;