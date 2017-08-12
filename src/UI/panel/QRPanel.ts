class QRPanel extends eui.Component implements IPanel
{
    public isCreated:boolean = false;

    public bg:eui.Image;
    public closeBtn:eui.Button;
    public userIdLabel:eui.Label;
    public code:eui.Image;

    public constructor()
    {
        super();
        this.skinName = "resource/skin/panel/QRPanelSkin.exml";

        this.visible = false;
    }

    public childrenCreated():void
    {
        super.childrenCreated();

        this.isCreated = true;

        this.bg.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
        this.closeBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );

        this.userIdLabel.text = "用户ID:" + User.instance.userid;

        RES.getResByUrl( User.instance.qrcode, (data,url)=>{
            // this.code.source = data;
        }, this, RES.ResourceItem.TYPE_IMAGE );

        var img:any = document.getElementById( "share" );
        var closeBtnImg:any = document.getElementById( "closeBtn" );
        var t = document.body.clientHeight / 878;
        /*img.src = User.instance.qrcode;
        var e = document.body.clientWidth / 540;
        img.style.width = 162 * e + "px";
        img.style.height = 162 * t + "px";
        img.style.left = 189 * e + "px";
        img.style.top = 417 * t + "px";*/

        img.src = User.instance.saveQrcode;
        img.style.width = document.body.clientWidth + "px";
        img.style.height = (document.body.clientHeight - 64 * t) + "px";
        img.style.left = "0px";
        img.style.top = "0px";
        var func = ( e:MouseEvent )=>{
            if( e.screenY < 250 && e.screenX > 330 )
            {
                SoundMgr.instance.playEffect(Sound.CLICK);
                var img:any = document.getElementById( "share" );
                var closeBtnImg:any = document.getElementById( "closeBtn" );
                img.style.display = "none";
                closeBtnImg.style.display = "none";
                UIMgr.instance.closeCurrentPanel();
            }
        };
        img.onclick = func;
        closeBtnImg.onclick = func;

        this.onShow();
    }

    private onTap( e:egret.TouchEvent ):void
    {
        SoundMgr.instance.playEffect(Sound.CLICK);
        UIMgr.instance.closeCurrentPanel();
    }

    public onShow( ...args:any[] ):void
    {
        this.visible = false;
        var img:any = document.getElementById( "share" );
        img.style.display = "inline";

        var closeBtnImg:any = document.getElementById( "closeBtn" );
        closeBtnImg.style.display = "inline";
    }

    public onClose( ...args:any[] ):void
    {
        var img:any = document.getElementById( "share" );
        img.style.display = "none";

        var closeBtnImg:any = document.getElementById( "closeBtn" );
        closeBtnImg.style.display = "none";
    }

    public onUpdate( ...args:any[] ):void
    {

    }
}