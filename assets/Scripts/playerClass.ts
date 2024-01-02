
import { AbilityName } from "./AbilityItem";
import { PropertyName } from "./PropertyItem";

const {ccclass, property} = cc._decorator;

@ccclass
export class PlayerCharacter{
    name: string = null;
    _hp: number = 0;
    hpMax: number = 70;
    movePoint: number = 0;
    movePointMax: number = 10;
    actionPoint: number = 0;
    actionPointMax: number = 2;
    attackPoint: number = 0;
    attackPointMax: number = 1;
    status: any[] = null;   //奇数位置写状态，偶数位置写回合数；若是连续型状态，回合数写0

    //人物基础属性
    hit: number = 0;
    hitMelee: number = 0;
    damageMelee: number = 0;
    evasion: number = 0;
    defense: number = 0;

    //人物武器熟练度
    skillMeleeLong: number = 0;
    skillMeleeShort: number = 0;
    skillMeleeMech: number = 0;
    skillRangeGun: number = 0;
    skillRangeArcher: number = 0;
    skillBareHand: number = 0;

    //人物装备栏
    weapon: PropertyName[] = null;
    armor1: PropertyName = null;
    armor2: PropertyName = null;
    ability: AbilityName[] = null;
    props: PropertyName[] = null;
    
    get hp(){
        return this._hp
    }
    set hp(value){
        if(value < 0){
            this._hp = 0;
        } else {
            this._hp = value;
        }
    }


}