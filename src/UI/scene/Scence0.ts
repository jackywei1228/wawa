class Scence0 extends eui.Component
{
	public isCreated:boolean = false;

	private radioBtn5:eui.RadioButton;

	private startBtn:eui.Image;
	private ruleBtn:eui.Image;
	private tipBtn:eui.Image;
	private withdraw:eui.Image;
	private shopBtn:eui.Image;
	public headline:Headline;


	/**
	 * 充值金币数
	 */
	private pointLabel:eui.Label;
	/**
	 * 奖金
	 */
	private rewardLabel:eui.Label;
	private userIdLabel:eui.Label;

	private clamp:eui.Image;
	private clampGroup:eui.Group;
	public group0:eui.Group;
	public group1:eui.Group;

	private static _instance:Scence0;
	public static get instance():Scence0
	{
		if( null == Scence0._instance )
		{
			Scence0._instance = new Scence0();
		}

		return Scence0._instance;
	}
	public constructor()
	{
		super();
		this.once( eui.UIEvent.COMPLETE,this.onComplete,this );
		this.skinName = "resource/skin/scene/Scene0Skin.exml";
	}
	protected childrenCreated():void
	{
		super.childrenCreated();

		this.startBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTapStart, this );

		this.ruleBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
		this.tipBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
		this.withdraw.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
		this.shopBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );

		this.userIdLabel.text = "用户ID:" + User.instance.userid;
		this.initUserInfo();

		this.radioBtn5.group.addEventListener( eui.UIEvent.CHANGE, (evt) => {
			SoundMgr.instance.playEffect( Sound.CLICK );
			this.setClampSource();
		},this );

		this.resizeWindow();
	}
	private setClampSource():void
	{
		if( this.clamping )
		{
			return;
		}
		this.setClampSource2();
	}
	private setClampSource2():void
	{
		var selectedValue:number = this.radioBtn5.group.selectedValue;
		if( 5 == selectedValue )
		{
			this.clamp.source = "jiazi1.1_png";
		}
		else if( 10 == selectedValue )
		{
			this.clamp.source = "jiazi2.1_png";
		}
		else if( 20 == selectedValue )
		{
			this.clamp.source = "jiazi3.1_png";
		}
		if( this.clamping )
		{
			return;
		}
		var game:Array<GameData> = User.instance.game;
		for( var i:number=0; i < game.length; i++ )
		{
			if( game[i].sessId == selectedValue )
			{
				Icon.luckIndex = i;
				for( var n:number=0; n < 4; n++ )
				{
					this.icons2[n].setIndex();
				}
				break;
			}
		}
	}

	public initUserInfo():void
	{
		this.pointLabel.text = User.instance.point.toFixed( 2 ).toString();//toPrecision 整数、小数位一共 位数; toFixed小数位数
		this.rewardLabel.text = User.instance.reward.toFixed( 2 ).toString();
	}
	private resizeWindow():void
	{
		// WindowAdapter.resizePanel( this );
	}

	private clamping:boolean = false;
	private clampGroupY:number;
	private onTapStart( e:egret.TouchEvent ):void
	{
		if( this.clamping )
		{
			return;
		}
		SoundMgr.instance.playEffect( Sound.CLICK );
		var selectedValue:number = this.radioBtn5.group.selectedValue;
		if( User.instance.point < selectedValue )
		{
			UIMgr.instance.show( PanelName.BuyPanel );
			return;
		}
		if( 5 == selectedValue )
		{
			this.clamp.source = "jiazi1.2_png";
		}
		else if( 10 == selectedValue )
		{
			this.clamp.source = "jiazi2.2_png";
		}
		else if( 20 == selectedValue )
		{
			this.clamp.source = "jiazi3.2_png";
		}
		this.clamping = true;
		this.clampGroupY = this.clampGroup.y;
		egret.Tween.get( this.clampGroup ).to( { y:this.clampGroupY + 400 }, 2000 ).call(
			this.catch, this ).call( this.setClampSource2, this ).to( { y:this.clampGroupY + 100 },
			1500 ).call( this.drop, this ).to( { y:this.clampGroupY }, 500 ).call( this.clampOver, this );
	}

	private upIcon:UpIcon;
	private catch():void
	{
		var i:number;
		var min:number = this.width;
		for( var n:number=0; n < 4; n++ )
		{
			var temp:number = Math.abs( this.icons2[n].x - this.group1.width/2 );
			if( temp < min )
			{
				min = temp;
				i = n;
			}
		}

		var game:GameData = User.instance.game[Icon.luckIndex];
		var amount:number = game.item[ this.icons2[i].luckIndex2 ];
		var data = `amount=${amount}&sessId=${game.sessId}`;
		DataLoader.instance.post( GameURL.PLAY, data, this.onPlay, this );
		var icon:UpIcon = new UpIcon( this.icons2[i] );
		this.upIcon = icon;
		this.clampGroup.addChild( icon );
		icon.y = 531;
		icon.horizontalCenter = 0;
		this.icons2[i].group.visible = false;
	}

	private onPlay( data,url:string ):void
	{
		if( data.code == 0 )
		{//0:成功、其他为错误
			data = data.data;

			User.instance.reward = data.reward;
			User.instance.point = data.point;
			this.pointLabel.text = data.point;
			this.rewardLabel.text = data.reward;
			User.instance.amount = data.amount;
			User.instance.status = (data.status == 1);
		}
		else if( data.code == 100 )
		{
			UIMgr.instance.show( PanelName.BuyPanel );
		}
		else
		{
			if( egret.MainContext.runtimeType == egret.MainContext.RUNTIME_HTML5 )
			{
				alert( "获取用户信息,请稍后重试。错误码：" + JSON.stringify( data ) );
			}
		}
	}
	private drop():void
	{
		if( !User.instance.status )
		{
			egret.Tween.get( this.upIcon ).to( {y:this.upIcon.y + 400 }, 1000 ).call( this.dropIcon, this );
		}
	}

	private dropIcon():void
	{
		UIMgr.instance.show( PanelName.ResultPanel );
		this.clampGroup.removeChild( this.upIcon );
	}
	private clampOver():void
	{
		this.clamping = false;
		egret.setTimeout( ()=>{
			this.setClampSource();
		}, this, 500 );
		if( User.instance.status )
		{
			UIMgr.instance.show( PanelName.ResultPanel );
			this.clampGroup.removeChild( this.upIcon );
		}
	}
	private onTap( e:egret.TouchEvent ):void
	{
		SoundMgr.instance.playEffect( Sound.CLICK );
		var target:eui.Image = e.target;
		UIUtil.loopTween( target, { scaleX:0, scaleY:0 }, { scaleX:target.scaleX, scaleY:target.scaleY } );
		if( this.ruleBtn === target )
		{
			UIMgr.instance.show( PanelName.RulePanel );
		}
		else if( this.tipBtn === target )
		{
			UIMgr.instance.show( PanelName.SkillTipPanel );
		}
		else if( this.withdraw === target )
		{
			if( User.instance.reward < 1 )
			{
				User.instance.exchange = false;
				UIMgr.instance.show( PanelName.ExchangePanel );
				return;
			}
			DataLoader.instance.post( GameURL.REWARD, null, this.onReward, this );
		}
		else if( this.shopBtn === target )
		{
			UIMgr.instance.show( PanelName.ShopPanel );
		}
	}

	private onReward(data,url:string ):void
	{
		if( data.code == 0 )
		{//0:成功、其他为错误
			User.instance.exchange = true;
			this.rewardLabel.text = "0";
			User.instance.reward = 0;
		}
		else
		{
			User.instance.exchange = false;
			alert( data.errMsg )
		}
	}
	private onComplete( e:eui.UIEvent ):void
	{
		UIMgr.instance.show( PanelName.NoticePanel );
		this.initIcon();
		this.isCreated = true;
	}
	private icons:Array<Icon> = [];
	private icons2:Array<Icon> = [];
	private scale:number = 0.54;

	private lastIconIndex:number = 6;
	private lastIcon2Index:number = 0;
	private initIcon():void
	{
		for( var i:number=0; i < 7; i++ )
		{
			var icon:Icon = new Icon();
			this.icons.push( icon );
			icon.x = i * Icon.WIDTH;
			icon.scaleX = icon.scaleY = this.scale;
			this.group0.addChild( icon );
			icon.setIndex();
		}

		for( var n:number=0; n < 4; n++ )
		{
			var icon:Icon = new Icon();
			this.icons2.push( icon );
			icon.x = n * Icon.WIDTH;
			this.group1.addChild( icon );
			icon.validateNow();
			icon.anchorOffsetX = icon.width/2;
			icon.setIndex();
		}
	}
	public onShow():void
	{
		egret.startTick( this.onTick, this );
	}
	public onClose():void
	{
		egret.stopTick( this.onTick, this );
	}

	private onTick( timeStamp:number ):boolean
	{
		if( !this.isCreated )
		{
			return true;
		}
		var xx:number = -Icon.WIDTH*this.scale;
		for( var i:number=0; i < 7; i++ )
		{
			if( this.icons[i].x <= xx )
			{
				this.icons[i].x = this.icons[this.lastIconIndex].x + Icon.WIDTH;
				this.icons[i].group.visible = true;
				this.icons[i].setIndex();
				this.lastIconIndex = i;
			}
			this.icons[i].x -= 2;
		}
		for( var n:number=0; n < 4; n++ )
		{
			if( this.icons2[n].x >= (this.width + this.icons2[n].anchorOffsetX) )
			{
				this.icons2[n].x = this.icons2[this.lastIcon2Index].x - Icon.WIDTH;
				this.icons2[n].group.visible = true;
				this.icons2[n].setIndex();
				this.lastIcon2Index = n;
			}
			this.icons2[n].x += 2;
		}

		return true;
	}
}