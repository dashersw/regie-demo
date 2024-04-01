import regie from 'regie'

interface InitialState {
  user: {
    name: string
    address: {
      city: string
    }
  }
}

const { observe, actions } = regie<InitialState>({
  actions: {
    setUser({ state }, user) {
      state.user = user
    }
  }
})

observe(
  'user.name',
  name => (document.querySelector('#name')!.textContent = `Name: ${name}`)
)

observe(
  'user.address.city',
  city => (document.querySelector('#city')!.textContent = `City: ${city}`)
)

document.querySelector<HTMLElement>('#fetch-user')!.onclick = async () => {
  const randomId = Math.floor(Math.random() * 10) + 1
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${randomId}`
  )

  const user = await response.json()

  actions.setUser(user)
}
