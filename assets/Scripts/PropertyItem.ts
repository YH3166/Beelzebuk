const {ccclass, property} = cc._decorator;

@ccclass
class PropertyItem {
    //道具名字
    Name: PropertyName;
//    //道具基础类型
//    GeneralType: PropertyGeneralType;
    //道具类型
    Type: PropertyType = null;
    IsSingleUse: boolean = false;
    PropDes: string = null;
}

export enum PropertyName{
    徒手,
    餐刀,
    匕首,
    手术刀,
    童谣,
    木棍,
    警棍,
    消防斧,
    战术笔,
    拳刺,
    手弩,
    木弓,
    射天狼,
    土枪,
    格洛克,
    电击枪,
    防狼喷雾,
    夜行衣,
    锦瑟,
    防弹衣,
    苹果,
    烤包子,
    十全汤,
    绷带,
    肾上腺素,
    杜冷丁,
    开锁器,
    监狱钥匙,
    宝箱钥匙,
    捕猎夹,
    油,
}

enum PropertyGeneralType{
    武器,
    装备,
    回复,
    陷阱
}

export enum PropertyType{
    短兵近战武器,
    长兵近战武器,
    徒手近战武器,
    弓弩远程武器,
    枪械远程武器,
    机械近战武器,
    防具,
    食用类回复道具,
    医用类回复道具,
    机械陷阱,
    陷阱,
    钥匙道具
}


export enum AddOnEffect{
    流血,
    疼痛,
    黑暗,
    跛足,
    昏厥,
    亢奋,
    埋伏,
    加防
}

//根据名字填写道具描述，仅对传奇道具生效
function CheckDescription(name:PropertyName){
    let Description:string = null;
    switch(name){
        case PropertyName.射天狼:
            Description = "鹿的专属武器，只差一点点，他就能杀死那只猪。"
            break;
        case PropertyName.童谣:
            Description = "一个孩子在黎明前低声唱着的歌谣。"
            break; 
        case PropertyName.锦瑟:
            Description = "沧海月明珠有泪，蓝田日暖玉生烟。"
            break;
    }
    return Description;
}


//建立基于道具的武器类
class Weapon extends PropertyItem{
    MaxRoll: number = 6;
    TimeRoll: number = 1;
    AdditionalDamage: number = 0;
    IsMelee: boolean = true;
    IsAddOnEffect: boolean = false;
    Effect: AddOnEffect = null;
    EffectTurn: number = 0;
    Description: string = null;

    //根据名字填写武器追加效果
    CheckEffect(name:PropertyName){
        switch(name){
            case PropertyName.手术刀:
                this.IsAddOnEffect = true;
                this.Effect = AddOnEffect.流血;
                this.EffectTurn = 3;
                break;
            case PropertyName.消防斧:
                this.IsAddOnEffect = true;
                this.Effect = AddOnEffect.流血;
                this.EffectTurn = 3;
                break;
            case PropertyName.战术笔:
                this.IsAddOnEffect = true;
                this.Effect = AddOnEffect.加防;
                this.EffectTurn = 1;
                break;
            case PropertyName.手弩:
                this.IsAddOnEffect = true;
                this.Effect = AddOnEffect.流血;
                this.EffectTurn = 3;
                break;
            case PropertyName.电击枪:
                this.IsAddOnEffect = true;
                this.Effect = AddOnEffect.昏厥;
                this.EffectTurn = 1;
                break;
            case PropertyName.防狼喷雾:
                this.IsAddOnEffect = true;
                this.Effect = AddOnEffect.黑暗;
                this.EffectTurn = 3;
                break;    
        }
    }

    //根据名字填写武器伤害范围
    DamageRoll(name:PropertyName){
        switch(name){
            case PropertyName.徒手:
                this.MaxRoll = 4;
                this.Type = PropertyType.徒手近战武器;
            break;
            case PropertyName.餐刀:
                this.MaxRoll = 4;
                this.Type = PropertyType.短兵近战武器;
                break;
            case PropertyName.匕首:
                this.MaxRoll = 8;
                this.Type = PropertyType.短兵近战武器;
                break;
            case PropertyName.手术刀:
                this.MaxRoll = 8;
                this.Type = PropertyType.短兵近战武器;
                break;
            case PropertyName.战术笔:
                this.MaxRoll = 4;
                this.Type = PropertyType.短兵近战武器;
                break;            
            case PropertyName.童谣:
                this.MaxRoll = 8;
                this.TimeRoll = 2;
                this.Type = PropertyType.短兵近战武器;
                break;
            case PropertyName.木棍:
                this.MaxRoll = 6;
                this.Type = PropertyType.长兵近战武器;
                break;
            case PropertyName.警棍:
                this.MaxRoll = 6;
                this.AdditionalDamage = 2;
                this.Type = PropertyType.长兵近战武器;
                break;
            case PropertyName.消防斧:
                this.MaxRoll = 8;
                this.AdditionalDamage = 2;
                this.Type = PropertyType.长兵近战武器;
                break;
            case PropertyName.拳刺:
                this.MaxRoll = 6;
                this.AdditionalDamage = 2;
                this.Type = PropertyType.徒手近战武器;
                break;
            case PropertyName.手弩:
                this.MaxRoll = 6;
                this.Type = PropertyType.弓弩远程武器;
                break;
            case PropertyName.木弓:
                this.MaxRoll = 6;
                this.AdditionalDamage = 2;
                this.Type = PropertyType.弓弩远程武器;
                break;
            case PropertyName.射天狼:
                this.MaxRoll = 6;
                this.AdditionalDamage = 10;
                this.TimeRoll = 2;
                this.Type = PropertyType.弓弩远程武器;
                break;
            case PropertyName.土枪:
                this.MaxRoll = 8;
                this.AdditionalDamage = 2;
                this.Type = PropertyType.枪械远程武器;
                break;
            case PropertyName.格洛克:
                this.MaxRoll = 8;
                this.TimeRoll = 2;
                this.Type = PropertyType.枪械远程武器;
                break;
            case PropertyName.电击枪:
                this.MaxRoll = 4;
                this.Type = PropertyType.机械近战武器;
                break;
            case PropertyName.防狼喷雾:
                this.MaxRoll = 2;
                this.Type = PropertyType.机械近战武器;
                break;
        }
    }
    //构造方法
    constructor(name:PropertyName){
        super();
        //赋值武器攻击能力
        this.Name = name;
        this.AdditionalDamage = 0;
        this.TimeRoll = 1;
        this.DamageRoll(name);
        //给远程武器赋值远程
        if(this.Type == PropertyType.弓弩远程武器 || this.Type == PropertyType.枪械远程武器){
            this.IsMelee = false;
        }
        //给机械武器赋值一次性使用
        if(this.Type == PropertyType.机械近战武器){
            this.IsSingleUse = true;
        }
        //使用内部函数赋值武器追加效果
        this.CheckEffect(name);
        //使用公共函数赋值传奇武器的描述
        this.Description = CheckDescription(this.Name);
        //给出UI界面的武器描述
        let lowRoll = this.TimeRoll+this.AdditionalDamage;
        let highRoll = this.MaxRoll*this.TimeRoll+this.AdditionalDamage;
        this.PropDes = PropertyName[this.Name] + "：";
        if(this.Description != null){
            this.PropDes = this.PropDes + this.Description;
        }
        this.PropDes = this.PropDes + PropertyType[this.Type] + "。" + this.TimeRoll + 'd' + this.MaxRoll + '+' + this.AdditionalDamage + '伤害（' + lowRoll + '~' + highRoll + "）。";
        if(this.IsAddOnEffect == true){
            this.PropDes = this.PropDes + "\n命中时对方获得" + this.EffectTurn + "回合" + AddOnEffect[this.Effect] + "状态。"
        }
        if(this.IsSingleUse == true){
            this.PropDes = this.PropDes + "\n一次性武器。";
        }
        if(this.Name == PropertyName.战术笔){
            this.PropDes = PropertyName[this.Name] + "：" + PropertyType[this.Type] + "。" + this.TimeRoll + 'd' + this.MaxRoll + '+' + this.AdditionalDamage + '伤害（' + lowRoll + '~' + highRoll + "）。\n装备时防御加值+1。";
        }
    }
}

//建立基于道具的装备类
class Armor extends PropertyItem{
    IsOverlay: boolean = false;
    Defense: number = 0;
    Evasion: number = 0;
    Description: string = null; 

    //根据名字填写装备的效果
    ArmorEffect(name: PropertyName, des: string){
        switch(name){
            case PropertyName.夜行衣:
                this.Evasion = 1;
                this.PropDes = PropertyName[name] + "：装备。装备时闪避加值+1。"
                break;
            case PropertyName.防弹衣:
                this.Defense = 2;
                this.PropDes = PropertyName[name] + "：装备。装备时防御加值+2。"
                break;
            case PropertyName.锦瑟:
                this.IsOverlay = true;
                this.IsSingleUse = true;
                this.Defense = 20;
                this.PropDes = PropertyName[name] + "：" + des + "一次性装备，可与其他装备同时装备。装备回合防御加值+20，回合结束时损坏。"
                break;
        }
    }

    constructor(name:PropertyName){
        super();
        this.Type = PropertyType.防具;
        this.Name = name;
        this.IsSingleUse = false;
        //使用公共函数赋值传奇装备的描述
        this.Description = CheckDescription(this.Name);
        //使用内部函数赋值装备属性
        this.ArmorEffect(name,this.Description);
    }
}


//建立基于道具的回复类
class Supply extends PropertyItem{
    Recover_HP: number = 0;
    Recover_Movement: number = 0;
    IsAddOnEffect: boolean = false;
    IsRemoveEffect: boolean = false;
    Effect: AddOnEffect = null;
    EffectTurn: number = 0;
    Description: string = null;

    //根据名字填写道具效果
    SupplyEffect(name:PropertyName){
        switch(name){
            case PropertyName.苹果:
                this.Recover_HP = 2;
                this.Recover_Movement = 1;
                break;
            case PropertyName.烤包子:
                this.Recover_HP = 5;
                break;
            case PropertyName.十全汤:
                this.Recover_HP = 5;
                this.Recover_Movement = 2;
                break;
            case PropertyName.绷带:
                this.Recover_HP = 2;
                this.Type = PropertyType.医用类回复道具;
                this.IsRemoveEffect = true;
                this.Effect = AddOnEffect.流血;
                break;
            case PropertyName.肾上腺素:
                this.Recover_Movement = 1;
                this.Type = PropertyType.医用类回复道具;
                this.IsAddOnEffect = true;
                this.Effect = AddOnEffect.亢奋;
                this.EffectTurn = 3;
                break;
            case PropertyName.杜冷丁:
                this.Type = PropertyType.医用类回复道具;
                this.IsRemoveEffect = true;
                this.Effect = AddOnEffect.疼痛;
                this.EffectTurn = 3;
                break;
        }
    }

    constructor(name:PropertyName){
        super();
        this.Type = PropertyType.食用类回复道具;
        this.Name = name;
        this.IsSingleUse = true;
        //使用公共函数赋值传奇道具的描述
        this.Description = CheckDescription(this.Name);
        //使用内部函数赋值道具属性
        this.SupplyEffect(name);
        //给出UI界面的道具描述
        this.PropDes = PropertyName[this.Name] + "：";
        if(this.Description != null){
            this.PropDes = this.PropDes + this.Description;
        }
        this.PropDes = this.PropDes + PropertyType[this.Type] + "。";
        if(this.Recover_HP != 0){
            this.PropDes = this.PropDes + "回复血量+" + this.Recover_HP + ",";
        }
        if(this.Recover_Movement != 0){
            this.PropDes = this.PropDes + "回复移动点+" + this.Recover_Movement + ",";
        }
        if(this.IsRemoveEffect == true && this.EffectTurn!= 0){
            this.PropDes = this.PropDes + this.EffectTurn + "回合内去除" + AddOnEffect[this.Effect] + "状态,";
        }
        if(this.IsRemoveEffect == true && this.EffectTurn == 0){
            this.PropDes = this.PropDes + "去除" + AddOnEffect[this.Effect] + "状态,";
        }
        if(this.IsAddOnEffect == true && this.EffectTurn != 0){
            this.PropDes = this.PropDes + this.EffectTurn + "回合内获得" + AddOnEffect[this.Effect] + "状态,";
        }
        this.PropDes = this.PropDes + "一次性使用。";
    }
}


//建立基于道具的陷阱类, 包含开锁装置
class Trap extends PropertyItem{
    Damage: number = 0;
    IsKey: boolean = false;
    LockCode: number = null;
    IsMechine: boolean = false;
    IsAddOnEffect: boolean = false;
    IsSecondEffect: boolean = false;
    Effect: AddOnEffect = null;
    SecondEffect: AddOnEffect = null;
    EffectTurn: number = 0;
    SecondEffectTurn: number = 0;
    Description: string = null;

    //根据名字填写武器追加效果
    TrapEffect(name:PropertyName){
        switch(name){
            case PropertyName.开锁器:
                this.IsKey = true;
                this.LockCode = 11;
                break;
            case PropertyName.宝箱钥匙:
                this.IsKey = true;
                this.LockCode = 1;
                break;
            case PropertyName.监狱钥匙:
                this.IsKey = true;
                this.LockCode = 2;
                break;
            case PropertyName.油:
                this.IsAddOnEffect = true;
                this.Effect = AddOnEffect.跛足;
                this.EffectTurn = 2;
                break;
            case PropertyName.捕猎夹:
                this.Damage = 3;
                this.IsAddOnEffect = true;
                this.Effect = AddOnEffect.跛足;
                this.EffectTurn = 3;
                this.IsSecondEffect = true;
                this.SecondEffect = AddOnEffect.流血;
                this.SecondEffectTurn = 3;
                this.IsMechine = true;
                break; 
        }
    }

    //构造方法
    constructor(name:PropertyName){
        super();
        this.Name = name;
        this.Type = PropertyType.陷阱;
        this.IsSingleUse = true;
        
        //使用内部函数赋值追加效果
        this.TrapEffect(name);
        //给钥匙道具赋值类型
        if(this.IsKey == true){
            this.Type = PropertyType.钥匙道具;
        }
        //给机械陷阱赋值类型
        if(this.IsMechine == true){
            this.Type = PropertyType.机械陷阱;
        }
        //使用公共函数赋值传奇武器的描述
        this.Description = CheckDescription(this.Name);

        //给出UI界面的武器描述
        this.PropDes = PropertyName[this.Name] + "：";
        if(this.Description != null){
            this.PropDes = this.PropDes + this.Description;
        }
        this.PropDes = this.PropDes + PropertyType[this.Type] + "，布置后对下一个进入该位置的角色造成影响。";
        if(this.Damage != 0){
            this.PropDes = this.PropDes + "造成" + this.Damage + "点伤害,";
        }
        if(this.IsAddOnEffect == true){
            this.PropDes = this.PropDes + "造成" + this.EffectTurn + "回合" + AddOnEffect[this.Effect] + "状态,";
        }
        if(this.IsSecondEffect == true){
            this.PropDes = this.PropDes + "以及" + this.SecondEffectTurn + "回合" + AddOnEffect[this.SecondEffect] + "状态,";
        }
        this.PropDes = this.PropDes + "一次性使用。";

        //对钥匙类型道具进行另一类编写
        if(this.Type == PropertyType.钥匙道具){
            this.PropDes = PropertyName[this.Name] + "。";
            if(this.Name == PropertyName.开锁器){
                this.PropDes = this.PropDes + "可以进行一次难度为10的机械环境检定来打开任意一道锁。"
            }
        }
    }
}


//道具输出函数
export function GetProp(propName:PropertyName){
    if(propName as number <= 16){
        let propItem = new Weapon(propName);
        if(propItem.Type==null){
            console.debug("武器输入有误");
        }
        return propItem;
    }
    else if(propName as number <= 19){
        let propItem = new Armor(propName);
        if(propItem.Type==null){
            console.debug("装备输入有误");
        }
        return propItem;
    }
    else if(propName as number <= 25){
        let propItem = new Supply(propName);
        if(propItem.Type==null){
            console.debug("回复输入有误");
        }
        return propItem;
    }
    if(propName as number <= 30){
        let propItem = new Trap(propName);
        if(propItem.Type==null){
            console.debug("陷阱输入有误");
        }
        return propItem;
    }
}