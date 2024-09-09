export const useLightPref = () => {
    document.body.classList.remove('dark'),
    document.body.classList.remove('text-foreground'),
    document.body.classList.remove('bg-background')
  }

export const useDarkPref = () => {
    document.body.classList.add('dark')
      document.body.classList.add('text-foreground')
      document.body.classList.add('bg-background')
  }