/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : haokuai

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2017-04-27 11:21:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for haokuai_fenxiao
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_fenxiao`;
CREATE TABLE `haokuai_fenxiao` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fjine1` int(11) NOT NULL DEFAULT '0',
  `fjine2` int(11) NOT NULL DEFAULT '0',
  `fjine3` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_fenxiao
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_hb
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_hb`;
CREATE TABLE `haokuai_hb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hzhifue` int(11) NOT NULL DEFAULT '0',
  `hminmoney` int(11) NOT NULL DEFAULT '0',
  `hmaxmoney` int(11) NOT NULL DEFAULT '0',
  `hgeshu` int(11) NOT NULL DEFAULT '0',
  `hbianhua` int(11) NOT NULL DEFAULT '0',
  `hlastbian` int(11) NOT NULL DEFAULT '0',
  `hpaixu` int(11) NOT NULL DEFAULT '0',
  `hb` varchar(300) NOT NULL DEFAULT '',
  `hcode` int(2) NOT NULL DEFAULT '1',
  `htype` int(2) NOT NULL DEFAULT '1',
  `htime` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hbianhua` (`hbianhua`),
  KEY `hcode` (`hcode`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_hb
-- ----------------------------
INSERT INTO `haokuai_hb` VALUES ('7', '100', '0', '0', '0', '0', '0', '0', '', '1', '2', '1491534903');

-- ----------------------------
-- Table structure for haokuai_hb_gailv
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_hb_gailv`;
CREATE TABLE `haokuai_hb_gailv` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hbid` int(11) NOT NULL DEFAULT '0',
  `hmin` int(11) NOT NULL DEFAULT '0',
  `hmax` int(11) NOT NULL DEFAULT '0',
  `hgailv` int(11) NOT NULL DEFAULT '0',
  `hjiaodu` int(11) NOT NULL DEFAULT '0',
  `hcishu` int(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `hbid` (`hbid`),
  KEY `hcishu` (`hcishu`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_hb_gailv
-- ----------------------------
INSERT INTO `haokuai_hb_gailv` VALUES ('27', '7', '100', '200', '10', '0', '10');

-- ----------------------------
-- Table structure for haokuai_news
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_news`;
CREATE TABLE `haokuai_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ncontent` text NOT NULL,
  `ntype` int(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `ntype` (`ntype`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_news
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_saolei_hbset
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_saolei_hbset`;
CREATE TABLE `haokuai_saolei_hbset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hbzhifu` int(11) NOT NULL DEFAULT '0',
  `hgeshu` int(11) NOT NULL DEFAULT '0',
  `hweiduo` int(11) NOT NULL DEFAULT '0',
  `hweishao` int(11) NOT NULL DEFAULT '0',
  `hpaixu` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_saolei_hbset
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_saolei_linghb
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_saolei_linghb`;
CREATE TABLE `haokuai_saolei_linghb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL DEFAULT '0',
  `hblistid` int(11) NOT NULL DEFAULT '0',
  `hbe` int(11) NOT NULL DEFAULT '0',
  `hcode` int(2) NOT NULL DEFAULT '1',
  `ttime` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `hblistid` (`hblistid`),
  KEY `hcode` (`hcode`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_saolei_linghb
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_saolei_peifu
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_saolei_peifu`;
CREATE TABLE `haokuai_saolei_peifu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL DEFAULT '0',
  `fauserid` int(11) NOT NULL DEFAULT '0',
  `hblistid` int(11) NOT NULL DEFAULT '0',
  `hpeie` int(11) NOT NULL DEFAULT '0',
  `ttime` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `hblistid` (`hblistid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_saolei_peifu
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_saolei_userfa
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_saolei_userfa`;
CREATE TABLE `haokuai_saolei_userfa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL DEFAULT '0',
  `hbid` int(11) NOT NULL DEFAULT '0',
  `hzhifue` int(11) NOT NULL DEFAULT '0',
  `hgeshu` int(11) NOT NULL DEFAULT '0',
  `hweishu` int(2) NOT NULL DEFAULT '0',
  `htime` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `hbid` (`hbid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_saolei_userfa
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_saolei_userfalist
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_saolei_userfalist`;
CREATE TABLE `haokuai_saolei_userfalist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `faid` int(11) NOT NULL DEFAULT '0',
  `hmoney` int(11) NOT NULL DEFAULT '0',
  `hweishu` int(11) NOT NULL DEFAULT '0',
  `hcode` int(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `faid` (`faid`),
  KEY `hcode` (`hcode`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_saolei_userfalist
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_sys_config
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_sys_config`;
CREATE TABLE `haokuai_sys_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cduanlianjie` int(2) NOT NULL DEFAULT '1',
  `ctongzhi` varchar(500) NOT NULL DEFAULT '',
  `cwxchoutxt` varchar(500) NOT NULL DEFAULT '',
  `cbeicode` int(2) NOT NULL DEFAULT '2',
  `cbeipay` int(11) NOT NULL DEFAULT '1',
  `cbeimchid` varchar(50) DEFAULT '',
  `cbeiappkey` varchar(50) DEFAULT '',
  `cbeiurl` varchar(150) NOT NULL DEFAULT '',
  `cbeiappid` varchar(50) NOT NULL DEFAULT '',
  `cbeiappsecret` varchar(50) NOT NULL DEFAULT '',
  `cwxappid` varchar(50) NOT NULL DEFAULT '',
  `cwxappsecret` varchar(50) NOT NULL DEFAULT '',
  `cwxappkey` varchar(40) NOT NULL DEFAULT '',
  `cwxmchid` varchar(30) NOT NULL DEFAULT '',
  `ckouliang` int(3) NOT NULL DEFAULT '0',
  `cyongjinfa` int(2) NOT NULL DEFAULT '1',
  `cyongjine` int(11) NOT NULL DEFAULT '0',
  `cdenglucode` int(3) NOT NULL DEFAULT '1',
  `cdailishengji` int(2) NOT NULL DEFAULT '1',
  `cdailicode` int(2) NOT NULL DEFAULT '1',
  `cmaurl` varchar(150) NOT NULL DEFAULT '',
  `cfaurl` varchar(150) NOT NULL DEFAULT '',
  `cpingbie` int(11) NOT NULL DEFAULT '0',
  `cchongzong` int(11) NOT NULL DEFAULT '0',
  `cgundong` int(4) NOT NULL DEFAULT '1',
  `adminid` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_sys_config
-- ----------------------------
INSERT INTO `haokuai_sys_config` VALUES ('2', '2', '', '', '2', '1', '1423150802', '743894a0e4a801fc3743894a0e4a801fc3', 'http://wawa.imshuodai.com', 'wxe826cc6e624e725f', 'd2dc6f6cb0033cd01d8694faa9973c1a', 'wxe826cc6e624e725f', 'd2dc6f6cb0033cd01d8694faa9973c1a', '743894a0e4a801fc3743894a0e4a801fc3', '1423150802', '0', '2', '0', '2', '1', '2', 'http://wawa.imshuodai.com', 'http://wawa.imshuodai.com', '0', '0', '1', '1');

-- ----------------------------
-- Table structure for haokuai_sys_log
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_sys_log`;
CREATE TABLE `haokuai_sys_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lbiaoshi` varchar(50) NOT NULL DEFAULT '',
  `lcon` text,
  `ltime` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_sys_log
-- ----------------------------
INSERT INTO `haokuai_sys_log` VALUES ('5', '微信企业付款', '<xml><amount>179</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>Rv1J3QEDkPuNJ13v</nonce_str><openid>oFc-1t9rCVIdyMsxe9u4qOvTFl90</openid><partner_trade_no>20170407113643792</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>112.10.81.116</spbill_create_ip><sign>08D71E75541BEC4CEE065383F9A65C19</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491536203');
INSERT INTO `haokuai_sys_log` VALUES ('6', '微信企业付款', '<xml><amount>149</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>Ha4ZBUCbLbRWijHV</nonce_str><openid>oFc-1t8ez749JmPXnIUFIi4Iaa-A</openid><partner_trade_no>20170407113836582</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>122.224.191.234</spbill_create_ip><sign>D4335C6ABD907163CB05CE08CF1B00DF</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491536316');
INSERT INTO `haokuai_sys_log` VALUES ('7', '微信企业付款', '<xml><amount>149</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>LCUajQWXtEdh8oq0</nonce_str><openid>oFc-1t8ez749JmPXnIUFIi4Iaa-A</openid><partner_trade_no>20170407113944308</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>122.224.191.234</spbill_create_ip><sign>3B0552F526F9DF8C09BB4A3141A40194</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491536384');
INSERT INTO `haokuai_sys_log` VALUES ('8', '微信企业付款', '<xml><amount>149</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>lAKxFgZFeLZ2ZTdW</nonce_str><openid>oFc-1t8ez749JmPXnIUFIi4Iaa-A</openid><partner_trade_no>20170407114134234</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>122.224.191.234</spbill_create_ip><sign>417BAB11B9838ECF9766547F92C26BF5</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491536495');
INSERT INTO `haokuai_sys_log` VALUES ('9', '微信企业付款', '<xml><amount>179</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>mdzgwGnYsoX09wiH</nonce_str><openid>oFc-1t9rCVIdyMsxe9u4qOvTFl90</openid><partner_trade_no>20170407114154559</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>112.10.81.116</spbill_create_ip><sign>39E976F9926836109CCC8366A040E14F</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491536514');
INSERT INTO `haokuai_sys_log` VALUES ('10', '微信企业付款', '<xml><amount>142</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>fSH7qZTWTDmbda1Z</nonce_str><openid>oFc-1tw_Q-vH1s426eRaMaFaAXBI</openid><partner_trade_no>20170407114313973</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>112.10.81.116</spbill_create_ip><sign>F7E90CECAE235B1FE68E3581B1EE44DE</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491536594');
INSERT INTO `haokuai_sys_log` VALUES ('11', '微信企业付款', '<xml><amount>179</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>bNIjUqoBHLthdBHM</nonce_str><openid>oFc-1t9rCVIdyMsxe9u4qOvTFl90</openid><partner_trade_no>20170407114945200</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>112.10.81.116</spbill_create_ip><sign>52EA567FAB475E1E37430625F61FD4AA</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491536985');
INSERT INTO `haokuai_sys_log` VALUES ('12', '微信企业付款', '<xml><amount>149</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>pNiadDH5sncgfCHq</nonce_str><openid>oFc-1t8ez749JmPXnIUFIi4Iaa-A</openid><partner_trade_no>20170407115238358</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>183.206.169.23</spbill_create_ip><sign>8E97B7B0D6E250D42C1766E43E695813</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491537158');
INSERT INTO `haokuai_sys_log` VALUES ('13', '微信企业付款', '<xml><amount>149</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>5nhUhY1Jbupq2bRG</nonce_str><openid>oFc-1t8ez749JmPXnIUFIi4Iaa-A</openid><partner_trade_no>20170407115319329</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>183.206.169.23</spbill_create_ip><sign>1EC707B84B9B53AE6FF08C87033D8F24</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491537200');
INSERT INTO `haokuai_sys_log` VALUES ('14', '微信企业付款', '<xml><amount>149</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>y6EOkefv2PUwddQ0</nonce_str><openid>oFc-1t8ez749JmPXnIUFIi4Iaa-A</openid><partner_trade_no>20170407115955844</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>183.206.169.23</spbill_create_ip><sign>7A9E816CCD1DCA958E13FE33F045F7C9</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491537595');
INSERT INTO `haokuai_sys_log` VALUES ('15', '微信企业付款', '<xml><amount>166</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>r089TROpGGP1nZxW</nonce_str><openid>oFc-1t-qFShZia-FmW9NEwVVqWMQ</openid><partner_trade_no>20170407120319486</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>183.206.167.234</spbill_create_ip><sign>68523598C39DF739E2F138A26123F34D</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491537799');
INSERT INTO `haokuai_sys_log` VALUES ('16', '微信企业付款', '<xml><amount>149</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>RdCh6iFYR28et9u6</nonce_str><openid>oFc-1t8ez749JmPXnIUFIi4Iaa-A</openid><partner_trade_no>20170407120837926</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>112.17.244.213</spbill_create_ip><sign>6A1B0C85FF00F6A9C061181C49BF93ED</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491538117');
INSERT INTO `haokuai_sys_log` VALUES ('17', '微信企业付款', '<xml><amount>149</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>HWKjT42eBda1GkJ7</nonce_str><openid>oFc-1t8ez749JmPXnIUFIi4Iaa-A</openid><partner_trade_no>20170407120919913</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>183.206.167.234</spbill_create_ip><sign>99392D47049E6D0E4499753F6FF5F9D6</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491538159');
INSERT INTO `haokuai_sys_log` VALUES ('18', '微信企业付款', '<xml><amount>149</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>F2ugh1pYRpn1svnp</nonce_str><openid>oFc-1t8ez749JmPXnIUFIi4Iaa-A</openid><partner_trade_no>20170407121227501</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>183.206.167.234</spbill_create_ip><sign>851CE8180CCB871566AC136E10CD24C2</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491538347');
INSERT INTO `haokuai_sys_log` VALUES ('19', '微信企业付款', '<xml><amount>149</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>I3GeTrYuHHNwOXlK</nonce_str><openid>oFc-1t8ez749JmPXnIUFIi4Iaa-A</openid><partner_trade_no>20170407121513458</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>112.17.239.189</spbill_create_ip><sign>9413128E0FF3227F214F1D35A2F0F2BD</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491538513');
INSERT INTO `haokuai_sys_log` VALUES ('20', '微信企业付款', '<xml><amount>142</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>HKZ1njjg6oo7VuAd</nonce_str><openid>oFc-1tw_Q-vH1s426eRaMaFaAXBI</openid><partner_trade_no>20170407121634792</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>112.10.81.116</spbill_create_ip><sign>3EE3364F1BBB131AEC8BB9315CC5C269</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491538594');
INSERT INTO `haokuai_sys_log` VALUES ('21', '微信企业付款', '<xml><amount>149</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>0yeHingFFChKy7JP</nonce_str><openid>oFc-1t8ez749JmPXnIUFIi4Iaa-A</openid><partner_trade_no>20170407122109582</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>183.206.167.234</spbill_create_ip><sign>3F1BF5B25ECF5FB0D26F352F3983A009</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491538869');
INSERT INTO `haokuai_sys_log` VALUES ('22', '微信企业付款', '<xml><amount>123</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>PwAuEAoK8sPt7LSg</nonce_str><openid>oFc-1t6cOedcldSSy4aMzKi-fUBY</openid><partner_trade_no>20170407122449194</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>183.206.169.23</spbill_create_ip><sign>9DB0E1AD8D751146609321425CDDFC5F</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491539089');
INSERT INTO `haokuai_sys_log` VALUES ('23', '微信企业付款', '<xml><amount>123</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>3EIe0IPRLjJgbriA</nonce_str><openid>oFc-1t6cOedcldSSy4aMzKi-fUBY</openid><partner_trade_no>20170407122519885</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>183.206.169.23</spbill_create_ip><sign>0428946FD7006A44E56F5B8186EF098A</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491539119');
INSERT INTO `haokuai_sys_log` VALUES ('24', '微信企业付款', '<xml><amount>149</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>EQujy2KY4dQGXLMf</nonce_str><openid>oFc-1t8ez749JmPXnIUFIi4Iaa-A</openid><partner_trade_no>20170407123716149</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>183.206.169.23</spbill_create_ip><sign>429B04615527588A0335CC8C39957EB0</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491539836');
INSERT INTO `haokuai_sys_log` VALUES ('25', '微信企业付款', '<xml><amount>123</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>dU93URVbq6IJNSDm</nonce_str><openid>oFc-1t6cOedcldSSy4aMzKi-fUBY</openid><partner_trade_no>20170407125352790</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>183.206.169.23</spbill_create_ip><sign>A040115B25D456690A5E8D67696E5DF9</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491540832');
INSERT INTO `haokuai_sys_log` VALUES ('26', '微信企业付款', '<xml><amount>123</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>QlpPvWKuqIgVBgmN</nonce_str><openid>oFc-1t6cOedcldSSy4aMzKi-fUBY</openid><partner_trade_no>20170407125411303</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>183.206.169.23</spbill_create_ip><sign>4D6780ADA9685AF2E1B53D1C80E9931B</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491540851');
INSERT INTO `haokuai_sys_log` VALUES ('27', '微信企业付款', '<xml><amount>109</amount><check_name>NO_CHECK</check_name><desc>零钱入账</desc><mch_appid>wx46bc30ac7d7a8ce0</mch_appid><mchid>1260388201</mchid><nonce_str>kLKfjNiiBe3q4zCo</nonce_str><openid>oFc-1twOIO4IcCZbmsUHdIkTCYL4</openid><partner_trade_no>20170407125715468</partner_trade_no><re_user_name>提现</re_user_name><spbill_create_ip>112.10.81.116</spbill_create_ip><sign>DDF437A8FCFBE9DA0906E0CCF7E0E0A9</sign></xml><xml>\n<return_code><![CDATA[SUCCESS]]></return_code>\n<return_msg><![CDATA[CA_ERROR]]></return_msg>\n<result_code><![CDATA[FAIL]]></result_code>\n<err_code><![CDATA[CA_ERROR]]></err_code>\n<err_code_des><![CDATA[CA证书出错，请登录微信支付商户平台下载证书]]></err_code_des>\n</xml>', '1491541035');

-- ----------------------------
-- Table structure for haokuai_sys_maset
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_sys_maset`;
CREATE TABLE `haokuai_sys_maset` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mleft` int(11) NOT NULL DEFAULT '0',
  `mtop` int(11) NOT NULL DEFAULT '0',
  `msize` int(11) NOT NULL DEFAULT '5',
  `midcolor` varchar(50) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_sys_maset
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_sys_user
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_sys_user`;
CREATE TABLE `haokuai_sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uname` varchar(20) NOT NULL,
  `upass` varchar(50) NOT NULL DEFAULT '',
  `utype` int(2) NOT NULL DEFAULT '1',
  `utime` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_sys_user
-- ----------------------------
INSERT INTO `haokuai_sys_user` VALUES ('1', 'admin', '200820e3227815ed1756a6b531e7e0d2', '1', '1491573725');

-- ----------------------------
-- Table structure for haokuai_user_chongzhi
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_user_chongzhi`;
CREATE TABLE `haokuai_user_chongzhi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL DEFAULT '0',
  `ddanhao` varchar(50) NOT NULL DEFAULT '',
  `djine` int(11) NOT NULL DEFAULT '0',
  `dutid` int(11) NOT NULL DEFAULT '0',
  `dcode` int(3) NOT NULL DEFAULT '1',
  `djisuan` int(2) NOT NULL DEFAULT '1',
  `dtime` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `ddanhao` (`ddanhao`),
  KEY `userid` (`userid`),
  KEY `dcode` (`dcode`),
  KEY `dtime` (`dtime`)
) ENGINE=MyISAM AUTO_INCREMENT=320 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of haokuai_user_chongzhi
-- ----------------------------
INSERT INTO `haokuai_user_chongzhi` VALUES ('229', '27', '20170407004526210', '5000', '0', '1', '1', '1491497126');
INSERT INTO `haokuai_user_chongzhi` VALUES ('230', '27', '20170407004613233', '500', '0', '1', '1', '1491497173');
INSERT INTO `haokuai_user_chongzhi` VALUES ('231', '27', '20170407004624625', '500', '0', '1', '1', '1491497184');
INSERT INTO `haokuai_user_chongzhi` VALUES ('232', '27', '20170407004636697', '2000', '0', '1', '1', '1491497196');
INSERT INTO `haokuai_user_chongzhi` VALUES ('233', '27', '20170407004659465', '2000', '0', '1', '1', '1491497219');
INSERT INTO `haokuai_user_chongzhi` VALUES ('234', '27', '20170407004846156', '2000', '0', '1', '1', '1491497326');
INSERT INTO `haokuai_user_chongzhi` VALUES ('235', '27', '20170407005131845', '500', '0', '1', '1', '1491497491');
INSERT INTO `haokuai_user_chongzhi` VALUES ('236', '27', '20170407005158417', '500', '0', '1', '1', '1491497518');
INSERT INTO `haokuai_user_chongzhi` VALUES ('237', '27', '20170407005300155', '500', '0', '1', '1', '1491497580');
INSERT INTO `haokuai_user_chongzhi` VALUES ('238', '27', '20170407005318639', '500', '0', '1', '1', '1491497598');
INSERT INTO `haokuai_user_chongzhi` VALUES ('239', '27', '20170407010000857', '500', '0', '1', '1', '1491498000');
INSERT INTO `haokuai_user_chongzhi` VALUES ('240', '27', '20170407010059887', '10000', '0', '1', '1', '1491498059');
INSERT INTO `haokuai_user_chongzhi` VALUES ('241', '27', '20170407010203999', '500', '0', '1', '1', '1491498123');
INSERT INTO `haokuai_user_chongzhi` VALUES ('242', '27', '20170407011040265', '500', '0', '1', '1', '1491498640');
INSERT INTO `haokuai_user_chongzhi` VALUES ('243', '27', '20170407055019853', '500', '0', '1', '1', '1491515419');
INSERT INTO `haokuai_user_chongzhi` VALUES ('244', '27', '20170407055134319', '2000', '0', '1', '1', '1491515494');
INSERT INTO `haokuai_user_chongzhi` VALUES ('245', '27', '20170407060114778', '2000', '0', '1', '1', '1491516074');
INSERT INTO `haokuai_user_chongzhi` VALUES ('246', '27', '20170407084458508', '500', '0', '1', '1', '1491525898');
INSERT INTO `haokuai_user_chongzhi` VALUES ('247', '27', '20170407085348355', '500', '0', '1', '1', '1491526428');
INSERT INTO `haokuai_user_chongzhi` VALUES ('248', '27', '20170407090640243', '500', '0', '1', '1', '1491527200');
INSERT INTO `haokuai_user_chongzhi` VALUES ('249', '27', '20170407100456426', '500', '0', '1', '1', '1491530696');
INSERT INTO `haokuai_user_chongzhi` VALUES ('250', '27', '20170407101413389', '500', '0', '1', '1', '1491531253');
INSERT INTO `haokuai_user_chongzhi` VALUES ('251', '27', '20170407101904666', '500', '0', '1', '1', '1491531544');
INSERT INTO `haokuai_user_chongzhi` VALUES ('252', '58', '20170407101923700', '500', '0', '1', '1', '1491531563');
INSERT INTO `haokuai_user_chongzhi` VALUES ('253', '58', '20170407101925574', '0', '0', '1', '1', '1491531565');
INSERT INTO `haokuai_user_chongzhi` VALUES ('254', '27', '20170407102126220', '5000', '0', '1', '1', '1491531686');
INSERT INTO `haokuai_user_chongzhi` VALUES ('255', '27', '20170407102134262', '500', '0', '1', '1', '1491531694');
INSERT INTO `haokuai_user_chongzhi` VALUES ('256', '27', '20170407102303622', '500', '0', '1', '1', '1491531783');
INSERT INTO `haokuai_user_chongzhi` VALUES ('257', '59', '20170407102459536', '500', '0', '1', '1', '1491531899');
INSERT INTO `haokuai_user_chongzhi` VALUES ('258', '27', '20170407102925486', '500', '0', '1', '1', '1491532165');
INSERT INTO `haokuai_user_chongzhi` VALUES ('259', '27', '20170407102931939', '500', '0', '1', '1', '1491532171');
INSERT INTO `haokuai_user_chongzhi` VALUES ('260', '27', '20170407102951934', '500', '0', '1', '1', '1491532191');
INSERT INTO `haokuai_user_chongzhi` VALUES ('261', '27', '20170407103017376', '500', '0', '1', '1', '1491532217');
INSERT INTO `haokuai_user_chongzhi` VALUES ('262', '27', '20170407103024779', '500', '0', '1', '1', '1491532224');
INSERT INTO `haokuai_user_chongzhi` VALUES ('263', '27', '20170407103043683', '500', '0', '1', '1', '1491532243');
INSERT INTO `haokuai_user_chongzhi` VALUES ('264', '59', '20170407103207226', '500', '0', '1', '1', '1491532327');
INSERT INTO `haokuai_user_chongzhi` VALUES ('265', '60', '20170407105352645', '500', '0', '1', '1', '1491533632');
INSERT INTO `haokuai_user_chongzhi` VALUES ('266', '61', '20170407105355972', '2000', '0', '1', '1', '1491533635');
INSERT INTO `haokuai_user_chongzhi` VALUES ('267', '61', '20170407105421269', '5000', '0', '1', '1', '1491533661');
INSERT INTO `haokuai_user_chongzhi` VALUES ('268', '60', '20170407105438524', '500', '0', '2', '2', '1491533678');
INSERT INTO `haokuai_user_chongzhi` VALUES ('269', '62', '20170407105536946', '500', '0', '2', '2', '1491533736');
INSERT INTO `haokuai_user_chongzhi` VALUES ('270', '62', '20170407105537581', '0', '0', '1', '1', '1491533737');
INSERT INTO `haokuai_user_chongzhi` VALUES ('271', '63', '20170407113444265', '500', '0', '2', '2', '1491536084');
INSERT INTO `haokuai_user_chongzhi` VALUES ('272', '65', '20170407114300781', '500', '0', '2', '2', '1491536580');
INSERT INTO `haokuai_user_chongzhi` VALUES ('273', '60', '20170407115330783', '500', '0', '1', '1', '1491537210');
INSERT INTO `haokuai_user_chongzhi` VALUES ('274', '60', '20170407115915174', '2000', '0', '1', '1', '1491537555');
INSERT INTO `haokuai_user_chongzhi` VALUES ('275', '66', '20170407120149120', '500', '0', '2', '2', '1491537709');
INSERT INTO `haokuai_user_chongzhi` VALUES ('276', '66', '20170407120504785', '10000', '0', '1', '1', '1491537904');
INSERT INTO `haokuai_user_chongzhi` VALUES ('277', '65', '20170407120819594', '500', '0', '1', '1', '1491538099');
INSERT INTO `haokuai_user_chongzhi` VALUES ('278', '65', '20170407121656393', '500', '0', '2', '2', '1491538616');
INSERT INTO `haokuai_user_chongzhi` VALUES ('279', '60', '20170407122120545', '500', '0', '1', '1', '1491538880');
INSERT INTO `haokuai_user_chongzhi` VALUES ('280', '67', '20170407122357656', '500', '0', '1', '1', '1491539037');
INSERT INTO `haokuai_user_chongzhi` VALUES ('281', '67', '20170407122408233', '10000', '0', '1', '1', '1491539048');
INSERT INTO `haokuai_user_chongzhi` VALUES ('282', '67', '20170407122417130', '500', '0', '2', '2', '1491539057');
INSERT INTO `haokuai_user_chongzhi` VALUES ('283', '68', '20170407125420758', '500', '0', '1', '1', '1491540860');
INSERT INTO `haokuai_user_chongzhi` VALUES ('284', '60', '20170407132115705', '10000', '0', '1', '1', '1491542475');
INSERT INTO `haokuai_user_chongzhi` VALUES ('285', '60', '20170407133451506', '500', '0', '1', '1', '1491543291');
INSERT INTO `haokuai_user_chongzhi` VALUES ('286', '60', '20170407133452338', '0', '0', '1', '1', '1491543292');
INSERT INTO `haokuai_user_chongzhi` VALUES ('287', '70', '20170407134127201', '500', '0', '2', '2', '1491543687');
INSERT INTO `haokuai_user_chongzhi` VALUES ('288', '60', '20170407134135307', '500', '0', '1', '1', '1491543695');
INSERT INTO `haokuai_user_chongzhi` VALUES ('289', '60', '20170407134153557', '1000', '0', '1', '1', '1491543713');
INSERT INTO `haokuai_user_chongzhi` VALUES ('290', '60', '20170407134619123', '500', '0', '1', '1', '1491543979');
INSERT INTO `haokuai_user_chongzhi` VALUES ('291', '67', '20170407134930793', '500', '0', '1', '1', '1491544170');
INSERT INTO `haokuai_user_chongzhi` VALUES ('292', '67', '20170407134951882', '10000', '0', '1', '1', '1491544191');
INSERT INTO `haokuai_user_chongzhi` VALUES ('293', '67', '20170407135009490', '500', '0', '1', '1', '1491544209');
INSERT INTO `haokuai_user_chongzhi` VALUES ('294', '67', '20170407135144816', '5000', '0', '1', '1', '1491544304');
INSERT INTO `haokuai_user_chongzhi` VALUES ('295', '67', '20170407135155684', '2000', '0', '2', '2', '1491544315');
INSERT INTO `haokuai_user_chongzhi` VALUES ('296', '67', '20170407135538913', '5000', '0', '1', '1', '1491544538');
INSERT INTO `haokuai_user_chongzhi` VALUES ('297', '61', '20170407145356947', '500', '0', '1', '1', '1491548036');
INSERT INTO `haokuai_user_chongzhi` VALUES ('298', '72', '20170407145704820', '500', '0', '2', '2', '1491548224');
INSERT INTO `haokuai_user_chongzhi` VALUES ('299', '72', '20170407145858713', '500', '0', '2', '2', '1491548338');
INSERT INTO `haokuai_user_chongzhi` VALUES ('300', '73', '20170407214852803', '500', '0', '1', '1', '1491572932');
INSERT INTO `haokuai_user_chongzhi` VALUES ('301', '73', '20170407220408887', '500', '0', '1', '1', '1491573848');
INSERT INTO `haokuai_user_chongzhi` VALUES ('302', '74', '20170407220510696', '500', '0', '1', '1', '1491573910');
INSERT INTO `haokuai_user_chongzhi` VALUES ('303', '74', '20170407220601434', '2000', '0', '1', '1', '1491573961');
INSERT INTO `haokuai_user_chongzhi` VALUES ('304', '74', '20170407221306791', '500', '0', '1', '1', '1491574386');
INSERT INTO `haokuai_user_chongzhi` VALUES ('305', '74', '20170407221338173', '1000', '0', '1', '1', '1491574418');
INSERT INTO `haokuai_user_chongzhi` VALUES ('306', '74', '20170407221821104', '2000', '0', '1', '1', '1491574701');
INSERT INTO `haokuai_user_chongzhi` VALUES ('307', '74', '20170407221856502', '500', '0', '1', '1', '1491574736');
INSERT INTO `haokuai_user_chongzhi` VALUES ('308', '74', '20170407221941130', '500', '0', '1', '1', '1491574781');
INSERT INTO `haokuai_user_chongzhi` VALUES ('309', '74', '20170407222306392', '500', '0', '1', '1', '1491574986');
INSERT INTO `haokuai_user_chongzhi` VALUES ('310', '74', '20170407222822202', '500', '0', '1', '1', '1491575302');
INSERT INTO `haokuai_user_chongzhi` VALUES ('311', '74', '20170407223039820', '2000', '0', '1', '1', '1491575439');
INSERT INTO `haokuai_user_chongzhi` VALUES ('312', '74', '20170407223129987', '500', '0', '1', '1', '1491575489');
INSERT INTO `haokuai_user_chongzhi` VALUES ('313', '74', '20170407223754790', '500', '0', '1', '1', '1491575874');
INSERT INTO `haokuai_user_chongzhi` VALUES ('314', '74', '20170407223908296', '500', '0', '1', '1', '1491575948');
INSERT INTO `haokuai_user_chongzhi` VALUES ('315', '74', '20170407224141301', '500', '0', '1', '1', '1491576101');
INSERT INTO `haokuai_user_chongzhi` VALUES ('316', '74', '20170407224214698', '500', '0', '1', '1', '1491576134');
INSERT INTO `haokuai_user_chongzhi` VALUES ('317', '74', '20170407224516827', '1000', '0', '1', '1', '1491576316');
INSERT INTO `haokuai_user_chongzhi` VALUES ('318', '74', '20170407225043348', '500', '0', '1', '1', '1491576643');
INSERT INTO `haokuai_user_chongzhi` VALUES ('319', '74', '20170408120636846', '500', '0', '2', '2', '1491624396');

-- ----------------------------
-- Table structure for haokuai_user_duizhang
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_user_duizhang`;
CREATE TABLE `haokuai_user_duizhang` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL DEFAULT '0',
  `paynum` int(11) NOT NULL DEFAULT '0',
  `wxnum` int(11) NOT NULL DEFAULT '0',
  `dcode` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_user_duizhang
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_user_hb
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_user_hb`;
CREATE TABLE `haokuai_user_hb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL DEFAULT '0',
  `hbid` int(11) NOT NULL DEFAULT '0',
  `hbe` int(11) NOT NULL DEFAULT '0',
  `tcode` int(2) NOT NULL DEFAULT '1',
  `ttime` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `hbid` (`hbid`),
  KEY `tcode` (`tcode`),
  KEY `ttime` (`ttime`)
) ENGINE=MyISAM AUTO_INCREMENT=125 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_user_hb
-- ----------------------------
INSERT INTO `haokuai_user_hb` VALUES ('109', '63', '7', '179', '2', '1491536203');
INSERT INTO `haokuai_user_hb` VALUES ('110', '60', '7', '149', '1', '1491536316');
INSERT INTO `haokuai_user_hb` VALUES ('111', '65', '7', '142', '2', '1491536593');
INSERT INTO `haokuai_user_hb` VALUES ('112', '66', '7', '166', '2', '1491537799');
INSERT INTO `haokuai_user_hb` VALUES ('113', '67', '7', '123', '1', '1491539089');
INSERT INTO `haokuai_user_hb` VALUES ('114', '62', '7', '109', '2', '1491541035');
INSERT INTO `haokuai_user_hb` VALUES ('115', '70', '7', '147', '1', '1491543706');
INSERT INTO `haokuai_user_hb` VALUES ('116', '67', '7', '146', '1', '1491544363');
INSERT INTO `haokuai_user_hb` VALUES ('117', '67', '7', '180', '1', '1491544381');
INSERT INTO `haokuai_user_hb` VALUES ('118', '67', '7', '358', '1', '1491544510');
INSERT INTO `haokuai_user_hb` VALUES ('119', '72', '7', '166', '1', '1491548246');
INSERT INTO `haokuai_user_hb` VALUES ('120', '72', '7', '158', '1', '1491548361');
INSERT INTO `haokuai_user_hb` VALUES ('121', '74', '7', '174', '1', '1491575026');
INSERT INTO `haokuai_user_hb` VALUES ('122', '74', '7', '171', '1', '1491575078');
INSERT INTO `haokuai_user_hb` VALUES ('123', '74', '7', '178', '1', '1491576171');
INSERT INTO `haokuai_user_hb` VALUES ('124', '74', '7', '173', '1', '1491624412');

-- ----------------------------
-- Table structure for haokuai_user_list
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_user_list`;
CREATE TABLE `haokuai_user_list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `utid` int(11) NOT NULL DEFAULT '0',
  `uopenid` varchar(50) NOT NULL DEFAULT '',
  `ubeiopenid` varchar(50) DEFAULT '',
  `uickname` varchar(80) DEFAULT '',
  `uheadimgurl` varchar(160) DEFAULT '',
  `usex` int(2) NOT NULL DEFAULT '0',
  `udizhi` varchar(40) DEFAULT '',
  `uvip` int(5) NOT NULL DEFAULT '0',
  `uhbcon` varchar(300) NOT NULL DEFAULT '',
  `ufacishu` int(5) NOT NULL DEFAULT '0',
  `ugengxin` int(11) NOT NULL DEFAULT '0',
  `ustate` int(11) NOT NULL DEFAULT '1',
  `ulogintime` int(11) NOT NULL DEFAULT '0',
  `uregtime` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `utid` (`utid`),
  KEY `uopenid` (`uopenid`),
  KEY `uvip` (`uvip`),
  KEY `ubeiopenid` (`ubeiopenid`)
) ENGINE=MyISAM AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_user_list
-- ----------------------------
INSERT INTO `haokuai_user_list` VALUES ('60', '0', 'oFc-1t8ez749JmPXnIUFIi4Iaa-A', '', '', '', '0', '', '1', '', '1', '1491542433', '1', '1491533608', '1491533608');
INSERT INTO `haokuai_user_list` VALUES ('61', '0', 'oFc-1t_z-Ajo-nh4RRgauZOIZxlg', '', '', '', '0', '', '1', '', '0', '0', '1', '1491547962', '1491533617');
INSERT INTO `haokuai_user_list` VALUES ('62', '0', 'oFc-1twOIO4IcCZbmsUHdIkTCYL4', '', '', '', '0', '', '1', '', '0', '0', '1', '1491541018', '1491533727');
INSERT INTO `haokuai_user_list` VALUES ('63', '0', 'oFc-1t9rCVIdyMsxe9u4qOvTFl90', '', '', '', '0', '', '1', '', '0', '0', '1', '1491535201', '1491535201');
INSERT INTO `haokuai_user_list` VALUES ('64', '0', 'oFc-1twfGMr98lTy6sgpzVLQSQ58', '', '', '', '0', '', '1', '', '0', '0', '1', '1491536314', '1491536314');
INSERT INTO `haokuai_user_list` VALUES ('65', '0', 'oFc-1tw_Q-vH1s426eRaMaFaAXBI', '', '', '', '0', '', '1', '', '0', '0', '1', '1491536568', '1491536568');
INSERT INTO `haokuai_user_list` VALUES ('66', '60', 'oFc-1t-qFShZia-FmW9NEwVVqWMQ', '', '', '', '0', '', '1', '', '0', '0', '1', '1491537681', '1491537681');
INSERT INTO `haokuai_user_list` VALUES ('67', '0', 'oFc-1t6cOedcldSSy4aMzKi-fUBY', '', '', '', '0', '', '1', '', '4', '1491544103', '1', '1491545478', '1491539015');
INSERT INTO `haokuai_user_list` VALUES ('68', '60', 'oFc-1tzJ4IqxwjEuHa3sXa5zjuag', '', '', '', '0', '', '1', '', '0', '0', '1', '1491540776', '1491540776');
INSERT INTO `haokuai_user_list` VALUES ('69', '0', 'oFc-1t5QZpbqoPZiJNmaUeGp6EMc', '', '', '', '0', '', '1', '', '0', '0', '1', '1491543262', '1491543262');
INSERT INTO `haokuai_user_list` VALUES ('70', '0', 'oFc-1t-_CjLMqGng98jUCUxdW8Ro', '', '', '', '0', '', '1', '', '1', '1491543707', '1', '1491543663', '1491543663');
INSERT INTO `haokuai_user_list` VALUES ('71', '67', 'oFc-1t-dLEZPcre3o7XupFsWXryA', '', '', '', '0', '', '1', '', '0', '0', '1', '1491547966', '1491547966');
INSERT INTO `haokuai_user_list` VALUES ('72', '67', 'oFc-1t5VkfUwMO9wGMuJL__4xGZ4', '', '', '', '0', '', '1', '', '2', '1491548247', '1', '1491548200', '1491548200');
INSERT INTO `haokuai_user_list` VALUES ('73', '0', 'oIf5Iv2RM0BrqQAb2lLw_Fs8g7pE', '', '逸洋建站@钟先生', 'http://wx.qlogo.cn/mmopen/dWYcndbpDnbOc9xHNVAFW9GeBROrk0E4mFjJzPicP8t6jo0czkpnnMsz6GHXqMohwZCia1eyERibZib29nm6oN79v3VlalibqJbPm/0', '1', '江苏南京', '1', '', '0', '0', '1', '1491626380', '1491552335');
INSERT INTO `haokuai_user_list` VALUES ('74', '0', 'oIf5IvznQ829oP04LSZuHw95M6VA', '', '逸洋建站@程序员', 'http://wx.qlogo.cn/mmopen/pUx7pTHicla1fWxgDsCcDVXhiay5zQ71Ix4kSPukia2mxLMSNIklhZJq1H95Cr3bKtFXBNOff2LTgSaibwTV4JibHjfy5XCIuiafEm/0', '1', '江苏南京', '1', '', '1', '1491624413', '1', '1491624383', '1491552368');
INSERT INTO `haokuai_user_list` VALUES ('75', '0', 'oIf5Iv7hsteS7lTgVP30i7VfAfnw', '', '逸洋', 'http://wx.qlogo.cn/mmopen/pUx7pTHicla2zWVlDuExWR5tlxu3BWmlnZOurEJIX3TXEYfSG1lgvibvypKbqvYjaz6gicEnMpbIWibShMd6icL44xZ37O8gyHmM1/0', '0', '', '1', '', '0', '0', '1', '1491626447', '1491552594');
INSERT INTO `haokuai_user_list` VALUES ('76', '0', 'oIf5Iv2WF5ZI8kjkVTKli_e3WVMc', '', '', '', '0', '', '1', '', '0', '0', '1', '1491566909', '1491566909');
INSERT INTO `haokuai_user_list` VALUES ('77', '0', 'oIf5Iv1_T8NRMoyV7me8_akQgZQo', '', '', '', '0', '', '1', '', '0', '0', '1', '1491567595', '1491567595');
INSERT INTO `haokuai_user_list` VALUES ('78', '0', 'oIf5Iv5xNvOFGrj6bMKb1nMCFd3M', '', '', '', '0', '', '1', '', '0', '0', '1', '1491567638', '1491567638');
INSERT INTO `haokuai_user_list` VALUES ('79', '0', 'oP9Ytwz0AfSTFc6tG7_viP_PNxak', '', 'HS', 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLD8xUiaRBcHDZgKtfIsic2AOzJw075BOOaVvTicE7iaPMqKccyicfVBqA2rP6OFmOLYibUyw1ZWxSsm2icDSSwsRrB37ia6trDia11GibvaU/0', '1', '黑龙江哈尔滨', '1', '', '0', '0', '1', '1493262369', '1493262369');

-- ----------------------------
-- Table structure for haokuai_user_tixian
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_user_tixian`;
CREATE TABLE `haokuai_user_tixian` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL DEFAULT '0',
  `tixiane` int(11) NOT NULL DEFAULT '0',
  `ttime` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `tixiane` (`tixiane`),
  KEY `userid` (`userid`),
  KEY `ttime` (`ttime`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_user_tixian
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_user_wxexcel
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_user_wxexcel`;
CREATE TABLE `haokuai_user_wxexcel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL DEFAULT '0',
  `uopenid` varchar(50) DEFAULT '',
  `wxdanhao` varchar(50) DEFAULT '',
  `wxjine` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `uopenid` (`uopenid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_user_wxexcel
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_user_yongjin
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_user_yongjin`;
CREATE TABLE `haokuai_user_yongjin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL DEFAULT '0',
  `uchong` int(11) NOT NULL DEFAULT '0',
  `tixiane` int(11) NOT NULL DEFAULT '0',
  `tcode` int(2) NOT NULL DEFAULT '1',
  `tjisuan` int(2) NOT NULL DEFAULT '1',
  `ttime` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `tcode` (`tcode`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of haokuai_user_yongjin
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_user_zhanghu
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_user_zhanghu`;
CREATE TABLE `haokuai_user_zhanghu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL DEFAULT '0',
  `uhbqian` int(11) NOT NULL DEFAULT '0',
  `uqianzheng` int(11) NOT NULL DEFAULT '0',
  `uqianfa` int(11) NOT NULL DEFAULT '0',
  `uzhengzong` int(11) NOT NULL DEFAULT '0',
  `uqianchong` int(11) NOT NULL DEFAULT '0',
  `uchongzong` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `uqianchong` (`uqianzheng`),
  KEY `uchongzong` (`uchongzong`),
  KEY `uzhengzong` (`uzhengzong`)
) ENGINE=MyISAM AUTO_INCREMENT=80 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_user_zhanghu
-- ----------------------------
INSERT INTO `haokuai_user_zhanghu` VALUES ('58', '58', '0', '0', '0', '0', '0', '0');
INSERT INTO `haokuai_user_zhanghu` VALUES ('59', '59', '0', '0', '0', '0', '0', '0');
INSERT INTO `haokuai_user_zhanghu` VALUES ('60', '60', '0', '0', '0', '0', '0', '500');
INSERT INTO `haokuai_user_zhanghu` VALUES ('61', '61', '0', '0', '0', '0', '0', '0');
INSERT INTO `haokuai_user_zhanghu` VALUES ('62', '62', '0', '0', '0', '0', '500', '500');
INSERT INTO `haokuai_user_zhanghu` VALUES ('63', '63', '0', '0', '0', '0', '500', '500');
INSERT INTO `haokuai_user_zhanghu` VALUES ('64', '64', '0', '0', '0', '0', '0', '0');
INSERT INTO `haokuai_user_zhanghu` VALUES ('65', '65', '0', '0', '0', '0', '1000', '1000');
INSERT INTO `haokuai_user_zhanghu` VALUES ('66', '66', '0', '0', '0', '0', '500', '500');
INSERT INTO `haokuai_user_zhanghu` VALUES ('67', '67', '0', '0', '0', '0', '0', '2500');
INSERT INTO `haokuai_user_zhanghu` VALUES ('68', '68', '0', '0', '0', '0', '0', '0');
INSERT INTO `haokuai_user_zhanghu` VALUES ('69', '69', '0', '0', '0', '0', '0', '0');
INSERT INTO `haokuai_user_zhanghu` VALUES ('70', '70', '0', '0', '0', '0', '0', '500');
INSERT INTO `haokuai_user_zhanghu` VALUES ('71', '71', '0', '0', '0', '0', '0', '0');
INSERT INTO `haokuai_user_zhanghu` VALUES ('72', '72', '0', '0', '0', '0', '0', '1000');
INSERT INTO `haokuai_user_zhanghu` VALUES ('73', '73', '0', '0', '0', '0', '0', '0');
INSERT INTO `haokuai_user_zhanghu` VALUES ('74', '74', '0', '0', '0', '0', '0', '500');
INSERT INTO `haokuai_user_zhanghu` VALUES ('75', '75', '0', '0', '0', '0', '0', '0');
INSERT INTO `haokuai_user_zhanghu` VALUES ('76', '76', '0', '0', '0', '0', '0', '0');
INSERT INTO `haokuai_user_zhanghu` VALUES ('77', '77', '0', '0', '0', '0', '0', '0');
INSERT INTO `haokuai_user_zhanghu` VALUES ('78', '78', '0', '0', '0', '0', '0', '0');
INSERT INTO `haokuai_user_zhanghu` VALUES ('79', '79', '0', '0', '0', '0', '0', '0');

-- ----------------------------
-- Table structure for haokuai_weixin_caidan
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_weixin_caidan`;
CREATE TABLE `haokuai_weixin_caidan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL DEFAULT '0',
  `cname` varchar(50) NOT NULL DEFAULT '',
  `ckey` varchar(50) NOT NULL DEFAULT '',
  `curl` varchar(150) NOT NULL DEFAULT '',
  `ctype` int(11) NOT NULL DEFAULT '0',
  `cnum` int(2) NOT NULL DEFAULT '1',
  `adminid` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_weixin_caidan
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_weixin_mobanid
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_weixin_mobanid`;
CREATE TABLE `haokuai_weixin_mobanid` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mbianhao` varchar(150) NOT NULL DEFAULT '',
  `mid` varchar(150) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_weixin_mobanid
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_weixin_sendcon
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_weixin_sendcon`;
CREATE TABLE `haokuai_weixin_sendcon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `kid` int(11) NOT NULL DEFAULT '0',
  `sname` varchar(100) NOT NULL DEFAULT '',
  `sdec` varchar(500) NOT NULL DEFAULT '',
  `spic` varchar(50) NOT NULL DEFAULT '',
  `surl` varchar(150) NOT NULL DEFAULT '',
  `snum` int(2) NOT NULL DEFAULT '1',
  `stime` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_weixin_sendcon
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_weixin_sendkey
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_weixin_sendkey`;
CREATE TABLE `haokuai_weixin_sendkey` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adminid` int(11) NOT NULL DEFAULT '0',
  `sname` varchar(100) NOT NULL DEFAULT '',
  `stype` int(2) NOT NULL DEFAULT '1',
  `kcode` int(2) NOT NULL DEFAULT '1',
  `stime` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_weixin_sendkey
-- ----------------------------

-- ----------------------------
-- Table structure for haokuai_yongjin_set
-- ----------------------------
DROP TABLE IF EXISTS `haokuai_yongjin_set`;
CREATE TABLE `haokuai_yongjin_set` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ydengji` int(11) NOT NULL DEFAULT '0',
  `ybaifenbi` int(11) NOT NULL DEFAULT '0',
  `yjine` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `ydengji` (`ydengji`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of haokuai_yongjin_set
-- ----------------------------
