-- DATE : 2014-05-21 21:58:31
-- Vol : 1
DROP TABLE IF EXISTS `ftxia_tejia_cate`;
CREATE TABLE `ftxia_tejia_cate` (
  `id` smallint(4) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `cid` int(11) unsigned NOT NULL,
  `pid` int(11) unsigned NOT NULL,
  `spid` varchar(50) NOT NULL,
  `add_time` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) COLLATE='utf8_general_ci' ENGINE=MyISAM;
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('1','时尚女装','1','0','0','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('2','品质男装','2','0','0','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('3','男鞋女鞋','3','0','0','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('4','包包配饰','4','0','0','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('5','美容护肤','5','0','0','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('6','数码家电','6','0','0','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('7','日用百货','7','0','0','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('8','美食特产','8','0','0','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('9','母婴儿童','9','0','0','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('10','车品户外','10','0','0','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('11','舒适内衣','11','0','0','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('12','连衣裙','50010850','1','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('13','T恤','50000671','1','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('14','衬衫','162104','1','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('15','休闲裤','162201','1','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('16','打底裤','50007068','1','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('17','牛仔裤','162205','1','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('18','半身裤','1623','1','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('19','蕾丝衫/雪纺衫','162116','1','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('20','针织衫','50000697','1','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('21','短外套','50011277','1','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('22','卫衣/绒衫','50008898','1','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('23','风衣','50008901','1','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('24','气质妈妈装','50000852','1','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('25','大码女装','1629','1','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('26','T恤','50000436','2','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('27','衬衫','50011123','2','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('28','针织衫','50000557','2','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('29','牛仔裤','50010167','2','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('30','休闲裤','3035','2','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('31','夹克','50010158','2','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('32','卫衣','50010159','2','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('33','浅口女单鞋','50012027','3','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('34','高帮女鞋','50012825','3','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('35','帆布鞋','50012042','3','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('36','流行男鞋','50011740','3','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('37','热销包袋','50012010','4','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('38','皮带/腰带/配件','50010404','4','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('39','钱包卡套','50012018','4','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('40','乳液/面霜','50011980','5','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('41','面膜','50011981','5','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('42','精油芳疗','50011992','5','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('43','彩妆达人','50010788','5','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('44','精美鼠标','11','6','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('45','苹果保护套/保护壳','50018599','6','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('46','手机配件','50024094','6','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('47','厨房电器','50012082','6','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('48','生活电器','50012100','6','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('49','居家日用','21','7','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('50','家装','27','7','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('51','床上用品/布艺软饰','50008163','7','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('52','枕头/枕芯/保健枕','50002777','7','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('53','整理/收纳用具','50016348','7','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('54','厨房用具','50016349','7','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('55','家居饰品','50020808','7','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('56','洗护清洁','50025705','7','','0');

INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('57','枣类/果干','50013061','8','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('58','坚果/炒货','50012981','8','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('59','饼干/膨化','50010550','8','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('60','糕点/点心','50552001','8','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('61','糖果零食','50016091','8','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('62','粮油米面/调味品','50016422','8','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('63','滋补营养品','50020275','8','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('64','咖啡/冲饮','50026316','8','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('65','茶叶','50026397','8','','0');

INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('66','玩具','25','9','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('67','连衣裙','50013693','9','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('68','童裤','50013618','9','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('69','睡衣','50012433','9','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('70','T恤','50013189','9','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('71','外套','50012308','9','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('72','套装','50010540','9','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('73','童鞋','50012340','9','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('74','幼婴儿用品','50014812','9','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('75','孕妇用品','50022517','9','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('76','汽车配件','26','10','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('77','运动用品','50010728','10','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('78','运动服/休闲服装','50011699','10','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('79','户外用品','50013886','10','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('80','文胸','50008881','11','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('81','内裤','50008882','11','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('82','睡衣/家居服套装','50012772','11','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('83','保暖套装','50012778','11','','0');
INSERT INTO ftxia_tejia_cate ( `id`, `name`, `cid`, `pid`, `spid`, `add_time` ) VALUES  ('84','短袜/打底袜/丝袜/美腿袜','50006846','11','','0');
