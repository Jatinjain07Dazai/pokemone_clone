class Sprite{
	constructor({coordinate, image, crop, frame, x=10, animate=false, health=80}){
		this.coordinate = coordinate
		this.image = image
		this.crop = crop
		this.image.onload = () =>{
			this.width =  image.width / crop
			this.height = image.height
		}
		this.frame = {...frame, val:0, elapsed:0}
		this.motion = false	
		this.x = x
		this.animate = animate
		this.health = health
	}

	draw(){
		c.drawImage(this.image,
		this.frame.val * this.width,
		0,
		this.image.width / this.crop,
		this.image.height,
	 	this.coordinate.x,
	 	this.coordinate.y,
	 	this.image.width / this.crop,
	 	this.image.height);

	if(this.motion){
		if(this.frame.elapsed % this.x === 0){
		if(this.frame.val < this.crop - 1){
			this.frame.val++;
		}
		else
			this.frame.val = 0;
	}
	this.frame.elapsed++;
	}
	}

	fire_attack(){
		c.drawImage(this.image,
		this.frame.val * this.width,
		0,
		this.image.width / this.crop,
		this.image.height,
	 	this.coordinate.x,
	 	this.coordinate.y,
	 	this.image.width / this.crop,
	 	this.image.height);
		this.coordinate.x += 8
		this.coordinate.y -= 4
		if(this.frame.elapsed % this.x === 0){
		if(this.frame.val < this.crop - 1){
			this.frame.val++;
		}
		else
			this.frame.val = 0;
	}
	this.frame.elapsed++;
	if(this.coordinate.x > 820){
			this.animate = false
			this.coordinate = {
		x: canvas.width/2 - canvas.width/6 -10,
		y: canvas.height/2 
	}
	k = 0
		}
	}


}



class boundary{
	static height = 48
	static width = 48
	constructor({coordinate, color}){
		this.coordinate = coordinate
		this.height = 48
		this.width = 48
		this.color = color
	}
	draw(){
		c.fillStyle = this.color;
		c.fillRect(this.coordinate.x, this.coordinate.y, this.width, this.height);

	}
}