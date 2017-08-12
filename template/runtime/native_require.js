
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"polyfill/promise.min.js",
	"bin-debug/UI/BottomToggle.js",
	"bin-debug/util/Enum.js",
	"bin-debug/UI/panel/PanelName.js",
	"bin-debug/model/DataLoader.js",
	"bin-debug/model/GameData.js",
	"bin-debug/model/GameURL.js",
	"bin-debug/model/Notice.js",
	"bin-debug/model/Pay.js",
	"bin-debug/model/Sound.js",
	"bin-debug/model/User.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/UI/Headline.js",
	"bin-debug/UI/Icon.js",
	"bin-debug/UI/ISelectedButton.js",
	"bin-debug/UI/Layer.js",
	"bin-debug/UI/panel/BuyPanel.js",
	"bin-debug/UI/panel/ExchangePanel.js",
	"bin-debug/UI/panel/IPanel.js",
	"bin-debug/UI/panel/NoticePanel.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/UI/panel/QRPanel.js",
	"bin-debug/UI/panel/RankPanel.js",
	"bin-debug/UI/panel/ResultPanel.js",
	"bin-debug/UI/panel/RulePanel.js",
	"bin-debug/UI/panel/ShopPanel.js",
	"bin-debug/UI/panel/SkillTipPanel.js",
	"bin-debug/UI/panel/StartTipPanel.js",
	"bin-debug/UI/panel/UIMgr.js",
	"bin-debug/UI/scene/GameScence.js",
	"bin-debug/UI/scene/Scence0.js",
	"bin-debug/UI/scene/Scence1.js",
	"bin-debug/UI/scene/Scence2.js",
	"bin-debug/UI/scene/Scence3.js",
	"bin-debug/UI/ToggleButtonGroup.js",
	"bin-debug/UI/UpIcon.js",
	"bin-debug/Main.js",
	"bin-debug/util/GroupName.js",
	"bin-debug/util/SoundMgr.js",
	"bin-debug/util/UIUtil.js",
	"bin-debug/util/WindowAdapter.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "exactFit",
		contentWidth: 540,
		contentHeight: 878,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};