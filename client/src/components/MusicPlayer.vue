<template>
	<div class="music-player">
			<audio 
		class="audio" src="" controls></audio>
		<div class="player" >
			<div class="current-play-name">song One</div>
			<div class="controller-one">
				<div class="cur-time">00:00</div>
				<input type="range" class="slider-time" mix="0" step="0.001" max="100">
				<div class="dur-time">00:00</div>
			</div>
			<div class="controller-two">
				<div class="left" @click="Prev()">&#9194;</div>
				<div class="play" @click="play()">&#9199;</div>
				<div class="right" @click="Next()">&#9193;</div>
				<div class="speaker">speaker
				<input 
				type="range" value="0.3" step="0.01" min="0" max="1" class="speaker-slider">
				</div>
			</div>
				<ul class="song-list">
					<li
					:class="{'active':file.filename == filename}"
					v-for="file in folder.files"
					:key="file._id"
					@click="openOne(file.name,file.filename)"
					>{{file.name}}</li>
				</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name:'music_player',
		props:['folder'],
		data(){
			return {
				filename:'',
				index:0,
				audio:'',
				speakerSlider:'',
				silderTimer:'',
				currName:'',
				url:process.env.BASE_URL
			}
		},
		created(){
			setTimeout(()=>{
				let audio = document.querySelector('.audio');
				let speakerSlider = document.querySelector('.speaker-slider');
				let sliderTimer = document.querySelector('.slider-time');
				let currName = document.querySelector('.current-play-name');
				let curTime = document.querySelector('.cur-time');
				let durTime = document.querySelector('.dur-time');

				//set state
				this.audio = audio;
				this.speakerSlider = speakerSlider;
				this.sliderTimer = sliderTimer;
				this.currName = currName;
				this.curTime = curTime;
				this.durTime = durTime;

				//init set
				this.audio.volume = 0.3;

				const { files } = this.folder;

				// audio.src = require(`../../public/uploads/${files[this.index].filename}`);
				audio.src = `${this.url}uploads/${files[this.index].filename}`;
				//set filename
				this.filename = files[this.index].filename;
				//set current name
				this.currName.innerHTML = files[this.index].name.substring(0,30);

				//event listener
				//volume change
				this.speakerSlider.addEventListener('input',(e)=>{
					this.audio.volume = e.target.value;
					this.speakerSlider.value = e.target.value;
				})
				//change slider time
				this.sliderTimer.addEventListener('input',(e)=>{
					let dur = this.audio.duration / 100;
					this.audio.currentTime = dur * e.target.value;
				})				
				//call timer
				this.timer();

			},1000);
		},
		methods:{
			openOne(name,filename){
				
				// this.audio.src = require(`../../public/uploads/${filename}`);
				this.audio.src = `${this.url}uploads/${filename}`;
				this.audio.play()	
				//set filename
				this.filename = filename;
				//set current name
				this.currName.innerHTML = name;
				//call timer
				this.timer();
			},
			timer(){
				const { files } = this.folder;
				
				//show dur
				let dur = this.audio.duration;
				let dur_min = Math.round(dur / 60);
				let dur_sec = Math.round(dur % 60);

				this.durTime.innerHTML = `${setZero(dur_min)}:${setZero(dur_sec)}`; 
				
				//show cur
				let cur = this.audio.currentTime;
				let cur_min = Math.round(cur / 60);
				let cur_sec = Math.round(cur % 60);

				this.curTime.innerHTML = `${setZero(cur_min)}:${setZero(cur_sec)}`;

				//show slidebar
				let per = Math.round((cur / dur) * 100);
				this.sliderTimer.value = per;
				
				//song ended
				if(this.audio.ended){
						
						if(this.index == files.length ){

							}else{
							this.index++;

							this.audio.src = `${this.url}uploads/${files[this.index].filename}`;
							this.audio.play()
							//set filename
							this.filename = files[this.index].filename;
							//set current name
							this.currName.innerHTML = files[this.index].name.substring(0,30);
							//call timer
						}
						
					}	
				//set zero
				function setZero (data){
					if(data < 10){
						return `0${data}`;
					}else{
						return data;
					}
				} 
				//setinterval
				if(this.audio.paused == false){
					if(!this.audio.ended){
						setTimeout(()=>{
							this.timer();
						},1000);
					}
					
				}
			},
			play(){

				if(this.audio.paused){
					this.audio.play();
					this.timer();
				}else{
					this.audio.pause();
					this.timer();
				}
			},
			Prev(){

				const { files } = this.folder;

				if (this.index == 0) {
					this.index = files.length;
				}
				this.index --;
				// this.audio.src = require(`../../public/uploads/${files[this.index].filename}`);
				this.audio.src = `${this.url}uploads/${files[this.index].filename}`;
				this.audio.play()
				//set filename
				this.filename = files[this.index].filename;
				//set current name
				this.currName.innerHTML = files[this.index].name.substring(0,30);
			},
			Next(){
				const { files } = this.folder;

				this.index++;

				if(this.index == files.length){
					this.index = 0;
				}
				// this.audio.src = require(`../../public/uploads/${files[this.index].filename}`);
				this.audio.src = `${this.url}uploads/${files[this.index].filename}`;
				this.audio.play()
				//set filename
				this.filename = files[this.index].filename;
				//set current name
				this.currName.innerHTML = files[this.index].name.substring(0,30);
			}


		}
	}
</script>

<style scoped>
	.none {
		display: none;
	}
	.block {
		display: block;
	}
	.active {
		color: red;
	}
	.audio {
		display: none;
	}
	/* var */
	:root {
		--emoji: 1.8rem;
		--default-font: 1.1rem;
		--controller-font: 1.5rem;
	}

	.player {
		background-color: rgba(0,0,0,0.5);
		color: #fff;
		display: grid;
		grid-template-rows: 2fr 4fr 4fr 10fr;
		width: 500px;
		margin: 0 auto;
	}

	.current-play-name,
	.controller-one,
	.controller-two {
		border-bottom: 1px solid #333;
	}

	.controller-one,
	.controller-two {
		display: flex;
		justify-content: space-between;
		padding: 1rem 1rem;
	}
	/* song header */
	.current-play-name {
		padding: 0.5rem 0;
		text-align: center;
		font-family: monospace;
		font-size: 1.1rem;
		cursor: pointer;
	}

	/* controller one */
	.cur-time,
	.dur-time {
		font-size: var(--controller-font);
	}

	.slider-time {
		-webkit-appearance: none;
		width: 15rem;
		height: 5px;
		margin-top: 0.8rem;
		background-color: #333;
	}

	.slider-time::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background-color: red;
	}

	/* controller two */
	.speaker {
		font-size: var(--controller-font);
		position: relative;
	}

	.speaker .speaker-slider {
		position: absolute;
		transform: rotate(-90deg) translate(80px,6px);
		-webkit-appearance: none;
		width: 150px;
		height: 5px;
		background-color: #333;
	}

	.speaker .speaker-slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 15px;
		height: 15px;
		background-color: blue;
		border-radius: 50%;
	}

	.player .left,
	.player .play,
	.player .right
	{
		font-size: 1.8rem;
	}

	.left,
	.play,
	.right,
	.speaker:hover {
		cursor: pointer;
	}

	/* Song list */
	.song-list {
		list-style: none;
		overflow-y: auto;
		max-height: 12rem;
	}

	.song-list li {
		border-bottom: 1px solid #140808;
		padding: 0.5rem 0;
		padding-left: 1.5rem;
		font-size: 1rem;
		font-family: monospace;

	}

	.song-list li:hover {
		cursor: pointer;
		color: red;
	}

	.song-list::-webkit-scrollbar {
		width: 7px;
		background-color: #333;
	}

	.song-list::-webkit-scrollbar-thumb {
		width: 10px;
		background-color: green;
	}

	.cur-song {
		color: red;
	}
</style>