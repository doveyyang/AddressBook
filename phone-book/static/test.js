
// 获取用户的首层通讯录分组
{
	code: 200,
	data: {
		list: [{
			groupId: 1,
			groupName: '分组A',
			level:0,
		}, {
			groupId: 2,
			groupName: '分组B',
			level:0,
		}]
	},
	msg: ''
}


//获取分组A的列表
// 传入参数：groupId：1
{
	code: 200,
	data: {
		groupList: [{  //包含的子分组
			groupId: 3,
			groupName: '子分组1',
			level:1,  //同 父亲ID
		}, {
			groupId: 4,
			groupName: '子分组2',
			level:1,//同 父亲ID
		}],
		personList:[  // 分组A包含的用户信息列表
			 {
				"id": 4,
				"name": "我是分组A的李小姐",
				"mobile": "1555555555555",
				"company": "1221321",
				"email": "打单发@efa.com",
				"position": "2432",
				"sort": 124,
				"team": 1,
				"head_img": "4234325414352435.png",
				// "level": 0,？ 这个level有啥用？				
				// "cid": 1 ,//同 groupId
				"groupId":1,// 分组ID
			},
			 {
				"id": 5,
				"name": "我是分组A的周小姐",
				"mobile": "1555555555555",
				"company": "1221321",
				"email": "打单发@efa.com",
				"position": "2432",
				"sort": 124,
				"team": 1,
				"head_img": "4234325414352435.png",
				// "level": 0,？ 这个level有啥用？				
				// "cid": 1 ,//同 groupId
				"groupId":1,// 分组ID
			}
		]
	},
	msg: ''
}