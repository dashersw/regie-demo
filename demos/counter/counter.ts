import regie from 'regie'

const initialState = {
  count: 0
}

const { observe, state } = regie({ initialState })

const element = document.querySelector('#counter') as HTMLElement

element.onclick = () => state.count++

observe('count', count => (element.textContent = `Count: ${count}`))
