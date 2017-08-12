class NoticePanel extends eui.Component implements IPanel
{
    public isCreated:boolean = false;

    public back:eui.Rect;

    public constructor()
    {
        super();
        this.skinName = "resource/skin/panel/NoticePanelSkin.exml";
    }

    public childrenCreated():void
    {
        super.childrenCreated();

        this.isCreated = true;

        this.onShow();
    }

    private onTap( e:egret.TouchEvent ):void
    {
        SoundMgr.instance.playEffect(Sound.CLICK);
        UIMgr.instance.closeCurrentPanel();
    }
    public onShow( ...args:any[] ):void
    {
        if( !this.isCreated )
        {
            return;
        }

        this.back.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
    }

    public onClose( ...args:any[] ):void
    {
        this.back.removeEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
        UIMgr.instance.show( PanelName.StartTipPanel );
    }

    public onUpdate( ...args:any[] ):void
    {

    }
}