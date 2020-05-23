class Timer {
	constructor(minutes) {
		this.minutes = minutes;
		this.seconds = 0;
		this.shutdown = null;
		this.timerRunning = false;
		this.workTimer = true;
	}

	startTimer() {
		this.timerRunning = true;
		this.shutdown = setInterval(() => {
			if (this.seconds === 0) {
				this.seconds = 60;
				this.minutes--;
			}
			this.seconds--;
			this.updateTimerDisplay();

			if (this.minutes === 0 && this.seconds === 0) {
				this.switchTimer();
			}
		}, 300);
	}

	switchTimer() {
		this.reset();
		if (this.workTimer) {
			breakTimer.startTimer();
		} else {
			workTimer.startTimer();
		}
		this.workTimer = !this.workTimer;
	}

	reset() {
		clearInterval(this.shutdown);
	}

	updateTimerDisplay() {
		const minutes = this.minutes.toString().padStart(2, "0");
		const seconds = this.seconds.toString().padStart(2, "0");
		display.textContent = `${minutes}:${seconds}`;
	}
	increase(target) {
		if(target.parentElement.classList.contains('work-time')) {
			this.minutes = parseInt(workTimeDisplay.textContent);
			workTimeDisplay.textContent = ++this.minutes;
		} else {
			this.minutes = parseInt(breakTimeDisplay.textContent);
			breakTimeDisplay.textContent = ++this.minutes;
		}
	}

	decrease(target) {
		if(target.parentElement.classList.contains('work-time')) {
			this.minutes = parseInt(workTimeDisplay.textContent);
			if (this.minutes > 0) {
				workTimeDisplay.textContent = --this.minutes;
			}
		} else {
			this.minutes = parseInt(breakTimeDisplay.textContent);
			if(this.minutes > 0) {
				breakTimeDisplay.textContent = --this.minutes;
			}
		}
	}
}

const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const stopButton = document.getElementById("stop");
const increaseButton = document.querySelectorAll(".increase");
const decreaseButton = document.querySelectorAll(".decrease");
const display = document.getElementById("timer-display");
const activeTimerDisplay = document.getElementById("active-timer-display");

/* get displays of the timers */
const workTimeDisplay = document.getElementById("work-time-display");
const breakTimeDisplay = document.getElementById("break-time-display");

let workTimer = new Timer(2);
let breakTimer = new Timer(1);

playButton.addEventListener("click", () => {
	workTimer.startTimer();
});

pauseButton.addEventListener("click", () => {
	workTimer.reset();
	breakTimer.reset();
});

stopButton.addEventListener("click", () => {});

increaseButton.forEach((button) => {
	button.addEventListener("click", event => {
		workTimer.increase(event.target);
	});
});

decreaseButton.forEach((button) => {
	button.addEventListener("click", event => {
		workTimer.decrease(event.target);
	});
});
