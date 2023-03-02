export default function addGlobalEventListener(
  type,
  selector,
  callback,
  option = false
) {
  document.addEventListener(
    type,
    (e) => {
      if (e.target.matches(selector)) callback(e)
    },
    option
  )
}
