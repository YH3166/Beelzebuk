import ComponentBase from "./ComponentBase";
import MessageCenter from "./MessageCenter";
import Message, { MessageType } from "./Message";
import { GetProp, PropertyName, PropertyType } from "./PropertyItem";
import { player1 } from "./playerControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class propControl extends ComponentBase {

    PropDes(){
        MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Menu_Restore,'');
        let PropName = this.node.getComponent(cc.Label).string;
        MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Prop_Des, PropName);
        this.node.getChildByName('Use').active = true;
        if(GetProp(PropertyName[PropName]).Type as number < 7){
            this.node.getChildByName('Use').getChildByName('Background').getChildByName('Label').getComponent(cc.Label).string = '装备';
        }
    }

    Prop_Use(){
        MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Menu_Restore,'');
        let PropName = this.node.getComponent(cc.Label).string;
        player1.actionPoint--;
        //若prop是装备
        if(GetProp(PropertyName[PropName]).Type as number < 7){
            MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Player_Update, ['equipment','add',GetProp(PropertyName[PropName]).Name]);
            MessageCenter.SendCustomMessage(MessageType.Type_Player, MessageType.Player_Update, ['prop','remove',GetProp(PropertyName[PropName]).Name]);
            MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Menu_Update, '');
        }
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Update, '');
    }
}
