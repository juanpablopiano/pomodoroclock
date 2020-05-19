new Vue({
	el: "#app",
	data: {
		title: "Pomodoro Clock",
		time: "00:00",
		timer: 25,
		seconds: 0,
		minutes: 0,
		shutDown: 0,
        timerRunning: false,
        breakTimer: 10,
        shutDownBreak: 0,
        breakRunning: false
	},
	methods: {
		startTimer() {
			this.minutes = this.timer;
			this.timerRunning = true;
			this.shutDown = setInterval(() => {
				if (this.seconds === 0) {
                    this.seconds = 60;
                    this.minutes--;
				}
                this.seconds--;
                this.checkTimer(this.minutes, this.seconds);
			}, 1000);
		},
		stopTimer() {
			this.timerRunning = false;
            this.breakRunning = false;
			clearInterval(this.shutDown);
            this.seconds = 0;
            this.minutes = this.timer;
		},
		pauseTimer() {
            this.timerRunning = false;
            this.breakRunning = false;
			clearInterval(this.shutDown);
		},
		increaseTimer() {
			this.timer++;
		},
		decreaseTimer() {
			if (this.timer > 0) {
				this.timer--;
			}
        },
        checkTimer(minutes, seconds) {
            if (minutes === 0 && seconds === 0) {
                // do something
                alert('erei marico?')
                return
            }
        }
	},
});
