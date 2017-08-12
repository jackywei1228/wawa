class Scence2 extends eui.Component
{
	private static _instance:Scence2;
	public static get instance():Scence2
	{
		if( null == Scence2._instance )
		{
			Scence2._instance = new Scence2();
		}

		return Scence2._instance;
	}
	private QRBtn:eui.Image;
	private rankBtn:eui.Image;
	private ruleBtn:eui.Image;

	public constructor()
	{
		super();
		this.once( eui.UIEvent.COMPLETE,this.onComplete,this );
		this.skinName = "resource/skin/scene/Scene2Skin.exml";
	}
	protected childrenCreated():void
	{
		super.childrenCreated();

		this.QRBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
		this.rankBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
		this.ruleBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );

		this.resizeWindow();
	}
	private resizeWindow():void
	{
		// WindowAdapter.resizePanel( this );
	}

	private onTap( e:egret.TouchEvent ):void
	{
		SoundMgr.instance.playEffect(Sound.CLICK);
		var target:eui.Image = e.target;
		if( this.QRBtn === target )
		{
			UIMgr.instance.show( PanelName.QRPanel );
		}
		else if( this.rankBtn === target )
		{
			UIMgr.instance.show( PanelName.RankPanel );
		}
		else if( this.ruleBtn === target )
		{
			UIMgr.instance.show( PanelName.RulePanel );
		}
	}
	private onComplete( e:eui.UIEvent ):void
	{

	}
	private onChange():void
	{

	}
}