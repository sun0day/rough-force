import rough from 'roughjs'
import './style.css'

const root = document.querySelector("#app")!
//document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//  <canvas id="container" width="100%" height="100%"></canvas>  
//`
//
//const canvas = document.querySelector("#container") as HTMLCanvasElement;
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`)

function computeTextRectSize(text: string, fontSize: number = 16) {
  fontSize = Math.max(fontSize, 12)
  const height = fontSize * 2
  const width =  Math.max(height + fontSize, text.length * fontSize * 0.5)

  return {
    width, 
    height,
    dx: width /2 ,//text.length * fontSize * 0.055,
    dy: 1.4 * fontSize
  }
}

function computeTextDiffPos(text: string, size: number[], ) {
  return []
}

function createTextNode(text: string, {x, y, fontSize, dx, dy} : {x: number, y: number, fontSize: number, dy: number, dx: number} = {}) {
const textNode = document.createElementNS("http://www.w3.org/2000/svg", "text");
  textNode.setAttribute('x', x)
  textNode.setAttribute('y', y)
  textNode.setAttribute('dy', dy)
  textNode.setAttribute('dx', dx)
  textNode.setAttribute("fill","#1e1e1e")
  textNode.setAttribute("text-anchor", "middle")
  textNode.setAttribute('font-size', `${fontSize}px`)
  textNode.innerHTML = text
const wrapperNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  wrapperNode.appendChild(textNode)
  return textNode 
}

function appendTextRectNode(text: string, startX: number, startY: number) {
  const fontSize = 60
const rectSize = computeTextRectSize(text, fontSize)
const rectNode = rc.rectangle(startX, startY, rectSize.width, rectSize.height, {roughness: 2, })
rectNode.appendChild(createTextNode(text, {fontSize: fontSize, x: startX ,y: startY, dy: rectSize.dy, dx: rectSize.dx }))
svg.appendChild(rectNode)
}

const text1 = 'hello'
const text2 = 'world'
const text3 = 'rought\nforce'
const text4 = 'rought force asjkdjkasdjasjkdkj'

const rc = rough.svg(svg);

appendTextRectNode(text1, 100, 100)
appendTextRectNode(text2, 100, 200)
appendTextRectNode(text3, 100, 400)
appendTextRectNode(text4, 100, 500)
root.appendChild(svg)
