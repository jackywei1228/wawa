/**
 * Created by Gordon on 18/05/2017.
 */
module control
{
    import ToggleButton = eui.ToggleButton;
    export class BottomToggle extends eui.Component
    {
        public toggleGroup:ToggleButtonGroup = new ToggleButtonGroup();
        private scene0:ToggleButton;
        private scene1:ToggleButton;
        private scene2:ToggleButton;
        private scene3:ToggleButton;
        public constructor()
        {
            super();
            this.skinName = "resource/skin/ui/BottomToggleSkin.exml";
            // 夹娃娃 收入 二维码 客服
            this.once(eui.UIEvent.COMPLETE, this.onComplete, this);
        }

        private onComplete(): void
        {

        }

        protected childrenCreated(): void
        {
            super.childrenCreated();

            this.toggleGroup.addToggleButton( this.scene0 );
            this.toggleGroup.addToggleButton( this.scene1 );
            this.toggleGroup.addToggleButton( this.scene2 );
            this.toggleGroup.addToggleButton( this.scene3 );
            this.toggleGroup.selectedIndex = 0;
            this.toggleGroup.addEventListener( egret.Event.CHANGE, this.onChange, this );
        }

        private onChange():void
        {
            SoundMgr.instance.playEffect( Sound.CLICK );
            this.dispatchEvent(new egret.Event(egret.Event.CHANGE));
        }
    }
}