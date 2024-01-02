const {ccclass, property} = cc._decorator;
import {PropertyType} from "./PropertyItem";


@ccclass
//建立基于道具的武器类
class AbilityItem {
    //能力名字
    Name: AbilityName;
    AbilityDes:string = null;
    Type: AbilityType = null;
}

export enum AbilityName{
    枪弩熟习,
    短兵熟习,
    长兵熟习,
    机械初学,
    机械熟习,
    枪械熟习,
    空手道,
    全武器熟习,
    夜行者,
    怪力,
    直觉,
    刑警专长,
    百发百中,
    冲撞,
    预判,
    急行军,
    快速修复,
    开锁,
    坚忍,
    珍惜食物,
    心脏虚弱,
    久病成医,
    埋伏,
    紧急包扎,
    急救,
    女武神,
    极限反制,
    强制对攻,
}

enum AbilityType{
    Weapon,
    Attribute,
    other
}

class WeaponAbility extends AbilityItem{
    WeaponType1: PropertyType = null;
    WeaponPoint1: number = 0;
    WeaponType2: PropertyType = null;
    WeaponPoint2: number = 0;
    
     //根据名字填写技能追加效果
    CheckEffect(name:AbilityName){
        switch(name){
            case AbilityName.机械初学:
                this.WeaponType1 = PropertyType.机械近战武器;
                this.WeaponPoint1 = 1;
                break;
            case AbilityName.机械熟习:
                this.WeaponType1 = PropertyType.机械近战武器;
                this.WeaponPoint1 = 3;
                break;
            case AbilityName.枪弩熟习:
                this.WeaponType1 = PropertyType.弓弩远程武器;
                this.WeaponPoint1 = 3;
                this.WeaponType2 = PropertyType.枪械远程武器;
                this.WeaponPoint2 = 1;
                break;
            case AbilityName.枪械熟习:
                this.WeaponType1 = PropertyType.枪械远程武器;
                this.WeaponPoint1 = 3;
            break;
            case AbilityName.短兵熟习:
                this.WeaponType1 = PropertyType.短兵近战武器;
                this.WeaponPoint1 = 3;
            break;
            case AbilityName.长兵熟习:
                this.WeaponType1 = PropertyType.长兵近战武器;
                this.WeaponPoint1 = 3;
            break;
            case AbilityName.空手道:
                this.WeaponType1 = PropertyType.徒手近战武器;
                this.WeaponPoint1 = 3;
            break;
            default:
                console.debug('技能并非weapon技能');
            break;
        }
    }

    //构造方法
    constructor(name:AbilityName){
        super();
        this.Name = name;
        this.Type = AbilityType.Weapon;
        //使用内部函数赋值技能效果
        this.CheckEffect(name);
        //给出UI界面的技能描述
        this.AbilityDes = AbilityName[this.Name] + "：";
        this.AbilityDes = this.AbilityDes + PropertyType[this.WeaponType1] + "熟练度+" + this.WeaponPoint1 + '。';
        if(this.WeaponType2 != null){
            this.AbilityDes = this.AbilityDes + PropertyType[this.WeaponType2] + "熟练度+" + this.WeaponPoint2 + '。';
        }
        if(this.Name == AbilityName.空手道){
            this.AbilityDes = this.AbilityDes + '徒手攻击命中时一次攻击可以造成两次伤害';
        }
    }
}

class AttributeAbility extends AbilityItem{
    Move: number = 0; //行动点
    Hit: number = 0; //命中加值
    Hit_Melee: number = 0; //近战命中加值
    Damage_Melee: number = 0; //近战伤害加值
    Evasion: number = 0; //闪避加值
    Defense: number = 0; //防御加值
    Start: number = 0; //先行值加值
    
     //根据名字填写技能追加效果
    CheckEffect(name:AbilityName){
        this.AbilityDes = AbilityName[this.Name] + "：";
        switch(name){
            case AbilityName.夜行者:
                this.Move = 2;
                this.AbilityDes = this.AbilityDes + "每回合移动点+2。"
            break;
            case AbilityName.直觉:
                this.Evasion = 1;
                this.AbilityDes = this.AbilityDes + "闪避加值+2。"
            break;
            case AbilityName.怪力:
                this.Damage_Melee = 2;
                this.AbilityDes = this.AbilityDes + "近战伤害加值+2。"
            break;
            case AbilityName.刑警专长:
                this.Hit = 2;
                this.Defense = 1;
                this.AbilityDes = this.AbilityDes + "命中加值+2，防御加值+1。"
            break;
            case AbilityName.预判:
                this.Start = 2;
                this.AbilityDes = this.AbilityDes + "命中加值+2，防御加值+1。"
            break;
            default:
                console.debug('技能并非attribute技能');
            break;
        }
    }

    //构造方法
    constructor(name:AbilityName){
        super();
        this.Name = name;
        this.Type = AbilityType.Attribute;
        //使用内部函数赋值技能效果
        this.CheckEffect(name);
    }
}


class OtherAbility extends AbilityItem{
     //根据名字填写技能追加效果
    CheckEffect(name:AbilityName){
        this.AbilityDes = AbilityName[this.Name] + "：";
        switch(name){
            case AbilityName.百发百中:
                this.AbilityDes = this.AbilityDes + "装备远程武器时获得命中加值+3。"
            break;
            case AbilityName.冲撞:
                this.AbilityDes = this.AbilityDes + "近战未命中时依然造成2点伤害。"
            break;
            case AbilityName.急行军:
                this.AbilityDes = this.AbilityDes + "每次将附加行动点转化成移动点时，额外获得一点移动点。"
            break;
            case AbilityName.开锁:
                this.AbilityDes = this.AbilityDes + "你可以使用专用铁丝打开一个锁。开锁消耗1个攻击点。"
            break;
            case AbilityName.快速修复:
                this.AbilityDes = this.AbilityDes + "你可以使用一个附加行动点修复任何一次性装备或解除并获得布置好的陷阱。对每件装备仅能使用一次。"
            break;
            case AbilityName.坚忍:
                this.AbilityDes = this.AbilityDes + "不会陷入疼痛状态。"
            break;
            case AbilityName.珍惜食物:
                this.AbilityDes = this.AbilityDes + "使用任何食物类道具可以多获得1个移动点。"
            break;
            case AbilityName.心脏虚弱:
                this.AbilityDes = this.AbilityDes + "使用楼梯时消耗的移动点数+1。"
            break;
            case AbilityName.久病成医:
                this.AbilityDes = this.AbilityDes + "任何负面状态会在一回合后消除（疼痛除外）。"
            break;
            case AbilityName.埋伏:
                this.AbilityDes = this.AbilityDes + "消耗本回合所有移动点和附加行动点，进入埋伏状态，移动时状态解除。（埋伏状态：先行值+5，攻击点+1，命中加值+5，近战伤害加值+3）。"
            break;
            case AbilityName.紧急包扎:
                this.AbilityDes = this.AbilityDes + "对自己或其他人使用回复道具时回复量+3。"
            break;
            case AbilityName.急救:
                this.AbilityDes = this.AbilityDes + "当你体力值降到0时，可以不消耗附加行动点使用回复道具。"
            break;
            default:
                console.debug('技能并非other技能');
            break;
        }
    }

    //构造方法
    constructor(name:AbilityName){
        super();
        this.Name = name;
        this.Type = AbilityType.other;
        //使用内部函数赋值技能效果
        this.CheckEffect(name);
    }
}

//技能输出函数
export function GetAbility(abilityName:AbilityName){
    if(abilityName as number <= 7){
        let abilityItem = new WeaponAbility(abilityName);
        return abilityItem;
    }else if(abilityName as number <= 11){
        let abilityItem = new AttributeAbility(abilityName);
        return abilityItem;
    } else {
        let abilityItem = new OtherAbility(abilityName);
        return abilityItem;
    }
}