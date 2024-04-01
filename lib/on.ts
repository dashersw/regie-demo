export default function on<T extends HTMLElement>(
  root: T | Document | string,
  selector: string,
  eventType?: string | ((this: T, event: Event) => void),
  handler?: (this: T, event: Event) => void
) {
  if (typeof root === 'string') {
    handler = eventType as unknown as (this: T, event?: Event) => void
    eventType = selector as string
    selector = root
    root = document
  }

  root.addEventListener(eventType as string, event => {
    const target = event.target as HTMLElement

    const closestMatch = (selector as string)
      ? target.closest(selector as string)
      : target
    if (closestMatch) {
      handler!.call(closestMatch as T, event)
    }
  })
}
