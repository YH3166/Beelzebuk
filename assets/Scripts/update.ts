import ComponentBase from "./ComponentBase";
import Message, { MessageType } from "./Message";
import MessageCenter from "./MessageCenter";
import UIManager from "./UIManager";
import { player1 } from "./playerControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class update extends ComponentBase {

    start () {
        UIManager.Instance.RegisterReceiver(this);
    }

    
    ReceiveMessage(msg: Message){
        super.ReceiveMessage(msg);
        if(msg.Command == MessageType.UI_Update){
            let info: string = player1.name + "  HP：";
            if(player1.hp == 0){
                info = info + '<color=#ff0000>' + player1.hp + '</c>' + '/' + player1.hpMax + '  移动点：';
            } else {
                info = info + player1.hp + '/' + player1.hpMax + '  移动点：';
            }
            if(player1.movePoint == 0){
                info = info + '<color=#ff0000>' + player1.movePoint + '</c>' + '/' + player1.movePointMax + '  附加行动点：';
            } else {
                info = info + player1.movePoint + '/' + player1.movePointMax + '  附加行动点：';
            }
            if(player1.actionPoint == 0){
                info = info + '<color=#ff0000>' + player1.actionPoint + '</c>' + '/' + player1.actionPointMax + '  攻击点：';
            } else {
                info = info + player1.actionPoint + '/' + player1.actionPointMax + '  攻击点：';
            }
            if(player1.attackPoint == 0){
                info = info + '<color=#ff0000>' + player1.attackPoint + '</c>';
            } else {
                info = info + player1.attackPoint;
            }
            this.node.getComponent(cc.RichText).string = info;

            if(player1.movePoint == 0){
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Disable, 'move');
            }
            if(player1.movePoint != 0){
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Enable, 'move');
            }
            if(player1.actionPoint == 0){
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Disable, 'action');
            }
            if(player1.actionPoint != 0){
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Enable, 'action');
            }
            if(player1.attackPoint == 0){
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Disable, 'attack');
            }
            if(player1.attackPoint != 0){
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Enable, 'attack');
            }
        }
    }

    update (dt) {
        this.node.x = cc.Camera.main.node.x + 20;
        this.node.y = cc.Camera.main.node.y + 620;
    }
}
