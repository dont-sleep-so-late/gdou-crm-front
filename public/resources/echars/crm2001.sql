



DROP TABLE IF EXISTS `tbl_dic_value`;
CREATE TABLE `tbl_dic_value`  (
  `id` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键，采用UUID',
  `value` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '不能为空，并且要求同一个字典类型下字典值不能重复，具有唯一性。',
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '可以为空',
  `order_no` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '可以为空，但不为空的时候，要求必须是正整数',
  `type_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '外键',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

INSERT INTO `tbl_dic_value` VALUES ('06e3cbdf10a44eca8511dddfc6896c55', '虚假线索', '虚假线索', '4', 'clueState');
INSERT INTO `tbl_dic_value` VALUES ('0fe33840c6d84bf78df55d49b169a894', '销售邮件', '销售邮件', '8', 'source');
INSERT INTO `tbl_dic_value` VALUES ('12302fd42bd349c1bb768b19600e6b20', '交易会', '交易会', '11', 'source');
INSERT INTO `tbl_dic_value` VALUES ('1615f0bb3e604552a86cde9a2ad45bea', '最高', '最高', '2', 'returnPriority');
INSERT INTO `tbl_dic_value` VALUES ('176039d2a90e4b1a81c5ab8707268636', '教授', '教授', '5', 'appellation');
INSERT INTO `tbl_dic_value` VALUES ('1e0bd307e6ee425599327447f8387285', '将来联系', '将来联系', '2', 'clueState');
INSERT INTO `tbl_dic_value` VALUES ('2173663b40b949ce928db92607b5fe57', '丢失线索', '丢失线索', '5', 'clueState');
INSERT INTO `tbl_dic_value` VALUES ('2876690b7e744333b7f1867102f91153', '未启动', '未启动', '1', 'returnState');
INSERT INTO `tbl_dic_value` VALUES ('29805c804dd94974b568cfc9017b2e4c', '07成交', '07成交', '7', 'stage');
INSERT INTO `tbl_dic_value` VALUES ('310e6a49bd8a4962b3f95a1d92eb76f4', '试图联系', '试图联系', '1', 'clueState');
INSERT INTO `tbl_dic_value` VALUES ('31539e7ed8c848fc913e1c2c93d76fd1', '博士', '博士', '4', 'appellation');
INSERT INTO `tbl_dic_value` VALUES ('37ef211719134b009e10b7108194cf46', '01资质审查', '01资质审查', '1', 'stage');
INSERT INTO `tbl_dic_value` VALUES ('391807b5324d4f16bd58c882750ee632', '08丢失的线索', '08丢失的线索', '8', 'stage');
INSERT INTO `tbl_dic_value` VALUES ('3a39605d67da48f2a3ef52e19d243953', '聊天', '聊天', '14', 'source');
INSERT INTO `tbl_dic_value` VALUES ('474ab93e2e114816abf3ffc596b19131', '低', '低', '3', 'returnPriority');
INSERT INTO `tbl_dic_value` VALUES ('48512bfed26145d4a38d3616e2d2cf79', '广告', '广告', '1', 'source');
INSERT INTO `tbl_dic_value` VALUES ('4d03a42898684135809d380597ed3268', '合作伙伴研讨会', '合作伙伴研讨会', '9', 'source');
INSERT INTO `tbl_dic_value` VALUES ('59795c49896947e1ab61b7312bd0597c', '先生', '先生', '1', 'appellation');
INSERT INTO `tbl_dic_value` VALUES ('5c6e9e10ca414bd499c07b886f86202a', '高', '高', '1', 'returnPriority');
INSERT INTO `tbl_dic_value` VALUES ('67165c27076e4c8599f42de57850e39c', '夫人', '夫人', '2', 'appellation');
INSERT INTO `tbl_dic_value` VALUES ('68a1b1e814d5497a999b8f1298ace62b', '09因竞争丢失关闭', '09因竞争丢失关闭', '9', 'stage');
INSERT INTO `tbl_dic_value` VALUES ('6b86f215e69f4dbd8a2daa22efccf0cf', 'web调研', 'web调研', '13', 'source');
INSERT INTO `tbl_dic_value` VALUES ('72f13af8f5d34134b5b3f42c5d477510', '合作伙伴', '合作伙伴', '6', 'source');
INSERT INTO `tbl_dic_value` VALUES ('7c07db3146794c60bf975749952176df', '未联系', '未联系', '6', 'clueState');
INSERT INTO `tbl_dic_value` VALUES ('86c56aca9eef49058145ec20d5466c17', '内部研讨会', '内部研讨会', '10', 'source');
INSERT INTO `tbl_dic_value` VALUES ('9095bda1f9c34f098d5b92fb870eba17', '进行中', '进行中', '3', 'returnState');
INSERT INTO `tbl_dic_value` VALUES ('954b410341e7433faa468d3c4f7cf0d2', '已有业务', '已有业务', '1', 'transactionType');
INSERT INTO `tbl_dic_value` VALUES ('966170ead6fa481284b7d21f90364984', '已联系', '已联系', '3', 'clueState');
INSERT INTO `tbl_dic_value` VALUES ('96b03f65dec748caa3f0b6284b19ef2f', '推迟', '推迟', '2', 'returnState');
INSERT INTO `tbl_dic_value` VALUES ('97d1128f70294f0aac49e996ced28c8a', '新业务', '新业务', '2', 'transactionType');
INSERT INTO `tbl_dic_value` VALUES ('9ca96290352c40688de6596596565c12', '完成', '完成', '4', 'returnState');
INSERT INTO `tbl_dic_value` VALUES ('9e6d6e15232549af853e22e703f3e015', '需要条件', '需要条件', '7', 'clueState');
INSERT INTO `tbl_dic_value` VALUES ('9ff57750fac04f15b10ce1bbb5bb8bab', '02需求分析', '02需求分析', '2', 'stage');
INSERT INTO `tbl_dic_value` VALUES ('a70dc4b4523040c696f4421462be8b2f', '等待某人', '等待某人', '5', 'returnState');
INSERT INTO `tbl_dic_value` VALUES ('a83e75ced129421dbf11fab1f05cf8b4', '推销电话', '推销电话', '2', 'source');
INSERT INTO `tbl_dic_value` VALUES ('ab8472aab5de4ae9b388b2f1409441c1', '常规', '常规', '5', 'returnPriority');
INSERT INTO `tbl_dic_value` VALUES ('ab8c2a3dc05f4e3dbc7a0405f721b040', '05提案/报价', '05提案/报价', '5', 'stage');
INSERT INTO `tbl_dic_value` VALUES ('b924d911426f4bc5ae3876038bc7e0ad', 'web下载', 'web下载', '12', 'source');
INSERT INTO `tbl_dic_value` VALUES ('c13ad8f9e2f74d5aa84697bb243be3bb', '03价值建议', '03价值建议', '3', 'stage');
INSERT INTO `tbl_dic_value` VALUES ('c83c0be184bc40708fd7b361b6f36345', '最低', '最低', '4', 'returnPriority');
INSERT INTO `tbl_dic_value` VALUES ('db867ea866bc44678ac20c8a4a8bfefb', '员工介绍', '员工介绍', '3', 'source');
INSERT INTO `tbl_dic_value` VALUES ('e44be1d99158476e8e44778ed36f4355', '04确定决策者', '04确定决策者', '4', 'stage');
INSERT INTO `tbl_dic_value` VALUES ('e5f383d2622b4fc0959f4fe131dafc80', '女士', '女士', '3', 'appellation');
INSERT INTO `tbl_dic_value` VALUES ('e81577d9458f4e4192a44650a3a3692b', '06谈判/复审', '06谈判/复审', '6', 'stage');
INSERT INTO `tbl_dic_value` VALUES ('fb65d7fdb9c6483db02713e6bc05dd19', '在线商场', '在线商场', '5', 'source');
INSERT INTO `tbl_dic_value` VALUES ('fd677cc3b5d047d994e16f6ece4d3d45', '公开媒介', '公开媒介', '7', 'source');
INSERT INTO `tbl_dic_value` VALUES ('ff802a03ccea4ded8731427055681d48', '外部介绍', '外部介绍', '4', 'source');

DROP TABLE IF EXISTS `tbl_tran`;
CREATE TABLE `tbl_tran`  (
  `id` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `owner` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `money` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `expected_date` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `customer_id` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `stage` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `source` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `activity_id` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `contacts_id` char(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` char(19) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `edit_by` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `edit_time` char(19) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `contact_summary` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `next_contact_time` char(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

INSERT INTO `tbl_tran` VALUES ('001fe571286f4eeaaf31c9ab59f224fc', '40f6cdea0bd34aceb77492a1656d9fb3', '6500', '交易重试', '2009-09-08', 'd76ec257f738409e9e458ea3a4cb4ccb', '68a1b1e814d5497a999b8f1298ace62b', '954b410341e7433faa468d3c4f7cf0d2', '48512bfed26145d4a38d3616e2d2cf79', '4b601e03b120407eac94cd11668513fe', 'e119bda7a567471d87888ef28f7083a0', '40f6cdea0bd34aceb77492a1656d9fb3', '2021-05-26 16:21:35', NULL, NULL, '烦烦烦方法', '烦烦烦', '2011-09-08');
INSERT INTO `tbl_tran` VALUES ('0085ec609b61420fac94860ccf6309bf', '40f6cdea0bd34aceb77492a1656d9fb3', '5600', '第一次购买', '2021-09-08', '00f8d48cc6384facabfb5caf900869a8', '29805c804dd94974b568cfc9017b2e4c', '954b410341e7433faa468d3c4f7cf0d2', '86c56aca9eef49058145ec20d5466c17', '31ae55adbb324364af50f33aaa906bec', '2939e47610454fb98d7410af16ec5005', '40f6cdea0bd34aceb77492a1656d9fb3', '2021-05-26 16:09:11', NULL, NULL, '很好', '和那好', '2021-9-9');
INSERT INTO `tbl_tran` VALUES ('00cc28d187d64ed89248c07c110b8a03', '06f5fc056eac41558a964f96daa7f27c', '7855', '测试', '2021-11-06', '5f871dee7daa42cbaedc0ecdac34eaae', '391807b5324d4f16bd58c882750ee632', '97d1128f70294f0aac49e996ced28c8a', '12302fd42bd349c1bb768b19600e6b20', '31ae55adbb324364af50f33aaa906bec', '2939e47610454fb98d7410af16ec5005', '40f6cdea0bd34aceb77492a1656d9fb3', '2021-05-26 16:09:59', NULL, NULL, NULL, NULL, NULL);
INSERT INTO `tbl_tran` VALUES ('2a6abe0c9a7f4b9c88fbf5aace442574', '06f5fc056eac41558a964f96daa7f27c', '3000', '新名称', '2020-09-27', '407c5630feb44e8eba49dc7848314b22', '391807b5324d4f16bd58c882750ee632', '954b410341e7433faa468d3c4f7cf0d2', '12302fd42bd349c1bb768b19600e6b20', '31ae55adbb324364af50f33aaa906bec', '2939e47610454fb98d7410af16ec5005', '98fecbb7b87111eb947254e1ad709136', '2020-09-27 22:39:00', NULL, NULL, '123', '123', '2020-09-27');
INSERT INTO `tbl_tran` VALUES ('53c47de10dec4f0a8cccad852c14da43', '06f5fc056eac41558a964f96daa7f27c', '111', '111', '2020-10-05', 'ec43928e18bb417a8ed5febe63c80ed5', '68a1b1e814d5497a999b8f1298ace62b', '97d1128f70294f0aac49e996ced28c8a', '12302fd42bd349c1bb768b19600e6b20', '31ae55adbb324364af50f33aaa906bec', '2939e47610454fb98d7410af16ec5005', '98fecbb7b87111eb947254e1ad709136', '2020-10-05 21:39:02', NULL, NULL, '111', '111', '2020-10-05');
INSERT INTO `tbl_tran` VALUES ('74ae280a9f0047afac0d8f920ddee5b8', '40f6cdea0bd34aceb77492a1656d9fb3', '100000000', '有钱任性', '2020-10-10', '407c5630feb44e8eba49dc7848314b21', '37ef211719134b009e10b7108194cf46', '954b410341e7433faa468d3c4f7cf0d2', '12302fd42bd349c1bb768b19600e6b20', '31ae55adbb324364af50f33aaa906bec', '2939e47610454fb98d7410af16ec5005', '98fecbb7b87111eb947254e1ad709136', '2020-09-24 17:26:56', NULL, NULL, '线索描述：有钱', '联系纪要：任性', '2020-10-10');
INSERT INTO `tbl_tran` VALUES ('80e929b5bb064b69bfe8042f82321d88', '40f6cdea0bd34aceb77492a1656d9fb3', '6666', 'lllll', '2020-09-25', 'd0e3f67471cb4ae2a12fd7d60fdef34c', '391807b5324d4f16bd58c882750ee632', '97d1128f70294f0aac49e996ced28c8a', '86c56aca9eef49058145ec20d5466c17', '4b601e03b120407eac94cd11668513fe', '00f8d48cc6384facabfb5caf900869a8', '98fecbb7b87111eb947254e1ad709136', '2020-09-25 22:46:51', NULL, NULL, '666', '666', '2020-10-10');
INSERT INTO `tbl_tran` VALUES ('9974c88e7a6b4314978467037259baba', '06f5fc056eac41558a964f96daa7f27c', '8000', '交易02', '2020-10-03', 'd61780c4c3cc451f8236259b248fbd46', '68a1b1e814d5497a999b8f1298ace62b', '97d1128f70294f0aac49e996ced28c8a', '86c56aca9eef49058145ec20d5466c17', '31ae55adbb324364af50f33aaa906bec', 'e119bda7a567471d87888ef28f7083a0', '98fecbb7b87111eb947254e1ad709136', '2020-09-24 16:57:29', NULL, NULL, '111', '联系纪要中', '2020-09-30');
INSERT INTO `tbl_tran` VALUES ('9c3a982e74b345339ef73f57b6878096', '06f5fc056eac41558a964f96daa7f27c', '100000', '交易123', '2020-09-27', 'ec43928e18bb417a8ed5febe63c80ed5', '68a1b1e814d5497a999b8f1298ace62b', '954b410341e7433faa468d3c4f7cf0d2', '86c56aca9eef49058145ec20d5466c17', '31ae55adbb324364af50f33aaa906bec', '2939e47610454fb98d7410af16ec5005', '98fecbb7b87111eb947254e1ad709136', '2020-09-27 22:41:41', NULL, NULL, '12', '123', '2020-09-27');
INSERT INTO `tbl_tran` VALUES ('9fd3f3fb0f804e7fb8876102e302b450', '06f5fc056eac41558a964f96daa7f27c', '4589', 'AAAA', '2021-05-01', '4773e1ae93d64625acde4bafafe732db', '68a1b1e814d5497a999b8f1298ace62b', '954b410341e7433faa468d3c4f7cf0d2', '86c56aca9eef49058145ec20d5466c17', '31d63a3514564d51b6758f974c9fafcf', '34046b48f12346e9ba43768914c99640', '40f6cdea0bd34aceb77492a1656d9fb3', '2021-05-09 14:55:37', NULL, NULL, '水水水水水水水水水水', '水水水水水水水水水水水', '2021-05-15');
INSERT INTO `tbl_tran` VALUES ('b98aaa782adb4f7aa9287c618bd9d328', '06f5fc056eac41558a964f96daa7f27c', '123', '123啊啊啊啊', '2020-10-05', '0efcfaceb7d94611a94daa2027b2322b', '29805c804dd94974b568cfc9017b2e4c', '954b410341e7433faa468d3c4f7cf0d2', '86c56aca9eef49058145ec20d5466c17', '15a871e8b4e84b85a1069874fff33c02', '2939e47610454fb98d7410af16ec5005', '98fecbb7b87111eb947254e1ad709136', '2020-10-05 22:13:37', '李四', '2020-10-11 15:58:47', '33621', '665561', '2020-11-02');
INSERT INTO `tbl_tran` VALUES ('e6d809225a78443784ba8629d55d0599', '40f6cdea0bd34aceb77492a1656d9fb3', '5600', '第一次购买', '2021-09-08', '00f8d48cc6384facabfb5caf900869a8', '29805c804dd94974b568cfc9017b2e4c', '954b410341e7433faa468d3c4f7cf0d2', '86c56aca9eef49058145ec20d5466c17', '31ae55adbb324364af50f33aaa906bec', '2939e47610454fb98d7410af16ec5005', '40f6cdea0bd34aceb77492a1656d9fb3', '2021-05-26 16:09:40', NULL, NULL, '很好', '和那好', '2021-9-9');
INSERT INTO `tbl_tran` VALUES ('f40aeedc07b449f9ae4d46c9675b68bf', '40f6cdea0bd34aceb77492a1656d9fb3', '5600', 'BBB', '2021-12-13', '00f8d48cc6384facabfb5caf900869a8', 'e44be1d99158476e8e44778ed36f4355', '954b410341e7433faa468d3c4f7cf0d2', '48512bfed26145d4a38d3616e2d2cf79', '15a871e8b4e84b85a1069874fff33c02', '2939e47610454fb98d7410af16ec5005', '40f6cdea0bd34aceb77492a1656d9fb3', '2021-05-26 16:14:37', NULL, NULL, 'sssss', 'ssss', '2001-09-09');

