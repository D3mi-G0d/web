const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width =	Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
canvas.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
let particlesArray;
let mouse = {
	x: null,
	y: null,
	radius: (canvas.height/80) * (canvas.width/80)
};

window.addEventListener("mousemove",
	function (event)
	{
		mouse.x = event.x;
		mouse.y = event.y;
	}
);

window.addEventListener("touchmove",
	function (event)
	{
		mouse.x = event.x;
		mouse.y = event.y;
	}
);
class Particle {
	constructor(x, y, directionX, directionY, size, color)
	{
		this.x = x;
		this.y = y;
		this.directionX = directionX;
		this.directionY = directionY;
		this.size = size;
		this.color = color;
	}

	draw()
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
		ctx.fillStyle = '#8C5523';
		ctx.fill();
	}

	update()
	{
		//stay inside canvas area
		if(this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
		if(this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
		// collision detection
		let dx = mouse.x - this.x;
		let dy = mouse.y - this.y;
		let distance = Math.sqrt(dx*dx + dy*dy);
		if(distance < mouse.radius + this.size)
		{
			if(mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x +=10;
			if(mouse.x > this.x && this.x > canvas.width - this.size * 10) this.x -=10;
			if(mouse.y < this.y && this.y < canvas.width - this.size * 10) this.y +=10;
			if(mouse.y > this.y && this.y > canvas.width - this.size * 10) this.y -=10;
		}
		// move the particle accordingly
		this.x += this.directionX;
		this.y += this.directionY;
		// draw in canvas
		this.draw();

	}
}

function initParticles() {
	particlesArray = [];
	let nop = (canvas.height * canvas.width) / 15000;
	for(let i = 0; i < nop; i++)
	{
		let size = (Math.random() * 5) + 1;
		let x = (Math.random() * ((innerWidth - size*2) - (size*2)) + size*2);
		let y = (Math.random() * ((innerHeight - size*2) - (size*2)) + size*2);
		let directionX = (Math.random() * 5) - 2.5;
		let directionY = (Math.random() * 5) - 2.5;
		let color = '#8C5523';

		particlesArray.push(new Particle(x,y,directionX,directionY,size,color));
	}
}

function connect()
{
	let opacity = 1;
	for(let a=0; a < particlesArray.length; a++)
	{
		for(let b = 0; b < particlesArray.length; b++)
		{
			let distance = Math.pow(particlesArray[a].x - particlesArray[b].x, 2)
							+ Math.pow(particlesArray[a].y - particlesArray[b].y, 2);
			if(distance < (canvas.width/7) * (canvas.height/7))
			{
				opacity = 1 - (distance/20000);
				ctx.strokeStyle = 'rgba(140,85,31,'+opacity+')';
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
				ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
				ctx.stroke();
			}
		}
	}
}


function pAnimate()
{
	requestAnimationFrame(pAnimate);
	ctx.clearRect(0,0,innerWidth,innerHeight);
	for(let i = 0; i < particlesArray.length; i++)
	{
		particlesArray[i].update();
	}
	connect();
}

window.addEventListener("resize",
	function(){
		//console.log("resized");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		mouse.radius = (canvas.height/80) * (canvas.height/80);
		initParticles();
	}
);

window.addEventListener("mouseout",
	function()
	{
		mouse.x = undefined;
		mouse,y = undefined;
	}
);
window.addEventListener("touchend",
	function()
	{
		mouse.x = undefined;
		mouse,y = undefined;
	}
);
initParticles();
pAnimate();
