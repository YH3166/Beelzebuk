import Message from "./Message";
const {ccclass, property} = cc._decorator;

@ccclass
export default class ComponentBase extends cc.Component {
    //接收消息
    ReceiveMessage(message: Message){
    
    }
    
}
