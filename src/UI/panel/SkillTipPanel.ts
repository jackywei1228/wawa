class SkillTipPanel extends eui.Component implements IPanel
{
    public isCreated:boolean = false;
    private bg:eui.Image;

    public constructor()
    {
        super();
        this.skinName = "resource/skin/panel/SkillTipPanelSkin.exml";
    }

    public childrenCreated():void
    {
        super.childrenCreated();
        this.isCreated = true;

        this.bg.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );

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
    private onYes( e:egret.TouchEvent ):void
    {

        UIMgr.instance.closeCurrentPanel();
    }
}