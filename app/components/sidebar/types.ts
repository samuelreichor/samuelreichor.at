export type NavNode = {
  _path: string,
  title: string,
  target?: '_blank' | '_self',
  icon?: string,
  children: NavNode[]
}