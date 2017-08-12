import BottomToggle = control.BottomToggle;
class GameScence extends eui.Component
{
	private bottomToggle:BottomToggle;
	public constructor()
	{
		super();
		this.once( eui.UIEvent.COMPLETE,this.onComplete,this );
		this.skinName = "resource/skin/GameSceneSkin.exml";
	}
	protected childrenCreated():void
	{
		super.childrenCreated();
		Scence0.instance.onShow();
		Layer.SCENE_LAYER.addChild( Scence0.instance );

		this.bottomToggle.addEventListener( egret.Event.CHANGE,this.onChange,this );
		this.resizeWindow();
	}
	private resizeWindow():void
	{
		// WindowAdapter.resizePanel( this );
	}

	private onComplete( e:eui.UIEvent ):void
	{
	}
	private isScene0:boolean = true;
	private isScene3:boolean = false;
	private onChange():void
	{
		if( this.isScene0 )
		{
			this.isScene0 = false;
			Scence0.instance.onClose();
		}
		else if( this.isScene3 )
		{
			this.isScene3 = false;
			Scence3.instance.onClose();
		}
		UIMgr.instance.closeCurrentPanel( null, null, true );
		Layer.SCENE_LAYER.removeChildren();
		switch( this.bottomToggle.toggleGroup.selectedIndex )
		{
			case 0:
				this.isScene0 = true;
				Scence0.instance.onShow();
				Layer.SCENE_LAYER.addChild( Scence0.instance );
				break;

			case 1:
				Layer.SCENE_LAYER.addChild( Scence1.instance );
				break;

			case 2:
				Layer.SCENE_LAYER.addChild( Scence2.instance );
				break;

			case 3:
				this.isScene3 = true;
				Scence3.instance.onShow();
				Layer.SCENE_LAYER.addChild( Scence3.instance );
				break;
		}
	}
}