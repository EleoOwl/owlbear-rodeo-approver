import OBR from "@owlbear-rodeo/sdk";

export function setupApprover(element: any) {
    
    const pressApprover = () => {
        
        OBR.notification.show(element.innerHTML);
    };
    element.addEventListener("click", () => pressApprover());
}