/**
 * Created by Gordon on 18/05/2017.
 */
class Icon extends eui.Component
{
    public isCreated:boolean = false;

    /**
     * 0~3种帽子，4表示没有帽子
     * @type {number}
     */
    public index:number = -1;
    /**
     * 0~3种眼睛，4表示没有眼睛
     * @type {number}
     */
    public idx:number = -1;

    public group:eui.Group;

    public hat3:eui.Image;
    public hat2:eui.Image;
    public hat1:eui.Image;
    public hat0_0:eui.Image;
    public hat0_1:eui.Image;

    public eye0:eui.Image;
    public eye1:eui.Image;
    public eye2:eui.Image;
    public eye3:eui.Image;

    public desc:eui.Label;

    public constructor()
    {
        super();
        this.once(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/skin/ui/IconSkin.exml";
    }

    private onComplete(): void
    {

    }

    protected childrenCreated(): void
    {
        super.childrenCreated();
        this.isCreated = true;
        this.setIndex();
    }

    public static WIDTH:number = 178;
    public static luckIndex:number = 0;
    public luckIndex2:number;
    public setIndex():void
    {
        if( !this.isCreated )
        {
            return;
        }

        this.index = Math.floor( Math.random() * 5 );
        this.hat0_0.visible = this.hat0_1.visible = (this.index == 0);
        this.hat1.visible = (this.index == 1);
        this.hat2.visible = (this.index == 2);
        this.hat3.visible = (this.index == 3);


        this.idx = Math.floor( Math.random() * 5 );
        this.eye0.visible = (this.idx == 0);
        this.eye1.visible = (this.idx == 1);
        this.eye2.visible = (this.idx == 2);
        this.eye3.visible = (this.idx == 3);

        var item:Array<number> = User.instance.game[Icon.luckIndex].item;
        this.luckIndex2 = Math.floor( Math.random() * item.length );
        var luck:number = item[this.luckIndex2];
        var luckText:string = luck == 0 ? "?" : String(luck);
        this.desc.text = luckText;
    }
}