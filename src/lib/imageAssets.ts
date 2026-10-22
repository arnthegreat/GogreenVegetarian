const imageAssets = import.meta.glob<string>('@/assets/Images/*', {
  eager: true,
  import: 'default',
  query: '?url',
})

const imageAssetsByName = new Map(
  Object.entries(imageAssets).map(([path, url]) => [
    path.split('/').pop()!,
    url,
  ]),
)

export function imageAsset(filename: string): string {
  const url = imageAssetsByName.get(filename)
  if (!url) {
    throw new Error(`Image asset "${filename}" was not found.`)
  }
  return url
}
