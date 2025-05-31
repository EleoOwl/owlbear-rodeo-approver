import { useEffect, useState } from "react";

import OBR from "@owlbear-rodeo/sdk";


import addIcon from "./assets/icon.svg";

import { Grid } from '@mui/material'

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
    const [attachedImageUrl, setImage] = useState<string>();

    const [meta, setMeta] = useState<any>();

    const [start, setStart] = useState<boolean>();

    useEffect(() => {
        if (!start) {
            setStart(true);
            OBR.player.getName().then(setName);
        }
    });

    useEffect(() => {
        if (!start) {
            OBR.player.setMetadata({
                [getPluginId("metadata")]: {
                    attachedCharachterName: setName,
                    attachedCharacterImageUrl: ""
                }

            });
        }
    });


    useEffect(() => {
        OBR.contextMenu.create({
            icons: [
                {
                    icon: "/icon.svg",
                    label: "Set for approval",
                    filter: {
                        every: [
                            { key: "layer", value: "CHARACTER" },
                            // { key: "layer", value: "MOUNT" },
                            // { key: "type", value: "IMAGE" },
                            // { key: ["metadata", getPluginId("metadata")], value: undefined },
                        ]
                    },
                }
            ],
            id: getPluginId("menu/toggle"),
            onClick(context: any) {

                setAttachedCharacterId(context.items[0].id);
                setName(context.items[0].name);
                setImage(context.items[0].image.url);

                OBR.player.setMetadata({
                    [getPluginId("metadata")]: {
                        attachedCharachterName: context.items[0].name,
                        attachedCharacterImageUrl: context.items[0].image.url
                    }
                });
                OBR.player.getMetadata([getPluginId("metadata")]).then(setMeta);
                
            },
        });
    }, []);

    useEffect(() => {
        OBR.action.setHeight(450);
    }, []);

      function showApproval(isApproved: boolean) {

         try {

             console.log(meta);
             OBR.notification.show(`${attachedName} ${isApproved ? "approves." : "disapproves."}`);

            //OBR.popover.open({
            //    id: getPluginId("popover"),
            //    url: "/popover.html",
            //    height: 80,
            //    width: 200,
            //    hidePaper: true,
            //    anchorOrigin: { horizontal: "RIGHT", vertical: "BOTTOM" },
            //    anchorPosition: { left: 200, top: 200 }
            //});
        }
        catch (error: any) {
            OBR.notification.show(`Error ${attachedCharacterId}: ${error.message}`);
        };

    };


    return (
        <>
            <div>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <img width="200" height="200" src={attachedImageUrl} />
                    </Grid>
                    <Grid size={12}>
                        <font size="20"> {attachedName} </font>
                    </Grid>
                    <Grid size={12}>
                        <font size="20"> {meta?.attachedCharachterName} </font>
                    </Grid>
                    <Grid size={6}>
                        <button onClick={async () => showApproval(true)}>
                            Approve
                        </button >
                    </Grid>
                    <Grid size={6}>
                        <button onClick={async () => showApproval(false)}>
                            Disapprove
                        </button>
                    </Grid>
                </Grid>
            </div>

        </>
    );
}
