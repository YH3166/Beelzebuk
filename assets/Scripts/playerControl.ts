import ComponentBase from "./ComponentBase";
import PlayerManager from "./PlayerManager";
import Message, { MessageType } from "./Message";
import MessageCenter from "./MessageCenter";
import { CheckObstacle, CheckObstacleRoof} from "./mapControl";
import { PlayerCharacter } from "./playerClass";
import { AddOnEffect, GetProp, PropertyName, PropertyType } from "./PropertyItem";
import { AbilityName } from "./AbilityItem";


const {ccclass, property} = cc._decorator;
var desPos: cc.Vec2 

export let player1 = new PlayerCharacter;
player1.name = '朱雨澄'; 
player1.hp = player1.hpMax;
player1.movePoint = player1.movePointMax;
player1.status = [AddOnEffect.流血,3];
player1.skillMeleeShort = 3;
player1.weapon = [PropertyName.匕首,PropertyName.射天狼];
player1.ability = [AbilityName.长兵熟习, AbilityName.怪力, AbilityName.冲撞, AbilityName.直觉, AbilityName.机械初学];
player1.props = [PropertyName.匕首, PropertyName.十全汤, PropertyName.手术刀, PropertyName.烤包子, PropertyName.锦瑟, PropertyName.夜行衣];



@ccclass
export default class playerControl extends ComponentBase {
    @property()
    speed: number = 2;

    start () {    
        //注册为player消息接收者
        PlayerManager.Instance.RegisterReceiver(this);
        //创新玩家信息
        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Update, '');
    }

    ReceiveMessage(msg: Message){
        super.ReceiveMessage(msg);
        //玩家角色移动
        if(msg.Command == MessageType.Player_Move){
            switch(<string>msg.Content){
                case 'left':
                    this.Move_Left();
                    break;
                case 'right':
                    this.Move_Right();
                    break;
                case 'up':
                    this.Move_Up();
                    break;
                case 'down':
                    this.Move_Down();
                    break;
            }
        }
        //显示范围，输出玩家所在位置
        if(msg.Command == MessageType.Show_Target){
            if(msg.Content == 'attack' || msg.Content == 'attack1' || msg.Content == 'attack2'){
                let weapon:PropertyName = null;
                if(msg.Content == 'attack'){
                    weapon = PropertyName.徒手;
                }
                if(msg.Content == 'attack1'){
                    weapon = player1.weapon[0];
                }
                if(msg.Content == 'attack2'){
                    weapon = player1.weapon[1];
                }

                if(GetProp(weapon).Type == PropertyType.弓弩远程武器 || GetProp(weapon).Type == PropertyType.枪械远程武器){
                    if(this.node.parent.parent.name == 'Player'){
                        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle, 'Add_Ladders');
                        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Show_Target_Ranged, this.node.position);
                        setTimeout(()=>{
                            MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle,'Remove_Ladders')
                        },100);
                    }
                    if(this.node.parent.parent.name == '图块层 4'){
                        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle, 'Add_Ladders');
                        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Show_Target_Ranged_Roof, this.node.position);
                        setTimeout(()=>{
                            MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle,'Remove_Ladders')
                        },100);
                    }
                } else {
                    if(this.node.parent.parent.name == 'Player'){
                        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle, 'Add_Ladders');
                        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Show_Target_Melee, this.node.position);
                        setTimeout(()=>{
                            MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle,'Remove_Ladders')
                        },100);
                    }
                    if(this.node.parent.parent.name == '图块层 4'){
                        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle, 'Add_Ladders');
                        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Show_Target_Melee_Roof, this.node.position);
                        setTimeout(()=>{
                            MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle,'Remove_Ladders')
                        },100);
                    }
                }
            }
            if(msg.Content == 'move'){
                if(this.node.parent.parent.name == 'Player'){
                    MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle, 'Add_Ladders');
                    MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Show_Target_Move, this.node.position);
                    setTimeout(()=>{
                        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle,'Remove_Ladders')
                    },100);
                }
                if(this.node.parent.parent.name == '图块层 4'){
                    MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle, 'Add_Ladders');
                    MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Show_Target_Move_Roof, this.node.position);
                    setTimeout(()=>{
                        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle,'Remove_Ladders')
                    },100);
                }
            }
            if(msg.Content == 'acquire'){
                if(this.node.parent.parent.name == 'Player'){
                    MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle, 'Add_Ladders');
                    MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Show_Target_Acquire, this.node.position);
                    setTimeout(()=>{
                        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle,'Remove_Ladders')
                    },100);
                }
                if(this.node.parent.parent.name == '图块层 4'){
                    MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle, 'Add_Ladders');
                    MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Show_Target_Acquire_Roof, this.node.position);
                    setTimeout(()=>{
                        MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Update_Obstacle,'Remove_Ladders')
                    },100);
                }
            }      
        }
        //玩家角色进行近程攻击
        if(msg.Command == MessageType.Player_Attack_Melee){
            if(msg.Content.x<64 && msg.Content.x>32 && msg.Content.y<32 && msg.Content.y>0){
                this.Attack_Right();
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Destroy_Target, '');
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
            }
            if(msg.Content.x<32 && msg.Content.x>0 && msg.Content.y<64 && msg.Content.y>32){
                this.Attack_Up();
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Destroy_Target, '');
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
            }
            if(msg.Content.x<0 && msg.Content.x>-32 && msg.Content.y<32 && msg.Content.y>0){
                this.Attack_Left();
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Destroy_Target, '');
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
            }
            if(msg.Content.x<32 && msg.Content.x>0 && msg.Content.y<0 && msg.Content.y>-32){
                this.Attack_Down();
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Destroy_Target, '');
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
            }
        }
        //玩家角色进行远程攻击
        if(msg.Command == MessageType.Player_Attack_Ranged){
            if(msg.Content.x<64 && msg.Content.x>32 && msg.Content.y<32 && msg.Content.y>0){
                this.Attack_Right();
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Destroy_Target, '');
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
            }
            if(msg.Content.x<32 && msg.Content.x>0 && msg.Content.y<64 && msg.Content.y>32){
                this.Attack_Up();
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Destroy_Target, '');
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
            }
            if(msg.Content.x<0 && msg.Content.x>-32 && msg.Content.y<32 && msg.Content.y>0){
                this.Attack_Left();
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Destroy_Target, '');
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
            }
            if(msg.Content.x<32 && msg.Content.x>0 && msg.Content.y<0 && msg.Content.y>-32){
                this.Attack_Down();
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Destroy_Target, '');
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
            }
        }
        //玩家角色进行直线移动
        if(msg.Command == MessageType.Player_Move_in_Line){
            if(msg.Content[0]!=0){
                this.node.runAction(cc.repeat(cc.callFunc(this.Move_Up, this),msg.Content[0]+1));
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Destroy_Target, '');
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
            }
            if(msg.Content[1]!=0){
                this.node.runAction(cc.repeat(cc.callFunc(this.Move_Down, this),msg.Content[1]+1));
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Destroy_Target, '');
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
            }
            if(msg.Content[2]!=0){
                this.node.runAction(cc.repeat(cc.callFunc(this.Move_Left, this),msg.Content[2]+1));
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Destroy_Target, '');
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
            }
            if(msg.Content[3]!=0){
                this.node.runAction(cc.repeat(cc.callFunc(this.Move_Right, this),msg.Content[3]+1));
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Destroy_Target, '');
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Controller_Restore, '');
            }
        }
        //玩家信息更新
        if(msg.Command == MessageType.Player_Update){
            if(msg.Content[0]=='equipment'){
                let propName = msg.Content[2];
                if(msg.Content[1]=='add'){
                    if(propName == PropertyName.锦瑟){
                        player1.armor2 = propName;
                    } else if(GetProp(propName).Type == PropertyType.防具){
                        if(!player1.armor1){
                            player1.armor1 = propName;
                            //这里需要补一个如果armor有东西出现一个确认的button
                        }
                    }
                    if(GetProp(propName).Type != PropertyType.防具){
                        if(player1.weapon == null){
                            player1.weapon = [propName];
                        } else if(player1.weapon.length == 1) {
                            player1.weapon.push(propName);
                        }
                    }
                    //这里需要补一个如果weapon有2东西出现一个确认的button
                }
                if(msg.Content[1]=='remove'){
                    if(propName == PropertyName.锦瑟){
                        player1.armor2 = null;
                    } else if(GetProp(propName).Type == PropertyType.防具){
                        player1.armor1 = null;
                    } else if(player1.weapon.length == 2) {
                        this.RemoveProp(propName, player1.weapon);
                    } else {
                        player1.weapon = null;
                    }
                }
            }
            if(msg.Content[0]=='prop'){
                let propName = msg.Content[2];
                if(msg.Content[1]=='remove'){
                    player1.props = this.RemoveProp(propName,player1.props);
                }
                if(msg.Content[1]=='add'){
                    player1.props.push(propName);
                }
            }
            
        }
        if(msg.Command == MessageType.Player_New_Turn){
            player1.movePoint = player1.movePointMax;
            player1.actionPoint = player1.actionPointMax;
            player1.attackPoint = player1.attackPointMax;
            MessageCenter.SendCustomMessage(MessageType.Type_UI,MessageType.UI_Update,'')
        }
    }

    RemoveProp(propName: PropertyName, propList: PropertyName[]){
        let index = propList.indexOf(propName);
        propList.splice(index,1);
        return propList
    }


    Move_Left(){
        this.getComponent(cc.Animation).play('Move_2');
        desPos = cc.v2(Math.round(this.node.x - 32), Math.round(this.node.y));
        if(this.node.parent.parent.name == 'Player'){
            if(CheckObstacle(cc.v2(Math.round(this.node.x), Math.round(this.node.y)),desPos) && desPos.x>=0) {
                this.node.runAction(cc.moveBy(1/this.speed,cc.v2(-32,0)));
                player1.movePoint--;
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Update, '');
            }
        }
        if(this.node.parent.parent.name == '图块层 4'){      
            if(CheckObstacleRoof(desPos) && desPos.x>=0) {
                this.node.runAction(cc.moveBy(1/this.speed,cc.v2(-32,0)));
                player1.movePoint--;
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Update, '');
            }
        }   
    }

    Move_Right(){
        this.getComponent(cc.Animation).play('Move_3');
        desPos = cc.v2(Math.round(this.node.x + 32), Math.round(this.node.y));
        if(this.node.parent.parent.name == 'Player'){
            if(CheckObstacle(cc.v2(Math.round(this.node.x), Math.round(this.node.y)),desPos) && desPos.x<=1568){
                this.node.runAction(cc.moveBy(1/this.speed,cc.v2(+32,0)));
                player1.movePoint--;
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Update, '');
            }
        }
        if(this.node.parent.parent.name == '图块层 4'){      
            if(CheckObstacleRoof(desPos) && desPos.x>=0) {
                this.node.runAction(cc.moveBy(1/this.speed,cc.v2(32,0)));
                player1.movePoint--;
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Update, '');
            }
        }   
    }

    Move_Up(){
        this.getComponent(cc.Animation).play('Move_4');
        desPos = cc.v2(Math.round(this.node.x), Math.round(this.node.y + 32));
        if(this.node.parent.parent.name == 'Player'){
            this.Check_Ladder(cc.v2(Math.round(this.node.x), Math.round(this.node.y)),desPos);
            if(CheckObstacle(cc.v2(Math.round(this.node.x), Math.round(this.node.y)),desPos) && desPos.y<=1568){
              this.node.runAction(cc.moveBy(1/this.speed,cc.v2(0,32)));
              player1.movePoint--;
              MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Update, '');
            }
        }
        if(this.node.parent.parent.name == '图块层 4'){      
            this.Check_Ladder(cc.v2(Math.round(this.node.x), Math.round(this.node.y)),desPos);
            if(CheckObstacleRoof(desPos) && desPos.x>=0) {
                this.node.runAction(cc.moveBy(1/this.speed,cc.v2(0,32)));
                player1.movePoint--;
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Update, '');
            }
        }   
    }

    Move_Down(){
        this.getComponent(cc.Animation).play('Move_1');
        desPos = cc.v2(Math.round(this.node.x), Math.round(this.node.y - 32));
        if(this.node.parent.parent.name == 'Player'){
            this.Check_Ladder(cc.v2(Math.round(this.node.x), Math.round(this.node.y)),desPos);
            if(CheckObstacle(cc.v2(Math.round(this.node.x), Math.round(this.node.y)),desPos) && desPos.y>=32){
                this.node.runAction(cc.moveBy(1/this.speed,cc.v2(0,-32)));
                player1.movePoint--;
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Update, '');
            }
        }
        if(this.node.parent.parent.name == '图块层 4'){
            this.Check_Ladder(cc.v2(Math.round(this.node.x), Math.round(this.node.y)),desPos);      
            if(CheckObstacleRoof(desPos) && desPos.x>=0) {
                this.node.runAction(cc.moveBy(1/this.speed,cc.v2(0,-32)));
                player1.movePoint--;
                MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.UI_Update, '');
            }
        }   
    }

    Attack_Up(){
        this.getComponent(cc.Animation).play('Attack_4');
        this.node.runAction(cc.sequence(cc.moveBy(1/this.speed/2,cc.v2(0,16)),cc.moveBy(1/this.speed/2,cc.v2(0,-16))));
    }
    
    Attack_Down(){
        this.getComponent(cc.Animation).play('Attack_1');
        this.node.runAction(cc.sequence(cc.moveBy(1/this.speed/2,cc.v2(0,-16)),cc.moveBy(1/this.speed/2,cc.v2(0,+16))));
    }

    Attack_Left(){
        this.getComponent(cc.Animation).play('Attack_2');
        this.node.runAction(cc.sequence(cc.moveBy(1/this.speed/2,cc.v2(-16,0)),cc.moveBy(1/this.speed/2,cc.v2(16,0))));
    }

    Attack_Right(){
        this.getComponent(cc.Animation).play('Attack_3');
        this.node.runAction(cc.sequence(cc.moveBy(1/this.speed/2,cc.v2(16,0)),cc.moveBy(1/this.speed/2,cc.v2(-16,0))));
    }

    Check_Ladder(curPos:cc.Vec2,desPos:cc.Vec2){
        if(curPos.equals(cc.v2(Math.round(2*32),Math.round(16*32))) && desPos.equals(cc.v2(Math.round(2*32),Math.round(17*32)))){
            MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Ladder_Up, '');
        }
        if(curPos.equals(cc.v2(Math.round(3*32),Math.round(16*32))) && desPos.equals(cc.v2(Math.round(3*32),Math.round(17*32)))){
            MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Ladder_Up, '');
        }
        if(curPos.equals(cc.v2(Math.round(2*32),Math.round(30*32))) && desPos.equals(cc.v2(Math.round(2*32),Math.round(29*32)))){
            MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Ladder_Up, '');
        }
        if(curPos.equals(cc.v2(Math.round(3*32),Math.round(30*32))) && desPos.equals(cc.v2(Math.round(3*32),Math.round(29*32)))){
            MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Ladder_Up, '');
        }
        if(curPos.equals(cc.v2(Math.round(2*32),Math.round(17*32))) && desPos.equals(cc.v2(Math.round(2*32),Math.round(16*32)))){
            MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Ladder_Down, '');
        }
        if(curPos.equals(cc.v2(Math.round(3*32),Math.round(17*32))) && desPos.equals(cc.v2(Math.round(3*32),Math.round(16*32)))){
            MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Ladder_Down, '');
        }
        if(curPos.equals(cc.v2(Math.round(2*32),Math.round(29*32))) && desPos.equals(cc.v2(Math.round(2*32),Math.round(30*32)))){
            MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Ladder_Down, '');
        }
        if(curPos.equals(cc.v2(Math.round(3*32),Math.round(29*32))) && desPos.equals(cc.v2(Math.round(3*32),Math.round(30*32)))){
            MessageCenter.SendCustomMessage(MessageType.Type_UI, MessageType.Map_Ladder_Down, '');
        }
    }
}
