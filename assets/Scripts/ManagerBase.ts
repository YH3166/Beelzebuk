import ComponentBase from "./ComponentBase";
import Message, { MessageType } from "./Message";
import MessageCenter from "./MessageCenter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ManagerBase extends ComponentBase{
    //管理的消息接收者数组
    ReceiveList: ComponentBase[] = [];
    //当前管理类接收的具体消息类型
    messageType: MessageType

    onLoad(){
        //设置当前管理类接收的消息类型
        this.messageType = this.SetMessageType();
        //把管理类添加到消息中心列表中
        MessageCenter.Managers.push(this);
    }

    //设置当前管理类的消息类型
    SetMessageType(){
        return MessageType.Type_UI;
    }

    //注册消息监听
    RegisterReceiver(cb: ComponentBase){
        this.ReceiveList.push(cb);
    }

     //接收消息
     ReceiveMessage(message: Message){
        super.ReceiveMessage(message);
        //判断消息类型
        if(message.Type != this.messageType){
            return;
        }
        //向下层分发消息
        for(let cb of this.ReceiveList){
            cb.ReceiveMessage(message);
        }
    }
}
