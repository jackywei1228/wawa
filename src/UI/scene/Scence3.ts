class Scence3 extends eui.Component
{
	private static _instance:Scence3;
	public static get instance():Scence3
	{
		if( null == Scence3._instance )
		{
			Scence3._instance = new Scence3();
		}

		return Scence3._instance;
	}
	public code:eui.Image;

	public constructor()
	{
		super();
		this.once( eui.UIEvent.COMPLETE,this.onComplete,this, false );
		this.skinName = "resource/skin/scene/Scene3Skin.exml";
	}
	protected childrenCreated():void
	{
		super.childrenCreated();

		var img:any = document.getElementById( "kefu" );
		img.src = User.instance.kefu;

		var e = document.body.clientWidth / 540;
		var t = document.body.clientHeight / 878;
		img.style.width = 348 * e + "px";
		img.style.height = 348 * t + "px";
		img.style.left = 97 * e + "px";
		img.style.top = 269 * t + "px";

		this.resizeWindow();
	}
	private resizeWindow():void
	{
		// WindowAdapter.resizePanel( this );
	}

	private onComplete( e:eui.UIEvent ):void
	{
		RES.getResByUrl( User.instance.kefu, (data,url)=>{
			// this.code.source = data;
		}, this, RES.ResourceItem.TYPE_IMAGE );
	}

	public onShow():void
	{
		var img:any = document.getElementById( "kefu" );
		img.style.display = "inline";
	}
	public onClose():void
	{
		var img:any = document.getElementById( "kefu" );
		img.style.display = "none";
	}
}