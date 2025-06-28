export type NavNode = {
  path: string,
  title: string,
  target?: '_blank' | '_self',
  icon?: string,
  children: NavNode[]
}