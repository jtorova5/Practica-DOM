
let one = document.getElementById("btn-one")
let two = document.getElementsByClassName("btn-two")
let three = document.getElementsByName("btn-three")
let four = document.getElementsByTagName("button")

let btn1 = document.querySelector("#btn1")
let btn2 = document.querySelector(".btn2")
let btn3 = document.querySelector("[name='btn3']")
let btn4 = document.querySelectorAll("button")

console.groupCollapsed('getElementBy...:')

console.log(one)
console.log(two[0])
console.log(three[0])
console.log(four[3])

console.groupEnd()

console.groupCollapsed('querySelector:')

console.log(btn1)
console.log(btn2)
console.log(btn3)
console.log(btn4[7])

console.groupEnd()


