/**
 * ToggleButton分组管理
 */
class ToggleButtonGroup extends egret.EventDispatcher
{
	/**
	 * 所有按钮
	 */
	private _toggleButtons:Array<ISelectedButton>;
	/**
	 * 当前选中的按钮
	 */
	private _currSelectedButton:ISelectedButton;
	/**
	 * 当前选中按钮的下标
	 */
	private _currSelectedIndex:number;
	/** 
	 * 启用
	 */
	public enabelSelect:boolean = true;

	public constructor() 
	{
		super();

		this._currSelectedIndex = -1;
		this._toggleButtons = [];
		this._currSelectedButton = null;
	}

	/**
	 * 添加一个ToggleButton按钮
	 */
	public addToggleButton(btn:ISelectedButton):void
	{
		if(!btn || this._toggleButtons.indexOf(btn) != -1) return;

		btn.$autoSelected = false;
		btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.__toggleButtonClickHandler, this);

		this._toggleButtons.push(btn);
	}

	/**
	 * 按钮点击
	 */
	private __toggleButtonClickHandler(e:egret.TouchEvent):void
	{
		let target:ISelectedButton = e.currentTarget as ISelectedButton;

		this.selectedIndex = this._toggleButtons.indexOf(target);
	}

	/**
	 * 当前选中位置
	 */
	public set selectedIndex($index:number)
	{
		if(!this.enabelSelect) return;
		
		let change:boolean = this._currSelectedIndex != $index;
		
		if($index == -1)
		{
			if(this._currSelectedButton)
			{
				this._currSelectedButton.selected = false;
			}
			this._currSelectedIndex = $index;
			this._currSelectedButton = null;
		}
		else
		{
			let target:ISelectedButton = this._toggleButtons[$index];
			if(!target.selected)
			{
				if(this._currSelectedButton)
				{
					this._currSelectedButton.selected = false;
				}
				target.selected = true;
				this._currSelectedIndex = $index;
				this._currSelectedButton = target;
			}
		}

		if(change)
		{
			this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
		}
	}

	public get selectedIndex():number
	{
		return this._currSelectedIndex;
	}

	/**
	 * 当前选中的按钮
	 */
	public get currSelectedButton():ISelectedButton
	{
		return this._currSelectedButton;
	}

	/**
	 * 根据索引位置获取按钮
	 * @param $index 按钮索引
	 */
	public getButtonByIndex($index:number):ISelectedButton
	{
		if($index >= 0 && $index < this._toggleButtons.length)
		{
			return this._toggleButtons[$index];
		}
		return null;
	}

	/**
	 * 根据按钮获取索引位置
	 * @param $btn 按钮
	 */
	public getIndexByButton($btn:eui.ToggleButton):number
	{
		return this._toggleButtons.indexOf($btn);
	}

	/**
	 * 移除所有按钮
	 */
	public removeAllButton():void
	{
		for(let i = 0; i < this._toggleButtons.length; i ++)
		{
			this._toggleButtons[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.__toggleButtonClickHandler, this);
		}
		this._toggleButtons.splice(0, this._toggleButtons.length);
	}

	public dispose():void
	{
		this.removeAllButton();
		this._currSelectedButton = null;
		this._toggleButtons = null;
	}
}