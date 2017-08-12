class RulePanel extends eui.Component implements IPanel
{
    public isCreated:boolean = false;

    private bg:eui.Image;
    private closeBtn:eui.Button;

    public constructor()
    {
        super();
        this.skinName = "resource/skin/panel/RulePanelSkin.exml";
    }

    public childrenCreated():void
    {
        super.childrenCreated();
        this.isCreated = true;

        this.bg.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
        this.closeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );

        this.onShow();
    }

    private onTap( e:egret.TouchEvent ):void
    {
        SoundMgr.instance.playEffect(Sound.CLICK);
        UIMgr.instance.closeCurrentPanel();
    }
    public onShow( ...args:any[] ):void
    {
        if( args.length > 1 )
        {

        }
        if( !this.isCreated )
        {
            return;
        }

    }

    public onClose( ...args:any[] ):void
    {

    }

    public onUpdate( ...args:any[] ):void
    {

    }
}