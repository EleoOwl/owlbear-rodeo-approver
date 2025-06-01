import { useEffect, useState, useRef } from 'react'
import './App.css'
import { ApproveSetter } from './ApproveSetter'

import OBR from "@owlbear-rodeo/sdk";

import { getPluginId } from "./getPluginId";

import type { ApproveItem } from "./ApproveItem";
import List from "@mui/material/List";
import Box from "@mui/material/Box";

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
    const listRef = useRef<HTMLUListElement>(null);

    function resetApprovalsList() {
        console.log("approvals reset");
        setApproveItems([]);
    }

    function popApproveItems() {

        console.log("popping");
        setApproveItems(approveItems.slice(1));
    }

    return (<Box sx={{ overflowY: "auto" }}>
        <List ref={listRef}>
            {approveItems.slice(0, 3)
                .map((approve) => (
                    <div key={Guid.newGuid()}>
                        <img width="30" height="30" src={approve.approverImageUrl} />

                        <font size="5" vertical-align="bottom"> {approve.approverName} {approve.approved ? "одобряет" : "осуждает"} </font>
                    </div>
                ))}
        </List>
        <button onClick={resetApprovalsList}>Стереть</button>
    </Box>);

}
