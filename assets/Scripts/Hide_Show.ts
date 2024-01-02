import ComponentBase from "./ComponentBase";
import Message, { MessageType } from "./Message";
import UIManager from "./UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Hide_Show extends ComponentBase {

    start () {
        UIManager.Instance.RegisterReceiver(this);
    }

    ReceiveMessage(msg: Message){
        super.ReceiveMessage(msg);
        if(msg.Command == MessageType.UI_HideAndShow){
            if(msg.Content == 'hide'){
                this.node.getChildByName('Hide_Button').active = false;
            }
            if(msg.Content == 'show'){
                this.node.getChildByName('Hide_Button').active = true;
            }
        }
            
    }

    Controller_Hide(){
        this.node.getChildByName('Hide_Button').active = false;
    }

    Controller_Show(){
        this.node.getChildByName('Hide_Button').active = true;
    }

    update (dt) {
        this.node.x = cc.Camera.main.node.x;
        this.node.y = cc.Camera.main.node.y;
    }
}
