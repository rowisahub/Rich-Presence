const DiscordRPC = require('discord-rpc');
const CP = './data/conf/info.json'
main()
async function getInfo(){
	const fd = require(CP);
	if(fd.clid===''){
		console.log('Please put a the application ID into the config (./data/conf/info.json)')
		console.log('\nRember: The name of the application is whats going to show up after "Playing"\n\nExample Config: https://rowisabeast.com/image/81jf5qwi.png')
		stop()
	}
	// if(fd.details===''){
		// console.log('Please put a state in there')
		// stop()
	// }
	// if(fd.state===''){
		// console.log('')
		// stop()
	// }
	// if(fd.largeImageKey===''){
		// console.log('')
		// stop()
	// }
	// if(fd.largeImageText===''){
		// console.log('')
		// stop()
	// }
	// if(fd.smallImageKey===''){
		// console.log('')
		// stop()
	// }
	// if(fd.smallImageText===''){
		// console.log('')
		// stop()
	// }
	// return fd;
}
async function main(){
	const checkIfFile = await getInfo();
	const conf = require(CP);
	const clientId = conf.clid;
	
	
	DiscordRPC.register(clientId);

	const rpc = new DiscordRPC.Client({ transport: 'ipc' });
	const startTimestamp = new Date();

	async function setActivity() {
		if (!rpc) {
			return;
		}
		rpc.setActivity({
			details: conf.details,
			state: conf.state,
			startTimestamp,
			largeImageKey: conf.largeImageKey,
			largeImageText: conf.largeImageText,
			smallImageKey: conf.smallImageKey,
			smallImageText: conf.smallImageText,
			instance: true,
		});
	}

	rpc.on('ready', () => {
		setActivity();
		
		// console.log('Logged in as', rpc.application.name);
		console.clear()
		console.log('Ready!')
		console.log('Authed for user', rpc.user.username+'#'+rpc.user.discriminator);
		console.log('\n\nYou can now minimize this CMD window, but don\'t close it.')
		console.log("Don't worry, this application can only set your presence; As it can only access your IPC")
		
		// activity can only be set every 15 seconds
		setInterval(() => {
			setActivity();
		}, 15e3);
	});

	rpc.login({ clientId }).catch(console.error);
}
function stop(){
	setTimeout(function(){
		process.exit();
	}, 1);
}