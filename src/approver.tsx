import OBR from "@owlbear-rodeo/sdk";

export function setupApprover(element) {
    
    const pressApprover = () => {
        
        OBR.notification.show(element.innerHTML);
    };
    element.addEventListener("click", () => pressApprover());
}