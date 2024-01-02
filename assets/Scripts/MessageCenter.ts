import ComponentBase from "./ComponentBase";
import Message, { MessageType } from "./Message";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MessageCenter{
    //管理类列表
    static Managers: ComponentBase[] = [];

    //发送消息
    static SendMessage(msg: Message){
        for(let manager of this.Managers){
            manager.ReceiveMessage(msg);
        }
    }

    //发送消息
    static SendCustomMessage(type: MessageType, command: MessageType, content: any){
        let msg = new Message(type, command, content);
        this.SendMessage(msg);

    }
}
