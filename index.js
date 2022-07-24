/* CACHING THE VARIABLES*/
var x = -80
var y = -200
const canvas = document.querySelector('canvas');
const bord = document.getElementById('choice-pad')
const main = document.getElementById('m-choice')
const user = document.querySelector('#en #hp')
const enemy = document.querySelector('#u #hp')
const glow = document.querySelectorAll('.glow-ball')
const tile = document.querySelectorAll('.tile')
const con = document.querySelector('#container')
const hb = document.querySelector('#hyper_beam')
console.log(glow)
glow.forEach(g =>{
	r = Math.floor(Math.random() * 30)
	s = Math.floor(Math.random() * 100)

	console.log(r)
	g.style.top = r + '%';
	g.style.left = s +'%';

})


canvas.height = 640
canvas.width = 1024
const c = canvas.getContext('2d');
const collid = []
const imag = new Image()
imag.src = './assets/currmap.png'
const bg = new Image()
bg.src = './assets/bg.png'
const foregrd = new Image()
foregrd.src = './assets/foreground.png'
const heros = new Image()
heros.src = './assets/playerDown.png'
const herow = new Image()
herow.src = './assets/playerUp.png'
const heroa = new Image()
heroa.src = './assets/playerLeft.png'
const herod = new Image()
herod.src = './assets/playerRight.png'
const dragg = new Image()
dragg.src = './assets/draggleSprite.png'
const flame = new Image()
flame.src = './assets/embySprite.png'
const fire = new Image()
fire.src = './assets/fireball.png'
let her_f = [heros, heroa, herow, herod]
let lastkey = ''
let b_activation = false
let keys = {
	w: false,
	a: false,
	s: false,
	d: false
}
let n = 80
let u = 60
const bound = []
const battleblock = []
const bb = []

const offset = {
	x:-80,
	y:-200
}

function hyper(){
setTimeout(() => {
hb.classList.add('hyper_beams')
},500)

setTimeout(() => {
hb.classList.remove('hyper_beams')
n -= 40
},3000)

}

/*     Sprite creation         */

const batback = new Sprite({
	coordinate:{
		x: 0,
		y: 0 
	},
	image: bg,
	crop : 1

})




const map = new Sprite({
	coordinate:{
		x: offset.x,
		y: offset.y
	},
	image: imag,
	crop : 1

})


const foreground = new Sprite({
	coordinate:{
		x: offset.x,
		y: offset.y
	},
	image: foregrd,
	crop : 1
	
})


const hr = new Sprite({
	coordinate:{
		x: canvas.width/2 - canvas.width /8 - 10,
		y: canvas.height/2 + canvas.height/6
	},
	image: heros,
	crop: 4

})

const draggle = new Sprite({
	coordinate:{
		x: canvas.width/2 + canvas.width /4 + 30,
		y: canvas.height/2 - canvas.height/3 -40
	},
	image:dragg,
	crop: 4,
	x:50

})

const flamy = new Sprite({
	coordinate:{
		x: canvas.width/2 - canvas.width/6 -60,
		y: canvas.height/2 - 20
	},
	image:flame,
	crop: 4,
	x:50

})


const fireball = new Sprite({
	coordinate:{
		x: canvas.width/2 - canvas.width/6 -10,
		y: canvas.height/2 
	},
	image:fire,
	crop: 4,
	animate:true

})




/*  BOUNDARY         */

for(let i=0; i<collision.length; i+=60){
collid.push(collision.slice(i, i+60));
}

collid.forEach((row, i) =>{
	row.forEach((sym, j) =>{
		if(sym === 1025){
			bound.push(new boundary({
				coordinate:{
					x:j * boundary.width + offset.x,
					y:i * boundary.height + offset.y
				},
				color:'rgba(255,0,0,0)'
			}))
		}
	})
})

console.log(bound);


/*           battleground                  */


for(let i=0; i<battlezone.length; i+=60){
battleblock.push(battlezone.slice(i, i+60));
}

battleblock.forEach((row, i) =>{
	row.forEach((sym, j) =>{
		if(sym === 777){
			bb.push(new boundary({
				coordinate:{
					x:j * boundary.width + offset.x,
					y:i * boundary.height + offset.y
				},
				color:'rgba(0,255,0,0)'
			}))
		}
	})
})

console.log(bb);




const movers = [map, ...bound, ...bb, foreground]

/* EVENT LISTENER */
window.addEventListener('keydown', (e) =>{
	switch(e.key){
		case 'w': 	lastkey = 'w'
					keys.w = true
					break;
		case 'a': 	lastkey = 'a'
					keys.a = true
					break;

		case 's': 	lastkey = 's'
					keys.s = true
					break;

		case 'd': 	lastkey = 'd'
					keys.d = true
					break;

	}
})

window.addEventListener('keyup', (e) =>{
	switch(e.key){
		case 'w': 	keys.w = false
					break;
		case 'a': 	keys.a = false
					break;
		case 's': 	keys.s = false
					break;
		case 'd': 	keys.d = false
					break;


	}
})

console.table(enemy.style.width)

function collider({rect1, rect2}){
	return(
	rect1.coordinate.x + rect1.width >= rect2.coordinate.x && 
	   rect1.coordinate.x <= rect2.coordinate.x + rect2.width &&
	   rect1.coordinate.y + rect1.height >= rect2.coordinate.y &&
	   rect1.coordinate.y <= rect2.coordinate.y + rect2.height)
}

function attacks(){
	console.log("hello")
	main.style.display = 'none'
	bord.style.display = 'initial'

}


function drain(){
	n -= 10
	if(u <= 70)
		u += 10
	con.style.display = 'initial'
	setTimeout(() =>{
		con.style.display = 'none'
	}, 4000)
	
}


let z = false
let k = 0


/*      battle sequence animate    */
function Banimate(){
	s=window.requestAnimationFrame(Banimate);
	batback.draw()
	enemy.style.width = n + '%'
	user.style.width = u + '%'
	draggle.motion = true
	flamy.motion = true
	draggle.draw()
	flamy.draw()
	if(k===1){
		fireball.animate =true
		fireball.draw()
		/*Need Solution to have fireball animation it should be occure in loop but have to subtract n*/
		if(k===0){
			n -= 20
		}
		enemy.style.width = n + '%'
	}
	main.style.opacity = 1
	main.style.pointerEvents = 'initial'
	tile[0].style.display = 'initial'
	tile[1].style.display = 'initial'
	
	if(z){
		window.cancelAnimationFrame(s)
		main.style.opacity = 0
		z = false
		tile[0].style.display = 'none'
		tile[1].style.display = 'none'
		animate()
	}

}


/*  Main game loop functions    */
function animate(){
	f = window.requestAnimationFrame(animate);
	map.draw()
	bound.forEach(boundary => {
		boundary.draw();
	})
	bb.forEach(b =>{
		b.draw();
	})
	hr.draw()
	hr.motion = false;
	foreground.draw()
	if(b_activation) {
		return
	}
	for(let i=0; i< bb.length; i++){
				let b = bb[i];
				if(collider({
					rect1: hr,
					rect2: {...b,
					        coordinate:{
									x: b.coordinate.x,
									y: b.coordinate.y}
							}
							}
							) && Math.random() < .001) {
					console.log("on battleground")
					b_activation = true
					window.cancelAnimationFrame(f)
					gsap.to('#anie', {opacity:1, repeat:3, yoyo:true, duration:0.4,
						onComplete(){
							Banimate()
							gsap.to('#anie', {
								opacity:1,
								duration:0.4,
								onComplete(){
								gsap.to('#anie', {
									opacity:0,
									duration:0.4,
								})
								}
							})
						}})
				}}



	if(keys.w && lastkey === 'w'){	
		let motion = true
		hr.image = her_f[2]
		hr.motion = true
		for(let i=0; i< bound.length; i++){
				let b = bound[i];
				if(collider({
					rect1: hr,
					rect2: {...b,
					        coordinate:{
									x: b.coordinate.x,
									y: b.coordinate.y + 2}
							}
							}
							)){
					motion = false
					break
				}}

		if(motion){
	 	movers.forEach(mover => {
	 	mover.coordinate.y += 2})
	 }
	}
	 
	if(keys.s && lastkey === 's'){
		let motion = true
		hr.image = her_f[0]
		hr.motion = true
		for(let i=0; i< bound.length; i++){
				let b = bound[i];
				if(collider({
					rect1: hr,
					rect2: {...b,
					        coordinate:{
									x: b.coordinate.x,
									y: b.coordinate.y - 2}
							}
							}
							)){
					console.log("collision")
					motion = false
					break
				}}
		if(motion){
	 	movers.forEach(mover => {
	 		mover.coordinate.y -= 2
	 	})}
	 }

	if(keys.a && lastkey === 'a'){
		let motion = true
		hr.image = her_f[1]
		hr.motion = true
		for(let i=0; i< bound.length; i++){
				let b = bound[i];
				if(collider({
					rect1: hr,
					rect2: {...b,
					        coordinate:{
									x: b.coordinate.x + 2,
									y: b.coordinate.y }
							}
							}
							)){
					console.log("collision")
					motion = false
					break
				}}
		if(motion){
	 	movers.forEach(mover => {
	 		mover.coordinate.x += 2
	 	})}
	 }

	if(keys.d && lastkey === 'd'){
		let motion = true
		hr.image = her_f[3]
		hr.motion = true
		for(let i=0; i< bound.length; i++){
				let b = bound[i];
				if(collider({
					rect1: hr,
					rect2: {...b,
					        coordinate:{
									x: b.coordinate.x - 2,
									y: b.coordinate.y }
							}
							}
							)){
					console.log("collision")
					motion = false
					break
				}}
		if(motion){
	 	movers.forEach(mover => {
	 		mover.coordinate.x -= 2
	 	})}
	}



}

animate();
