import { useEffect, useState } from "react";

import OBR from "@owlbear-rodeo/sdk";


import addIcon from "./assets/icon.svg";

import { getPluginId } from "./getPluginId";
import { isPlainObject } from "./isPlainObject";

/** Check that the item metadata is in the correct format */
function isMetadata(
    metadata: unknown
): metadata is { count: string; active: boolean } {
    return (
        isPlainObject(metadata) &&
        typeof metadata.count === "string" &&
        typeof metadata.active === "boolean"
    );
}

export function ApproveSetter() {

    const [attachedCharacterId, setAttachedCharacterId] = useState<int>(0);
    const [attachedName, setName] = useState<string>();


    useEffect(() => {
        OBR.contextMenu.create({
            icons: [
                {
                    icon: "/icon.svg",
                    label: "Set for approval",
                    filter: {
                        every: [
                           { key: "layer", value: "CHARACTER"},
                           // { key: "layer", value: "MOUNT" },
                           // { key: "type", value: "IMAGE" },
                           // { key: ["metadata", getPluginId("metadata")], value: undefined },
                        ]
                    },
                }
            ],
            id: getPluginId("menu/toggle"),
            onClick(context: any)
            {
                setAttachedCharacterId(context.items[0].id);
                setName(OBR.scene.items.getItems([attachedCharacterId]).name);
            },
        });
    }, []);


    function showApproval(isApproved: boolean) {
        //OBR.notification.show("Approve it");
        try {
            OBR.notification.show(`${attachedName} ${isApproved ? "approves." : "disapproves."}`);
        }
        catch (error: any) {
            OBR.notification.show(`Error ${attachedCharacterId}l: ${error.message}`);
        };
        
    };

    return (
        <>

            <div className="card">
                
                {attachedName}
                
                <button onClick={() => showApproval(true)}>
                    Approve
                </button >
                <button onClick={() => showApproval(false)}>
                    Disapprove
                </button>

            </div>

        </>
    );
}
