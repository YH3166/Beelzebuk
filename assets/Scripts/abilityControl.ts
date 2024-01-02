import ComponentBase from "./ComponentBase";
import MessageCenter from "./MessageCenter";
import Message, { MessageType } from "./Message";
const {ccclass, property} = cc._decorator;




@ccclass
export default class abilityControl extends ComponentBase {

    AbilityDes(){
        MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Menu_Restore,'');
        let abilityName = this.node.getComponent(cc.Label).string;
        MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Ability_Des, abilityName);
    }
}
