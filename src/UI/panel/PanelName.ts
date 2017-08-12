/**
 * Created by Gordon on 22/12/14.
 */
class PanelName
{
    public static BuyPanel:number = Enum.start();
    public static NoticePanel:number = Enum.next();
    public static RulePanel:number = Enum.next();
    public static ShopPanel:number = Enum.next();
    public static SkillTipPanel:number = Enum.next();
    public static RankPanel:number = Enum.next();
    public static QRPanel:number = Enum.next();
    public static StartTipPanel:number = Enum.next();
    public static ResultPanel:number = Enum.next();
    public static ExchangePanel:number = Enum.next();

    /** 所有面板个数*/
    public static PANEL_NUM:number = Enum.next();
    public static PANEL_CLASS:any[] = [];

    public static init():void
    {
        PanelName.PANEL_CLASS[ PanelName.BuyPanel ] = BuyPanel;
        PanelName.PANEL_CLASS[ PanelName.NoticePanel ] = NoticePanel;
        PanelName.PANEL_CLASS[ PanelName.RulePanel ] = RulePanel;
        PanelName.PANEL_CLASS[ PanelName.ShopPanel ] = ShopPanel;
        PanelName.PANEL_CLASS[ PanelName.SkillTipPanel ] = SkillTipPanel;
        PanelName.PANEL_CLASS[ PanelName.RankPanel ] = RankPanel;
        PanelName.PANEL_CLASS[ PanelName.QRPanel ] = QRPanel;
        PanelName.PANEL_CLASS[ PanelName.StartTipPanel ] = StartTipPanel;
        PanelName.PANEL_CLASS[ PanelName.ResultPanel ] = ResultPanel;
        PanelName.PANEL_CLASS[ PanelName.ExchangePanel ] = ExchangePanel;
    }
}