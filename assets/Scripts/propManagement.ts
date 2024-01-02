import CharManager from "./CharManager";
import ComponentBase from "./ComponentBase";
import Message, { MessageType } from "./Message";
import { GetProp, PropertyName, PropertyType } from "./PropertyItem";
import { player1 } from "./playerControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class propManagement extends ComponentBase {



    start () {
        CharManager.Instance.RegisterReceiver(this);
    }

    ReceiveMessage(msg: Message){
        super.ReceiveMessage(msg);
        //给出道具描述
        if(msg.Command == MessageType.Char_Prop_Des){
            // @ts-ignore
            let Des = GetProp(PropertyName[msg.Content]).PropDes;
            this.node.getChildByName('Des').getComponent(cc.Label).string = Des;
            this.node.getChildByName('Des').active = true;
        }
        if(msg.Command == MessageType.Char_Prop){
            this.AddProp(msg.Content);
        }
    }

    AddProp(name:PropertyName){
        cc.loader.loadRes('Prop_item', cc.Prefab, (res,propPre) =>{
            let propItem = cc.instantiate(propPre);
            propItem.name = PropertyName[name];
            propItem.setParent(this.node.getChildByName('Char_Prop_Scroll').getChildByName('view').getChildByName('content'));
            let propLength = this.node.getChildByName('Char_Prop_Scroll').getChildByName('view').getChildByName('content').children.length;
            propItem.y = -(propLength-1)*25;
            propItem.getComponent(cc.Label).string = PropertyName[name];
            propItem.getChildByName('Prop_type').getComponent(cc.Label).string = PropertyType[GetProp(name).Type];
            propItem.getChildByName('Use').active = false;
        });
    }

}
