import { useEffect, useState } from 'react'
import './App.css'

import OBR from "@owlbear-rodeo/sdk";

import { getPluginId } from "./getPluginId";

import type { ApproveItem } from "./ApproveItem";
import List from "@mui/material/List";

import { Guid } from 'js-guid';


export function ApprovePopupWindow() {

    const [approveItems, setApproveItems] = useState<ApproveItem[]>([]);


    useEffect(() => {
        console.log("rendered popup window");

        let unsubscribe: () => void;

        OBR.onReady(() => {
            unsubscribe = OBR.broadcast.onMessage("owlbear-approver", (event: any) => {
                console.log("approve event catched");
                setApproveItems(items => [
                    ...items,
                    {
                        approverName: event.data.attachedName,
                        approverImageUrl: event.data.attachedImageUrl,
                        approved: event.data.isApproved,
                    },
                ]);

                setTimeout(() => {
                    setApproveItems(prev => prev.slice(1));
                }, 5000);

            });
        });

        return () => {
            setTimeout(() => {
                if (unsubscribe) {
                    unsubscribe();
                    console.log("Broadcast listener removed");
                } else {
                    console.warn("Listener was not removed because unsubscribe was undefined");
                }
            }, 50);
        };
    }, []);

    const hidden = approveItems.length === 0;
    useEffect(() => {
        if (hidden) {
            OBR.popover.setHeight(getPluginId("popover"), 0);
            OBR.popover.setWidth(getPluginId("popover"), 0);
        } else {
            OBR.popover.setHeight(getPluginId("popover"), 250);
            OBR.popover.setWidth(getPluginId("popover"), 350);
        }
    }, [hidden]);


    return (
        <List  sx={{
            overflow: "visible",    
            maxHeight: "none",       
            height: "auto",          
        }}
            component="div"
        >
            {approveItems.slice(0, 3)
                .map((approve) => (
                    <div key={Guid.newGuid().toString()} >

                        <span style={{
                            backgroundColor: approve.approved ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)",
                            fontSize: "18px",
                            padding: "4px 8px",
                            marginLeft: "10px",
                            borderRadius: "4px",
                            display: "inline-flex",
                            alignItems: "center"
                        }}>

                            <img width="30" height="30" src={approve.approverImageUrl} />

                            {approve.approverName} {approve.approved ? "одобряет" : "осуждает"}

                        </span>
                    </div>
                ))}
        </List>
   );

}
