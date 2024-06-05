export const getHashParameters = () => {
  const parameters: { [key: string]: string } = {}
  const searchParameters = new URLSearchParams(window.location.hash.substring(1))

  searchParameters.forEach((value, key) => parameters[key] = value)

  return parameters
}