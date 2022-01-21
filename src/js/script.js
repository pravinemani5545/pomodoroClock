'use strict'

const clockElement = document.querySelector(".clock")
const clockTime = document.querySelector(".clock-time")
const clockAmPm = document.querySelector(".clock-ampm")

// const pomoWork = document.querySelector(".box-1")
// const pomoCycles = document.querySelector(".box-2")
// const pomoBreak = document.querySelector(".box-3")

const wMin = document.querySelector(".wminutes")
const wSec = document.querySelector(".wseconds")
const bMin = document.querySelector(".bminutes")
const bSec = document.querySelector(".bseconds")
const cycles = document.querySelector(".cycles")

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

    start() {
        this.updateWorkSec()
        this.updateWorkMin()
        setInterval(() => {
            this.updateWorkSec()
        }, 1000)

        setInterval(() => {
            this.updateWorkMin()
        }, 60000)

    },

    updateWorkSec() {
        if (this.wSec.textContent == 0) {
            this.wSec.textContent = 59
        } else {
            this.wSec.textContent--;
        }
    },

    updateWorkMin() {
        this.wMin.textContent--;
    }



    // getTimeParts() {
    //     // const now = new Date();
    //     // return {
    //     //     hour: now.getHours() % 12,
    //     //     minute: now.getMinutes(),
    //     //     second: now.getSeconds(),
    //     //     isAm: now.getHours() < 12,
    //     // };
    // },

    // start() {
    //     // setInterval(() => {
    //     //     this.update()
    //     // }, 500)
    // },

    // update() {
    //     // const parts = this.getTimeParts();
    //     // const hoursFormatted = parts.hour.toString().padStart(2, "0");
    //     // const minutesFormatted = parts.minute.toString().padStart(2, "0");
    //     // const secondsFormatted = parts.second.toString().padStart(2, "0");
    //     // const timeFormatted = `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
    //     // const amPm = parts.isAm ? "AM" : "PM"

    //     // clockTime.textContent = timeFormatted;
    //     // clockAmPm.textContent = amPm;

    // },
}

const clockObject = new digitalClock(clockElement)
const pomoObject = new pomoClock(wMin, wSec, bMin, bSec, cycles)

clockObject.update();
clockObject.start();

pomoObject.start();





