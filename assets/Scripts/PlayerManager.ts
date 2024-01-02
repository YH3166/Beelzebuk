import ManagerBase from "./ManagerBase";
import Message, { MessageType } from "./Message";
import { player1 } from "./playerControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayerManager extends ManagerBase {
    static Instance: PlayerManager;

    onLoad () {
        super.onLoad();
        PlayerManager.Instance = this;
    }

    SetMessageType(): MessageType {
        return MessageType.Type_Player;
    }
    
}
