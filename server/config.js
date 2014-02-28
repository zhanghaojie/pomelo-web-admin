pomeloConfig = {
	username: "admin",
	password: "admin",
	level: 1
}

modulesConfig = [
	{
		moduleId: "watchServer",
		//context :  serverId
		methods:[
			{
				name: "getServers",
				argv: {comd: "servers", context:" "}
			},
			{
				name: "getConnections",
				argv: {comd: "connections", context: "all"}
			},
			{
				name: "getLogins",
				argv: {comd: "logins", context: "all"}
			},
			{
				name: "getModules",
				argv: {comd: "modules"}
			},
			{
				name: "getStatus",
				argv: {comd: "status"}
			},
			{
				name: "getConfig",
				argv: {comd: "config"}
			},
			{
				name: "getProxy",
				argv: {comd: "proxy"}
			},
			{
				name: "getHandler",
				argv: {comd: "handler"}
			},
			{
				name: "getComponents",
				argv: {comd: "components"}
			},
			{
				name: "getSettings",
				argv: {comd: "settings"}
			},
			{
				name: "getCpu",
				argv: {comd: "cpu"}
			},
			{
				name: "getMemory",
				argv: {comd: "memory"}
			},
			{
				name: "getSet",
				argv: {comd: "set"}
			},
			{
				name: "getGet",
				argv: {comd: "get"}
			},
			{
				name: "getEnable",
				argv: {comd: "enable"}
			},
			{
				name: "getDisable",
				argv: {comd: "disable"}
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
		moduleId: "profiler",
		methods: [
			{
				name: "getNodeInfo"
			}
		]
	}
	/*
	{
		moduleId: "monitorLog",
		methods: [
			{
				name: "getMonitorLog",
				argv: {serverId: "", logfile: "", number: 10}
			}
		]
	}
	*/
]