(function(){
			"use strict";
			var words = [
				"tempt",
				"resign",
				"conform",
				"embrace",
				"assemble",
				"dedicate",
				"advocate",
				"thrive",
				"provoke",
				"dictate",
				"exploit",
				"reproduce",
				"retreat",
				"swell",
				"shed",
				"wind",
				"cite",
				"digest",
				"dissolve"
			];

			var meaning = [
				"誘惑する",
				"辞職する",
				"従う",
				"受け入れる",
				"組み立てる",
				"ささげる",
				"主張する",
				"繁栄する",
				"引き起こす",
				"命じる、要求する、決定する",
				"利用する、開発する",
				"再生する、繁殖する",
				"退く",
				"ふくらむ",
				"落とす",
				"曲げる",
				"引き合いに出す",
				"消化する",
				"溶解する、解散する"
			];

			var currentWord;
			var currentLocation;
			var score;
			var miss;
			var timer;
			var index;
			var selected;
			var meaningLabel = document.getElementById("meaning");
			var timerLabel = document.getElementById("time-box");
			var target = document.getElementById("target");
			var scoreLabel = document.getElementById("score");
			var missLabel = document.getElementById("miss");
			var btn1 = document.getElementById("btn1");
			var btn2 = document.getElementById("btn2");
			var levelLabel = document.getElementById("level");
			var timerId; //タイマーを止める際に必要
			var isStarted;

			function init() {
				currentWord = "press space to start";
				currentLocation = 0;
				score = 0;
				miss = 0;
				timer = 30;
				selected = 1;
				target.style.color = "black";
				target.innerHTML = currentWord;
				scoreLabel.innerHTML = score;
				missLabel.innerHTML = miss;
				timerLabel.innerHTML = timer;
				levelLabel.innerHTML = "Level 1";
				meaningLabel.innerHTML = "";
				isStarted = false;
				document.bgColor="white";
			}

			init();

			function updateTimer() {
				timerId = setTimeout(function() {
					timer--;
					timerLabel.innerHTML = timer;
					if(timer <= 0) {
						var accuracy = (score + miss) == 0 ? "0.00" : (score / (score + miss) * 100).toFixed(2);
						alert("正答率 : " + accuracy + "%\n" +
							(score / 30).toFixed(2) + " 字/秒");
						clearTimeout(timerId);
						init();
						return;
					}
					updateTimer();
				}, 1000);
			}

			function tenmetsu_1(){
				document.bgColor="black";
				setTimeout("document.bgColor='white';",100);
			}

			function tenmetsu_2(){
				document.bgColor="white";
				setTimeout("document.bgColor='black';",100);
			}

			function setTarget() {
				target.style.color = "black";
				index = Math.floor(Math.random()*words.length);
				currentWord = words[index];
				target.innerHTML = currentWord;
				meaningLabel.innerHTML = meaning[index];
				currentLocation = 0;
			}

			btn1.addEventListener("click", function() {
				levelLabel.innerHTML = "Level 1";
				selected = 1;
			});

			btn2.addEventListener("click",function(){
				levelLabel.innerHTML = "Level 2";
				selected = 2;
			});

			//リセット
			window.addEventListener("keyup",function(e) {
				if(e.keyCode == 27){
					init();
					clearTimeout(timerId);
				}
			});

			//スタート
			window.addEventListener("keyup", function(e){
				if(e.keyCode == 32) {
					if(!isStarted) {
						isStarted = true;
						setTarget();
						updateTimer();
					}
				}
			});


			//タイピング判定
			window.addEventListener("keyup", function(e){ //e.keyCode
				if(isStarted){
					if(String.fromCharCode(e.keyCode) ===             //コードから文字に変換
						currentWord[currentLocation].toUpperCase()){  //大文字に直してから判定
							currentLocation++;
						if(selected == 1) {
							var placeholder = "";
							for(var i=0; i < currentLocation; i++) {
								placeholder += "_";
							}
							target.innerHTML = placeholder + currentWord.substring(currentLocation);  //currentLocationから最後まで切り取り
						} else if(selected == 2) {
							target.style.color = "white";
							target.innerHTML = currentWord.substring(0,currentLocation);
						}
							score++;
							scoreLabel.innerHTML = score;

							if(currentLocation == currentWord.length) {
								setTarget();
							}
					} else {
						miss++;
						missLabel.innerHTML = miss;
						if(selected == 1) tenmetsu_1();
						if(selected == 2) tenmetsu_2();
					}
				}
			});
			
		})();