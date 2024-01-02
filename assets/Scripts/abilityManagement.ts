import { AbilityName, GetAbility } from "./AbilityItem";
import CharManager from "./CharManager";
import ComponentBase from "./ComponentBase";
import Message, { MessageType } from "./Message";

const {ccclass, property} = cc._decorator;

@ccclass
export default class abilityManagement extends ComponentBase {
    
    start () {
        CharManager.Instance.RegisterReceiver(this);
        //this.AddAbility(AbilityName.夜行者);
        //this.AddAbility(AbilityName.枪弩熟习);
    }


    ReceiveMessage(msg: Message){
        super.ReceiveMessage(msg);
        //添加技能描述
        if(msg.Command == MessageType.Char_Ability_Des){
            // @ts-ignore
            let Des = GetAbility(AbilityName[msg.Content]).AbilityDes;
            this.node.getChildByName('Des').getComponent(cc.Label).string = Des;
            this.node.getChildByName('Des').active = true;
        }
        if(msg.Command == MessageType.Char_Ability){
            this.AddAbility(msg.Content);
        }
    }

    AddAbility(name:AbilityName){
        cc.loader.loadRes('Ability_item', cc.Prefab, (res,abilityPre) =>{
            let abilityItem = cc.instantiate(abilityPre);
            abilityItem.setParent(this.node.getChildByName('Char_Ability_Scroll').getChildByName('view').getChildByName('content'));
            let abilityLength = this.node.getChildByName('Char_Ability_Scroll').getChildByName('view').getChildByName('content').children.length;
            abilityItem.y = -(abilityLength-1)*25;
            abilityItem.getComponent(cc.Label).string = AbilityName[name];
        });
    }

}
