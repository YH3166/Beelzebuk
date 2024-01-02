import ComponentBase from "./ComponentBase";
import MessageCenter from "./MessageCenter";
import Message, { MessageType } from "./Message";
import { GetProp, PropertyName } from "./PropertyItem";
import { player1 } from "./playerControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class equipmentControl extends ComponentBase {

    PropDes(){
        MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Menu_Restore,'');
        let PropName = this.node.getComponent(cc.Label).string;
        MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Prop_Des,PropName);
        this.node.getChildByName('Remove').active = true;
    }

    Equipement_Remove(){
        MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Menu_Restore,'');
        let PropName = this.node.getComponent(cc.Label).string;
        MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Player_Update,['equipment','remove',GetProp(PropertyName[PropName]).Name]);
        MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Player_Update,['prop','add',GetProp(PropertyName[PropName]).Name]);
        player1.actionPoint--;
        MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Menu_Update, '');
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Update, '');
    }
    
}
