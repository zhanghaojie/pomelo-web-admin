pomeloConfig = {
	username: "admin",
	password: "admin",
	level: 1
}

modulesConfig = [
	{
		moduleId: "watchServer",
		methods:[
			{
				name: "getServers",
				argv: {comd: "servers", context:" "}
			},
			{
				name: "getConnections",
				argv: {comd: "connections", context: "all"}
			}
		]
	},
	{
		moduleId: "systemInfo",
		methods: [
			{
				name: "getSystemInfo"
			}
		]
	},
	{
		moduleId: "scripts",
		methods: [
			{
				name: "list"
			},
			{
				name: "run",
				argv: {script: ""}
			},
			{
				name: "get",
				argv: {filename: ""}
			},
			{
				name: "save",
				argv: {filename: "", body: ""}
			}
		]
	},
	{
		moduleId: "nodeInfo",
		methods: [
			{
				name: "getNodeInfo"
			}
		]
	},
	{
		moduleId: "monitorLog",
		methods: [
			{
				name: "getMonitorLog",
				argv: {serverId: "", logfile: "", number: 10}
			}
		]
	}
]