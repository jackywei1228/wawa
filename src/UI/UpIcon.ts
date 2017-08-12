/**
 * Created by Gordon on 18/05/2017.
 */
class UpIcon extends eui.Component
{
    public isCreated:boolean = false;

    public hat3:eui.Image;
    public hat2:eui.Image;
    public hat1:eui.Image;
    public hat0_0:eui.Image;
    public hat0_1:eui.Image;

    public desc:eui.Label;
    public tail:eui.Image;

    public constructor( icon:Icon )
    {
        super();

        this.index = icon.index;
        this.luckIndex2 = icon.luckIndex2;
        this.once(eui.UIEvent.COMPLETE, this.onComplete, this);
        this.skinName = "resource/skin/ui/UpIconSkin.exml";
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

    /**
     * 0~3种帽子，4表示没有帽子
     * @type {number}
     */
    public index:number = -1;

    public luckIndex2:number = -1;

    public setIndex():void
    {
        if( !this.isCreated )
        {
            return;
        }

        this.hat0_0.visible = this.hat0_1.visible = (this.index == 0);
        this.hat1.visible = (this.index == 1);
        this.hat2.visible = (this.index == 2);
        this.hat3.visible = (this.index == 3);

        var item:Array<number> = User.instance.game[Icon.luckIndex].item;
        var luck:number = item[this.luckIndex2];
        var luckText:string = luck == 0 ? "?" : String(luck);

        this.desc.text = luckText;
    }
}