// Handler for a and b
const abHandler = {
  set(target, prop, value) {
    target[prop] = value // Update the property inside the proxy

    // Calculate new sum and set it via the proxy to trigger sumHandler
    proxySum.value = proxyA.value + proxyB.value
    return true
  }
}

// Handler specifically for sum
const sumHandler = {
  set(target, prop, value) {
    target[prop] = value

    // Update the DOM whenever sum changes
    document.querySelector('#sum')!.textContent = `Sum: ${value}`
    return true
  }
}

const proxyA = new Proxy({ value: 0 }, abHandler)
const proxyB = new Proxy({ value: 0 }, abHandler)
const proxySum = new Proxy({ value: 0 }, sumHandler)

const num1 = document.querySelector('#num1') as HTMLInputElement
const num2 = document.querySelector('#num2') as HTMLInputElement

num1.oninput = () => (proxyA.value = +num1.value)
num2.oninput = () => (proxyB.value = +num2.value)
