import { useMemo } from 'React'
// Need it to use on useQuery hook to prevent loop rerendering
export function useNow () {
  return useMemo(() => Date.now(), [])
}
