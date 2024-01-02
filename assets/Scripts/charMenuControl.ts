import ComponentBase from "./ComponentBase";
import Message, { MessageType } from "./Message";
import MessageCenter from "./MessageCenter";
import CharManager from "./CharManager";
import { player1 } from "./playerControl";
import { AddOnEffect, GetProp, PropertyName, PropertyType } from "./PropertyItem";


const {ccclass, property} = cc._decorator;



@ccclass
export default class charMenuControl extends ComponentBase {
    
    ReceiveMessage(msg: Message){
        super.ReceiveMessage(msg);
        //调出角色页面
        if(msg.Command == MessageType.Character_Menu){
            if(msg.Content == 'open'){
                this.node.active = true;
            }
            if(msg.Content == 'close'){
                this.node.active = false;
            }
        }
        if(msg.Command == MessageType.Char_Menu_Restore){
            this.CharMenuRestore();
        }
        if(msg.Command == MessageType.Char_Menu_Update){
            this.CharMenuUpdate();
        }
        if(msg.Command == MessageType.Char_Action){
            if(msg.Content == 'disable'){
                let weapon:cc.Node = this.node.getChildByName('Char_Equipment').getChildByName('Char_Equipment_Scroll').getChildByName('view').getChildByName('weapon');
                for(let i=4; i<weapon.childrenCount; i++){
                    weapon.children[i].getChildByName('Remove').getComponent(cc.Button).interactable = false;
                }
                let content:cc.Node = this.node.getChildByName('Char_Prop').getChildByName('Char_Prop_Scroll').getChildByName('view').getChildByName('content');
                for(let i=0; i<content.childrenCount; i++){
                    content.children[i].getChildByName('Use').getComponent(cc.Button).interactable = false;
                }
            }
            if(msg.Content == 'enable'){
                let weapon:cc.Node = this.node.getChildByName('Char_Equipment').getChildByName('Char_Equipment_Scroll').getChildByName('view').getChildByName('weapon');
                for(let i=4; i<weapon.childrenCount; i++){
                    weapon.children[i].getChildByName('Remove').getComponent(cc.Button).interactable = true;
                }
                let content:cc.Node = this.node.getChildByName('Char_Prop').getChildByName('Char_Prop_Scroll').getChildByName('view').getChildByName('content');
                for(let i=0; i<content.childrenCount; i++){
                    content.children[i].getChildByName('Use').getComponent(cc.Button).interactable = true;
                }
            }
        }
    }


    start () {
        //接收Char信息
        CharManager.Instance.RegisterReceiver(this);
        this.node.on(cc.Node.EventType.TOUCH_START,(event)=>{
            this.CharMenuRestore();
            this.CharMenuUpdate();
        });
        this.node.active = false;
        this.node.getChildByName('Char_Ability').getChildByName('Des').active = false;
        this.node.getChildByName('Char_Prop').getChildByName('Des').active = false;
        this.node.getChildByName('Char_Equipment').getChildByName('Char_Equipment_Scroll').getChildByName('view').getChildByName('weapon').getChildByName('Armor2').active = false;
    }

    
    update (dt) {
        this.node.x = cc.Camera.main.node.x + 480;
        this.node.y = cc.Camera.main.node.y + 320;
    }

    CharMenuRestore(){
        this.node.getChildByName('Char_Ability').getChildByName('Des').active = false;
        this.node.getChildByName('Char_Prop').getChildByName('Des').active = false;
        let weapon:cc.Node = this.node.getChildByName('Char_Equipment').getChildByName('Char_Equipment_Scroll').getChildByName('view').getChildByName('weapon');
        for(let i=4; i<weapon.childrenCount; i++){
            weapon.children[i].getChildByName('Remove').active = false;
        }
        let content:cc.Node = this.node.getChildByName('Char_Prop').getChildByName('Char_Prop_Scroll').getChildByName('view').getChildByName('content');
        for(let i=0; i<content.childrenCount; i++){
            content.children[i].getChildByName('Use').active = false;
        }
        if(player1.actionPoint==0){
            for(let i=4; i<weapon.childrenCount; i++){
                weapon.children[i].getChildByName('Remove').getComponent(cc.Button).interactable = false;
            }
            for(let i=0; i<content.childrenCount; i++){
                content.children[i].getChildByName('Use').getComponent(cc.Button).interactable = false;
            }
        }
    }

    CharMenuUpdate(){
        //更新名字及点数
        this.node.getChildByName('Char_Name').getComponent(cc.Label).string = player1.name;
        this.node.getChildByName('Char_Name').getChildByName('Char_HP').getComponent(cc.Label).string = 'HP: ' + player1.hp + '/' + player1.hpMax;
        this.node.getChildByName('Char_Name').getChildByName('Char_Move').getComponent(cc.Label).string = '移动点: ' + player1.movePoint + '/' + player1.movePointMax;
        this.node.getChildByName('Char_Name').getChildByName('Char_Action').getComponent(cc.Label).string = '附加行动点: ' + player1.actionPoint + '/' + player1.actionPointMax;
        this.node.getChildByName('Char_Name').getChildByName('Char_Attack').getComponent(cc.Label).string = '攻击点: ' + player1.attackPoint;

        //更新状态
        let status:string = '';
        if(player1.status){
            status = '状态：';
            status = status + AddOnEffect[player1.status[0]] + '（' + player1.status[1] + '回合）';
            for(let i = 1; i < player1.status.length/2; i++){
                if(player1.status[2*i-1]!=0){
                    status = status + '\n      ' + AddOnEffect[player1.status[2*i]] + '（' + player1.status[2*i+1] + '回合）';
                }
            }
            this.node.getChildByName('Char_Name').getChildByName('Char_Status').getChildByName('view').getChildByName('content').height = 25*player1.status.length/2;
        }
        this.node.getChildByName('Char_Name').getChildByName('Char_Status').getChildByName('view').getChildByName('content').getChildByName('item').getComponent(cc.Label).string = status;

        //更新属性
        this.node.getChildByName('Char_Attribute').getChildByName('Hit').getComponent(cc.Label).string = '命中加值            +' + player1.hit;
        this.node.getChildByName('Char_Attribute').getChildByName('Hit_Melee').getComponent(cc.Label).string = '近战命中加值        +' + player1.hitMelee;
        this.node.getChildByName('Char_Attribute').getChildByName('Damage_Melee').getComponent(cc.Label).string = '近战伤害加值        +' + player1.damageMelee;
        this.node.getChildByName('Char_Attribute').getChildByName('Evasion').getComponent(cc.Label).string = '闪避加值            +' + player1.evasion;
        this.node.getChildByName('Char_Attribute').getChildByName('Defense').getComponent(cc.Label).string = '防御加值            +' + player1.defense;

        //更新熟练度
        let skillNum:number = 0;
        let skill:string = '';
        if(player1.skillBareHand>0){
            skill = skill + "徒手近战武器    +" + player1.skillBareHand + '\n';
            skillNum++;
        }
        if(player1.skillMeleeLong>0){
            skill = skill + "长兵近战武器    +" + player1.skillMeleeLong + '\n';
            skillNum++;
        }
        if(player1.skillMeleeShort>0){
            skill = skill + "短兵近战武器    +" + player1.skillMeleeShort + '\n';
            skillNum++;
        }
        if(player1.skillMeleeMech>0){
            skill = skill + "机械近战武器    +" + player1.skillMeleeMech + '\n';
            skillNum++;
        }
        if(player1.skillRangeArcher>0){
            skill = skill + "弓弩远程武器    +" + player1.skillRangeArcher + '\n';
            skillNum++;
        }
        if(player1.skillRangeGun>0){
            skill = skill + "枪械远程武器    +" + player1.skillRangeGun + '\n';
            skillNum++;
        }
        this.node.getChildByName('Char_Equipment').getChildByName('Char_Equipment_Point').getChildByName('Char_Equipment_Point_Scroll').getChildByName('view').getChildByName('content').getChildByName('Skill_item').getComponent(cc.Label).string = skill;
        this.node.getChildByName('Char_Equipment').getChildByName('Char_Equipment_Point').getChildByName('Char_Equipment_Point_Scroll').getChildByName('view').getChildByName('content').height = 25*skillNum;
        if(skillNum == 0){
            this.node.getChildByName('Char_Equipment').getChildByName('Char_Equipment_Point').getChildByName('Char_Equipment_Point_Scroll').getChildByName('view').getChildByName('content').getChildByName('Skill_item').getComponent(cc.Label).string = '无';
            this.node.getChildByName('Char_Equipment').getChildByName('Char_Equipment_Point').getChildByName('Char_Equipment_Point_Scroll').getChildByName('view').getChildByName('content').height = 25;
        }

        //更新武器
        this.node.getChildByName('Char_Equipment').getChildByName('Char_Equipment_Scroll').getChildByName('view').getChildByName('weapon').getChildByName('Armor2').active = false;
        for(let i = 4; i < this.node.getChildByName('Char_Equipment').getChildByName('Char_Equipment_Scroll').getChildByName('view').getChildByName('weapon').childrenCount; i++){
            this.node.getChildByName('Char_Equipment').getChildByName('Char_Equipment_Scroll').getChildByName('view').getChildByName('weapon').children[i].destroy();
        }
        setTimeout(() => {
            if(player1.weapon!=null){
                MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Equipment, player1.weapon[0]);
                if(player1.weapon.length == 2){
                    MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Equipment, player1.weapon[1]);
                }
            }
            if(player1.armor1){
                MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Equipment, player1.armor1);
            }
            if(player1.armor2){
                MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Equipment, player1.armor2);
                this.node.getChildByName('Char_Equipment').getChildByName('Char_Equipment_Scroll').getChildByName('view').getChildByName('weapon').getChildByName('Armor2').active = true;
            }
        }, 100);

        //更新技能
        let ability = player1.ability.sort();
        for(let i = 0; i < this.node.getChildByName('Char_Ability').getChildByName('Char_Ability_Scroll').getChildByName('view').getChildByName('content').childrenCount; i++){
            this.node.getChildByName('Char_Ability').getChildByName('Char_Ability_Scroll').getChildByName('view').getChildByName('content').children[i].destroy();
        }
        setTimeout(() => {
            for(let i = 0; i < ability.length; i++){
                MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Ability, ability[i]);
            }
        }, 100);
        this.node.getChildByName('Char_Ability').getChildByName('Char_Ability_Scroll').getChildByName('view').getChildByName('content').height = 20*ability.length;

        //更新道具
        let prop: any[] = null;
        let propNum:number = player1.props.length;
        for(let i = 0; i < this.node.getChildByName('Char_Prop').getChildByName('Char_Prop_Scroll').getChildByName('view').getChildByName('content').childrenCount; i++){
            this.node.getChildByName('Char_Prop').getChildByName('Char_Prop_Scroll').getChildByName('view').getChildByName('content').children[i].destroy();
        }
        if(propNum>0){
            prop = [{name:player1.props[0], type:PropertyType[GetProp(player1.props[0]).Type]}];
            for(let i = 1; i < propNum; i++){
                prop.push({name:player1.props[i], type:PropertyType[GetProp(player1.props[i]).Type]});
            }
        }
        
        // Custom comparison function without localeCompare
        function compareItems(a, b) {
            if (a.type < b.type) {
                return -1;
            } else if (a.type > b.type) {
                return 1;
            } else {
                // If types are equal, compare by name without using localeCompare
                return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
            }
        }

        prop.sort(compareItems);
        let sortedProp = prop.map(prop => prop.name);
        
        setTimeout(() => {
            for(let i = 0; i < propNum; i++){
                MessageCenter.SendCustomMessage(MessageType.Type_Char, MessageType.Char_Prop, sortedProp[i]);
            }
        }, 100);
    }



}