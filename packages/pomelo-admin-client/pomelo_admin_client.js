
var io = Npm.require('socket.io-client');
var EventEmitter = Npm.require("events").EventEmitter;
var util = Npm.require("util");

var Client = function(opt) {
	EventEmitter.call(this);
	this.id = "";
	this.reqId = 1;
	this.callbacks = {};
	this.listeners = {};
	this.state = Client.ST_INITED;
	this.socket = null;
	opt = opt || {};
	this.username = opt['username'] || "";
	this.password = opt['password'] || "";
	this.md5 = opt['md5'] || false;
	
	this.modules = {};
};

util.inherits(Client, EventEmitter);

Client.prototype = {
	connect: function(id, host, port, cb) {
		this.id = id;
		var self = this;

		console.log('try to connect ' + host + ':' + port);
		this.socket = io.connect('http://' + host + ':' + port, {
			'force new connection': true,
			'reconnect': false
		});

		this.socket.on('connect', function() {
			self.state = Client.ST_CONNECTED;
			if(self.md5){
				self.password = md5(self.password);
			}
			self.socket.emit('register', {
				type: "client",
				id: id,
				username: self.username,
				password: self.password,
				md5: self.md5
			});
		});

		this.socket.on('register', function(res) {
			if (res.code !== Protocol.PRO_OK) {
				cb(res.msg);
				return;
			}

			self.state = Client.ST_REGISTERED;
			cb();
		});

		this.socket.on('client', function(msg) {
			msg = Protocol.parse(msg);
			if (msg.respId) {
				// response for request
				var cb = self.callbacks[msg.respId];
				delete self.callbacks[msg.respId];
				if (cb && typeof cb === 'function') {
					cb(msg.error, msg.body);
				}
			} else if (msg.moduleId) {
				// notify
				self.emit(msg.moduleId, msg);
			}
		});

		this.socket.on('error', function(err) {
			if (self.state < Client.ST_CONNECTED) {
				cb(err);
			}

			self.emit('error', err);
		});

		this.socket.on('disconnect', function(reason) {
			this.state = Client.ST_CLOSED;
			self.emit('close');
		});
	},

	request: function(moduleId, msg, cb) {
		var id = this.reqId++;
		// something dirty: attach current client id into msg
		msg = msg || {};
		msg.clientId = this.id;
		msg.username = this.username;
		var req = Protocol.composeRequest(id, moduleId, msg);
		this.callbacks[id] = cb;
		this.socket.emit('client', req);
	},

	notify: function(moduleId, msg) {
		// something dirty: attach current client id into msg
		msg = msg || {};
		msg.clientId = this.id;
		msg.username = this.username;
		var req = Protocol.composeRequest(null, moduleId, msg);
		this.socket.emit('client', req);
	},

	command: function(command, moduleId, msg, cb) {
		var id = this.reqId++;
		msg = msg || {};
		msg.clientId = this.id;
		msg.username = this.username;
		var commandReq = Protocol.composeCommand(id, command, moduleId, msg);
		this.callbacks[id] = cb;
		this.socket.emit('client', commandReq);
	},
	
	registerModule: function(moduleId, module) {
		if (typeof moduleId !== "string") {
			module = moduleId;
			moduleId = module.moduleId;
		}
		
		if (!module) return;
		
		if (module && typeof module === "function") {
			module(this);
		}
		this.modules[moduleId] = module;
		
		Object.defineProperty(this, moduleId, {
			get: (function(moduleId) {
				return function() {
					return this.modules[moduleId]
				}
			})(moduleId)
		})
	},

	/**
	 * @param modulesConfig
	 */

	configureModules: function(modulesConfig) {
		var self = this;
		function methodTemplate(moduleId, methodArgv) {
			var method = function(argv, cb) {
				if (typeof argv === "function") {
					cb = argv;
					argv = null;
				}
				var cloneArgv = _.clone(methodArgv);
				_.extend(cloneArgv, argv);
				self.request(moduleId, cloneArgv, cb);
			}
			return method;
		}
		for(var index = 0; index < modulesConfig.length; index++) {
			var moduleConfig = modulesConfig[index];
			var module = {};
			var methods = moduleConfig.methods;
			var moduleId = moduleConfig.moduleId;
			for(var i = 0; i < methods.length; i++) {
				var method = methods[i];
				if (method.name) {
					module[method.name] = methodTemplate(moduleId, method.argv);
				}
			}
			self.registerModule(moduleId, module);
		}
	}
};


Client.ST_INITED = 1;
Client.ST_CONNECTED = 2;
Client.ST_REGISTERED = 3;
Client.ST_CLOSED = 4;

PomeloAdminClient = Client;
