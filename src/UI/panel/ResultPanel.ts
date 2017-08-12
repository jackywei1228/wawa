class ResultPanel extends eui.Component implements IPanel
{
    public isCreated:boolean = false;

    public closeBtn:eui.Image;
    public result:eui.BitmapLabel;
    public continueBtn:eui.Image;
    public icon:eui.Image;

    public bigWin1:eui.Image;
    public bigWin0:eui.Image;

    public lose:eui.Image;

    public constructor()
    {
        super();
        this.skinName = "resource/skin/panel/ResultPanelSkin.exml";
    }

    public childrenCreated():void
    {
        super.childrenCreated();

        this.isCreated = true;

        this.closeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
        this.continueBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );

        this.onShow();
    }

    private onTap( e:egret.TouchEvent ):void
    {
        SoundMgr.instance.playEffect(Sound.CLICK);
        UIMgr.instance.closeCurrentPanel();
    }
    private loseSource:Array<string> = [ "wenzi_7_png", "wenzi_8_png", "wenzi_9_png", "wenzi_10_png", "wenzi_11_png", "wenzi_12_png" ];
    public onShow( ...args:any[] ):void
    {
        if( !this.isCreated )
        {
            return;
        }
        this.result.text = String(User.instance.amount);
        this.validateNow();
        egret.setTimeout( ()=>{
            this.icon.x = this.result.x + this.result.width + 20;
        }, this, 200 );
        this.bigWin0.visible = this.bigWin1.visible = User.instance.status;

        var index:number = Math.floor( Math.random() * this.loseSource.length );
        this.lose.source = this.loseSource[ index ];
        this.lose.visible = !User.instance.status;
    }

    public onClose( ...args:any[] ):void
    {

    }

    public onUpdate( ...args:any[] ):void
    {

    }
}