import TabBar = eui.TabBar;
import ViewStack = eui.ViewStack;
import Label = eui.Label;
class Scence1 extends eui.Component
{
	private static _instance:Scence1;
	public static get instance():Scence1
	{
		if( null == Scence1._instance )
		{
			Scence1._instance = new Scence1();
		}

		return Scence1._instance;
	}
	private tabBar:TabBar;
	private viewStack:ViewStack;
	private userIdLabel:Label;


	public exchangeShop:eui.Image;
	public accumulateGold:eui.Label;
	public exchangeGold:eui.Label;

	public rewardGroup:eui.DataGroup;
	public exchangeGroup:eui.DataGroup;
	public rankGroup:eui.DataGroup;

	public student0:eui.Label;
	public student1:eui.Label;
	public student2:eui.Label;

	public rewardArray:eui.ArrayCollection = new eui.ArrayCollection();
	public exchangeArray:eui.ArrayCollection = new eui.ArrayCollection();
	public rankArray:eui.ArrayCollection = new eui.ArrayCollection();

	public constructor()
	{
		super();
		this.once( eui.UIEvent.COMPLETE,this.onComplete,this );
		this.skinName = "resource/skin/scene/Scene1Skin.exml";
	}
	protected childrenCreated():void
	{
		super.childrenCreated();

		this.tabBar.addEventListener( egret.Event.CHANGE,this.onChange,this, false );
		this.exchangeShop.addEventListener( egret.TouchEvent.TOUCH_TAP,this.onTap,this, false );

		this.exchangeGold.text = String(User.instance.percentage);
		this.accumulateGold.text = String(User.instance.percentage);

		this.student0.text = "一级徒弟数量:  " + User.instance.firstUser;
		this.student1.text = "二级徒弟数量:  " + User.instance.secondUser;
		this.student2.text = "三级徒弟数量:  " + User.instance.thirdUser;

		this.resizeWindow();
	}
	private resizeWindow():void
	{
		// WindowAdapter.resizePanel( this );
	}

	private onComplete( e:eui.UIEvent ):void
	{
		this.rewardGroup.dataProvider = this.rewardArray;
		this.exchangeGroup.dataProvider = this.exchangeArray;
		this.rankGroup.dataProvider = this.rankArray;
		this.userIdLabel.text = "用户ID:" + User.instance.userid;
		this.refresh();
		egret.setInterval( this.refresh, this, 600000 );//十分钟更新一次
	}
	private refresh():void
	{
		DataLoader.instance.post( GameURL.RECORD, null, this.onRecord, this );
	}

	private onRecord(data,url:string ):void
	{
		if( data.code == 0 )
		{//0:成功、其他为错误
			data = data.data;
			var prize:Array<any> = data.prize;
			for( var i:number = 0; i < prize.length; i++ )
			{
				prize[i].title = prize[i].title;
				prize[i].point = `${prize[i].point}金币`;
				prize[i].time = prize[i].time;
				prize[i].sess = `投注${prize[i].sess}金币`;
			}
			this.rewardArray.source = prize;

			User.instance.percentage = data.subtotal.point;
			this.accumulateGold.text = String(data.subtotal.totalPoint);
			this.exchangeGold.text = String(User.instance.percentage);

			this.student0.text = "一级徒弟数量:  " + User.instance.firstUser;
			this.student1.text = "二级徒弟数量:  " + User.instance.secondUser;
			this.student2.text = "三级徒弟数量:  " + User.instance.thirdUser;

			var exchange:Array<any> = data.exchange;
			for( var i:number = 0; i < exchange.length; i++ )
			{
				exchange[i].txt0 = exchange[i].amount + "金币";
				exchange[i].txt1 = exchange[i].status == 1 ? "提现中" : "提现成功";
				exchange[i].txt2 = exchange[i].time;
				exchange[i].txt3 = exchange[i].type == 1 ? "奖金" : "佣金";
				exchange[i].source = i%2 == 0 ? "zq_tiao_1_png" : "zq_tiao_2_png";
			}
			this.exchangeArray.source = exchange;

			var rank:Array<any> = data.rank;
			for( var i:number = 0; i < rank.length; i++ )
			{
				rank[i].txt0 = rank[i].userid;
				rank[i].txt1 = rank[i].amount + "金币";
				rank[i].txt2 = `第${rank[i].rank}名`;
				rank[i].source = i%2 == 0 ? "zq_tiao_1_png" : "zq_tiao_2_png";
			}
			this.rankArray.source = rank;
		}
		else
		{
			if( egret.MainContext.runtimeType == egret.MainContext.RUNTIME_HTML5 )
			{
				alert( "获取用户信息,请稍后重试。错误码：" + JSON.stringify( data ) );
			}
		}
	}
	private onTap( e:egret.Event ):void
	{
		SoundMgr.instance.playEffect( Sound.CLICK );
		// UIMgr.instance.show( PanelName.ShopPanel );

		if( User.instance.percentage < 1 )
		{
			User.instance.exchange = false;
			UIMgr.instance.show( PanelName.ExchangePanel );
			return;
		}
		DataLoader.instance.post( GameURL.PERCENTAGE, null, this.onPercentage, this );
	}

	private onPercentage(data,url:string ):void
	{
		if( data.code == 0 )
		{//0:成功、其他为错误
			User.instance.exchange = true;
			Scence1.instance.exchangeGold.text = "0";
		}
		else
		{
			User.instance.exchange = false;
			alert( data.errMsg )
		}
	}
	private onChange( e:egret.Event ):void
	{
		SoundMgr.instance.playEffect( Sound.CLICK );
		this.viewStack.selectedIndex = this.tabBar.selectedIndex;
	}
}