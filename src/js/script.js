'use strict'

const clockElement = document.querySelector(".clock")
const clockTime = document.querySelector(".clock-time")
const clockAmPm = document.querySelector(".clock-ampm")

const wMin = document.querySelector(".wminutes")
const wSec = document.querySelector(".wseconds")
const bMin = document.querySelector(".bminutes")
const bSec = document.querySelector(".bseconds")
const cycles = document.querySelector(".cycles")

const startBtn = document.querySelector(".start")
const resetBtn = document.querySelector(".reset")

const digitalClock = function (element) {
    this.element = element;
}

const pomoClock = function (wMin, wSec, bMin, bSec, cycles) {
    this.wMin = wMin
    this.wSec = wSec
    this.bMin = bMin
    this.bSec = bSec
    this.cycles = cycles
}


digitalClock.prototype = {
    getTimeParts() {
        const now = new Date();
        return {
            hour: now.getHours() % 12,
            minute: now.getMinutes(),
            second: now.getSeconds(),
            isAm: now.getHours() < 12,
        };
    },

    start() {
        setInterval(() => {
            this.update()
        }, 500)
    },

    update() {
        const parts = this.getTimeParts();
        const hoursFormatted = parts.hour.toString().padStart(2, "0");
        const minutesFormatted = parts.minute.toString().padStart(2, "0");
        const secondsFormatted = parts.second.toString().padStart(2, "0");
        const timeFormatted = `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
        const amPm = parts.isAm ? "AM" : "PM"

        clockTime.textContent = timeFormatted;
        clockAmPm.textContent = amPm;

    },
}

pomoClock.prototype = {

    startb() {
        if(this.bSecInterval == undefined && this.bMinInterval == undefined){
        this.updateBreakSec()
        this.updateBreakMin()

        
        this.bSecInterval = setInterval(() => {
            this.updateBreakSec()
        }, 1000)

        this.bMinInterval = setInterval(() => {
            this.updateBreakMin()
        }, 60000)
    }else{
        alert('Timer already started')
    }

    },

    start(){
        if(this.wSecInterval == undefined && this.wMinInterval == undefined){
        this.updateWorkSec()
        this.updateWorkMin()
        this.wSecInterval = setInterval(() => {
            this.updateWorkSec()
        }, 1000)

        this.wMinInterval = setInterval(() => {
            this.updateWorkMin()
        }, 60000)
    }else{
        alert('Timer already started')
    }
    },

    updateWorkSec() {
        if (this.wSec.textContent == 0) {
            this.wSec.textContent = 59
        } else {
            this.wSec.textContent--;
        }

        if(this.wSec.textContent == 0 && this.wMin.textContent == 0){
            setTimeout(()=>{
                this.startb()
            },1000); 
            clearInterval(this.wMinInterval)
            clearInterval(this.wSecInterval)
        }
    },

    updateBreakMin() {
        this.bMin.textContent--;
    },

    updateBreakSec() {
        if (this.bSec.textContent == 0) {
            this.bSec.textContent = 59
        } else {
            this.bSec.textContent--;
        }

        if(this.bSec.textContent == 0 && this.bMin.textContent == 0){
            clearInterval(this.bMinInterval)
            clearInterval(this.bSecInterval)
            this.wMin.textContent = 25;
            this.wSec.textContent = 00;
            this.bMin.textContent = 5;
            this.bSec.textContent = 00;
            this.cycles.textContent = 0;
            setTimeout(()=>{
                this.start()
            },1000); 
            this.cycles.textContent++
        }
    },

    updateWorkMin() {
        this.wMin.textContent--;
    },

    reset(){
        this.wMin.textContent = 25;
        this.wSec.textContent = 00;
        this.bMin.textContent = 5;
        this.bSec.textContent = 00;
        this.cycles.textContent = 0;
        clearInterval(this.wMinInterval)
        clearInterval(this.wSecInterval)
        clearInterval(this.bMinInterval)
        clearInterval(this.bSecInterval)
        this.wMinInterval = undefined;
        this.wSecInterval = undefined;
        this.bMinInterval = undefined;
        this.bSecInterval = undefined;
        console.log(this.wMinInterval)
    },

}

const clockObject = new digitalClock(clockElement)
const pomoObject = new pomoClock(wMin, wSec, bMin, bSec, cycles)

clockObject.update();
clockObject.start();


startBtn.addEventListener('click', pomoObject.start.bind(pomoObject))
resetBtn.addEventListener('click', pomoObject.reset.bind(pomoObject))





