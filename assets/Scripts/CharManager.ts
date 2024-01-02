import ManagerBase from "./ManagerBase";
import { MessageType } from "./Message";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CharManager extends ManagerBase {
    static Instance: CharManager;

    onLoad () {
        super.onLoad();
        CharManager.Instance = this;
    }

    SetMessageType(): number {
        return MessageType.Type_Char;
    }
    
}