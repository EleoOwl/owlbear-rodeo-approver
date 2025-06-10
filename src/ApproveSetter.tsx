import { useEffect, useState } from "react";

import OBR from "@owlbear-rodeo/sdk";


import { Grid } from '@mui/material'

import heartBrokenIconUrl from './assets/heartbroken.svg';

import heartIconUrl from './assets/heart.svg';

import { getPluginId } from "./getPluginId";

export const getOBR = () => {
    return OBR.isAvailable ? OBR : undefined;
};


export function ApproveSetter() {

    const [attachedCharacterId, setAttachedCharacterId] = useState<number>(0);
    const [attachedName, setName] = useState<string>();
    const [attachedImageUrl, setImage] = useState<string>();


    const [start, setStart] = useState<boolean>();

    useEffect(() => {
        if (!start) {
            setStart(true);
            OBR.player.getName().then(setName);
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
                            { key: "layer", value: "CHARACTER" }
                        ]
                    },
                }
            ],
            id: getPluginId("menu/toggle"),
            onClick(context: any) {

                setAttachedCharacterId(context.items[0].id);
                setName(context.items[0].name);
                setImage(context.items[0].image.url);
            },
        });
    }, []);

    useEffect(() => {
        OBR.action.setHeight(450);
    }, []);


    let approvalInProgress = false;

    function showApproval(isApproved: boolean) {

        if (approvalInProgress) return;
        approvalInProgress = true;
        try {

            OBR.notification.show(`${attachedName} ${isApproved ? "approves." : "disapproves."}`);


            OBR.broadcast.sendMessage("owlbear-approver", {
                attachedName: attachedName,
                attachedImageUrl: attachedImageUrl,
                isApproved: isApproved
            });

        }
        catch (error: any) {
            OBR.notification.show(`Error ${attachedCharacterId}: ${error.message}`);
        }
        finally {
            approvalInProgress = false;
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
                        <span style={{ fontSize: "20px" }}> {attachedName} </span>
                    </Grid>
                    <Grid size={6}>
                        <button onClick={async () => showApproval(true)}>
                            <img src={heartIconUrl} style={{ verticalAlign: "middle" }} width={20} height={20} />
                            Approve
                        </button >
                    </Grid>
                    <Grid size={6}>
                        
                        <button onClick={async () => showApproval(false)}>
                            <img src={heartBrokenIconUrl} style={{ verticalAlign: "middle" }} width={20} height={20} />
                            Disapprove
                        </button>
                    </Grid>
                </Grid>
            </div>

        </>
    );
}
