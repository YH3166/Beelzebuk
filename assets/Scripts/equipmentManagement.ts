import CharManager from "./CharManager";
import ComponentBase from "./ComponentBase";
import Message, { MessageType } from "./Message";
import { GetProp, PropertyName } from "./PropertyItem";
import { player1 } from "./playerControl";

const {ccclass, property} = cc._decorator;

@ccclass
export default class equipmentManagement extends ComponentBase {
    
    start () {
        CharManager.Instance.RegisterReceiver(this);
    }


    ReceiveMessage(msg: Message){
        super.ReceiveMessage(msg);
        
        if(msg.Command == MessageType.Char_Equipment){
            if(GetProp(msg.Content).Type as number == 6){
                this.AddArmor(msg.Content);
            }else{
                this.AddWeapon(msg.Content);
            }
        }
    }

    
    AddWeapon(name:PropertyName){
        cc.loader.loadRes('Equipment_item', cc.Prefab, (res,equipmentPre) =>{
            let equipmentItem = cc.instantiate(equipmentPre);
            equipmentItem.name = PropertyName[name];
            equipmentItem.setParent(this.node.getChildByName('Char_Equipment_Scroll').getChildByName('view').getChildByName('weapon'));
            let equipmentLength = this.node.getChildByName('Char_Equipment_Scroll').getChildByName('view').getChildByName('weapon').children.length;
            equipmentItem.y = -(equipmentLength-1-4)*25;
            equipmentItem.getComponent(cc.Label).string = PropertyName[name];
            equipmentItem.getChildByName('Remove').active = false;
        });
    }

    AddArmor(name:PropertyName){
        cc.loader.loadRes('Equipment_item', cc.Prefab, (res,equipmentPre) =>{
            let equipmentItem = cc.instantiate(equipmentPre);
            equipmentItem.name = PropertyName[name];
            equipmentItem.setParent(this.node.getChildByName('Char_Equipment_Scroll').getChildByName('view').getChildByName('weapon'));
            equipmentItem.getComponent(cc.Label).string = PropertyName[name];
            equipmentItem.getChildByName('Remove').active = false;
            if(name == PropertyName.锦瑟){
                equipmentItem.y = -3*25;
                this.node.getChildByName('Char_Equipment_Scroll').getChildByName('view').getChildByName('weapon').getChildByName('Armor2').active = true;
            }else{
                equipmentItem.y = -2*25;
            }
        });
    }
}
